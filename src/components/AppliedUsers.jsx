// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export default function AppliedUsers({ jobId }) {
//   const [applicants, setApplicants] = useState([]);

//   const fetchApplicants = async () => {
//     const token = localStorage.getItem("token");

//     try {
//       const res = await fetch(`http://localhost:5000/api/applications/job/${jobId}/applicants`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setApplicants(data);
//       } else {
//         toast.error(data.message || "Failed to fetch applicants");
//       }
//     } catch (err) {
//       toast.error("Network error");
//     }
//   };

//   useEffect(() => {
//     fetchApplicants();
//   }, [jobId]);

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">Applicants</h2>
//       {applicants.length === 0 ? (
//         <p>No applicants yet.</p>
//       ) : (
//         <ul className="space-y-3">
//           {applicants.map((app) => (
//             <li key={app._id} className="border p-3 rounded shadow">
//               <p><strong>Name:</strong> {app.user.name}</p>
//               <p><strong>Email:</strong> {app.user.email}</p>
//               <p><strong>Mobile:</strong> {app.user.mobile}</p>
//               {app.resume && (
//                 <p>
//                   <strong>Resume:</strong>{" "}
//                   <a
//                     href={app.resume}
//                     className="text-blue-600 underline"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     View
//                   </a>
//                 </p>
//               )}
//               <p className="text-sm text-gray-500">Applied on: {new Date(app.appliedAt).toLocaleString()}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AppliedUsers({ jobId }) {
  const [applicants, setApplicants] = useState([]);

  const fetchApplicants = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:5000/api/applications/job/${jobId}/applicants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setApplicants(data);
      } else {
        toast.error(data.message || "Failed to fetch applicants");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  return (
    <div className="max-w-6xl mx-auto p-4 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Job Applicants</h2>

      {applicants.length === 0 ? (
        <p className="text-gray-600">No applicants yet.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Mobile</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Resume</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Applied At</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((app) => (
              <tr key={app._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{app.user.name}</td>
                <td className="px-4 py-2">{app.user.email}</td>
                <td className="px-4 py-2">{app.user.mobile}</td>
                <td className="px-4 py-2">
                  {app.resume ? (
                    <a
                      href={app.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">No resume</span>
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {new Date(app.appliedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
