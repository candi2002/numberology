import * as NameNum from "./nameNumbers";
import * as DateNum from "./dateNumbers";
import { reduceToOneDigitWithSpecial, reduceToOneDigit } from "../utils/math";

export function calculateNumerology(name, dob) {
  if (!name || !dob) {
    return null; // ❗ chỉ return data
  }

  //7 con số chính
    // DATE NUMBERS
    const lifePathNumber = DateNum.calculateLifePathNumber(dob);//Số đường đời
    const innerSelfNumber = DateNum.calculateInnerSelfNumber(dob);//Số nội cảm
    const birthdayNumber = DateNum.calculateBirthdayNumber(dob);//Số ngày sinh
    // NAME NUMBERS
    const destinyNumber = NameNum.calculateDestinyNumber(name);//Số định mệnh
    const soulUrgeNumber = NameNum.calculateSoulNumber(name);//Số linh hồn
    const personalityNumber = NameNum.calculatePersonalityNumber(name);//Số tính cách

        // Số kết hợp
    const maturityNumber = reduceToOneDigitWithSpecial(Math.abs(lifePathNumber) + Math.abs(destinyNumber));//Số trưởng thành



    const balanceNumber = NameNum.calculateBalanceNumber(name);//Số cân bằng
    const subconsciousNumber = NameNum.calculateSubconsciousNumber(name);//Số tiềm thức
    const missingNameNumbers = NameNum.calculateMissingNumbers(name);//Số khuyết thiếu
    const passionNumber = NameNum.calculatePassionNumber(name);//Số đam mê
    const confidentialNumber = NameNum.calculateConfidentialNumber(name);//Số bảo mật


    let connectionNumber = Math.abs(Math.abs(lifePathNumber) - Math.abs(destinyNumber));//Số kết nối
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
