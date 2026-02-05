import { reduceToOneDigit } from "../../utils/math";

export function calcPyramidFromDOB(dob) {
  if (!dob) return null;

  const [year, month, day] = dob.split("-").map(Number);

  const d = reduceToOneDigit(day);
  const m = reduceToOneDigit(month);
  const y = reduceToOneDigit(year);

  const birthYear = year;

  const age1 = 36 - reduceToOneDigit(d + m + y);
  const age2 = age1 + 9;
  const age3 = age2 + 9;
  const ageTop = age3 + 9;

  const p1 = reduceToOneDigit(d + m);
  const p2 = reduceToOneDigit(d + y);
  const p3 = reduceToOneDigit(p1 + p2);
  const top = reduceToOneDigit(m + y);

  return {
    base: {
      day: d,
      month: m,
      year: y
    },
    level1: {
      p1: { value: p1, age: age1, year: birthYear + age1 },
      p2: { value: p2, age: age2, year: birthYear + age2 }
    },
    level2: {
      p3: { value: p3, age: age3, year: birthYear + age3 }
    },
    top: {
      value: top,
      age: ageTop,
      year: birthYear + ageTop
    }
  };
}
