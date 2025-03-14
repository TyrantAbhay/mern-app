import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    price: { 
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
},
{
    timestamps: true, // Adds createdAt and updatedAt fields 
});

const Product =  mongoose.model('Product', productsSchema);

export default Product;