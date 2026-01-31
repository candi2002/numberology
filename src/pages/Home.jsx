import { useState } from 'react'
import '../App.css'
import { calculateNumerology } from "../numerology/index";
import NumerologyPyramid from '../components/Pyramid/NumerologyPyramid';
import { downloadCSV } from '../utils/csv';
import ChartToggle from '../components/Chart/Chart';


export default function Home() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [result, setResult] = useState(null);



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
                <div><span>Số sinh nhật</span><b>{result.birthdayNumber}</b></div>
                <div><span>Số khuyết thiếu</span><b>{result.missingNameNumbers.join(", ")}</b></div>
              </div>
              {/* Button toggle loại chart */}
              <ChartToggle result={result} />


              
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

    <button className="csv-btn" onClick={() => downloadCSV(result)}>
      Lưu CSV (tải về)
    </button>

    </div>
  );

}
