import { Sequelize } from "sequelize";
import sqlite from "sqlite3";
import User, { initializeUserModel } from "@/lib/models/user";

const sequelize = new Sequelize({
	dialect: "sqlite",
	dialectModule: sqlite,
	storage: "./database.sqlite3",
});

// Initialize user models
initializeUserModel(sequelize);

export { sequelize, User };
