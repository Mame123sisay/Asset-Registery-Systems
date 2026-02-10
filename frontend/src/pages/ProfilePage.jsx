import React, { useState, useEffect } from "react";
import { client } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage({ userId }) {
  const {user}=useAuth();
  //const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [newPicture, setNewPicture] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await client.get(`/api/users/${user.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("pos-token")}` },
        });
       // setUser(res.data);

        const depRes = await client.get("/api/departments", {
          headers: { Authorization: `Bearer ${localStorage.getItem("pos-token")}` },
        });
        setDepartments(depRes.data.departments);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    }
    
    fetchData();
  }, [user.id]);

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      //formData.append("fullname", user.fullname);
      //formData.append("email", user.email);
      //formData.append("phone", user.phone);
      //formData.append("departmentId", user.departmentId?._id || "");
      if (newPicture) {
        formData.append("profilePicture", newPicture);
       
      }

      const res = await client.put(`/api/users/${user.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

     // setUser(res.data.updatedUser);
      setNewPicture(null);
      setEditing(false);
      setNewPicture(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  }

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      {!editing ? (
        <>
          <div className="flex items-center space-x-4">
            <img
              src={`${import.meta.env.VITE_API_URL}${user.profilePicture}`}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border"
            />
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-600">{user.departmentId?.name}</p>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.phone}</p>
            </div>
          </div>
          <button
            onClick={() => setEditing(true)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Edit Profile
          </button>
        </>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-4">
          {/* <input
            type="text"
            value={user.fullname}
            onChange={(e) => setUser({ ...user, fullname: e.target.value })}
            className="border rounded px-3 py-2 w-full"
            placeholder="Full Name"
          />
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="border rounded px-3 py-2 w-full"
            placeholder="Email"
          />
          <input
            type="text"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            className="border rounded px-3 py-2 w-full"
            placeholder="Phone"
          />
          <select
            value={user.departmentId?._id || ""}
            onChange={(e) => setUser({ ...user, departmentId: e.target.value })}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>*/}

          {/* Profile Picture Upload */}
          <div>
            <label className="block font-semibold mb-1">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewPicture(e.target.files[0])}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
