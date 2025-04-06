const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const secret ='kri123';  // secret string used to generate jwt token

//define mongoose schema
