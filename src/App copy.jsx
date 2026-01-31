import { useState } from 'react'
import './App.css'
import { calculateNumerology } from "./numerology/index";


const ARROWS = [
  { key: "123", nums: [1,2,3], present: "Mũi tên Kế hoạch", missing: null },
  { key: "159", nums: [1,5,9], present: "Mũi tên Quyết tâm", missing: "Mũi tên Trì hoãn" },
  { key: "357", nums: [3,5,7], present: "Mũi tên Tâm linh", missing: "Mũi tên Hoài nghi" },
  { key: "369", nums: [3,6,9], present: "Mũi tên Trí tuệ", missing: "Mũi tên Trí nhớ ngắn hạn" },
  { key: "258", nums: [2,5,8], present: "Mũi tên Cân bằng cảm xúc", missing: "Mũi tên Nhạy cảm" },
  { key: "147", nums: [1,4,7], present: "Mũi tên Thực tế", missing: "Mũi tên Thiếu trật tự" },
  { key: "456", nums: [4,5,6], present: "Mũi tên Ý chí", missing: "Mũi tên Uất giận" },
  { key: "789", nums: [7,8,9], present: "Mũi tên Hoạt động", missing: "Mũi tên Thụ động" }
];


const CELL_POS = {
  1: [2,0], 2: [1,0], 3: [0,0],
  4: [2,1], 5: [1,1], 6: [0,1],
  7: [2,2], 8: [1,2], 9: [0,2]
};



function sumDigits(num) {
  return num
    .toString()
    .split("")
    .reduce((a, b) => a + Number(b), 0);
}

function reduceToOneDigit(num) {
  let n = num;
  while (n > 9 && ![11, 22, 33].includes(n)) {
    n = sumDigits(n);
  }
  return n;
}

function ArrowOverlay({ arrowsPresent, arrowsMissing, setHoverArrow, setMousePos }) {
  return (
    <svg
      width={260}
      height={260}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      {[...arrowsPresent, ...arrowsMissing].map(arrow => (
        <line
          key={arrow.key}
          x1={arrow.from.x}
          y1={arrow.from.y}
          x2={arrow.to.x}
          y2={arrow.to.y}
          stroke={arrow.type === "present" ? "#16a34a" : "#dc2626"}
          strokeWidth={3}
          markerEnd={
            arrow.type === "present"
              ? "url(#arrowhead-green)"
              : "url(#arrowhead-red)"
          }
          onMouseEnter={(e) => {
            setHoverArrow(arrow);
            setMousePos({ x: e.clientX, y: e.clientY });
          }}
          onMouseMove={(e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
          }}
          onMouseLeave={() => setHoverArrow(null)}
          style={{ cursor: "pointer" }}
        />
      ))}

      <defs>
  {/* Mũi tên xanh */}
  <marker
    id="arrowhead-green"
    markerWidth="10"
    markerHeight="10"
    refX="7"
    refY="5"
    orient="auto"
    markerUnits="userSpaceOnUse"
  >
    <polygon points="0 0, 10 5, 0 10" fill="#16a34a" />
  </marker>

  {/* Mũi tên đỏ */}
  <marker
    id="arrowhead-red"
    markerWidth="10"
    markerHeight="10"
    refX="7"
    refY="5"
    orient="auto"
    markerUnits="userSpaceOnUse"
  >
    <polygon points="0 0, 10 5, 0 10" fill="#dc2626" />
  </marker>
</defs>
    </svg>
  );
}



function isHighlighted(num, hoverArrow) {
  if (!hoverArrow) return false;
  return hoverArrow.nums.includes(num);
}

function calcPyramid(day, month, year) {
  const d = reduceToOneDigit(day);
  const m = reduceToOneDigit(month);
  const y = reduceToOneDigit(year);

  const birthYear = year;
    // Tuổi các đỉnh (chuẩn Pythagoras)
  const age1 = 36 - reduceToOneDigit(day * 1000000 + month * 10000 + year); // 27t
  const age2 = age1 + 9;
  const age3 = age2 + 9;
  const ageTop = age3 + 9;
  // Tầng 1 (đáy)
  const p1 = reduceToOneDigit(d + m); // 29t
  const p2 = reduceToOneDigit(d + y); // 38t

  // Tầng 2
  const p3 = reduceToOneDigit(p1 + p2);

  // Đỉnh
  const top = reduceToOneDigit( m + y );

   return {
    base: {
      day: d,
      month: m,
      year: y
    },
    level1: {
      p1: { value: p1, age: age1, year: birthYear + age1 },
      p2: { value: p2, age: age2, year: birthYear + age2 },
      
    },
    level2: {
      p3: { value: p3, age: age3, year: birthYear + age3 }
    },
    top: {
      value: top,
      age: ageTop,
      year: birthYear + ageTop
    }
  };
}
function NumerologyPyramid({ dob }) {
  if (!dob) return null;

  const [year, month, day] = dob.split("-").map(Number);
  const data = calcPyramid(day, month, year);

  const Node = ({ x, y, value, age, year }) => (
    <>
      <circle cx={x} cy={y} r={18} fill="#e9d5ff" />
      <text x={x} y={y + 5} textAnchor="middle" fontWeight="bold">
        {value}
      </text>
      {age && (
        <text x={x} y={y + 35} textAnchor="middle" fontSize="11">
          {age}t ({year})
        </text>
      )}
    </>
  );

  return (
    <svg width={360} height={280} style={{ marginTop: 20 }}>

      {/* LINES */}
      {/* Day + Month */}
      <line x1={10} y1={230} x2={100} y2={170} stroke="#2563eb" />
      <line x1={180} y1={230} x2={100} y2={170} stroke="#2563eb" />
      
      {/* Day + Year */}
      <line x1={350} y1={230} x2={260} y2={170} stroke="#2563eb" />
      <line x1={180} y1={230} x2={260} y2={170} stroke="#2563eb" />

    
      {/* p1 + p2 → p3 */}
      <line x1={100} y1={170} x2={180} y2={120} stroke="#2563eb" />
      <line x1={260} y1={170} x2={180} y2={120} stroke="#2563eb" />
      
      {/* Month + Year → TOP (FIX theo yêu cầu bạn) */}
      <line x1={10} y1={230} x2={180} y2={40} stroke="#2563eb" />
      <line x1={350} y1={230} x2={180} y2={40} stroke="#2563eb" />

        
      {/* BASE */}
      <Node x={20} y={230} value={data.base.month} />
      <Node x={180} y={230} value={data.base.day} />
      <Node x={340} y={230} value={data.base.year} />

      {/* LEVEL 1 */}
      <Node {...data.level1.p1} x={100} y={170} />
      <Node {...data.level1.p2} x={260} y={170} />

      {/* LEVEL 2 */}
      {/* <Node x={180} y={120} value={data.level2.p4.value} /> */}
      <Node {...data.level2.p3} x={180} y={120} />
      {/* TOP */}
      <Node {...data.top} x={180} y={40} />

    </svg>
  );
}



