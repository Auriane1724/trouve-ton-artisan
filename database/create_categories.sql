USE railway;

CREATE TABLE IF NOT EXISTS categorie (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(80) NOT NULL UNIQUE,
  slug VARCHAR(80) NOT NULL UNIQUE
);

INSERT IGNORE INTO categorie (label, slug) VALUES
('Bâtiment', 'batiment'),
('Services', 'services'),
('Fabrication', 'fabrication'),
('Alimentation', 'alimentation');
