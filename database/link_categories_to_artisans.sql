USE railway;

CREATE TABLE IF NOT EXISTS categorie_artisan (
  categorie_id INT NOT NULL,
  artisan_id INT NOT NULL,
  PRIMARY KEY (categorie_id, artisan_id),
  INDEX (categorie_id),
  INDEX (artisan_id)
);

-- Exemple d'association automatique :
-- (à adapter si ton Excel contient déjà un champ "catégorie" ou si tu veux classifier par métier)

-- Bâtiment : métiers type plombier, électricien, maçon, peintre, menuisier…
INSERT IGNORE INTO categorie_artisan (categorie_id, artisan_id)
SELECT c.id, a.id
FROM categorie c
JOIN artisan a
JOIN artisan_metier am ON am.artisan_id = a.id
JOIN metier m ON m.id = am.metier_id
WHERE c.slug = 'batiment'
  AND LOWER(m.nom) REGEXP 'plomb|électric|electric|maçon|macon|peint|menuis|charpent|chauffag|carrel|couvert|toitur';

-- Services : nettoyage, dépannage, jardin, etc (exemple)
INSERT IGNORE INTO categorie_artisan (categorie_id, artisan_id)
SELECT c.id, a.id
FROM categorie c
JOIN artisan a
JOIN artisan_metier am ON am.artisan_id = a.id
JOIN metier m ON m.id = am.metier_id
WHERE c.slug = 'services'
  AND LOWER(m.nom) REGEXP 'service|nettoy|jardin|depann|dépann|serrur|vitrier|demenag|déménag';

-- Fabrication : fabrication, atelier, sur-mesure…
INSERT IGNORE INTO categorie_artisan (categorie_id, artisan_id)
SELECT c.id, a.id
FROM categorie c
JOIN artisan a
JOIN artisan_metier am ON am.artisan_id = a.id
JOIN metier m ON m.id = am.metier_id
WHERE c.slug = 'fabrication'
  AND LOWER(m.nom) REGEXP 'fabric|atelier|coutur|cuisin|ébén|eben|forge|imprim|serigraph|broder';

-- Alimentation : boulanger, pâtissier, traiteur…
INSERT IGNORE INTO categorie_artisan (categorie_id, artisan_id)
SELECT c.id, a.id
FROM categorie c
JOIN artisan a
JOIN artisan_metier am ON am.artisan_id = a.id
JOIN metier m ON m.id = am.metier_id
WHERE c.slug = 'alimentation'
  AND LOWER(m.nom) REGEXP 'boulang|pâtiss|patiss|traiteur|boucher|fromag|chocol|restaur|cuisine';