////////////////////////

export default function App() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [result, setResult] = useState(null);
  const [showPresent, setShowPresent] = useState(true);
  const [showMissing, setShowMissing] = useState(true);
  const [hoverArrow, setHoverArrow] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const saveCSV = () => {
  if (!result) return;

  const header = "name,dob,lifePath,createdAt\n";
  const row = `${result.name},${result.dob},${result.lifePath},${result.createdAt}\n`;

  const blob = new Blob([header + row], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "numerology.csv";
  a.click();

  URL.revokeObjectURL(url);
};
  return (
    <div className="app">
      <h1>Thần số học</h1>

      {/* FORM */}
      <div className="form-card">
        <input
          type="text"
          placeholder="Nhập họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      <button
        onClick={() => {
          const data = calculateNumerology(name, dob);
          if (!data) {
            setResult("Vui lòng nhập tên và ngày sinh.");
          } else {
            setResult(data);
          }
        }}
      >
        Tính toán
      </button>

      </div>

      {result && (
        <div className="result">
          {typeof result === "string" ? (
            <p className="error">{result}</p>
          ) : (
            <>
              {/* BASIC INFO */}
              <div className="info-block">
                <h2>Kết quả</h2>
                <p><b>Tên:</b> {result.name}</p>
                <p><b>Ngày sinh:</b> {result.dob.split("-").reverse().join("/")}</p>
              </div>

              {/* NUMBERS */}
              <div className="number-grid">
                <div><span>Số đường đời</span><b>{result.lifePathNumber}</b></div>
                <div><span>Số định mệnh</span><b>{result.destinyNumber}</b></div>
                <div><span>Số linh hồn</span><b>{result.soulUrgeNumber}</b></div>
                <div><span>Số tính cách</span><b>{result.personalityNumber}</b></div>
                <div><span>Số nội cảm</span><b>{result.innerSelfNumber}</b></div>
                <div><span>Số cân bằng</span><b>{result.balanceNumber}</b></div>
                <div><span>Số tiềm thức</span><b>{result.subconsciousNumber}</b></div>
              </div>

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
                  className={`toggle-btn ${showMissing ? "active" : ""}`}
                  onClick={() => setShowMissing(p => !p)}
                >
                  {showMissing ? "Ẩn mũi tên thiếu" : "Hiện mũi tên thiếu"}
                </button>
                <button
                  className={`toggle-btn ${showMissing ? "active" : ""}`}
                  onClick={() => setShowMissing(p => !p)}
                >
                  {showMissing ? "Ẩn mũi tên thiếu" : "Hiện mũi tên thiếu"}
                </button>
              </div>
                



              {/* PYTHAGORAS */}
              <h3>Biểu đồ sinh học Pythagoras</h3>

              <div className="birth-chart">
                <div className="grid">
                  {[3,6,9,2,5,8,1,4,7].map(num => (
                    <div
                      key={num}
                      className={`grid-cell ${
                        isHighlighted(num, hoverArrow)
                          ? hoverArrow.type === "present"
                            ? "highlight-present"
                            : "highlight-missing"
                          : ""
                      }`}
                    >
                      {result.birthChart[num]}
                    </div>
                  ))}
                </div>

                <ArrowOverlay
                  arrowsPresent={showPresent ? result.arrows.arrowsPresent : []}
                  arrowsMissing={showMissing ? result.arrows.arrowsMissing : []}
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
              </div>

              {/* ARROW LIST */}
              <h4>Danh sách mũi tên</h4>
              <ul className="arrow-list">
                {result.arrows.arrowsPresent.map(a => (
                  <li
                    key={a.key}
                    className="present"
                    onMouseEnter={() => setHoverArrow(a)}
                    onMouseLeave={() => setHoverArrow(null)}
                  >
                    {a.label}
                  </li>
                ))}
                {result.arrows.arrowsMissing.map(a => (
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

              {/* PYRAMID */}
              <h3>Chu kỳ Kim Tự Tháp 27 năm</h3>
              <div className="pyramid">
                <NumerologyPyramid dob={result.dob} />
              </div>

              <p className="timestamp">
                Thời gian tạo: {result.createAt}
              </p>
            </>
          )}
        </div>
      )}

      <button className="csv-btn" onClick={saveCSV}>
        Lưu kết quả CSV
      </button>
    </div>
  );

}

function detectArrows(chart) {
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
