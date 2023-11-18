import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Reservation = db.define("reservations", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jenisHewan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  whatsapp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tujuan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Reservation.belongsTo(Users, { foreignKey: 'userId' });

export default Reservation;
