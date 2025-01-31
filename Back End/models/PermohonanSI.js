import bcrypt from "bcrypt"; // Pastikan bcrypt diimpor
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const PermohonanSI = db.define(
    "list_permohonan_si", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        submission_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        submission_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apiKey: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fields: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: {},
        },
        submission_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        on_validation: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        feasibility_analysis: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        feasibility_validation: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        technical_analysis: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        technical_validation: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        recommendation_letter_technical:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
    }
);


export default PermohonanSI;