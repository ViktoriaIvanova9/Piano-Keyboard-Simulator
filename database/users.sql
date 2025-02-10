SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `surname` varchar(25) NOT NULL,
  `username` varchar(25) NOT NULL,
  `user_password` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `username`, `user_password`, `email`) VALUES
(1, 'Viktoria', 'Ivanova', 'vivanova', '2ed098711a22e3fc93128a45111962', 'viki@abv.bg'),
(2, 'Nikolay', 'Georgiev', 'nik4o', 'ca5c900e7f3265be30de87c72cc09d', 'nikid@abv.bg'),
(3, 'Viki', 'Ivanova', 'vivanov1', '5819825d46159ca06b3c54b0a0651a', 'viki@gmail.com'),
(4, 'User', 'User', 'user', 'ee11cbb19052e40b07aac0ca060c23', 'user@abv.bg'),
(5, 'Mihi', 'Niki', 'mihi', '11feb83139c2b9c5b0d7b99c011ce5', 'mihi@abv.bg'),
(6, 'Viki', 'Ivanova', 'vikito', 'f7aeaa1cbb67e09b6966ccf8e5f5d5', 'vikiiv@abv.bg');


ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;
