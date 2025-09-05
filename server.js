
const express =require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());


 // Database connection
 const db = mysql.createConnection({
 host: "localhost",
 user: "root", 
 password: "root", 
 database: "mern_curd"
 });
 // Check DB connection
 db.connect(err => {
 if (err) {
 console.log("Database connection failed:", err);
 } else {
 console.log("Database connected.");
}
 });

// Create user
 app.post("/api/users", (req, res) => {
 const { name, email } = req.body;
 const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
 db.query(sql, [name, email], (err, result) => {
 if (err) return res.status(500).json({ error: err });
 res.json({ message: "User created", id: result.insertId });
 });
 });


 // Get all users

 app.get("/api/users", (req, res) => {
 const sql = "SELECT * FROM users";
 db.query(sql, (err, results) => {
 if (err) return res.status(500).json({ error: err });
 res.json(results);
 });
 });

 app.get("/", (req, res) => {
  res.send("✅ Server is running.");
});
 
    // Using Fetch API
    fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ name: 'John Doe', email: 'john@example.com' }) 
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

 // Delete user
 app.delete("/api/users/:id", (req, res) => {
 const sql = "DELETE FROM users WHERE id = ?";
 db.query(sql, [req.params.id], (err, result) => {
 if (err) return res.status(500).json({ error: err });
 res.json({ message: "User deleted" });
 });
 });

 

// Create order
 app.post("/api/orders", (req, res) => {
 const { user_id, product, quantity } = req.body;
 const sql = "INSERT INTO orders (user_id, product, quantity) VALUES (?, ?, ?)";
 db.query(sql, [user_id, product, quantity], (err, result) => {
 if (err) return res.status(500).json({ error: err });
 res.json({ message: "Order created", id: result.insertId });
 });
 });
 fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ user_id: 1, product:'mobile',quantity:2 }) 
    })
 // Get all orders
 app.get("/api/orders", (req, res) => {
 const sql = "SELECT * FROM orders";
 db.query(sql, (err, results) => {
 if (err) return res.status(500).json({ error: err });
 res.json(results);
 });
 });


 // Get order by ID
 app.get("/api/orders/:id", (req, res) => {
 const sql = "SELECT * FROM orders WHERE id = ?";
db.query(sql, [req.params.id], (err, results) => {
 if (err) return res.status(500).json({ error: err });
 if (results.length === 0) return res.status(404).json({ message: "Order not found" });
 res.json(results[0]);
 });
 });


 // Delete order
 app.delete("/api/orders/:id", (req, res) => {
 const sql = "DELETE FROM orders WHERE id = ?";
 db.query(sql, [req.params.id], (err, result) => {
 if (err) return res.status(500).json({ error: err });
 res.json({ message: "Order deleted" });
 });
 });


 // START SERVER 
app.listen(5000, () => {
 console.log("Server running at http://localhost:5000/");
 });