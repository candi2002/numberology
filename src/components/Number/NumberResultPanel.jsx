import { useState } from "react";

/* =========================
   CONFIG DUY NHẤT
========================= */
const NUMBER_CONFIG = [
    { key: "lifePathNumber", label: "Số đường đời", karmic: true },
  { key: "destinyNumber", label: "Số định mệnh", karmic: true },
  { key: "birthdayNumber", label: "Số ngày sinh", karmic: true },
  { key: "soulUrgeNumber", label: "Số linh hồn", karmic: true },
  { key: "personalityNumber", label: "Số tính cách", karmic: true },
  { key: "maturityNumber", label: "Số trưởng thành", karmic: true },
  { key: "innerSelfNumber", label: "Số nội cảm", karmic: true },

  { key: "balanceNumber", label: "Số cân bằng" },
  { key: "subconsciousNumber", label: "Số tiềm thức" },
  { key: "missingNameNumbers", label: "Số khuyết thiếu", array: true },
  { key: "passionNumber", label: "Số đam mê" },
  { key: "confidentialNumber", label: "Số bảo mật" },
  { key: "connectionNumber", label: "Số kết nối" },
];

/* =========================
   HELPER RENDER
========================= */
function renderKarmicNumber(value) {
  if (value >= 0) return <b>{value}</b>;

  return (
    <b>
      {Math.abs(value)}
      <span className="karmic-debt"> nợ nghiệp</span>
    </b>
  );
}

/* =========================
   MAIN COMPONENT
========================= */
export default function NumberResultPanel({ result }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [visible, setVisible] = useState(
    Object.fromEntries(NUMBER_CONFIG.map(n => [n.key, true]))
  );

  const toggle = key =>
    setVisible(v => ({ ...v, [key]: !v[key] }));

  const selectAll = () =>
    setVisible(Object.fromEntries(NUMBER_CONFIG.map(n => [n.key, true])));

  const deselectAll = () =>
    setVisible(Object.fromEntries(NUMBER_CONFIG.map(n => [n.key, false])));

  const selectedCount = Object.values(visible).filter(Boolean).length;

  return (
    <>
      {/* ================= FILTER BUTTON ================= */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <button onClick={() => setFilterOpen(v => !v)}>
          ⚙️ ({selectedCount}/{NUMBER_CONFIG.length})
        </button>

        {filterOpen && (
          <div
            style={{
              position: "absolute",
              top: "110%",
              right: 0,
              background: "#fff",
              borderRadius: 12,
              padding: 12,
              boxShadow: "0 10px 30px rgba(0,0,0,.15)",
              zIndex: 100,
              width: 260,
            }}
          >
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <button onClick={selectAll}>Chọn tất cả</button>
              <button onClick={deselectAll}>Bỏ chọn</button>
            </div>

            {NUMBER_CONFIG.map(n => (
              <label
                key={n.key}
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  fontSize: 14,
                  marginBottom: 4,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={visible[n.key]}
                  onChange={() => toggle(n.key)}
                />
                {n.label}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* ================= NUMBER GRID ================= */}
      <div className="number-grid">
        {NUMBER_CONFIG.map(cfg => {
          if (!visible[cfg.key]) return null;

          const value = result[cfg.key];
          if (value == null) return null;

          return (
            <div key={cfg.key}>
              <span>{cfg.label}</span>

              {cfg.karmic ? (
                renderKarmicNumber(value)
              ) : (
                <b>{cfg.array ? value.join(", ") : value}</b>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
