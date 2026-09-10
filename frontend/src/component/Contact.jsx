import "../css/contact.css";

export default function Contact() {
  return (
    <div className="contactPage">

      <section id="contact" className="contactHero">
        <h1>Contact Us</h1>
        <p>
          Start planning your Maharashtra heritage journey today.
        </p>
      </section>

      <section className="contactContainer">

        <div className="contactForm">

          <h2>Send Enquiry</h2>

          <form>

            <input
              type="text"
              placeholder="Full Name"
            />

            <input
              type="email"
              placeholder="Email Address"
            />

            <input
              type="tel"
              placeholder="Phone Number"
            />

            <select>
              <option>Select Destination</option>
              <option>Raigad Fort</option>
              <option>Ajanta Caves</option>
              <option>Ellora Caves</option>
              <option>Sinhagad Fort</option>
            </select>

            <textarea
              rows="5"
              placeholder="Your Message"
            ></textarea>

            <button type="submit">
              Send Enquiry
            </button>

          </form>

        </div>


        <div className="contactInfo">

          <h2>Get In Touch</h2>

          <div className="infoBox">
            <h4>📍 Address</h4>
            <p>
              Pune, Maharashtra, India
            </p>
          </div>

          <div className="infoBox">
            <h4>📞 Phone</h4>
            <p>+91 9876543210</p>
          </div>

          <div className="infoBox">
            <h4>✉ Email</h4>
            <p>info@vgheritage.com</p>
          </div>

          <div className="infoBox">
            <h4>🕒 Working Hours</h4>
            <p>
              Monday - Saturday
              <br />
              9:00 AM - 6:00 PM
            </p>
          </div>

        </div>

      </section>

      <section className="contactMap">

        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb="
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>

      </section>

    </div>
  );
}
