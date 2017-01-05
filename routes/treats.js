var router = require('express').Router(); // DO NOT MODIFY
var pg = require('pg'); // DO NOT MODIFY
var  connectionString = 'postgres://localhost:5432/treatDB'; // database name treatDB

// GET /treats
router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }//end if
    /** ---- YOUR CODE BELOW ---- **/
    // Add pg and pSQL code here to get treats from the treatDB
    else{
      console.log('connected to db in app.get');
      var query = client.query('SELECT * from treats');
      var allTreats = [];
      query.on('row', function(row){
        allTreats.push(row);
      });
      query.on('end', function(){
        done();
        console.log(allTreats);
        res.send(allTreats);
      });
    }//end else
  });//end pg.connect
});//end router.get

/** ---- YOUR CODE BELOW ---- **/

// POST /treats
router.post('/', function(req,res){
  console.log('req.body', req.body);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    }//end if
    else{
      console.log('connected to treatsDB!');
      client.query('INSERT INTO treats(name, description, pic) values($1, $2, $3)',[req.body.name, req.body.description, req.body.pic]);
      done();
      res.send('you did it!');
    }//end else
  });//end pg.connect
});//end router.post

// PUT /treats/<id>
router.put('/:id', function(req, res){
  var id = req.params.id;
  console.log("id:", id);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else{
        console.log('connected in router.put');
        client.query('UPDATE treats SET name = $1, description = $2, pic = $3 WHERE id = $4', [req.body.name, req.body.description, req.body.pic, id]);
        done();
        res.send('go');
    }
  });
});//end router.put
// DELETE /treats/<id>

/** ---- DO NOT MODIFY BELOW ---- **/
module.exports = router;
