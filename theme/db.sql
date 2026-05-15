-- 1. XÓA BẢNG CŨ (NẾU CÓ) ĐỂ TRÁNH LỖI
DROP TABLE IF EXISTS `order_items`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `users`;

-- 2. TẠO BẢNG NHÂN VIÊN (USERS)
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `emp_id` VARCHAR(50) UNIQUE NOT NULL COMMENT 'Mã nhân viên dùng để đăng nhập',
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'warehouse', 'sales') DEFAULT 'sales',
  `permissions` TEXT COMMENT 'Lưu danh sách quyền dạng JSON',
  `status` ENUM('active', 'inactive') DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. TẠO TÀI KHOẢN ADMIN MẪU (Pass: 123456)
-- Lưu ý: Password đã được mã hóa bằng password_hash của PHP
INSERT INTO `users` (`emp_id`, `name`, `email`, `password`, `role`, `permissions`) 
VALUES ('admin', 'Lê Khánh Duy', 'lkdffst@gmail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', '["view_dashboard","manage_warehouse","manage_employees","view_reports","sale_pos"]');

-- 4. TẠO BẢNG DANH MỤC (CATEGORIES)
CREATE TABLE `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category_name` VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `categories` (`category_name`) VALUES ('Điện tử'), ('Gia dụng'), ('Văn phòng phẩm');

-- 5. TẠO BẢNG SẢN PHẨM (PRODUCTS)
CREATE TABLE `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `sku` VARCHAR(50) UNIQUE NOT NULL COMMENT 'Mã vạch sản phẩm',
  `name` VARCHAR(255) NOT NULL,
  `category_id` INT,
  `import_price` DECIMAL(15,2) DEFAULT 0,
  `sale_price` DECIMAL(15,2) DEFAULT 0,
  `stock` INT DEFAULT 0,
  `unit` VARCHAR(50) DEFAULT 'Cái',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. TẠO BẢNG ĐƠN HÀNG (ORDERS)
CREATE TABLE `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_code` VARCHAR(50) UNIQUE NOT NULL,
  `user_id` INT COMMENT 'Nhân viên bán hàng',
  `total_amount` DECIMAL(15,2) DEFAULT 0,
  `customer_name` VARCHAR(255) DEFAULT 'Khách vãng lai',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. TẠO BẢNG CHI TIẾT ĐƠN HÀNG (ORDER_ITEMS)
CREATE TABLE `order_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT,
  `product_id` INT,
  `quantity` INT NOT NULL,
  `price` DECIMAL(15,2) NOT NULL,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;