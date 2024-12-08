
const test = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

function encode(a, b, c = 0) {
  return (a << 10) | (b << 2) | c;
}

function reduce(numerator, denominator) {
  var gcd = function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
  };
  gcd = gcd(numerator, denominator);
  return [numerator / gcd, denominator / gcd];
}

function main(str) {
  const grid = str.split("\n").map((line) => line.split(""));
  const antinodes = new Set();
  const antinodes2 = new Set();
  const h = grid.length;
  const w = grid[0].length;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const cell = grid[y][x];
      if (cell === ".") continue;
      for (let sy = 0; sy < h; sy++) {
        for (let sx = 0; sx < w; sx++) {
          if (sy === y && sx === x) continue;
          const searchCell = grid[sy][sx];
          if (searchCell === cell) {
            const dy = y - sy;
            const dx = x - sx;
            if (grid[sy - dy] && grid[sy - dy][sx - dx]) {
              antinodes.add(encode(sy - dy, sx - dx));
            }
            const [stepY, stepX] = reduce(dy, dx);
            let by = sy - stepY;
            let bx = sx - stepX;
            while (grid[by]?.[bx]) {
              antinodes2.add(encode(by, bx));
              by -= stepY;
              bx -= stepX;
            }

            let fy = sy + stepY;
            let fx = sx + stepX;
            while (grid[fy]?.[fx]) {
              antinodes2.add(encode(fy, fx));
              fy += stepY;
              fx += stepX;
            }
          }
        }
      }
    }
  }

  return [antinodes.size, antinodes2.size];
}
console.log(main(input));
