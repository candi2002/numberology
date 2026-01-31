import { ARROWS, CELL_POS, NEIGHBORS, letterMap } from "./constants";
import { normalizeName } from "../utils/normalize";

function extractDigitsFromDob(dob) {
  if (!dob) return [];
  return dob.replaceAll("-", "").split("");
}

function extractDigitsFromName(name) {
  if (!name) return [];
  const normalized = normalizeName(name);
  return normalized
    .split("")
    .map(c => letterMap[c] || "")
    .filter(Boolean);
}

function buildNumberChart(digits) {
  const chart = {
    1: "", 2: "", 3: "",
    4: "", 5: "", 6: "",
    7: "", 8: "", 9: ""
  };

  for (const d of digits) {
    if (chart[d] !== undefined) {
      chart[d] += d;
    }
  }

  return chart;
}

export function createNumberChart({
  dob = null,
  fullName = null,
  nickname = null
}) {
  if (!dob && !fullName && !nickname) return null;

  const dobDigits = extractDigitsFromDob(dob);
  const nameDigits = extractDigitsFromName(fullName);
  const nickDigits = extractDigitsFromName(nickname);

  const digits = [
    ...dobDigits,
    ...nameDigits,
    ...nickDigits
  ];

  const chart = buildNumberChart(digits);

  return {
    chart,

    // 🔑 metadata cho bước sau
    sources: {
      dob: dobDigits.length > 0,
      name: nameDigits.length > 0,
      nickname: nickDigits.length > 0
    },

    digitCount: digits.length
  };
}

export function detectArrows(chart) {
  const arrowsPresent = [];
  const arrowsMissing = [];

  for (const arrow of ARROWS) {
    const hasAll = arrow.nums.every(n => chart[n].length > 0);
    const hasNone = arrow.nums.every(n => chart[n].length === 0);

    const [a, b, c] = arrow.nums;
    const [row1, col1] = CELL_POS[a];
    const [row3, col3] = CELL_POS[c];

    const arrowData = {
      ...arrow,
      from: { x: col1 * 80 + 40, y: row1 * 80 + 40 },
      to:   { x: col3 * 80 + 40, y: row3 * 80 + 40 }
    };

    if (hasAll) {
      arrowsPresent.push({
        ...arrowData,
        label: arrow.present,
        type: "present"
      });
    }

    if (hasNone) {
      arrowsMissing.push({
        ...arrowData,
        label: arrow.missing,
        type: "missing"
      });
    }
  }

  return { arrowsPresent, arrowsMissing };
}


export function detectIslands(chart) {
  const islands = [];

  for (let n = 1; n <= 9; n++) {
    if (!chart[n] || chart[n].length === 0) continue;

    const neighbors = NEIGHBORS[n];
    const isolated = neighbors.every(nb => chart[nb].length === 0);

    if (!isolated) continue;

    const type =
      [1,3,7,9].includes(n) ? "corner" : "edge";

    const [row, col] = CELL_POS[n];
    const cx = col * 80 + 40;
    const cy = row * 80 + 40;

    islands.push({
      num: n,
      type,
      center: { x: cx, y: cy }
    });
  }

  return islands;
}

export function buildChartBundle({ dob, fullName, nickname }) {
  const dobDigits = extractDigitsFromDob(dob);
  const nameDigits = extractDigitsFromName(fullName);
  const nickDigits = extractDigitsFromName(nickname);

  const totalChart = buildNumberChart([
    ...dobDigits,
    ...nameDigits,
    ...nickDigits
  ]);

  return {
    chart: totalChart,

    layers: {
      dob: buildNumberChart(dobDigits),
      name: buildNumberChart(nameDigits),
      nickname: buildNumberChart(nickDigits)
    },

    arrows: detectArrows(totalChart),
    islands: detectIslands(totalChart)
  };
}

