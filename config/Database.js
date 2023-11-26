import { Sequelize } from "sequelize";
import mysql from "mysql2"

const db = new Sequelize('auth_vet', "ariq", '123456',{
    host: "ngrok.panti.my.id",
    port: "10178",
    dialect: "mysql",
    dialectModule : mysql,
})

export default db
