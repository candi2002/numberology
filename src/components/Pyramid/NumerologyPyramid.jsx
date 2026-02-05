import { calcPyramidFromDOB } from './pyramidUtils';
export default function NumerologyPyramid({ dob }) {
  if (!dob) return null;

  const data = calcPyramidFromDOB(dob);
  if (!data) return null;

  const Node = ({ x, y, value, age, year }) => (
    <>
      <circle cx={x} cy={y} r={18} />
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
<svg width="100%" height="100%" viewBox="0 0 360 280" style={{ marginTop: 20 }}>
  {/* LINES */}
  <line x1="2.78%"  y1="82.14%" x2="27.78%" y2="60.71%" />
  <line x1="50%"    y1="82.14%" x2="27.78%" y2="60.71%" />

  <line x1="97.22%" y1="82.14%" x2="72.22%" y2="60.71%" />
  <line x1="50%"    y1="82.14%" x2="72.22%" y2="60.71%" />

  <line x1="27.78%" y1="60.71%" x2="50%" y2="42.86%" />
  <line x1="72.22%" y1="60.71%" x2="50%" y2="42.86%" />

  <line x1="2.78%"  y1="82.14%" x2="50%" y2="14.29%" />
  <line x1="97.22%" y1="82.14%" x2="50%" y2="14.29%" />

        {/* BASE */}
      <Node x={20} y={230} value={data.base.month} />
      <Node x={180} y={230} value={data.base.day} />
      <Node x={340} y={230} value={data.base.year} />

      {/* LEVEL 1 */}
      <Node {...data.level1.p1} x={100} y={170} />
      <Node {...data.level1.p2} x={260} y={170} />

      {/* LEVEL 2 */}
      <Node {...data.level2.p3} x={180} y={120} />

      {/* TOP */}
      <Node {...data.top} x={180} y={40} />
</svg>

    // <svg width={360} height={280} style={{ marginTop: 20 }}>
    //   {/* LINES */}
    //   <line x1={10} y1={230} x2={100} y2={170} />
    //   <line x1={180} y1={230} x2={100} y2={170} />

    //   <line x1={350} y1={230} x2={260} y2={170} />
    //   <line x1={180} y1={230} x2={260} y2={170} />

    //   <line x1={100} y1={170} x2={180} y2={120} />
    //   <line x1={260} y1={170} x2={180} y2={120} />

    //   <line x1={10} y1={230} x2={180} y2={40} />
    //   <line x1={350} y1={230} x2={180} y2={40} />

      // {/* BASE */}
      // <Node x={20} y={230} value={data.base.month} />
      // <Node x={180} y={230} value={data.base.day} />
      // <Node x={340} y={230} value={data.base.year} />

      // {/* LEVEL 1 */}
      // <Node {...data.level1.p1} x={100} y={170} />
      // <Node {...data.level1.p2} x={260} y={170} />

      // {/* LEVEL 2 */}
      // <Node {...data.level2.p3} x={180} y={120} />

      // {/* TOP */}
      // <Node {...data.top} x={180} y={40} />
    // </svg>
  );
}