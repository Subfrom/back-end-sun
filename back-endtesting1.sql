-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2021 at 04:32 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.3.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `back-endtesting1`
--

-- --------------------------------------------------------

--
-- Table structure for table `menucoffee`
--

CREATE TABLE `menucoffee` (
  `id` bigint(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price_hot` int(3) NOT NULL,
  `price_iced` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `menucoffee`
--

INSERT INTO `menucoffee` (`id`, `name`, `price_hot`, `price_iced`) VALUES
(1, 'Americano', 50, 55),
(2, 'Latte', 60, 65);

-- --------------------------------------------------------

--
-- Table structure for table `ordermenucoffee`
--

CREATE TABLE `ordermenucoffee` (
  `id` bigint(20) NOT NULL,
  `ordername` varchar(50) NOT NULL,
  `ordernum` int(5) NOT NULL,
  `typecoffee` int(11) NOT NULL,
  `tolprice` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ordermenucoffee`
--

INSERT INTO `ordermenucoffee` (`id`, `ordername`, `ordernum`, `typecoffee`, `tolprice`, `created_at`) VALUES
(1, 'Latte', 1, 0, 0, '2021-05-01 17:55:32'),
(2, 'Latte', 1, 0, 0, '2021-05-01 17:55:32'),
(3, 'Americano', 5, 0, 0, '2021-05-01 17:55:32'),
(4, 'Americano', 1, 0, 50, '2021-05-01 17:55:32'),
(5, 'Americano', 1, 0, 50, '2021-05-01 17:55:32'),
(6, 'Americano', 1, 0, 55, '2021-05-01 17:55:32'),
(7, 'Americano', 2, 0, 110, '2021-05-02 13:13:05'),
(8, 'Americano', 2, 2, 110, '2021-05-02 13:16:29');

-- --------------------------------------------------------

--
-- Table structure for table `typecoffee`
--

CREATE TABLE `typecoffee` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `typecoffee`
--

INSERT INTO `typecoffee` (`id`, `name`) VALUES
(1, 'Hot'),
(2, 'Iced');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `menucoffee`
--
ALTER TABLE `menucoffee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ordermenucoffee`
--
ALTER TABLE `ordermenucoffee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `typecoffee`
--
ALTER TABLE `typecoffee`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `menucoffee`
--
ALTER TABLE `menucoffee`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ordermenucoffee`
--
ALTER TABLE `ordermenucoffee`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `typecoffee`
--
ALTER TABLE `typecoffee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
