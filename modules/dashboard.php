<?php
session_start();
// Kiểm tra nếu gọi trực tiếp file này mà không qua index.php thì chặn lại
if (!isset($_SESSION['user_id'])) {
    die("Bạn không có quyền truy cập!");
}
?>
<div class="dash-container">
    <div class="row g-4 mb-4">
        <div class="col-md-3">
            <div class="card border-0 shadow-sm p-3">
                <small class="text-muted d-block mb-1">Tổng doanh thu</small>
                <h4 class="fw-bold text-primary mb-0">3.2B</h4>
                <small class="text-success fw-bold"><i class="fas fa-arrow-up"></i> 15%</small>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card border-0 shadow-sm p-3">
                <small class="text-muted d-block mb-1">Tổng đơn hàng</small>
                <h4 class="fw-bold text-dark mb-0">1,250</h4>
                <small class="text-success fw-bold"><i class="fas fa-arrow-up"></i> 8%</small>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card border-0 shadow-sm p-3">
                <small class="text-muted d-block mb-1">Khách hàng mới</small>
                <h4 class="fw-bold text-dark mb-0">+450</h4>
                <small class="text-danger fw-bold"><i class="fas fa-arrow-down"></i> 2%</small>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card border-0 shadow-sm p-3">
                <small class="text-muted d-block mb-1">Tỷ lệ hoàn hàng</small>
                <h4 class="fw-bold text-dark mb-0">1.2%</h4>
                <small class="text-success fw-bold">Ổn định</small>
            </div>
        </div>
    </div>

    <div class="row g-4 mb-4">
        <div class="col-lg-8">
            <div class="card dash-card border-0 shadow-sm dash-welcome-card" style="background: #eef2ff;">
                <div class="card-body d-flex align-items-center justify-content-between p-4">
                    <div class="dash-welcome-text">
                        <h4 class="fw-bold text-primary mb-2">Chúc mừng <?php echo $_SESSION['user_name']; ?>! 🎉</h4>
                        <p class="text-muted mb-3">Bạn đã đạt <span class="fw-bold">78%</span> mục tiêu doanh số tháng này.<br>Hãy kiểm tra các đơn hàng mới ngay.</p>
                        <button class="btn btn-primary btn-sm rounded-pill px-3" onclick="navigate('orders')">Xem đơn hàng</button>
                    </div>
                    <div class="dash-welcome-img d-none d-md-block">
                        <i class="fas fa-rocket text-primary" style="font-size: 80px; opacity: 0.2;"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="row g-4">
                <div class="col-6">
                    <div class="card dash-card border-0 shadow-sm p-3">
                        <div class="dash-icon-box bg-success-subtle text-success mb-2">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <small class="text-muted d-block">Doanh số</small>
                        <h5 class="fw-bold mb-0">125.4M</h5>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card dash-card border-0 shadow-sm p-3">
                        <div class="dash-icon-box bg-info-subtle text-info mb-2">
                            <i class="fas fa-chart-pie"></i>
                        </div>
                        <small class="text-muted d-block">Lợi nhuận</small>
                        <h5 class="fw-bold mb-0">42.8M</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row g-4 mb-4">
        <div class="col-lg-8">
            <div class="card dash-card border-0 shadow-sm">
                <div class="card-header bg-white py-3 border-0 d-flex justify-content-between">
                    <h5 class="fw-bold mb-0">Biến động Doanh thu</h5>
                </div>
                <div class="card-body text-center">
                    <p class="text-muted">Biểu đồ đang được nạp...</p>
                    <div id="dash-income-chart" style="height: 300px; background: #f9f9f9; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-chart-line fa-3x text-light"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card dash-card border-0 shadow-sm h-100">
                <div class="card-header bg-white py-3 border-0">
                    <h5 class="fw-bold mb-0">Giao dịch gần đây</h5>
                </div>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item border-0 px-0 small">
                            <i class="fas fa-shopping-bag text-primary me-2"></i> Đơn hàng #1234 - <b class="text-success">+2.5M</b>
                        </li>
                        <li class="list-group-item border-0 px-0 small">
                            <i class="fas fa-shopping-bag text-primary me-2"></i> Đơn hàng #1235 - <b class="text-success">+1.2M</b>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>