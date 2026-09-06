import chairman from "../assets/chairman.jpg";
import md from "../assets/MD1.jpg";
import ayush from "../assets/Ayush 1.jpg";
import prashant from "../assets/prashant.jpeg";

function Team() {
  const teamMembers = [
    {
      name: "Suresh Neupane",
      role: "Chairman",
      image: chairman,
    },
    {
      name: "Saroj Neupane",
      role: "Managing Director",
      image: md,
    },
    {
      name: "Ayush Bhattarai",
      role: "IT Head",
      image: ayush,
    },
    {
      name: "Prashant Pokhrel",
      role: "Graphic Designer",
      image: prashant,
    },
  ];

  return (
    <section className="team-section" id="team">
      <div className="section-heading">
        <p>Meet Our Team</p>
        <h2>Our Dedicated Team</h2>
        <span>
          Meet the people working behind S2S Consultant & Technical
          Education Center.
        </span>
      </div>

      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <div className="team-image">
              <img src={member.image} alt={member.name} />
            </div>

            <div className="team-info">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Team;