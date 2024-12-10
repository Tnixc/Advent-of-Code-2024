
const test = `0123
1234
8765
9876`;
const t2 = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

const grid = t2.split("\n").map((x) => x.split("").map((y) => Number(y)));
console.log(grid.map((x) => x.join("")).join("\n"));
const dirs = [
  [-1, 0],
  [0, -1],
  [0, +1],
  [+1, 0],
];

function p1() {
  const res = new Map();
  const trailHeadtoPeaks = [];
  function hike(
    origin: string,
    y: number,
    x: number,
    val: number,
    score: number,
  ) {
    console.log("val", val);
    if (val === 9) {
      res.set(origin, (res.get(origin) ?? 0) + 1);
      trailHeadtoPeaks.push(`${origin} ${y} ${x}`);
    }
    for (const direction of dirs) {
      const [dy, dx] = direction;
      if (grid[y - dy]?.at(x - dx) && grid[y - dy][x - dx] === val + 1) {
        hike(origin, y - dy, x - dx, grid[y - dy][x - dx], score);
      }
    }
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === 0) {
        hike(`${y} ${x}`, y, x, 0, 0);
      }
    }
  }
  console.log(res.size);
  console.log(new Set(trailHeadtoPeaks).size);
  // console.log([...res].map(([k, v]) => decode(k), v]));
}

p1();
