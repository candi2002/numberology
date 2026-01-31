import {
  calculateDestinyNumber,
  calculateSoulNumber,
  calculatePersonalityNumber,
  calculateBalanceNumber,
  calculateSubconsciousNumber,
  calculateBirthdayNumber
} from "./nameNumbers";

import * as DateNum from "./dateNumbers";
import { birthChartPythagoras, detectArrows, detectIslands } from "./birthChart";

export function calculateNumerology(name, dob) {
  if (!name || !dob) {
    return null; // ❗ chỉ return data
  }

    const lifePathNumber = DateNum.calculateLifePathNumber(dob);
    const destinyNumber = calculateDestinyNumber(name);
    const soulUrgeNumber = calculateSoulNumber(name);
    const personalityNumber = calculatePersonalityNumber(name);
    const innerSelfNumber = DateNum.calculateInnerSelfNumber(dob);
    const birthdayNumber = DateNum.calculateBirthdayNumber(dob);
    const balanceNumber = calculateBalanceNumber(name);
    const subconsciousNumber = calculateSubconsciousNumber(name);
    const birthChart = birthChartPythagoras(dob);
    const arrows = detectArrows(birthChart);
    const islands = detectIslands(birthChart);
    const missingNumbers = DateNum.findMissingNumbers(dob);

    
    
    



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
    missingNumbers,
    createAt: new Date().toISOString()
  };
}
