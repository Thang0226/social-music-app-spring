create database music;
#
# use music;


INSERT INTO role (id, name) VALUES
(1, 'ROLE_USER'),
(2, 'ROLE_ADMIN');


INSERT INTO user (username, password) VALUES
                                              ('user1', '$2a$12$9l9HjMirruHJlkY.nnWtVeuVJTB5/R32Hccc/Qw8JWHi9fTHdfy7K'),
                                              ('admin', '$2a$12$9l9HjMirruHJlkY.nnWtVeuVJTB5/R32Hccc/Qw8JWHi9fTHdfy7K'),
                                              ('moderator', '$2a$12$9l9HjMirruHJlkY.nnWtVeuVJTB5/R32Hccc/Qw8JWHi9fTHdfy7K');

INSERT INTO user (username, password) VALUES
                                              ('tungtran', '$2a$12$9l9HjMirruHJlkY.nnWtVeuVJTB5/R32Hccc/Qw8JWHi9fTHdfy7K'),
                                              ('chuyenle', '$2a$12$9l9HjMirruHJlkY.nnWtVeuVJTB5/R32Hccc/Qw8JWHi9fTHdfy7K'),
                                              ('hautruong', '$2a$12$9l9HjMirruHJlkY.nnWtVeuVJTB5/R32Hccc/Qw8JWHi9fTHdfy7K'),
                                              ('locnguyen', '$2a$12$9l9HjMirruHJlkY.nnWtVeuVJTB5/R32Hccc/Qw8JWHi9fTHdfy7K'),
                                              ('thangnguyen', '$2a$12$9l9HjMirruHJlkY.nnWtVeuVJTB5/R32Hccc/Qw8JWHi9fTHdfy7K'),
                                              ('triminh', '$2a$12$9l9HjMirruHJlkY.nnWtVeuVJTB5/R32Hccc/Qw8JWHi9fTHdfy7K'),
                                              ('dungle', '$2a$12$9l9HjMirruHJlkY.nnWtVeuVJTB5/R32Hccc/Qw8JWHi9fTHdfy7K');


INSERT INTO user_roles (user_id, roles_id) VALUES
                                               (1, 1), -- user1 có vai trò ROLE_USER
                                               (2, 2),
                                               (3, 1), -- user3 có vai trò ROLE_USER
                                               (4, 1), -- user4 có vai trò ROLE_USER
                                               (5, 2), -- user5 có vai trò ROLE_ADMIN
                                               (6, 1), -- user6 có vai trò ROLE_USER
                                               (7, 2);-- admin có vai trò ROLE_ADMIN



INSERT INTO user_info (full_name, email, phone_number, user_id) VALUES
                                                                    ('Trần Thanh Tùng', 'tranthanhtung@example.com', '0912345678', 1),
                                                                    ('Lê Văn Chuyên', 'levanchuyen@example.com', '0922345678', 2),
                                                                    ('Mai Trung Hậu', 'maitrunghau@example.com', '0932345678', 3),
                                                                    ('Nguyễn Xuân Lộc', 'nguyenxuanloc@example.com', '0942345678', 4),
                                                                    ('Nguyễn Đức Thắng', 'nguyenducthang@example.com', '0952345678', 5),
                                                                    ('Trần Minh Trí', 'tranminhtri@example.com', '0962345678', 6),
                                                                    ('Lê Tuấn Dũng', 'letuandung@example.com', '0972345678', 7);





