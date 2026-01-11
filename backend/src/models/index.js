const Artisan = require("./Artisan");
const Metier = require("./Metier");

Artisan.belongsToMany(Metier, {
  through: "artisan_metier",
  foreignKey: "artisan_id",
  otherKey: "metier_id",
  timestamps: false,
});

Metier.belongsToMany(Artisan, {
  through: "artisan_metier",
  foreignKey: "metier_id",
  otherKey: "artisan_id",
  timestamps: false,
});

module.exports = { Artisan, Metier };
