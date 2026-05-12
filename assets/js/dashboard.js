(function () {
  const topProducts = [
    {
      name: "OnePlus 10 Pro",
      cat: "Điện thoại",
      price: "21.500.000 đ",
      status: "done",
      label: "Hoàn tất",
      icon: "📱",
      color: "#4361ee",
    },
    {
      name: "Magic Mouse",
      cat: "Phụ kiện",
      price: "2.400.000 đ",
      status: "done",
      label: "Hoàn tất",
      icon: "🖱️",
      color: "#10b981",
    },
    {
      name: "MacBook M3",
      cat: "Laptop",
      price: "45.000.000 đ",
      status: "pending",
      label: "Đang xử lý",
      icon: "💻",
      color: "#f59e0b",
    },
  ];

  const recentTrans = [
    {
      title: "Chuyển khoản Wallet",
      amount: "+ 2,500,000 đ",
      type: "in",
      date: "Vừa xong",
    },
    {
      title: "Thanh toán đơn #ORD-092",
      amount: "+ 15,200,000 đ",
      type: "in",
      date: "2 phút trước",
    },
    {
      title: "Chi phí vận hành",
      amount: "- 1,200,000 đ",
      type: "out",
      date: "15 phút trước",
    },
  ];

  function renderDashboard() {
    // Render Top Products
    const prodList = document.getElementById("dash-top-products");
    if (prodList) {
      prodList.innerHTML = topProducts
        .map(
          (p) => `
                <tr>
                    <td class="ps-4">
                        <div class="d-flex align-items-center">
                            <div class="me-3 d-flex align-items-center justify-content-center rounded" style="background: ${p.color}20; width: 35px; height: 35px;">${p.icon}</div>
                            <span class="fw-bold text-dark">${p.name}</span>
                        </div>
                    </td>
                    <td>${p.cat}</td>
                    <td class="fw-bold">${p.price}</td>
                    <td><span class="status-badge status-${p.status}">${p.label}</span></td>
                    <td class="text-end pe-4">
                        <button class="btn btn-light btn-sm rounded-circle"><i class="fas fa-ellipsis-v"></i></button>
                    </td>
                </tr>
            `,
        )
        .join("");
    }

    // Render Recent Transactions
    const transList = document.getElementById("dash-recent-trans");
    if (transList) {
      transList.innerHTML = recentTrans
        .map(
          (t) => `
                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-4 py-3">
                    <div class="d-flex align-items-center">
                        <div class="dash-icon-box ${t.type === "in" ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"} me-3">
                            <i class="fas ${t.type === "in" ? "fa-arrow-down" : "fa-arrow-up"}"></i>
                        </div>
                        <div>
                            <div class="fw-bold text-dark small">${t.title}</div>
                            <small class="text-muted">${t.date}</small>
                        </div>
                    </div>
                    <span class="fw-bold ${t.type === "in" ? "text-success" : "text-danger"} small">${t.amount}</span>
                </li>
            `,
        )
        .join("");
    }
  }

  renderDashboard();
})();
