import RepositoryHospital from "..//repository/index.js"

class ServiceIndex {

async Buscar(){
    return RepositoryHospital.Find()
}

async Buscarum(id){
if(!id){
    throw new Error ("Favor informar o id")
}

      const Consulta1 = await RepositoryHospital.Find(id)

        if(!Consulta1){
            throw new Error ("Consulta não encontrada")

        }

       // res.status(201).send({mensagem: BancoDeDados})
return Consulta1
}

   async Criar( nome, medico, data, valor, hospital, pago){
        if(!nome || !medico || !data || !valor || !hospital  || !pago){
    throw new Error ("Parametros invalidos")
}

 const carrocriar =  await RepositoryHospital.Create(nome, medico, data, valor, hospital, pago)
 return carrocriar
    }

 async   Alterar(id, nome, medico, data,valor, hospital, pago){
        if(!id){
            throw new Error ("Favor informar o id")
        }
        const Consulta2 = RepositoryHospital.Update(id, nome, medico, data,valor, hospital, pago)

if(!Consulta2){
    throw new Error ("Consulta não encontrada")
}


return Consulta2
    }

async Deletar(id){
    if(!id){
        throw new Error("Favor informar o id")
    }
    const Consulta3 = RepositoryHospital.Delete(id)

        if(Consulta3 === -1){
            throw new Error ("Consulta não encontrada")
            
        }

return Consulta3
}

async Pagamento(id){
    const Consulta4 = await RepositoryHospital.Pagamento(id)

        if(!Consulta4){
           throw new Error ("Pagamento nao encontrada")
        }

        Consulta4.pago = true
    return Consulta4
    }

}
export default new ServiceIndex()