import mongoose from 'mongoose';
import Product from '../../models/product.model.js';


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.error("error in fetching products",error.message);
        res.status(500).json({success: false, message:"Server error"});
    }
};

export const createProduct = async (req, res) => {
    const product = req.body; //user will send this datagit

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message: 'All fields are required' });
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in create product",error.message);
        res.status(500).json({success: false, message:"Server error"});
    }
};

export const updateProduct = async (req, res) => {
    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "invalid product id"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, data: updatedProduct});
    }
    catch (error) {
        console.error("Error in updating product",error.message);
        res.status(500).json({success: false, message:"Server error"});
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "invalid product id"});
    }

    try {
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message: 'Product deleted successfully'});
                       
    } catch (error) {
        console.log("errror in deleting product", error.message);
        res.status(500).json({success:false, message: "Server error"});
    }
}