const Job = require('../model/Job.js')
const JobUtils = require('../utils/jobsUtils.js')
const Profile = require('../model/Profile.js');

module.exports = {
    async index(req, res) {
        const jobs = await Job.get()
        const profile = await Profile.get()

        let statusJobs = {
            "progress": 0,
            "done": 0,
            "total": jobs.length
        }

        let freeHour = Number(profile['hours-per-day']);

        const updatedJobs = jobs.map((job) => {
            // ajustes no job
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'

            statusJobs[status] += 1

            freeHour -= status === 'progress' ? Number(job['daily-hours']) : 0


            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })

        return res.render("index", {
            jobs:
                updatedJobs,
            profile: profile,
            statusJobs,
            freeHour
        })
    }
}
