let state = 1;

// Mulberry32 algorithm by Tommy Ettinger (tommy.ettinger@gmail.com)
// https://gist.github.com/tommyettinger/46a874533244883189143505d203312c
export function next() {
  let z = (state += 0x6d2b79f5);
  z = (z ^ (z >> 15)) * (z | 1);
  z ^= z + (z ^ (z >> 7)) * (z | 61);
  state = z ^ (z >> 14);
  return state;
}

export function nextFloat() {
  return next() / 2 ** 31;
}

export function getSeed() {
  return state;
}

export function setSeed(seed: number) {
  state = seed;
}

setSeed(Math.floor(Math.random() * 2 ** 31));

export function range(min: number, max: number) {
  return min + (next() % (max - min + 1));
}

export function rangeFloat(min: number, max: number) {
  return min + nextFloat() * (max - min);
}

export function dice(sides: number) {
  return next() % sides === 0;
}

export function choose<T>(array: T[]) {
  const index = range(0, array.length - 1);
  return array[index];
}
