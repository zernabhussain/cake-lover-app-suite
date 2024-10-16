const express = require('express');
const {
  getCakes,
  getCakeById,
  createCake,
  updateCake,
  deleteCake
} = require('../controllers/cake.controller');

const router = express.Router();

router.get('/cakes', getCakes);
router.get('/cakes/:id', getCakeById);
router.post('/cakes', createCake);
router.put('/cakes/:id', updateCake);
router.delete('/cakes/:id', deleteCake);

module.exports = router;
