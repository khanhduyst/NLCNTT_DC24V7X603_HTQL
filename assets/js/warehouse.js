(function () {
  const products = [
    {
      sku: "LAP-001",
      name: "MacBook Pro M3",
      cat: "Laptop",
      price: "45.000.000",
      stock: 5,
      status: "low",
      label: "Sắp hết hàng",
      icon: "💻",
      color: "#4361ee",
    },
    {
      sku: "PHN-002",
      name: "iPhone 15 Pro",
      cat: "Điện thoại",
      price: "28.500.000",
      stock: 42,
      status: "ok",
      label: "Còn hàng",
      icon: "📱",
      color: "#10b981",
    },
    {
      sku: "TAB-003",
      name: "iPad Air 5",
      cat: "Máy tính bảng",
      price: "15.200.000",
      stock: 12,
      status: "ok",
      label: "Còn hàng",
      icon: "📟",
      color: "#f59e0b",
    },
    {
      sku: "ACC-004",
      name: "AirPods Pro 2",
      cat: "Phụ kiện",
      price: "5.400.000",
      stock: 3,
      status: "low",
      label: "Sắp hết hàng",
      icon: "🎧",
      color: "#7c3aed",
    },
  ];

  function renderWarehouse() {
    const area = document.getElementById("wh-content-render");
    if (!area) return;

    if (window.innerWidth <= 991.98) {
      area.innerHTML = `
                <div class="wh-card-list">
                    ${products
                      .map(
                        (p, index) => `
                        <div class="wh-list-item shadow-sm">
                            <div class="wh-item-header">
                                <div class="wh-img-box text-white" style="background: ${p.color}; width: 45px; height: 45px; min-width: 45px;">
                                    ${p.icon}
                                </div>
                                <div class="flex-grow-1">
                                    <div class="fw-bold text-dark">${p.name}</div>
                                    <small class="text-muted">SKU: ${p.sku}</small>
                                </div>
                                <span class="wh-badge stock-${p.status}">${p.stock}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="fw-bold text-primary">${p.price} đ</span>
                                <button class="btn btn-light btn-sm rounded-pill px-3 border" onclick="showWhDetail(${index})">Chi tiết</button>
                            </div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            `;
    } else {
      area.innerHTML = `
                <table class="table table-hover align-middle mb-0 wh-table">
                    <thead>
                        <tr>
                            <th class="ps-4">Sản phẩm</th>
                            <th>Mã SKU</th>
                            <th>Loại</th>
                            <th>Giá nhập</th>
                            <th>Tồn kho</th>
                            <th>Trạng thái</th>
                            <th class="text-end pe-4">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${products
                          .map(
                            (p, index) => `
                            <tr>
                                <td class="ps-4">
                                    <div class="d-flex align-items-center">
                                        <div class="wh-img-box me-3 text-white d-flex align-items-center justify-content-center" 
                                             style="background: ${p.color}; width: 35px; height: 35px; min-width: 35px; font-size: 14px; border-radius: 6px;">
                                            ${p.icon}
                                        </div>
                                        <div class="fw-bold text-dark">${p.name}</div>
                                    </div>
                                </td>
                                <td><code class="text-pink fw-bold" style="color: #d63384;">${p.sku}</code></td>
                                <td>${p.cat}</td>
                                <td>${p.price} đ</td>
                                <td class="fw-bold">${p.stock}</td>
                                <td><span class="wh-badge stock-${p.status}">${p.label}</span></td>
                                <td class="text-end pe-4">
                                    <button class="btn btn-light btn-sm rounded-circle me-1" onclick="showWhDetail(${index})"><i class="fas fa-eye text-dark"></i></button>
                                    <button class="btn btn-light btn-sm rounded-circle text-danger"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        `,
                          )
                          .join("")}
                    </tbody>
                </table>
            `;
    }
    // Gọi hàm phân trang sau khi render nội dung
    renderWhPagination();
  }

  function renderWhPagination() {
    const pagin = document.getElementById("wh-pagination");
    if (!pagin) return;

    pagin.innerHTML = `
            <ul class="pagination pagination-sm mb-0">
                <li class="page-item disabled">
                    <a class="page-link border-0 bg-light rounded-2 me-1" href="#"><i class="fas fa-chevron-left small"></i></a>
                </li>
                <li class="page-item active">
                    <a class="page-link border-0 rounded-2 me-1 shadow-sm" href="#" style="background: #4361ee; width: 30px; text-align: center;">1</a>
                </li>
                <li class="page-item">
                    <a class="page-link border-0 bg-light text-dark rounded-2 me-1" href="#" style="width: 30px; text-align: center;">2</a>
                </li>
                <li class="page-item">
                    <a class="page-link border-0 bg-light rounded-2" href="#"><i class="fas fa-chevron-right small text-dark"></i></a>
                </li>
            </ul>
        `;
  }

  window.showWhDetail = function (index) {
    const p = products[index];
    const modalBody = document.getElementById("wh-modal-body");
    modalBody.innerHTML = `
            <div class="text-center mb-4">
                <div class="wh-img-box mx-auto mb-3 d-flex align-items-center justify-content-center text-white shadow-sm" 
                     style="background: ${p.color}; width: 70px; height: 70px; border-radius: 12px; font-size: 30px;">
                    ${p.icon}
                </div>
                <h5 class="fw-bold mb-1 text-dark">${p.name}</h5>
                <span class="badge bg-light text-primary border">${p.sku}</span>
            </div>
            <ul class="list-group list-group-flush border-top">
                <li class="list-group-item d-flex justify-content-between py-3 small">
                    <span class="text-muted">Loại sản phẩm:</span>
                    <span class="fw-bold text-dark">${p.cat}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between py-3 small">
                    <span class="text-muted">Giá nhập kho:</span>
                    <span class="fw-bold text-primary">${p.price} đ</span>
                </li>
                <li class="list-group-item d-flex justify-content-between py-3 small">
                    <span class="text-muted">Số lượng tồn:</span>
                    <span class="fw-bold text-dark">${p.stock} cái</span>
                </li>
                <li class="list-group-item d-flex justify-content-between py-3 small border-0">
                    <span class="text-muted">Trạng thái:</span>
                    <span class="wh-badge stock-${p.status}">${p.label}</span>
                </li>
            </ul>
            <div class="d-grid mt-2">
                <button type="button" class="btn btn-primary rounded-pill py-2" data-bs-dismiss="modal">Đóng</button>
            </div>
        `;
    new bootstrap.Modal(document.getElementById("wh-detail-modal")).show();
  };

  renderWarehouse();
  window.onresize = renderWarehouse;
})();


(function () {
    const whForm = document.getElementById("form-add-warehouse");
    const whOffcanvas = document.getElementById("offcanvasAddWarehouse");
    const btnGenSku = document.getElementById('btn-wh-gen-sku');
    const inputSku = document.getElementById('wh-sku');
    const btnSubmit = whForm?.querySelector('button[type="submit"]');

    if (whForm && whOffcanvas) {
        const originalText = btnSubmit.innerHTML;

        // 1. Tạo SKU ngẫu nhiên cho kho
        if (btnGenSku) {
            btnGenSku.onclick = function() {
                const random = Math.floor(10000 + Math.random() * 90000);
                inputSku.value = 'WH-' + random;
                inputSku.classList.add('is-valid');
                setTimeout(() => inputSku.classList.remove('is-valid'), 500);
            };
        }

        // 2. Xử lý lưu kho
        whForm.onsubmit = function (e) {
            e.preventDefault();

            if (!whForm.checkValidity()) {
                e.stopPropagation();
                whForm.classList.add('was-validated');
                return;
            }

            btnSubmit.disabled = true;
            btnSubmit.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Đang nạp kho...';

            setTimeout(() => {
                btnSubmit.innerHTML = '<i class="fas fa-check me-2"></i> Đã xong!';
                btnSubmit.classList.replace("btn-primary", "btn-success");

                setTimeout(() => {
                    // GỌI FIRE THÔNG BÁO
                    Swal.fire({
                        icon: 'success',
                        title: 'Nhập kho thành công!',
                        text: 'Sản phẩm đã được cập nhật vào danh mục Warehouse.',
                        timer: 2000,
                        showConfirmButton: false,
                        position: 'center'
                    });

                    const oc = bootstrap.Offcanvas.getInstance(whOffcanvas) || new bootstrap.Offcanvas(whOffcanvas);
                    oc.hide();
                }, 800);
            }, 1200);
        };

        // 3. Reset khi đóng bảng
        whOffcanvas.addEventListener('hidden.bs.offcanvas', function () {
            whForm.classList.remove('was-validated');
            btnSubmit.innerHTML = originalText;
            btnSubmit.classList.replace("btn-success", "btn-primary");
            btnSubmit.disabled = false;
            whForm.reset();
        });
    }
})();