-- Création de la base de données
CREATE DATABASE IF NOT EXISTS trouve_ton_artisan
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE trouve_ton_artisan;

-- Table ARTISAN
CREATE TABLE artisan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    description TEXT,
    ville VARCHAR(100),
    code_postal VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table METIER
CREATE TABLE metier (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

-- Table de liaison ARTISAN_METIER
CREATE TABLE artisan_metier (
    artisan_id INT NOT NULL,
    metier_id INT NOT NULL,
    PRIMARY KEY (artisan_id, metier_id),
    FOREIGN KEY (artisan_id) REFERENCES artisan(id) ON DELETE CASCADE,
    FOREIGN KEY (metier_id) REFERENCES metier(id) ON DELETE CASCADE
);
