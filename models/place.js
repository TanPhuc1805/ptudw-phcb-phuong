"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Place extends Model {
        static associate(models) {
            Place.hasMany(models.Requestads, {
                foreignKey: 'placeId'
            });
        }
    }
    Place.init(
        {
            diaChi: DataTypes.STRING,
            khuVuc: DataTypes.STRING,
            loaiVT: DataTypes.STRING,
            hinhThuc: DataTypes.STRING,
            hinhAnh: DataTypes.STRING,
            hinhAnhId:DataTypes.STRING,
            quyHoach: DataTypes.STRING,
            longitude: DataTypes.REAL,
            latitude: DataTypes.REAL
        },
        {
            sequelize,
            modelName: "Place",
        }
    );
    return Place;
};
