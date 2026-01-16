CREATE TABLE IF NOT EXISTS artisan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    description TEXT,
    ville VARCHAR(100),
    code_postal VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS metier (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS artisan_metier (
    artisan_id INT NOT NULL,
    metier_id INT NOT NULL,
    PRIMARY KEY (artisan_id, metier_id)
);
