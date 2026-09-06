
import { useEffect, useState } from "react";

function Admin() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [editingRegistration, setEditingRegistration] = useState(null);
  // Search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");
const [currentPage, setCurrentPage] = useState(1);
const [showChangePassword, setShowChangePassword] = useState(false);
const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [passwordMessage, setPasswordMessage] = useState("");
const [passwordLoading, setPasswordLoading] = useState(false);
const registrationsPerPage = 5;

useEffect(() => {
  setCurrentPage(1);
}, [searchTerm, selectedCourse]);


useEffect(() => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    window.location.href = "/admin";
    return;
  }

  fetch(`${import.meta.env.VITE_API_URL}/api/registrations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin";
        return null;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch registrations.");
      }

      return data;
    })
    .then((data) => {
      if (data) {
        setRegistrations(data);
      }

      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching registrations:", error);
      setLoading(false);
    });
}, []);


  if (loading) {
    return (
      <section className="admin-section">
        <div className="admin-container">
          <div className="admin-loading">
            <p>Loading registrations...</p>
          </div>
        </div>
      </section>
    );
  }

  const totalRegistrations = registrations.length;

  const today = new Date().toISOString().split("T")[0];

  const todayRegistrations = registrations.filter(
    (registration) => registration.joinDate === today
  ).length;

  const uniqueCourses = new Set(
    registrations.map((registration) => registration.course)
  ).size;

  // Get unique course names
  const courses = [
    "All",
    ...new Set(
      registrations
        .map((registration) => registration.course)
        .filter(Boolean)
    ),
  ];

  // Filter registrations
  const filteredRegistrations = registrations.filter((registration) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      registration.fullName?.toLowerCase().includes(search) ||
      registration.email?.toLowerCase().includes(search) ||
      registration.phone?.toLowerCase().includes(search);

    const matchesCourse =
      selectedCourse === "All" ||
      registration.course === selectedCourse;

    return matchesSearch && matchesCourse;
  });
const totalPages = Math.ceil(
  filteredRegistrations.length / registrationsPerPage
);

const indexOfLastRegistration =
  currentPage * registrationsPerPage;

const indexOfFirstRegistration =
  indexOfLastRegistration - registrationsPerPage;

const currentRegistrations =
  filteredRegistrations.slice(
    indexOfFirstRegistration,
    indexOfLastRegistration
  );
const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this registration?"
  );

  if (!confirmed) {
    return;
  }

  try {
  
const token = localStorage.getItem("adminToken");

const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/registrations/${id}`,
  {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

   const data = await response.json();

if (response.status === 401 || response.status === 403) {
  localStorage.removeItem("adminToken");
  window.location.href = "/admin";
  return;
}

if (!response.ok) {
  throw new Error(data.message || "Failed to delete registration");
}

    // Remove the deleted registration from the current table
    setRegistrations((currentRegistrations) =>
      currentRegistrations.filter(
        (registration) => registration._id !== id
      )
    );

    // Close the modal if the deleted student was being viewed
    if (selectedRegistration?._id === id) {
      setSelectedRegistration(null);
    }

    alert("Registration deleted successfully.");
  } catch (error) {
    console.error("Delete error:", error);
    alert("Failed to delete registration.");
  }
};
const handleEdit = (registration) => {
  setEditingRegistration({ ...registration });
};

const handleSaveEdit = async () => {
  if (
  !editingRegistration.fullName.trim() ||
  !editingRegistration.email.trim() ||
  !editingRegistration.phone.trim() ||
  !editingRegistration.dob ||
  !editingRegistration.gender ||
  !editingRegistration.education.trim() ||
  !editingRegistration.address.trim() ||
  !editingRegistration.guardian.trim() ||
  !editingRegistration.guardianPhone.trim() ||
  !editingRegistration.course.trim() ||
  !editingRegistration.joinDate
) {
  alert("Please fill in all required fields.");
  return;
}
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(editingRegistration.email.trim())) {
  alert("Please enter a valid email address.");
  return;
}
const phonePattern = /^(97|98)\d{8}$/;

