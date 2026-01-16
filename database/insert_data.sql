

-- Métiers
INSERT INTO metier (nom) VALUES
('Plombier'),
('Électricien'),
('Menuisier'),
('Maçon'),
('Peintre');

-- Artisans
INSERT INTO artisan (nom, prenom, email, telephone, description, ville, code_postal) VALUES
('Dupont', 'Jean', 'jean.dupont@mail.fr', '0600000001', 'Plombier expérimenté', 'Lyon', '69000'),
('Martin', 'Sophie', 'sophie.martin@mail.fr', '0600000002', 'Électricienne qualifiée', 'Grenoble', '38000'),
('Durand', 'Paul', 'paul.durand@mail.fr', '0600000003', 'Menuisier artisan', 'Voiron', '38500');

-- Relations artisan / métier
INSERT INTO artisan_metier (artisan_id, metier_id) VALUES
(1, 1),
(2, 2),
(3, 3);
