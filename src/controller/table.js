const TableRepository = require('../repository/table');
const tableRepository = new TableRepository()

class TableController{

    async create(req,res){
        try{
            const {name,phoneNumber,personCount,day,time,message} = req.body
            const response = await tableRepository.create({name,phoneNumber,personCount,day,time,message})
            res.status(200).json(response)
        }catch(err){
            res.status(500).json(err)
        }
}
}

module.exports = TableController