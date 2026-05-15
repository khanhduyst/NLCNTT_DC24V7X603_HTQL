document.getElementById("login-form").onsubmit = function (e) {
  e.preventDefault();

  const emp_id = document.getElementById("login-id").value.trim();
  const password = document.getElementById("login-pass").value.trim();
  const btn = document.getElementById("btn-submit-login");

  btn.disabled = true;
  const originalText = btn.innerHTML;
  btn.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2"></span> Đang xác thực...';

  fetch("api/api_login.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emp_id: emp_id,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Đăng nhập thành công",
          text: "Chào mừng bạn quay trở lại hệ thống!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.href = "index.php";
        });
      } else {
        btn.disabled = false;
        btn.innerHTML = originalText;
        Swal.fire({
          icon: "error",
          title: "Lỗi đăng nhập",
          text: result.message,
          confirmButtonColor: "#4361ee",
        });
      }
    })
    .catch((err) => {
      btn.disabled = false;
      btn.innerHTML = originalText;
      Swal.fire({
        icon: "error",
        title: "Lỗi hệ thống",
        text: "Không thể kết nối đến máy chủ API!",
        confirmButtonColor: "#4361ee",
      });
    });
};
