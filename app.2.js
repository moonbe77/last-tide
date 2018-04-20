const express = require ('express')
const mysql = require('mysql')
var app = express()

app.get('/', (req,res) =>{
    //paso como callback una fucnion que ejecuta el respones
    getSQL(function(err, result) { 
            // console.log('json:', result);  
            if(err) throw err
            res.json(result)
        });
})
app.listen(8000, () =>{
    // console.log('app on port 8000')
})

function getSQL(callback) {
    var connection = mysql.createConnection({
        host : 'sql121.main-hosting.eu',
        user : 'u865215954_marea',
        password : 'cnsm3314',
        database : 'u865215954_marea',        
    });
    connection.connect();    
    var json = '';
    var query = 'SELECT * FROM datos ORDER BY date DESC LIMIT 1';
    connection.query(query, function(err, results, fields) {
        if (err)
            return callback(err, null);
        // console.log('The query-result is: ', results[0]);
        // wrap result-set as json
        json = results
        /***************
        * Correction 2: Nest the callback correctly!
        ***************/
        connection.end();
        // console.log('JSON-result:', json);
        callback(null, json);
    });
};
