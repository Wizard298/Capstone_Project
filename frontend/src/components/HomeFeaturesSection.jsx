import React from "react";

const features = [
  "Secure User Authentication",
  "Service Provider & Client Dashboard",
  "Real-Time Chat & Booking",
  "Payment Integration (Stripe)",
  "Review & Rating System",
  "Responsive & Mobile-Friendly UI",
];

const HomeFeaturesSection = () => {
  return (
    <section className="w-full py-20 px-6 bg-[#111111]">
      <div className="max-w-7xl mx-auto bg-[#1a1a1a]/70 border border-[#2e2e2e] rounded-3xl shadow-[0_0_60px_rgba(0,255,255,0.05)] backdrop-blur-lg p-10 transition-all duration-500 hover:shadow-[0_0_80px_rgba(0,255,255,0.08)]">
        {/* <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#00f5d4] via-[#9a7cff] to-[#ff80ab] drop-shadow-lg mb-10"> */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#00f5d4] via-[#9a7cff] to-[#ff80ab] drop-shadow-lg mb-10" style={{lineHeight: "1.3"}}>
          🚀 Freelancing Marketplace Project
        </h2>

        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12 text-lg">
          Discover a secure and modern platform that connects service providers
          and clients for local freelance work. Built with{" "}
          <span className="text-[#00f5d4] font-bold">React</span>,{" "}
          <span className="text-[#9a7cff] font-bold">MongoDB</span>, and{" "}
          <span className="text-[#F83002] font-bold">Stripe</span> — it’s fast,
          scalable, and designed for the Gen-Z digital hustle.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-5 bg-[#222222]/60 border border-[#3a3a3a] text-white rounded-xl shadow-md hover:shadow-xl hover:border-[#9a7cff] transition duration-300"
            >
              <p className="text-lg font-medium text-[#00f5d4]">{feature}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
          <a
            href="/freelancing-project"
            className="px-6 py-3 bg-gradient-to-r from-[#9a7cff] to-[#00f5d4] text-black font-bold rounded-full shadow-lg hover:shadow-[#00f5d4]/50 transition-all duration-300"
          >
            🌟 Explore Project
          </a>
          <a
            href="https://github.com/yourusername/freelancing-project"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-[#9a7cff] text-white rounded-full hover:bg-[#9a7cff]/20 transition duration-300"
          >
            📁 View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeFeaturesSection;
