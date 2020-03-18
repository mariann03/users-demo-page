CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'member' COMMENT 'admin | member',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);
CREATE TRIGGER `insert_user_id` BEFORE
INSERT
  ON `users` FOR EACH ROW
SET
  NEW.id = UUID();
CREATE TABLE `users_information` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `career` varchar(255) NOT NULL,
  `date_of_birth` datetime NOT NULL,
  `phone` varchar(45) NOT NULL,
  `country` varchar(50) NOT NULL,
  `city` varchar(255) NOT NULL,
  `payment_method` varchar(45) NOT NULL COMMENT 'credit card | debit card | cash | transfer',
  `installments` tinyint(4) DEFAULT NULL COMMENT '1 | 3 | 6',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `email_idx` (`email`, `id`),
  CONSTRAINT `email` FOREIGN KEY (`email`, `id`) REFERENCES `users` (`email`, `id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `id` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);