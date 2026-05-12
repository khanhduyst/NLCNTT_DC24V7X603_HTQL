(function () {
  // Dữ liệu khách hàng đã Việt hóa
  const customersData = [
    {
      name: "Nguyễn Thành Nam",
      email: "nam.nt@gmail.com",
      id: "#KH895280",
      country: "Việt Nam",
      flag: "vn",
      order: 539,
      spend: "85.430.000",
      color: "#4361ee",
    },
    {
      name: "Trần Minh Tâm",
      email: "tam.tm@outlook.com",
      id: "#KH343593",
      country: "Singapore",
      flag: "sg",
      order: 473,
      spend: "125.218.000",
      color: "#10b981",
    },
    {
      name: "Lê Thu Thảo",
      email: "thao.lt@yahoo.com",
      id: "#KH586615",
      country: "Nhật Bản",
      flag: "jp",
      order: 462,
      spend: "219.157.000",
      color: "#f59e0b",
    },
    {
      name: "Phạm Hoàng Long",
      email: "long.ph@gmail.com",
      id: "#KH179914",
      country: "Hàn Quốc",
      flag: "kr",
      order: 550,
      spend: "90.083.000",
      color: "#4361ee",
    },
    {
      name: "Vũ Hải Yến",
      email: "yen.vh@fpt.com.vn",
      id: "#KH988015",
      country: "Thái Lan",
      flag: "th",
      order: 752,
      spend: "55.984.000",
      color: "#10b981",
    },
  ];

  function renderContent() {
    const renderArea = document.getElementById("cus-content-render");
    if (!renderArea) return;

    renderArea.innerHTML = "";

    if (window.innerWidth <= 991.98) {
      const cardListHTML = `
                <div class="cus-card-list">
                    ${customersData
                      .map(
                        (c, index) => `
                        <div class="cus-list-item shadow-sm">
                            <div class="cus-item-header">
                                <div class="cus-avatar d-flex align-items-center justify-content-center text-white fw-bold" style="background: ${c.color}; min-width: 45px;">
                                    ${c.name.split(" ").pop().charAt(0)}
                                </div>
                                <div class="cus-item-title">
                                    <div class="fw-bold text-dark">${c.name}</div>
                                    <small class="text-muted">${c.email}</small>
                                </div>
                            </div>
                            <div class="cus-item-body">
                                <button class="btn btn-primary btn-sm cus-btn-view-detail" data-index="${index}">
                                    <i class="fas fa-info-circle me-1"></i> Chi tiết
                                </button>
                                <button class="btn btn-light btn-sm text-primary"><i class="fas fa-edit"></i></button>
                                <button class="btn btn-light btn-sm text-danger"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            `;
      renderArea.innerHTML = cardListHTML;

      document.querySelectorAll(".cus-btn-view-detail").forEach((btn) => {
        btn.onclick = function () {
          const index = this.getAttribute("data-index");
          showDetailModal(customersData[index]);
        };
      });
    } else {
      const tableHTML = `
                <table class="table table-hover align-middle mb-0 cus-table">
                    <thead>
                        <tr>
                            <th class="ps-4">Khách hàng</th>
                            <th>Mã khách hàng</th>
                            <th>Quốc gia</th>
                            <th>Đơn hàng</th>
                            <th>Tổng chi tiêu</th>
                            <th class="text-end pe-4">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${customersData
                          .map(
                            (c) => `
                            <tr>
                                <td class="ps-4">
                                    <div class="d-flex align-items-center">
                                        <div class="cus-avatar-table d-flex align-items-center justify-content-center text-white fw-bold me-3" style="background: ${c.color}; min-width: 35px; height: 35px; border-radius: 6px;">
                                            ${c.name.split(" ").pop().charAt(0)}
                                        </div>
                                        <div>
                                            <div class="fw-bold text-dark">${c.name}</div>
                                            <small class="text-muted">${c.email}</small>
                                        </div>
                                    </div>
                                </td>
                                <td><code class="fw-medium text-pink" style="color: #d63384;">${c.id}</code></td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <img src="https://flagcdn.com/20x15/${c.flag}.png" class="me-2" style="border-radius: 2px;">
                                        ${c.country}
                                    </div>
                                </td>
                                <td>${c.order}</td>
                                <td class="fw-bold text-dark">${c.spend} VNĐ</td>
                                <td class="text-end pe-4">
                                    <button class="btn btn-light btn-sm me-1"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn-light btn-sm text-danger"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        `,
                          )
                          .join("")}
                    </tbody>
                </table>
            `;
      renderArea.innerHTML = tableHTML;
    }
  }

  function showDetailModal(customer) {
    const modalEl = document.getElementById("cus-detail-modal");
    const modal = new bootstrap.Modal(modalEl);

    document.getElementById("modal-title-text").innerText =
      `Chi tiết khách hàng: ${customer.name}`;

    const contentArea = document.getElementById("modal-content-data");
    contentArea.innerHTML = `
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <span class="cus-modal-label">Khách hàng:</span>
                    <span class="cus-modal-value d-flex align-items-center justify-content-end">
                        <div class="rounded me-2 d-flex align-items-center justify-content-center text-white fw-bold" style="background: ${customer.color}; width: 30px; height: 30px; font-size: 12px;">
                            ${customer.name.split(" ").pop().charAt(0)}
                        </div>
                        <div>
                            <div class="text-dark fw-bold">${customer.name}</div>
                            <small class="text-muted">${customer.email}</small>
                        </div>
                    </span>
                </li>
                <li class="list-group-item">
                    <span class="cus-modal-label">Mã khách hàng:</span>
                    <span class="cus-modal-value text-muted">${customer.id}</span>
                </li>
                <li class="list-group-item">
                    <span class="cus-modal-label">Quốc gia:</span>
                    <span class="cus-modal-value d-flex align-items-center justify-content-end">
                        <img src="https://flagcdn.com/20x15/${customer.flag}.png" class="me-2" width="20">
                        ${customer.country}
                    </span>
                </li>
                <li class="list-group-item">
                    <span class="cus-modal-label">Số đơn hàng:</span>
                    <span class="cus-modal-value">${customer.order}</span>
                </li>
                <li class="list-group-item border-bottom-0 mb-3">
                    <span class="cus-modal-label">Tổng chi tiêu:</span>
                    <span class="cus-modal-value fw-bold text-dark fs-6">${customer.spend} VNĐ</span>
                </li>
            </ul>
            <div class="d-grid mt-2">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Đóng</button>
            </div>
        `;

    modal.show();
  }

  function renderCusPagination() {
    const pagin = document.getElementById("cus-pagination");
    if (!pagin) return;
    pagin.innerHTML = `
            <ul class="pagination pagination-sm mb-0">
                <li class="page-item active"><a class="page-link shadow-none" href="#">1</a></li>
                <li class="page-item"><a class="page-link shadow-none text-dark border-0" href="#">2</a></li>
            </ul>
        `;
  }

  renderContent();
  renderCusPagination();

  window.onresize = renderContent;
})();
