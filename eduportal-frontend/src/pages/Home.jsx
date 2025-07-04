import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";  // ✅ Import motion
import HeroImage from "../assets/hero-image.png";
import Illustration from "../assets/illus.jpg";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const student = localStorage.getItem("student");
    if (student) {
      navigate("/student-dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white px-4">
      <div className="w-full flex justify-start mt-4">
        <img src={HeroImage} alt="Hero" className="w-41 h-auto object-contain ml-4" />
      </div>

      <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-6 py-12">
        <div className="space-y-6 max-w-md w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            Welcome to EduPortal
          </h2>
          <p className="text-gray-699 text-base">
            Access your grades, performance insights, and academic records effortlessly.
          </p>

          {/* Motion buttons */}
          <div className="flex justify-between w-full max-w-sm mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-1/2"
            >
              <Link
                to="/student-login"
                className="block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 text-center"
              >
                Student Login
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-1/2 ml-4"
            >
              <Link
                to="/register"
                className="block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 text-center"
              >
                Register Now
              </Link>
            </motion.div>
          </div>

          <div className="my-6">
            <hr className="border-t border-gray-300" />
          </div>

          <div className="flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/admin-login"
                className="bg-white border border-gray-300 text-gray-800 px-8 py-2 rounded hover:bg-gray-100"
              >
                Admin Login
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <img src={Illustration} alt="Illustration" className="max-h-[400px] w-auto object-contain" />
        </div>
      </section>
    </div>
  );
}

export default Home;
