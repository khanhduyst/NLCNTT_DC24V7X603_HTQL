<?php
// app/Models/UserModel.php
namespace App\Models;
use App\Core\Database;
use PDO;

class UserModel {
    private $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function findByEmpId($emp_id) {
        // Tìm nhân viên theo mã
        $stmt = $this->db->prepare("SELECT * FROM users WHERE emp_id = ? LIMIT 1");
        $stmt->execute([$emp_id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}