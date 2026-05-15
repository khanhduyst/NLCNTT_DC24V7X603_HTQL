(function () {
  // 1. DỮ LIỆU MẪU (Thêm trường permissions cho mỗi nhân viên)
  const employees = [
    {
      id: "NV001",
      name: "Trần Anh Tuấn",
      email: "tuan.ta@company.com",
      dept: "Kỹ thuật (IT)",
      pos: "Trưởng nhóm",
      join: "12/05/2021",
      status: "active",
      label: "Đang làm việc",
      color: "#4361ee",
      permissions: [
        "dashboard",
        "analytics",
        "sale",
        "customers",
        "employees",
        "warehouse",
        "orders",
        "accounting",
      ],
    },
    {
      id: "NV002",
      name: "Lê Minh Tâm",
      email: "tam.lm@company.com",
      dept: "Nhân sự",
      pos: "Chuyên viên",
      join: "01/10/2022",
      status: "active",
      label: "Đang làm việc",
      color: "#10b981",
      permissions: ["dashboard", "employees"],
    },
    {
      id: "NV003",
      name: "Nguyễn Bích La",
      email: "la.nb@company.com",
      dept: "Kinh doanh",
      pos: "Nhân viên",
      join: "15/01/2023",
      status: "off",
      label: "Nghỉ phép",
      color: "#f59e0b",
      permissions: ["sale", "customers", "orders"],
    },
  ];

  const systemModules = [
    { id: "dashboard", name: "Tổng quan" },
    { id: "analytics", name: "Báo cáo & Thống kê" },
    { id: "sale", name: "Bán hàng (POS)" },
    { id: "customers", name: "Khách hàng" },
    { id: "employees", name: "Nhân viên" },
    { id: "warehouse", name: "Quản lý kho" },
    { id: "orders", name: "Đơn hàng" },
    { id: "accounting", name: "Công nợ" },
  ];

  // 2. RENDER DANH SÁCH NHÂN VIÊN
  function renderEmployees() {
    const area = document.getElementById("emp-content-render");
    if (!area) return;

    const listHtml = employees
      .map(
        (e, index) => `
        <tr>
            <td class="ps-4">
                <div class="d-flex align-items-center">
                    <div class="emp-avatar-circle d-flex align-items-center justify-content-center text-white fw-bold me-3" 
                         style="background: ${e.color}; width: 40px; height: 40px; min-width: 40px; border-radius: 50%;">
                        ${e.name.split(" ").pop().charAt(0)}
                    </div>
                    <div>
                        <div class="fw-bold text-dark small">${e.name}</div>
                        <small class="text-muted" style="font-size: 11px;">${e.email}</small>
                    </div>
                </div>
            </td>
            <td><span class="badge bg-light text-primary border px-2 py-1 small">${e.id}</span></td>
            <td class="small text-dark">${e.dept}</td>
            <td class="small">${e.pos}</td>
            <td><span class="emp-badge status-${e.status}">${e.label}</span></td>
            <td class="text-end pe-4">
                <button class="btn btn-light btn-sm rounded-pill me-1" onclick="showEmpDetail(${index})">
                    <i class="fas fa-eye text-dark"></i>
                </button>
                <button class="btn btn-light btn-sm rounded-pill text-danger"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `,
      )
      .join("");

    area.innerHTML = `
        <table class="table table-hover align-middle mb-0 emp-table">
            <thead>
                <tr class="text-muted small">
                    <th class="ps-4">Nhân viên</th>
                    <th>Mã NV</th>
                    <th>Phòng ban</th>
                    <th>Chức vụ</th>
                    <th>Trạng thái</th>
                    <th class="text-end pe-4">Thao tác</th>
                </tr>
            </thead>
            <tbody>${listHtml}</tbody>
        </table>
    `;
  }

  // 3. SHOW MODAL HỒ SƠ & PHÂN QUYỀN
  window.showEmpDetail = function (index) {
    const e = employees[index];

    // Đổ dữ liệu Tab Hồ sơ
    document.getElementById("emp-modal-body").innerHTML = `
        <div class="text-center mb-4">
            <div class="emp-avatar-circle mx-auto mb-3 d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" 
                 style="background: ${e.color}; width: 80px; height: 80px; border-radius: 50%; font-size: 32px;">
                ${e.name.split(" ").pop().charAt(0)}
            </div>
            <h5 class="fw-bold mb-1 text-dark">${e.name}</h5>
            <p class="text-muted small mb-0">${e.email}</p>
        </div>
        <ul class="list-group list-group-flush border-top">
            <li class="list-group-item d-flex justify-content-between align-items-center py-3 small">
                <span class="text-muted">Mã nhân viên:</span> <span class="fw-bold">${e.id}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center py-3 small">
                <span class="text-muted">Phòng ban:</span> <span class="fw-bold">${e.dept}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center py-3 small">
                <span class="text-muted">Chức vụ:</span> <span class="fw-bold">${e.pos}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center py-3 small border-0">
                <span class="text-muted">Ngày gia nhập:</span> <span class="fw-bold">${e.join}</span>
            </li>
        </ul>
    `;

    // Đổ dữ liệu Tab Phân quyền
    const permList = document.getElementById("emp-modal-permission-list");
    if (permList) {
      permList.innerHTML = systemModules
        .map(
          (mod) => `
            <tr class="border-bottom">
                <td class="py-3"><span class="fw-bold text-dark small">${mod.name}</span></td>
                <td class="text-end py-3">
                    <div class="form-check form-switch d-inline-block">
                        <input class="form-check-input shadow-none" type="checkbox" 
                            ${e.permissions && e.permissions.includes(mod.id) ? "checked" : ""} 
                            data-mod="${mod.id}">
                    </div>
                </td>
            </tr>
        `,
        )
        .join("");
    }

    // Reset về Tab Hồ sơ khi mở
    const firstTab = document.querySelector(
      '#empModalTab button[data-bs-target="#tab-info"]',
    );
    if (firstTab) bootstrap.Tab.getOrCreateInstance(firstTab).show();

    new bootstrap.Modal(document.getElementById("emp-detail-modal")).show();
  };

  window.savePermissionsFromModal = function () {
    showFire("Đã cập nhật quyền hạn nhân viên thành công!", "success");
    bootstrap.Modal.getInstance(
      document.getElementById("emp-detail-modal"),
    ).hide();
  };

  renderEmployees();
})();

