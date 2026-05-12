(function () {
  const orders = [
    {
      id: "ORD-552",
      customer: "Nguyễn Văn Thành",
      date: "12/05/2026",
      total: "15.500.000",
      status: "pending",
      label: "Chờ duyệt",
    },
    {
      id: "ORD-551",
      customer: "Lê Thị Mỹ",
      date: "11/05/2026",
      total: "2.300.000",
      status: "shipping",
      label: "Đang giao",
    },
    {
      id: "ORD-550",
      customer: "Trần Hoàng Bách",
      date: "10/05/2026",
      total: "45.000.000",
      status: "done",
      label: "Đã giao",
    },
  ];

  function renderOrders() {
    const area = document.getElementById("ord-content-render");
    if (!area) return;

    if (window.innerWidth <= 991.98) {
      area.innerHTML = `
                <div class="ord-card-list">
                    ${orders.map((o) => `
                        <div class="ord-list-item shadow-sm border-start border-4 ${o.status === 'done' ? 'border-success' : 'border-primary'}">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <div class="fw-bold text-dark">${o.id}</div>
                                <span class="ord-status status-${o.status}">${o.label}</span>
                            </div>
                            <div class="small text-muted mb-3"><i class="far fa-user me-1"></i> ${o.customer}</div>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="fw-bold text-primary">${o.total} đ</span>
                                <button class="btn btn-primary btn-sm px-3 rounded-pill" onclick="navigate('order-details')">
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
    } else {
      area.innerHTML = `
                <table class="table table-hover align-middle mb-0 ord-table">
                    <thead>
                        <tr>
                            <th class="ps-4">Mã đơn hàng</th>
                            <th>Khách hàng</th>
                            <th>Ngày đặt</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th class="text-end pe-4">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orders
                        .map((o) => `
                            <tr>
                                <td class="ps-4"><code class="text-pink fw-bold" style="color: #d63384;">${o.id}</code></td>
                                <td class="fw-bold text-dark">${o.customer}</td>
                                <td>${o.date}</td>
                                <td class="fw-bold text-primary">${o.total} đ</td>
                                <td><span class="ord-status status-${o.status}">${o.label}</span></td>
                                <td class="text-end pe-4">
                                    <button class="btn btn-light btn-sm rounded-circle me-1" title="Xem chi tiết" onclick="navigate('order-details')">
                                        <i class="fas fa-eye text-primary"></i>
                                    </button>
                                    <button class="btn btn-light btn-sm rounded-circle me-1" title="In đơn hàng">
                                        <i class="fas fa-print text-dark"></i>
                                    </button>
                                    <button class="btn btn-light btn-sm rounded-circle text-danger" title="Xóa đơn">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        `,
                        )
                        .join("")}
                    </tbody>
                </table>
            `;
    }
    renderOrdPagination();
  }

  function renderOrdPagination() {
    const pagin = document.getElementById("ord-pagination");
    if (!pagin) return;
    pagin.innerHTML = `
            <ul class="pagination pagination-sm mb-0">
                <li class="page-item active"><a class="page-link border-0 rounded-2 me-1 shadow-sm" href="#" style="background: #4361ee;">1</a></li>
                <li class="page-item"><a class="page-link border-0 bg-light text-dark rounded-2" href="#">2</a></li>
            </ul>
        `;
  }

  renderOrders();
  window.onresize = renderOrders;
})();
