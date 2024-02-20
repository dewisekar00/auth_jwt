const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // ambil header dari request
  // setiap hit request ke server cantumin di header token yang dikasih
  const token = req.headers.authorization;

  // ada ngga tokennya?kalo ngga ada masuk kesini
  if (!token) {
    return res.status(401).send('missing token');
  }

  // verify jwt tokennya yang didapat dari header , sama dari .env
  // diikuti sama parameter callback error,user dan kalo tokennya invalid lakuin ini
  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).send('forbiden: invalid token');
    }

    // kalo tokennya berhasil/ada informasi dari user akan disimpan di req.user
    req.user = user;
    // next jalan ketika semuanya berhasil cth:next jalanin getUserProfile
    next();
  });
};

module.exports = {
  verifyToken
};

// tujuannnya middleware ini = sebelum user menuju ke userProfile di cek dulu tokennya udah ada apa belum
