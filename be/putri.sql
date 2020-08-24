-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: adidasfinalproject
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `isdeleted` int NOT NULL DEFAULT '0',
  `createat` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateat` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'pria',0,'2020-06-22 17:58:30','2020-06-22 17:58:30',NULL),(2,'wanita',0,'2020-06-22 17:58:30','2020-06-22 17:58:30',NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discounts`
--

DROP TABLE IF EXISTS `discounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discounts` (
  `discount_id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  `start_date` datetime NOT NULL,
  `expired_date` datetime NOT NULL,
  `createat` datetime NOT NULL,
  `isdeleted` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`discount_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discounts`
--

LOCK TABLES `discounts` WRITE;
/*!40000 ALTER TABLE `discounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `discounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flashsaledetails`
--

DROP TABLE IF EXISTS `flashsaledetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flashsaledetails` (
  `flashsaledetails_id` int NOT NULL AUTO_INCREMENT,
  `discount_id` int NOT NULL,
  `productid` int NOT NULL,
  `discount_price` int NOT NULL,
  `isdeleted` int NOT NULL DEFAULT '0',
  `createat` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateat` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`flashsaledetails_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flashsaledetails`
--

LOCK TABLES `flashsaledetails` WRITE;
/*!40000 ALTER TABLE `flashsaledetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `flashsaledetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `image` varchar(450) DEFAULT NULL,
  `stock` int NOT NULL,
  `categoryId` int NOT NULL,
  `price` int NOT NULL,
  `description` mediumtext NOT NULL,
  `isdeleted` int NOT NULL DEFAULT '0',
  `createat` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateat` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `purchased` int DEFAULT '0',
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_categoryid_idx` (`categoryId`),
  CONSTRAINT `pk_product_category` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Fit Bounce Trainers (EE4619)','/product/PROD1598255409955.jpg',5,2,1200000,'Wanita Training - Multicolor/White/Black',0,'2020-06-22 19:16:01','2020-06-22 19:16:01',0,'Training Shoes'),(2,'Sepatu Ultraboost X (AC7548)','/product/PROD1598255566492.jpg',8,2,3300000,'Wanita Training - White/Black/White',0,'2020-06-22 19:16:01','2020-06-22 19:16:01',0,'Training Shoes'),(3,'Fit Bounce Trainers (EE4614)','/product/PROD1598255585315.jpg',5,2,1200000,'Wanita Training - Black/White/Black',0,'2020-06-22 19:16:01','2020-06-22 19:16:01',0,'Training Shoes'),(4,'Fit Bounce Trainers (EE4616)','/product/PROD1598255601349.jpg',7,2,1200000,'Wanita Training - Multicolor/White/Multicolor',0,'2020-06-22 19:16:01','2020-06-22 19:16:01',0,'Training Shoes'),(5,'Sepatu Ultraboost T (F35837)','/product/PROD1598255615871.jpg',7,2,1650000,'Wanita Training - Black/Black/Multicolor',0,'2020-06-22 19:16:01','2020-06-22 19:16:01',0,'Training Shoes'),(6,'Sepatu Ultraboost X 3D (BC0314)','/product/PROD1598255644314.jpg',10,2,1650000,'Wanita Training - Black/White/Red',0,'2020-06-22 19:16:01','2020-06-22 19:16:01',0,'Training Shoes'),(7,'FitBoost Trainers (EE4581)','/product/PROD1598255667199.jpg',15,1,2000000,'Pria Training - Black/White/Multicolor',0,'2020-06-22 19:16:01','2020-06-22 19:16:01',0,'Training Shoes'),(8,'FitBoost Trainers (EE4582)','/product/PROD1598255724493.jpg',12,1,2000000,'Pria Training - Multicolor/Multicolor/Multicolor',0,'2020-06-22 19:16:01','2020-06-22 19:16:01',0,'Training Shoes'),(9,'FitBounce Trainers (EE4599)','/product/PROD1598255737591.jpg',8,1,1200000,'Pria Training - Black/White/Black',0,'2020-06-22 19:16:01','2020-06-22 19:16:01',0,'Training Shoes'),(10,'FitBounce Trainers (EE4601)','/product/PROD1598255754413.jpg',6,1,1200000,'Pria Training - Multicolor/Silver/Multicolor',0,'2020-06-22 19:16:01','2020-06-22 19:16:01',0,'Training Shoes'),(11,'Ultraboost 20 Shoes (EG0756)','/product/PROD1598256077100.jpg',12,1,3000000,'Pria Running - Black/White/Multicolor',0,'2020-06-22 19:47:41','2020-06-22 19:47:41',0,'Running Shoes'),(12,'Sensebounce + Street Shoes (EG1032)','/product/PROD1598256092462.jpg',20,1,1400000,'Pria Running - Multicolor/Black/Multicolor',0,'2020-06-22 19:47:41','2020-06-22 19:47:41',0,'Running Shoes'),(13,'Supernova Shoes (FV6026)','/product/PROD1598256111729.jpg',18,1,1700000,'Pria Running - White/Multicolor/Black',0,'2020-06-22 19:47:41','2020-06-22 19:47:41',0,'Running Shoes'),(14,'Adizero RC 2.0 Shoes (EH3135)','/product/PROD1598256126687.jpg',17,1,1800000,'Pria Running - Multicolor/White/Red',0,'2020-06-22 19:47:41','2020-06-22 19:47:41',0,'Running Shoes'),(15,'SL20 SUMMER.RDY Shoes (FU6621)','/product/PROD1598256139260.jpg',13,1,1800000,'Pria Running - Multicolor/White/Red',0,'2020-06-22 19:47:41','2020-06-22 19:47:41',0,'Running Shoes'),(16,'Galaxar Run Shoes (FV4734)','/product/PROD1598256153791.jpg',14,2,1400000,'Wanita Running - White/White/Multicolor',0,'2020-06-22 19:47:41','2020-06-22 19:47:41',0,'Running Shoes'),(17,'FOCUSBREATHEIN Shoes (FV7148)','/product/PROD1598256171606.jpg',3,2,1600000,'Wanita Running - Black/Silver/White',0,'2020-06-22 19:47:41','2020-06-22 19:47:41',0,'Running Shoes'),(18,'Edge Lux 4 Shoes (FW9262)','/product/PROD1598256184262.jpg',5,2,1400000,'Wanita Running - Black/Silver/White',0,'2020-06-22 19:47:41','2020-06-22 19:47:41',0,'Running Shoes'),(19,'Sensebounce + Street Shoes (EG1036)','/product/PROD1598256202179.jpg',8,2,1400000,'Wanita Running - Multicolor/White/Multicolor',0,'2020-06-22 19:47:41','2020-06-22 19:47:41',0,'Running Shoes'),(20,'Supernova Shoes (FV6020)','/product/PROD1598256213674.jpg',11,2,1700000,'Wanita Running - White/Multicolor/Multicolor',0,'2020-06-22 19:47:41','2020-06-22 19:47:41',0,'Running Shoes'),(21,'Nite Jogger Shoes (FV1277)','/product/PROD1598256226273.jpg',20,1,2300000,'Pria Originals - Black/Black/Black',0,'2020-06-22 20:00:17','2020-06-22 20:00:17',0,'Originals Shoes'),(22,'NMD_R1 Shoes (FV1734)','/product/PROD1598256265181.jpg',5,1,2200000,'Pria Originals - Blue/Red/White',0,'2020-06-22 20:00:17','2020-06-22 20:00:17',0,'Originals Shoes'),(23,'OZWEEGO Shoes (FV9654)','/product/PROD1598256277827.jpg',8,1,1800000,'Pria Originals - White/White/Black',0,'2020-06-22 20:00:17','2020-06-22 20:00:17',0,'Originals Shoes'),(24,'SL 7600 Shoes (FV9797)','/product/PROD1598256289910.jpg',15,1,2500000,'Pria Originals - Multicolor/Black/White',0,'2020-06-22 20:00:17','2020-06-22 20:00:17',0,'Originals Shoes'),(25,'Superstar Shoes (FY2824)','/product/PROD1598256303631.jpg',17,1,1600000,'Pria Originals - White/White/Black',0,'2020-06-22 20:00:17','2020-06-22 20:00:17',0,'Originals Shoes'),(26,'adidas Sleek Lo Shoes (FV0743)','/product/PROD1598259956677.jpg',3,2,950000,'Wanita Originals - Black/White/White',0,'2020-06-22 20:00:17','2020-06-22 20:00:17',0,'Originals Shoes'),(27,'NMD_R1 Shoes (FV8730)','/product/PROD1598259966573.jpg',23,2,2200000,'Wanita Originals - White/White/Pink',0,'2020-06-22 20:00:17','2020-06-22 20:00:17',0,'Originals Shoes'),(28,'Supercourt Shoes (FV9716)','/product/PROD1598259981422.jpg',8,2,1600000,'Wanita Originals - White/White/Grey',0,'2020-06-22 20:00:17','2020-06-22 20:00:17',0,'Originals Shoes'),(29,'Falcon Shoes (FW2486)','/product/PROD1598259990217.jpg',10,2,1700000,'Wanita Originals - Purple/Purple/Pink',0,'2020-06-22 20:00:17','2020-06-22 20:00:17',0,'Originals Shoes'),(30,'SL Andridge Shoes (FU7212)','/product/PROD1598259997120.jpg',11,2,1800000,'Wanita Originals - White/White/White',0,'2020-06-22 20:00:17','2020-06-22 20:00:17',0,'Originals Shoes'),(31,'GameCourt multicourt tennis shoes (FU8110)','/product/PROD1598260005008.jpg',10,1,850000,'Pria Tennis - Blue/White/Blue',0,'2020-06-22 20:13:55','2020-06-22 20:13:55',0,'Tennis Shoes'),(32,'GameCourt multicourt tennis shoes (FU8111)','/product/PROD1598260009847.jpg',8,1,850000,'Pria Tennis - White/Black/Multicolor',0,'2020-06-22 20:13:55','2020-06-22 20:13:55',0,'Tennis Shoes'),(33,'CourtJam Bounce Shoes (EG1136)','/product/PROD1598260019153.jpg',12,1,1300000,'Pria Tennis - Black/White/Silver',0,'2020-06-22 20:13:55','2020-06-22 20:13:55',0,'Tennis Shoes'),(34,'GameCourt Shoes (FU8130)','/product/PROD1598260034713.jpg',10,2,850000,'Wanita Tennis - White/Silver/Multicolor',0,'2020-06-22 20:13:55','2020-06-22 20:13:55',0,'Tennis Shoes'),(35,'CourtJam Bounce Shoes (FU8147)','/product/PROD1598260046945.jpg',5,2,1300000,'Wanita Tennis - White/Beige/Black',0,'2020-06-22 20:13:55','2020-06-22 20:13:55',0,'Tennis Shoes'),(36,'SoleCourt Parley Shoes (EG7694)','/product/PROD1598260061599.jpg',15,2,2500000,'Wanita Tennis - Multicolor/White/Multicolor',0,'2020-06-22 20:13:55','2020-06-22 20:13:55',0,'Tennis Shoes'),(37,'CourtJam Bounce Shoes (EF2765)','/product/PROD1598260072639.jpg',18,2,1300000,'Wanita Tennis - White/Black/Silver',0,'2020-06-22 20:13:55','2020-06-22 20:13:55',0,'Tennis Shoes'),(38,'CourtJam Bounce Shoes (EG1139)','/product/PROD1598260083195.jpg',25,2,1300000,'Wanita Tennis - Black/White/Silver',0,'2020-06-22 20:13:55','2020-06-22 20:13:55',0,'Tennis Shoes'),(39,'Court 80s Shoes (EE9664)','/product/PROD1598260093656.jpg',14,1,1100000,'Pria Neo - Black/White/Multicolor',0,'2020-06-22 20:21:28','2020-06-22 20:21:28',0,'Sports Shoes'),(40,'Sepatu Grand Court (F36392)','/product/PROD1598260104239.jpg',10,1,1100000,'Pria Neo - White/Black/White',0,'2020-06-22 20:21:28','2020-06-22 20:21:28',0,'Sports Shoes'),(41,'Sepatu Archivo (EF0523)','/product/PROD1598260114248.jpg',8,1,800000,'Pria Neo - White/White/Multicolor',0,'2020-06-22 20:21:28','2020-06-22 20:21:28',0,'Sports Shoes'),(42,'Sepatu Advantage (F36431)','/product/PROD1598260124340.jpg',6,1,800000,'Pria Neo - Black/Black/Multicolor',0,'2020-06-22 20:21:28','2020-06-22 20:21:28',0,'Sports Shoes'),(43,'Sepatu Cloudfoam Racer TR (DA9305)','/product/PROD1598260134232.jpg',30,1,1000000,'Pria Neo - White/Black/White',0,'2020-06-22 20:21:28','2020-06-22 20:21:28',0,'Sports Shoes'),(44,'Sepatu Archivo (EF0527)','/product/PROD1598260144966.jpg',15,2,800000,'Wanita Neo - Multicolor/Multicolor/Silver',0,'2020-06-22 20:56:16','2020-06-22 20:56:16',0,'Sports Shoes'),(45,'Sepatu Ultimafusion (F34593)','/product/PROD1598260154196.jpg',20,2,880000,'Wanita Neo - Black/Black/Multicolor',0,'2020-06-22 20:56:16','2020-06-22 20:56:16',0,'Sports Shoes'),(46,'Sepatu Cloudfoam Racer TR (CG5764)','/product/PROD1598260169725.jpg',23,2,1100000,'Wanita Neo - Black/Black/Multicolor',0,'2020-06-22 20:56:16','2020-06-22 20:56:16',0,'Sports Shoes'),(47,'Sepatu Run 70s (F34340)','/product/PROD1598260182004.jpg',25,2,110000,'Wanita Neo - Multicolor/Blue/Multicolor',0,'2020-06-22 20:56:16','2020-06-22 20:56:16',0,'Sports Shoes'),(48,'Sepatu Questar (F36512)','/product/PROD1598260192522.jpg',28,2,1100000,'Wanita Neo - White/White/Multicolor',0,'2020-06-22 20:56:16','2020-06-22 20:56:16',0,'Sports Shoes'),(49,'Sepatu Run 60s (EE9737)','/product/PROD1598260202573.jpg',30,2,750000,'Wanita Neo - Black/White/Multicolor',0,'2020-06-22 20:56:16','2020-06-22 20:56:16',0,'Sports Shoes'),(50,'X 19.1 Firm Ground Boots (EG7125)','/product/PROD1598260211599.jpg',10,1,3000000,'Pria Soccer - White/Black/Multicolor',0,'2020-06-22 20:56:16','2020-06-22 20:56:16',0,'Soccer Shoes'),(51,'Nemeziz 19.1 Firm Ground Boots (EG7325)','/product/PROD1598260221868.jpg',12,1,3000000,'Pria Soccer - White/Black/Multicolor',0,'2020-06-22 20:56:16','2020-06-22 20:56:16',0,'Soccer Shoes'),(52,'Top Sala Boots (FV2551)','/product/PROD1598260308909.jpg',15,1,1000000,'Pria Soccer - Multicolor/White/Blue',0,'2020-06-22 20:56:16','2020-06-22 20:56:16',0,'Soccer Shoes'),(53,'X 19.4 Indoor Boots (EF1620)','/product/PROD1598260744468.jpg',20,1,800000,'Pria Soccer - White/Black/Multicolor',0,'2020-06-22 20:56:16','2020-06-22 20:56:16',0,'Soccer Shoes'),(54,'Predator 20.3 Firm Ground Boots (EF1639)','/product/PROD1598260937853.jpg',18,1,1200000,'Pria Soccer -White/Black/Red',0,'2020-06-22 20:56:16','2020-06-22 20:56:16',0,'Soccer Shoes'),(55,'Predator 20.3 Indoor Boots (EF1653)',NULL,25,1,1300000,'Pria Soccer - White/Black/Red',1,'2020-06-22 20:56:16','2020-06-22 20:56:16',0,'Soccer Shoes'),(56,'X 19.4 Flexible Ground Boots (EF1699)',NULL,19,1,800000,'Pria Soccer - White/Black/Multicolor',1,'2020-06-22 20:56:16','2020-06-22 20:56:16',0,'Soccer Shoes'),(57,'Pro Next 2019 Shoes (EF9844)',NULL,15,1,1200000,'Pria Basket - Black/Multicolor/Multicolor',1,'2020-06-22 20:56:16','2020-06-22 20:56:16',0,'Basket Shoes'),(58,'Pro Model 2G Shoes (FW8449)',NULL,22,1,1600000,'Pria Basket - Black/White/Multicolor',1,'2020-06-22 20:56:16','2020-06-22 20:56:16',0,'Basket Shoes'),(59,'Harden Stepback Shoes (FW8486)',NULL,15,1,1400000,'Pria Basket - Black/Multicolor/Multicolor',1,'2020-06-22 20:56:16','2020-06-22 20:56:16',0,'Basket Shoes'),(60,'Harden Vol. 4 Playoffs Shoes (FX2095)',NULL,8,1,2000000,'Pria Basket - Orange/Silver/Black',1,'2020-06-22 20:56:16','2020-06-22 20:56:16',0,'Basket Shoes'),(61,'Nemeziz 19.1 Firm Ground Boots (EG7325)',NULL,12,1,3000000,'Pria Soccer - White/Black/Multicolor',1,'2020-08-24 16:18:20','2020-08-24 16:18:20',0,'Soccer Shoes');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactiondetails`
--

DROP TABLE IF EXISTS `transactiondetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactiondetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `transactionid` int NOT NULL,
  `productid` int NOT NULL,
  `qty` int NOT NULL,
  `isdeleted` int NOT NULL DEFAULT '0',
  `createat` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateat` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactiondetails`
--

LOCK TABLES `transactiondetails` WRITE;
/*!40000 ALTER TABLE `transactiondetails` DISABLE KEYS */;
INSERT INTO `transactiondetails` VALUES (1,1,8,1,0,'2020-06-24 01:28:21','2020-06-24 01:28:21'),(2,2,4,1,0,'2020-06-28 08:47:44','2020-06-28 08:47:44');
/*!40000 ALTER TABLE `transactiondetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `method` varchar(25) DEFAULT NULL,
  `status` varchar(45) NOT NULL,
  `isdeleted` int NOT NULL DEFAULT '0',
  `createat` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateat` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creditcard_number` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,10,'credit card','completed',0,'2020-06-24 01:28:21','2020-06-24 01:28:21','953356'),(2,10,'credit card','completed',0,'2020-06-28 08:47:44','2020-06-28 08:47:44','4124');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(80) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` int NOT NULL DEFAULT '1',
  `isdeleted` int NOT NULL DEFAULT '0',
  `isverified` int NOT NULL DEFAULT '0',
  `createat` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateat` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastlogin` datetime NOT NULL,
  `isfacebook` int NOT NULL DEFAULT '0',
  `facebookid` varchar(100) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `phonenumber` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'belimbing','64c8baacf33556146ee3aadfdbd053318339029a1eb529c7daf9245fd302c959','akuadalahkurakura@gmail.com',1,0,0,'2020-06-16 19:44:29','2020-06-16 19:44:29','2020-06-16 19:44:29',0,NULL,NULL,NULL),(2,'bangsat','bdae6078b3f3e2e4bdffe320caa164632083a71cf7bffbc2d99e3299e8421253','bangsatadalahnamaserangga@gmail.com',1,0,0,'2020-06-16 19:45:46','2020-06-16 19:45:46','2020-06-16 19:45:46',0,NULL,NULL,NULL),(3,'hanif','1cb2b4378d3a195e549ffe826bf8471acb2075e580b4a62bd72042a3e9ae8c81','akbarhanif75@gmail.com',1,0,0,'2020-06-17 16:24:10','2020-06-17 16:24:10','2020-06-17 16:24:10',0,NULL,NULL,NULL),(4,'akbar','64c8baacf33556146ee3aadfdbd053318339029a1eb529c7daf9245fd302c959','hanifakbar99@yahoo.com',1,0,0,'2020-06-18 22:56:51','2020-06-18 22:56:51','2020-06-18 22:56:51',0,NULL,NULL,NULL),(5,'hantu','64c8baacf33556146ee3aadfdbd053318339029a1eb529c7daf9245fd302c959','hanifakbar99@yahoo.com',1,0,1,'2020-06-19 18:22:00','2020-06-19 18:22:00','2020-06-19 18:22:00',0,NULL,NULL,NULL),(6,'aldoniba','f749bc659d5b37c39f6f039d5a84e8af453d99ccd3b185f13b07b4c8bdd33aa9','hanifakbar99@yahoo.com',1,0,1,'2020-06-20 22:54:17','2020-06-20 22:54:17','2020-06-20 22:54:17',0,NULL,NULL,NULL),(7,'fajar','f749bc659d5b37c39f6f039d5a84e8af453d99ccd3b185f13b07b4c8bdd33aa9','Akbarhanif75@gmail.com',1,0,1,'2020-06-23 11:28:03','2020-06-23 11:28:03','2020-06-23 11:28:03',0,NULL,NULL,NULL),(8,'butet','f749bc659d5b37c39f6f039d5a84e8af453d99ccd3b185f13b07b4c8bdd33aa9','Akbarhanif75@gmail.com',1,0,1,'2020-06-23 11:33:10','2020-06-23 11:33:10','2020-06-23 11:33:11',0,NULL,NULL,NULL),(9,'jamal','f749bc659d5b37c39f6f039d5a84e8af453d99ccd3b185f13b07b4c8bdd33aa9','Akbarhanif75@gmail.com',1,0,1,'2020-06-23 11:48:57','2020-06-23 11:48:57','2020-06-23 11:48:57',0,NULL,NULL,NULL),(10,'dian','96d15bea495daa9e7dfd8881b7b1cd161d9ba78f9da6638e539136a192fcc040','october.opal.gao@gmail.com',1,0,0,'2020-06-23 11:58:24','2020-06-23 11:58:24','2020-06-28 08:47:03',0,NULL,NULL,NULL),(11,'admin','4fe253177747405fcb98c2e8b3f5dd7757d839037862f6f1ae7d4b3e79ee361a','ardiani.bernhard@gmail.com',0,0,0,'2020-06-24 01:33:52','2020-06-24 01:33:52','2020-08-24 16:27:31',0,NULL,NULL,NULL),(12,'zie','64c8baacf33556146ee3aadfdbd053318339029a1eb529c7daf9245fd302c959','october.opal.gao@gmail.com',1,0,1,'2020-06-28 03:29:00','2020-06-28 03:29:00','2020-06-28 03:29:00',0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-24 16:30:57
