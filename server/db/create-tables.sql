SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `attachments`;
CREATE TABLE `attachments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` enum('image') NOT NULL,
  `src` varchar(200) NOT NULL,
  `postId` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `postId_idx` (`postId`),
  CONSTRAINT `attachments_postId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(2000) DEFAULT NULL,
  `postId` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `postId_idx` (`postId`),
  CONSTRAINT `comments_postId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `creators`;
CREATE TABLE `creators` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `profileImagePath` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `body` varchar(2000) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `creatorId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `post_creatorId_idx` (`creatorId`),
  CONSTRAINT `post_creatorId` FOREIGN KEY (`creatorId`) REFERENCES `creators` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
