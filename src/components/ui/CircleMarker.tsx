import { useEffect, useRef } from "react";

const CircleMarker = ({ text = "Update" }) => {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Safety check for ref
    if (!markerRef?.current) return;

    try {
      const marker = markerRef.current;
      const width = marker?.offsetWidth - 10;
      const height = 2 * marker.offsetHeight;
      const ns = "http://www.w3.org/2000/svg";

      // Create and configure SVG with safety checks
      const svg = document.createElementNS(ns, "svg");
      if (!svg) return;

      const styles = {
        width: `${width}px`,
        height: `${height}px`,
        transform: `scale(${(2 * width) / height}, 1)`,
        position: "absolute",
        left: "0",
        top: "-50%",
        right: "0",
        marginLeft: "auto",
        marginRight: "auto",
        pointerEvents: "none"
      };

      // Apply styles safely
      Object.entries(styles).forEach(([key, value]) => {
        if (svg.style) (svg.style as CSSStyleDeclaration)[key as any] = value;
      });

      // Set SVG attributes safely
      const svgAttributes = {
        width,
        height,
        viewBox: "-1 -1 2 2"
      };

      Object.entries(svgAttributes).forEach(([key, value]) => {
        svg.setAttribute(key, String(value));
      });

      // Create and configure path
      const path = document.createElementNS(ns, "path");
      if (!path) return;

      const pathStyles = {
        strokeWidth: "1.0",
        stroke: "hsl(223, 23%, 46%)",
        fill: "none",
        strokeLinecap: "round"
      };

      Object.entries(pathStyles).forEach(([key, value]) => {
        if (path.style) path.style[key as any] = value;
      });

      // Set path attributes safely

      path.setAttribute("pathLength", "100");
      path.setAttribute("vector-effect", "non-scaling-stroke");

      // Generate circle path with safe math operations
      const circlePath = () => {
        const c = 0.551915024494;
        const β = Math.atan(c);
        const d = Math.sqrt(c * c + 1);
        const r = 0.9;

        // Fixed values for consistent shape
        const dr = 0.1;
        const θ0 = 170;
        const dθ = 0.175;

        let θ = (θ0 * Math.PI) / 180;
        let pathData = `M${r * Math.sin(θ)},${r * Math.cos(θ)} C`;

        pathData += `${d * r * Math.sin(θ + β)},${d * r * Math.cos(θ + β)}`;

        for (let i = 0; i < 4; i++) {
          θ += (Math.PI / 2) * (1 + dθ);
          const newR = r * (1 + dr);
          pathData += ` ${i ? "S" : ""} ${d * newR * Math.sin(θ - β)},${
            d * newR * Math.cos(θ - β)
          }`;
          pathData += ` ${newR * Math.sin(θ)},${newR * Math.cos(θ)}`;
        }

        return pathData;
      };

      // Set path data safely
      path.setAttribute("d", circlePath());
      svg.appendChild(path);
      marker.appendChild(svg);

      // Cleanup function
      return () => {
        try {
          if (marker && svg && marker.contains(svg)) {
            marker.removeChild(svg);
          }
        } catch (e) {
          console.warn("Cleanup failed", e);
        }
      };
    } catch (e) {
      console.warn("Circle marker creation failed", e);
    }
  }, []);

  return (
    <span ref={markerRef} className="relative mx-4 ms:mx-5 no-underline">
      {text}
    </span>
  );
};

export default CircleMarker;