insert into music.song (id, description, image_file, like_count, listening_count, music_file, name, upload_time, user_id)
values  (1, '人気曲 YOASOBI', '145f5b2441.jpg', 150, 212, 'yorunikakeru.mp3', '夜に駆ける (よるにかける)', '2025-01-01 10:00:00.000000', 1),
        (2, 'King Gnuの名曲', '1200x1200bf-60.jpg', 120, 4, 'hakujitsu.mp3', '白日 (はくじつ)', '2025-01-02 11:30:00.000000', 2),
        (3, '鬼滅の刃主題歌', 'aramajapan_album_08-e1492306061659.jpg', 200, 12, 'gurenge.mp3', '紅蓮華 (ぐれんげ)', '2025-01-03 15:45:00.000000', 3),
        (4, '星野源のヒット曲', '6922611b8e7a0e02fed3f9b8521b07be--pop-albums-j-pop.jpg', 180, 123, 'koi.mp3', '恋 (こい)', '2025-01-04 09:20:00.000000', 4),
        (5, 'Bài hát nổi tiếng của Sơn Tùng M-TP', 'photo.jpg', 321, 450, 'chayngaydi.mp3', 'Chạy Ngay Đi', '2025-01-05 08:00:00.000000', 1),
        (6, 'Nhạc chill của Đen Vâu', '1200x1200bf-60 (2).jpg', 240, 210, 'baonguoila.mp3', 'Bài Này Chill Phết', '2025-01-06 09:15:00.000000', 2),
        (7, 'Bài hit của Hoàng Thuỳ Linh', '1111.jpg', 290, 360, 'dee.mp3', 'Để Mị Nói Cho Mà Nghe', '2025-01-07 18:00:00.000000', 3),
        (8, 'Ca khúc lãng mạn của Vũ.', '1666436653156_640.jpg', 180, 150, 'dunglango.mp3', 'Đừng Lặng Im', '2025-01-08 11:45:00.000000', 4),
        (9, 'Nhạc hot từ Binz', 'ab67616d0000b273674b39e6964b8b27986d7fd5.jfif', 275, 380, 'saucung.mp3', 'Sao Cũng Được', '2025-01-09 14:30:00.000000', 5),
        (10, 'Bài hát gây bão của Jack', '49811652_2207669252779733_5476540454424018944_n.jpg', 360, 520, 'honnaytoilon.mp3', 'Hồng Nhan', '2025-01-10 10:10:00.000000', 1),
        (11, 'Nhạc trẻ đình đám từ Erik', 'gdd3vvp6qkbkc_600.jpg', 210, 315, 'emkhacgiotroi.mp3', 'Em Không Sai Chúng Ta Sai', '2025-01-11 16:40:00.000000', 2),
        (12, 'Hit của Bích Phương', 'ab67616d0000b273676bbbaf28663bb1bca4b788.jfif', 150, 200, 'matbao.mp3', 'Bao Giờ Lấy Chồng', '2025-01-12 09:00:00.000000', 3),
        (13, 'Lofi gây nghiện của Thịnh Suy', '1428082784672_640.jpg', 120, 175, 'morning.mp3', 'Một Đêm Say', '2025-01-13 20:00:00.000000', 4),
        (14, 'Bài tủ của Hương Giang Idol', '1200x1200bf-60 (3).jpg', 340, 490, 'annhathangia.mp3', 'Anh Đang Ở Đâu Đấy Anh', '2025-01-14 12:15:00.000000', 5),
        (15, 'Bản Ballad của Mỹ Tâm', '1694505883348_640.jpg', 420, 580, 'mattrang.mp3', 'Nơi Mình Dừng Chân', '2025-01-15 08:50:00.000000', 1),
        (16, 'Ca khúc nổi bật từ Ngô Kiến Huy', '1567570898448_640.jpg', 275, 330, 'muonguoila.mp3', 'Truyền Thái Y', '2025-01-16 15:35:00.000000', 2),
        (17, 'Nhạc EDM sôi động từ Hoaprox', '1525966985917_640.jpg', 195, 270, 'nguoilayo.mp3', 'Ngẫu Hứng', '2025-01-17 11:45:00.000000', 3),
        (18, 'Nhạc pop của Tóc Tiên', '1567668301108_640.jpg', 390, 450, 'nudoibat.mp3', 'Ngày Mai', '2025-01-18 19:10:00.000000', 4),
        (19, 'Nhạc indie của Chillies', '190295238735-cover-zoom.jpg', 310, 400, 'duongve.mp3', 'Vùng Ký Ức', '2025-01-19 10:20:00.000000', 5),
        (20, 'Ca khúc sâu lắng của Phan Mạnh Quỳnh', '1525966985917_640.jpg', 150, 190, 'nhungoi.mp3', 'Nước Ngoài', '2025-01-20 14:00:00.000000', 1),
        (21, 'Bản pop ballad đậm chất của Hòa Minzy', 'maxresdefault.jpg', 250, 340, 'khongthe.mp3', 'Không Thể Cùng Nhau Suốt Kiếp', '2025-01-21 16:50:00.000000', 2),
        (22, 'Nhạc hot của Min', 'ab67616d0000b273674b39e6964b8b27986d7fd5.jfif', 320, 375, 'ngoailanh.mp3', 'Có Em Chờ', '2025-01-22 13:45:00.000000', 3),
        (23, 'Nhạc trẻ sôi động từ Đức Phúc', 'ab67616d0000b2738c8d5eca24ca9d017ae33267.jfif', 270, 480, 'nguoinong.mp3', 'Hơn Cả Yêu', '2025-01-23 11:30:00.000000', 4),
        (24, 'Bản rap nhẹ nhàng từ Karik', 'Người_lạ_ơi.jpeg', 310, 520, 'quakho.mp3', 'Người Lạ Ơi', '2025-01-24 08:45:00.000000', 5),
        (25, 'Hit của Đông Nhi', '1670577102148_640.jpg', 295, 410, 'ongmat.mp3', 'Bad Boy', '2025-01-25 19:20:00.000000', 1);



