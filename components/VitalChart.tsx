import { nursingRemarks, vitals } from "@/lib/chart-data";

type VitalDay = (typeof vitals)[number];
type VitalSlot = VitalDay["slots"][number];

const labelWidth = 92;
const dayWidth = 116;
const graphHeight = 300;
const graphTop = 28;
const graphBottom = 250;
const graphInnerHeight = graphBottom - graphTop;

function yFor(value: number, min: number, max: number) {
  return graphTop + ((max - value) / (max - min)) * graphInnerHeight;
}

function xFor(dayIndex: number, slotIndex: number, slotsInDay: number) {
  return labelWidth + dayIndex * dayWidth + ((slotIndex + 1) / (slotsInDay + 1)) * dayWidth;
}

function allPoints() {
  return vitals.flatMap((day, dayIndex) =>
    day.slots.map((slot, slotIndex) => ({
      day,
      dayIndex,
      slot,
      slotIndex,
      x: xFor(dayIndex, slotIndex, day.slots.length)
    }))
  );
}

function polyline(points: { x: number; y: number }[]) {
  return points.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
}

function observationText(day: VitalDay, key: "respiration" | "spo2" | "oxygen") {
  return day.slots.map((slot) => `${slot.time} ${slot[key]}`).join(" / ");
}

export function VitalChart() {
  const chartWidth = labelWidth + vitals.length * dayWidth;
  const points = allPoints();
  const tempPoints = points.map((point) => ({ x: point.x, y: yFor(point.slot.temperature, 32, 40), slot: point.slot }));
  const pulsePoints = points.map((point) => ({ x: point.x, y: yFor(point.slot.pulse, 0, 120), slot: point.slot }));
  const sysPoints = points.map((point) => ({ x: point.x, y: yFor(point.slot.systolic, 0, 160), slot: point.slot }));
  const diaPoints = points.map((point) => ({ x: point.x, y: yFor(point.slot.diastolic, 0, 160), slot: point.slot }));

  const observationRows = [
    ["呼吸数", (day: VitalDay) => observationText(day, "respiration")],
    ["SpO2", (day: VitalDay) => observationText(day, "spo2")],
    ["酸素", (day: VitalDay) => observationText(day, "oxygen")]
  ] as const;

  return (
    <div>
      <p className="hint">スマートフォンでは横にスクロールできます。</p>
      <div className="vital-scroll" role="region" aria-label="熱型表">
        <div className="vital-chart" style={{ minWidth: chartWidth }}>
          <div className="vital-days" style={{ gridTemplateColumns: `${labelWidth}px repeat(${vitals.length}, ${dayWidth}px)` }}>
            <div className="vital-corner">日付</div>
            {vitals.map((item) => (
              <div className="vital-day" key={item.day}>
                <strong>{item.shortDate}</strong>
                <span>{item.day}</span>
              </div>
            ))}
          </div>

          <svg className="vital-graph combined-vital-graph" width={chartWidth} height={graphHeight} role="img" aria-label="体温，脈拍，血圧を重ねた熱型表グラフ">
            <rect x={labelWidth} y={graphTop} width={chartWidth - labelWidth} height={graphInnerHeight} fill="#f8fbfc" />
            {Array.from({ length: vitals.length + 1 }, (_, index) => {
              const x = labelWidth + index * dayWidth;
              return <line key={index} x1={x} x2={x} y1={graphTop} y2={graphBottom} stroke="#7ea1b2" strokeWidth="1.8" />;
            })}
            {Array.from({ length: 9 }, (_, index) => {
              const y = graphTop + index * (graphInnerHeight / 8);
              return <line key={index} x1={labelWidth} x2={chartWidth} y1={y} y2={y} stroke="#d8e7ee" strokeWidth="1" />;
            })}
            <line x1={labelWidth} x2={chartWidth} y1={yFor(38, 32, 40)} y2={yFor(38, 32, 40)} stroke="#d95b5b" strokeWidth="2.2" />
            <text x="10" y={yFor(40, 32, 40) + 4} className="temp-axis vital-temp-scale">40℃</text>
            <text x="10" y={yFor(38, 32, 40) + 4} className="temp-axis vital-temp-scale">38℃</text>
            <text x="10" y={yFor(36, 32, 40) + 4} className="temp-axis vital-temp-scale">36℃</text>
            <text x="58" y={yFor(120, 0, 160) + 4} className="temp-axis vital-shared-scale">120</text>
            <text x="58" y={yFor(80, 0, 160) + 4} className="temp-axis vital-shared-scale">80</text>
            <text x="58" y={yFor(40, 0, 160) + 4} className="temp-axis vital-shared-scale">40</text>

            <polyline points={polyline(tempPoints)} fill="none" stroke="#c93535" strokeWidth="2.8" />
            <polyline points={polyline(pulsePoints)} fill="none" stroke="#286fb7" strokeWidth="2.4" />
            <polyline points={polyline(sysPoints)} fill="none" stroke="#2d3438" strokeWidth="2.4" />
            <polyline points={polyline(diaPoints)} fill="none" stroke="#65737b" strokeWidth="2.4" strokeDasharray="5 4" />

            {tempPoints.map((point) => (
              <circle key={`bt-${point.slot.time}-${point.x}`} cx={point.x} cy={point.y} r="4" fill="#fff" stroke="#c93535" strokeWidth="2" />
            ))}
            {pulsePoints.map((point) => (
              <circle key={`hr-${point.slot.time}-${point.x}`} cx={point.x} cy={point.y} r="3.5" fill="#fff" stroke="#286fb7" strokeWidth="2" />
            ))}
            {sysPoints.map((point) => (
              <circle key={`sys-${point.slot.time}-${point.x}`} cx={point.x} cy={point.y} r="3.5" fill="#fff" stroke="#2d3438" strokeWidth="2" />
            ))}
            {diaPoints.map((point) => (
              <circle key={`dia-${point.slot.time}-${point.x}`} cx={point.x} cy={point.y} r="3.5" fill="#fff" stroke="#65737b" strokeWidth="2" />
            ))}

            {points.map((point) => (
              <text key={`time-${point.day.date}-${point.slot.time}`} x={point.x} y={graphBottom + 18} className="temp-time" textAnchor="middle">
                {point.slot.time}
              </text>
            ))}
            <g className="vital-legend">
              <text x={labelWidth + 12} y="18" fill="#c93535">BT</text>
              <text x={labelWidth + 58} y="18" fill="#286fb7">HR</text>
              <text x={labelWidth + 106} y="18" fill="#2d3438">SYS</text>
              <text x={labelWidth + 162} y="18" fill="#65737b">DIA</text>
            </g>
          </svg>

          <div className="vital-observations">
            {observationRows.map(([label, getValue]) => (
              <div className="vital-row" key={label} style={{ gridTemplateColumns: `${labelWidth}px repeat(${vitals.length}, ${dayWidth}px)` }}>
                <div className="vital-row-label">{label}</div>
                {vitals.map((day) => (
                  <div className="vital-day-value vital-observation-cell" key={`${label}-${day.date}`}>
                    {getValue(day)}
                  </div>
                ))}
              </div>
            ))}
            <div className="vital-row" style={{ gridTemplateColumns: `${labelWidth}px repeat(${vitals.length}, ${dayWidth}px)` }}>
              <div className="vital-row-label">食事 主/副</div>
              {vitals.map((item) => (
                <div className="vital-meal-set" key={`meal-${item.date}`}>
                  <span>朝 {item.meals.morning}</span>
                  <span>昼 {item.meals.noon}</span>
                  <span>夕 {item.meals.evening}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="vital-remarks" style={{ gridTemplateColumns: `${labelWidth}px repeat(${vitals.length}, ${dayWidth}px)` }}>
            <div className="vital-row-label">看護備考</div>
            {vitals.map((item) => {
              const dayRemarks = nursingRemarks.filter((remark) => remark.date === item.date);
              return (
                <div className="vital-remark-cell" key={item.date}>
                  {dayRemarks.map((remark) => (
                    <p key={`${remark.time}-${remark.body}`}>
                      <span>{remark.time}</span> {remark.body}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
