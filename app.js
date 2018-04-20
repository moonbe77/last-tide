const mysql = require ('mysql')

module.exports = (req ,res ) => {    
    //paso como callback una fucnion que ejecuta el respones
    getSQL(function(err, result) { 
        console.log(result)
        // res.setHeader ("Access-Control-Allow-Origin" , "*")
        // res.setHeader ("Access-Control-Allow-Credentials" , true )
        res.writeHead(200, { 
            'Content-Type': 'application/json',
            "Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin" : "*"
        });
        res.end(result)
        });
}

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
        json = JSON.stringify(results)
        /***************
        * Correction 2: Nest the callback correctly!
        ***************/
        connection.end();
        // console.log('JSON-result:', json);
        callback(null, json);
    });
};
