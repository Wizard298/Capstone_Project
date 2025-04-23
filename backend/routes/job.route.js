import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
import { getAdminJobs, getAllJobs, getJobById, postJob, updateJob, deleteJob } from "../controllers/job.controller.js";
import { Job } from "../models/job.model.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, singleUpload, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);

// update and edit posts
router.route("/edit/:id").get(isAuthenticated, getJobById);
router.route("/edit/:id").put(isAuthenticated, singleUpload, updateJob);

// delete posts
router.route("/delete/:id").delete(isAuthenticated, deleteJob);

router.get("/checkPosts", async (req, res) => {
    try {
        const paidJobs = await Job.find({ checkPayment: true });
        res.status(200).json({
            success: true,
            jobs: paidJobs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch paid gigs",
        });
    }
});


// POST /api/jobs/success
router.post("/success", async (req, res) => {
    const { jobId } = req.body;

    if (!jobId) {
        return res.status(400).json({ success: false, message: "Post ID is required" });
    }

    try {
        const job = await Job.findByIdAndUpdate(
            jobId,
            { checkPayment: true },
            { new: true }
        );

        if (!job) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        res.status(200).json({
            success: true,
            message: "Post marked as paid",
            job,
        });
    } catch (error) {
        console.error("Error marking post as paid:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});



export default router;

