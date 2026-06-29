import { nursingRemarks, vitals } from "@/lib/chart-data";

const periods = ["朝", "昼", "夕", "夜"] as const;
const periodIndex = { 朝: 0, 昼: 1, 夕: 2, 夜: 3 } as const;

function yForTemperature(temp: number) {
  const top = 22;
  const height = 210;
  return top + ((39 - temp) / 3) * height;
}

function xForPoint(dayIndex: number, period: keyof typeof periodIndex) {
  const cellWidth = 34;
  return 88 + (dayIndex * 4 + periodIndex[period] + 0.5) * cellWidth;
}

export function VitalChart() {
  const cellWidth = 34;
  const labelWidth = 88;
  const graphHeight = 260;
  const chartWidth = labelWidth + vitals.length * periods.length * cellWidth;
  const points = vitals.map((item, index) => ({
    x: xForPoint(index, item.time),
    y: yForTemperature(item.temperature),
    label: `${item.temperature.toFixed(1)}℃`
  }));
  const pointPath = points.map((point) => `${point.x},${point.y}`).join(" ");
  const observationRows = [
    ["血圧", "bp"],
    ["脈拍", "pulse"],
    ["呼吸数", "respiration"],
    ["SpO2", "spo2"],
    ["酸素", "oxygen"]
  ] as const;
  const mealRows = [
    ["朝食 主/副", "morning", 0],
    ["昼食 主/副", "noon", 1],
    ["夕食 主/副", "evening", 2]
  ] as const;

  return (
    <div>
      <p className="hint">横にスクロールできます。</p>
      <div className="vital-scroll" role="region" aria-label="熱型表">
        <div className="vital-chart" style={{ minWidth: chartWidth }}>
          <div className="vital-days" style={{ gridTemplateColumns: `${labelWidth}px repeat(${vitals.length}, ${cellWidth * 4}px)` }}>
            <div className="vital-corner">入院日</div>
            {vitals.map((item) => (
              <div className="vital-day" key={item.day}>
                <strong>{item.day}</strong>
                <span>{item.date}</span>
              </div>
            ))}
          </div>
          <div className="vital-periods" style={{ gridTemplateColumns: `${labelWidth}px repeat(${vitals.length * 4}, ${cellWidth}px)` }}>
            <div />
            {vitals.flatMap((item) =>
              periods.map((period) => (
                <div className="vital-period" key={`${item.day}-${period}`}>
                  {period}
                </div>
              ))
            )}
          </div>

          <svg className="temp-graph" width={chartWidth} height={graphHeight} role="img" aria-label="体温折れ線グラフ">
            <defs>
              <pattern id="temperatureGrid" width={cellWidth} height="35" patternUnits="userSpaceOnUse">
                <path d={`M ${cellWidth} 0 L 0 0 0 35`} fill="none" stroke="#d7ecf6" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x={labelWidth} y="18" width={chartWidth - labelWidth} height="220" fill="url(#temperatureGrid)" />
            {[36, 37, 38, 39].map((temp) => (
              <g key={temp}>
                <line
                  x1={labelWidth}
                  x2={chartWidth}
                  y1={yForTemperature(temp)}
                  y2={yForTemperature(temp)}
                  stroke={temp === 38 ? "#d95b5b" : "#a9c9d8"}
                  strokeWidth={temp === 38 ? 2 : 1}
                />
                <text x="20" y={yForTemperature(temp) + 4} className="temp-axis">
                  {temp}.0℃
                </text>
              </g>
            ))}
            {vitals.map((item, dayIndex) => {
              const x = labelWidth + dayIndex * 4 * cellWidth;
              return (
                <line
                  key={item.day}
                  x1={x}
                  x2={x}
                  y1="18"
                  y2="238"
                  stroke="#7aa2b7"
                  strokeWidth="2"
                />
              );
            })}
            <polyline points={pointPath} fill="none" stroke="#c93535" strokeWidth="3" />
            {points.map((point, index) => (
              <g key={vitals[index].day}>
                <circle cx={point.x} cy={point.y} r="5" fill="#fff" stroke="#c93535" strokeWidth="3" />
                <text x={point.x + 7} y={point.y - 8} className="temp-label">
                  {point.label}
                </text>
                <text x={point.x - 7} y={point.y + 20} className="temp-time">
                  {vitals[index].time}
                </text>
              </g>
            ))}
          </svg>

          <div className="vital-observations">
            {observationRows.map(([label, key]) => (
              <div className="vital-row" key={label} style={{ gridTemplateColumns: `${labelWidth}px repeat(${vitals.length}, ${cellWidth * 4}px)` }}>
                <div className="vital-row-label">{label}</div>
                {vitals.map((item) => (
                  <div className="vital-day-value" key={`${label}-${item.day}`}>
                    {item[key]}
                  </div>
                ))}
              </div>
            ))}
            {mealRows.map(([label, key, column]) => (
              <div className="vital-row" key={label} style={{ gridTemplateColumns: `${labelWidth}px repeat(${vitals.length * 4}, ${cellWidth}px)` }}>
                <div className="vital-row-label">{label}</div>
                {vitals.flatMap((item) =>
                  periods.map((period, periodColumn) => (
                    <div className="vital-meal-value" key={`${label}-${item.day}-${period}`}>
                      {periodColumn === column ? item.meals[key] : ""}
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>

          <div className="vital-remarks">
            <strong>看護備考</strong>
            {nursingRemarks.map(([date, body]) => (
              <p key={date}>
                <span>{date}</span>　{body}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
