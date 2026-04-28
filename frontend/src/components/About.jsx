import './About.css';

const About = () => {
  return (
    <div className="about">
      <h1>About ShelfX</h1>
      <p>
        Welcome to ShelfX, where technology meets literature to create an unparalleled reading experience.
        Our platform is designed to make book discovery, borrowing, and management as seamless as possible for both readers and administrators.
      </p>
      <p>
        Founded with the vision of democratizing access to knowledge, we provide a comprehensive digital solution that bridges the gap between
        traditional library services and modern digital convenience. Whether you're a student, researcher, or avid reader, our system offers
        everything you need to explore, borrow, and enjoy a vast collection of books.
      </p>
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          To revolutionize book management by leveraging cutting-edge technology to create an inclusive, efficient, and user-friendly
          environment that fosters learning, research, and intellectual growth. We are committed to making knowledge accessible to everyone,
          everywhere, at any time.
        </p>
      </section>
      <section className="team">
        <h2>Our Commitment</h2>
        <p>
          Our dedicated team of developers, librarians, and technology experts works tirelessly to ensure that our platform remains at the
          forefront of digital library innovation. We continuously update our system with the latest features and security measures to
          provide you with the best possible experience.
        </p>
      </section>
    </div>
  );
};

export default About;