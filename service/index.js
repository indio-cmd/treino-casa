import BancoDeDados from "..//repository/index.js"

class ServiceIndex {

Buscar(){
    return BancoDeDados
}

Buscarum(id){
if(!id){
    throw new Error ("Favor informar o id")
}

      const Consulta1 = BancoDeDados.find(it => it.id === id)

        if(!Consulta1){
            throw new Error ("Consulta não encontrada")

        }

       // res.status(201).send({mensagem: BancoDeDados})
return Consulta1
}

    Criar(id, nome, medico, data, valor, hospital, pago){
        if(!id || !nome || !medico || !data || !valor || !hospital  || !pago){
    throw new Error ("Parametros invalidos")
}

const consulta =  {id, nome, medico, data, valor, hospital, pago}

BancoDeDados.push(consulta)
    }

    Alterar(id, nome, medico, data,valor, hospital, pago){
        if(!id){
            throw new Error ("Favor informar o id")
        }
        const Consulta2 = BancoDeDados.find(it => it.id ===id)

if(!Consulta2){
    throw new Error ("Consulta não encontrada")
}

Consulta2.nome = nome
Consulta2.medico = medico
Consulta2.data = data
Consulta2.valor = valor
Consulta2.hospital = hospital
Consulta2.pago = pago

return Consulta2
    }

Deletar(id){
    if(!id){
        throw new Error("Favor informar o id")
    }
    const Consulta3 = BancoDeDados.findIndex(it => it.id === id)

        if(Consulta3 === -1){
            throw new Error ("Consulta não encontrada")
            
        }

BancoDeDados.splice(Consulta3, 1)

return Consulta3
}

Pagamento(id){
    const Consulta4 = BancoDeDados.find(it => it.id === id)

        if(!Consulta4){
           throw new Error ("Pagamento nao encontrada")
        }

        Consulta4.pago = true
    return Consulta4
    }

}


export default new ServiceIndex()