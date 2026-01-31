import { letterMap, VOWELS } from "./constants";
import { normalizeName } from "../utils/normalize";
import { reduceToOneDigit } from "../utils/math";


export function calculateSoulNumber(fullName) {
  if (!fullName) return null;
  const name = normalizeName(fullName);

  let total = 0;
  for (let char of name) {
    if (VOWELS.includes(char)) {
      total += letterMap[char];
    }
  }

  return reduceToOneDigit(total);
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

  return reduceToOneDigit(total);
}


export function calculateDestinyNumber(fullName) {
  if (!fullName) return null;
  const name = normalizeName(fullName);

  let total = 0;
  for (let char of name) {
    total += letterMap[char] || 0;
  }

  return reduceToOneDigit(total);
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