import { useState, useEffect } from "react";
import { ArrowOverlay } from "./ArrowOverlay";
import { IslandOverlay } from "./IslandOverlay";
import { buildChartBundle } from "../../numerology/birthChart";
import "../../App.css";


function Cell({ num, layers, highlighted, highlightType }) {
  const hasValue =
    layers.dob[num] || layers.name[num] || layers.nickname[num];

  if (!hasValue) {
    return <div className="grid-cell empty" />;
  }

  return (
    <div
      className={`grid-cell ${
        highlighted
          ? highlightType === "present"
            ? "highlight-present"
            : "highlight-missing"
          : ""
      }`}
    >
      <div className="cell-digits">
        {layers.dob[num] && (
          <span className="digit digit-dob">{layers.dob[num]}</span>
        )}
        {layers.name[num] && (
          <span className="digit digit-name">{layers.name[num]}</span>
        )}
        {layers.nickname[num] && (
          <span className="digit digit-nickname">
            {layers.nickname[num]}
          </span>
        )}
      </div>
    </div>
  );
}



/* =========================
   MAIN COMPONENT
========================= */
export function NumberChart({
  chartName,
  chart,
  layers,
  arrows,
  islands,
  addNickname,
  setAddNickname,
  savedNickname,
  setSavedNickname
}) {
  const [hoverArrow, setHoverArrow] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [showPresent, setShowPresent] = useState(true);
  const [showMissing, setShowMissing] = useState(true);
  const [showIslands, setShowIslands] = useState(true);

  const [nickname, setNickname] = useState("");

  useEffect(() => {
    setNickname(savedNickname || "");
  }, [savedNickname]);

  const isHighlighted = (num) =>
    hoverArrow && hoverArrow.nums.includes(num);

  return (
    <>
      {/* ================= TOGGLE ================= */}
      <div className="toggle-group">
        <button
          className={`toggle-btn ${showPresent ? "active" : ""}`}
          onClick={() => setShowPresent(p => !p)}
        >
          {showPresent ? "Ẩn mũi tên có" : "Hiện mũi tên có"}
        </button>

        <button
          className={`toggle-btn ${showMissing ? "active" : ""}`}
          onClick={() => setShowMissing(p => !p)}
        >
          {showMissing ? "Ẩn mũi tên thiếu" : "Hiện mũi tên thiếu"}
        </button>

        <button
          className={`toggle-btn ${showIslands ? "active" : ""}`}
          onClick={() => setShowIslands(p => !p)}
        >
          {showIslands ? "Ẩn ốc đảo" : "Hiện ốc đảo"}
        </button>

        <button
          className={`toggle-btn ${addNickname ? "active" : ""}`}
          onClick={() => setAddNickname(p => !p)}
        >
          {/* {addNickname ? "Ẩn nickname" : "Hiện nickname"} */}
          {addNickname ? "Bỏ nickname" : "Thêm nickname"}
        </button>
      </div>

      <h3>Biểu đồ {chartName}</h3>

      {/* ================= WRAPPER ================= */}
      <div className="chart-wrapper">
        {/* ===== Nickname box ===== */}
        <div className={`chart-nickname ${addNickname ? "show" : "hide"}`}>
          <label className="nickname-label">Nickname</label>

          <input
            type="text"
            className="nickname-input"
            placeholder="Nhập nickname..."
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />

          <button
            className="nickname-save-btn"
            onClick={() => setSavedNickname(nickname.trim())}
          >
            Lưu
          </button>

          {savedNickname && (
            <div className="nickname-saved">
              Đã lưu: <strong>{savedNickname}</strong>
            </div>
          )}
        </div>

        {/* ================= CHART ================= */}
        <div className="chart-left">
          <div className="birth-chart">
            <div className="grid">
              {[3, 6, 9, 2, 5, 8, 1, 4, 7].map(num => (
                <Cell
                  key={num}
                  num={num}
                  layers={layers}
                  highlighted={isHighlighted(num)}
                  highlightType={hoverArrow?.type}
                />
              ))}
            </div>


            <ArrowOverlay
              arrowsPresent={showPresent ? arrows.arrowsPresent : []}
              arrowsMissing={showMissing ? arrows.arrowsMissing : []}
              setHoverArrow={setHoverArrow}
              setMousePos={setMousePos}
            />

            {hoverArrow && (
              <div
                className={`arrow-tooltip ${hoverArrow.type}`}
                style={{
                  top: mousePos.y + 12,
                  left: mousePos.x + 12
                }}
              >
                {hoverArrow.label}
              </div>
            )}

            <IslandOverlay islands={showIslands ? islands : []} />
          </div>
        </div>

        {/* ================= LIST ================= */}
        <div className="chart-right">
          <h4>Danh sách mũi tên</h4>
          <ul className="arrow-list">
            {arrows.arrowsPresent.map(a => (
              <li
                key={a.key}
                className="present"
                onMouseEnter={() => setHoverArrow(a)}
                onMouseLeave={() => setHoverArrow(null)}
              >
                {a.label}
              </li>
            ))}
            {arrows.arrowsMissing.map(a => (
              <li
                key={a.key}
                className="missing"
                onMouseEnter={() => setHoverArrow(a)}
                onMouseLeave={() => setHoverArrow(null)}
              >
                {a.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

 

export default function ChartToggle({ dob, name }) {
  if (!dob && !name) return null;

  const [chartType, setChartType] = useState("birth");
  const [addNickname, setAddNickname] = useState(false);
  const [savedNickname, setSavedNickname] = useState("");

  const effectiveNickname =
    addNickname && savedNickname ? savedNickname : null;

  const charts = {
    birth: buildChartBundle({
      dob,
      fullName: null,
      nickname: effectiveNickname
    }),
    name: buildChartBundle({
      dob: null,
      fullName: name,
      nickname: effectiveNickname
    }),
    mixed: buildChartBundle({
      dob,
      fullName: name,
      nickname: effectiveNickname
    })
  };

  const current = charts[chartType];
  if (!current) return null;

  return (
    <>
      <div className="chart-switch">
        {/* <button onClick={() => setChartType("birth")}>Ngày sinh</button> */}
        <button
          className={chartType === "birth" ? "active" : ""}
          onClick={() => setChartType("birth")}
        >Ngày sinh</button>

        <button className={chartType === "name" ? "active" : ""} onClick={() => setChartType("name")}>Tên</button>
        <button className={chartType === "mixed" ? "active" : ""} onClick={() => setChartType("mixed")}>Hỗn hợp</button>
      </div>

      <NumberChart
        chartName={
          chartType === "birth"
            ? "Ngày sinh"
            : chartType === "name"
            ? "Tên"
            : "Hỗn hợp"
        }
        chart={current.chart}
        layers={current.layers}
        arrows={current.arrows}
        islands={current.islands}
        addNickname={addNickname}
        setAddNickname={setAddNickname}
        savedNickname={savedNickname}
        setSavedNickname={setSavedNickname}
      />
    </>
  );
}

