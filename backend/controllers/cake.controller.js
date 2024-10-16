const Cake = require('../models/cake.model');

// Get all cakes
exports.getCakes = async (req, res) => {
  try {
    const cakes = await Cake.find();
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single cake by ID
exports.getCakeById = async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);
    if (!cake) return res.status(404).json({ message: 'Cake not found' });
    res.json(cake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new cake
exports.createCake = async (req, res) => {
  try {
    const cake = new Cake(req.body);
    await cake.save();
    res.status(201).send(cake);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({ message: 'Cake with this name already exists.' });
    } else {
      res.status(500).send(error);
    }
  }
};


// Update a cake
exports.updateCake = async (req, res) => {
  try {
    const { name, comment, imageUrl, yumFactor } = req.body;
    const cake = await Cake.findById(req.params.id);
    if (!cake) return res.status(404).json({ message: 'Cake not found' });

    cake.name = name || cake.name;
    cake.comment = comment || cake.comment;
    cake.imageUrl = imageUrl || cake.imageUrl;
    cake.yumFactor = yumFactor || cake.yumFactor;
    await cake.save();

    res.json(cake);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a cake
exports.deleteCake = async (req, res) => {
  try {
    const cake = await Cake.findByIdAndDelete(req.params.id);
    if (!cake) {
      return res.status(404).send({ message: 'Cake not found' });
    }
    res.status(200).send({ message: 'Cake deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};
