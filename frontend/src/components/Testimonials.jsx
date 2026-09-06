import boy from "../assets/boy.jpg";
import girl from "../assets/girl.avif";

function Testimonials() {
  const testimonials = [
    {
      name: "Ram Sharma",
      course: "Basic Computer",
      image: boy,
      message:
        "The training was very helpful and practical. I learned many useful computer skills.",
    },
    {
      name: "Sita KC",
      course: "Basic Computer",
      image: girl,
      message:
        "The teachers were supportive and explained everything clearly. I really enjoyed the training.",
    },
    {
      name: "Hari Neupane",
      course: "Accounting Training",
      image: boy,
      message:
        "The accounting training gave me practical knowledge that I can use in my work.",
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="section-heading">
        <p>Student Reviews</p>
        <h2>What Our Students Say</h2>
        <span>
          Hear from students who have experienced our training and services.
        </span>
      </div>

      <div className="testimonials-container">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <div className="testimonial-stars">
              ★ ★ ★ ★ ★
            </div>

            <p className="testimonial-message">
              "{testimonial.message}"
            </p>

            <div className="testimonial-person">
              <img
                src={testimonial.image}
                alt={testimonial.name}
              />

              <div>
                <h3>{testimonial.name}</h3>
                <p>{testimonial.course}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;