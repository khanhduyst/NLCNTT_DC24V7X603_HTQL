<?php
session_start();
header('Content-Type: application/json');

// Tắt hiện lỗi trực tiếp để không làm hỏng cấu trúc JSON trả về
error_reporting(0);
ini_set('display_errors', 0);

// Nạp các file cần thiết
require_once __DIR__ . '/../app/Core/Database.php';
require_once __DIR__ . '/../app/Models/UserModel.php';

use App\Models\UserModel;

// Lấy dữ liệu từ Fetch API gửi lên
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$emp_id = $data['emp_id'] ?? '';
$password = $data['password'] ?? '';

// Kiểm tra input đầu vào
if (empty($emp_id) || empty($password)) {
    echo json_encode(['status' => 'error', 'message' => 'Vui lòng nhập đầy đủ tài khoản và mật khẩu']);
    exit;
}

try {
    $userModel = new UserModel();
    $user = $userModel->findByEmpId($emp_id);

    if ($user) {
        // password_verify: Tự động so khớp mật khẩu nhập vào với chuỗi băm trong DB
        if (password_verify($password, $user['password'])) {
            
            // Lưu thông tin vào Session để dùng cho các trang sau
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_role'] = $user['role'];

            echo json_encode([
                'status' => 'success', 
                'message' => 'Đăng nhập thành công'
            ]);
        } else {
            echo json_encode([
                'status' => 'error', 
                'message' => 'Mật khẩu không chính xác'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error', 
            'message' => 'Mã nhân viên không tồn tại trên hệ thống'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error', 
        'message' => 'Lỗi kết nối hệ thống: ' . $e->getMessage()
    ]);
}
exit;