insert into music.genre (id, name)
values  (1, 'J-Pop'),
        (2, '演歌'),
        (3, 'J-Rock'),
        (4, '歌謡曲'),
        (5, 'EDM'),
        (6, 'ヒップホップ');


INSERT INTO music.genre (id, name)
VALUES
    (7, 'Pop Ballad'),
    (8, 'Indie'),
    (9, 'Lofi'),
    (10, 'Rap'),
    (11, 'Nhạc Trẻ'),
    (12, 'EDM Việt'),
    (13, 'Bolero'),
    (14, 'Nhạc Chill'),
    (15, 'Hip-Hop Việt'),
    (16, 'Nhạc Phim');


INSERT INTO music.song_genre (song_id, genre_id)
VALUES
    (1, 1), -- Bài hát 1 thuộc thể loại J-Pop
    (2, 2), -- Bài hát 2 thuộc thể loại 演歌
    (3, 3), -- Bài hát 3 thuộc thể loại J-Rock
    (3, 4), -- Bài hát 3 cũng thuộc thể loại 歌謡曲
    (4, 5), -- Bài hát 4 thuộc thể loại EDM
    (5, 7), -- Bài hát 5 thuộc thể loại Pop Ballad
    (6, 8), -- Bài hát 6 thuộc thể loại Indie
    (7, 10), -- Bài hát 7 thuộc thể loại Rap
    (8, 9), -- Bài hát 8 thuộc thể loại Lofi
    (9, 11), -- Bài hát 9 thuộc thể loại Nhạc Trẻ
    (10, 12), -- Bài hát 10 thuộc thể loại EDM Việt
    (11, 13), -- Bài hát 11 thuộc thể loại Bolero
    (12, 14), -- Bài hát 12 thuộc thể loại Nhạc Chill
    (13, 15), -- Bài hát 13 thuộc thể loại Hip-Hop Việt
    (14, 16); -- Bài hát 14 thuộc thể loại Nhạc Phim



insert into music.singer (id, singer_name)
values  (1, 'YOASOBI'),
        (2, 'King Gnu'),
        (3, '鬼滅'),
        (4, '星野源');

-- Chèn thêm các ca sĩ Việt Nam và quốc tế dựa trên bảng song
INSERT INTO music.singer (id, singer_name)
VALUES
    (5, 'Sơn Tùng M-TP'),
    (6, 'Đen Vâu'),
    (7, 'Hoàng Thùy Linh'),
    (8, 'Hòa Minzy'),
    (9, 'Mỹ Tâm'),
    (10, 'Erik'),
    (11, 'JustaTee'),
    (12, 'Min'),
    (13, 'Jack'),
    (14, 'Vũ.'),
    (15, 'Noo Phước Thịnh'),
    (16, 'Phan Mạnh Quỳnh'),
    (17, 'Bích Phương'),
    (18, 'Chi Pu'),
    (19, 'Karik'),
    (20, 'Binz'),
    (21, 'Hương Tràm'),
    (22, 'Ngô Kiến Huy'),
    (23, 'Khắc Việt'),
    (24, 'Trúc Nhân');


INSERT INTO music.song_singer (song_id, singer_id)
VALUES
    (1, 1),  -- YOASOBI - 夜に駆ける
    (2, 2),  -- King Gnu - 白日
    (3, 3),  -- 鬼滅 - 紅蓮華
    (4, 4);  -- 星野源 - 恋


