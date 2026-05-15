<?php
// app/Core/Database.php
namespace App\Core;

use PDO;
use PDOException;
use DatabaseConfig;

require_once __DIR__ . '/../Config/Database.php';

class Database
{
     protected $conn;

     public function __construct()
     {
          // Đường dẫn tới file chứng chỉ chú vừa tải về
          $ca_path = __DIR__ . '/../Config/ca.pem';

          $dsn = "mysql:host=" . DatabaseConfig::DB_HOST .
               ";port=" . DatabaseConfig::DB_PORT .
               ";dbname=" . DatabaseConfig::DB_NAME .
               ";charset=utf8mb4";

          try {
               $options = [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
                    // Dòng quan trọng để Aiven cho vào nè:
                    PDO::MYSQL_ATTR_SSL_CA => $ca_path,
                    PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false,
               ];

               $this->conn = new PDO($dsn, DatabaseConfig::DB_USER, DatabaseConfig::DB_PASS, $options);
          } catch (PDOException $e) {
               die("Lỗi kết nối Aiven: " . $e->getMessage());
          }
     }

     public function getConnection()
     {
          return $this->conn;
     }
}
