const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret_key = process.env.JWT_TOKEN;
const saltRounds = 10;
const userModel = require('../models/users');

const register = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // simpan password yang udah dikasih bumbu agar password terjaga
  // hashsycn agar password jadi random
  const hashPassword = bcrypt.hashSync(password, saltRounds);

  const user = {
    username,
    password: hashPassword,
  };

  userModel.push(user);

  res.status(200).send('success add data');
};

const login = (req, res) => {
  const username = req.body.username;
  // password ngga disertakan dalam token karena token hanya untuk validasi pengguna bukan untuk simpan informasi sensitif
  const password = req.body.password;
  // anggap mau login lagi setelah register,dan data itu udah tersimpan didatabase users
  // jadi ini buat tau dtaa user yang udah dibuat saat register itu udah ada di database belum
  const userInDB = userModel.find((user) => user.username == username);
  // kasih kondisi kalo ngga ketemu
  if (!userInDB) {
    return res.status(401).send('username not found');
  }

  // kondisi kalo datanya ada, baru generate tokennya
  if (bcrypt.compareSync(password, userInDB.password)) {
    const token = jwt.sign({ username: username }, secret_key);
    res.json({ token });
  } else {
    return res.status(401).send('wrong password');
  }
};

module.exports = {
  login,
  register,
};
