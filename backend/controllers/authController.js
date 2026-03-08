const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Single admin account seeded from environment variables.
// For a multi-admin setup, replace with a User model.
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email !== adminEmail) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Support both plain text (dev) and bcrypt hash (prod) passwords
    let isMatch = false;
    if (adminPassword.startsWith('$2')) {
      isMatch = await bcrypt.compare(password, adminPassword);
    } else {
      isMatch = password === adminPassword;
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: adminEmail, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      expiresIn: 28800, // 8 hours in seconds
    });
  } catch (err) {
    console.error('login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const verifyToken = (req, res) => {
  // If middleware passed, token is valid
  res.json({ success: true, message: 'Token is valid', admin: req.admin });
};

module.exports = { login, verifyToken };
