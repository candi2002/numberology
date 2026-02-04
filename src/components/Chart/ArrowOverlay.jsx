export function ArrowOverlay({ arrowsPresent, arrowsMissing, setHoverArrow,  hoverArrrow}) {
  return (
    <svg
      width= "100%"
      height= "100%"
      viewBox="0 0 200 200"
    preserveAspectRatio="none"
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      {[...arrowsMissing, ...arrowsPresent].map(arrow => (
        <line
          key={arrow.key}
          x1={`${arrow.from.x}%`}
          y1={`${arrow.from.y}%`}
          x2={`${arrow.to.x}%`}
          y2={`${arrow.to.y}%`}
          stroke={arrow.type === "present" ? 
            (hoverArrrow && hoverArrrow.key === arrow.key ? "#34d399" : "#16a34a") : 
            (hoverArrrow && hoverArrrow.key === arrow.key ?  "#f87171": "#dc2626")}
          // strokeWidth={3}
          strokeWidth={hoverArrrow && hoverArrrow.key === arrow.key ? 8 : 3}
          // markerEnd={hoverArrrow && hoverArrrow.key === arrow.key ? 
          //   (arrow.type === "present" ? "url(#arrowhead-green-big)" : "url(#arrowhead-red-big)") : ""}
          markerEnd={arrow.type === "present" ? (hoverArrrow && hoverArrrow.key === arrow.key ? "url(#arrowhead-green-big)" : "url(#arrowhead-green-small)") : (hoverArrrow && hoverArrrow.key === arrow.key ? "url(#arrowhead-red-big)" : "url(#arrowhead-red-small)")  }
          onMouseEnter={() => {
            setHoverArrow(arrow);            
          }}
          onMouseLeave={() => setHoverArrow(null)}
          style={{ cursor: "pointer" }}
        />
      ))}

      <defs>
  {/* Mũi tên xanh */}
  <marker
    id="arrowhead-green-small"
    markerWidth="10"
    markerHeight="10"
    refX="7"
    refY="5"
    orient="auto"
    markerUnits="userSpaceOnUse"
  >
    <polygon points="0 0, 10 5, 0 10" fill="#16a34a" />
  </marker> 
  <marker
    id="arrowhead-green-big"
    markerWidth="14"
    markerHeight="14"
    refX="9"
    refY="7"
    orient="auto"
    markerUnits="userSpaceOnUse"
  >
    <polygon points="0 0, 14 7, 0 14" fill="#34d399" />
  </marker>



  {/* Mũi tên đỏ */}
  <marker
    id="arrowhead-red-small"
    markerWidth="10"
    markerHeight="10"
    refX="7"
    refY="5"
    orient="auto"
    markerUnits="userSpaceOnUse"
  >
    <polygon points="0 0, 10 5, 0 10" fill="#dc2626" />
  </marker>

  <marker
    id="arrowhead-red-big"
    markerWidth="14"  
    markerHeight="14"
    refX="6"
    refY="7"
    orient="auto"
    markerUnits="userSpaceOnUse"
  > 
    <polygon points="0 0, 14 7, 0 14" fill="#f87171" />
  </marker>
</defs>
    </svg>
  );
} 