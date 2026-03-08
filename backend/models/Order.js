const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1, default: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
      maxlength: [100, 'Name too long'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[0-9+\s\-()]{7,20}$/, 'Invalid phone number'],
    },
    orderItems: {
      type: [orderItemSchema],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'At least one order item is required',
      },
    },
    location: {
      type: String,
      required: [true, 'Delivery location is required'],
      trim: true,
      maxlength: [300, 'Location too long'],
    },
    instructions: {
      type: String,
      trim: true,
      maxlength: [500, 'Instructions too long'],
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'],
      default: 'pending',
    },
    totalAmount: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-compute total before saving
orderSchema.pre('save', function (next) {
  if (this.orderItems && this.orderItems.length > 0) {
    this.totalAmount = this.orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
