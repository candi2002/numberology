import { reduceToOneDigit } from "../utils/math";


export function calculateLifePathNumber(dob) {
  if (!dob) return null;
    // dob = "yyyy-mm-dd"
    const dobNumber = dob.replaceAll("-", "");
    const dobSum = dobNumber.split("").reduce((a, b) => a + Number(b), 0);
    const lifePathNumber = reduceToOneDigit(dobSum);
    return lifePathNumber;
}

export function calculateInnerSelfNumber(dob) {
  if (!dob) return null;

  // dob = "yyyy-mm-dd"
  const [, month, day] = dob.split("-").map(Number);

  return reduceToOneDigit(day + month);
}

