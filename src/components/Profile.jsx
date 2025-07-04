
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Camera, Edit3, Save, X, User, Phone, Calendar, Mail, Clock } from "lucide-react";

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
        toast.error("Failed to load profile.");
        console.error(err);
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
        toast.success("Profile updated!");
        setUser(data.user);
        setEditMode(false);
        setImageFile(null);
      } else {
        toast.error(data.msg || "Update failed.");
      }
    } catch (err) {
      toast.error("Update error");
      console.error(err);
    }
  };

  if (!user) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-100 mx-auto mb-4"></div>
        <p className="text-slate-600 font-medium">Loading profile...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-yellow-100 to-yellow-100 h-32 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          <div className="relative px-8 pb-8">
            {/* Profile Image */}
            <div className="flex flex-col items-center -mt-16 mb-6">
              <div className="relative group">
                {editMode ? (
                  <>
                    {imageFile ? (
                      <img
                        src={URL.createObjectURL(imageFile)}
                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                        alt="preview"
                      />
                    ) : user.image ? (
                      <img
                        src={`http://localhost:5000${user.image}`}
                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                        alt="User"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-white">
                        {user.name?.[0]?.toUpperCase()}
                      </div>
                    )}
                    <label className="absolute bottom-0 right-0 bg-yellow-600 hover:bg-yellow-700 text-white rounded-full p-2 cursor-pointer shadow-lg transition-colors">
                      <Camera className="w-4 h-4" />
                      <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                    </label>
                  </>
                ) : user.image ? (
                  <img
                    src={`http://localhost:5000${user.image}`}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                    alt="User"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-white">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>

              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">{user.name}</h1>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-yellow-800 text-sm font-medium">
                  {user.role}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                {editMode ? (
                  <>
                    <button
                      onClick={handleSubmit}
                      className="inline-flex items-center px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium shadow-lg transition-all duration-200 hover:shadow-xl cursor-pointer"
                    >
                      <Save className="w-4 h-4 mr-2 " />
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setImageFile(null);
                      }}
                      className="inline-flex items-center px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium shadow-lg transition-all duration-200 hover:shadow-xl cursor-pointer"
                    >
                      <X className="w-4 h-4 mr-2 " />
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
                    className="inline-flex items-center px-6 py-3 rounded-xl bg-yellow-600 hover:bg-yellow-700 text-white font-medium shadow-lg transition-all duration-200 hover:shadow-xl cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Information Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <User className="w-6 h-6 mr-3 text-blue-600" />
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Full Name"
              name="name"
              value={formData.name}
              editMode={editMode}
              onChange={handleChange}
              icon={<User className="w-4 h-4" />}
            />
            <InputField
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              editMode={editMode}
              onChange={handleChange}
              icon={<Phone className="w-4 h-4" />}
            />

          

            <div>
    {user.role !== "company" ? (
      <SelectField
        label="Gender"
        name="gender"
        value={formData.gender}
        editMode={editMode}
        onChange={handleChange}
      />
    ) : (
      <div className="invisible">Placeholder</div> // maintains spacing
    )}
  </div>

  {/* Date of Birth */}
  <div>
    {user.role !== "company" ? (
      <InputField
        label="Date of Birth"
        name="date_of_birth"
        type="date"
        value={formData.date_of_birth}
        editMode={editMode}
        onChange={handleChange}
        icon={<Calendar className="w-4 h-4" />}
      />
    ) : (
      <div className="invisible">Placeholder</div>
    )}
  </div>


            <DisplayField
              label="Email Address"
              value={user.email}
              icon={<Mail className="w-4 h-4" />}
            />
            <DisplayField
              label="Last Updated"
              value={new Date(user.updatedAt).toLocaleString()}
              icon={<Clock className="w-4 h-4" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, editMode, type = "text", icon }) => (
  <div className="space-y-2">
    <label className="flex items-center text-sm font-semibold text-slate-700">
      {icon && <span className="mr-2 text-slate-500">{icon}</span>}
      {label}
    </label>
    {editMode ? (
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      </div>
    ) : (
      <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
        <p className="text-slate-800 font-medium">{value || "Not provided"}</p>
      </div>
    )}
  </div>
);

const SelectField = ({ label, name, value, onChange, editMode }) => (
  <div className="space-y-2">
    <label className="flex items-center text-sm font-semibold text-slate-700">
      <User className="w-4 h-4 mr-2 text-slate-500" />
      {label}
    </label>
    {editMode ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
      >
        <option value="">Select gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    ) : (
      <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
        <p className="text-slate-800 font-medium">{value || "Not provided"}</p>
      </div>
    )}
  </div>
);

const DisplayField = ({ label, value, icon }) => (
  <div className="space-y-2">
    <label className="flex items-center text-sm font-semibold text-slate-700">
      {icon && <span className="mr-2 text-slate-500">{icon}</span>}
      {label}
    </label>
    <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
      <p className="text-slate-800 font-medium">{value || "Not available"}</p>
    </div>
  </div>
);

export default Profile;