function formatDateDDMMYYYY(dob) {
  return dob.split("-").reverse().join("/");
}

function joinArrowLabels(arrows = []) {
  return arrows.map(a => a.label).join(" | ");
}

export function downloadCSV(result) {
  if (!result) return;

  const header = [
    "name",
    "dob",
    "lifePathNumber",
    "destinyNumber",
    "soulUrgeNumber",
    "personalityNumber",
    "innerSelfNumber",
    "balanceNumber",
    "subconsciousNumber",
    "arrows_present",
    "arrows_missing",
    "chart_1",
    "chart_2",
    "chart_3",
    "chart_4",
    "chart_5",
    "chart_6",
    "chart_7",
    "chart_8",
    "chart_9",
    "createdAt"
  ].join(",");

  const row = [
    result.name,
    formatDateDDMMYYYY(result.dob),
    result.lifePathNumber,
    result.destinyNumber,
    result.soulUrgeNumber,
    result.personalityNumber,
    result.innerSelfNumber,
    result.balanceNumber,
    result.subconsciousNumber,
    `"${joinArrowLabels(result.arrows.arrowsPresent)}"`,
    `"${joinArrowLabels(result.arrows.arrowsMissing)}"`,
    result.birthChart[1],
    result.birthChart[2],
    result.birthChart[3],
    result.birthChart[4],
    result.birthChart[5],
    result.birthChart[6],
    result.birthChart[7],
    result.birthChart[8],
    result.birthChart[9],
    result.createAt
  ].join(",");

  const csv = header + "\n" + row;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "numerology_full_result.csv";
  a.click();

  URL.revokeObjectURL(url);
}
