import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import {
  Loader2,
  Briefcase,
  FileText,
  User,
  MapPin,
  Layers,
  Clock,
  Image,
  Save,
} from "lucide-react";

const EditJobPage = () => {
  const { id } = useParams();
  const [input, setInput] = useState({
    title: "",
    description: "",
    name: "",
    price: "",
    email: "",
    phoneNumber: "",
    location: "",
    category: "",
    experience: "",
    days: "",
    image: null,
    existingImage: "",
  });

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${JOB_API_END_POINT}/edit/${id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          const jobData = res.data.job;
          setInput({
            title: jobData.title || "",
            description: jobData.description || "",
            name: jobData.name || "",
            price: jobData.price || "",
            email: jobData.email || "",
            phoneNumber: jobData.phoneNumber || "",
            location: jobData.location || "",
            category: jobData.category || "",
            experience: jobData.experience || "",
            days: jobData.days || "",
            existingImage: jobData.imageUrl || "",
          });
        }
      } catch (error) {
        toast.error("Failed to load post details");
        console.error("Error fetching post:", error);
        navigate("/admin/jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, navigate]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    setInput({ ...input, image: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);
      const formData = new FormData();

      // Append all fields
      formData.append("title", input.title);
      formData.append("description", input.description);
      formData.append("name", input.name);
      formData.append("price", input.price);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("location", input.location);
      formData.append("category", input.category);
      formData.append("experience", input.experience);
      formData.append("days", input.days);
      
      // Append the image file if it exists
      if (input.image) {
          formData.append("file", input.image);
      }
      
      formData.append("checkPayment", false);

      const res = await axios.put(`${JOB_API_END_POINT}/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Post Updated Successfully!");
        navigate("/admin/jobs");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update post";
      toast.error(errorMessage);
      console.error("Error updating post:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <Navbar />
        <div className="flex items-center justify-center h-[70vh]">
          <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ paddingBottom: "11px" }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white"
    >
      <Navbar />
      <div className="flex items-center justify-center w-full my-10 px-4 sm:px-6">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-4xl p-6 sm:p-8 bg-gray-800 border border-gray-700 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
            <Briefcase className="h-6 w-6 text-blue-400" />
            Edit Freelancing Post
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Job Title */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-300">
                <Briefcase className="h-4 w-4" />
                Title
              </Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="I will build a modern website"
                className="bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-300">
                <FileText className="h-4 w-4" />
                Description
              </Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Description"
                className="bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Client Name */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-300">
                <User className="h-4 w-4" />
                Name
              </Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="Name"
                className="bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-300">
                Price (₹) per hour (₹80/hr)
              </Label>
              <Input
                type="number"
                name="price"
                value={input.price}
                onChange={changeEventHandler}
                placeholder="80"
                className="bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-300">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="xyz@gmail.com"
                className="bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-300">
                Phone Number
              </Label>
              <Input
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow only digits and limit to 10 characters
                  if (/^\d{0,10}$/.test(value)) {
                    changeEventHandler(e);
                  }
                }}
                placeholder="0123456789"
                className="bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <div className="relative">
                <select
                  id="location"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  required
                >
                  <option value="" disabled className="text-gray-500">
                    Select a location
                  </option>
                  <option value="Bangalore" className="bg-[#1e1e1e] text-gray-300">
                    Bangalore
                  </option>
                  <option value="Chennai" className="bg-[#1e1e1e] text-gray-300">
                    Chennai
                  </option>
                  <option value="Delhi" className="bg-[#1e1e1e] text-gray-300">
                    Delhi
                  </option>
                  <option value="Mumbai" className="bg-[#1e1e1e] text-gray-300">
                    Mumbai
                  </option>
                  <option value="Pune" className="bg-[#1e1e1e] text-gray-300">
                    Pune
                  </option>
                  <option value="Chandigarh" className="bg-[#1e1e1e] text-gray-300">
                    Chandigarh
                  </option>
                  <option value="Jaipur" className="bg-[#1e1e1e] text-gray-300">
                    Jaipur
                  </option>
                  <option value="Lucknow" className="bg-[#1e1e1e] text-gray-300">
                    Lucknow
                  </option>
                  <option value="Kolkata" className="bg-[#1e1e1e] text-gray-300">
                    Kolkata
                  </option>
                  <option value="Bhopal" className="bg-[#1e1e1e] text-gray-300">
                    Bhopal
                  </option>
                  <option value="Noida" className="bg-[#1e1e1e] text-gray-300">
                    Noida
                  </option>
                  <option value="Hyderabad" className="bg-[#1e1e1e] text-gray-300">
                    Hyderabad
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-300">
                <Layers className="h-4 w-4" />
                Category
              </Label>
              <div className="relative">
                <select
                  type="text"
                  name="category"
                  value={input.category}
                  onChange={changeEventHandler}
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  required
                >
                  <option value="" disabled className="text-gray-500">
                    Select a Category
                  </option>
                  <option
                    value="AI Artist"
                    className="bg-[#1e1e1e] text-gray-300"
                  >
                    AI Artist
                  </option>
                  <option
                    value="Logo Design"
                    className="bg-[#1e1e1e] text-gray-300"
                  >
                    Logo Design
                  </option>
                  <option
                    value="Wordpress"
                    className="bg-[#1e1e1e] text-gray-300"
                  >
                    Wordpress
                  </option>
                  <option
                    value="Voice Over"
                    className="bg-[#1e1e1e] text-gray-300"
                  >
                    Voice Over
                  </option>
                  <option
                    value="Programming & Tech"
                    className="bg-[#1e1e1e] text-gray-300"
                  >
                    Programming & Tech
                  </option>
                  <option
                    value="Photo Editor"
                    className="bg-[#1e1e1e] text-gray-300"
                  >
                    Photo Editor
                  </option>
                  <option
                    value="Content Writer"
                    className="bg-[#1e1e1e] text-gray-300"
                  >
                    Content Writer
                  </option>
                  <option
                    value="Digital Marketing"
                    className="bg-[#1e1e1e] text-gray-300"
                  >
                    Digital Marketing
                  </option>
                  <option
                    value="SEO Expert"
                    className="bg-[#1e1e1e] text-gray-300"
                  >
                    SEO Expert
                  </option>
                  <option
                    value="Social Media Manager"
                    className="bg-[#1e1e1e] text-gray-300"
                  >
                    Social Media Manager
                  </option>
                  <option
                    value="Web Developer"
                    className="bg-[#1e1e1e] text-gray-300"
                  >
                    Web Developer
                  </option>
                  <option
                    value="UI/UX Designer"
                    className="bg-[#1e1e1e] text-gray-300"
                  >
                    UI/UX Designer
                  </option>
                  <option
                    value="Illustration"
                    className="bg-[#1e1e1e] text-gray-300"
                  >
                    Illustration
                  </option>
                  <option
                    value="Translation"
                    className="bg-[#1e1e1e] text-gray-300"
                  >
                    Translation
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-300">
                <Clock className="h-4 w-4" />
                Experience (years)
              </Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                placeholder="Experience"
                className="bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Days Required */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-300">
                <Clock className="h-4 w-4" />
                Days Required
              </Label>
              <Input
                type="number"
                name="days"
                value={input.days}
                onChange={changeEventHandler}
                placeholder="Estimated duration"
                className="bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2 md:col-span-2">
              <Label className="flex items-center gap-2 text-gray-300">
                <Image className="h-4 w-4" />
                Image
              </Label>
              {input.existingImage && (
                <div className="mb-3">
                  <p className="text-sm text-gray-400 mb-1">Current Image:</p>
                  <img
                    src={input.existingImage}
                    alt="Current job"
                    className="h-20 w-20 object-cover rounded-md border border-gray-600"
                  />
                </div>
              )}
              <Input
                type="file"
                accept="image/*"
                name="image"
                onChange={fileChangeHandler}
                className="w-full bg-gray-700 border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500/20 file:text-blue-400 hover:file:bg-blue-500/30"
              />
              <p className="text-xs text-gray-400 mt-1">
                {input.image
                  ? input.image.name
                  : "Leave empty to keep current image"}
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Button
              type="button"
              onClick={() => navigate("/admin/jobs")}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updating}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              {updating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Edit Post
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobPage;
