// import React, { useState } from "react";
// import toast from "react-hot-toast";

// export default function ApplyToJob({ jobId }) {
//   const [resume, setResume] = useState("");

//   const handleApply = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     try {
//       const res = await fetch(`http://localhost:5000/api/applications/apply/${jobId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ resume }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         toast.success("Application submitted!");
//         setResume("");
//       } else {
//         toast.error(data.message || "Failed to apply");
//       }
//     } catch (err) {
//       toast.error("Network error");
//     }
//   };

//   return (
//     <form onSubmit={handleApply} className="p-4 border rounded shadow max-w-md mx-auto mt-8">
//       <h2 className="text-xl font-bold mb-4">Apply to Job</h2>

//       <label className="block mb-2 font-medium">Resume (URL)</label>
//       <input
//         type="url"
//         required
//         className="w-full border p-2 mb-4 rounded"
//         value={resume}
//         onChange={(e) => setResume(e.target.value)}
//       />

//       <button
//         type="submit"
//         className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         Submit Application
//       </button>
//     </form>
//   );
// }
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ApplyToJob({ jobId }) {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!resume) return toast.error("Please upload a resume");

    const formData = new FormData();
    formData.append("resume", resume);

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/applications/apply/${jobId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Application submitted!");
        setResume(null);
        e.target.reset();
      } else {
        toast.error(data.message || "Failed to apply");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleApply} className="p-4 border rounded shadow max-w-md mx-auto mt-8 bg-white">
      <h2 className="text-xl font-bold mb-4">Apply to Job</h2>

      <label className="block mb-2 font-medium">Upload Resume (.pdf, .doc, .docx)</label>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        required
        className="w-full border p-2 mb-4 rounded"
        onChange={(e) => setResume(e.target.files[0])}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
