const userModel = require("../schemas/users");
const { passwordHashing, passwordCompare } = require("../configs/hash");
const { createJWT } = require("../configs/jsonwebtoken");
const { response } = require("express");
const dayjs = require("dayjs");

const register = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;

    if (role != undefined) {
      return res.status(400).json({ message: "เกิดข้อผิดพลาด" });
    }

    // ตรวจสอบว่ามี username ซ้ำกันหรือไม่
    const existsUsername = await userModel.findOne({ username: username });
    if (existsUsername) {
      return res.status(400).json({ message: "ชื่อผู้ใช้งานนี้มีผู้ใช้งานแล้ว" });
    }

    // ตรวจสอบว่ามี email ซ้ำกันหรือไม่
    const existsEmail = await userModel.findOne({ email: email });
    if (existsEmail) {
      return res.status(400).json({ message: "มีผู้ใช้งานอยู่ในระบบ" });
    }

    const passwordHash = await passwordHashing(password);
    req.body.password = passwordHash;
    req.body._id = dayjs().unix();

    const user = await userModel.create(req.body);
    return res.status(201).json({ message: "สร้างรหัสผ่านสำเร็จ", user: user });
  } catch (err) {
    return res.status(400).json(err);
  }
};


const login = async (req, res) => {
  const { username, password } = req.body; //username,password

  const existUser = await userModel.findOne({ username: username });

  if (!existUser) {
    return res.status(404).json({ message: "ไม่พบผู้ใช้งาน" });
  }

  const correctPassword = await passwordCompare(password, existUser.password);

  if (!correctPassword) {
    return res.status(401).json({ message: "อีเมล์หรือรหัสผ่านไม่ถูกต้อง" });
  }

  const accessPayload = {
    principal: existUser._id, //64654sadawd213sad+-
    role: existUser.role, //2001
    kind: "access",
  };

  const accessToken = createJWT(accessPayload);

  return res
    .status(200)
    .json({ message: "เข้าสู่ระบบสำเร็จ", accessToken: accessToken });
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params; // รับ userId ที่จะแก้ไขข้อมูล
    const updates = req.body; // รับข้อมูลที่ต้องการแก้ไข

    // ค้นหาผู้ใช้งานที่ต้องการแก้ไข
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "ไม่พบผู้ใช้งาน" });
    }

    // อัพเดทข้อมูล
    Object.keys(updates).forEach((key) => {
      user[key] = updates[key];
    });

    // บันทึกการเปลี่ยนแปลง
    const updatedUser = await user.save();

    return res.status(200).json({ message: "อัพเดทข้อมูลสำเร็จ", user: updatedUser });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.status(200).json({ users: users });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deleteUsers = async (req, res) => {
  try {
    const { userId } = req.params; // รับ userId ที่ต้องการลบข้อมูล

    // ค้นหาและลบผู้ใช้งานโดยใช้ _id
    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "ไม่พบผู้ใช้งานที่ต้องการลบ" });
    }

    return res.status(200).json({ message: "ลบผู้ใช้งานเรียบร้อยแล้ว", user: deletedUser });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const searchUser = async (req, res) => {
  try {
    const { query } = req.query; // รับคำค้นหาจาก query string

    // ค้นหาผู้ใช้โดยใช้เงื่อนไขที่ตรงกับ query string
    const users = await userModel.find({
      $or: [
        { username: { $regex: query, $options: "i" } }, // ค้นหา username ที่ตรงกับ query
        { firstname: { $regex: query, $options: "i" } }, // ค้นหาชื่อจริงที่ตรงกับ query
        { lastname: { $regex: query, $options: "i" } }, // ค้นหานามสกุลที่ตรงกับ query
        { email: { $regex: query, $options: "i" } } // ค้นหาอีเมล์ที่ตรงกับ query
      ]
    });

    return res.status(200).json({ users: users });
  } catch (err) {
    return res.status(400).json(err);
  }
};


  
  module.exports = {
    login,
    register,
    updateUser,
    getAllUsers,
    deleteUsers,
    searchUser,
  };
  