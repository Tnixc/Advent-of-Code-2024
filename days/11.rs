use std::collections::HashMap;

fn solve(i: &str, depth: u64) -> () {
    let nums: Vec<u64> = i.split(" ").map(|x| x.parse::<u64>().unwrap()).collect();
    let mut map_to_count: HashMap<u64, u64> = HashMap::new();
    nums.iter().for_each(|&x| {
        map_to_count.insert(x, 1);
    });
    for _blink in 0..depth {
        let cur = map_to_count.clone();
        map_to_count.clear();
        cur.iter().for_each(|(k, amount)| {
            if *k == 0 {
                map_to_count
                    .entry(1)
                    .and_modify(|v| *v += *amount)
                    .or_insert(*amount);
            } else if (k.checked_ilog10().unwrap() + 1) % 2 == 0 {
                let s = k.to_string();
                let (x1, x2) = s.split_at(s.len() / 2);
                let i1 = x1.parse::<u64>().unwrap();
                let i2 = x2.parse::<u64>().unwrap();
                map_to_count
                    .entry(i1)
                    .and_modify(|v| *v += *amount)
                    .or_insert(*amount);
                map_to_count
                    .entry(i2)
                    .and_modify(|v| *v += *amount)
                    .or_insert(*amount);
            } else {
                map_to_count
                    .entry(k * 2024)
                    .and_modify(|v| *v += *amount)
                    .or_insert(*amount);
            }
        });
    }
    let mut total = 0;
    map_to_count.iter().for_each(|(_, a)| total += a);
    println!("{:?}", total)
}

fn main() {
    solve(input, 75);
}

// naive solution
fn p1(nums: Vec<u64>) {
    for _ in 0..25 {
        let mut cur: Vec<u64> = Vec::new();
        nums.iter().for_each(|&x| {
            let s = x.to_string();
            if x == 0 {
                cur.push(1);
            } else if s.len() % 2 == 0 {
                let (x1, x2) = s.split_at(s.len() / 2);
                cur.push(x1.parse::<u64>().unwrap());
                cur.push(x2.parse::<u64>().unwrap());
            } else {
                cur.push(x * 2024)
            }
        });
        nums = cur;
        println!("{:?}", nums.len());
    }
}