if (!phonePattern.test(editingRegistration.phone.trim())) {
  alert("Please enter a valid 10-digit phone number.");
  return;
}

if (!phonePattern.test(editingRegistration.guardianPhone.trim())) {
  alert("Please enter a valid 10-digit guardian phone number.");
  return;
}
const dobDate = new Date(editingRegistration.dob);
const joinDate = new Date(editingRegistration.joinDate);

if (joinDate < dobDate) {
  alert("Joining date cannot be before the date of birth.");
  return;
}
  try {
   
const token = localStorage.getItem("adminToken");

const response = await fetch(
`${import.meta.env.VITE_API_URL}/api/registrations/${editingRegistration._id}`,
{
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(editingRegistration),
  }
);


  const data = await response.json();

if (response.status === 401 || response.status === 403) {
  localStorage.removeItem("adminToken");
  window.location.href = "/admin";
  return;
}

if (!response.ok) {
  throw new Error(data.message || "Failed to update registration");
}
    // Update the registration in the dashboard
    setRegistrations((currentRegistrations) =>
      currentRegistrations.map((registration) =>
        registration._id === editingRegistration._id
          ? data.registration
          : registration
      )
    );

    // Close edit modal
    setEditingRegistration(null);

    // Close view modal too, if it is open
    setSelectedRegistration(null);

    alert("Registration updated successfully.");
  } catch (error) {
    console.error("Update error:", error);
    alert("Failed to update registration.");
  }
};

