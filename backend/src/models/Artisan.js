const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Artisan = sequelize.define(
  "Artisan",
  {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    telephone: DataTypes.STRING,
    description: DataTypes.TEXT,
    ville: DataTypes.STRING,
    code_postal: DataTypes.STRING,
  },
  {
    tableName: "artisan",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Artisan;
