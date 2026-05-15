(function () {
  const initAnalytics = () => {
    // 1. Biểu đồ Doanh thu (Area Chart)
    const revenueOptions = {
      series: [
        {
          name: "Doanh thu",
          data: [450, 520, 480, 610, 590, 720, 680, 810, 950, 880, 1020, 1150],
        },
        {
          name: "Lợi nhuận",
          data: [120, 150, 130, 210, 180, 250, 230, 310, 400, 350, 420, 510],
        },
      ],
      chart: { height: 350, type: "area", toolbar: { show: false } },
      colors: ["#4361ee", "#10b981"],
      stroke: { curve: "smooth", width: 3 },
      fill: {
        type: "gradient",
        gradient: { opacityFrom: 0.4, opacityTo: 0.1 },
      },
      xaxis: {
        categories: [
          "T1",
          "T2",
          "T3",
          "T4",
          "T5",
          "T6",
          "T7",
          "T8",
          "T9",
          "T10",
          "T11",
          "T12",
        ],
      },
      grid: { borderColor: "#f1f1f1", strokeDashArray: 4 },
    };

    // 2. Biểu đồ Danh mục (Donut Chart)
    const categoryOptions = {
      series: [44, 32, 14, 10],
      chart: { type: "donut", height: 350 },
      labels: ["Điện thoại", "Laptop", "Phụ kiện", "Khác"],
      colors: ["#4361ee", "#4cc9f0", "#f59e0b", "#7c3aed"],
      legend: { position: "bottom" },
      dataLabels: { enabled: false },
      plotOptions: { pie: { donut: { size: "70%" } } },
    };

    // Render charts
    if (document.getElementById("ana-revenue-chart")) {
      new ApexCharts(
        document.querySelector("#ana-revenue-chart"),
        revenueOptions,
      ).render();
    }
    if (document.getElementById("ana-category-chart")) {
      new ApexCharts(
        document.querySelector("#ana-category-chart"),
        categoryOptions,
      ).render();
    }
  };

  // Kiểm tra thư viện ApexCharts
  if (typeof ApexCharts === "undefined") {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/apexcharts";
    script.onload = initAnalytics;
    document.head.appendChild(script);
  } else {
    initAnalytics();
  }
})();