-- Liên kết bài hát với ca sĩ trong bảng song_singer
INSERT INTO music.song_singer (song_id, singer_id)
VALUES
    (5, 5),  -- Sơn Tùng M-TP - Chạy Ngay Đi
    (6, 6),  -- Đen Vâu - Bài Này Chill Phết
    (7, 7),  -- Hoàng Thùy Linh - Để Mị Nói Cho Mà Nghe
    (8, 14), -- Vũ. - Đừng Lặng Im
    (9, 20), -- Binz - Sao Cũng Được
    (10, 13), -- Jack - Hồng Nhan
    (11, 10), -- Erik - Em Không Sai Chúng Ta Sai
    (12, 17), -- Bích Phương - Bao Giờ Lấy Chồng
    (13, 14), -- Vũ. - Một Đêm Say
    (14, 21), -- Hương Giang Idol - Anh Đang Ở Đâu Đấy Anh
    (15, 9),  -- Mỹ Tâm - Nơi Mình Dừng Chân
    (16, 22), -- Ngô Kiến Huy - Truyền Thái Y
    (17, 20), -- Hoaprox - Ngẫu Hứng
    (18, 7),  -- Tóc Tiên - Ngày Mai
    (19, 11), -- Chillies - Vùng Ký Ức
    (20, 16), -- Phan Mạnh Quỳnh - Nước Ngoài
    (21, 8),  -- Hòa Minzy - Không Thể Cùng Nhau Suốt Kiếp
    (22, 12), -- Min - Có Em Chờ
    (23, 10), -- Đức Phúc - Hơn Cả Yêu
    (24, 19), -- Karik - Người Lạ Ơi
    (25, 15); -- Đông Nhi - Bad Boy


insert into music.playlist (id, create_time, like_count, name, user_id, listening_count)
values  (1, '2025-01-05 08:00:00.000000', 233, '人気曲セレクション', null, 21),
        (2, '2025-01-06 12:00:00.000000', 210, 'ソン・プレイリスト', null, 1212),
        (3, '2025-01-07 14:30:00.000000', 185, 'リラックス・ソングス', null, 122);


INSERT INTO music.playlist (id, create_time, like_count, name, user_id, listening_count)
VALUES
    (4, '2025-01-10 10:00:00.000000', 300, 'Nhạc Việt Mới', 1, 450),
    (5, '2025-01-11 11:00:00.000000', 180, 'Nhạc Chill Việt', 2, 350),
    (6, '2025-01-12 09:00:00.000000', 220, 'Nhạc Pop Việt', 3, 400),
    (7, '2025-01-13 20:00:00.000000', 260, 'Bài Hát Hot', 4, 500),
    (8, '2025-01-14 12:15:00.000000', 210, 'Nhạc Dance Việt', 5, 380);


INSERT INTO music.playlist_song (playlist_id, song_id)
VALUES
    -- Playlist "人気曲セレクション" (Những bài hát nổi tiếng)
    (1, 1),  -- YOASOBI - Yoru ni Kakeru
    (1, 2),  -- King Gnu - Hakujitsu
    (1, 3),  -- 鬼滅 - 紅蓮華
    (1, 4),  -- 星野源 - 恋

    -- Playlist "ソン・プレイリスト" (Playlist nhạc Sơn)
    (2, 5),  -- Sơn Tùng M-TP - Chạy Ngay Đi
    (2, 6),  -- Đen Vâu - Bài Này Chill Phết
    (2, 7),  -- Hoàng Thuỳ Linh - Để Mị Nói Cho Mà Nghe
    (2, 8),  -- Vũ. - Đừng Lặng Im

    -- Playlist "リラックス・ソングス" (Playlist nhạc thư giãn)
    (3, 6),  -- Đen Vâu - Bài Này Chill Phết
    (3, 9),  -- Binz - Sao Cũng Được
    (3, 13), -- Thịnh Suy - Một Đêm Say
    (3, 20), -- Phan Mạnh Quỳnh - Nước Ngoài

    -- Playlist "Nhạc Việt Mới" (Nhạc Việt Mới)
    (4, 5),  -- Sơn Tùng M-TP - Chạy Ngay Đi
    (4, 10), -- Jack - Hồng Nhan
    (4, 11), -- Erik - Em Không Sai Chúng Ta Sai
    (4, 12), -- Bích Phương - Bao Giờ Lấy Chồng

    -- Playlist "Nhạc Chill Việt" (Nhạc Chill Việt)
    (5, 6),  -- Đen Vâu - Bài Này Chill Phết
    (5, 13), -- Thịnh Suy - Một Đêm Say
    (5, 19), -- Chillies - Vùng Ký Ức
    (5, 20), -- Phan Mạnh Quỳnh - Nước Ngoài

    -- Playlist "Nhạc Pop Việt" (Nhạc Pop Việt)
    (6, 7),  -- Hoàng Thuỳ Linh - Để Mị Nói Cho Mà Nghe
    (6, 8),  -- Vũ. - Đừng Lặng Im
    (6, 9),  -- Binz - Sao Cũng Được
    (6, 22), -- Min - Có Em Chờ

    -- Playlist "Bài Hát Hot" (Bài Hát Hot)
    (7, 10), -- Jack - Hồng Nhan
    (7, 14), -- Hương Giang Idol - Anh Đang Ở Đâu Đấy Anh
    (7, 15), -- Mỹ Tâm - Nơi Mình Dừng Chân
    (7, 16), -- Ngô Kiến Huy - Truyền Thái Y

    -- Playlist "Nhạc Dance Việt" (Nhạc Dance Việt)
    (8, 17), -- Hoaprox - Ngẫu Hứng
    (8, 18), -- Tóc Tiên - Ngày Mai
    (8, 19), -- Chillies - Vùng Ký Ức
    (8, 23); -- Đức Phúc - Hơn Cả Yêu

