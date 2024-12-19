import { encodeTwo } from "utils";
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

const grid = t.split("\n").map((x) => x.split(""));
const compare = (a, b) => a.cost - b.cost;
const pq = new Heap(compare);

const start = { y: grid.length - 2, x: 1, h: 0, cost: 0 };

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
const results = [];

function walk() {
  let now = pq.pop();
  while (now) {
    if (grid[now.y][now.x] === "E") break;
    for (let nh = 0; nh < 4; nh++) {
      const [ny, nx] = [now.y + dirs[nh][0], now.x + dirs[nh][1]];
      if (grid[ny]?.[nx] === "#") continue; // if its a wall
      if (now.h === nh - 2 || now.h === nh + 2) continue;
      let isTurn = now.h != nh;
      console.log(now, grid[now.y][now.x]);
      pq.push({ y: ny, x: nx, h: nh, cost: now.cost + (isTurn ? 1001 : 1) });
    }
    now = pq.pop();
  }
}

pq.push(start);
walk();

console.log(results);
