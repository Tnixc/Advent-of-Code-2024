
const test = `2333133121414131402`;
const t2 = `2289937361462537565743654392191430243285795130435159294739821058371166572674439596984`;
const chars = input.split("");
function p1() {
  let map = [];
  let k = 0;
  let id = 0;
  for (const char of chars) {
    if (k % 2 === 0) {
      for (let j = 0; j < Number(char); j++) {
        map.push(id);
      }
      id++;
    } else {
      for (let j = 0; j < Number(char); j++) {
        map.push(".");
      }
    }
    k++;
  }

  let res = [];
  for (let i = 0; i < map.length; i++) {
    if (map[i] != ".") {
      res.push(map[i]);
      map[i] = ".";
    } else {
      const rem = map.findLast((x) => x != ".");
      if (Number(rem)) {
        res.push(rem);
      }
      map[map.lastIndexOf(rem)] = ".";
    }
  }

  const v = res;

  let c1 = 0;
  for (let k = 0; k < v.length; k++) {
    c1 = c1 + k * v[k];
  }
  console.log(c1);
}

function consec(arr: any[]) {
  var res = [];
  var prev = arr[0];
  var prevcount = 1;
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] !== prev) {
      let p = prevcount * prev.toString().length;
      res.push({ item: prev, count: prevcount });
      prevcount = 0;
    }
    prevcount++;
    prev = arr[i];
  }
  let p = prevcount * prev.toString().length;
  res.push({ item: prev, count: prevcount });
  return res;
}

function p2() {
  const map = [];
  let k = 0;
  let id = 0;
  for (const char of chars) {
    if (k % 2 === 0) {
      for (let j = 0; j < Number(char); j++) {
        map.push(id);
      }
      id++;
    } else {
      for (let j = 0; j < Number(char); j++) {
        map.push(".");
      }
    }
    k++;
  }

  let con = consec(map);
  for (let i = con.length - 1; i >= 0; i--) {
    const ncon = [];
    for (const sec of con) {
      for (let i = 0; i < sec.count; i++) {
        ncon.push(sec.item);
      }
    }

    con = consec(ncon);
    // console.log(ncon.join(""));
    if (con[i].item != ".") {
      let k = 0;
      while (k < i) {
        if (con[k].item === "." && con[k].count >= con[i].count) {
          const ok = con[k].count;
          const oi = con[i].count;
          con[k].count = oi;
          con[k].item = con[i].item;
          con[i].item = ".";
          con.splice(k + 1, 0, {
            item: ".",
            count: ok - oi,
          });
          break;
        }
        k++;
      }
    }
  }
  const res = [];
  for (const sec of con) {
    for (let i = 0; i < sec.count; i++) {
      res.push(sec.item);
    }
  }
  let c2 = 0;
  for (let k = 0; k < res.length; k++) {
    if (res[k] != ".") {
      c2 = c2 + k * res[k];
    }
  }
  console.log(c2);
}

p2();
