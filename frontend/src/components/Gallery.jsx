import React from "react";
import { motion } from "framer-motion";
import "./gallery.css";

const Gallery = () => {
  const images = [
    "https://img.freepik.com/free-vector/learning-concept-illustration_114360-6186.jpg",
    "https://img.freepik.com/free-vector/teacher-concept-illustration_114360-1638.jpg",
    "https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg",
    "https://img.freepik.com/free-vector/e-learning-icons-flat_1284-3950.jpg",
    "https://img.freepik.com/free-vector/account-concept-illustration_114360-279.jpg",
    "https://img.freepik.com/free-vector/boy-searching-laptop-with-stem-education-map-cartoon-style-isolated-white-background_1308-46527.jpg",
    "https://img.freepik.com/free-vector/flat-woman-chatting-with-chatbot-communicating-ai-robot-assistant_88138-959.jpg",
    "https://img.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg",
  ];

  return (
    <>
      <div className="gallery-container">
        <motion.h1
          className="gallery-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          LEARN MORE, EARN MORE
        </motion.h1>

        <motion.div
          className="gallery-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="gallery-3d">
            {images.map((img, i) => (
              <motion.div
                key={i}
                className="gallery-item"
                style={{ "--i": i }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={img}
                  alt={`Learning concept ${i + 1}`}
                  className="gallery-image"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          className="gallery-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Explore endless learning opportunities to boost your career
        </motion.p>
      </div>

      {/* previous one */}
      {/* <div id="gallContain">
        <h1 id="gallHead">LEARN MORE, EARN MORE</h1>
        <div class="gallery">
          <span style={{ "--i": 1 }}>
            <img
              src="https://img.freepik.com/free-vector/learning-concept-illustration_114360-6186.jpg?t=st=1740004396~exp=1740007996~hmac=0080a4f334c33d7eee56c7cbde96747953e30c211402f88b5d5176a72636ca46&w=740"
              alt=""
            />
          </span>
          <span style={{ "--i": 2 }}>
            <img
              src="https://img.freepik.com/free-vector/teacher-concept-illustration_114360-1638.jpg?t=st=1740004494~exp=1740008094~hmac=6d82724de4a36ceb0b001124439b42de0732d76e3da87b6379f55bc108cd06ab&w=740"
              alt=""
            />
          </span>
          <span style={{ "--i": 3 }}>
            <img
              src="https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?t=st=1740004618~exp=1740008218~hmac=cff4dc782c2e80939d42f61162c11ec2dc97da7e0bb0fbfeec3fc80420057648&w=1060"
              alt=""
            />
          </span>
          <span style={{ "--i": 4 }}>
            <img
              src="https://img.freepik.com/free-vector/e-learning-icons-flat_1284-3950.jpg?t=st=1740004557~exp=1740008157~hmac=f6a8a558eb4c7c1fc5a7068a798fdee671076071c4620f8fb62357681bbeba3d&w=740"
              alt=""
            />
          </span>
          <span style={{ "--i": 5 }}>
            <img
              src="https://img.freepik.com/free-vector/account-concept-illustration_114360-279.jpg?t=st=1740004738~exp=1740008338~hmac=94851f7d6aa65d0462daaddfc4f5b1ee84904d7e2e37aedaf42d8371ea5f3ba8&w=740"
              alt=""
            />
          </span>
          <span style={{ "--i": 6 }}>
            <img
              src="https://img.freepik.com/free-vector/boy-searching-laptop-with-stem-education-map-cartoon-style-isolated-white-background_1308-46527.jpg?t=st=1740004793~exp=1740008393~hmac=d21065a8bb59878db61d71007d2eb0ab9b3eb2feff811769b4f0e4190f72d39d&w=826"
              alt=""
            />
          </span>
          <span style={{ "--i": 7 }}>
            <img
              src="https://img.freepik.com/free-vector/flat-woman-chatting-with-chatbot-communicating-ai-robot-assistant_88138-959.jpg?t=st=1740004929~exp=1740008529~hmac=c8ee7363462c0b707424cef2dfbd597958b6e42be1d8b84cbe2be446ec0c5e32&w=1060"
              alt=""
            />
          </span>
          <span style={{ "--i": 8 }}>
            <img
              src="https://img.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg?t=st=1740005174~exp=1740008774~hmac=d3524d3151e29b47b80cc5f3203b766b07b70f3a7bef7c7f1ca6d759cd6d6e69&w=1060"
              alt=""
            />
          </span>
        </div>
      </div> */}
    </>
  );
};

export default Gallery;
