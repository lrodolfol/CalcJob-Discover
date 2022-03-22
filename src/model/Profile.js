const Database  = require('../db/config.js');
/*
let data = {
    name: "Rodolfo J.Silva",
    avatar: "https://avatars.githubusercontent.com/u/48301571?v=4",
    "monthly-budget": 12500,
    "days-per-week": 5,
    "hours-per-day": 8,
    "vacation-per-year": 4,
    "value-hour": 75
}
*/

module.exports = {
    async get() {
        const db = await Database();

        //O .GET SÓ TRAZ UM RETORNO COM SQLITE
        const data = await db.get(`SELECT * FROM profile`)
        await db.close()

        //console.log(data)

        const normalisedData = {
            "name": data.name,
            "avatar": data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "value-hour": data.value_hour
        }

        return normalisedData
    },
    async update(newData) {
        //AQUI PODERIA TBM FAZER A INTERAÇÃO EM CADA ITEM
        //data = newData

        const db = await Database();

        const sql = `UPDATE profile SET 
        name = "${newData.name}", 
        avatar = "${newData.avatar}", 
        monthly_budget = ${newData['monthly-budget']},
        days_per_week = ${newData['days-per-week']}, 
        hours_per_day = ${newData['hours-per-day']},
        vacation_per_year = ${newData['vacation-per-year']}, 
        value_hour = ${newData['value-hour']}
        `
        
        db.run(sql)

        await db.close()

    }
}