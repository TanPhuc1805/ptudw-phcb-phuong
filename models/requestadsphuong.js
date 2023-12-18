"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Requestadsphuong extends Model {
        static associate(models) {
            Requestadsphuong.belongsTo(models.Place, { foreignKey: "placeId" });
        }
    }
    Requestadsphuong.init(
        {
            congTy: DataTypes.STRING,
            diaChiCongTy: DataTypes.STRING,
            dienThoai: DataTypes.STRING,
            email: DataTypes.STRING,

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
            modelName: "Requestadsphuong",
        }
    );
    return Requestadsphuong;
};
