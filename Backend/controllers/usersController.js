const User = require('../models/User');

// Get all users

exports.getAllUsers = async (req, res) => {
     try {
          const users = await User.find();
          res.json(users);
     } catch (err) {
          res.status(500).json({ error: 'Internal server error' });
     }
};

// create a new User / POST method 
exports.createUser = async (req, res) => {
     try {
          const { name, email, phone } = req.body;
          const user = new User({ name, email, phone });
          await user.save();
          res.json(user);
     } catch (err) {
          res.status(500).json({ error: 'Internal server error' });
     }
};

// Get method by userId

exports.getUserById = async (req, res) => {
     try {
          const user = await User.findById(req.params.user_id);
          if (!user) {
               return res.status(404).json({ error: 'User not found' });
          }
          res.json(user);
     } catch (err) {
          res.status(500).json({ error: 'Internal server error' });
     }
};

// Update method using PUT 

exports.updateUser = async (req, res) => {
     try {
          const { name, email, phone } = req.body;
          const user = await User.findByIdAndUpdate(
               req.params.user_id,
               { name, email, phone },
               { new: true }
          );
          if (!user) {
               return res.status(404).json({ error: 'User not found' });
          }
          res.json(user);
     } catch (err) {
          res.status(500).json({ error: 'Internal server error' });
     }
};

// Delete method by ID

exports.deleteUser = async (req, res) => {
     try {
          const user = await User.findByIdAndDelete(req.params.user_id);
          if (!user) {
               return res.status(404).json({ error: 'User not found' });
          }
          res.json({ message: 'User deleted successfully' });
     } catch (err) {
          res.status(500).json({ error: 'Internal server error' });
     }
};
