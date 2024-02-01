const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose.connect("mongodb://127.0.0.1:27017/demoApp")
    .then(() => {
        console.log("Database connected!");
    })
    .catch((err) => {
        console.log("Error! Database not connected!");
        console.log(err);
    });

const seedProducts = [
    {
        name: "Potato",
        price: 70,
        category: "vegetable",
    },
    {
        name: "toned milk",
        price: 120,
        category: "dairy",
    },
    {
        name: "tomato",
        price: 89,
        category: "fruit",
    },
    {
        name: "Lady finger",
        price: 45,
        category: "vegetable",
    },
    {
        name: "cherry",
        price: 67,
        category: "fruit",
    },
    {
        name: "Cauliflower",
        price: 90,
        category: "vegetable",
    },
];

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    });