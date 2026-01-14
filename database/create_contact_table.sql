USE railway;

CREATE TABLE IF NOT EXISTS contact_message (
  id INT AUTO_INCREMENT PRIMARY KEY,
  artisan_id INT NOT NULL,
  requester_name VARCHAR(100) NOT NULL,
  requester_email VARCHAR(150) NOT NULL,
  request_type ENUM('renseignement','prestation','tarif') NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (artisan_id)
);
