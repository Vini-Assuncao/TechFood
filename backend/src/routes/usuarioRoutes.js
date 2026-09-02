const express = require("express")
const router = express.Router()
const UsuarioController = require("../controllers/UsuarioController")

router.post("/registrar", UsuarioController.registrar.bind(UsuarioController))
router.post("/login", UsuarioController.login.bind(UsuarioController))

module.exports = router