const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Metier = sequelize.define(
  "Metier",
  {
    nom: DataTypes.STRING,
  },
  {
    tableName: "metier",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Metier;
