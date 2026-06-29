import { nursingRemarks, vitals } from "@/lib/chart-data";

const slotCount = 4;

type VitalDay = (typeof vitals)[number];
type VitalSlot = NonNullable<VitalDay["slots"][number]>;

function getAllSlots() {
  return vitals.flatMap((day, dayIndex) =>
    day.slots.map((slot, slotIndex) => ({ day, dayIndex, slot, slotIndex }))
  );
}

function xForSlot(dayIndex: number, slotIndex: number, labelWidth: number, cellWidth: number) {
  return labelWidth + (dayIndex * slotCount + slotIndex + 0.5) * cellWidth;
}

function yForValue(value: number, min: number, max: number, top: number, height: number) {
  return top + ((max - value) / (max - min)) * height;
}

function linePoints(
  slots: ReturnType<typeof getAllSlots>,
  labelWidth: number,
  cellWidth: number,
  getValue: (slot: VitalSlot) => number
) {
  return slots
    .filter((entry): entry is typeof entry & { slot: VitalSlot } => Boolean(entry.slot))
    .map((entry) => ({
      x: xForSlot(entry.dayIndex, entry.slotIndex, labelWidth, cellWidth),
      value: getValue(entry.slot),
      slot: entry.slot
    }));
}

function ChartPanel({
  title,
  color,
  min,
  max,
  ticks,
  unit,
  lines,
  chartWidth,
  labelWidth,
  cellWidth
}: {
  title: string;
  color: string;
  min: number;
  max: number;
  ticks: number[];
  unit: string;
  lines: { label: string; color?: string; points: { x: number; value: number; slot: VitalSlot }[] }[];
  chartWidth: number;
  labelWidth: number;
  cellWidth: number;
}) {
  const top = 18;
  const height = 112;
  const panelHeight = 154;

  return (
    <svg className="vital-graph" width={chartWidth} height={panelHeight} role="img" aria-label={`${title}グラフ`}>
      <rect x={labelWidth} y={top} width={chartWidth - labelWidth} height={height} fill="#fbfdfe" />
      {Array.from({ length: vitals.length * slotCount + 1 }, (_, index) => {
        const x = labelWidth + index * cellWidth;
        const isDayBorder = index % slotCount === 0;
        return (
          <line
            key={index}
            x1={x}
            x2={x}
            y1={top}
            y2={top + height}
            stroke={isDayBorder ? "#7aa2b7" : "#d7ecf6"}
            strokeWidth={isDayBorder ? 2 : 1}
          />
        );
      })}
      {ticks.map((tick) => (
        <g key={tick}>
          <line
            x1={labelWidth}
            x2={chartWidth}
            y1={yForValue(tick, min, max, top, height)}
            y2={yForValue(tick, min, max, top, height)}
            stroke={title === "体温" && tick === 38 ? "#d95b5b" : "#a9c9d8"}
            strokeWidth={title === "体温" && tick === 38 ? 2 : 1}
          />
          <text x="12" y={yForValue(tick, min, max, top, height) + 4} className="temp-axis">
            {tick}{unit}
          </text>
        </g>
      ))}
      <text x="12" y="14" className="graph-title">
        {title}
      </text>
      {lines.map((line) => {
        const points = line.points
          .map((point) => `${point.x},${yForValue(point.value, min, max, top, height)}`)
          .join(" ");
        return (
          <g key={line.label}>
            <polyline points={points} fill="none" stroke={line.color || color} strokeWidth="2.5" />
            {line.points.map((point) => (
              <circle
                key={`${line.label}-${point.slot.time}-${point.value}`}
                cx={point.x}
                cy={yForValue(point.value, min, max, top, height)}
                r="4"
                fill="#fff"
                stroke={line.color || color}
                strokeWidth="2"
              />
            ))}
          </g>
        );
      })}
      {lines.length > 1 ? (
        <g>
          {lines.map((line, index) => (
            <text key={line.label} x={labelWidth + 10 + index * 52} y={panelHeight - 10} className="graph-legend">
              {line.label}
            </text>
          ))}
        </g>
      ) : null}
    </svg>
  );
}

