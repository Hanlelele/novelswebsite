const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const routeApi = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
  })
);


app.use('/api', routeApi);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
