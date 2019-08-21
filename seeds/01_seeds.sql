insert into users (name, email, password) values ('Ray Jiang', 'rayjiang@ymail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
insert into users (name, email, password) values ('Yu Yue', 'yuyue@ymail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
insert into users (name, email, password) values ('Tony Chow', 'tonychow@ymail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


insert into properties(title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code) 
VALUES ('Grey House', 'description', 1, 'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg', 'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg?auto=compress&cs=tinysrgb&h=350', 34565, 0, 1, 1, true, 'Men And Labrador', 'Panda', 'Canada', '9999 Cuzo Trail', '08409');
insert into properties(title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code) 
VALUES ('Black House', 'description', 2, 'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg', 'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg?auto=compress&cs=tinysrgb&h=350', 34565, 0, 2, 2, true, 'Woman And Labrador', 'King', 'Canada', '1832 Cuzo Trail', '08409');
insert into properties(title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code) 
VALUES ('Grey House', 'description', 3, 'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg', 'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg?auto=compress&cs=tinysrgb&h=350', 34565, 0, 3, 3, true, 'Bootcamp And Labrador', 'Kong', 'Canada', '1848 Cuzo Trail', '08409');

insert into reservations(start_date, end_date, property_id, guest_id)
values('2022-09-30','2022-09-30', 1, 1);
insert into reservations(start_date, end_date, property_id, guest_id)
values('2022-10-30','2022-12-30', 2, 2);
insert into reservations(start_date, end_date, property_id, guest_id)
values('2022-11-30','2022-12-29', 3, 3);


insert into property_reviews(guest_id, property_id, reservation_id, rating, message)
values(1 ,2, 8, 2, 'message');
insert into property_reviews(guest_id, property_id, reservation_id, rating, message)
values(2,1, 9, 3, 'message');
insert into property_reviews(guest_id, property_id, reservation_id, rating, message)
values(3,3, 10, 2, 'message');
