SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `songs` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `song_name` varchar(50) NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`content`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `songs` (`id`, `username`, `song_name`, `content`) VALUES
(1, 'user', 'VqturEchi', '[{\"note\":\"u\",\"delay\":0},{\"note\":\"u\",\"delay\":563},{\"note\":\"i\",\"delay\":569},{\"note\":\"o\",\"delay\":531},{\"note\":\"o\",\"delay\":570},{\"note\":\"i\",\"delay\":595},{\"note\":\"u\",\"delay\":579},{\"note\":\"y\",\"delay\":613},{\"note\":\"t\",\"delay\":543},{\"note\":\"t\",\"delay\":563},{\"note\":\"y\",\"delay\":580},{\"note\":\"u\",\"delay\":584},{\"note\":\"u\",\"delay\":637},{\"note\":\"y\",\"delay\":1037},{\"note\":\"y\",\"delay\":345},{\"note\":\"u\",\"delay\":1291},{\"note\":\"u\",\"delay\":562},{\"note\":\"i\",\"delay\":626},{\"note\":\"o\",\"delay\":600},{\"note\":\"o\",\"delay\":594},{\"note\":\"i\",\"delay\":615},{\"note\":\"u\",\"delay\":562},{\"note\":\"y\",\"delay\":569},{\"note\":\"t\",\"delay\":562},{\"note\":\"t\",\"delay\":583},{\"note\":\"y\",\"delay\":560},{\"note\":\"u\",\"delay\":634},{\"note\":\"y\",\"delay\":644},{\"note\":\"t\",\"delay\":994},{\"note\":\"t\",\"delay\":472}]'),
(2, 'vivanova', 'Zelenchuci', '[{\"note\":\"p\",\"delay\":7725},{\"note\":\"z\",\"delay\":667},{\"note\":\"p\",\"delay\":635},{\"note\":\"z\",\"delay\":726},{\"note\":\"x\",\"delay\":692},{\"note\":\"z\",\"delay\":400},{\"note\":\"[\",\"delay\":439},{\"note\":\"p\",\"delay\":389},{\"note\":\"o\",\"delay\":433},{\"note\":\"o\",\"delay\":1303},{\"note\":\"[\",\"delay\":662},{\"note\":\"o\",\"delay\":717},{\"note\":\"[\",\"delay\":727},{\"note\":\"z\",\"delay\":838},{\"note\":\"[\",\"delay\":402},{\"note\":\"p\",\"delay\":443},{\"note\":\"o\",\"delay\":436},{\"note\":\"i\",\"delay\":485}]'),
(3, 'user', 'HubavaSiMoqGoro', '[{\"note\":\"p\",\"delay\":0},{\"note\":\"p\",\"delay\":732},{\"note\":\"x\",\"delay\":729},{\"note\":\"z\",\"delay\":1095},{\"note\":\"x\",\"delay\":573},{\"note\":\"c\",\"delay\":653},{\"note\":\"x\",\"delay\":1305},{\"note\":\"c\",\"delay\":631},{\"note\":\"v\",\"delay\":664},{\"note\":\"c\",\"delay\":1254},{\"note\":\"x\",\"delay\":1396},{\"note\":\"c\",\"delay\":1421},{\"note\":\"x\",\"delay\":653},{\"note\":\"s\",\"delay\":564},{\"note\":\"x\",\"delay\":1253},{\"note\":\"c\",\"delay\":1124},{\"note\":\"v\",\"delay\":1247},{\"note\":\"c\",\"delay\":623},{\"note\":\"x\",\"delay\":679}]');


ALTER TABLE `songs`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `songs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

