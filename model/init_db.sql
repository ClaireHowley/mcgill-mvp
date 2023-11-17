--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists movies;
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE movies (
    MovieID INT AUTO_INCREMENT PRIMARY KEY, 
    MovieName VARCHAR(255), 
    MovieDirector VARCHAR(255), 
    MovieYear VARCHAR(255), 
    MovieGenre VARCHAR(255), 
    MovieLength VARCHAR(255)
);

   DROP TABLE IF EXISTS `users`; 
   DROP TABLE IF EXISTS `favourites`; 

  INSERT INTO movies 
  (MovieName, MovieDirector, MovieYear, MovieGenre, MovieLength)
  VALUES
     ('Mean Streets', 'Martin Scorsese', '1973', 'Drama, Crime', '112'),
     ('The Godfather Part II', 'Francis Ford Coppola', '1974', 'Drama, Crime', '202'),
     ('Taxi Driver', 'Martin Scorsese', '1976', 'Drama, Crime', '104'),
     ('New York, New York', 'Martin Scorsese', '1977', 'Drama, Musical', '163'),
     ('The Deer Hunter', 'Michael Cimino', '1978', 'Drama, War', '183'),
     ('Once Upon a Time in America', 'Sergio Leone', '1984', 'Drama, Crime', '251'),
     ('Midnight Run', 'Martin Brest', '1988', 'Action, Comedy', '126'),
     ('Goodfellas', 'Martin Scorsese', '1990', 'Drama, Crime', '146'),
     ('A Bronx Tale', 'Robert De Niro', '1993', 'Drama, Crime', '121'),
     ('Jackie Brown', 'Quentin Tarantino', '1998', 'Drama, Crime', '154'),
     ('Meet the Parents', 'Jay Roach', '2000', 'Comedy', '108'),
     ('The Adventures of Rocky and Bullwinkle', 'Des McAnuff', '2000', 'Family, Comedy', '92'),
     ('Meet the Fockers', 'Jay Roach', '2004', 'Comedy', '115'),
     ('The Good Shepherd', 'Robert De Niro', '2007', 'Drama, Thriller', '167'),
     ('Righteous Kill', 'Jon Avnet', '2008', 'Drama, Action', '101'),
     ('Limitless', 'Neil Burger', '2011', 'Action, Thriller', '105'),
     ('Silver Linings Playbook', 'David O. Russell', '2012', 'Drama, Romance', '122'),
     ('The Intern', 'Nancy Meyers', '2015', 'Drama, Comedy', '121'),
     ('Dirty Grandpa', 'Dan Mazer', '2016', 'Comedy', '102'),
     ('The Irishman', 'Martin Scorsese', '2019', 'Drama, Crime', '209');



CREATE TABLE users(
    userid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL
);

CREATE TABLE favourites(
   favouriteid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   userid INT NOT NULL,
   movieid INT NOT NULL
);



ALTER TABLE
`favourites` ADD CONSTRAINT `favourites_user id_foreign` FOREIGN KEY(`userid`) REFERENCES `users`(`userid`);
ALTER TABLE
`favourites` ADD CONSTRAINT `favourites_movie id_foreign` FOREIGN KEY(`movieid`) REFERENCES `movies`(`MovieID`);