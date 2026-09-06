import { useState } from "react";

function Services() {
  const [showAll, setShowAll] = useState(false);

  const services = [
    {
      icon: "fa-solid fa-computer",
      title: "Computer Classes",
      description: "Basic to advanced computer training for students and professionals.",
    },
    {
      icon: "fa-solid fa-language",
      title: "Korean Language Classes",
      description: "Korean language training to help students prepare for opportunities abroad.",
    },
    {
      icon: "fa-solid fa-file-invoice-dollar",
      title: "Financial Reports & Audits",
      description: "Professional financial reporting and auditing support for businesses.",
    },
    {
      icon: "fa-solid fa-building",
      title: "Company Registration & Renewal",
      description: "Assistance with company registration, renewal, and related documentation.",
    },
    {
      icon: "fa-solid fa-calculator",
      title: "Accounting Training",
      description: "Practical accounting training for students and business professionals.",
    },
    {
      icon: "fa-solid fa-file-lines",
      title: "Business Tax Certificate",
      description: "Support for D01, D02 and other business tax-related services.",
    },
    {
      icon: "fa-solid fa-laptop-file",
      title: "Online Tax Payment System",
      description: "Assistance with online tax payment and related digital services.",
    },
    {
      icon: "fa-solid fa-user-tie",
      title: "Career Counselling",
      description: "Career guidance and counselling to help students choose the right path.",
    },
    {
      icon: "fa-solid fa-chart-line",
      title: "Business Plan & Training",
      description: "Business planning, training, and professional counselling.",
    },
    {
      icon: "fa-solid fa-screwdriver-wrench",
      title: "Maintenance Work",
      description: "Various maintenance and technical support services.",
    },
    {
      icon: "fa-solid fa-wind",
      title: "HVAC Training",
      description: "Practical HVAC training for technical career development.",
    },
    {
      icon: "fa-solid fa-snowflake",
      title: "Refrigerator & AC Repairing",
      description: "Training in refrigerator and air-conditioner repair and maintenance.",
    },
    {
      icon: "fa-solid fa-house",
      title: "Home Appliance Repair",
      description: "Practical training for repairing different home appliances.",
    },
    {
      icon: "fa-solid fa-chalkboard-user",
      title: "Montessori Teacher Training",
      description: "Teacher training focused on Montessori teaching methods.",
    },
    {
      icon: "fa-solid fa-bolt",
      title: "Industrial Electrician",
      description: "Industrial electrical installation, maintenance, and practical training.",
    },
    {
      icon: "fa-solid fa-plug",
      title: "Building Electrician",
      description: "Training in building electrical installation and maintenance.",
    },
    {
      icon: "fa-solid fa-house-signal",
      title: "Automation Training",
      description: "Industrial and home automation training and practical knowledge.",
    },
  ];

  const visibleServices = showAll ? services : services.slice(0, 5);

  return (
    <section className="services-section" id="services">
      <div className="section-heading">
        <p>What We Offer</p>

        <h2>Our Services</h2>

        <span>
          Quality education, technical training, and professional
          services designed to help you build your future.
        </span>
      </div>

      <div className="services-container">
        {visibleServices.map((service, index) => (
          <div className="flip-card" key={index}>
            <div className="flip-card-inner">

              {/* Front */}
              <div className="flip-card-front">
                <i className={service.icon}></i>
                <h3>{service.title}</h3>
              </div>

              {/* Back */}
              <div className="flip-card-back">
                <i className={service.icon}></i>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>

            </div>
          </div>
        ))}
      </div>

      <div className="services-button-container">
        <button
          className="services-toggle"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "See Less" : "See More"}

          <i
            className={
              showAll
                ? "fa-solid fa-chevron-up"
                : "fa-solid fa-chevron-down"
            }
          ></i>
        </button>
      </div>

      <p className="services-note">
        Also: Monthly & Quarterly accounting of VAT businesses,
        E-PAN, E-TDS & various online related work.
      </p>
    </section>
  );
}

export default Services;