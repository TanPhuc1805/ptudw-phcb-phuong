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
    order: [["diaChi", "ASC"]],
    where:{
      khuVuc:"Phường 4, Quận 5"
    }
  });

  res.render("manageList");
};
controller.requestEditPlace = async (req, res) => {
  let {diaChi, khuVuc, loaiVT, hinhThuc, isQuyHoach, liDoChinhSua} = req.body;
  try {
    await models.Requesteditplace.create({
      diaChi, 
      khuVuc, 
      loaiVT, 
      hinhThuc, 
      quyHoach: isQuyHoach ? "ĐÃ QUY HOẠCH" : "CHƯA QUY HOẠCH",
      liDoChinhSua
    });
    res.redirect("/manageList");
  } catch (error) {
    res.send("Không thể thêm điểm đặt");
    console.error(error);
  }
}
module.exports=controller;