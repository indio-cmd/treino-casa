import express from "express"
import ControllerIndex from '../controller/index.js'
const router = express.Router()

router.get("/buscar", ControllerIndex.Buscar)

router.get("/buscarum/:id", ControllerIndex.BuscarUm)

router.post("/criar", ControllerIndex.Criar )

router.put("/alterar/:id", ControllerIndex.Alterar )

router.delete("/deletar/:id", ControllerIndex.Deletar )

router.post("/pagamento/:id", ControllerIndex.Pagamento )

export default router