export function VitalChart() {
  const cellWidth = 42;
  const labelWidth = 92;
  const chartWidth = labelWidth + vitals.length * slotCount * cellWidth;
  const allSlots = getAllSlots();
  const actualSlots = allSlots.filter((entry) => entry.slot);
  const observationRows = [
    ["血圧", "bp"],
    ["脈拍", "pulse"],
    ["呼吸数", "respiration"],
    ["SpO2", "spo2"],
    ["酸素", "oxygen"]
  ] as const;

  return (
    <div>
      <p className="hint">横にスクロールできます。時刻は実測時刻を表示しています。</p>
      <div className="vital-scroll" role="region" aria-label="熱型表">
        <div className="vital-chart" style={{ minWidth: chartWidth }}>
          <div className="vital-days" style={{ gridTemplateColumns: `${labelWidth}px repeat(${vitals.length}, ${cellWidth * slotCount}px)` }}>
            <div className="vital-corner">入院日</div>
            {vitals.map((item) => (
              <div className="vital-day" key={item.day}>
                <strong>{item.day}</strong>
                <span>{item.date}</span>
              </div>
            ))}
          </div>
          <div className="vital-periods" style={{ gridTemplateColumns: `${labelWidth}px repeat(${vitals.length * slotCount}, ${cellWidth}px)` }}>
            <div className="vital-corner">時刻</div>
            {allSlots.map((entry) => (
              <div className="vital-period" key={`${entry.day.day}-${entry.slotIndex}`}>
                {entry.slot?.time || ""}
              </div>
            ))}
          </div>

          <ChartPanel
            title="体温"
            color="#c93535"
            min={36}
            max={39}
            ticks={[36, 37, 38, 39]}
            unit="℃"
            lines={[{ label: "BT", points: linePoints(allSlots, labelWidth, cellWidth, (slot) => slot.temperature) }]}
            chartWidth={chartWidth}
            labelWidth={labelWidth}
            cellWidth={cellWidth}
          />
          <ChartPanel
            title="血圧"
            color="#7b4ab4"
            min={50}
            max={160}
            ticks={[60, 100, 140]}
            unit=""
            lines={[
              {
                label: "SYS",
                color: "#7b4ab4",
                points: linePoints(allSlots, labelWidth, cellWidth, (slot) => slot.systolic)
              },
              {
                label: "DIA",
                color: "#a77bd2",
                points: linePoints(allSlots, labelWidth, cellWidth, (slot) => slot.diastolic)
              }
            ]}
            chartWidth={chartWidth}
            labelWidth={labelWidth}
            cellWidth={cellWidth}
          />
          <ChartPanel
            title="脈拍"
            color="#286fb7"
            min={60}
            max={120}
            ticks={[60, 80, 100, 120]}
            unit=""
            lines={[{ label: "P", points: linePoints(allSlots, labelWidth, cellWidth, (slot) => slot.pulse) }]}
            chartWidth={chartWidth}
            labelWidth={labelWidth}
            cellWidth={cellWidth}
          />
          <ChartPanel
            title="呼吸数"
            color="#18846f"
            min={12}
            max={28}
            ticks={[12, 16, 20, 24, 28]}
            unit=""
            lines={[{ label: "R", points: linePoints(allSlots, labelWidth, cellWidth, (slot) => slot.respiration) }]}
            chartWidth={chartWidth}
            labelWidth={labelWidth}
            cellWidth={cellWidth}
          />

          <div className="vital-observations">
            {observationRows.map(([label, key]) => (
              <div className="vital-row" key={label} style={{ gridTemplateColumns: `${labelWidth}px repeat(${vitals.length * slotCount}, ${cellWidth}px)` }}>
                <div className="vital-row-label">{label}</div>
                {allSlots.map((entry) => (
                  <div className="vital-meal-value" key={`${label}-${entry.day.day}-${entry.slotIndex}`}>
                    {entry.slot ? String(entry.slot[key]) : ""}
                  </div>
                ))}
              </div>
            ))}
            <div className="vital-row" style={{ gridTemplateColumns: `${labelWidth}px repeat(${vitals.length}, ${cellWidth * slotCount}px)` }}>
              <div className="vital-row-label">食事 主/副</div>
              {vitals.map((item) => (
                <div className="vital-meal-set" key={`meal-${item.day}`}>
                  <span>{item.meals.morning}</span>
                  <span>{item.meals.noon}</span>
                  <span>{item.meals.evening}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="vital-remarks" style={{ gridTemplateColumns: `${labelWidth}px repeat(${vitals.length}, ${cellWidth * slotCount}px)` }}>
            <div className="vital-row-label">看護備考</div>
            {vitals.map((item) => {
              const dayRemarks = nursingRemarks.filter((remark) => remark.date === item.date);
              return (
                <div className="vital-remark-cell" key={item.day}>
                  {dayRemarks.map((remark) => (
                    <p key={`${remark.time}-${remark.body}`}>
                      <span>{remark.time}</span> {remark.body}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>
          <p className="vital-footnote">測定回数: {actualSlots.length}件。入院初期は複数回測定し，状態安定に伴い日1回程度へ移行。</p>
        </div>
      </div>
    </div>
  );
}
