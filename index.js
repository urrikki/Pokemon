const express = require("express");
const dbo = require("./db/db");
const app = express();
const port = 4444;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

dbo.connectToServer();
app.use(bodyParser.urlencoded({ extended: true }));

/*
suite du code ici
*/

app.get("/", function (req, res) {
    res.send("Hello world");
  });

/* index.js code before... */
app.get("/pokemon/list", function (req, res) {
    //on se connecte à la DB MongoDB
    const dbConnect = dbo.getDb();
    //premier test permettant de récupérer mes pokemons !
    dbConnect
      .collection("pokemonName")
      .find({}) // permet de filtrer les résultats
      /*.limit(50) // pourrait permettre de limiter le nombre de résultats */
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching pokemons!");
        } else {
          res.json(result);
        }
      });
      /*
      Bref lisez la doc, 
      il y a plein de manières de faire ce qu'on veut :) 
      */
      
  });

  app.get('/something', (req, res) => {
    const color1 = req.query.color1;
    const color2 = req.query.color2;
    /* 
    Traitement du code ensuite...
    */
})

app.post('/pokemon/insert', jsonParser, (req, res) => {
    const body = req.body;
    const dbConnect = dbo.getDb();
    console.log('Got body:', body);
    var name = body.name
    dbConnect
        .collection("pokemonName")
        .insertOne({
            name:name
        })
    //on code ensuite l'insertion dans mongoDB, lisez la doc hehe !!
    res.json("A bien étais ajouté");

});

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});

/*
node index.js
*/