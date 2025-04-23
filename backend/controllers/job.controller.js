import {Job} from "../models/job.model.js"; 
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


// Admin will posts
export const postJob = async (req, res) => {
  try {
    const {title, description, name, price, email, phoneNumber, location, category, experience, days, checkPayment } = req.body;
    const userId = req.id;

    // Check if file is missing
    if (!req.file) {
      return res.status(400).json({
        message: "Image file is required",
        success: false,
      });
    }

    // Upload to Cloudinary using stream
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "job-postings",
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            message: "Image upload failed",
            error,
            success: false,
          });
        }

        // Now create the Job only after upload is done
        const job = await Job.create({
          title,
          description,
          name,
          price: Number(price),
          email,
          phoneNumber,
          location,
          category,
          experience: Number(experience),
          days: Number(days),
          image: result.secure_url, // ✅ this is now present
          checkPayment: checkPayment,
          created_by: userId,
        });

        res.status(201).json({
          message: "Job posted successfully!",
          job,
          success: true,
        });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } 
  catch (error) {
    console.error("Job post error:", error);
    res.status(500).json({
      message: "Something went wrong",
      error,
      success: false,
    });
  }
};


// Get all jobs for students
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { category: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query).sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found.",
                success: false
            });
        };

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


// Get single job by ID
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        };

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


// Get posts posted by admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found.",
                success: false
            });
        };

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


// In your job.controller.js
export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const formData = req.body;
        const file = req.file;

        // If a new file was uploaded, update the image URL
        if (file) {
            formData.imageUrl = file.path; // or your cloud storage URL
        }

        // Find and update the job
        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            { $set: formData },
            { new: true }
        );

        if (!updatedJob) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            job: updatedJob,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
