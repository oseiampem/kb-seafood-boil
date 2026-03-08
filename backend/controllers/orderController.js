const Order = require('../models/Order');

// POST /api/orders — public
const createOrder = async (req, res) => {
  try {
    const { customerName, phone, orderItems, location, instructions } = req.body;

    const order = await Order.create({
      customerName,
      phone,
      orderItems,
      location,
      instructions,
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully! We will confirm within 24 hours.',
      data: order,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(422).json({ success: false, message: messages.join('. ') });
    }
    console.error('createOrder error:', err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

// GET /api/orders — admin only
const getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit)),
      Order.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: orders,
      pagination: { total, page: Number(page), limit: Number(limit) },
    });
  } catch (err) {
    console.error('getAllOrders error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/orders/:id — admin only
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// PUT /api/orders/:id — admin only
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    res.json({ success: true, message: 'Order status updated', data: order });
  } catch (err) {
    console.error('updateOrderStatus error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// DELETE /api/orders/:id — admin only
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (err) {
    console.error('deleteOrder error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { createOrder, getAllOrders, getOrder, updateOrderStatus, deleteOrder };
