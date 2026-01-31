import * as NameNum from "./nameNumbers";
import * as DateNum from "./dateNumbers";
import * as BC from "./birthChart";
// import * as NC from "./nameChart";
export function calculateNumerology(name, dob) {
  if (!name || !dob) {
    return null; // ❗ chỉ return data
  }
    // DATE NUMBERS
    const innerSelfNumber = DateNum.calculateInnerSelfNumber(dob);
    const birthdayNumber = DateNum.calculateBirthdayNumber(dob);
    const lifePathNumber = DateNum.calculateLifePathNumber(dob);
    // NAME NUMBERS
    const destinyNumber = NameNum.calculateDestinyNumber(name);
    const soulUrgeNumber = NameNum.calculateSoulNumber(name);
    const personalityNumber = NameNum.calculatePersonalityNumber(name);
    const balanceNumber = NameNum.calculateBalanceNumber(name);
    const subconsciousNumber = NameNum.calculateSubconsciousNumber(name);
    const missingNameNumbers = NameNum.calculateMissingNumbers(name);



  return {
    name,
    dob,
    lifePathNumber,
    destinyNumber,
    soulUrgeNumber,
    personalityNumber,
    innerSelfNumber,
    birthdayNumber,
    balanceNumber,
    subconsciousNumber,
    missingNameNumbers,
    createAt: new Date().toISOString()
  };
}
