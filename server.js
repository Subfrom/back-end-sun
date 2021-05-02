var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
const { message } = require('statuses');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// home
app.get('/', (req, res) => {
    return res.send({
        error: false,
        message: "Welocome to REST API With NODEJS",
        written_by: 'Thannakrit',
        published_on: 'https://subfrom.dev'
    });
  });

  // connect DB
  var conn = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456789',
      database: 'back-endtesting'
  });
  conn.connect();

    // get all menu
  app.get('/menucoffees', (req, res) => {
    conn.query('SELECT * FROM menucoffee', (error, results, fields) => {
        if (error) throw error;

        let message = ""
        if (results === undefined || results.length == 0) {
            message = "menucoffees table is empty";
        } else {
            message = "Successfully retrieved all menucoffees";
        }
        return res.send({ error: false, data: results, message: message});
    })
})

    // post menu
    app.post('/addmenucoffee', (req, res) => {
        var name = req.body.name;
        var price_hot = req.body.price_hot;
        var price_iced = req.body.price_iced;

        if(!name | !price_hot | !price_iced){
            return res.status(400).send({
                error: true,
                message: "Please provide name and price_hot and price_iced"
            })
        } else {
            conn.query('INSERT INTO menucoffee (name, price_hot, price_iced) VALUES (?,?,?)', [name, price_hot, price_iced], (error, results, fields) => {
                if(error) throw error;
                return res.send({
                    error: false,
                    data: results,
                    message: "Menu Coffee Successfully added"
                })
            })
        }
    })

    // select menu by id
    app.get('/menucoffee/:id', (req, res) => {
        var id = req.params.id;

        if(!id){
            return res.status(400).send({
                error: true,
                message: "Please provide menucoffee id"
            });
        } else {
            conn.query('SELECT * FROM menucoffee WHERE id = ?', id, (error, results, fields) => {
                if (error) throw error;

                var message = "";
            if (results === undefined || results.length == 0) {
                message = "menucoffee not found";
            } else {
                message = "Successfully retrieved menucoffee data";
            }

            return res.send({ error: false, data: results[0], message: message })
        })
    }
})

    // update menucoffee with id 
    app.put('/menucoffee', (req, res) => {
    var id = req.body.id;
    var name = req.body.name;
    var price_hot = req.body.price_hot;
    var price_iced = req.body.price_iced;

    // validation
    if (!id || !name || !price_hot | !price_iced) {
        return res.status(400).send({ error: true, message: 'Please provide menucoffee id, name and price_hot and price_iced'});
    } else {
        conn.query('UPDATE menucoffee SET name = ?, price_hot = ?, price_iced = ? WHERE id = ?', [name, price_hot, price_iced, id], (error, results, fields) => {
            if (error) throw error;

            var message = "";
            if (results.changedRows === 0) {
                message = "menucoffee not found or data are same";
            } else {
                message = "menucoffee successfully updated";
            }

            return res.send({ error: false, data: results, message: message })
        })
    }
})

    // delete menucoffee by id
    app.delete('/menucoffee', (req, res) => {
    var id = req.body.id;

    if (!id) {
        return res.status(400).send({ error: true, message: "Please provide menucoffee id"});
    } else {
        conn.query('DELETE FROM menucoffee WHERE id = ?', [id], (error, results, fields) => {
            if (error) throw error;

            var message = "";
            if (results.affectedRows === 0) {
                message = "menucoffee not found";
            } else {
                message = "menucoffee successfully deleted";
            }

            return res.send({ error: false, data: results, message: message })
        })
    }
})

    // Order menu coffee
    app.post('/ordermenucoffee', (req, res) => {
        var name1 = req.body.name1;

        conn.query('SELECT * FROM menucoffee WHERE name = ?', [name1], (error, results, fields) => {

        if(results != 0){
            var ordernum = req.body.ordernum;
            var ordername = req.body.name1;
            var resultsout = results;
            var typecoffee = req.body.typecoffee;
            // var price = resultsout[0].price_hot;
            if(typecoffee == 1){
                var price = resultsout[0].price_hot;
                var num = ordernum * price;
                conn.query('INSERT INTO ordermenucoffee (ordername, ordernum, typecoffee, tolprice) VALUES (?,?,?,?)', [ordername, ordernum, typecoffee, num], (error, results, fields) => {
                    if(error) throw error;
                    return res.send({
                        error: false,
                        data: results,
                        message: "Order Coffee Successfully"
                    })
                })
            } else {
                var price = resultsout[0].price_iced;
                var num = ordernum * price;
                conn.query('INSERT INTO ordermenucoffee (ordername, ordernum, typecoffee, tolprice) VALUES (?,?,?,?)', [ordername, ordernum, typecoffee, num], (error, results, fields) => {
                    if(error) throw error;
                    return res.send({
                        error: false,
                        data: results,
                        message: "Order Coffee Successfully"
                    })
                })
            }          
        } else {
            return res.status(404).send({error: true, data: results, message: "No MenuCoffee In DataBase"})
        }
    })
    })

    // get Order all
    app.get('/ordermenucoffees', (req, res) => {
        conn.query('SELECT * FROM ordermenucoffee', (error, results, fields) => {
            if (error) throw error;
    
            let message = ""
            if (results === undefined || results.length == 0) {
                message = "ordermenucoffee table is empty";
            } else {
                message = "Successfully retrieved all ordermenucoffee";
            }
            return res.send({ error: false, data: results, message: message});
        })
    })


  app.listen(3000, () => {
      console.log('Server Is Runing On Port 3000');
  })

  module.exports = app;