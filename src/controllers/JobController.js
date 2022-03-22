const Job = require('../model/Job.js')
const JobUtils = require('../utils/jobsUtils.js')
const Profile = require('../model/Profile.js');

module.exports = {
    create(req, res) {
        return res.render("job")
    },

    save(req, res) {
        const jobs = Job.get()
        const lastId = jobs[jobs.length - 1]?.id || 0;

        Job.create({
            id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now()
        })

        return res.redirect('/')
    },

    async show(req, res) {
        const jobs = await Job.get()
        const profiles = await Profile.get()

        const jobId = req.params.id
        
        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not found!')
        }

        job.budget = JobUtils.calculateBudget(job, profiles["value-hour"])

        return res.render("job-edit", { job })
    },

    async update(req, res) {
        const jobs = await Job.get()
        const jobId = req.params.id

        let job = jobs.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not found!')
        }

        const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        const newJob = 
            jobs.map(jo => {
                if (Number(jo.id) === Number(jobId)) {
                    job = updatedJob
                }

                return job
            })
        

        await Job.update(job)

        res.redirect('/job/' + jobId)
    },

    delete(req, res) {
        const jobId = req.params.id
        Job.delete(jobId)
        
        return res.redirect('/')
    }
}