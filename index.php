<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}
?><?php
// index.php
session_start();

// 1. KIỂM TRA BẢO MẬT: Nếu chưa đăng nhập (không có session) thì đá về login.php ngay
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hệ Thống Quản Trị Nội Bộ</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="icon" href="https://crm.biglead.live/ic_biglead-yellow.svg" type="image/svg+xml">
    <link rel="stylesheet" href="assets/css/global.css">
</head>

<body>

    <div class="main-wrapper">
        <nav id="main-sidebar" class="bg-dark text-white">
            <div class="sidebar-brand p-4">
                <h4 class="text-uppercase fw-bold mb-0">Company ERP</h4>
            </div>
            <ul class="nav flex-column px-3">
                <li class="nav-item mb-2">
                    <a href="javascript:void(0)" class="nav-link text-white active" onclick="navigate('dashboard')">
                        <i class="fas fa-th-large me-2"></i> Tổng quan
                    </a>
                </li>
                <li class="nav-item mb-2">
                    <a href="javascript:void(0)" class="nav-link text-white" onclick="navigate('warehouse')">
                        <i class="fas fa-warehouse me-2"></i> Quản lý kho
                    </a>
                </li>
                <li class="nav-item mb-2">
                    <a href="javascript:void(0)" class="nav-link text-white" onclick="navigate('settings')">
                        <i class="fas fa-cog me-2"></i> Cài đặt
                    </a>
                </li>
            </ul>
        </nav>

        <div id="main-body" class="w-100">
            <header class="navbar navbar-expand bg-white shadow-sm px-4 py-2">
                <button class="btn btn-light rounded-circle me-3" id="toggle-sidebar">
                    <i class="fas fa-bars text-secondary"></i>
                </button>

                <form class="d-none d-md-flex ms-2">
                    <div class="input-group input-group-merge wh-search-header">
                        <span class="input-group-text border-0 bg-light"><i class="fas fa-search text-muted"></i></span>
                        <input type="text" class="form-control border-0 bg-light shadow-none" placeholder="Tìm nhanh..." style="width: 250px;">
                    </div>
                </form>

                <div class="ms-auto d-flex align-items-center">
                    <div class="dropdown me-3">
                        <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
                            <div class="text-end me-2 d-none d-sm-block">
                                <div class="fw-bold text-dark mb-0" style="font-size: 14px;">
                                    <?php echo $_SESSION['user_name']; ?>
                                </div>
                                <div class="text-muted" style="font-size: 12px;">
                                    <?php echo ($_SESSION['user_role'] == 'admin') ? 'Quản trị viên' : 'Nhân viên'; ?>
                                </div>
                            </div>
                            <img src="https://ui-avatars.com/api/?name=<?php echo urlencode($_SESSION['user_name']); ?>&background=4361ee&color=fff" class="rounded-circle border border-2 border-white shadow-sm" width="40" height="40" alt="Avatar">
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end shadow border-0 p-2 mt-2">
                            <li><a class="dropdown-item rounded-2 py-2" href="javascript:void(0)" onclick="navigate('profile')"><i class="fas fa-user-cog me-2"></i> Hồ sơ cá nhân</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item rounded-2 py-2 text-danger" href="logout.php"><i class="fas fa-sign-out-alt me-2"></i> Đăng xuất</a></li>
                        </ul>
                    </div>
                </div>
            </header>

            <main id="app-container" class="p-4">
                <div class="text-center py-5">
                    <div class="spinner-border text-primary" role="status"></div>
                </div>
            </main>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>