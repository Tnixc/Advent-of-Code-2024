
const vals = input
  .split("\n")
  .map((x) => x.split(":"))
  .map((x) => [
    Number(x[0]),
    x[1]
      .trim()
      .split(" ")
      .map((k) => Number(k)),
  ]);

const binCache = new Map();
function dec2bin(dec) {
  if (!binCache.has(dec)) {
    binCache.set(
      dec,
      dec
        .toString(2)
        .split("")
        .map((x) => Number(x)),
    );
  }
  return binCache.get(dec);
}

const triCache = new Map();
function dec2tri(dec) {
  if (!triCache.has(dec)) {
    triCache.set(
      dec,
      dec
        .toString(3)
        .split("")
        .map((x) => Number(x)),
    );
  }
  return triCache.get(dec);
}

// Part 1
let c1 = 0;
let startTime = performance.now();
const ok = new Set();
for (const row of vals) {
  let s = 0;
  const target = row[0];
  const numbers = row[1];
  const maxLen = numbers.length;
  let maxProduct = numbers[0];
  for (let i = 1; i < maxLen; i++) {
    maxProduct *= numbers[i];
  }

  const pattern = new Array(maxLen).fill(0);

  while (true) {
    const opPattern = dec2bin(s);
    if (opPattern.length > maxLen) break;

    pattern.fill(0);
    for (let i = 0; i < opPattern.length; i++) {
      pattern[maxLen - opPattern.length + i] = opPattern[i];
    }

    let op_res = numbers[0];
    let exceeded = false;

    for (let i = 1; i < maxLen && !exceeded; i++) {
      if (pattern[i]) {
        op_res *= numbers[i];
        if (op_res > target) {
          exceeded = true;
        }
      } else {
        op_res += numbers[i];
      }
    }

    if (!exceeded && op_res === target) {
      c1 += target;
      ok.add(target);
      break;
    }

    if (op_res > maxProduct) break;
    s++;
  }
}

console.log(c1);
let endTime = performance.now();
console.log(`p1: ${endTime - startTime}ms`);

// Part 2
startTime = performance.now();
const concat = (a, b) => {
  if (b < 10) return a * 10 + b;
  if (b < 100) return a * 100 + b;
  if (b < 1000) return a * 1000 + b;
  if (b < 10000) return a * 10000 + b;
  if (b < 100000) return a * 100000 + b;
  if (b < 1000000) return a * 1000000 + b;
  if (b < 10000000) return a * 10000000 + b;
  return a * Math.pow(10, Math.floor(Math.log10(b) + 1)) + b;
};

let c2 = 0;
for (const row of vals) {
  let s = 0;
  const target = row[0];

  if (ok.has(target)) continue;

  const numbers = row[1];
  const maxLen = numbers.length;
  const pattern = new Array(maxLen).fill(0);
  if (target === numbers.reduce((a, b) => a + b)) {
    c2 += target;
    continue;
  }
  while (true) {
    const opPattern = dec2tri(s);
    if (opPattern.length > maxLen) break;
    pattern.fill(0);

    for (let i = 0; i < opPattern.length; i++) {
      pattern[maxLen - opPattern.length + i] = opPattern[i];
    }

    let op_res = numbers[0];
    let exceeded = false;

    for (let i = 1; i < maxLen && !exceeded; i++) {
      if (pattern[i] === 2) {
        op_res *= numbers[i];
        if (op_res > target) {
          exceeded = true;
        }
      } else if (pattern[i] === 1) {
        op_res = concat(op_res, numbers[i]);
        if (op_res > target) {
          exceeded = true;
        }
      } else {
        op_res += numbers[i];
      }
    }

    if (!exceeded && op_res === target) {
      c2 += target;
      break;
    }
    s++;
  }
}

console.log(c2);
endTime = performance.now();
console.log(`p2: ${endTime - startTime}ms`);
