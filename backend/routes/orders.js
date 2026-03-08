const router = require('express').Router();
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const { handleValidation } = require('../middleware/validate');
const {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');

// Validation rules for new orders
const orderValidation = [
  body('customerName').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone is required')
    .matches(/^[0-9+\s\-()]{7,20}$/)
    .withMessage('Invalid phone number'),
  body('orderItems')
    .isArray({ min: 1 })
    .withMessage('At least one item is required'),
  body('orderItems.*.name').trim().notEmpty().withMessage('Item name required'),
  body('orderItems.*.price').isNumeric().withMessage('Item price must be a number'),
  body('orderItems.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('location').trim().notEmpty().withMessage('Delivery location is required'),
  body('instructions').optional().trim().isLength({ max: 500 }),
];

// Public
router.post('/', orderValidation, handleValidation, createOrder);

// Admin only
router.get('/', protect, getAllOrders);
router.get('/:id', protect, getOrder);
router.put('/:id', protect, updateOrderStatus);
router.delete('/:id', protect, deleteOrder);

module.exports = router;
