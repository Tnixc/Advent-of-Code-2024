import { INPUT } from "@/03";
const input = INPUT;
const p1rx = /[Mm]ul\([0-9][0-9]?[0-9]?,[0-9][0-9]?[0-9]?\)/g;
const p1 = input
  .match(p1rx)!
  .map((x) => x.replace("mul(", "").replace(")", "").split(","))
  .map((x) => x.map((y) => Number(y)).reduce((a, b) => a * b))
  .reduce((a, b) => a + b);

console.log(p1);

const p2rx = /don't\(\).+?do\(\)/g;
const p2 = `do()${input}do()`!
  .toLowerCase()
  .replaceAll("\n", "")
  .replaceAll(p2rx, "")
  .match(p1rx)!
  .map((x) => x.replace("mul(", "").replace(")", "").split(","))
  .map((x) => x.map((y) => Number(y)).reduce((a, b) => a * b))
  .reduce((a, b) => a + b);
console.log(p2);
