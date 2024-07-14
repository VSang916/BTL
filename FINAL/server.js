const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

//Kết nối với MySQL
const dbConfig = {
  host: '127.0.0.1',
  user: 'root',  
  password: 'ahihi0709',
  database: 'satufood'  
};

//Sử dụng file public để láy dữ liệu
app.use(express.static('public')); 

//Xuất dữ liệu lấy đc dưới dạng JSON
app.get('/api/menu-products', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM san_pham');
    res.json(rows);
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm:', error);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

//
const PORT = 3000; 
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
