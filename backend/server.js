import express from "express";
import dotenv from "dotenv";
import { connectDB } from"./config/db.js";
import Product from "./models/product.model.js";
dotenv.config();

const app = express();

app.use(express.json()) //allows us to accept json data in the req.body

app.get("/api/products", async (req,res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json({sucess:true, data: products})
    } catch (error) {
        console.log("Error in fetching Products", error.message)
        res.status(500).json({sucess: false, message: "Server Error"});
        
    }
})





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

app.put("/api/products/:id", async (req,res)=>{
    const {id} = req.params
    const product = req.body



    try {
        const updatedProduct= await Product.findByIdAndUpdate(id, product, {new:true})
        res.status(200).json({sucess:true, data: updatedProduct})

    } catch (error) {
        res.status(500).json({sucess: false, message: "Server Error"});
    }


})





app.delete("/api/products/:id", async(req,res)=>{
    const {id} = req.params
    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({sucess:true, message:"Product deleted"})
        
    } catch (error) {
        res.status(404).json({sucess:false, message:"Product not found"})
   
    }
})






console.log(process.env.MONGO_URI)

app.listen(5000, () =>{
    connectDB();
    console.log("Server is listening on port 5000 ");

})

