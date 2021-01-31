const knex = require('../config/database')

class ProvinceController {
    async index( _ , res ){
        try {
            let provinces = await knex('provinces');

            const data = provinces.map(province => ({
                name: province.name,
                recovered: province.recovered,
                death: province.death,
                positive: province.positive,
                url: `/api/v1/provinces/${province.id}`
            }))

            return res.json({
                status: true,
                totalData: provinces.length,
                message: "Fetching data success",
                data
            })

        } catch ( _ ) {
            return res.status(500).json({
                status: false,
                message: 'Fetching data failed'
            })
        }
    }

    async show( req , res) {
        const { id } = req.params;

        let province = await knex('provinces').where('id',id).first();

        if(!province){
            return res.status(404).json({
                status: false,
                message: 'Id not found'
            })
        }

        return res.json({
            status: true,
            stored: {
              name: province.name,
              recovered: province.recovered,
              death: province.death,
              positive: province.positive
            }
          })

    }

    async insert( req, res ){
        const { name, recovered, death, positive } = req.body
        if (!name || !recovered || !death || !positive) {
            return res.status(400).json({
                status: false,
                message: 'Storing data failed'
            })
        }

        try{
            await knex('provinces').insert({
                "name" : name,
                "recovered" : recovered,
                "death" : death,
                "positive" : positive
            })
    
            return res.json({
                status: true,
                message: 'Storing data success',
                stored: { name, recovered, death, positive }
            })
        }catch( e ){
            return res.status(500).json({
                status: false,
                message: 'Storing data failed'
            })
        }
    }

    async update( req , res ){
        const { id, name, recovered, death, positive } = req.body
        if (!name || !recovered || !death || !positive) {
            return res.status(400).json({
                status: false,
                message: 'Updating data failed'
            })
        }

        try{
            let province = await knex('provinces').where('id',id).first()

            if(!province){
                return res.status(404).json({
                    status: false,
                    message: 'Id not found'
                })
            }

            await knex('provinces').where('id', id).update({
                "name" : name,
                "recovered" : recovered,
                "death" : death,
                "positive" : positive
            })

            return res.json({
                status: true,
                message: 'Updating data success',
                before: {
                    name: province.name,
                    recovered: province.recovered,
                    death: province.death,
                    positive: province.positive
                },
                after: { name, recovered, death, positive }
            })
        }catch( e ){
            return res.status(500).json({
                status: false,
                message: 'Updating data failed'
            })
        }
    }

    async delete( req , res ){
        const { id } = req.body

        try {
            let province = await knex('provinces').where('id',id).first()

            if(!province){
                return res.status(404).json({
                    status: false,
                    message: 'Id not found'
                })
            }

            let date = new Date();
            
            await knex('recycle_bin').insert({
                "name" : province.name,
                "recovered" : province.recovered,
                "death" : province.death,
                "positive" : province.positive,
                "deleted_at" : `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            })
            
            await knex('provinces').where('id',id).del();

            return res.json({
                status: true,
                message: "Destroy data success",
                deleted: {
                    name: province.name,
                    recovered: province.recovered,
                    death: province.death,
                    positive: province.positive
                }
            })

        } catch ( err ) {
            return res.status(500).json({
                status: false,
                message: "Destroy data failed"
            })
        }

    }
}

module.exports = new ProvinceController()