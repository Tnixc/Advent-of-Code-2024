import { INPUT_A, INPUT_B } from "@/19";

const t_a = `r, wr, b, g, bwu, rb, gb, br`;
const t_b = `brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

const pieces = INPUT_A.split(",")
  .map((x) => x.trim())
  .sort((a, b) => b.length - a.length);

const designs = INPUT_B.split("\n");

const cache = new Map<string, boolean>();

function canCompose(word: string): boolean {
  if (word === "") return true;
  if (cache.has(word)) return cache.get(word);

  for (const p of pieces) {
    let l = p.length;
    if (l > word.length) continue;

    let start = word.substring(0, l);
    let rest = word.substring(l);

    if (start === p && canCompose(rest)) {
      cache.set(word, true);
      return true;
    }
  }
  cache.set(word, false);
  return false;
}

console.log(pieces);

const res = [];
designs.forEach((x) => res.push(canCompose(x)));
console.log(cache);
console.log(res.filter((x) => x).length);
