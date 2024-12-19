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

const grid = INPUT.split("\n").map((x) => x.split(""));
const compare = (a, b) => a.cost - b.cost;
const pq = new Heap(compare);

const start = { y: grid.length - 2, x: 1, h: 0, cost: 0, hist: new Set() };

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const visited = new Set();
const res = [];
let minSteps = Infinity;
let minCost = Infinity;
function walk() {
  let now = pq.pop();
  while (now) {
    if (now.cost > minCost) {
      now = pq.pop();
      continue;
    }
    // console.log(minCost, minSteps, now.hist.size);
    // console.log(now.y, now.x, now.h, now.cost);
    if (grid[now.y][now.x] === "E") {
      now.cost += 1000; //idk why, but it works
      if (now.cost <= minCost) {
        console.log(now);
        minCost = now.cost;
        minSteps = now.hist.size;
        res.push(now);
      }
      now = pq.pop();
      continue;
    }

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
