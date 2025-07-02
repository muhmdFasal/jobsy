
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// const AdminCompanies = () => {
//   const [companies, setCompanies] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [form, setForm] = useState({
//     name: "",
//     website: "",
//     description: "",
//     location: "",
//     logo: null,
//   });

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const fetchCompanies = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/companies", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setCompanies(data);
//     } catch (error) {
//       toast.error("Failed to fetch companies");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", form.name);
//     formData.append("website", form.website);
//     formData.append("description", form.description);
//     formData.append("location", form.location);
//     if (form.logo) formData.append("logo", form.logo);

//     const url = editingId
//       ? `http://localhost:5000/api/companies/${editingId}`
//       : "http://localhost:5000/api/companies";
//     const method = editingId ? "PUT" : "POST";

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       if (res.ok) {
//         toast.success(editingId ? "Company updated" : "Company added");
//         setForm({ name: "", website: "", description: "", location: "", logo: null });
//         setEditingId(null);
//         fetchCompanies();
//       } else {
//         toast.error("Failed to submit");
//       }
//     } catch (error) {
//       toast.error("Submission error");
//     }
//   };

//   const handleEdit = (company) => {
//     setForm({
//       name: company.name || "",
//       website: company.website || "",
//       description: company.description || "",
//       location: company.location || "",
//       logo: null,
//     });
//     setEditingId(company._id);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete company?")) return;
//     try {
//       const res = await fetch(`http://localhost:5000/api/companies/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) {
//         toast.success("Company deleted");
//         fetchCompanies();
//       } else {
//         toast.error("Failed to delete");
//       }
//     } catch (error) {
//       toast.error("Delete error");
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingId(null);
//     setForm({ name: "", website: "", description: "", location: "", logo: null });
//   };

//   return (
//     <div className="w-full px-4 sm:px-6 py-6 max-w-6xl mx-auto">
//       <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left">
//         🏢 {editingId ? "Edit Company" : "Manage Companies"}
//       </h2>

//       {/* FORM */}
//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-white p-4 sm:p-6 shadow-md rounded-lg"
//         encType="multipart/form-data"
//       >
//         <input
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           placeholder="Company Name"
//           className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
//           required
//         />
//         <input
//           value={form.website}
//           onChange={(e) => setForm({ ...form, website: e.target.value })}
//           placeholder="Website"
//           className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
//         />
//         <input
//           value={form.location}
//           onChange={(e) => setForm({ ...form, location: e.target.value })}
//           placeholder="Location"
//           className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setForm({ ...form, logo: e.target.files[0] })}
//           className="w-full border p-2 rounded file:mr-4 file:py-1 file:px-2 file:border file:rounded file:bg-orange-50 file:text-orange-700"
//         />
//         <textarea
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           placeholder="Description"
//           className="w-full border p-2 rounded col-span-1 md:col-span-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
//         />
//         <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row justify-between items-center gap-3">
//           {editingId && (
//             <button
//               type="button"
//               onClick={handleCancelEdit}
//               className="w-full sm:w-auto bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
//             >
//               ❌ Cancel
//             </button>
//           )}
//           <button
//             type="submit"
//             className="w-full sm:w-auto bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition sm:ml-auto"
//           >
//             {editingId ? "✏️ Update Company" : "➕ Add Company"}
//           </button>
//         </div>
//       </form>

//       {/* TABLE SECTION */}
//       {companies.length === 0 ? (
//         <p className="text-gray-500 text-center">No companies found.</p>
//       ) : (
//         <div className="w-full overflow-x-auto rounded-lg shadow-md border border-gray-200">
//           <table className="min-w-[700px] w-full text-sm text-left bg-white">
//             <thead className="bg-gray-100 border-b">
//               <tr>
//                 <th className="px-4 py-3 font-semibold text-gray-700">Logo</th>
//                 <th className="px-4 py-3 font-semibold text-gray-700">Name</th>
//                 <th className="px-4 py-3 font-semibold text-gray-700">Website</th>
//                 <th className="px-4 py-3 font-semibold text-gray-700">Location</th>
//                 <th className="px-4 py-3 font-semibold text-gray-700">Description</th>
//                 <th className="px-4 py-3 font-semibold text-gray-700 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {companies.map((c) => (
//                 <tr key={c._id} className="hover:bg-gray-50">
//                   <td className="px-4 py-3">
//                     {c.logo ? (
//                       <img
//                         src={`http://localhost:5000${c.logo}`}
//                         alt="Logo"
//                         className="w-12 h-12 object-cover rounded border border-gray-300"
//                       />
//                     ) : (
//                       <div className="w-12 h-12 flex items-center justify-center bg-gray-200 text-gray-500 rounded">
//                         {c.name?.[0] || "C"}
//                       </div>
//                     )}
//                   </td>
//                   <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
//                   <td className="px-4 py-3 text-blue-600 underline max-w-[150px] truncate">
//                     <a href={c.website} target="_blank" rel="noreferrer">{c.website}</a>
//                   </td>
//                   <td className="px-4 py-3 text-gray-700">{c.location}</td>
//                   <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">{c.description}</td>
//                   <td className="px-4 py-3 text-center">
//                     <div className="flex justify-center items-center gap-2 flex-wrap">
//                       <button
//                         onClick={() => handleEdit(c)}
//                         className="text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 px-3 py-1 rounded transition"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(c._id)}
//                         className="text-red-600 hover:text-white hover:bg-red-600 border border-red-600 px-3 py-1 rounded transition"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminCompanies;


import { useEffect, useState } from "react";

const AdminCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    website: "",
    description: "",
    location: "",
    logo: null,
  });

  // Mock token for demo (in real app, use localStorage)
  const token = "demo-token";

  // Mock data for demonstration
  const mockCompanies = [
    {
      _id: "1",
      name: "Tech Solutions Inc",
      website: "https://techsolutions.com",
      location: "San Francisco, CA",
      description: "Leading technology solutions provider specializing in AI and machine learning",
      logo: null
    },
    {
      _id: "2", 
      name: "Global Enterprises",
      website: "https://globalent.com",
      location: "New York, NY",
      description: "Multinational corporation with diverse business interests",
      logo: null
    }
  ];

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      // Mock API call - in real app, use actual endpoint
      setTimeout(() => {
        setCompanies(mockCompanies);
      }, 500);
    } catch (error) {
      console.error("Failed to fetch companies");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mock form submission
    const newCompany = {
      _id: Date.now().toString(),
      name: form.name,
      website: form.website,
      description: form.description,
      location: form.location,
      logo: null
    };

    if (editingId) {
      setCompanies(companies.map(c => c._id === editingId ? { ...c, ...newCompany, _id: editingId } : c));
    } else {
      setCompanies([...companies, newCompany]);
    }

    setForm({ name: "", website: "", description: "", location: "", logo: null });
    setEditingId(null);
  };

  const handleEdit = (company) => {
    setForm({
      name: company.name || "",
      website: company.website || "",
      description: company.description || "",
      location: company.location || "",
      logo: null,
    });
    setEditingId(company._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete company?")) return;
    setCompanies(companies.filter(c => c._id !== id));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", website: "", description: "", location: "", logo: null });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 text-center sm:text-left">
            🏢 {editingId ? "Edit Company" : "Manage Companies"}
          </h2>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter company name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="City, State/Country"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setForm({ ...form, logo: e.target.files[0] })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm file:mr-4 file:py-1 file:px-3 file:border-0 file:rounded-md file:bg-orange-50 file:text-orange-700 file:text-sm hover:file:bg-orange-100"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description of the company"
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="w-full sm:w-auto order-2 sm:order-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="w-full sm:w-auto order-1 sm:order-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {editingId ? "Update Company" : "Add Company"}
              </button>
            </div>
          </div>
        </div>

        {/* COMPANIES LIST */}
        {companies.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="text-gray-400 text-5xl mb-4">🏢</div>
            <p className="text-gray-500 text-lg">No companies found</p>
            <p className="text-gray-400 text-sm mt-2">Add your first company using the form above</p>
          </div>
        ) : (
          <>
            {/* Mobile/Tablet Card View */}
            <div className="block lg:hidden space-y-4">
              {companies.map((company) => (
                <div key={company._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                      {company.logo ? (
                        <img
                          src={`http://localhost:5000${company.logo}`}
                          alt="Logo"
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg border border-gray-300"
                        />
                      ) : (
                        <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-lg font-bold text-lg sm:text-xl">
                          {company.name?.[0] || "C"}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-lg sm:text-xl mb-1 truncate">
                        {company.name}
                      </h3>
                      {company.location && (
                        <p className="text-gray-600 text-sm mb-2 flex items-center">
                          <span className="mr-1">📍</span>
                          {company.location}
                        </p>
                      )}
                      {company.website && (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-orange-600 hover:text-orange-700 text-sm underline break-all"
                        >
                          {company.website}
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {company.description && (
                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                      {company.description}
                    </p>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                      onClick={() => handleEdit(company)}
                      className="flex-1 sm:flex-none bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(company._id)}
                      className="flex-1 sm:flex-none bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Website
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {companies.map((company) => (
                      <tr key={company._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {company.logo ? (
                              <img
                                src={`http://localhost:5000${company.logo}`}
                                alt="Logo"
                                className="w-10 h-10 object-cover rounded-lg border border-gray-300 flex-shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-lg font-bold text-sm flex-shrink-0">
                                {company.name?.[0] || "C"}
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="font-medium text-gray-900 truncate">
                                {company.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {company.website ? (
                            <a
                              href={company.website}
                              target="_blank"
                              rel="noreferrer"
                              className="text-orange-600 hover:text-orange-700 text-sm underline max-w-[200px] truncate block"
                            >
                              {company.website}
                            </a>
                          ) : (
                            <span className="text-gray-400 text-sm">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-700 text-sm max-w-[150px] truncate">
                            {company.location || "—"}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-600 text-sm max-w-[250px] truncate">
                            {company.description || "—"}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(company)}
                              className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(company._id)}
                              className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminCompanies;
