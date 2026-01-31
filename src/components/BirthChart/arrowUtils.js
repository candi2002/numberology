export const ARROWS = [
  { key: "123", nums: [1,2,3], present: "Mũi tên Kế hoạch", missing: null },
  { key: "159", nums: [1,5,9], present: "Mũi tên Quyết tâm", missing: "Mũi tên Trì hoãn" },
  { key: "357", nums: [3,5,7], present: "Mũi tên Tâm linh", missing: "Mũi tên Hoài nghi" },
  { key: "369", nums: [3,6,9], present: "Mũi tên Trí tuệ", missing: "Mũi tên Trí nhớ ngắn hạn" },
  { key: "258", nums: [2,5,8], present: "Mũi tên Cân bằng cảm xúc", missing: "Mũi tên Nhạy cảm" },
  { key: "147", nums: [1,4,7], present: "Mũi tên Thực tế", missing: "Mũi tên Thiếu trật tự" },
  { key: "456", nums: [4,5,6], present: "Mũi tên Ý chí", missing: "Mũi tên Uất giận" },
  { key: "789", nums: [7,8,9], present: "Mũi tên Hoạt động", missing: "Mũi tên Thụ động" }
];


export const CELL_POS = {
  1: [2,0], 2: [1,0], 3: [0,0],
  4: [2,1], 5: [1,1], 6: [0,1],
  7: [2,2], 8: [1,2], 9: [0,2]
};

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