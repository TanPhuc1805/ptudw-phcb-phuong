const controller={};
const models = require("../models");
const moment = require('moment');
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

  res.locals.placedetails = await models.Placedetail.findAll({
    include: [{
      model: models.Place,
      attributes: [
        "diaChi",
        "khuVuc"
      ],
    }],
    attributes: [
      "id",
      "adName",
      "adSize",
      "adQuantity",
      "expireDay",
      "imagePath",
    ],
    where: {
      '$Place.khuVuc$': 'Phường 4, Quận 5'
    },
    order: [[models.Place, "diaChi", "ASC"]],
    
  });

  res.render("manageList", {
    placedetails: res.locals.placedetails.map(detail => ({
      ...detail.toJSON(),
      formattedExpireDay: moment(detail.expireDay).format('MM/DD/YYYY'),
    })),  
  });
};
controller.requestEditPlace = async (req, res) => {
  let {id, diaChi, khuVuc, loaiVT, hinhThuc, isQuyHoach, liDoChinhSua} = req.body;
  try {
    await models.Requesteditplace.create({
      placeId: id,
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

controller.requestEditAds = async (req, res) => {
  let {adName, diaChiAds, adSize, adQuantity, expireDay, liDoChinhSua} = req.body;

  const parsedDate = moment(expireDay, 'MM/DD/YYYY', true);
  const isValidDate = parsedDate.isValid();

  if (!isValidDate) {
    return res.json({ error: true, message: 'Ngày không hợp lệ!' });
  }

  const adsPlace = await models.Place.findOne({ 
    attributes: ["id"],
    where: {diaChi: diaChiAds} 
  });

  let placeId = adsPlace.getDataValue("id");

  const adsOriginPlace = await models.Placedetail.findOne({ 
    attributes: ["id"],
    where: {placeId: placeId} 
  });

  let originId = adsOriginPlace.getDataValue("id");

  try {
    await models.Requesteditads.create({
      placeId: placeId,
      originId: originId,
      adName, 
      adSize, 
      adQuantity, 
      expireDay, 
      liDoChinhSua
    });
    res.redirect("/manageList");
  } catch (error) {
    res.send("Không thể gửi yêu cầu chỉnh sửa bảng QC");
    console.error(error);
}
}

module.exports=controller;