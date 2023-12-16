const controller={};
const models = require("../models");

controller.deleteRequest=async(req,res)=>{
  let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
  try {
    await models.Request.destroy(
      {where: {id}}
    );
    res.send("Đã xoá yêu cầu!");
  } catch (error) {
    res.send("Không thể xoá yêu cầu!");
    console.error(error);
  }
}

controller.addRequest = async (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    res.send('Invalid request body');
    return;
  }

  const {
    congTy,
    diaChiCongTy,
    dienThoai,
    email,
    diaChi,
    khuVuc,
    loaiVT,
    longitude,
    latitude,
    tenBangQuangCao,
    loaiQC,
    kichThuoc,
    soLuong,
    ngayBatDau,
    ngayKetThuc
  } = req.body;

  if (!congTy) {
    res.send('Missing required property: congTy');
    return;
  }

  try {
    await models.Request.create({
      congTy,
      diaChiCongTy,
      dienThoai,
      email,
      diaChi,
      khuVuc,
      loaiVT,
      longitude,
      latitude,
      tenBangQuangCao,
      loaiQC,
      kichThuoc,
      soLuong,
      ngayBatDau,
      ngayKetThuc,
      tinhTrang: 'Chờ phê duyệt'
    });
    res.redirect('/requests');
  } catch (error) {
    res.send('Không thể thêm');
    console.error(error);
  }
};
controller.show= async (req,res)=>{
    res.locals.requests = await models.Request.findAll({
        attributes: [
            "id",
            "congTy",
            "diaChiCongTy",
            "dienThoai",
            "email",
            "diaChi",
            "khuVuc",
            "loaiVT",
            "longitude",
            "latitude",
            "tenBangQuangCao",
            "loaiQC",
            "kichThuoc",
            "soLuong",
            "ngayBatDau",
            "ngayKetThuc",
            "tinhTrang"
        ],
        order: [["congTy", "ASC"]],
        // where:{
        //   khuVuc:"Phường 4, Quận 5"
        // }
      });
    
      res.render("requests");
};

controller.editRequest = async (req, res) => {
  let {id,
    congTy,
    diaChiCongTy,
    dienThoai,
    email,
    diaChi,
    khuVuc,
    loaiVT,
    longitude,
    latitude,
    tenBangQuangCao,
    loaiQC,
    kichThuoc,
    soLuong,
    ngayBatDau,
    ngayKetThuc,
    tinhTrang} = req.body;
  
  try {
    await models.Request.update(
      { 
        congTy,
        diaChiCongTy,
        dienThoai,
        email,
        diaChi,
        khuVuc,
        loaiVT,
        longitude,
        latitude,
        tenBangQuangCao,
        loaiQC,
        kichThuoc,
        soLuong,
        ngayBatDau,
        ngayKetThuc,
        tinhTrang
      },
      {where: {id}}
    );
    res.send("Đã cập nhật yêu cầu!");
  } catch (error) {
    res.send("Không thể cập nhật yêu cầu!");
    console.error(error);
  }
}

module.exports=controller;

