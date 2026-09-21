import ServiceIndex from '../service/index.js'

class ControllerIndex {
async Buscar(req, res) {
    try {

        const hospital5 = await ServiceIndex.Buscar()

        res.status(201).send({mensagem: hospital5})
    } catch (error) {
        res.status(500).send({mensagem: error.message})
    }
}

async BuscarUm(req, res)  {
    try {
        const id = Number(req.params.id)

const hospital10 = await ServiceIndex.Buscarum(id)

        res.status(201).send({mensagem: hospital10})

    } catch (error) {
        res.status(500).send({mensagem: error.message})
    }
}

async Criar(req, res)  {
    try {
        const {nome, medico, data, valor, hospital, pago} = req.body

await ServiceIndex.Criar(nome, medico, data, valor, hospital, pago)

res.status(201).send({mensagem: "Consulta marcada com sucesso"})

    } catch (error) {
        res.status(500).send({mensagem: error.message})
    }
}

async Alterar(req, res)  {
    try {
        const id = Number(req.params.id) 
        const {nome, medico, data, valor, hospital, pago} = req.body

await ServiceIndex.Alterar(id, nome, medico, data, valor, hospital, pago)

res.status(201).send({mensagem: "Consulta alterada com sucesso!"})

    } catch (error) {
        res.status(500).send({mensagem: error.message})
    }
}

async Deletar(req, res)  {
    try {
        const id = Number(req.params.id)

     await   ServiceIndex.Deletar(id)

res.status(201).send({mensagem: "Consulta apagada com sucesso"})

    } catch (error) {
        res.status(500).send({mensagem: error.message})
    }
}

async  Pagamento(req, res) {
    try {
        const id = Number(req.params.id)

     await  ServiceIndex.Pagamento(id)

        res.status(201).send({mensagem: "Pago com sucesso"})

    } catch (error) {
        res.status(500).send({mensagem: error.message})
    }
}
}
export default new ControllerIndex()