const sampleRawData = `BÁO CÁO LÃI GỘP
Lãi gộp QĐ Dự kiến
1,709.73
Chi phí
0
Target LNTT
0
%HT Target Dự kiến (LNTT)
0%
CHI PHÍ
Lương thưởng
CP Điện nước
CP Bảo trì - sửa chữa
CP Ngân hàng
CP Văn phòng phẩm
0
0
0
0
0
Nhóm ngành hàng	Số lượng	DTQĐ	Target (QĐ)	Lãi gộp QĐ	% HT Target (QĐ)	+/- DTCK Tháng (QĐ)	Đơn giá	DT Trả Góp	Tỷ Trọng Trả Góp
Tổng	1,058	4,784.89	14100.46	634.49	34%	-1%	3.12	1,490	45.21%
NNH Điện thoại mới	142	2,679.38	7,528.13	253.58	35%	-5%	16.22	1,252	54.36%
NNH Laptop	17	486.49	930.58	48.71	51%	1%	21.66	149	40.49%
NNH Phụ kiện	456	740.63	2163.02	183.35	35%	-12%	0.48	14	6.21%
NNH Máy cũ	16	118.25	460.62	1.18	26%	123%	7.39	65	55.06%
NNH Tablet	6	76.48	380.41	9.00	21%	-19%	10.62	0	0.00%
NNH Đồng hồ thời trang	61	178.96	406.80	35.79	44%	82%	0.98	0	0.00%
NNH Wearable	5	120.19	868.77	21.63	14%	32%	7.81	10	26.55%
NNH Thẻ cào	247	44.98	111.39	5.07	40%	1%	0.14	0	0.00%
NNH Sim số	50	42	170.76	35.34	24%	93%	0.65	0	0.00%
NNH VAS	47	228	1338	26.62	17%	-49%	0.32	0	0.00%
NNH Điện tử	1	12.03	1.83	2.17	658%	0%	12.03	0	0.00%
NNH Điện lạnh	2	11.44	6.50	2.86	176%	0%	5.72	0	0.00%
NNH IT	4	21.22	34.88	5.31	61%	156%	2.65	0	0.00%
NNH Điện gia dụng	3	19.30	7.34	3.86	263%	151%	3.48	0	0.00%
NNH Dịch vụ	1	0.01	74.15	0.01	0%	0%	0.01	0	0.00%
NNH Không tính doanh thu	0	0.00	0.20	0.00	0%	0%	0.00	0	0.00%`;

const excludedTableRows = new Set(["Thẻ cào", "IT", "Dịch vụ", "Không tính doanh thu"]);

const rawInput = document.getElementById("raw-input");
const reportDateInput = document.getElementById("report-date");
const parseButton = document.getElementById("parse-button");
const exportButton = document.getElementById("export-button");
const storeNameInput = document.getElementById("store-name");
const heroStoreName = document.getElementById("hero-store-name");
const parserStatus = document.getElementById("parser-status");
const kpiGrid = document.getElementById("kpi-grid");
const barChart = document.getElementById("bar-chart");
const barChartAxis = document.getElementById("bar-chart-axis");
const donutChart = document.getElementById("donut-chart");
const donutLegend = document.getElementById("donut-legend");
const donutTooltip = document.getElementById("donut-tooltip");
const goodTable = document.getElementById("good-table");
const alertTable = document.getElementById("alert-table");
const reportCapture = document.getElementById("report-capture");
const targetEditor = document.getElementById("target-editor");
const totalTargetInput = document.getElementById("total-target-input");
const primaryDonutGroups = ["Điện thoại mới", "Laptop", "Phụ kiện"];
let targetOverrides = {};
let totalTargetOverride = null;
let targetInputDrafts = {};
let totalTargetDraft = null;
const hiddenCategories = new Set(["Điện tử", "Điện lạnh", "Điện gia dụng"]);

