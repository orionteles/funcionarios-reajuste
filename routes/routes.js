const express = require('express')
const FuncionarioController = require('../controllers/FuncionarioController')
const router = express.Router()

// Produtos
router.get('/funcionarios', (req, res) => FuncionarioController.getAll(req, res))
router.post('/funcionarios', (req, res) => FuncionarioController.create(req, res))
router.get('/funcionarios/:cargo', (req, res) => FuncionarioController.get(req, res))
router.put('/funcionarios/:id', (req, res) => FuncionarioController.update(req, res))
router.delete('/funcionarios/:id', (req, res) => FuncionarioController.delete(req, res))

module.exports = router