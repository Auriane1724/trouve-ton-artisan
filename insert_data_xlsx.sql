-- Import artisans depuis data.xlsx (17 lignes)
USE railway;

-- 1) Métiers
INSERT IGNORE INTO metier (nom) VALUES
('Bijoutier'),
('Boucher'),
('Boulanger'),
('Chauffagiste'),
('Chocolatier'),
('Coiffeur'),
('Couturier'),
('Electricien'),
('Ferronier'),
('Fleuriste'),
('Menuisier'),
('Plombier'),
('Toiletteur'),
('Traiteur'),
('Webdesign');

-- 2) Artisans (on mappe Nom->nom, A propos->description, Ville->ville, Email->email)
--    Les champs prenom/telephone/code_postal ne sont pas dans le fichier: on met des valeurs neutres.
INSERT IGNORE INTO artisan (nom, prenom, email, telephone, description, ville, code_postal) VALUES
('Boucherie Dumont','', 'boucherie.dumond@gmail.com','', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ','Lyon',''),
('Au pain chaud','', 'aupainchaud@hotmail.com','', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ','Montélimar',''),
('Chocolaterie Labbé','', 'chocolaterie-labbe@gmail.com','', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ','Lyon',''),
('Traiteur Truchon','', 'contact@truchon-traiteur.fr','', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ','Lyon',''),
('Orville Salmons','', 'o-salmons@live.com','', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ','Evian',''),
('Mont Blanc Eléctricité','', 'contact@mont-blanc-electricite.com','', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ','Chamonix',''),
('Boutot & fils','', 'boutot-menuiserie@gmail.com','', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ','Bourg-en-bresse',''),
('Vallis Bellemare','', 'v.bellemare@gmail.com','', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ','Vienne',''),
('Claude Quinn','', 'claude.quinn@gmail.com','', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ','Aix-les-bains',''),
('Amitee Lécuyer','', 'a.amitee@hotmail.com','', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ','Annecy',''),
('Ernest Carignan','', 'e-carigan@hotmail.com','', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ','Le Puy-en-Velay',''),
('Royden Charbonneau','', 'r.charbonneau@gmail.com','', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ','Saint-Priest',''),
('Leala Dennis','', 'l.dennos@hotmail.fr','', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ','Chambéry',''),
('C\'est sup\'hair','', 'sup-hair@gmail.com','', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ','Romans-sur-Isère',''),
('Le monde des fleurs','', 'contact@le-monde-des-fleurs-annonay.fr','', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ','Annonay',''),
('Valérie Laderoute','', 'v-laredoute@gmail.com','', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ','Valence',''),
('CM Graphisme','', 'contact@cm-graphisme.com','', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ','Valence','');

-- 3) Liaisons artisan <-> métier
INSERT IGNORE INTO artisan_metier (artisan_id, metier_id)
SELECT a.id, m.id FROM artisan a JOIN metier m ON m.nom='Boucher' WHERE a.email='boucherie.dumond@gmail.com';
INSERT IGNORE INTO artisan_metier (artisan_id, metier_id)
SELECT a.id, m.id FROM artisan a JOIN metier m ON m.nom='Boulanger' WHERE a.email='aupainchaud@hotmail.com';
INSERT IGNORE INTO artisan_metier (artisan_id, metier_id)
SELECT a.id, m.id FROM artisan a JOIN metier m ON m.nom='Chocolatier' WHERE a.email='chocolaterie-labbe@gmail.com';
INSERT IGNORE INTO artisan_metier (artisan_id, metier_id)
SELECT a.id, m.id FROM artisan a JOIN metier m ON m.nom='Traiteur' WHERE a.email='contact@truchon-traiteur.fr';
INSERT IGNORE INTO artisan_metier (artisan_id, metier_id)
SELECT a.id, m.id FROM artisan a JOIN metier m ON m.nom='Chauffagiste' WHERE a.email='o-salmons@live.com';
INSERT IGNORE INTO artisan_metier (artisan_id, metier_id)
SELECT a.id, m.id FROM artisan a JOIN metier m ON m.nom='Electricien' WHERE a.email='contact@mont-blanc-electricite.com';
INSERT IGNORE INTO artisan_metier (artisan_id, metier_id)
SELECT a.id, m.id FROM artisan a JOIN metier m ON m.nom='Menuisier' WHERE a.email='boutot-menuiserie@gmail.com';
INSERT IGNORE INTO artisan_metier (artisan_id, metier_id)
SELECT a.id, m.id FROM artisan a JOIN metier m ON m.nom='Plombier' WHERE a.email='v.bellemare@gmail.com';
INSERT IGNORE INTO artisan_metier (artisan_id, metier_id)
SELECT a.id, m.id FROM artisan a JOIN metier m ON m.nom='Bijoutier' WHERE a.email='claude.quinn@gmail.com';
INSERT IGNORE INTO artisan_metier (artisan_id, metier_id)
SELECT a.id, m.id FROM artisan a JOIN metier m ON m.nom='Couturier' WHERE a.email='a.amitee@hotmail.com';
INSERT IGNORE INTO artisan_metier (artisan_id, metier_id)
SELECT a.id, m.id FROM artisan a JOIN metier m ON m.nom='Ferronier' WHERE a.email='e-carigan@hotmail.com';
INSERT IGNORE INTO artisan_metier (artisan_id, metier_id)
SELECT a.id, m.id FROM artisan a JOIN metier m ON m.nom='Coiffeur' WHERE a.email='r.charbonneau@gmail.com';
INSERT IGNORE INTO artisan_metier (artisan_id, metier_id)
SELECT a.id, m.id FROM artisan a JOIN metier m ON m.nom='Coiffeur' WHERE a.email='l.dennos@hotmail.fr';
INSERT IGNORE INTO artisan_metier (artisan_id, metier_id)
SELECT a.id, m.id FROM artisan a JOIN metier m ON m.nom='Coiffeur' WHERE a.email='sup-hair@gmail.com';
INSERT IGNORE INTO artisan_metier (artisan_id, metier_id)
SELECT a.id, m.id FROM artisan a JOIN metier m ON m.nom='Fleuriste' WHERE a.email='contact@le-monde-des-fleurs-annonay.fr';
INSERT IGNORE INTO artisan_metier (artisan_id, metier_id)
SELECT a.id, m.id FROM artisan a JOIN metier m ON m.nom='Toiletteur' WHERE a.email='v-laredoute@gmail.com';
INSERT IGNORE INTO artisan_metier (artisan_id, metier_id)
SELECT a.id, m.id FROM artisan a JOIN metier m ON m.nom='Webdesign' WHERE a.email='contact@cm-graphisme.com';