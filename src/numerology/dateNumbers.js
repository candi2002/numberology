import { reduceToOneDigit, reduceToOneDigitWithSpecial } from "../utils/math";

//Số đường đời
export function calculateLifePathNumber(dob) {
  if (!dob) return null;
    // dob = "yyyy-mm-dd"
    const dobNumber = dob.replaceAll("-", "");
    const dobSum = dobNumber.split("").reduce((a, b) => a + Number(b), 0);
    const lifePathNumber = reduceToOneDigitWithSpecial(dobSum);
    return lifePathNumber;
}
//Số nội cảm
export function calculateInnerSelfNumber(dob) {
  if (!dob) return null;

  // dob = "yyyy-mm-dd"
  const [, month, day] = dob.split("-").map(Number);

  return reduceToOneDigitWithSpecial(day + month);
}
//Số Ngày sinh
export function calculateBirthdayNumber(dob) {
  if (!dob) return null;
  // dob = "yyyy-mm-dd"
  const day = Number(dob.split("-")[2]);
  return reduceToOneDigitWithSpecial(day);
}


