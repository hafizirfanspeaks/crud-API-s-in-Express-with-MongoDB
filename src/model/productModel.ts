import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, optional: true },
  stock: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false } 
}, { timestamps: true });

export const Product = model('Product', productSchema);