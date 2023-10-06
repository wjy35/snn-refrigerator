CREATE DATABASE  IF NOT EXISTS `share` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `share`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 3.38.181.77    Database: share
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `share_history`
--

DROP TABLE IF EXISTS `share_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `share_history` (
  `share_history_id` bigint NOT NULL AUTO_INCREMENT,
  `completed_time` varchar(255) DEFAULT NULL,
  `giver_id` bigint DEFAULT NULL,
  `is_completed` bit(1) NOT NULL,
  `taker_id` bigint DEFAULT NULL,
  PRIMARY KEY (`share_history_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `share_history`
--

LOCK TABLES `share_history` WRITE;
/*!40000 ALTER TABLE `share_history` DISABLE KEYS */;
INSERT INTO `share_history` VALUES (1,'2023년 10월 04일 22시 49분 37초',2,_binary '',3),(2,'2023년 10월 04일 22시 49분 46초',2,_binary '',3),(3,'2023년 10월 04일 22시 54분 20초',2,_binary '',3),(4,NULL,2,_binary '\0',4),(5,'2023년 10월 05일 00시 01분 22초',3,_binary '',4),(6,NULL,3,_binary '\0',5),(7,'2023년 10월 05일 15시 56분 31초',2,_binary '',3),(8,'2023년 10월 05일 16시 06분 04초',2,_binary '',3),(9,'2023년 10월 05일 16시 08분 18초',2,_binary '',3),(10,NULL,2,_binary '\0',3),(11,NULL,2,_binary '\0',3),(12,NULL,2,_binary '\0',3);
/*!40000 ALTER TABLE `share_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `share_image`
--

DROP TABLE IF EXISTS `share_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `share_image` (
  `share_post_img_url` varchar(255) NOT NULL,
  `share_post_id` bigint DEFAULT NULL,
  PRIMARY KEY (`share_post_img_url`),
  KEY `FKs0y6gojdyy21e1ggqnrj1cg72` (`share_post_id`),
  CONSTRAINT `FKs0y6gojdyy21e1ggqnrj1cg72` FOREIGN KEY (`share_post_id`) REFERENCES `share_post` (`share_post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `share_image`
--

LOCK TABLES `share_image` WRITE;
/*!40000 ALTER TABLE `share_image` DISABLE KEYS */;
INSERT INTO `share_image` VALUES ('',NULL),('share/5f365dd3-e74d-4844-a8bd-d97d9de300ac-clam.jpg',7),('share/442bb355-d65b-409d-a9f5-702fb03d2502-vinegar.jpg',8),('share/3ac08a35-430a-4779-bb13-b789af274d25-환경보호범.png',17),('share/5074b4d3-d155-407d-811b-e45eed239455-opo0613b.jpg',17),('share/568d16d7-7fba-435c-836b-495bab89226c-paek.jpg',17),('share/8125de1b-d07f-4422-a5e6-b38fad8004da-leeyeonbok.jpg',17),('share/bf7b6188-2f6c-4cbc-a7db-4d8034cee63e-basic-profile.png',17),('share/ddfecb6b-36f4-45b3-bedd-52b98ee14bdf-gordon_ramsay.jpg',17),('share/37158760-0ce8-4974-8042-e261ad2441b7-gordon_ramsay.jpg',28),('share/aaacca8d-4f6f-4ec2-a5fa-52cad97ed108-leeyeonbok.jpg',28),('share/b34b9444-e8b6-4312-8e72-f4bc177dfde9-gordon_ramsay.jpg',28),('share/c39b2b6f-1be7-4011-885a-96ac9448de4b-paek.jpg',28),('share/15a17431-6d26-4889-8e65-4d5996aa958c-gordon_ramsay.jpg',30),('share/29e56d62-09a5-4c55-8d5b-8cba380db07b-1000000404.jpg',34),('share/f75978cf-6dab-4f5a-a144-546c995b8c16-1000000404.jpg',35),('share/cd6e4db9-0da5-42f0-8f40-c47d7746be2d-1000000405.jpg',36),('share/bbeaa81a-b3e6-4a38-b807-4e7f4b77d835-1000005200.jpg',37),('share/58e8f2d1-f719-4491-9563-33d63920bef2-1000005201.jpg',38);
/*!40000 ALTER TABLE `share_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `share_ingredient`
--

DROP TABLE IF EXISTS `share_ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `share_ingredient` (
  `share_ingredient_seq` bigint NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `ingredient_info_id` smallint NOT NULL,
  `share_post_id` bigint DEFAULT NULL,
  PRIMARY KEY (`share_ingredient_seq`),
  KEY `FKix2cnxjmrodu7oallcwj39ctc` (`share_post_id`),
  CONSTRAINT `FKix2cnxjmrodu7oallcwj39ctc` FOREIGN KEY (`share_post_id`) REFERENCES `share_post` (`share_post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `share_ingredient`
--

LOCK TABLES `share_ingredient` WRITE;
/*!40000 ALTER TABLE `share_ingredient` DISABLE KEYS */;
INSERT INTO `share_ingredient` VALUES (9,35,1,7),(10,5,2,7),(25,70,10,8),(26,55,12,8),(31,4,145,17),(32,3,245,17),(53,1,145,28),(54,1,245,28),(57,1,145,30),(58,1,245,30),(65,1,145,34),(66,1,145,35),(67,1,245,36),(68,3,331,37),(69,2,547,38);
/*!40000 ALTER TABLE `share_ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `share_post`
--

DROP TABLE IF EXISTS `share_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `share_post` (
  `share_post_id` bigint NOT NULL AUTO_INCREMENT,
  `create_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `content` text NOT NULL,
  `location_id` smallint NOT NULL,
  `member_id` bigint NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `title` varchar(32) NOT NULL,
  PRIMARY KEY (`share_post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `share_post`
--

LOCK TABLES `share_post` WRITE;
/*!40000 ALTER TABLE `share_post` DISABLE KEYS */;
INSERT INTO `share_post` VALUES (7,'2023-10-05 01:49:56','2023-10-06 01:09:46','먹기엔 너무 많아서 나눔합니다. 싱싱한 가리비 드시고 싶은 사람은 참여해주세요~',1,3027437248,'share/5f365dd3-e74d-4844-a8bd-d97d9de300ac-clam.jpg','맛있는 식재료 나눔'),(8,'2023-10-05 01:58:00','2023-10-06 01:11:43','날마다 오는 나눔이 아닙니다',1,3027437248,'share/442bb355-d65b-409d-a9f5-702fb03d2502-vinegar.jpg','안전한 식재료 즉.시.지.급'),(17,'2023-10-05 15:12:16','2023-10-05 16:18:59','좋냉신나',2038,3029548333,'share/ddfecb6b-36f4-45b3-bedd-52b98ee14bdf-gordon_ramsay.jpg','나눔합니다'),(28,'2023-10-05 16:35:04','2023-10-06 02:29:36','나눔',1971,3029548333,'share/8b288f2d-5abc-4aa0-95ba-f9161f8d97f6-gordon_ramsay.jpg','나눔합니다'),(30,'2023-10-05 16:39:04','2023-10-06 02:35:53','나눔',1971,3029548333,'share/15a17431-6d26-4889-8e65-4d5996aa958c-gordon_ramsay.jpg','나눔합니다'),(34,'2023-10-05 17:55:03','2023-10-05 17:55:04','나눔',729,3029548333,'share/29e56d62-09a5-4c55-8d5b-8cba380db07b-1000000404.jpg','나눔'),(35,'2023-10-05 23:32:02','2023-10-05 23:32:02','신선한 당근 나눔합니다',1971,3027437248,'share/f75978cf-6dab-4f5a-a144-546c995b8c16-1000000404.jpg','나눔합니다'),(36,'2023-10-06 00:18:16','2023-10-06 00:18:17','얘 가을만두가 맛있단다?',1971,3027437248,'share/cd6e4db9-0da5-42f0-8f40-c47d7746be2d-1000000405.jpg','나눔해요'),(37,'2023-10-06 00:58:21','2023-10-06 00:58:21','바나나를 너무 많이 샀어요...\n나눔합니다',1,3029554590,'share/bbeaa81a-b3e6-4a38-b807-4e7f4b77d835-1000005200.jpg','바나나 나눔합니다'),(38,'2023-10-06 01:15:28','2023-10-06 01:15:28','양파 나눔합니당\n일주일 전에 샀어요',1,3029554590,'share/58e8f2d1-f719-4491-9563-33d63920bef2-1000005201.jpg','양파 나눔합니다');
/*!40000 ALTER TABLE `share_post` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-06 10:26:25
