-- MySQL dump 10.13  Distrib 8.0.13, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: planit
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `calender`
--

DROP TABLE IF EXISTS `calender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `calender` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `deadline` varchar(20) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `importance` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calender`
--

LOCK TABLES `calender` WRITE;
/*!40000 ALTER TABLE `calender` DISABLE KEYS */;
INSERT INTO `calender` VALUES (1,9,'1997-12-18','Normaal Postman request','Dit is een request vanuit postman','high'),(2,9,'1997-12-18','Project 10','zfzef','high'),(5,9,'1997-12-18','Nog een Postman request','Dit is een request vanuit postman','zhoog'),(6,5,'1997-12-18','Project 5','AKPdzkf','low'),(7,5,'1997-12-18','Project 5 2','zfzef','low'),(8,10,'1997-12-18','Project 10','zfzef','low'),(9,11,'1997-12-18','Project 11','zefze','low'),(10,12,'1997-12-18','Project 12','redhgfd','low'),(11,NULL,NULL,NULL,'zeggre','medium');
/*!40000 ALTER TABLE `calender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(45) DEFAULT NULL,
  `owner` varchar(45) DEFAULT NULL,
  `description` varchar(400) DEFAULT NULL,
  `collab` varchar(250) DEFAULT NULL,
  `chat_server` int(11) DEFAULT NULL,
  `chat_channel` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (5,'Wen & Mobile 2','MelanieDR','Dit is een groepsproject van het 2e semester','MelanieDR',NULL,NULL),(9,'Nog een nieuw project','JonathanDM','Dit is een nieuw project','JonathanDM',NULL,NULL),(10,'Jonathan\'s project','JonathanDM','Dit is nog een test','JonathanDM',NULL,NULL),(11,'eeee','eee','eee','eee',NULL,NULL),(12,'Nog een nieuw project','JonathanDM','rgergfeghrge','JonathanDM',NULL,NULL),(13,'Jonathan\'s project','JonathanDM','azerty','JonathanDM, JonasDM, JasperDM',NULL,NULL),(15,'Jonathan\'s project','JonathanDM','fgfgh','JonathanDM, JonasDM, JasperDM',NULL,NULL);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scrum_tasks`
--

DROP TABLE IF EXISTS `scrum_tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `scrum_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `comments` varchar(200) DEFAULT NULL,
  `status` varchar(15) DEFAULT NULL,
  `assigned_user` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scrum_tasks`
--

LOCK TABLES `scrum_tasks` WRITE;
/*!40000 ALTER TABLE `scrum_tasks` DISABLE KEYS */;
INSERT INTO `scrum_tasks` VALUES (32,10,'ggggdf','grr','ergg','done','JonathanDM'),(33,10,'ggggdf','dsfgdf','sdg','review','fgddgf'),(34,10,'ggggdf','dsfgdf','sdg','review','fgddgf'),(35,10,'ggggdf','dsfgdf','sdg','doing','fgddgf'),(36,10,'1e taak','Dit is de eerste aanpassing','Hoperlijk werkt gij','done','JonathanDM');
/*!40000 ALTER TABLE `scrum_tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `school_name` varchar(45) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (30,'MelanieDR','melaniederocker@student.arteveldehs.be','Artevendehogeschool','$2b$10$ESRqwRyFuwIUir/uuJcN1Ox.qLyE06twaae99vzuIFo5TfnSJBeMS'),(31,'JonathanDM','jonathan@jon-it.be','Odisee Hogeschool','$2b$10$OHJcraLqIp6Go07DdbXDweurKbLNYd8R/Kc6/wqs7iElHoDOpksMS'),(32,'JasperDM','info@jon-it.be','Odisee Hogeschool','$2b$10$PJ3HXbisoZ.Q4Bb6uFt2mek4oh/O.Tmwmynba/ZMk8bgHlgFKkWK2'),(33,'r0795214','jonathan.de.mangelaere@outlook.be','Odisee','$2b$10$grV6nN8SIOyBA7vZ.MigueoKiT8AK5htZdWtG9s.PpWF.uX0zfUIq'),(34,'r0795214','jonathan.de.mangelaere@outlook.be','Odisee','$2b$10$tBSOtnkPOEkFUATdWfpfIOkNGRQOdEJmCpNQ8JzVYCbxFSuw/DKa6');
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

-- Dump completed on 2020-06-16 21:18:12
