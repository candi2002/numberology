export function ArrowOverlay({ arrowsPresent, arrowsMissing, setHoverArrow, setMousePos }) {
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
