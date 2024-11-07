-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 21, 2024 at 08:32 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `occupulse_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `studentId` varchar(8) NOT NULL,
  `sex` enum('male','female','other') DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `course` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('Employable','Less Employable') DEFAULT NULL,
  `statusUpdatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `fullName`, `studentId`, `sex`, `year`, `course`, `password`, `status`, `statusUpdatedAt`) VALUES
(1, 'Raven Cruz', '00000001', 'male', '4th year', 'Bachelor of Science in Computer Science', '$2b$10$GfH4mtXaUxnAiJvIeLFSoeeA8otU.gkjStPMHxOUFK1MxYRi4P0he', 'Less Employable', '2024-07-21 16:26:22'),
(2, 'Gab Ventura', '00000002', 'male', '4th year', 'Bachelor of Science in Computer Science', '$2b$10$OhGzPHWYp7UAJpJtOylM/ens5soW5zcFyXmhjGLM8XsFk4w1wcvpq', 'Less Employable', '2024-07-21 18:23:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id` (`studentId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
