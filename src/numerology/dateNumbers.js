import { reduceToOneDigit} from "../utils/math";

//Số đường đời
export function calculateLifePathNumber(dob) {
  if (!dob) return null;
    // dob = "yyyy-mm-dd"
    const [year, month, day] = dob.split("-").map(Number);
    const dobSum = year + month + day;
    const yearSum = reduceToOneDigit(year);
    const monthSum = reduceToOneDigit(month);
    const daySum = reduceToOneDigit(day);
    const totalSum = yearSum + monthSum + daySum;
    const dobTotalSum = reduceToOneDigit(totalSum);

    return dobTotalSum;
}
//Số nội cảm
export function calculateInnerSelfNumber(dob) {
  if (!dob) return null;

  // dob = "yyyy-mm-dd"
  const [, month, day] = dob.split("-").map(Number);
  const monthSum = reduceToOneDigit(month);
  const daySum = reduceToOneDigit(day);
  return reduceToOneDigit(monthSum + daySum);
}

//Số Ngày sinh
export function calculateBirthdayNumber(dob) {
  if (!dob) return null;
  // dob = "yyyy-mm-dd"
  const day = Number(dob.split("-")[2]);
  return reduceToOneDigit(day);
}

//Số cá nhân
export function calculatePersonalYearNumber(dob, year) {
  if (!dob || !year) return null; 
  // dob = "yyyy-mm-dd"
  const [, month, day] = dob.split("-").map(Number);
  const monthSum = reduceToOneDigit(month);
  const daySum = reduceToOneDigit(day);
  const personalYearSum = reduceToOneDigit(monthSum + daySum + year);
  return personalYearSum;
}
//Số tháng cá nhân
export function calculatePersonalMonthNumber(dob, year, month) {
  if (!dob || !year || !month) return null; 
  const personalYearNumber = calculatePersonalYearNumber(dob, year);
  const personalMonthSum = reduceToOneDigit(personalYearNumber + month);
  return personalMonthSum;
}
//Số ngày cá nhân
export function calculatePersonalDayNumber(dob, year, month, day) {
  if (!dob || !year || !month || !day) return null; 
  const personalMonthNumber = calculatePersonalMonthNumber(dob, year, month);
  const personalDaySum = reduceToOneDigit(personalMonthNumber + day);
  return personalDaySum;
} 
// Số đỉnh cao (Pinnacle Number) -> trả về "X (YY tuổi)"
export function calculatePinnacleNumber(dob, index) {
  if (!dob) return "";

  const [year, month, day] = dob.split("-").map(Number);

  let number;
  let age;

  const m = reduceToOneDigit(month);
  const d = reduceToOneDigit(day);
  const y = reduceToOneDigit(year);

  const lifePath = calculateLifePathNumber(dob);

  switch (index) {
    case 1:
      number = m + d;
      age = 36 - lifePath;
      break;

    case 2:
      number = y + d;
      age = 45 - lifePath;
      break;

    case 3:
      number = (m + d) + (y + d);
      age = 54 - lifePath;
      break;

    case 4:
      number = y + m;
      age = 63 - lifePath;
      break;

    default:
      return "";
  }

  const finalNumber = reduceToOneDigit(number);
  age += (lifePath == 13 || lifePath == 14 || lifePath == 16 || lifePath == 19) ? 9 : 0;

  return `${finalNumber} (${age} tuổi)`;
}


//Số thử thách (4 thử thách ứng với 4 giai đoạn trong cuộc đời)
export function calculateChallengeNumber(dob, index) {
  if (!dob) return "";

  const [year, month, day] = dob.split("-").map(Number);

  let number;
  let age;

  const m = reduceToOneDigit(month);
  const d = reduceToOneDigit(day);
  const y = reduceToOneDigit(year);

  const lifePath = calculateLifePathNumber(dob);


  switch (index) {
    case 1:
      number = m - d;
      age = 36 - lifePath;
      break;

    case 2:
      number = y - d;
      age = 45 - lifePath;
      break;

    case 3:
      number = (m - d) - (y - d);
      age = 54 - lifePath;
      break;

    case 4:
      number = y - m;
      age = 63 - lifePath;
      break;

    default:
      return "";
  }

  // if(lifePath == 13 || lifePath == 14 || lifePath == 16 || lifePath == 19) {
  //   age += 9;
  // }
  age += (lifePath == 13 || lifePath == 14 || lifePath == 16 || lifePath == 19) ? 9 : 0;
  const finalNumber = Math.abs(reduceToOneDigit(number));

  return `${finalNumber} (${age} tuổi)`;
}
