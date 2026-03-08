-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2025 at 04:32 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clinic_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `studentId` varchar(20) DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `middleName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `course` varchar(100) DEFAULT NULL,
  `section` varchar(10) DEFAULT NULL,
  `conditionText` text DEFAULT NULL,
  `visits` int(11) DEFAULT NULL,
  `contact` varchar(20) DEFAULT NULL,
  `diagnosis` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `studentId`, `firstName`, `middleName`, `lastName`, `address`, `birthday`, `age`, `department`, `course`, `section`, `conditionText`, `visits`, `contact`, `diagnosis`) VALUES
(7, '69696969696', 'Ryan', '', 'Dumali', 'Mendez, Cavite', '2025-06-01', 21, 'School of Computer Studies', 'BS Computer Science', 'A', NULL, 1, '092828993123', 'headache'),
(9, '12345678', 'Marklouis', 'pogi', 'Rodelas', 'asgard', '2025-06-01', 21, 'School of Computer Studies', 'BS Computer Science', 'B', NULL, 5, '09933932994', 'sobrang pogi'),
(10, '696969696969', 'Janrell', '', 'Quiaroro', 'gentri cavite', '2025-06-16', 20, 'School of Computer Studies', 'BS Computer Science', 'A', NULL, 1, '09696969696', 'sobrang sarap'),
(11, '2024011182', 'jaybee', 'pogi', 'Sucal', 'somewhere else', '1814-01-31', 50, 'School of Hospitality and Tourism', 'BS Tourism', 'A', NULL, 7, '09123456671', 'Monkey pox'),
(12, '12345678', 'john', 'a', 'doe', 'somewhere else', '2025-05-30', 20, 'School of Hospitality and Tourism', 'BS Hospitality Management', 'A', NULL, 14, '091727733828', 'monkeypox');

-- --------------------------------------------------------

--
-- Table structure for table `supplies`
--

CREATE TABLE `supplies` (
  `id` int(11) NOT NULL,
  `itemName` varchar(255) DEFAULT NULL,
  `bName` varchar(255) DEFAULT NULL,
  `supplyCode` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `purchaseDate` date DEFAULT NULL,
  `expiration` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplies`
--

INSERT INTO `supplies` (`id`, `itemName`, `bName`, `supplyCode`, `type`, `purchaseDate`, `expiration`) VALUES
(2, 'syringe', 'unknown', '6969a', 'Pharmaceuticals', '2025-06-02', '2033-12-25'),
(3, 'bp monitor', 'Unknown', '12334', 'Medical Equipment', '0000-00-00', '0000-00-00'),
(4, 'syringe', 'unknown', '0987', 'Pharmaceuticals', '2025-06-02', '2029-03-02'),
(5, 'syringe', 'unknown', '102883', 'Consumables', '2025-06-03', '2025-06-19'),
(6, 'paracetamol', 'biogesic', '129213a', 'Pharmaceuticals', '2025-06-02', '2027-05-31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supplies`
--
ALTER TABLE `supplies`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `supplies`
--
ALTER TABLE `supplies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
