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
    const personalYearNumber = DateNum.calculatePersonalYearNumber(dob, new Date().getFullYear());//Số cá nhân
    const personalMonthNumber = DateNum.calculatePersonalMonthNumber(dob, new Date().getFullYear(), new Date().getMonth() + 1);//Số tháng cá nhân
    const personalDayNumber = DateNum.calculatePersonalDayNumber(dob, new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());//Số ngày cá nhân  
    const challengeNumber1 = DateNum.calculateChallengeNumber(dob, 1);
    const challengeNumber2 = DateNum.calculateChallengeNumber(dob, 2);
    const challengeNumber3 = DateNum.calculateChallengeNumber(dob, 3);
    const challengeNumber4 = DateNum.calculateChallengeNumber(dob, 4);
    const pinnacleNumber1 = DateNum.calculatePinnacleNumber(dob,1);
    const pinnacleNumber2 = DateNum.calculatePinnacleNumber(dob,2);
    const pinnacleNumber3 = DateNum.calculatePinnacleNumber(dob,3);
    const pinnacleNumber4 = DateNum.calculatePinnacleNumber(dob,4);

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
    personalYearNumber,
    personalMonthNumber,
    personalDayNumber,
    pinnacleNumber1,
    pinnacleNumber2,
    pinnacleNumber3,
    pinnacleNumber4,
    challengeNumber1,
    challengeNumber2,
    challengeNumber3,
    challengeNumber4,
    createAt: new Date().toISOString()
  };
}
