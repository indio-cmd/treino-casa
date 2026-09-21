import Model from '../model/index.js'

class RepositoryHospital {

   async Find(){
const hospital11 = await Model.findAll()

return hospital11
    }

async Findall(id){
const hospital12 = await Model.findByPk(id)

return hospital12
}

async Create(nome, medico, data, valor, hospital, pago){

const hospital13 = await Model.create({nome, medico, data, valor, hospital, pago})

return hospital13
}

async Update(id, nome, medico, data, valor, hospital, pago){
const hospital14 = await Model.findByPk(id)

if(!hospital14){
    throw new Error("Consulta não encontrada")
}

hospital14.nome = nome
hospital14.medico = medico
hospital14.data = data
hospital14.valor = valor
hospital14.hospital = hospital
hospital14.pago = pago

await hospital14.save()

return hospital14
}

async Delete(id){
const hospital15 = await Model.findByPk(id)

if(!hospital15){
    throw new Error("Consulta não encontrada")
}

hospital15.destroy()

return hospital15
}

async Pagamento(id){
const hospital16 = await Model.findByPk(id)
if(!hospital16){
    throw new Error("Consulta não encontrada")
}

hospital16.pago = true
await hospital16.save()
return hospital16
}

}
export default new RepositoryHospital()