const handleChangePassword = async (event) => {
  event.preventDefault();

  setPasswordMessage("");

  if (newPassword !== confirmPassword) {
    setPasswordMessage("New passwords do not match.");
    return;
  }

  if (newPassword.length < 8) {
    setPasswordMessage("New password must be at least 8 characters long.");
    return;
  }

  setPasswordLoading(true);

  try {
    const token = localStorage.getItem("adminToken");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/admin/change-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      }
    );

    const data = await response.json();

    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin";
      return;
    }

    if (!response.ok) {
      setPasswordMessage(
        data.message || "Failed to change password."
      );
      return;
    }

    setPasswordMessage("Password changed successfully.");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  } catch (error) {
    console.error("Change password error:", error);
    setPasswordMessage(
      "Unable to connect to the server. Please try again."
    );
  } finally {
    setPasswordLoading(false);
  }
};
const handleLogout = () => {
  localStorage.removeItem("adminToken");
  window.location.href = "/admin";
};
  return (
    <section className="admin-section">
      <div className="admin-container">

       {/* Dashboard Header */}
<div className="admin-heading">

  <div>
    <p>Management</p>

    <h1>Admin Dashboard</h1>

    <span>
      Manage student registrations and enrollment information
    </span>
  </div>
<button
  className="admin-password-button"
  onClick={() => {
    setShowChangePassword(true);
    setPasswordMessage("");
  }}
>
  <i className="fas fa-key"></i>
  Change Password
</button>
  <button
    className="admin-logout-button"
    onClick={handleLogout}
  >
    <i className="fa-solid fa-right-from-bracket"></i>
    Logout
  </button>

</div>

        {/* Dashboard Statistics */}
        <div className="admin-stats">

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <i className="fa-solid fa-users"></i>
            </div>

            <div>
              <h3>Total Registrations</h3>
              <p>{totalRegistrations}</p>
            </div>
          </div>


          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <i className="fa-solid fa-calendar-check"></i>
            </div>

            <div>
              <h3>Today's Joining</h3>
              <p>{todayRegistrations}</p>
            </div>
          </div>


          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <i className="fa-solid fa-book"></i>
            </div>

            <div>
              <h3>Active Courses</h3>
              <p>{uniqueCourses}</p>
            </div>
          </div>

        </div>


        {/* Search and Filter */}
        <div className="admin-filters">

          {/* Search */}
          <div className="admin-search">
            <i className="fa-solid fa-magnifying-glass"></i>

            <input
              type="text"
              placeholder="Search student, email or phone..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>


          {/* Course Filter */}
          <div className="admin-course-filter">
            <i className="fa-solid fa-filter"></i>

            <select
              value={selectedCourse}
              onChange={(event) =>
                setSelectedCourse(event.target.value)
              }
            >
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course === "All" ? "All Courses" : course}
                </option>
              ))}
            </select>
          </div>

        </div>


        {/* Result Count */}
        <div className="admin-result-count">
          Showing <strong>{filteredRegistrations.length}</strong>{" "}
          of <strong>{totalRegistrations}</strong> registrations
        </div>


        {/* Registration Table */}
        {filteredRegistrations.length === 0 ? (

          <div className="no-registrations">
            <p>No matching registrations found.</p>
          </div>

        ) : (

          <div className="registration-table-container">

            <table className="registration-table">

              <thead>
                <tr>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Course</th>
                  <th>Joining Date</th>
                  <th>Action</th>
                </tr>
              </thead>


              <tbody>

                {currentRegistrations.map((registration) => (

                  <tr key={registration._id}>

                    <td>{registration.fullName}</td>

                    <td>{registration.email}</td>

                    <td>{registration.phone}</td>

                    <td>
                      <span className="course-badge">
                        {registration.course}
                      </span>
                    </td>

                    <td>{registration.joinDate}</td>

               
<td>
  <div className="admin-action-buttons">

    <button
      className="view-button"
      onClick={() =>
        setSelectedRegistration(registration)
      }
    >
      <i className="fa-solid fa-eye"></i>
      View
    </button>
<button
  className="edit-button"
  onClick={() => handleEdit(registration)}
>
  <i className="fa-solid fa-pen"></i>
  Edit
</button>
    <button
      className="delete-button"
      onClick={() =>
        handleDelete(registration._id)
      }
    >
      <i className="fa-solid fa-trash"></i>
      Delete
    </button>

  </div>
</td>


                  </tr>

                ))}

              </tbody>

            </table>

          </div>
          
          

        )}
{totalPages > 1 && (
  <div className="admin-pagination">

    <button
      onClick={() =>
        setCurrentPage((page) => Math.max(page - 1, 1))
      }
      disabled={currentPage === 1}
    >
      <i className="fa-solid fa-chevron-left"></i>
      Previous
    </button>

    <div className="pagination-pages">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={currentPage === index + 1 ? "active" : ""}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>

    <button
      onClick={() =>
        setCurrentPage((page) =>
          Math.min(page + 1, totalPages)
        )
      }
      disabled={currentPage === totalPages}
    >
      Next
      <i className="fa-solid fa-chevron-right"></i>
    </button>

  </div>
)}

        {/* Student Details Modal */}
        {selectedRegistration && (

          <div
            className="admin-modal-overlay"
            onClick={() => setSelectedRegistration(null)}
          >

            <div
              className="admin-modal"
              onClick={(event) => event.stopPropagation()}
            >

              <div className="admin-modal-header">

                <div>
                  <p>Student Information</p>

                  <h2>
                    {selectedRegistration.fullName}
                  </h2>
                </div>


                <button
                  className="modal-close"
                  onClick={() =>
                    setSelectedRegistration(null)
                  }
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>

              </div>


              <div className="student-details-grid">

                <div className="student-detail">
                  <span>Full Name</span>
                  <strong>
                    {selectedRegistration.fullName}
                  </strong>
                </div>


                <div className="student-detail">
                  <span>Email</span>
                  <strong>
                    {selectedRegistration.email}
                  </strong>
                </div>


                <div className="student-detail">
                  <span>Phone</span>
                  <strong>
                    {selectedRegistration.phone}
                  </strong>
                </div>


                <div className="student-detail">
                  <span>Date of Birth</span>
                  <strong>
                    {selectedRegistration.dob}
                  </strong>
                </div>


                <div className="student-detail">
                  <span>Gender</span>
                  <strong>
                    {selectedRegistration.gender}
                  </strong>
                </div>


                <div className="student-detail">
                  <span>Education</span>
                  <strong>
                    {selectedRegistration.education}
                  </strong>
                </div>


                <div className="student-detail">
                  <span>Address</span>
                  <strong>
                    {selectedRegistration.address}
                  </strong>
                </div>


                <div className="student-detail">
                  <span>School / College</span>
                  <strong>
                    {selectedRegistration.school}
                  </strong>
                </div>


                <div className="student-detail">
                  <span>Guardian</span>
                  <strong>
                    {selectedRegistration.guardian}
                  </strong>
                </div>


                <div className="student-detail">
                  <span>Guardian Phone</span>
                  <strong>
                    {selectedRegistration.guardianPhone}
                  </strong>
                </div>


                <div className="student-detail">
                  <span>Course</span>
                  <strong>
                    {selectedRegistration.course}
                  </strong>
                </div>


                <div className="student-detail">
                  <span>Joining Date</span>
                  <strong>
                    {selectedRegistration.joinDate}
                  </strong>
                </div>

              </div>

            </div>

          </div>

        )}
        
        {/* Edit Student Modal */}
        {editingRegistration && (
          <div
            className="admin-modal-overlay"
            onClick={() => setEditingRegistration(null)}
          >
            <div
              className="admin-modal edit-modal"
              onClick={(event) => event.stopPropagation()}
            >

              <div className="admin-modal-header">
                <div>
                  <p>Edit Student</p>

                  <h2>
                    {editingRegistration.fullName}
                  </h2>
                </div>

                <button
                  className="modal-close"
                  onClick={() =>
                    setEditingRegistration(null)
                  }
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>


              <div className="edit-form">

                {/* Full Name */}
                <div className="edit-form-group">
                  <label>Full Name</label>

                  <input
                    type="text"
                    value={editingRegistration.fullName}
                    onChange={(event) =>
                      setEditingRegistration({
                        ...editingRegistration,
                        fullName: event.target.value,
                      })
                    }
                  />
                </div>


                {/* Email */}
                <div className="edit-form-group">
                  <label>Email</label>

                  <input
                    type="email"
                    value={editingRegistration.email}
                    onChange={(event) =>
                      setEditingRegistration({
                        ...editingRegistration,
                        email: event.target.value,
                      })
                    }
                  />
                </div>


                {/* Phone */}
                <div className="edit-form-group">
                  <label>Phone</label>

                  <input
                    type="text"
                    value={editingRegistration.phone}
                    onChange={(event) =>
                      setEditingRegistration({
                        ...editingRegistration,
                        phone: event.target.value,
                      })
                    }
                  />
                </div>


                {/* Date of Birth */}
                <div className="edit-form-group">
                  <label>Date of Birth</label>

                  <input
                    type="date"
                    value={editingRegistration.dob}
                    onChange={(event) =>
                      setEditingRegistration({
                        ...editingRegistration,
                        dob: event.target.value,
                      })
                    }
                  />
                </div>


                {/* Gender */}
                <div className="edit-form-group">
                  <label>Gender</label>

                  <select
                    value={editingRegistration.gender}
                    onChange={(event) =>
                      setEditingRegistration({
                        ...editingRegistration,
                        gender: event.target.value,
                      })
                    }
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>


                {/* Education */}
                <div className="edit-form-group">
                  <label>Education</label>

                  <input
                    type="text"
                    value={editingRegistration.education}
                    onChange={(event) =>
                      setEditingRegistration({
                        ...editingRegistration,
                        education: event.target.value,
                      })
                    }
                  />
                </div>


                {/* Address */}
                <div className="edit-form-group">
                  <label>Address</label>

                  <input
                    type="text"
                    value={editingRegistration.address}
                    onChange={(event) =>
                      setEditingRegistration({
                        ...editingRegistration,
                        address: event.target.value,
                      })
                    }
                  />
                </div>


                {/* School / College */}
                <div className="edit-form-group">
                  <label>School / College</label>

                  <input
                    type="text"
                    value={editingRegistration.school || ""}
                    onChange={(event) =>
                      setEditingRegistration({
                        ...editingRegistration,
                        school: event.target.value,
                      })
                    }
                  />
                </div>


                {/* Guardian */}
                <div className="edit-form-group">
                  <label>Guardian</label>

                  <input
                    type="text"
                    value={editingRegistration.guardian}
                    onChange={(event) =>
                      setEditingRegistration({
                        ...editingRegistration,
                        guardian: event.target.value,
                      })
                    }
                  />
                </div>


                {/* Guardian Phone */}
                <div className="edit-form-group">
                  <label>Guardian Phone</label>

                  <input
                    type="text"
                    value={editingRegistration.guardianPhone}
                    onChange={(event) =>
                      setEditingRegistration({
                        ...editingRegistration,
                        guardianPhone: event.target.value,
                      })
                    }
                  />
                </div>


                {/* Course */}
                <div className="edit-form-group">
                  <label>Course</label>

                  <input
                    type="text"
                    value={editingRegistration.course}
                    onChange={(event) =>
                      setEditingRegistration({
                        ...editingRegistration,
                        course: event.target.value,
                      })
                    }
                  />
                </div>


                {/* Joining Date */}
                <div className="edit-form-group">
                  <label>Joining Date</label>

                  <input
                    type="date"
                    value={editingRegistration.joinDate}
                    onChange={(event) =>
                      setEditingRegistration({
                        ...editingRegistration,
                        joinDate: event.target.value,
                      })
                    }
                  />
                </div>

              </div>


              <div className="edit-form-actions">

                <button
                  className="edit-cancel-button"
                  onClick={() =>
                    setEditingRegistration(null)
                  }
                >
                  Cancel
                </button>

             <button
  className="save-edit-button"
  onClick={handleSaveEdit}
>
  <i className="fa-solid fa-floppy-disk"></i>
  Save Changes
</button>
              </div>

            </div>
          </div>
        )}

  {/* Change Password Modal */}
        {showChangePassword && (
          <div
            className="admin-modal-overlay"
            onClick={() => {
              setShowChangePassword(false);
              setPasswordMessage("");
            }}
          >
            <div
              className="admin-modal password-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="admin-modal-header">
                <div>
                  <p>Account Security</p>
                  <h2>Change Password</h2>
                </div>

                <button
                  className="modal-close"
                  onClick={() => {
                    setShowChangePassword(false);
                    setPasswordMessage("");
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              <form
                className="admin-password-form"
                onSubmit={handleChangePassword}
              >
                <div className="admin-password-group">
                  <label htmlFor="currentPassword">
                    Current Password
                  </label>

                  <input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(event) =>
                      setCurrentPassword(event.target.value)
                    }
                    placeholder="Enter current password"
                    required
                  />
                </div>

                <div className="admin-password-group">
                  <label htmlFor="newPassword">
                    New Password
                  </label>

                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(event) =>
                      setNewPassword(event.target.value)
                    }
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <div className="admin-password-group">
                  <label htmlFor="confirmPassword">
                    Confirm New Password
                  </label>

                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                {passwordMessage && (
                  <p className="admin-password-message">
                    {passwordMessage}
                  </p>
                )}

                <div className="admin-password-actions">
                  <button
                    type="button"
                    className="edit-cancel-button"
                    onClick={() => {
                      setShowChangePassword(false);
                      setPasswordMessage("");
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="save-edit-button"
                    disabled={passwordLoading}
                  >
                    {passwordLoading ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        Changing...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-key"></i>
                        Change Password
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Admin;