insert into music.comment (comment_time, content, playlist_id, song_id, user_id, singer_id)
values
    ('2025-01-09 15:46:22.000000', 'Bài hát này tuyệt vời!', 4, 5, 1, 2),
    ('2025-01-10 16:00:00.000000', 'Nhạc chill cực hay, rất thích!', 5, 6, 2, 3),
    ('2025-01-11 17:20:30.000000', 'Giọng hát của Hoàng Thuỳ Linh thật ấn tượng!', 6, 7, 3, 4),
    ('2025-01-12 18:45:10.000000', 'Ca khúc này nghe thật nhẹ nhàng và dễ chịu.', 7, 8, 4, 5),
    ('2025-01-13 19:30:00.000000', 'Binz luôn biết cách tạo ra những bài hát cuốn hút!', 8, 9, 5, 1),
    ('2025-01-14 10:10:00.000000', 'Hồng Nhan của Jack thực sự là một bản hit!', 4, 10, 6, 2),
    ('2025-01-15 14:00:00.000000', 'Em Không Sai Chúng Ta Sai là một bài hát cảm động!', 5, 11, 7, 3),
    ('2025-01-16 13:50:00.000000', 'Bao Giờ Lấy Chồng của Bích Phương rất hay!', 6, 12, 8, 4),
    ('2025-01-17 16:30:00.000000', 'Một Đêm Say là bài hát rất chill, thích hợp nghe lúc thư giãn.', 7, 13, 9, 5),
    ('2025-01-18 17:25:00.000000', 'Anh Đang Ở Đâu Đấy Anh của Hương Giang Idol thật cảm động!', 8, 14, 1, 2),
    ('2025-01-19 14:35:00.000000', 'Nơi Mình Dừng Chân của Mỹ Tâm là một bản ballad tuyệt vời!', 4, 15, 2, 3),
    ('2025-01-20 11:40:00.000000', 'Truyền Thái Y của Ngô Kiến Huy là bài hát vui tươi và dễ nghe!', 5, 16, 3, 4),
    ('2025-01-21 18:00:00.000000', 'Ngẫu Hứng của Hoaprox rất sôi động, thích hợp để tập thể dục!', 6, 17, 4, 5),
    ('2025-01-22 12:30:00.000000', 'Ngày Mai của Tóc Tiên có giai điệu rất bắt tai!', 7, 18, 5, 1),
    ('2025-01-23 09:55:00.000000', 'Vùng Ký Ức của Chillies thực sự gây ấn tượng với tôi!', 8, 19, 6, 2),
    ('2025-01-24 14:50:00.000000', 'Nước Ngoài của Phan Mạnh Quỳnh khiến tôi cảm thấy rất sâu lắng.', 4, 20, 7, 3),
    ('2025-01-25 16:40:00.000000', 'Không Thể Cùng Nhau Suốt Kiếp của Hòa Minzy là một bài hát quá tuyệt vời!', 5, 21, 8, 4),
    ('2025-01-26 13:15:00.000000', 'Có Em Chờ của Min thật sự lôi cuốn tôi ngay từ lần nghe đầu tiên!', 6, 22, 9, 5),
    ('2025-01-27 10:25:00.000000', 'Hơn Cả Yêu của Đức Phúc là một bài hát rất tình cảm!', 7, 23, 1, 2),
    ('2025-01-28 15:35:00.000000', 'Người Lạ Ơi của Karik rất ấn tượng, tôi nghe đi nghe lại suốt!', 8, 24, 2, 3),
    ('2025-01-29 14:45:00.000000', 'Bad Boy của Đông Nhi là một bài hát rất mạnh mẽ và đầy năng lượng!', 4, 25, 3, 4);