// --- GIỮ NGUYÊN PHẦN LOGIC THÊM MỚI (OFFCANVAS) CỦA CHÚ ---
(function () {
  const empForm = document.getElementById("form-add-employee");
  const empOffcanvas = document.getElementById("offcanvasAddEmployee");
  const btnGenCode = document.getElementById("btn-gen-code");
  const btnGenPass = document.getElementById("btn-gen-pass");
  const btnToggle = document.getElementById("btn-toggle-pass");
  const inputCode = document.getElementById("emp-code");
  const inputPass = document.getElementById("emp-pass");
  const btnSubmit = empForm?.querySelector('button[type="submit"]');

  if (empForm && empOffcanvas) {
    const originalText = btnSubmit.innerHTML;

    if (btnGenCode) {
      btnGenCode.onclick = () => {
        inputCode.value = "NV" + Math.floor(1000 + Math.random() * 9000);
      };
    }

    if (btnGenPass) {
      btnGenPass.onclick = () => {
        inputPass.value = Math.random().toString(36).slice(-10);
        inputPass.type = "text";
      };
    }

    if (btnToggle) {
      btnToggle.onclick = function () {
        inputPass.type = inputPass.type === "password" ? "text" : "password";
      };
    }

    empForm.onsubmit = function (e) {
      e.preventDefault();
      btnSubmit.disabled = true;
      btnSubmit.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2"></span> Đang xử lý...';
      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          timer: 1500,
          showConfirmButton: false,
        });
        bootstrap.Offcanvas.getInstance(empOffcanvas).hide();
      }, 1000);
    };

    empOffcanvas.addEventListener("hidden.bs.offcanvas", function () {
      empForm.reset();
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = originalText;
    });
  }
})();
