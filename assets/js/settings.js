(function () {
  const allModules = [
    { id: "dashboard", name: "Tổng quan" },
    { id: "analytics", name: "Báo cáo & Thống kê" },
    { id: "sale", name: "Bán hàng (POS)" },
    { id: "customers", name: "Khách hàng" },
    { id: "employees", name: "Nhân viên" },
    { id: "warehouse", name: "Quản lý kho" },
    { id: "orders", name: "Đơn hàng" },
    { id: "accounting", name: "Công nợ" },
  ];

  const users = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      role: "Admin",
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
      id: 2,
      name: "Trần Thị B",
      role: "Sales",
      permissions: ["sale", "orders", "customers"],
    },
  ];

  let currentUserEditing = null;

  function renderSettings() {
    const userList = document.getElementById("set-user-list");
    if (!userList) return;

    userList.innerHTML = users
      .map(
        (user) => `
            <a href="javascript:void(0)" class="list-group-item list-group-item-action py-3 border-0 border-bottom" onclick="selectUser(${user.id})">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <div class="fw-bold small">${user.name}</div>
                        <small class="text-muted">${user.role}</small>
                    </div>
                    <i class="fas fa-chevron-right small text-muted"></i>
                </div>
            </a>
        `,
      )
      .join("");
  }

  window.selectUser = (id) => {
    currentUserEditing = users.find((u) => u.id === id);
    document.getElementById("set-no-user-selected").classList.add("d-none");
    document.getElementById("set-permission-card").classList.remove("d-none");
    document.getElementById("set-active-user-name").innerText =
      currentUserEditing.name;

    const permList = document.getElementById("set-permission-list");
    permList.innerHTML = allModules
      .map(
        (mod) => `
            <tr>
                <td class="small fw-bold text-dark">${mod.name}</td>
                <td class="text-center">
                    <div class="form-check form-switch d-inline-block">
                        <input class="form-check-input shadow-none" type="checkbox" 
                            ${currentUserEditing.permissions.includes(mod.id) ? "checked" : ""} 
                            data-module="${mod.id}">
                    </div>
                </td>
            </tr>
        `,
      )
      .join("");
  };

  window.savePermissions = () => {
    const checkboxes = document.querySelectorAll("#set-permission-list input");
    const newPerms = [];
    checkboxes.forEach((cb) => {
      if (cb.checked) newPerms.push(cb.dataset.module);
    });

    currentUserEditing.permissions = newPerms;
    showFire(`Đã cập nhật quyền cho ${currentUserEditing.name}`, "success");

    // Sau khi lưu, chú có thể gọi hàm cập nhật Sidebar ngay lập tức (nếu đang test cho chính mình)
    updateSidebarUI();
  };

  renderSettings();
})();
