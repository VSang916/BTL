const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

// Cấu hình kết nối MySQL
const dbConfig = {
  host: '127.0.0.1',  // Host (localhost)
  user: 'root',        // Username
  password: 'ahihi0709', // Password
  database: 'satufood'  // Database
};

app.use(express.static('public')); // Phục vụ các file tĩnh (HTML, CSS, JS)

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

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // Gửi tệp index.html
});

const PORT = process.env.PORT || 5500; // Sử dụng cổng 3000
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
