import { Request, Response } from 'express';
import { Product } from '../model/productModel.js';

// Create Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const result = await Product.create(req.body);
    res.status(201).json({ 
      success: true, 
      message: "Product created successfully", 
      data: result 
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Failed to create product", error: error.message });
  }
};

// Get All (Excluding soft-deleted)
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await Product.find({ isDeleted: { $ne: true } });
    res.status(200).json({ 
      success: true, 
      count: result.length, 
      message: "Products fetched successfully", 
      data: result 
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
};

// Get Single Product
// export const getSingleProduct = async (req: Request, res: Response) => {
//   try {
//     const result = await Product.findOne({ _id: req.params.id, isDeleted: { $ne: true } });
//     if (!result) {
//       return res.status(404).json({ success: false, message: "No product found with this ID" });
//     }
//     res.status(200).json({ success: true, message: "Product details retrieved", data: result });
//   } catch (error: any) {
//     res.status(400).json({ success: false, message: "Invalid Product ID format" });
//   }
// };
export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "ID does not exist in Database" });
    }

    if (product.isDeleted) {
      return res.status(404).json({ success: false, message: "This product has been soft-deleted" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error: any) {
    res.status(400).json({ success: false, message: "Invalid ID Format" });
  }
};

// Update Product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const result = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!result) {
      return res.status(404).json({ success: false, message: "Cannot update: Product not found" });
    }
    res.status(200).json({ success: true, message: "Product updated successfully", data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Update failed", error: error.message });
  }
};

// Soft Delete
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const result = await Product.findByIdAndUpdate(req.params.id, { isDeleted: true });
    if (!result) {
      return res.status(404).json({ success: false, message: "Cannot delete: Product not found" });
    }
    res.status(200).json({ success: true, message: "Product moved to trash (soft-deleted)" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Delete operation failed" });
  }
};