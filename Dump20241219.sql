CREATE DATABASE  IF NOT EXISTS `kiyay_koki` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `kiyay_koki`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: kiyay_koki
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `aquarium`
--

DROP TABLE IF EXISTS `aquarium`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aquarium` (
  `dimention` varchar(50) NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `fk_aquarium_products1_idx` (`product_id`),
  CONSTRAINT `fk_aquarium_products1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aquarium`
--

LOCK TABLES `aquarium` WRITE;
/*!40000 ALTER TABLE `aquarium` DISABLE KEYS */;
/*!40000 ALTER TABLE `aquarium` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `amount` int NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_cart_user1_idx` (`user_id`),
  KEY `fk_cart_products1_idx` (`product_id`),
  CONSTRAINT `fk_cart_products1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (3,6,2,2,'2024-12-18 19:49:00','2024-12-18 19:50:14'),(4,6,1,6,'2024-12-18 23:04:14','2024-12-18 23:04:22');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fish`
--

DROP TABLE IF EXISTS `fish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fish` (
  `color` varchar(45) NOT NULL,
  `size` varchar(15) NOT NULL,
  `fish_type` varchar(30) NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `fk_fish_products_idx` (`product_id`),
  CONSTRAINT `fk_fish_products` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fish`
--

LOCK TABLES `fish` WRITE;
/*!40000 ALTER TABLE `fish` DISABLE KEYS */;
INSERT INTO `fish` VALUES ('white','besar','Oranda Short Tail',1),('white','kecil','Oranda Short Tail',2),('Black','besar','Sakura',3),('White and Black','besar dan kecil','Panda',4),('White','besar dan kecil','Albino Oranda',5),('White','besar dan kecil','Ryu Kin',6),('Red','besar','Oranda Short Tail',7),('Red','besar','Oranda Rose Tail',8),('Red','besar','Oranda Rose Tail',9),('Black','besar','Oranda Rose Tail',10),('White','besar','Oranda Rose Tail',11),('Random','Kecil','Oranda Rose Tail',12),('Yellow, Orange','Kecil','Discuss',13);
/*!40000 ALTER TABLE `fish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fish_food`
--

DROP TABLE IF EXISTS `fish_food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fish_food` (
  `weight` varchar(10) NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `fk_fish_food_products1_idx` (`product_id`),
  CONSTRAINT `fk_fish_food_products1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fish_food`
--

LOCK TABLES `fish_food` WRITE;
/*!40000 ALTER TABLE `fish_food` DISABLE KEYS */;
/*!40000 ALTER TABLE `fish_food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `description` text NOT NULL,
  `discount` float DEFAULT NULL,
  `category` enum('fish','fish_food','aquarium') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Oranda Short Tail',180000.00,20,'Tentang Ikan',10,'fish','2024-12-12 14:57:52','2024-12-18 22:36:15',NULL),(2,'Oranda Short Tail',100000.00,10,'Tentang Ikan',0,'fish','2024-12-12 15:05:40','2024-12-12 15:05:40',NULL),(3,'Sakura',180000.00,5,'Tentang Ikan',0,'fish','2024-12-12 15:18:31','2024-12-12 15:18:31',NULL),(4,'Panda',80000.00,5,'Tentang Ikan',0,'fish','2024-12-12 15:24:21','2024-12-12 15:24:21',NULL),(5,'Albino Oranda',150000.00,5,'Tentang Ikan',0,'fish','2024-12-12 15:50:00','2024-12-12 15:50:00',NULL),(6,'Ryu Kin',100000.00,5,'Tentang Ikan',0,'fish','2024-12-12 15:55:21','2024-12-12 15:55:21',NULL),(7,'Oranda Short Tail',180000.00,5,'Tentang Ikan',0,'fish','2024-12-12 16:05:19','2024-12-12 16:05:19',NULL),(8,'Oranda Rose Tail',200000.00,5,'Tentang Ikan',0,'fish','2024-12-12 16:46:22','2024-12-12 16:46:22',NULL),(9,'Oranda Rose Tail',200000.00,5,'Tentang Ikan',0,'fish','2024-12-12 16:49:39','2024-12-12 16:49:39',NULL),(10,'Oranda Rose Tail',200000.00,5,'Tentang Ikan',0,'fish','2024-12-12 16:55:43','2024-12-12 16:55:43',NULL),(11,'Oranda Rose Tail',200000.00,5,'Tentang Ikan',0,'fish','2024-12-12 16:58:20','2024-12-12 16:58:20',NULL),(12,'Ikan Kolam',100000.00,20,'Tentang Ikan',0,'fish','2024-12-12 17:03:28','2024-12-12 17:03:28',NULL),(13,'Discuss',100000.00,20,'Tentang Ikan',0,'fish','2024-12-12 17:07:33','2024-12-12 17:07:33',NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(50) NOT NULL,
  `product_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_product_image_products1_idx` (`product_id`),
  CONSTRAINT `fk_product_image_products1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (1,'17340154685944372.png',1,'2024-12-12 14:57:52','2024-12-12 14:57:52'),(2,'17340154710289949.png',1,'2024-12-12 14:57:52','2024-12-12 14:57:52'),(3,'17340154719013741.png',1,'2024-12-12 14:57:52','2024-12-12 14:57:52'),(4,'17340159362525037.png',2,'2024-12-12 15:05:40','2024-12-12 15:05:40'),(5,'17340159384805612.png',2,'2024-12-12 15:05:40','2024-12-12 15:05:40'),(6,'17340159401326172.png',2,'2024-12-12 15:05:40','2024-12-12 15:05:40'),(7,'17340167091919515.png',3,'2024-12-12 15:18:31','2024-12-12 15:18:31'),(8,'17340167108811247.png',3,'2024-12-12 15:18:31','2024-12-12 15:18:31'),(9,'17340167117012994.png',3,'2024-12-12 15:18:31','2024-12-12 15:18:31'),(10,'17340170539263227.png',4,'2024-12-12 15:24:21','2024-12-12 15:24:21'),(11,'17340170577203934.png',4,'2024-12-12 15:24:21','2024-12-12 15:24:21'),(12,'17340170606189642.png',4,'2024-12-12 15:24:21','2024-12-12 15:24:21'),(13,'17340185956756509.png',5,'2024-12-12 15:50:00','2024-12-12 15:50:00'),(14,'1734018598549445.png',5,'2024-12-12 15:50:00','2024-12-12 15:50:00'),(15,'17340186003938776.png',5,'2024-12-12 15:50:00','2024-12-12 15:50:00'),(16,'17340189146777845.png',6,'2024-12-12 15:55:21','2024-12-12 15:55:21'),(17,'17340189196629222.png',6,'2024-12-12 15:55:21','2024-12-12 15:55:21'),(18,'17340189202136340.png',6,'2024-12-12 15:55:21','2024-12-12 15:55:21'),(19,'17340195060791509.png',7,'2024-12-12 16:05:19','2024-12-12 16:05:19'),(20,'17340195103947793.png',7,'2024-12-12 16:05:19','2024-12-12 16:05:19'),(21,'1734019512798195.png',7,'2024-12-12 16:05:19','2024-12-12 16:05:19'),(22,'17340218564248238.png',8,'2024-12-12 16:46:22','2024-12-12 16:46:22'),(23,'17340218807629313.png',8,'2024-12-12 16:46:22','2024-12-12 16:46:22'),(24,'17340219093273197.jpg',8,'2024-12-12 16:46:22','2024-12-12 16:46:22'),(25,'17340221734448181.png',9,'2024-12-12 16:49:39','2024-12-12 16:49:39'),(26,'17340221759111609.png',9,'2024-12-12 16:49:39','2024-12-12 16:49:39'),(27,'17340221765802343.jpg',9,'2024-12-12 16:49:39','2024-12-12 16:49:39'),(28,'17340225377948675.png',10,'2024-12-12 16:55:43','2024-12-12 16:55:43'),(29,'17340225392841722.png',10,'2024-12-12 16:55:43','2024-12-12 16:55:43'),(30,'17340225421152686.png',10,'2024-12-12 16:55:43','2024-12-12 16:55:43'),(31,'17340226987227210.png',11,'2024-12-12 16:58:20','2024-12-12 16:58:20'),(32,'1734022699403970.png',11,'2024-12-12 16:58:20','2024-12-12 16:58:20'),(33,'17340227000354388.png',11,'2024-12-12 16:58:20','2024-12-12 16:58:20'),(34,'1734022997960298.jpg',12,'2024-12-12 17:03:28','2024-12-12 17:03:28'),(35,'1734023003111154.jpg',12,'2024-12-12 17:03:28','2024-12-12 17:03:28'),(36,'17340230056919624.jpg',12,'2024-12-12 17:03:28','2024-12-12 17:03:28'),(37,'17340232525102284.png',13,'2024-12-12 17:07:33','2024-12-12 17:07:33'),(38,'17340232527648222.png',13,'2024-12-12 17:07:33','2024-12-12 17:07:33'),(39,'17340232531193117.png',13,'2024-12-12 17:07:33','2024-12-12 17:07:33');
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_video`
--

DROP TABLE IF EXISTS `product_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_video` (
  `id` int NOT NULL AUTO_INCREMENT,
  `video_url` varchar(50) NOT NULL,
  `product_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_product_video_product1_idx` (`product_id`),
  CONSTRAINT `fk_product_video_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_video`
--

LOCK TABLES `product_video` WRITE;
/*!40000 ALTER TABLE `product_video` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rating` int NOT NULL,
  `comment` text NOT NULL,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_review_products1_idx` (`product_id`),
  KEY `fk_review_user1_idx` (`user_id`),
  CONSTRAINT `fk_review_products1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_review_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `security`
--

DROP TABLE IF EXISTS `security`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `security` (
  `id` int NOT NULL AUTO_INCREMENT,
  `api_key` varchar(50) NOT NULL,
  `api_name` varchar(50) DEFAULT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_security_user1_idx` (`user_id`),
  CONSTRAINT `fk_security_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `security`
--

LOCK TABLES `security` WRITE;
/*!40000 ALTER TABLE `security` DISABLE KEYS */;
INSERT INTO `security` VALUES (1,'JHdfksK123LKkjasdfjksl12klsdk2jlfsfjksLksdlfjs','Kiyay Koki 1',1,'2024-12-12 13:41:27','2024-12-12 13:41:27',NULL);
/*!40000 ALTER TABLE `security` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_address`
--

DROP TABLE IF EXISTS `shipping_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `phone_number` varchar(14) NOT NULL,
  `province` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `subdistrict` varchar(50) NOT NULL,
  `postal_code` varchar(8) NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_shipping_address_user1_idx` (`user_id`),
  CONSTRAINT `fk_shipping_address_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_address`
--

LOCK TABLES `shipping_address` WRITE;
/*!40000 ALTER TABLE `shipping_address` DISABLE KEYS */;
/*!40000 ALTER TABLE `shipping_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(14) NOT NULL,
  `level` enum('buyer','seller') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `no_hp_UNIQUE` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'6282377385422','seller','2024-12-12 13:41:18','2024-12-12 13:41:18',NULL),(6,'6281934298038','buyer','2024-12-18 19:01:10','2024-12-18 19:01:10',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_otp`
--

DROP TABLE IF EXISTS `user_otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_otp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `otp_code` varchar(6) NOT NULL,
  `expiration_time` timestamp NOT NULL,
  `is_verified` tinyint(1) DEFAULT '0',
  `user_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_otp_user1_idx` (`user_id`),
  CONSTRAINT `fk_user_otp_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_otp`
--

LOCK TABLES `user_otp` WRITE;
/*!40000 ALTER TABLE `user_otp` DISABLE KEYS */;
INSERT INTO `user_otp` VALUES (1,'464152','2024-12-12 14:08:29',0,1,'2024-12-12 14:06:30','2024-12-12 14:06:30',NULL),(2,'896193','2024-12-12 14:10:01',1,1,'2024-12-12 14:08:01','2024-12-12 14:08:33',NULL),(3,'930753','2024-12-17 09:29:09',1,1,'2024-12-17 09:27:09','2024-12-17 09:27:43',NULL),(23,'731784','2024-12-18 12:41:33',1,1,'2024-12-18 12:39:33','2024-12-18 12:39:54',NULL),(24,'138996','2024-12-18 17:02:31',1,1,'2024-12-18 17:00:31','2024-12-18 17:00:54',NULL),(25,'914854','2024-12-18 18:48:10',0,1,'2024-12-18 18:46:10','2024-12-18 18:46:10',NULL),(28,'583854','2024-12-18 18:50:05',1,1,'2024-12-18 18:48:05','2024-12-18 18:48:16',NULL),(29,'757093','2024-12-18 19:16:18',1,6,'2024-12-18 19:14:18','2024-12-18 19:14:51',NULL),(30,'435703','2024-12-18 23:05:45',1,6,'2024-12-18 23:03:45','2024-12-18 23:04:02',NULL),(31,'667943','2024-12-18 23:09:42',1,1,'2024-12-18 23:07:42','2024-12-18 23:08:24',NULL),(32,'606566','2024-12-18 23:11:37',1,1,'2024-12-18 23:09:37','2024-12-18 23:09:47',NULL),(33,'689761','2024-12-18 23:21:20',1,1,'2024-12-18 23:19:20','2024-12-18 23:19:32',NULL);
/*!40000 ALTER TABLE `user_otp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_wishlist_user1_idx` (`user_id`),
  KEY `fk_wishlist_products1_idx` (`product_id`),
  CONSTRAINT `fk_wishlist_products1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_wishlist_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-19  7:18:24
