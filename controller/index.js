import ServiceIndex from '../service/index.js'

class ControllerIndex {
Buscar(req, res) {
    try {

        const hospital5 = ServiceIndex.Buscar()

        res.status(201).send({mensagem: hospital5})
    } catch (error) {
        res.status(500).send({mensagem: error.message})
    }
}

BuscarUm(req, res)  {
    try {
        const id = Number(req.params.id)

const hospital10 = ServiceIndex.Buscarum(id)

        res.status(201).send({mensagem: hospital10})

    } catch (error) {
        res.status(500).send({mensagem: error.message})
    }
}

Criar(req, res)  {
    try {
        const {id, nome, medico, data, valor, hospital, pago} = req.body

ServiceIndex.Criar(id, nome, medico, data, valor, hospital, pago)

res.status(201).send({mensagem: "Consulta marcada com sucesso"})

    } catch (error) {
        res.status(500).send({mensagem: error.message})
    }
}

Alterar(req, res)  {
    try {
        const id = Number(req.params.id) 
        const {nome, medico, data, valor, hospital, pago} = req.body

ServiceIndex.Alterar(id, nome, medico, data, valor, hospital, pago)

res.status(201).send({mensagem: "Consulta alterada com sucesso!"})

    } catch (error) {
        res.status(500).send({mensagem: error.message})
    }
}

Deletar(req, res)  {
    try {
        const id = Number(req.params.id)

        ServiceIndex.Deletar(id)

res.status(201).send({mensagem: "Consulta apagada com sucesso"})

    } catch (error) {
        res.status(500).send({mensagem: error.message})
    }
}

Pagamento(req, res) {
    try {
        const id = Number(req.params.id)

        ServiceIndex.Pagamento(id)

        res.status(201).send({mensagem: "Pago com sucesso"})

    } catch (error) {
        res.status(500).send({mensagem: error.message})
    }
}
}
export default new ControllerIndex()