var mysql = require("mysql");
// var table = require('cli-table');
var table = require("console.table");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",

	password: "password",
    database: "bamazonDB"

});

// connect to the mysql server and sql database
function productItems() {
	connection.connect(function(err) {

		connection.query("SELECT * FROM products", function(err, result) {
		if (err) throw err
		else console.table(result , "\n");
		productId();
		});
	});
}
productItems();

// ask user for input for Item ID
function productId() {

	inquirer.prompt([

		{
		 type: "input",
		 name: "id",
		 message: "Please enter the Forzen Item ID of the product you would like to buy.\n",
		 validate: function(value) {
		 	if (!isNaN(value) && value < 12) {
		 		return true;
		 	}
		 	return false;
		 }
		},

		{
		 type: "input",
		 name: "quant",
		 message: "How many units of the frozen product would you like to buy? \n",
		 validate: function(value) {
		 	if (!isNaN(value)) {
		 		return true;
		 	}
		 	return false;
			}
		}

		]).then(function(answer) {

			var userId = answer.id;
			console.log("Chosen item id: " , userId);

			var userQuant = answer.quant;
			console.log("Chosen quantity from stock: " , userQuant , "\n");

			connection.query("SELECT * FROM products WHERE ?", [{ item_id : answer.id }], function(err, result) {
				if (err) throw err;
				
				
				console.table(result);
				var current_quantity = result[0].stock_quantity;
				console.log("Current quantity in stock: " , current_quantity);
				var price = result[0].price;
				var remaining_quantity = current_quantity - answer.quant;
				console.log("Remaining quantity in stock: " , remaining_quantity);

				if(current_quantity > answer.quant) {

					console.log("Amount Remaining: " + remaining_quantity);
					console.log("Total Cost: " + (answer.quant * price) + "\n");

					connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?",
                    [
                    remaining_quantity, answer.id
                    ],

					
						function(err, result){
							console.table(result);
						});

					connection.query("SELECT * FROM products", function(err, result) {

						console.log("This is the updated inventory of product items: ");
						console.log("------------------------------- \n");
						console.table(result);
					});

				} else {
					console.log("Insufficient amounts, please edit your units!");
				}

			connection.end();

			});
		})

}