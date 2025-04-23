import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeFeaturesSection from "./HomeFeaturesSection";
import "./home.css";
import Gallery from "./Gallery";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      // navigate("/admin/companies");
      navigate("/admin/jobs");
    }
  }, []);
  
  return (
    <>
      <Navbar />

      <div className="homeDiv">
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
        <HomeFeaturesSection />

        <Gallery/>

      </div>

      <Footer />
    </>
  );
};

export default Home;
