import express from "express";
import dotenv from "dotenv";
import { connectDB } from"./config/db.js";
import Product from "./models/product.model.js";
dotenv.config();

const app = express();

app.use(express.json()) //allows us to accept json data in the req.body

app.post("/api/products", async (req, res)=>{
    const product = req.body; // user sends this data
    if(!product.name || !product.price ||!product.image ){
        return res.status(400).json({sucess: false, message: "Please provide all fields"});
    }
    const newProduct = new Product(product)
    try {
        await newProduct.save();
        res.status(200).json({sucess: true, data: newProduct});
    } catch (error) {
        console.error("Error in Create Product", error.message)
        res.status(500).json({sucess: false, message: "Server Error"});
        
    }
})

console.log(process.env.MONGO_URI)

app.listen(5000, () =>{
    connectDB();
    console.log("Server is listening on port 5000 ");

})

