
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `songs_data` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `song_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`song_data`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


ALTER TABLE `songs_data`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `songs_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

