export function removeVietnameseTones(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

export function normalizeName(name) {
  return removeVietnameseTones(name)
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
}
