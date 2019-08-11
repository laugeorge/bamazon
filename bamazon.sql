DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE Frozen (
 item_id INTEGER NOT NULL AUTO_INCREMENT,
 product_name VARCHAR (70),
 department_name VARCHAR (50),
 price DECIMAL(10,2),
 stock_quantity INTEGER (10) NULL,
 
 PRIMARY KEY (item_id)
 
);



INSERT INTO Frozen (product_name, department_name, price, stock_quantity)
VALUES ("Ice Cream Sandwich", "Ice Cream", 3.00, 500),
("Mochi Ice Cream", "Ice Cream", 6.00, 100),
("Gelato", "Ice Cream", 10.00, 80),
("Four Cheese Pizza", "Pizza", 6.00, 100),
("Frozen Mixed Fruit", "Fruits and Veggies", .00, 200),
("Frozen Vegetables", "Fruits and Veggies", 40.00, 300),
("Turkey Sausage, Egg Whites, and Cheese Muffin Sandwich", "Breakfast", 12.00, 150),
("Sausage, Egg and Cheese Griddlecake", "Breakfast", 15.00, 80),
("Lasagna", "Pasta", 8.00, 180),
("Atlantic Salmon", "Meats and Fish", 20.00, 80),
("All Natural Chicken Nuggets", "Meats and Fish", 9.00, 150);

SELECT *FROM Frozen;