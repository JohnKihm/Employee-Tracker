const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool(
    {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: '127.0.0.1',
      database: process.env.DB_NAME
  },
  console.log('Connected to the courses_db database!')
  )
  
  pool.connect();