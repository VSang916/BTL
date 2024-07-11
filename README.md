//Cài đặt express.js, node.js(tải trên web, cái này cài đặt đầu tiên), và mysql2 
mở terminal ở file tải về chạy :
npm install express mysql2
chạy lệnh trong mysql
CREATE TABLE san_pham (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2),
    image VARCHAR(255)
);
SELECT * FROM satufood.san_pham;
INSERT INTO san_pham (name, price, image)
VALUES
    ('Phở bò', 2.49, 'https://images.pexels.com/photos/2133989/pexels-photo-2133989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
    ('Bún chả', 1.99, 'https://images.pexels.com/photos/3858270/pexels-photo-3858270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
    ('Bún đậu mắm tôm', 2.49, 'https://images.pexels.com/photos/5116817/pexels-photo-5116817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
    ('Bánh mì', 1.99, 'https://images.pexels.com/photos/1483769/pexels-photo-1483769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
    ('Bún thang', 2.25, 'https://statics.vinwonders.com/bun-thang-ha-noi-1_1688031488.png'),
    ('Bún riêu cua', 2.49, 'https://tiki.vn/blog/wp-content/uploads/2023/07/thumb.jpeg'),
    ('Bánh cuốn', 1.49, 'https://sodulich.hanoi.gov.vn/storage/maxresdefault-1-1.jpg'),
    ('Bánh tôm ', 2.49, 'https://www.huongnghiepaau.com/wp-content/uploads/2019/10/banh-tom-ho-tay-hap-dan.jpg'),
    ('Cà phê sữa đá', 1.29, 'https://img.tastykitchen.vn/2021/04/12/cafe-sua-1280x1000-be0b.jpg'),
    ('Trà đào', 1.29, 'https://res.klook.com/image/upload/q_85/c_fill,w_750/v1596017380/blog/fdhbsx1x6tmyswssvb1v.jpg'),
    ('Nước mía', 0.99, 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/nuoc_mia_co_tac_dung_gi_doi_voi_suc_khoe_1_3faa508da1.jpg'),
    ('Nước cam', 1.49, 'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2022/2/19/cach-lam-nuoc-cam-ep-ngon-va-thom-ket-hop-voi-le-va-gung-5-1645248090817401855254.jpg'),
    ('Trà chanh', 0.99, 'https://daotaophachelamour.com/wp-content/uploads/2023/03/dung-cu-can-thiet-de-mo-quan-tra-chanh-1.jpg'),
    ('Nước dừa', 1.99, 'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2022/8/29/dua-1-16617633760061376694743.jpg'),
    ('Chè', 2.99, 'https://static-images.vnncdn.net/files/publish/cach-lam-che-thai-thom-ngon-don-gian-9d55d5b09189453f8ac253e1a36c88c6.jpg'),
    ('Cà phê muối', 0.50, 'https://1864-icdn.caching.ovh/w_1200,h_1200,c_1/https://file.hstatic.net/1000362089/article/ca_phe_muoi3_22abb29e3a42405d811fd27d65df2771_master.png');
//////trong file server.js sửa lại host, username ....
cuối cùng chạy node server.js rồi vào http://localhost:5500/
