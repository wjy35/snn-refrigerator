CREATE DATABASE  IF NOT EXISTS `member_manage` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `member_manage`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 3.38.181.77    Database: member_manage
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
-- Table structure for table `follow_member`
--

DROP TABLE IF EXISTS `follow_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow_member` (
  `follow_member_seq` int NOT NULL AUTO_INCREMENT,
  `followee` bigint DEFAULT NULL,
  `follower` bigint DEFAULT NULL,
  PRIMARY KEY (`follow_member_seq`),
  KEY `FK7xisjgfkld7t7qlof8vrkfvnb` (`followee`),
  KEY `FKrupowvn6ka4uby834yyihtv6d` (`follower`),
  CONSTRAINT `FK7xisjgfkld7t7qlof8vrkfvnb` FOREIGN KEY (`followee`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKrupowvn6ka4uby834yyihtv6d` FOREIGN KEY (`follower`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=182 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow_member`
--

LOCK TABLES `follow_member` WRITE;
/*!40000 ALTER TABLE `follow_member` DISABLE KEYS */;
INSERT INTO `follow_member` VALUES (45,3027437248,3029548333),(153,1000,3029548333),(175,1000,3027437248),(178,3027437248,3027437248),(181,100,3029548333);
/*!40000 ALTER TABLE `follow_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hate_ingredient`
--

DROP TABLE IF EXISTS `hate_ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hate_ingredient` (
  `member_hate_ingredient_seq` int NOT NULL AUTO_INCREMENT,
  `hate_ingredient_id` smallint NOT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`member_hate_ingredient_seq`),
  KEY `FK5yvk4mimsjaxef7xpd8agl2lb` (`member_id`),
  CONSTRAINT `FK5yvk4mimsjaxef7xpd8agl2lb` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hate_ingredient`
--

LOCK TABLES `hate_ingredient` WRITE;
/*!40000 ALTER TABLE `hate_ingredient` DISABLE KEYS */;
INSERT INTO `hate_ingredient` VALUES (1,3,3029554590),(2,1,3029554590),(3,100,3027437248),(4,101,3027437248),(5,102,3027437248),(6,1,123),(7,2,123),(8,3,123),(9,1,2),(10,2,2),(11,3,2),(12,1,3),(13,2,3),(14,3,3),(15,1,4),(16,2,4),(17,3,4),(18,1,5),(19,2,5),(20,3,5),(21,1,5),(22,2,5),(23,3,5),(24,1,5),(25,2,5),(26,3,5),(27,1,5),(28,2,5),(29,3,5),(30,1,5),(31,2,5),(32,3,5),(33,1,5),(34,2,5),(35,3,5),(36,1,5),(37,2,5),(38,3,5),(39,1,8),(40,2,8),(41,3,8),(42,191,3027437248),(43,656,3027437248),(44,5,3029548333),(45,797,100),(46,823,100),(47,824,100),(48,668,1000),(49,769,1000),(50,873,1000),(51,444,10000),(52,635,10000),(53,744,10000),(54,878,10000),(55,269,111),(56,487,111),(57,488,111),(58,225,111),(59,5,3033569142);
/*!40000 ALTER TABLE `hate_ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` bigint NOT NULL,
  `birthday` varchar(4) NOT NULL,
  `email` text NOT NULL,
  `follow_count` int DEFAULT '0',
  `house_code` char(36) DEFAULT NULL,
  `nickname` varchar(10) NOT NULL,
  `profile_image_filename` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `UK_hh9kg6jti4n1eoiertn2k6qsc` (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (2,'0407','test1@gmail.com',0,'8ea12c83-f778-4c53-a55e-50f87424a0fa','test2','default/Wang.png'),(3,'0407','test1@gmail.com',0,'8b5f1df3-7084-4666-ac18-5a75b68bd456','test3','default/Wang.png'),(4,'0407','test1@gmail.com',0,'ab7b5301-054b-4f52-92a2-64267986ae32','test4','default/Wang.png'),(5,'0407','test1@gmail.com',0,'23c2726e-b52d-40f5-b930-9ffbd50b4623','test5','default/Wang.png'),(8,'0407','test1@gmail.com',0,'35ceca28-682c-40a6-8840-233e9c3d4052','test8','default/Wang.png'),(10,'0407','test1@gmail.com',0,'7bdd38ca-7b6d-4fa7-b8aa-f847cea27bbd','test12','default/Wang.png'),(100,'1108','gordon-ramsay68@naver.com',1,'9e24e90a-8a02-4f5a-8ab4-1e7aab82393b','고든램지','member/profile/ac189770-4a09-42d7-b9cb-495e76bfc012-고든램지'),(111,'0904','Naldu@naver.com',0,'93dcc4b6-3c68-48c0-b79a-a9689ed66443','크리스티아누 호날두','default/basic-profile.png'),(123,'0407','test1@gmail.com',0,'3b2ae428-1c13-499f-ad73-7752398f2cf5','test1','default/Wang.png'),(1000,'0711','yeonboklee@naver.com',2,'b5b91ffd-20cc-4002-a8a6-02ef0637792d','이연복','member/profile/0b5c8fed-7a9e-410b-985f-c89460e3d9ed-이연복'),(10000,'0904','jongwonPaek@naver.com',0,'08671584-6ae2-47f3-975a-0cf730d001d3','집밥 백선생','member/profile/d6355cdf-d747-4cdb-b7e6-294a9423fce7-집밥 백선생'),(3027437248,'0407','chris407@naver.com',2,'65bed258-59f2-4856-84b1-e17b12932d2a','SuhyunKim','member/profile/81883c6b-bd5a-4e95-b857-ded46fa2133b-SuhyunKim'),(3029548333,'9999','tjrwn1247@naver.com',0,'492f9401-c684-4966-936e-56f0941eaffe','석주 김','member/profile/161fb7f2-cb44-410a-a5f8-0fe2275db157-석주 김'),(3029554590,'1023','tngks1995@naver.com',0,'492f9401-c684-4966-936e-56f0941eaffe','곽민규','member/profile/13b2a322-5afa-4eaa-a5fa-0b69b87a6469-곽민규'),(3033569142,'1105','ytyuu123@naver.com',0,'71fd7526-e7e3-4f6e-bc6b-6e09e9759a46','태영','default/basic-profile.png'),(3051073625,'0305','wangsun7@naver.com',0,'d4e1f60e-cbf0-4e28-8241-215b9ef94f15','착한 왕준영','default/Wang.png');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_location`
--

DROP TABLE IF EXISTS `member_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_location` (
  `member_location_seq` int NOT NULL AUTO_INCREMENT,
  `location_id` smallint DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`member_location_seq`),
  KEY `FKo6mxytmnk546jt18pp1cnnd3y` (`member_id`),
  CONSTRAINT `FKo6mxytmnk546jt18pp1cnnd3y` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_location`
--

LOCK TABLES `member_location` WRITE;
/*!40000 ALTER TABLE `member_location` DISABLE KEYS */;
INSERT INTO `member_location` VALUES (1,1,3029554590),(2,2,3029554590),(4,3,3029554590),(6,100,3027437248),(7,101,3027437248),(8,102,3027437248),(9,1971,3027437248),(10,1970,3027437248),(11,1970,3029548333),(12,203,3029548333),(13,204,3029548333),(14,1969,3029548333),(15,1967,3029548333),(16,1953,3029548333),(17,1969,100),(18,1967,100),(19,1953,100),(20,1,3029548333),(21,1,3027437248),(22,1,1000),(23,2,1000),(24,3,1000),(25,111,10000),(26,112,10000),(27,113,10000),(28,100,3051073625),(29,101,3051073625),(30,102,3051073625),(31,211,111),(32,212,111),(33,213,111),(34,1970,3033569142),(38,2,3029548333),(39,1,3029548333),(40,1,3029548333),(41,1,3029548333),(42,1,3029548333),(43,2,3029548333),(44,2,3029548333);
/*!40000 ALTER TABLE `member_location` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-06 10:18:36
