import { letterMap, VOWELS } from "./constants";
import { normalizeName } from "../utils/normalize";
import { reduceToOneDigit, reduceToOneDigitWithSpecial } from "../utils/math";


export function calculateSoulNumber(fullName) {
  if (!fullName) return null;
  const name = normalizeName(fullName);

  let total = 0;
  for (let char of name) {
    if (VOWELS.includes(char)) {
      total += letterMap[char];
    }
  }

  return reduceToOneDigitWithSpecial(total);
}


export function calculatePersonalityNumber(fullName) {
  if (!fullName) return null;
  const name = normalizeName(fullName);

  let total = 0;
  for (let char of name) {
    if (!VOWELS.includes(char)) {
      total += letterMap[char];
    }
  }

  return reduceToOneDigitWithSpecial(total);
}


export function calculateDestinyNumber(fullName) {
  if (!fullName) return null;
  const name = normalizeName(fullName);

  let total = 0;
  for (let char of name) {
    total += letterMap[char] || 0;
  }

  return reduceToOneDigitWithSpecial(total);
}



export function calculateBalanceNumber(fullName) {
  const parts = fullName
    .toUpperCase()
    .split(" ")
    .filter(p => p.length > 0);

  let total = 0;
  for (let part of parts) {
    const char = part[0];
    total += letterMap[char] || 0;
  }

  return reduceToOneDigit(total);
}

export function calculateSubconsciousNumber(fullName) {
  const name = normalizeName(fullName);
  const used = new Set();

  for (let char of name) {
    used.add(letterMap[char]);
  }

  return used.size; // 1–9
}
//So khuyet thieu
export function calculateMissingNumbers(fullName) {
  const name = normalizeName(fullName);
  const used = new Set();
  for (let char of name) {
    used.add(letterMap[char]);
  } 
  const missing = [];
  for (let i = 1; i <= 9; i++) {
    if (!used.has(i)) {
      missing.push(i);
    }
  }
  return missing;
} 
//So dam me (nhiều nhất trong tên)
export function calculatePassionNumber(fullName) {
  const name = normalizeName(fullName);
  const countMap = {};
  for (let char of name) {
    const num = letterMap[char];
    countMap[num] = (countMap[num] || 0) + 1;
  }
  let maxCount = 0;
  let maxNum = 0;
  for (let num in countMap) {
    if (countMap[num] > maxCount) {
      maxCount = countMap[num];
      maxNum = parseInt(num);
    }
  }
  return maxNum;    
}

   //Số bảo mật = số lượng chữ trong tên
export function calculateConfidentialNumber(fullName) {
  const name = normalizeName(fullName);
  return reduceToOneDigit(name.length);
}