export const letterMap = {
  A:1, J:1, S:1,
  B:2, K:2, T:2,
  C:3, L:3, U:3,
  D:4, M:4, V:4,
  E:5, N:5, W:5,
  F:6, O:6, X:6,
  G:7, P:7, Y:7,
  H:8, Q:8, Z:8,
  I:9, R:9
};

export const VOWELS = ["A", "E", "I", "O", "U", "Y"];

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
export const NEIGHBORS = {
  1: [2,4,5],
  2: [1,3,4,5,6],
  3: [2,5,6],
  4: [1,2,5,7,8],
  5: [1,2,3,4,6,7,8,9],
  6: [2,3,5,8,9],
  7: [4,5,8],
  8: [4,5,6,7,9],
  9: [5,6,8]
};