import { SIZE, facts, fmt, parcelCenter, terrain } from "./terrain";

const pts = (points: number[][]) => points.map(([x, y]) => `${x},${y}`).join(" ");

const mainRiver = terrain.rivers.find((r) => r.main);

// Prancha em SVG: primeiro quadro enquanto o 3D carrega e versão completa
// para quem prefere menos movimento ou não tem WebGL (aproximada do imóvel).
export function TerrainStatic({ complete }: { complete: boolean }) {
  return (
    <svg
      viewBox={complete ? "300 230 330 300" : `0 0 ${SIZE.width} ${SIZE.height}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="i3-parcel">
          <polygon points={pts(terrain.parcel.polygon)} />
        </clipPath>
        <pattern id="i3-hatch" width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="3.2" stroke="#005C74" strokeWidth="0.7" strokeOpacity="0.55" />
        </pattern>
      </defs>
      <image href="/hero/contours.svg" width={SIZE.width} height={SIZE.height} />
      <g fill="none" stroke="#005C74" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
        {terrain.rivers.map((river, i) => (
          <polyline
            key={i}
            points={pts(river.points)}
            strokeWidth={river.main ? 2.2 : 1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
      {complete && (
        <g>
          <polygon points={pts(terrain.reserve.polygon)} fill="url(#i3-hatch)" />
          {mainRiver && (
            <polyline
              points={pts(mainRiver.points)}
              clipPath="url(#i3-parcel)"
              fill="none"
              stroke="#005C74"
              strokeOpacity="0.4"
              strokeWidth={(2 * facts.appWidthM) / terrain.metersPerPixel}
              strokeLinecap="round"
            />
          )}
          <polygon
            points={pts(terrain.parcel.polygon)}
            fill="#005C74"
            fillOpacity="0.06"
            stroke="#FF6A13"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {terrain.parcel.vertices.map((v) => (
            <circle key={v.id} cx={v.x} cy={v.y} r="2.6" fill="#FF6A13" stroke="#fff" strokeWidth="1" />
          ))}
          <image
            href="/brand/logo-i3geo-pin.svg"
            x={parcelCenter[0] - 9}
            y={parcelCenter[1] - 23}
            width="18"
            height="23"
          />
          <text
            x={parcelCenter[0]}
            y={parcelCenter[1] + 10}
            textAnchor="middle"
            className="fill-brand text-[7px] font-semibold"
          >
            {fmt.ha(facts.areaHa)}
          </text>
        </g>
      )}
    </svg>
  );
}
