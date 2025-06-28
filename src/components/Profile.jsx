
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";


const Profile = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    gender: "",
    date_of_birth: "",
  });
  const [imageFile, setImageFile] = useState(null);

  // Fetch profile
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => {
        const u = data.user;
        setUser(u);
        setFormData({
          name: u.name || "",
          mobile: u.mobile || "",
          gender: u.gender || "",
          date_of_birth: u.date_of_birth?.split("T")[0] || "",
        });
      })
      .catch((err) => {
       toast.error(" Failed to load profile. Please login again.");
        console.error("Profile fetch error:", err.message);
      });
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    if (e.target.files[0]) setImageFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const body = new FormData();
    body.append("name", formData.name);
    body.append("mobile", formData.mobile);
    body.append("gender", formData.gender);
    body.append("date_of_birth", formData.date_of_birth);
    if (imageFile) body.append("image", imageFile);

    try {
      const res = await fetch("http://localhost:5000/api/auth/edit-profile", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Profile updated successfully!");
        setUser(data.user);
        setEditMode(false);
        setImageFile(null);
      } else {
         toast.error(" Update failed: " + data.msg);
      }
    } catch (err) {
     toast.error(" Error updating profile");
      console.error(err);
    }
  };

  if (!user) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="flex-1 px-6 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 border border-gray-200 relative">

        <div className="absolute top-6 right-6 space-x-3">
          {editMode ? (
            <>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm cursor-pointer font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm transition"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setImageFile(null);
                }}
                className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 text-sm cursor-pointer font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Profile Image & Name */}
        <div className="flex flex-col items-center justify-center mb-6">
          {editMode ? (
            <>
              {imageFile ? (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="preview"
                  className="w-28 h-28 rounded-full border object-cover mb-2"
                />
              ) : user.image ? (
                <img
                  src={`http://localhost:5000${user.image}`}
                  alt="User"
                  className="w-28 h-28 rounded-full border object-cover mb-2"
                />
              ) : (
                <div className="w-28 h-28 rounded-full border border-gray-300 flex items-center justify-center text-sm text-gray-500">
                  {user.name?.[0]}
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 text-sm"
              />
            </>
          ) : user.image ? (
            <img
              src={`http://localhost:5000${user.image}`}
              alt="User"
              className="w-28 h-28 rounded-full border object-cover mb-2"
            />
          ) : (
            <div className="w-28 h-28 rounded-full border border-gray-300 flex items-center justify-center text-sm text-gray-500">
              {user.name?.[0]}
            </div>
          )}

          <h2 className="text-2xl font-bold text-gray-800 mt-4">{user.name}</h2>
          <p className="text-sm text-gray-500 capitalize">{user.role}</p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
          <InputField label="Name" name="name" editMode={editMode} value={formData.name} onChange={handleChange} />
          <InputField label="Mobile" name="mobile" editMode={editMode} value={formData.mobile} onChange={handleChange} />
          <SelectField label="Gender" name="gender" editMode={editMode} value={formData.gender} onChange={handleChange} />
          <InputField label="Date of Birth" name="date_of_birth" type="date" editMode={editMode} value={formData.date_of_birth} onChange={handleChange} />
          <DisplayField label="Email" value={user.email} />
          <DisplayField label="Last Updated" value={new Date(user.updatedAt).toLocaleDateString()} />
        </div>
      </div>
    </div>
  );
};

// Reusable input
const InputField = ({ label, name, value, onChange, editMode, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600">{label}</label>
    {editMode ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded px-3 py-2 mt-1"
      />
    ) : (
      <p className="text-gray-800 mt-1">{value}</p>
    )}
  </div>
);

// Select dropdown for gender
const SelectField = ({ label, name, value, onChange, editMode }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600">{label}</label>
    {editMode ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded px-3 py-2 mt-1"
      >
        <option value="">Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    ) : (
      <p className="text-gray-800 mt-1">{value}</p>
    )}
  </div>
);

// Read-only display field
const DisplayField = ({ label, value }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600">{label}</label>
    <p className="text-gray-800 mt-1">{value}</p>
  </div>
);

export default Profile;
