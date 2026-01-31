import { useState } from 'react'
import '../App.css'
import { calculateNumerology } from "../numerology/index";
import NumerologyPyramid from '../components/Pyramid/NumerologyPyramid';
import { downloadCSV } from '../utils/csv';
import ChartToggle from '../components/Chart/Chart';

function renderKarmicNumber(value) {
  if (value >= 0) return <b>{value}</b>;

  return (
    <b>
      {Math.abs(value)}
      <span className="karmic-debt"> nợ nghiệp</span>
    </b>
  );
}

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
                {/* Cái này tôi muốn nếu 7 số đầu dương thì để  y vậy, nhưng nếu âm thì đổi sang dương thêm đằng sau số chữ "nợ nghiệp" nhỏ thui, bằng 1/3 bình thường*/}
                
                <div><span>Số đường đời</span>{renderKarmicNumber(result.lifePathNumber)}</div>
                <div><span>Số định mệnh</span>{renderKarmicNumber(result.destinyNumber)}</div>
                <div><span>Số ngày sinh</span>{renderKarmicNumber(result.birthdayNumber)}</div>
                <div><span>Số linh hồn</span>{renderKarmicNumber(result.soulUrgeNumber)}</div>
                <div><span>Số tính cách</span>{renderKarmicNumber(result.personalityNumber)}</div>
                <div><span>Số trưởng thành</span>{renderKarmicNumber(result.maturityNumber)}</div>
                <div><span>Số nội cảm</span>{renderKarmicNumber(result.innerSelfNumber)}</div>


                <div><span>Số cân bằng</span><b>{result.balanceNumber}</b></div>
                <div><span>Số tiềm thức</span><b>{result.subconsciousNumber}</b></div>
                <div><span>Số khuyết thiếu</span><b>{result.missingNameNumbers.join(", ")}</b></div>
                <div><span>Số đam mê</span><b>{result.passionNumber}</b></div>
                <div><span>Số bảo mật</span><b>{result.confidentialNumber}</b></div>
                <div><span>Số kết nối</span><b>{result.connectionNumber}</b></div>
              
              </div>
              {/* Button toggle loại chart */}
              <ChartToggle dob={dob} name={name} />

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
