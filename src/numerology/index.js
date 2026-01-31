import {
  calculateDestinyNumber,
  calculateSoulNumber,
  calculatePersonalityNumber,
  calculateBalanceNumber,
  calculateSubconsciousNumber
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
    const balanceNumber = calculateBalanceNumber(name);
    const subconsciousNumber = calculateSubconsciousNumber(name);
    const birthChart = birthChartPythagoras(dob);
    const arrows = detectArrows(birthChart);
    const islands = detectIslands(birthChart);



  return {
    name,
    dob,
    lifePathNumber,
    destinyNumber,
    soulUrgeNumber,
    personalityNumber,
    innerSelfNumber,
    balanceNumber,
    subconsciousNumber,
    birthChart,
    arrows,
    islands,
    createAt: new Date().toISOString()
  };
}
