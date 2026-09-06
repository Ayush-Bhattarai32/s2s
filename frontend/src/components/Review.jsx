function Review() {
  return (
    <section className="review-section">
      <div className="section-heading">
        <p>Share Your Experience</p>
        <h2>Leave a Review</h2>
        <span>
          Your feedback helps us improve our education and training services.
        </span>
      </div>

      <form
        className="review-form"
        action="https://formsubmit.co/ayushbh733@gmail.com"
        method="POST"
      >
        <input
          type="hidden"
          name="_subject"
          value="New S2S Student Review"
        />

        <input
          type="hidden"
          name="_captcha"
          value="false"
        />

        <div className="form-group">
          <label htmlFor="review-name">Your Name</label>
          <input
            id="review-name"
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="review-email">Email</label>
          <input
            id="review-email"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="review-course">Course</label>
          <input
            id="review-course"
            type="text"
            name="course"
            placeholder="Which course did you take?"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="review-message">Your Review</label>
          <textarea
            id="review-message"
            name="message"
            rows="5"
            placeholder="Write your review..."
            required
          ></textarea>
        </div>

        <button type="submit" className="review-submit">
          Submit Review
        </button>
      </form>
    </section>
  );
}

export default Review;