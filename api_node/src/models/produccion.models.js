import sequelize, { Sequelize, DataTypes } from "sequelize";

const Produccion = sequelize.define("produccion",{
    title:{
        type:DataTypes.STRING,
        allowNull:true
    },

})