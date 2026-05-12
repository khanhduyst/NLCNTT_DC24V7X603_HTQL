(function () {
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
    },
    {
      id: "NV004",
      name: "Hoàng Văn Thái",
      email: "thai.hv@company.com",
      dept: "Kỹ thuật (IT)",
      pos: "Lập trình viên",
      join: "20/06/2023",
      status: "active",
      label: "Đang làm việc",
      color: "#7c3aed",
    },
  ];

  function renderEmployees() {
    const area = document.getElementById("emp-content-render");
    if (!area) return;

    if (window.innerWidth <= 991.98) {
      area.innerHTML = `
                <div class="emp-card-list">
                    ${employees
                      .map(
                        (e, index) => `
                        <div class="emp-list-item shadow-sm">
                            <div class="emp-item-header">
                                <div class="emp-avatar-circle" style="background: ${e.color}; width: 45px; height: 45px; min-width: 45px;">
                                    ${e.name.split(" ").pop().charAt(0)}
                                </div>
                                <div>
                                    <div class="fw-bold text-dark">${e.name}</div>
                                    <small class="text-muted">${e.dept}</small>
                                </div>
                            </div>
                            <div class="d-flex justify-content-end mt-3 gap-2">
                                <button class="btn btn-primary btn-sm rounded-pill px-3" onclick="showEmpDetail(${index})">Chi tiết</button>
                                <button class="btn btn-light btn-sm rounded-circle"><i class="fas fa-edit text-primary"></i></button>
                                <button class="btn btn-light btn-sm rounded-circle"><i class="fas fa-trash text-danger"></i></button>
                            </div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            `;
    } else {
      area.innerHTML = `
                <table class="table table-hover align-middle mb-0 emp-table">
                    <thead>
                        <tr>
                            <th class="ps-4">Nhân viên</th>
                            <th>Mã nhân viên</th>
                            <th>Phòng ban</th>
                            <th>Chức vụ</th>
                            <th>Trạng thái</th>
                            <th class="text-end pe-4">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${employees
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
                                            <div class="fw-bold text-dark">${e.name}</div>
                                            <small class="text-muted">${e.email}</small>
                                        </div>
                                    </div>
                                </td>
                                <td><span class="badge bg-light text-primary border px-2 py-1">${e.id}</span></td>
                                <td><span class="text-dark">${e.dept}</span></td>
                                <td>${e.pos}</td>
                                <td><span class="emp-badge status-${e.status}">${e.label}</span></td>
                                <td class="text-end pe-4">
                                    <button class="btn btn-light btn-sm rounded-pill me-1" onclick="showEmpDetail(${index})"><i class="fas fa-eye text-dark"></i></button>
                                    <button class="btn btn-light btn-sm rounded-pill text-danger"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        `,
                          )
                          .join("")}
                    </tbody>
                </table>
            `;
    }
  }

 window.showEmpDetail = function (index) {
   const e = employees[index];
   const modalBody = document.getElementById("emp-modal-body");
   modalBody.innerHTML = `
        <div class="text-center mb-4">
            <div class="emp-avatar-circle mx-auto mb-3 d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" 
                 style="background: ${e.color}; width: 80px; height: 80px; min-width: 80px; font-size: 32px; border-radius: 50%;">
                ${e.name.split(" ").pop().charAt(0)}
            </div>
            <h5 class="fw-bold mb-1 text-dark">${e.name}</h5>
            <p class="text-muted small mb-0">${e.email}</p>
        </div>
        <ul class="list-group list-group-flush border-top">
            <li class="list-group-item d-flex justify-content-between align-items-center py-3">
                <span class="text-muted small">Mã nhân viên:</span>
                <span class="fw-bold text-dark">${e.id}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center py-3">
                <span class="text-muted small">Phòng ban:</span>
                <span class="fw-bold text-dark">${e.dept}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center py-3">
                <span class="text-muted small">Chức vụ:</span>
                <span class="fw-bold text-dark">${e.pos}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center py-3">
                <span class="text-muted small">Ngày gia nhập:</span>
                <span class="fw-bold text-dark">${e.join}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center py-3 border-0">
                <span class="text-muted small">Trạng thái:</span>
                <span class="emp-badge status-${e.status}">${e.label}</span>
            </li>
        </ul>
        <div class="d-grid mt-3">
            <button type="button" class="btn btn-primary rounded-pill py-2" data-bs-dismiss="modal">Đóng hồ sơ</button>
        </div>
    `;
   new bootstrap.Modal(document.getElementById("emp-detail-modal")).show();
 };

  renderEmployees();
  window.onresize = renderEmployees;
})();
