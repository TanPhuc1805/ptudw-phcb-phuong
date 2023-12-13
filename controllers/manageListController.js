const controller={};
const models = require("../models");
controller.show = async (req, res) => {
  res.locals.places = await models.Place.findAll({
    
    attributes: [
      "id",
      "diaChi",
      "khuVuc",
      "loaiVT",
      "hinhThuc",
      "quyHoach",
      "hinhAnh",
      "longitude",
      "latitude"
    ],
    order: [["createdAt", "DESC"]],
    limit: 10,
  });

  res.render("manageList");
};

module.exports=controller;