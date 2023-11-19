import { Sequelize } from "sequelize";

const db = new Sequelize('auth_vet', "panti", 'pixelmon21',{
    host: "ngrok.panti.my.id",
    port: "18561",
    dialect: "mysql",
    dialectModule : require("mysql2"),
})

export default db
