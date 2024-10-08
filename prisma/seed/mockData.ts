import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('791f81f2-173d-4717-b233-853cdfe2c706', '1Madie18@hotmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=3', 'stu901vwx234', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('e5e8471b-1537-48b7-a38e-5178f2e5c67c', '10Bret_Stoltenberg26@gmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=12', 'yz567abc890', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('e3768a9b-736a-41b5-b62c-e29d76529b08', '19Chadd.Reichel40@hotmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=21', 'yz567abc890', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('2ba01969-4ad4-471c-8123-c989a147925f', '28Rebekah_Feest40@hotmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=30', 'mno345pqr678', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('2448c2f0-5cbd-4b4b-a86a-7b0844d1605b', '37Easter.Mohr64@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=39', 'abc123def456', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('cc763639-a771-4c2a-8516-c3ccce70aaaa', '46Ansley_Boyle@gmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=48', 'abc123def456', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('c986e505-7c4e-4ddf-9dda-53c5feea4e3f', '55Shannon4@gmail.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=57', 'mno345pqr678', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('2a5e5a0e-31fd-46f3-afa3-27b32efd2601', '73Olen85@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=75', 'stu901vwx234', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password") VALUES ('d77c1795-0a3c-4e81-a1ce-36d7b69b4dfb', '82Lucious.Bechtelar@hotmail.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=84', 'ghi789jkl012', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('cf4cfb71-d507-4df2-9773-31e10c7b6716', 'httpsexample.compushendpoint2', 'subscription_data_4', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('bd538bc6-6705-4b26-acea-f81f749c5cba', 'httpsexample.compushendpoint1', 'subscription_data_1', 'cc763639-a771-4c2a-8516-c3ccce70aaaa');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('d9ffcaaa-5dda-42e8-a2f9-180e04f5c6be', 'httpsexample.compushendpoint5', 'subscription_data_2', '2a5e5a0e-31fd-46f3-afa3-27b32efd2601');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('5c1d5437-b3c8-416e-b5f3-c0558f2a5b90', 'httpsexample.compushendpoint4', 'subscription_data_4', '2448c2f0-5cbd-4b4b-a86a-7b0844d1605b');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('f9982f41-b9ab-451e-a024-f30cafaf27c5', 'httpsexample.compushendpoint2', 'subscription_data_3', 'c986e505-7c4e-4ddf-9dda-53c5feea4e3f');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('0769b41d-ff49-4b93-9952-9bb57d80c790', 'httpsexample.compushendpoint3', 'subscription_data_1', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('6c19be94-7b49-4592-ac45-dbcd0ee568bf', 'httpsexample.compushendpoint5', 'subscription_data_4', 'c986e505-7c4e-4ddf-9dda-53c5feea4e3f');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('47382d8a-c0cc-4fb1-8efe-1b29adcea6a8', 'httpsexample.compushendpoint2', 'subscription_data_5', '791f81f2-173d-4717-b233-853cdfe2c706');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('3e471ac3-e145-43d9-9c9d-d28063993245', 'httpsexample.compushendpoint2', 'subscription_data_2', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('87ab78ad-c109-40f6-8a24-e2a2a2975464', 'httpsexample.compushendpoint1', 'subscription_data_2', '791f81f2-173d-4717-b233-853cdfe2c706');

INSERT INTO "Product" ("id", "name", "description", "price", "imageUrl", "stock") VALUES ('dac3682c-a514-4458-ad8c-4b99bccd3467', 'Software License', 'A license for premium software with exclusive features.', 784, 'https://i.imgur.com/YfJQV5z.png?id=124', 643);
INSERT INTO "Product" ("id", "name", "description", "price", "imageUrl", "stock") VALUES ('62648235-fb81-4e43-b57b-9e3c287aaf45', 'Online Course', 'A collection of highresolution digital artworks.', 340, 'https://i.imgur.com/YfJQV5z.png?id=130', 678);
INSERT INTO "Product" ("id", "name", "description", "price", "imageUrl", "stock") VALUES ('e4dce771-74b8-499f-9ddc-ac13d7fe4d36', 'Software License', 'A collection of highresolution digital artworks.', 190, 'https://i.imgur.com/YfJQV5z.png?id=136', 421);
INSERT INTO "Product" ("id", "name", "description", "price", "imageUrl", "stock") VALUES ('e20cfa97-a69e-44b8-b5b5-257fa878b943', 'Online Course', 'A collection of highresolution digital artworks.', 25, 'https://i.imgur.com/YfJQV5z.png?id=142', 449);
INSERT INTO "Product" ("id", "name", "description", "price", "imageUrl", "stock") VALUES ('8db1faf3-6cda-4065-a00e-509756d89212', 'Music Album', 'A compilation of the latest music tracks.', 903, 'https://i.imgur.com/YfJQV5z.png?id=148', 180);
INSERT INTO "Product" ("id", "name", "description", "price", "imageUrl", "stock") VALUES ('abeb66f0-f42a-4e2c-8f3e-0eb441e34a28', 'Online Course', 'An online course to master web development.', 601, 'https://i.imgur.com/YfJQV5z.png?id=154', 155);
INSERT INTO "Product" ("id", "name", "description", "price", "imageUrl", "stock") VALUES ('9ec6903f-3eea-4465-81e7-3d11bf012c70', 'Ebook Collection', 'An online course to master web development.', 47, 'https://i.imgur.com/YfJQV5z.png?id=160', 801);
INSERT INTO "Product" ("id", "name", "description", "price", "imageUrl", "stock") VALUES ('328ed5cd-0752-4bf3-8ecf-29c4ba6ca2a2', 'Ebook Collection', 'An online course to master web development.', 915, 'https://i.imgur.com/YfJQV5z.png?id=166', 339);
INSERT INTO "Product" ("id", "name", "description", "price", "imageUrl", "stock") VALUES ('4e05b457-81b6-41f2-a9e5-c0dcaf57d87a', 'Ebook Collection', 'A bundle of popular ebooks across various genres.', 545, 'https://i.imgur.com/YfJQV5z.png?id=172', 833);
INSERT INTO "Product" ("id", "name", "description", "price", "imageUrl", "stock") VALUES ('6387e95c-230a-4053-8ec6-18e7d662ad32', 'Music Album', 'A compilation of the latest music tracks.', 168, 'https://i.imgur.com/YfJQV5z.png?id=178', 466);

INSERT INTO "BlogPost" ("id", "title", "content", "imageUrl", "userId") VALUES ('9e96631d-7d0c-440c-ab5d-c04b96d435e2', 'The Rise of Cryptocurrency Payments', 'Cryptocurrency is revolutionizing online payments. Learn how to integrate crypto payments into your ecommerce platform.', 'https://i.imgur.com/YfJQV5z.png?id=183', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "BlogPost" ("id", "title", "content", "imageUrl", "userId") VALUES ('9e263a75-82dc-41a3-9bf9-5753180f9110', 'Exploring the Future of Ecommerce', 'SEO is crucial for online success. Follow these tips to improve your stores visibility and attract more customers.', 'https://i.imgur.com/YfJQV5z.png?id=187', 'c986e505-7c4e-4ddf-9dda-53c5feea4e3f');
INSERT INTO "BlogPost" ("id", "title", "content", "imageUrl", "userId") VALUES ('4271c323-e0b7-4ae9-8370-d011798c246e', 'Exploring the Future of Ecommerce', 'Progressive Web Apps offer numerous advantages for businesses. Find out how they can enhance your user experience.', 'https://i.imgur.com/YfJQV5z.png?id=191', '2a5e5a0e-31fd-46f3-afa3-27b32efd2601');
INSERT INTO "BlogPost" ("id", "title", "content", "imageUrl", "userId") VALUES ('bdfeeae4-6eef-45e0-a85a-73da5f663f94', 'The Benefits of Using PWA for Your Business', 'In this article we delve into the latest trends shaping the ecommerce industry and what to expect in the coming years.', 'https://i.imgur.com/YfJQV5z.png?id=195', '2ba01969-4ad4-471c-8123-c989a147925f');
INSERT INTO "BlogPost" ("id", "title", "content", "imageUrl", "userId") VALUES ('e724c846-34e3-429f-88e1-03c65883a9f3', 'Exploring the Future of Ecommerce', 'In this article we delve into the latest trends shaping the ecommerce industry and what to expect in the coming years.', 'https://i.imgur.com/YfJQV5z.png?id=199', 'cc763639-a771-4c2a-8516-c3ccce70aaaa');
INSERT INTO "BlogPost" ("id", "title", "content", "imageUrl", "userId") VALUES ('36f6aa0d-77b1-4615-a8d8-94b5def08543', 'Top 10 Digital Products to Sell Online', 'Progressive Web Apps offer numerous advantages for businesses. Find out how they can enhance your user experience.', 'https://i.imgur.com/YfJQV5z.png?id=203', 'cc763639-a771-4c2a-8516-c3ccce70aaaa');
INSERT INTO "BlogPost" ("id", "title", "content", "imageUrl", "userId") VALUES ('51bb394b-c88e-415c-bcb8-b690c7a175dc', 'The Rise of Cryptocurrency Payments', 'Cryptocurrency is revolutionizing online payments. Learn how to integrate crypto payments into your ecommerce platform.', 'https://i.imgur.com/YfJQV5z.png?id=207', 'e3768a9b-736a-41b5-b62c-e29d76529b08');
INSERT INTO "BlogPost" ("id", "title", "content", "imageUrl", "userId") VALUES ('1db6f503-00d2-45e3-8564-0c50ef56c74e', 'The Rise of Cryptocurrency Payments', 'Cryptocurrency is revolutionizing online payments. Learn how to integrate crypto payments into your ecommerce platform.', 'https://i.imgur.com/YfJQV5z.png?id=211', 'e3768a9b-736a-41b5-b62c-e29d76529b08');
INSERT INTO "BlogPost" ("id", "title", "content", "imageUrl", "userId") VALUES ('4ff37c2d-cb2e-4def-9912-7b16c9605353', 'Top 10 Digital Products to Sell Online', 'In this article we delve into the latest trends shaping the ecommerce industry and what to expect in the coming years.', 'https://i.imgur.com/YfJQV5z.png?id=215', '2448c2f0-5cbd-4b4b-a86a-7b0844d1605b');
INSERT INTO "BlogPost" ("id", "title", "content", "imageUrl", "userId") VALUES ('42f460ce-0df0-41f5-a252-b20824653562', 'Exploring the Future of Ecommerce', 'Cryptocurrency is revolutionizing online payments. Learn how to integrate crypto payments into your ecommerce platform.', 'https://i.imgur.com/YfJQV5z.png?id=219', 'c986e505-7c4e-4ddf-9dda-53c5feea4e3f');

INSERT INTO "Order" ("id", "totalAmount", "status", "shippingAddress", "billingAddress", "userId") VALUES ('09b00fb6-75ae-4226-9252-13fe43d05d88', 532, 'Shipped', '223 42 E 20th St, New York, NY 10003', '224 18 W 29th St, New York, NY 10001', 'cc763639-a771-4c2a-8516-c3ccce70aaaa');
INSERT INTO "Order" ("id", "totalAmount", "status", "shippingAddress", "billingAddress", "userId") VALUES ('71c677c0-9772-4df0-9899-13c80083614e', 354, 'Cancelled', '228 430 Lafayette St, New York, NY 10003', '229 42 E 20th St, New York, NY 10003', '2ba01969-4ad4-471c-8123-c989a147925f');
INSERT INTO "Order" ("id", "totalAmount", "status", "shippingAddress", "billingAddress", "userId") VALUES ('8c36ceed-84eb-4535-8637-2a1c703e74c6', 42, 'Shipped', '233 136 E 13th St, New York, NY 10003', '234 18 Spring St, New York, NY 10012', '791f81f2-173d-4717-b233-853cdfe2c706');
INSERT INTO "Order" ("id", "totalAmount", "status", "shippingAddress", "billingAddress", "userId") VALUES ('ba0d490f-a4ba-4669-95ea-eebd7a012490', 628, 'Shipped', '238 136 E 13th St, New York, NY 10003', '239 430 Lafayette St, New York, NY 10003', 'd77c1795-0a3c-4e81-a1ce-36d7b69b4dfb');
INSERT INTO "Order" ("id", "totalAmount", "status", "shippingAddress", "billingAddress", "userId") VALUES ('9534ffcd-7a74-476a-9e69-95f21226b7f6', 827, 'Cancelled', '243 42 E 20th St, New York, NY 10003', '244 136 E 13th St, New York, NY 10003', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Order" ("id", "totalAmount", "status", "shippingAddress", "billingAddress", "userId") VALUES ('8e80025d-dbe7-4241-ba74-5e310e889b86', 953, 'Processing', '248 443 E 6th St, New York, NY 10009', '249 18 Spring St, New York, NY 10012', 'e5e8471b-1537-48b7-a38e-5178f2e5c67c');
INSERT INTO "Order" ("id", "totalAmount", "status", "shippingAddress", "billingAddress", "userId") VALUES ('a5c9f376-dc7d-4de8-8085-cf3085aaf89b', 600, 'Cancelled', '253 430 Lafayette St, New York, NY 10003', '254 91 Christopher St, New York, NY 10014', 'd77c1795-0a3c-4e81-a1ce-36d7b69b4dfb');
INSERT INTO "Order" ("id", "totalAmount", "status", "shippingAddress", "billingAddress", "userId") VALUES ('0099dc00-993a-4e71-b60d-44d2571874cf', 225, 'Shipped', '258 430 Lafayette St, New York, NY 10003', '259 18 Spring St, New York, NY 10012', '791f81f2-173d-4717-b233-853cdfe2c706');
INSERT INTO "Order" ("id", "totalAmount", "status", "shippingAddress", "billingAddress", "userId") VALUES ('dc70d995-42b2-424f-a88e-fa971f287e05', 652, 'Pending', '263 330 W Broadway, New York, NY 10013', '264 136 E 13th St, New York, NY 10003', 'cc763639-a771-4c2a-8516-c3ccce70aaaa');
INSERT INTO "Order" ("id", "totalAmount", "status", "shippingAddress", "billingAddress", "userId") VALUES ('d65e6de1-cbf2-4c13-9072-12ae667b4a4d', 855, 'Cancelled', '268 18 W 29th St, New York, NY 10001', '269 91 Christopher St, New York, NY 10014', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "OrderItem" ("id", "quantity", "unitPrice", "totalPrice", "orderId", "productId") VALUES ('ff22aa74-3f7e-42c1-a628-004a437ab6a4', 579, 613, 259, 'a5c9f376-dc7d-4de8-8085-cf3085aaf89b', '328ed5cd-0752-4bf3-8ecf-29c4ba6ca2a2');
INSERT INTO "OrderItem" ("id", "quantity", "unitPrice", "totalPrice", "orderId", "productId") VALUES ('a311735a-06a9-4500-b23d-a13fc667e68a', 912, 534, 77, '9534ffcd-7a74-476a-9e69-95f21226b7f6', 'e4dce771-74b8-499f-9ddc-ac13d7fe4d36');
INSERT INTO "OrderItem" ("id", "quantity", "unitPrice", "totalPrice", "orderId", "productId") VALUES ('0e9a92e8-507a-4ac1-8b8c-e0fdab68e4fc', 962, 467, 789, 'd65e6de1-cbf2-4c13-9072-12ae667b4a4d', '8db1faf3-6cda-4065-a00e-509756d89212');
INSERT INTO "OrderItem" ("id", "quantity", "unitPrice", "totalPrice", "orderId", "productId") VALUES ('c497b2e4-f308-4aa1-b043-3adfcc6d257d', 313, 114, 749, 'dc70d995-42b2-424f-a88e-fa971f287e05', 'e4dce771-74b8-499f-9ddc-ac13d7fe4d36');
INSERT INTO "OrderItem" ("id", "quantity", "unitPrice", "totalPrice", "orderId", "productId") VALUES ('28082f93-a241-4fc6-883a-5247667e6432', 238, 92, 805, '9534ffcd-7a74-476a-9e69-95f21226b7f6', 'dac3682c-a514-4458-ad8c-4b99bccd3467');
INSERT INTO "OrderItem" ("id", "quantity", "unitPrice", "totalPrice", "orderId", "productId") VALUES ('2bf9f1fe-d6eb-4e2a-91d5-ff206f7c4837', 88, 448, 843, 'dc70d995-42b2-424f-a88e-fa971f287e05', 'e4dce771-74b8-499f-9ddc-ac13d7fe4d36');
INSERT INTO "OrderItem" ("id", "quantity", "unitPrice", "totalPrice", "orderId", "productId") VALUES ('6799d995-69ea-4fae-b8a8-07ae49645eff', 411, 602, 274, '8c36ceed-84eb-4535-8637-2a1c703e74c6', '9ec6903f-3eea-4465-81e7-3d11bf012c70');
INSERT INTO "OrderItem" ("id", "quantity", "unitPrice", "totalPrice", "orderId", "productId") VALUES ('54754093-44b3-4cdf-83dd-7c037249ddc3', 377, 59, 324, 'dc70d995-42b2-424f-a88e-fa971f287e05', '6387e95c-230a-4053-8ec6-18e7d662ad32');
INSERT INTO "OrderItem" ("id", "quantity", "unitPrice", "totalPrice", "orderId", "productId") VALUES ('3385fd2b-e8ee-4b2c-bb90-deff072d4643', 689, 24, 765, '9534ffcd-7a74-476a-9e69-95f21226b7f6', 'abeb66f0-f42a-4e2c-8f3e-0eb441e34a28');
INSERT INTO "OrderItem" ("id", "quantity", "unitPrice", "totalPrice", "orderId", "productId") VALUES ('783165e1-de2c-4dbc-b2d3-1cf19b499299', 712, 231, 953, '9534ffcd-7a74-476a-9e69-95f21226b7f6', 'e20cfa97-a69e-44b8-b5b5-257fa878b943');

INSERT INTO "CartItem" ("id", "quantity", "userId", "productId") VALUES ('d4ff4016-0173-455a-b2b9-65bee5a4f895', 425, 'c986e505-7c4e-4ddf-9dda-53c5feea4e3f', '6387e95c-230a-4053-8ec6-18e7d662ad32');
INSERT INTO "CartItem" ("id", "quantity", "userId", "productId") VALUES ('f8da835c-bf59-4256-8b18-843ce3dc9df3', 940, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '328ed5cd-0752-4bf3-8ecf-29c4ba6ca2a2');
INSERT INTO "CartItem" ("id", "quantity", "userId", "productId") VALUES ('2928a8ae-7495-47ce-80cd-129dd736d485', 976, 'c986e505-7c4e-4ddf-9dda-53c5feea4e3f', '328ed5cd-0752-4bf3-8ecf-29c4ba6ca2a2');
INSERT INTO "CartItem" ("id", "quantity", "userId", "productId") VALUES ('7a3c3051-6e13-489e-8cef-7ffe72b3950f', 816, 'cc763639-a771-4c2a-8516-c3ccce70aaaa', 'e20cfa97-a69e-44b8-b5b5-257fa878b943');
INSERT INTO "CartItem" ("id", "quantity", "userId", "productId") VALUES ('e6d6a426-bffd-46da-a554-9de1b5b03b87', 445, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'e20cfa97-a69e-44b8-b5b5-257fa878b943');
INSERT INTO "CartItem" ("id", "quantity", "userId", "productId") VALUES ('9e462207-9c4f-4480-ba6d-15a6a2414384', 575, 'e5e8471b-1537-48b7-a38e-5178f2e5c67c', '9ec6903f-3eea-4465-81e7-3d11bf012c70');
INSERT INTO "CartItem" ("id", "quantity", "userId", "productId") VALUES ('0165d287-4a22-4ba8-b13e-87d58ed4dfae', 642, '2a5e5a0e-31fd-46f3-afa3-27b32efd2601', 'dac3682c-a514-4458-ad8c-4b99bccd3467');
INSERT INTO "CartItem" ("id", "quantity", "userId", "productId") VALUES ('06d0fe42-0dd1-42cb-80b9-5c83c2a3f8b1', 838, 'd77c1795-0a3c-4e81-a1ce-36d7b69b4dfb', '328ed5cd-0752-4bf3-8ecf-29c4ba6ca2a2');
INSERT INTO "CartItem" ("id", "quantity", "userId", "productId") VALUES ('a57e6934-48cd-4261-a2f1-2d814d45a199', 620, '2ba01969-4ad4-471c-8123-c989a147925f', 'dac3682c-a514-4458-ad8c-4b99bccd3467');
INSERT INTO "CartItem" ("id", "quantity", "userId", "productId") VALUES ('af886ace-1a38-4561-9f91-9ccf5716addb', 735, 'd77c1795-0a3c-4e81-a1ce-36d7b69b4dfb', '6387e95c-230a-4053-8ec6-18e7d662ad32');

INSERT INTO "Transaction" ("id", "amount", "status", "paymentMethod", "transactionDate", "orderId", "userId") VALUES ('03de0a7e-786e-47ba-b09e-4e7317dd1da2', 229, 'pending', 'Litecoin', '2024-01-27T00:00:34.389Z', 'a5c9f376-dc7d-4de8-8085-cf3085aaf89b', '791f81f2-173d-4717-b233-853cdfe2c706');
INSERT INTO "Transaction" ("id", "amount", "status", "paymentMethod", "transactionDate", "orderId", "userId") VALUES ('938410e6-ca86-4a5e-aac3-ec2e7cca765e', 495, 'completed', 'Bitcoin', '2024-11-17T10:36:10.009Z', '09b00fb6-75ae-4226-9252-13fe43d05d88', '2448c2f0-5cbd-4b4b-a86a-7b0844d1605b');
INSERT INTO "Transaction" ("id", "amount", "status", "paymentMethod", "transactionDate", "orderId", "userId") VALUES ('4ae5dcb4-6514-45aa-bd84-ceec57944787', 289, 'failed', 'Bitcoin', '2025-09-16T23:39:13.432Z', 'd65e6de1-cbf2-4c13-9072-12ae667b4a4d', 'e3768a9b-736a-41b5-b62c-e29d76529b08');
INSERT INTO "Transaction" ("id", "amount", "status", "paymentMethod", "transactionDate", "orderId", "userId") VALUES ('2c92aceb-c14a-428d-b8be-918b002ffdc5', 600, 'pending', 'Ethereum', '2024-10-29T08:23:03.595Z', '8e80025d-dbe7-4241-ba74-5e310e889b86', '2ba01969-4ad4-471c-8123-c989a147925f');
INSERT INTO "Transaction" ("id", "amount", "status", "paymentMethod", "transactionDate", "orderId", "userId") VALUES ('2522476d-112c-4a11-ab27-9d6ffade50b0', 75, 'refunded', 'Ethereum', '2025-06-20T11:17:40.728Z', 'dc70d995-42b2-424f-a88e-fa971f287e05', 'd77c1795-0a3c-4e81-a1ce-36d7b69b4dfb');
INSERT INTO "Transaction" ("id", "amount", "status", "paymentMethod", "transactionDate", "orderId", "userId") VALUES ('c8344372-ccdd-4293-9fc0-a25d11be5095', 42, 'failed', 'Ethereum', '2023-11-18T19:36:16.635Z', '9534ffcd-7a74-476a-9e69-95f21226b7f6', 'd77c1795-0a3c-4e81-a1ce-36d7b69b4dfb');
INSERT INTO "Transaction" ("id", "amount", "status", "paymentMethod", "transactionDate", "orderId", "userId") VALUES ('6cc05629-d7fb-4a09-9716-2f2dbe5e741f', 422, 'pending', 'Bitcoin', '2025-07-11T00:23:41.030Z', 'd65e6de1-cbf2-4c13-9072-12ae667b4a4d', '2a5e5a0e-31fd-46f3-afa3-27b32efd2601');
INSERT INTO "Transaction" ("id", "amount", "status", "paymentMethod", "transactionDate", "orderId", "userId") VALUES ('610980c8-4a22-4f13-ae4e-0e74c1280692', 488, 'completed', 'Bitcoin', '2025-01-03T02:48:10.999Z', '71c677c0-9772-4df0-9899-13c80083614e', '2a5e5a0e-31fd-46f3-afa3-27b32efd2601');
INSERT INTO "Transaction" ("id", "amount", "status", "paymentMethod", "transactionDate", "orderId", "userId") VALUES ('16ef958d-695e-4c00-8788-1a478479eba1', 54, 'completed', 'Bitcoin', '2024-03-08T07:39:41.886Z', 'ba0d490f-a4ba-4669-95ea-eebd7a012490', 'e3768a9b-736a-41b5-b62c-e29d76529b08');
INSERT INTO "Transaction" ("id", "amount", "status", "paymentMethod", "transactionDate", "orderId", "userId") VALUES ('e4de3b0f-eb1a-444e-ae7a-a7de6e7a5991', 377, 'failed', 'Bitcoin', '2023-12-23T11:59:16.326Z', '9534ffcd-7a74-476a-9e69-95f21226b7f6', '791f81f2-173d-4717-b233-853cdfe2c706');

INSERT INTO "Settings" ("id", "preference1", "preference2", "userId") VALUES ('14318811-0932-45ba-b7db-8ea1de4479b0', 'Notifications Off', 'BTC', '791f81f2-173d-4717-b233-853cdfe2c706');
INSERT INTO "Settings" ("id", "preference1", "preference2", "userId") VALUES ('e486d93c-8d1f-4274-a806-93bab98f30ca', 'Notifications Off', 'LTC', 'e5e8471b-1537-48b7-a38e-5178f2e5c67c');
INSERT INTO "Settings" ("id", "preference1", "preference2", "userId") VALUES ('889d276c-bcfd-4159-9e20-d3843b0a2a68', 'Dark Mode', 'LTC', 'e3768a9b-736a-41b5-b62c-e29d76529b08');
INSERT INTO "Settings" ("id", "preference1", "preference2", "userId") VALUES ('e0ca866e-3b04-4d71-ae4c-6e120f579925', 'Dark Mode', 'BTC', '2ba01969-4ad4-471c-8123-c989a147925f');
INSERT INTO "Settings" ("id", "preference1", "preference2", "userId") VALUES ('7be0b692-2ec8-4a34-a908-f28774b91358', 'Notifications Off', 'USD', '2448c2f0-5cbd-4b4b-a86a-7b0844d1605b');
INSERT INTO "Settings" ("id", "preference1", "preference2", "userId") VALUES ('6b229bdf-d684-47ae-8ca9-5ce44952a842', 'AutoUpdate Enabled', 'USD', 'cc763639-a771-4c2a-8516-c3ccce70aaaa');
INSERT INTO "Settings" ("id", "preference1", "preference2", "userId") VALUES ('2143eb57-21c6-4235-a227-37a5994f8375', 'Notifications On', 'EUR', 'c986e505-7c4e-4ddf-9dda-53c5feea4e3f');
INSERT INTO "Settings" ("id", "preference1", "preference2", "userId") VALUES ('3289990a-4662-4744-908d-2dc17c102ef5', 'Light Mode', 'ETH', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Settings" ("id", "preference1", "preference2", "userId") VALUES ('a7b3f23a-21f4-4178-b2b7-f68cb9ff4865', 'Dark Mode', 'LTC', '2a5e5a0e-31fd-46f3-afa3-27b32efd2601');
INSERT INTO "Settings" ("id", "preference1", "preference2", "userId") VALUES ('30ab3018-df61-4ad8-9cab-9333eb972494', 'Dark Mode', 'BTC', 'd77c1795-0a3c-4e81-a1ce-36d7b69b4dfb');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
