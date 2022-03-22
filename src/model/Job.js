const Database = require('../db/config.js')
/*
let data = [
    {
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours": 2,
        "total-hours": 1,
        created_at: Date.now()
    },
    {
        id: 2,
        name: "OneTwo Project",
        "daily-hours": 3,
        "total-hours": 47,
        created_at: Date.now()
    }
]
*/

module.exports = {
    async get() {
        const db = await Database()

        jobs = await db.all(`SELECT * FROM jobs`)

        await db.close()

        const normalisedData = jobs.map((job) => {
            return {
                id: job.id,
                name: job.name,
                "daily-hours": job.daily_hours,
                "total-hours": job.total_hours,
                "created_at": job.created_at
            }
        })

        return normalisedData
    },

    async update(newJob) {
        const db = await Database()

        const sql = `UPDATE jobs SET name = "${newJob.name}", 
        daily_hours = ${newJob['daily-hours']}, 
        total_hours = ${newJob['total-hours']}
        WHERE id = ${newJob.id}`

        console.log(sql)

        await db.run(sql)

        await db.close()
    },

    async delete(id) {
        //FICA SÓ O QUE É DIFERENTE
        //data = data.filter(job => NUmber(job.id) !== Number(id))

        const db = await Database()
        db.run(`DELETE FROM jobs WHERE id = ${id} `)
        await db.close()
    },

    async create(newJob) {
        const db = await Database()

        const sql = `INSERT INTO jobs (name, daily_hours, total_hours, created_at)
        VALUES 
        ("${newJob.name}", ${newJob['daily-hours']}, 
            ${newJob['total-hours']}, ${newJob.created_at})`

            console.log(sql)
        db.run(sql)

        await db.close()
    }
}