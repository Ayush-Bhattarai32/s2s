import { useEffect, useRef, useState } from "react";

function StatItem({ target, suffix, label }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [started, target]);

  return (
    <div className="stat-box" ref={ref}>
      <h2>
        {count}
        {suffix}
      </h2>
      <p>{label}</p>
    </div>
  );
}

function Stats() {
  return (
    <section className="stats-section">
      <div className="stats-container">

        <StatItem
          target={500}
          suffix="+"
          label="Students Trained"
        />

        <StatItem
          target={20}
          suffix="+"
          label="Courses Offered"
        />

        <StatItem
          target={3}
          suffix="+"
          label="Years Experience"
        />

        <StatItem
          target={100}
          suffix="%"
          label="Student Satisfaction"
        />

        <StatItem
          target={100}
          suffix="%"
          label="Certification Support"
        />

      </div>
    </section>
  );
}

export default Stats;