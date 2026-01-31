import { useState } from "react";
import { ArrowOverlay } from "./ArrowOverlay";
import { IslandOverlay } from "./IslandOverlay";
import "../../App.css";
export function NumberChart({
  chartName,
  chart,
  arrows,
  islands
}) {
  const [hoverArrow, setHoverArrow] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showPresent, setShowPresent] = useState(true);
  const [showMissing, setShowMissing] = useState(true);
  const [showIslands, setShowIslands] = useState(true);
  const isHighlighted = (num) =>
    hoverArrow && hoverArrow.nums.includes(num);
  return (
    <>
              {/* TOGGLE */}
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
                  className={`toggle-btn ${showMissing ? "active" : ""}`}
                  onClick={() => setShowMissing(p => !p)}
                >
                  {showMissing ? "Ẩn mũi tên thiếu" : "Hiện mũi tên thiếu"}
                </button>
      </div>

      <h3>Biểu đồ {chartName}</h3>

      {/* KHUNG CĂN GIỮA */}
      <div className="chart-wrapper">
        {/* BIỂU ĐỒ */}
        <div className="chart-left">
          <div className="birth-chart">
            <div className="grid">
              {[3,6,9,2,5,8,1,4,7].map(num => (
                <div
                  key={num}
                  className={`grid-cell ${
                    isHighlighted(num)
                      ? hoverArrow.type === "present"
                        ? "highlight-present"
                        : "highlight-missing"
                      : ""
                  }`}
                >
                  {chart[num]}
                </div>
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
                style={{ top: mousePos.y + 12, left: mousePos.x + 12 }}
              >
                {hoverArrow.label}
              </div>
            )}

            <IslandOverlay islands={showIslands ? islands : []} />
          </div>
        </div>

        {/* DANH SÁCH MŨI TÊN */}
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
export default function ChartToggle({ result }) {
  const [chartType, setChartType] = useState("birth");

  if (!result) return null;

  const chartMap = {
    birth: {
      name: "Ngày sinh",
      chart: result.birthChart,
      arrows: result.arrows,
      islands: result.islands
    },
    name: {
      name: "Tên",
      chart: result.nameChart,
      arrows: result.nameArrows,
      islands: result.nameIslands
    },
    mixed: {
      name: "Hỗn hợp",
      chart: result.mixedChart,
      arrows: result.mixedArrows,
      islands: result.mixedIslands
    }
  };

  const current = chartMap[chartType];

  return (
    <>
      {/* TOGGLE BUTTON */}
      <div className="chart-switch">
        <button
          className={chartType === "birth" ? "active" : ""}
          onClick={() => setChartType("birth")}
        >
          Ngày sinh
        </button>

        <button
          className={chartType === "name" ? "active" : ""}
          onClick={() => setChartType("name")}
        >
          Tên
        </button>

        <button
          className={chartType === "mixed" ? "active" : ""}
          onClick={() => setChartType("mixed")}
        >
          Hỗn hợp
        </button>
      </div>



      <NumberChart
        chartName={current.name}
        chart={current.chart}
        arrows={current.arrows}
        islands={current.islands}
      />
    </>
  );
}
