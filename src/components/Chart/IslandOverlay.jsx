// export function IslandOverlay({ islands }) {
//   return (
//     <svg width="100%" height="100%"
//       viewBox="0 0 200 200"
//       style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
//     >
//       {islands.map((island, i) => {
//         const { x, y } = island.center;

//         // const r = 36;          // radius circle bạn thấy đẹp
//         // const s = r * 0.8;   // diamond fit inside circle

//         // const points = `
//         //   ${x} ${y - s}
//         //   ${x + s} ${y}
//         //   ${x} ${y + s}
//         //   ${x - s} ${y}
//         // `;
//         return (
//           <polygon
//             key={i}
//             points={points}
//             stroke="#f59e0b"
//             strokeWidth={4}
//             fill="none"
//             strokeLinejoin="round"
//           />
//         );
//       })}
//     </svg>
//   );
// }
export function IslandOverlay({ islands }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none"
      }}
    >
      {islands.map((island, i) => {
        const { x, y } = island.center;

        const r = 20;      // bán kính theo %
        const s = r * 0.7;

        const points = `
          ${x} ${y - s}
          ${x + s} ${y}
          ${x} ${y + s}
          ${x - s} ${y}
        `;

        return (
          <polygon
            key={i}
            points={points}
            stroke="#f59e0b"
            strokeWidth={1.5}
            fill="none"
            strokeLinejoin="round"
          />
        );
      })}
    </svg>
  );
}
