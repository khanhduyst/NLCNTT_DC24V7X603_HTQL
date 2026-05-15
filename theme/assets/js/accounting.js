(function () {
  const debts = [
    {
      id: "CN-001",
      name: "Nguyễn Thành Nam",
      total: "150.000.000",
      paid: "50.000.000",
      remain: "100.000.000",
      status: "partial",
      label: "Trả một phần",
    },
    {
      id: "CN-002",
      name: "Công ty Alpha",
      total: "45.000.000",
      paid: "45.000.000",
      remain: "0",
      status: "paid",
      label: "Đã tất toán",
    },
    {
      id: "CN-003",
      name: "Đại lý Minh Long",
      total: "210.000.000",
      paid: "0",
      remain: "210.000.000",
      status: "unpaid",
      label: "Chưa thanh toán",
    },
  ];

  function render() {
    const area = document.getElementById("acc-content-render");
    if (!area) return;

    if (window.innerWidth <= 991) {
      area.innerHTML = `<div class="acc-card-list">${debts
        .map(
          (d) => `
                <div class="acc-item shadow-sm">
                    <div class="d-flex justify-content-between mb-2">
                        <span class="fw-bold text-primary">${d.id}</span>
                        <span class="status-${d.status}">${d.label}</span>
                    </div>
                    <div class="fw-bold text-dark mb-1">${d.name}</div>
                    <div class="d-flex justify-content-between small">
                        <span class="text-muted">Còn nợ:</span>
                        <span class="text-danger fw-bold">${d.remain} đ</span>
                    </div>
                </div>
            `,
        )
        .join("")}</div>`;
    } else {
      area.innerHTML = `
                <table class="table table-hover align-middle mb-0">
                    <thead class="bg-light">
                        <tr>
                            <th class="ps-4">Mã nợ</th>
                            <th>Khách hàng</th>
                            <th>Tổng tiền</th>
                            <th>Đã trả</th>
                            <th>Còn nợ</th>
                            <th>Trạng thái</th>
                            <th class="text-end pe-4">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${debts
                          .map(
                            (d) => `
                            <tr>
                                <td class="ps-4"><code class="fw-bold text-pink">${d.id}</code></td>
                                <td class="fw-bold text-dark">${d.name}</td>
                                <td>${d.total} đ</td>
                                <td class="text-success">${d.paid} đ</td>
                                <td class="text-danger fw-bold">${d.remain} đ</td>
                                <td><span class="status-${d.status}">${d.label}</span></td>
                                <td class="text-end pe-4">
                                    <button class="btn btn-light btn-sm rounded-circle"><i class="fas fa-eye"></i></button>
                                </td>
                            </tr>
                        `,
                          )
                          .join("")}
                    </tbody>
                </table>`;
    }
  }

  render();
  window.onresize = render;
})();
