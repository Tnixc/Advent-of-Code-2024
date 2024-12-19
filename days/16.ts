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

const start = { y: grid.length - 2, x: 1, h: 0, cost: 0, hist: 0 };

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function walk() {
  let now = pq.pop();
  const results = [];
  while (now) {
    console.log(now.y, now.x, now.h, now.cost);
    if (grid[now.y][now.x] === "E") {
      now.cost += 1000; //idk why, but it works
      return now;
    }
    for (let nh = 0; nh < 4; nh++) {
      const [ny, nx] = [now.y + dirs[nh][0], now.x + dirs[nh][1]];
      if (grid[ny]?.[nx] === "#") continue; // if its a wall
      if (Math.abs(now.h - nh) === 2) continue;
      let isTurn = now.h != nh;
      pq.push({
        y: ny,
        x: nx,
        h: nh,
        cost: now.cost + (isTurn ? 1001 : 1),
        hist: now.hist + 1,
      });
    }
    now = pq.pop();
  }
}

pq.push(start);

console.log(walk());
// console.log(visited.size);
