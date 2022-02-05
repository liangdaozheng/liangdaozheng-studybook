/*
 Navicat Premium Data Transfer

 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 50729
 Source Host           : localhost
 Source Database       : webSenior

 Target Server Type    : MySQL
 Target Server Version : 50729
 File Encoding         : utf-8

 Date: 11/25/2020 22:42:39 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `photos`
-- ----------------------------
DROP TABLE IF EXISTS `photos`;
CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imgUrl` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `uId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=184 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `photos`
-- ----------------------------
BEGIN;
INSERT INTO `photos` VALUES ('1', 'https://tse2-mm.cn.bing.net/th/id/OIP.bBAdHie9rVifIiTHcTEr-gHaE8?pid=Api&rs=1', 'chunquchunyoulai_avatar.jpeg', '2'), ('2', 'https://tse2-mm.cn.bing.net/th/id/OIP.OF9Xexs_S94MbKYY7K_2lAHaEK?pid=Api&rs=1', 'dog.jpg', '2'), ('3', 'https://tse2-mm.cn.bing.net/th/id/OIP.OF9Xexs_S94MbKYY7K_2lAHaEK?pid=Api&rs=1', 'cat.jpeg', '2'), ('182', 'http://localhost:8081/upload/1606314219099_cat.jpeg', 'cat.jpeg', '2'), ('183', 'http://localhost:8081/upload/1606314219113_dog.jpg', 'dog.jpg', '2');
COMMIT;

-- ----------------------------
--  Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `users`
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES ('1', 'h', '123'), ('2', 'c', '123');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
