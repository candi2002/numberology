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
    // BIRTH CHART
    const birthChart = BC.birthChartPythagoras(dob);
    const arrows = BC.detectArrows(birthChart);
    const islands = BC.detectIslands(birthChart);
    
    // NAME CHART
    const nameChart = BC.nameChartPythagoras(name);
    const nameArrows = BC.detectArrows(nameChart);
    const nameIslands = BC.detectIslands(nameChart);

    //MIXED CHART
    const mixedChart = BC.mixedChartPythagoras(name, dob);
    const mixedArrows = BC.detectArrows(mixedChart);
    const mixedIslands = BC.detectIslands(mixedChart);
    



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
    birthChart,
    arrows,
    islands,
    missingNameNumbers,
    nameChart,
    nameArrows,
    nameIslands,
    mixedChart,
    mixedArrows,
    mixedIslands,
    createAt: new Date().toISOString()
  };
}
