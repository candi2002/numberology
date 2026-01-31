import * as NameNum from "./nameNumbers";
import * as DateNum from "./dateNumbers";

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
    const passionNumber = NameNum.calculatePassionNumber(name);
    const confidentialNumber = NameNum.calculateConfidentialNumber(name);

    // Số kết hợp
    //Số trưởng thành = lifePathNumber + destinyNumber
    const maturityNumber = reduceToOneDigit(lifePathNumber + destinyNumber);
    //Số kết nối = lifepathnumber - destinyNumber
    let connectionNumber = Math.abs(lifePathNumber - destinyNumber);
    connectionNumber = reduceToOneDigit(connectionNumber);


 



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
    passionNumber,
    confidentialNumber,
    maturityNumber,
    connectionNumber,
    createAt: new Date().toISOString()
  };
}
