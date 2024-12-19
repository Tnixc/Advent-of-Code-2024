import { encodeTwo } from "utils";
import { INPUT } from "@/16";
import Heap from "heap-js";

const t = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;

const t2 = `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`;

const grid = t2.split("\n").map((x) => x.split(""));
const compare = (a, b) => a.cost - b.cost;
const pq = new Heap(compare);

const start = { y: grid.length - 2, x: 1, h: 0, cost: 0, hist: new Set() };

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function encodeState(y, x, h) {
  return `${y},${x},${h}`;
}

const visited = new Set();
const res = [];
let min = Infinity;
function walk() {
  let now = pq.pop();
  while (now) {
    if (now.cost > min) {
      now = pq.pop();
      continue;
    }
    // console.log(now.y, now.x, now.h, now.cost);
    if (grid[now.y][now.x] === "E") {
      now.cost += 1000; //idk why, but it works
      if (now.cost <= min) {
        min = now.cost;
        res.push(now);
      }
      now = pq.pop();
      continue;
    }
    // if (visited.has(encodeTwo(now.y, now.x))) {
    //   now = pq.pop();
    //   continue;
    // }
    // visited.add(encodeTwo(now.y, now.x));
    for (let nh = 0; nh < 4; nh++) {
      const [ny, nx] = [now.y + dirs[nh][0], now.x + dirs[nh][1]];
      if (grid[ny]?.[nx] === "#") continue; // if its a wall
      if (Math.abs(now.h - nh) === 2) continue;
      let isTurn = now.h != nh;
      const hist = new Set(now.hist);
      hist.add(encodeTwo(now.y, now.x));
      pq.push({
        y: ny,
        x: nx,
        h: nh,
        cost: now.cost + (isTurn ? 1001 : 1),
        hist: hist,
      });
    }
    now = pq.pop();
  }
}

pq.push(start);
walk();
let uniq = new Set();
console.log(res);
res.forEach((k) => (uniq = uniq.union(k.hist)));
console.log(uniq.size + 1);
// console.log(visited.size);
