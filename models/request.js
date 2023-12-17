"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Request extends Model {
        static associate(models) {
            Request.belongsTo(models.Place, { foreignKey: "placeId" });
        }
    }
    Request.init(
        {
            congTy: DataTypes.STRING,
            diaChiCongTy: DataTypes.STRING,
            dienThoai: DataTypes.STRING,
            email: DataTypes.STRING,
            diaChi: DataTypes.STRING,
            //khuVuc: DataTypes.STRING,
            //loaiVT: DataTypes.STRING,
            //longitude: DataTypes.REAL,
            //latitude: DataTypes.REAL,

            placeId: DataTypes.INTEGER,

            tenBangQuangCao:DataTypes.STRING,
            loaiQC:DataTypes.STRING,
            kichThuoc:DataTypes.STRING,
            soLuong:DataTypes.INTEGER,
            ngayBatDau:DataTypes.STRING,
            ngayKetThuc:DataTypes.STRING,
            tinhTrang:DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Request",
        }
    );
    return Request;
};
