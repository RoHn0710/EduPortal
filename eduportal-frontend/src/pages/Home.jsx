import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HeroImage from "../assets/hero-image.png";
import Illustration from "../assets/illus.jpg";  // changed here

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const student = localStorage.getItem("student");
    if (student) {
      // Redirect logged-in user directly to dashboard
      navigate("/student-dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white px-4">
      {/* Hero image below navbar */}
      <div className="w-full flex justify-start mt-4">
        <img
          src={HeroImage}
          alt="Hero"
          className="w-40 h-auto object-contain ml-4"
        />
      </div>

      {/* Main Section */}
      <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-6 py-12">
  {/* Left Text Section */}
  <div className="space-y-6 max-w-md w-full">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
      Welcome to EduPortal
    </h2>
    <p className="text-gray-700 text-base">
      Access your grades, performance insights, and academic records effortlessly.
    </p>

    {/* Student Login and Register Now buttons side by side */}
    <div className="flex justify-between w-full max-w-sm mx-auto">
      <Link
        to="/student-login"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-1/2 text-center"
      >
        Student Login
      </Link>

      <Link
        to="/register"
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-1/2 text-center ml-4"
      >
        Register Now
      </Link>
    </div>

    {/* Divider */}
    <div className="my-6">
      <hr className="border-t border-gray-300" />
    </div>

    {/* Admin Login button centered below */}
    <div className="flex justify-center">
      <Link
        to="/admin-login"
        className="bg-white border border-gray-300 text-gray-800 px-8 py-2 rounded hover:bg-gray-100"
      >
        Admin Login
      </Link>
    </div>
  </div>

  {/* Illustration Image Section */}
  <div className="flex justify-center items-center">
    <img
      src={Illustration}
      alt="Illustration"
      className="max-h-[400px] w-auto object-contain"
    />
  </div>
</section>

    </div>
  );
}

export default Home;
