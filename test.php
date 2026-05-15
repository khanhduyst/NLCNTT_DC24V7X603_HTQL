<?php
require_once 'app/Core/Database.php';
use App\Core\Database;

$db = new Database();
$conn = $db->getConnection();

// Chú copy nguyên đống này thảy vào file test.php rồi chạy trình duyệt nhé
$sql = "
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    emp_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'warehouse', 'sales') DEFAULT 'sales',
    permissions TEXT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Thêm bảng khác nếu chú muốn...
";

try {
    $conn->exec($sql);
    echo "<h1>Bắn SQL thành công! Bảng đã xuất hiện trên Aiven.</h1>";
} catch (PDOException $e) {
    echo "Lỗi: " . $e->getMessage();
}