const Database = require('./config.js')

const initDb = {

    async init() {

        const db = await Database()

        await db.exec(`CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    name TEXT, 
                    avatar TEXT, 
                    monthly_budget INT,
                    days_per_week INT, 
                    hours_per_day INT,  
                    vacation_per_year INT, 
                    value_hour INT
                    )`)

        await db.exec(`CREATE TABLE IF NOT EXISTS jobs (id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    name TEXT, 
                    daily_hours INT, 
                    total_hours INT, 
                    created_at DATETIME
                    )`)

        await db.run(`INSERT INTO profile  (name, avatar, monthly_budget, 
            days_per_week, hours_per_day, 
            vacation_per_year, value_hour) VALUES ( 
                    'Rodolfo JSilva', 
                    'https://avatars.githubusercontent.com/u/48301571?v=4',
                    12500,
                    5,
                    8,
                    4,
                    75
                );`)

        await db.run(`INSERT INTO jobs (name, daily_hours, total_hours, created_at) VALUES ( 
                    "Pizzaria guloso", 
                    2,
                    1,
                    ${Date.now()}
                );`)

        await db.run(`INSERT INTO jobs (name, daily_hours, total_hours, created_at) VALUES ( 
                    "App mobile", 
                    3,
                    45,
                    ${Date.now()}
                );`)

        await db.close()
    }
}

initDb.init()