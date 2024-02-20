const express = require('express');

const app = express();

require('dotenv').config();
app.use(express.json());


const authRoutes = require('./routes/auth');

app.use(authRoutes);


const userRoutes = require('./routes/user');
app.use(userRoutes)




app.listen(process.env.PORT, () => {
  console.log('server running in port 8000');
});
