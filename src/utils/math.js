export function sumDigits(num) {
  return num
    .toString()
    .split("")
    .reduce((a, b) => a + Number(b), 0);
}

export function reduceToOneDigit(num) {
  let n = num;
  while (n > 9 && ![11, 22, 33].includes(n)) {
    n = sumDigits(n);
  }
  return n;
}