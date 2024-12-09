
const test = `2333133121414131402`;
const t2 = `2289937361462537565743654392191430243285795130435159294739821058371166572674439596984`;
const t3 = `12345`;
const chars = test.split("");
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

function split_contiguous(arr: any[]) {
  var res = [];
  var prev = arr[0];
  var prevcount = 1;
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] !== prev) {
      res.push({ item: prev, count: prevcount });
      prevcount = 0;
    }
    prevcount++;
    prev = arr[i];
  }
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

  let con = split_contiguous(map);
  for (let goal_index = con.length - 1; goal_index >= 0; goal_index--) {
    if (con[goal_index].item != ".") {
      let search_index = 0;
      while (search_index <= goal_index) {
        if (
          con[search_index].item === "." &&
          con[search_index].count >= con[goal_index].count
        ) {
          const search_count = con[search_index].count;
          const goal_count = con[goal_index].count;
          const remaining = search_count - goal_count;
          con[search_index].item = con[goal_index].item;
          con[goal_index].item = ".";
          con.splice(
            search_index,
            1,
            {
              item: con[search_index].item,
              count: goal_count,
            },
            {
              item: ".",
              count: remaining,
            },
          );
          break;
        }
        search_index++;
      }
    }
    const ncon = [];
    for (const sec of con) {
      for (let i = 0; i < sec.count; i++) {
        if (sec.count > 0) ncon.push(sec.item);
      }
    }
    con = split_contiguous(ncon);
    // console.log(ncon.join(""));
  }
  const res = [];
  for (const sec of con) {
    for (let i = 0; i < sec.count; i++) {
      res.push(sec.item);
    }
  }
  console.log(res);
  let c2 = 0;
  for (let k = 0; k < res.length; k++) {
    if (res[k] != ".") {
      c2 = c2 + k * res[k];
    }
  }
  console.log(c2);
}
p2();
