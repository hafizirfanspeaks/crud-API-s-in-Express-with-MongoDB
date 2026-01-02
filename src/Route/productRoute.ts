import { Router } from 'express';
import { validate } from '../middleware/validateUser.js';
import { productZodSchema } from '../schemas/product.schema.js';
import * as productController from '../Controller/productController.js';

const router = Router();

// Create Product
router.post('/create', validate(productZodSchema), productController.createProduct);

// Get All Products
router.get('/getall', productController.getAllProducts);

// Get Single Product (New)
router.get('/getsingle/:id', productController.getSingleProduct);

// Update Product (New)
router.put('/update/:id', validate(productZodSchema), productController.updateProduct);

// Delete Product (Soft Delete)
router.delete('/delete/:id', productController.deleteProduct);

export default router;