function formatNumber(value, digits = 2) {
  return new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

function formatCompactNumber(value) {
  if (Math.abs(value) >= 100) {
    return new Intl.NumberFormat("vi-VN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  return new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercent(value, digits = 1) {
  return `${formatNumber(value, digits)}%`;
}

function parseNumber(text) {
  const normalized = String(text).trim().replace(/,/g, "");
  const value = Number(normalized);
  return Number.isFinite(value) ? value : 0;
}

function parsePercent(text) {
  return parseNumber(String(text).replace("%", ""));
}

function normalizeName(name) {
  return name.replace(/^NNH\s+/i, "").trim();
}

function splitColumns(line) {
  if (line.includes("\t")) {
    return line.split("\t").map((item) => item.trim());
  }

  return line.split(/\s{2,}/).map((item) => item.trim());
}

function findMetricValue(lines, label) {
  const index = lines.findIndex((line) => line === label);
  if (index === -1) {
    return null;
  }

  for (let pointer = index + 1; pointer < lines.length; pointer += 1) {
    const candidate = lines[pointer];
    if (candidate) {
      return candidate;
    }
  }

  return null;
}

function parseRows(lines) {
  const headerIndex = lines.findIndex((line) => line.startsWith("Nhóm ngành hàng"));
  if (headerIndex === -1) {
    throw new Error("Không tìm thấy bảng ngành hàng trong dữ liệu thô.");
  }

  const tableLines = lines.slice(headerIndex + 1).filter(Boolean);
  const rows = tableLines.map((line) => {
    const columns = splitColumns(line);

    if (columns.length < 10) {
      throw new Error(`Không đọc được dòng dữ liệu: "${line}"`);
    }

    return {
      name: normalizeName(columns[0]),
      quantity: parseNumber(columns[1]),
      revenue: parseNumber(columns[2]),
      target: parseNumber(columns[3]),
      grossProfit: parseNumber(columns[4]),
      completionPct: parsePercent(columns[5]),
      yoyPct: parsePercent(columns[6]),
      unitPrice: parseNumber(columns[7]),
      installmentRevenue: parseNumber(columns[8]),
      installmentSharePct: parsePercent(columns[9]),
    };
  });

  return rows;
}

function getReportContext(dateString) {
  const reportDate = dateString ? new Date(`${dateString}T12:00:00`) : new Date();
  const year = reportDate.getFullYear();
  const month = reportDate.getMonth();
  const day = reportDate.getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const elapsedDays = Math.max(day - 1, 1);
  const remainingDays = Math.max(daysInMonth - day + 1, 1);

  return {
    reportDate,
    day,
    daysInMonth,
    elapsedDays,
    remainingDays,
  };
}

function buildDashboardModel(rawText, reportDate, overrides = {}, totalOverride = null) {
  const lines = rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const rows = parseRows(lines).map((row) => {
    if (Object.prototype.hasOwnProperty.call(overrides, row.name)) {
      const nextTarget = Number(overrides[row.name]);
      const target = Number.isFinite(nextTarget) ? nextTarget : row.target;
      const completionPct = target === 0 ? 0 : (row.revenue / target) * 100;

      return {
        ...row,
        target,
        completionPct,
      };
    }

    return row;
  });
  const total = rows.find((row) => row.name === "Tổng");

  if (!total) {
    throw new Error('Không tìm thấy dòng "Tổng".');
  }

  const rawTotalTarget = total.target;

  const categoryRows = rows.filter((row) => row.name !== "Tổng");
  const computedTotalTarget = categoryRows.reduce((sum, row) => sum + row.target, 0);
  const effectiveTotalTarget =
    Number.isFinite(totalOverride) && totalOverride >= 0 ? totalOverride : rawTotalTarget;
  const computedTotalCompletionPct =
    effectiveTotalTarget === 0 ? 0 : (total.revenue / effectiveTotalTarget) * 100;
  total.target = effectiveTotalTarget;
  total.completionPct = computedTotalCompletionPct;
  const reportContext = getReportContext(reportDate);
  const projectedRevenue = (total.revenue / reportContext.elapsedDays) * reportContext.daysInMonth;
  const targetPerDay = (total.target - total.revenue) / reportContext.remainingDays;
  const priorPeriodRevenue =
    total.yoyPct === -100 ? 0 : total.revenue / (1 + total.yoyPct / 100);
  const projectedCompletionPct = total.target === 0 ? 0 : (projectedRevenue / total.target) * 100;

  const forecastGrossProfit = parseNumber(findMetricValue(lines, "Lãi gộp QĐ Dự kiến"));
  const directCost = parseNumber(findMetricValue(lines, "Chi phí"));
  const targetLNTT = parseNumber(findMetricValue(lines, "Target LNTT"));
  const projectedLNTTPct =
    targetLNTT === 0 ? 0 : ((forecastGrossProfit - directCost) / targetLNTT) * 100;

  const eligibleRows = categoryRows.filter((row) => !excludedTableRows.has(row.name));
  const visibleRows = eligibleRows.filter((row) => !hiddenCategories.has(row.name));

  const topRows = [...visibleRows]
    .sort((left, right) => right.completionPct - left.completionPct || right.revenue - left.revenue)
    .slice(0, 7);

  const bottomRows = [...visibleRows]
    .sort((left, right) => left.completionPct - right.completionPct || left.revenue - right.revenue)
    .slice(0, 5);

  const barRows = visibleRows
    .map((row) => {
      const previousRevenue =
        row.yoyPct === -100 ? 0 : row.revenue / (1 + row.yoyPct / 100);
      const deltaRevenue = row.revenue - previousRevenue;

      return {
        ...row,
        previousRevenue,
        deltaRevenue,
      };
    })
    .sort((left, right) => right.deltaRevenue - left.deltaRevenue)
    .slice(0, 12);

  const donutPalette = {
    "Điện thoại mới": "#2f78b7",
    Laptop: "#5dbfe3",
    "Phụ kiện": "#49a9cf",
    "Ngành hàng khác": "#9fd9ea",
  };

  const prioritizedRows = primaryDonutGroups
    .map((group) => visibleRows.find((row) => row.name === group))
    .filter(Boolean);

  const prioritizedRevenue = prioritizedRows.reduce((sum, row) => sum + row.revenue, 0);
  const otherRevenue = Math.max(total.revenue - prioritizedRevenue, 0);
  const donutRows = [
    ...primaryDonutGroups.map((group) => {
      const row = visibleRows.find((item) => item.name === group);
      const revenue = row ? row.revenue : 0;

      return {
        label: group,
        revenue,
        value: total.revenue === 0 ? 0 : (revenue / total.revenue) * 100,
        color: donutPalette[group],
      };
    }),
    {
      label: "Ngành hàng khác",
      revenue: otherRevenue,
      value: total.revenue === 0 ? 0 : (otherRevenue / total.revenue) * 100,
      color: donutPalette["Ngành hàng khác"],
    },
  ].filter((item) => item.revenue > 0);

  return {
    summary: [
      {
        title: "TIẾN ĐỘ THÁNG",
        icon: "📈",
        tone: "blue",
        metrics: [
          ["Target tháng", formatNumber(total.target)],
          ["Lũy kế", formatNumber(total.revenue)],
          ["% Thực hiện", formatPercent(total.completionPct, 2)],
          ["DT dự kiến", formatNumber(projectedRevenue)],
          ["% HT dự kiến", formatPercent(projectedCompletionPct, 2), projectedCompletionPct >= 100 ? "positive" : "negative"],
        ],
      },
      {
        title: "PHÂN TÍCH CHI TIẾT",
        icon: "📊",
        tone: "amber",
        metrics: [
          ["Mục tiêu ngày", formatNumber(targetPerDay)],
          ["DT cùng kỳ tháng", formatPercent(total.yoyPct, 2), total.yoyPct >= 0 ? "positive" : "negative"],
          ["+/- DT cùng kỳ", formatNumber(priorPeriodRevenue)],
          ["Tỷ trọng trả góp", formatPercent(total.installmentSharePct, 2)],
        ],
      },
      {
        title: "LỢI NHUẬN TRỰC TIẾP",
        icon: "💰",
        tone: "red",
        metrics: [
          ["Lũy kế LNTT", formatNumber(total.grossProfit)],
          ["Target LNTT", formatNumber(targetLNTT)],
          ["Dự kiến LNTT", formatNumber(forecastGrossProfit - directCost)],
          ["% HT Dự kiến (LNTT)", formatPercent(projectedLNTTPct, 2), projectedLNTTPct >= 100 ? "positive" : "negative"],
        ],
      },
    ],
    barRows,
    donutRows,
    topRows,
    bottomRows,
    total,
    categoryRows: visibleRows,
    sourceTotalTarget: rawTotalTarget,
    computedCategoryTarget: computedTotalTarget,
    reportContext,
  };
}

function renderSummary(summary) {
  kpiGrid.innerHTML = summary
    .map(
      (card) => `
        <article class="kpi-card">
          <div class="kpi-header ${card.tone}">
            <span class="kpi-icon">${card.icon}</span>
            <span>${card.title}</span>
          </div>
          <div class="kpi-body">
            ${card.metrics
              .map(
                ([label, value, tone]) => `
                  <div class="metric-row">
                    <span>${label}</span>
                    <strong class="${tone || ""}">${value}</strong>
                  </div>
                `
              )
              .join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderBars(rows) {
  const maxMagnitude = Math.max(...rows.map((item) => Math.abs(item.deltaRevenue)), 1);
  const axisLabels = [
    -maxMagnitude,
    -maxMagnitude / 2,
    0,
    maxMagnitude / 2,
    maxMagnitude,
  ];

  barChartAxis.innerHTML = axisLabels
    .map((label) => `<span>${formatCompactNumber(label)}</span>`)
    .join("");

  barChart.innerHTML = rows
    .map((item) => {
      const width = `${(Math.abs(item.deltaRevenue) / maxMagnitude) * 48}%`;
      const tone = item.deltaRevenue >= 0 ? "positive" : "negative";
      const signedAmount = `${item.deltaRevenue >= 0 ? "+" : ""}${formatCompactNumber(item.deltaRevenue)}`;

      return `
        <div class="bar-row">
          <div class="bar-label">${item.name}</div>
          <div class="bar-track">
            <div class="bar-fill ${tone}" style="width:${width}"></div>
            <span class="bar-value ${tone}">
              ${signedAmount}
            </span>
          </div>
        </div>
      `;
    })
    .join("");
}

function polarToCartesian(cx, cy, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
}

function describeArc(cx, cy, radius, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

function getDonutLabel(row, index) {
  if (row.label === "Điện thoại mới") {
    return ["Điện thoại mới", formatPercent(row.value, 0)];
  }

  if (row.label === "Ngành hàng khác") {
    return ["Ngành hàng khác", formatPercent(row.value, 0)];
  }

  return [row.label, formatPercent(row.value, 0)];
}

function getDonutTextPosition(cx, cy, innerRadius, outerRadius, startAngle, endAngle, label) {
  const midAngle = startAngle + (endAngle - startAngle) / 2;
  const angleSpan = endAngle - startAngle;
  let radius = innerRadius + (outerRadius - innerRadius) * 0.57;

  if (label === "Điện thoại mới") {
    radius = innerRadius + (outerRadius - innerRadius) * 0.62;
  }

  if (label === "Laptop") {
    radius = innerRadius + (outerRadius - innerRadius) * 0.53;
  }

  if (label === "Phụ kiện") {
    radius = innerRadius + (outerRadius - innerRadius) * 0.56;
  }

  if (label === "Ngành hàng khác") {
    radius = innerRadius + (outerRadius - innerRadius) * 0.59;
  }

  if (angleSpan < 40) {
    radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  }

  return polarToCartesian(cx, cy, radius, midAngle);
}

function setDonutActive(label = null) {
  const segments = donutChart.querySelectorAll("[data-segment]");

  segments.forEach((segment) => {
    const isActive = label && segment.dataset.segment === label;
    segment.classList.toggle("is-active", isActive);
    segment.classList.toggle("is-muted", Boolean(label) && !isActive);
  });

  donutLegend.querySelectorAll(".legend-item").forEach((item) => {
    const isActive = label && item.dataset.legend === label;
    item.classList.toggle("is-active", isActive);
  });
}

function showDonutTooltip(event, row) {
  donutTooltip.innerHTML = `
    <strong>${row.label}</strong>
    <div class="donut-tooltip-line">
      <span class="donut-tooltip-swatch" style="background:${row.color}"></span>
      <span>Tỷ trọng Doanh thu: ${formatNumber(row.revenue, 2)}</span>
    </div>
  `;

  const bounds = donutChart.getBoundingClientRect();
  const x = event.clientX - bounds.left;
  const y = event.clientY - bounds.top;

  donutTooltip.style.left = `${x}px`;
  donutTooltip.style.top = `${y}px`;
  donutTooltip.classList.add("is-visible");
  setDonutActive(row.label);
}

function hideDonutTooltip() {
  donutTooltip.classList.remove("is-visible");
  setDonutActive();
}

function renderDonut(rows, totalRevenue) {
  const radius = 98;
  const strokeWidth = 54;
  const innerRadius = radius - strokeWidth / 2;
  const outerRadius = radius + strokeWidth / 2;
  let startAngle = 0;
  const visibleRows = rows.filter((row) => row.value > 0).map((row, index) => {
    const segmentAngle = (row.value / 100) * 360;
    const endAngle = startAngle + segmentAngle;
    const textPosition = getDonutTextPosition(
      130,
      130,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      row.label
    );
    const data = {
      ...row,
      index,
      startAngle,
      endAngle,
      segmentAngle,
      textPosition,
      labelLines: getDonutLabel(row, index),
    };
    startAngle = endAngle;
    return data;
  });

  donutChart.innerHTML = `
    <circle cx="130" cy="130" r="${radius}" fill="none" stroke="#e8f0f6" stroke-width="${strokeWidth}"></circle>
    ${visibleRows
      .map((row) => {
        return `
          <path
            d="${describeArc(130, 130, radius, row.startAngle, row.endAngle)}"
            fill="none"
            stroke="${row.color}"
            stroke-width="${strokeWidth}"
            stroke-linecap="butt"
            class="donut-segment"
            data-segment="${row.label}"
          />
          <text class="donut-label">
            ${row.labelLines
              .map((line, lineIndex) => {
                const dy = row.labelLines.length === 1 ? 0 : lineIndex === 0 ? -6 : 11;
                return `<tspan x="${row.textPosition.x}" y="${row.textPosition.y}" dy="${dy}">${line}</tspan>`;
              })
              .join("")}
          </text>
        `;
      })
      .join("")}
  `;

  donutLegend.innerHTML = rows
    .map(
      (row) => `
        <div class="legend-item" data-legend="${row.label}">
          <div class="legend-label">
            <span class="legend-dot" style="background:${row.color}"></span>
            <span>${row.label}</span>
          </div>
          <strong>${formatPercent(row.value, 0)}</strong>
        </div>
      `
    )
    .join("");

  document.querySelector(".donut-center strong").textContent = formatNumber(totalRevenue, 1);
  hideDonutTooltip();

  donutChart.querySelectorAll(".donut-segment").forEach((segment) => {
    const row = rows.find((item) => item.label === segment.dataset.segment);

    segment.addEventListener("mousemove", (event) => showDonutTooltip(event, row));
    segment.addEventListener("mouseenter", (event) => showDonutTooltip(event, row));
    segment.addEventListener("mouseleave", hideDonutTooltip);
  });

  donutLegend.querySelectorAll(".legend-item").forEach((item) => {
    const row = rows.find((entry) => entry.label === item.dataset.legend);

    item.addEventListener("mouseenter", () => setDonutActive(row.label));
    item.addEventListener("mouseleave", () => setDonutActive());
  });
}

function getProgressColor(value) {
  const normalized = Math.max(0, Math.min(value, 180));

  if (normalized <= 40) {
    const ratio = normalized / 40;
    const lightness = 44 + ratio * 10;
    return `hsl(2 62% ${lightness}%)`;
  }

  if (normalized <= 70) {
    const ratio = (normalized - 40) / 30;
    const hue = 8 + ratio * 22;
    const saturation = 62 + ratio * 8;
    const lightness = 54 + ratio * 6;
    return `hsl(${hue} ${saturation}% ${lightness}%)`;
  }

  if (normalized <= 100) {
    const ratio = (normalized - 70) / 30;
    const hue = 30 + ratio * 48;
    const saturation = 70 - ratio * 10;
    const lightness = 60 - ratio * 6;
    return `hsl(${hue} ${saturation}% ${lightness}%)`;
  }

  const ratio = Math.min((normalized - 100) / 80, 1);
  const hue = 92 + ratio * 58;
  const saturation = 46 - ratio * 8;
  const lightness = 56 - ratio * 10;
  return `hsl(${hue} ${saturation}% ${lightness}%)`;
}

function createRow(row, index, tone, reportContext) {
  const remaining = Math.max(row.target - row.revenue, 0);
  const dailyTarget = reportContext.remainingDays === 0 ? 0 : remaining / reportContext.remainingDays;
  const projectedRevenue = (row.revenue / reportContext.elapsedDays) * reportContext.daysInMonth;
  const projectedCompletionPct = row.target === 0 ? 0 : (projectedRevenue / row.target) * 100;
  const badgeClass = remaining <= 0 ? "good" : tone;
  const badgeText = remaining <= 0 ? "Hoàn thành" : formatCompactNumber(remaining);
  const completionColor = getProgressColor(row.completionPct);
  const projectedColor = getProgressColor(projectedCompletionPct);

  return `
    <tr>
      <td>${index + 1}</td>
      <td><strong>${row.name}</strong></td>
      <td class="${tone === "alert" ? "cell-negative" : "cell-positive"}">${formatCompactNumber(dailyTarget)}</td>
      <td>${formatCompactNumber(row.target)}</td>
      <td>${formatCompactNumber(row.revenue)}</td>
      <td><span class="badge ${badgeClass}">${badgeText}</span></td>
      <td class="heat-cell" style="color:${completionColor}">${formatPercent(row.completionPct, 1)}</td>
      <td class="heat-cell" style="color:${projectedColor}">${formatPercent(projectedCompletionPct, 1)}</td>
    </tr>
  `;
}

function renderTables(model) {
  goodTable.innerHTML = model.topRows
    .map((row, index) => createRow(row, index, "good", model.reportContext))
    .join("");

  alertTable.innerHTML = model.bottomRows
    .map((row, index) => createRow(row, index, "alert", model.reportContext))
    .join("");
}

function renderTargetEditor(model) {
  const nextTotalValue =
    totalTargetDraft !== null
      ? totalTargetDraft
      : Number(
          (Number.isFinite(totalTargetOverride) ? totalTargetOverride : model.sourceTotalTarget).toFixed(2)
        );

  totalTargetInput.value = nextTotalValue;
  targetEditor.innerHTML = model.categoryRows
    .map(
      (row) => `
        <article class="target-card">
          <div class="target-card-header">
            <strong>${row.name}</strong>
            <span>DT hiện tại: ${formatCompactNumber(row.revenue)}</span>
          </div>
          <div class="target-card-meta">
            <span>Số lượng: ${formatCompactNumber(row.quantity)}</span>
            <span>Lãi gộp: ${formatCompactNumber(row.grossProfit)}</span>
          </div>
          <label>
            <span>Target ngành hàng</span>
            <input
              type="number"
              step="0.01"
              value="${Object.prototype.hasOwnProperty.call(targetInputDrafts, row.name) ? targetInputDrafts[row.name] : Number(row.target.toFixed(2))}"
              data-target-name="${row.name}"
            />
          </label>
        </article>
      `
    )
    .join("");

  targetEditor.querySelectorAll("[data-target-name]").forEach((input) => {
    input.addEventListener("input", handleTargetOverrideInput);
  });
}

function setStatus(message, isError = false) {
  parserStatus.textContent = message;
  parserStatus.style.color = isError ? "var(--danger)" : "var(--muted)";
}

function updateStoreName() {
  const storeName = storeNameInput.value.trim() || "485 - TGD_BDU_TDM - 222 Yersin";
  heroStoreName.textContent = `Siêu thị: ${storeName}`;
}

async function exportDashboardAsImage() {
  if (!window.html2canvas) {
    setStatus("Không tải được thư viện tạo ảnh trong trình duyệt.", true);
    return;
  }

  try {
    setStatus("Đang tạo ảnh dashboard...");
    exportButton.disabled = true;

    const canvas = await window.html2canvas(reportCapture, {
      backgroundColor: "#eef3f7",
      scale: 2,
      useCORS: true,
      allowTaint: true,   // cho phép canvas bị taint (tránh crash do Google Fonts)
      logging: false,
      onclone: function(clonedDoc) {
        // Swap Google Fonts → system font trong bản clone trước khi chụp
        // Tránh lỗi taint khi chạy file:// hoặc khi font chưa load xong
        const style = clonedDoc.createElement("style");
        style.textContent = "* { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif !important; }";
        clonedDoc.head.appendChild(style);
      }
    });

    const link = document.createElement("a");
    const fileDate = reportDateInput.value || new Date().toISOString().slice(0, 10);
    link.download = `dashboard-doanh-thu-${fileDate}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    setStatus(`Đã tạo ảnh dashboard cho ngày ${fileDate}.`);
  } catch (error) {
    // Log lỗi thực để dễ debug
    console.error("Export error:", error);
    setStatus("Không thể tạo ảnh: " + (error && error.message ? error.message : String(error)), true);
  } finally {
    exportButton.disabled = false;
  }
}

let reportModel = null;

function handleTargetOverrideInput(event) {
  const input = event.currentTarget;
  const name = input.dataset.targetName;
  const nextValue = Number(input.value);

  if (!name) {
    return;
  }

  if (!input.value.trim()) {
    targetInputDrafts[name] = "";
    delete targetOverrides[name];
  } else if (Number.isFinite(nextValue) && nextValue >= 0) {
    targetInputDrafts[name] = input.value;
    targetOverrides[name] = nextValue;
  }

  renderDashboardFromRaw(false, false);
}

function handleTotalTargetInput(event) {
  const input = event.currentTarget;
  const nextValue = Number(input.value);

  if (!input.value.trim()) {
    totalTargetDraft = "";
    totalTargetOverride = null;
  } else if (Number.isFinite(nextValue) && nextValue >= 0) {
    totalTargetDraft = input.value;
    totalTargetOverride = nextValue;
  }

  renderDashboardFromRaw(false, false);
}

function syncOverridesFromInputs() {
  targetEditor.querySelectorAll("[data-target-name]").forEach((input) => {
    const name = input.dataset.targetName;
    const nextValue = Number(input.value);

    if (!name) {
      return;
    }

    if (!input.value.trim()) {
      targetInputDrafts[name] = "";
      delete targetOverrides[name];
      return;
    }

    if (Number.isFinite(nextValue) && nextValue >= 0) {
      targetInputDrafts[name] = input.value;
      targetOverrides[name] = nextValue;
    }
  });

  const totalValue = Number(totalTargetInput.value);
  if (!totalTargetInput.value.trim()) {
    totalTargetDraft = "";
    totalTargetOverride = null;
  } else if (Number.isFinite(totalValue) && totalValue >= 0) {
    totalTargetDraft = totalTargetInput.value;
    totalTargetOverride = totalValue;
  }
}

function renderDashboardFromRaw(resetOverrides = false, rerenderEditor = true) {
  try {
    if (resetOverrides) {
      targetOverrides = {};
      totalTargetOverride = null;
      targetInputDrafts = {};
      totalTargetDraft = null;
    } else {
      syncOverridesFromInputs();
    }

    reportModel = buildDashboardModel(
      rawInput.value,
      reportDateInput.value,
      targetOverrides,
      totalTargetOverride
    );
    renderSummary(reportModel.summary);
    renderBars(reportModel.barRows);
    renderDonut(reportModel.donutRows, reportModel.total.revenue);
    renderTables(reportModel);
    if (rerenderEditor) {
      renderTargetEditor(reportModel);
    }
    setStatus(
      `Đã phân tích ${reportModel.barRows.length} ngành hàng cho ngày ${reportDateInput.value || "hiện tại"}.`
    );
  } catch (error) {
    setStatus(error.message, true);
  }
}

function setDefaultDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  reportDateInput.value = `${now.getFullYear()}-${month}-${day}`;
}

setDefaultDate();
rawInput.value = sampleRawData;
updateStoreName();
parseButton.addEventListener("click", () => renderDashboardFromRaw(false, true));
exportButton.addEventListener("click", exportDashboardAsImage);
storeNameInput.addEventListener("input", updateStoreName);
totalTargetInput.addEventListener("input", handleTotalTargetInput);
renderDashboardFromRaw(true);
