import { useEffect, useState } from "react";
import axios from "axios";

const Profile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/profile/${userId}`)
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Something went wrong while fetching profile.");
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p className="text-blue-600">⏳ Loading profile...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <div className="max-w-xl mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{profile.fullName}</h2>
      <p><strong>Registration Number:</strong> {profile.registrationNumber}</p>
      <p><strong>Date of Birth:</strong> {new Date(profile.dob).toLocaleDateString()}</p>
      <p><strong>Year of Joining:</strong> {profile.yearOfJoining}</p>
      <p><strong>Parents' Name:</strong> {profile.parentsName || "Not added"}</p>
      <p><strong>Batch:</strong> {profile.batch || "Not added"}</p>
    </div>
  );
};

export default Profile;
