const express = require('express')
const app = express()
const pool = require("./database")

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.get('/', function (req, res) {
    res.send('Hello World')
  })

  app.listen(8080, () => {
    console.log('실행!');
  })

  app.post('/create', async(req, res) => {
    try{
        let {content} = req.body;
        console.log(content);
        const conn = await pool.getConnection();
        let sql = 'insert into todotable (content) values(?)';
        let data = [content];
        console.log(data);
        const rows = await pool.query(sql, data);
        res.status(200).json({result : rows});
        conn.release();
    }catch(err){
        console.log(err)
    }
  })

  app.get('/list', async (req, res) => {
    try{
      const conn = await pool.getConnection();
      const sql = 'select * from todotable';
      const [rows] = await pool.query(sql);
      res.status(200).json({ result : rows });
      conn.release();
    } catch (error){
      console.log(error);
    }
  });

  app.post('/update', async (req, res) => {
    try{
      const {idx, content} = req.body;
      console.log(idx,content);
      const conn = await pool.getConnection();
      const sql = 'update todotable set content=? where idx=?';
      const data = [content,idx];
      const [rows] = await pool.query(sql,data);
      res.status(200).json({ result : rows });
      conn.release();
    } catch (error){
      console.log(error);
    }
  });

  app.post('/delete', async (req, res) => {
    try{
      const {idx} = req.body;
      console.log(idx);
      const conn = await pool.getConnection();
      const sql = 'delete from todotable where idx=?';
      const data = [idx];
      const [rows] = await pool.query(sql,data);
      res.status(200).send(rows);
      conn.release();
    } catch (error){
      console.log(error);
    }
  });