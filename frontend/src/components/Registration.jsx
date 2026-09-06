import { useState } from "react";

function Registration() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    education: "",
    address: "",
    guardian: "",
    guardianPhone: "",
    school: "",
    course: "",
    joinDate: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/registrations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          dob: "",
          gender: "",
          education: "",
          address: "",
          guardian: "",
          guardianPhone: "",
          school: "",
          course: "",
          joinDate: "",
        });
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Unable to connect to the server.");
    }
  };

  return (
    <section className="registration-section" id="register">
      <div className="section-heading">
        <p>Join S2S</p>
        <h2>Student Registration</h2>
        <span>
          Fill in the form below to register for your preferred course.
        </span>
      </div>

      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              id="dob"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="education">Education</label>
            <select
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
            >
              <option value="">Select Education</option>
              <option value="SEE">SEE</option>
              <option value="SLC/+2">SLC/+2</option>
              <option value="Bachelors">Bachelors</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="guardian">Guardian Name</label>
          <input
            id="guardian"
            type="text"
            name="guardian"
            value={formData.guardian}
            onChange={handleChange}
            placeholder="Enter guardian name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="guardianPhone">Guardian Phone</label>
          <input
            id="guardianPhone"
            type="tel"
            name="guardianPhone"
            value={formData.guardianPhone}
            onChange={handleChange}
            placeholder="Enter guardian phone number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="school">School / College</label>
          <input
            id="school"
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
            placeholder="Enter school or college name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="course">Select Course</label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">Select a course</option>
            <option value="Basic Computer">Basic Computer</option>
            <option value="Korean">Korean Language</option>
            <option value="Japanese">Japanese Language</option>
            <option value="Accounting">Accounting</option>
            <option value="Career">Career</option>
            <option value="Business">Business</option>
            <option value="Maintenance">Maintenance</option>
            <option value="HVAC">HVAC</option>
            <option value="AC Repair">AC Repair</option>
            <option value="Home Appliance">Home Appliance</option>
            <option value="Montessori">Montessori</option>
            <option value="Industrial Electrician">
              Industrial Electrician
            </option>
            <option value="Building Electrician">
              Building Electrician
            </option>
            <option value="Automation">Automation</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="joinDate">Preferred Joining Date</label>
          <input
            id="joinDate"
            type="date"
            name="joinDate"
            value={formData.joinDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="terms-group">
          <input id="terms" type="checkbox" required />
          <label htmlFor="terms">
            I agree to the terms and conditions.
          </label>
        </div>

        <button type="submit" className="registration-submit">
          Register Now
        </button>

        {message && <p>{message}</p>}
      </form>
    </section>
  );
}

export default Registration;