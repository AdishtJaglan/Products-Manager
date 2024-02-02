const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
require('dotenv').config();
const dbHost = process.env.DB_HOST;
const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose.connect(`mongodb://127.0.0.1:27017/${dbHost}`)
    .then(() => {
        console.log("Database connected!");
    })
    .catch((err) => {
        console.log("Error! Database not connected!");
        console.log(err);
    });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let categories = ["fruit", "vegetable", "dairy"];

//displaying products
app.get("/products", async (req, res) => {
    const { category } = req.query;

    //filtering
    if (category) {
        const product = await Product.find({ category });

        res.render("products/index", { product, category, title: "Products" });
    } else {
        const product = await Product.find({});

        res.render("products/index", { product, category: "Our", title: "Products" });
    }
});

//creating a new product
app.post("/products", async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.redirect(`/products/${newProduct._id}`);
});

//make a new product
app.get("/products/new", (req, res) => {
    res.render("products/create", { categories, title: "Create Product" });
});

//viewing details
app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const findProduct = await Product.findById(id);

    res.render("products/find", { findProduct, title: "Search" });
});

//updating a product
app.get("/products/:id/edit", async (req, res) => {
    const { id } = req.params;
    const findProduct = await Product.findById(id);

    res.render("products/edit", { findProduct, categories, title: "Edit Product" });
});

//display updated product
app.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });

    res.redirect(`/products/${product._id}`);
});

//deleting product
app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);

    res.redirect("/products");
});

app.listen(3000, () => {
    console.log("Listening on port 3000!");
});