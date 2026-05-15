document.getElementById('login-form').onsubmit = function(e) {
    e.preventDefault();

    const userId = document.getElementById('login-id').value.trim();
    const userPass = document.getElementById('login-pass').value.trim();
    const btn = document.getElementById('btn-submit-login');

    // 1. Hiệu ứng Loading
    btn.disabled = true;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Đang xác thực...';

    // 2. Giả lập kiểm tra tài khoản (Sau này thay bằng API)
    setTimeout(() => {
        // Tài khoản Admin mặc định để test
        if (userId === 'admin' && userPass === '123456') {
            const userData = {
                id: 'NV000',
                name: 'Quản trị viên',
                role: 'Admin',
                // Full quyền cho Admin
                permissions: ['dashboard', 'analytics', 'sale', 'customers', 'employees', 'warehouse', 'orders', 'accounting', 'settings']
            };

            // Lưu vào localStorage
            localStorage.setItem('erp_user', JSON.stringify(userData));

            Swal.fire({
                icon: 'success',
                title: 'Đăng nhập thành công',
                text: 'Chào mừng bạn quay trở lại hệ thống!',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = 'index.html'; // Chuyển vào Dashboard
            });

        } else {
            // Thất bại
            btn.disabled = false;
            btn.innerHTML = originalText;
            Swal.fire({
                icon: 'error',
                title: 'Lỗi đăng nhập',
                text: 'Mã nhân viên hoặc mật khẩu không chính xác!',
                confirmButtonColor: '#4361ee'
            });
        }
    }, 1200);
};