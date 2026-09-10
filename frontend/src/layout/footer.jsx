import { Link } from "react-router-dom";
import "../css/footer.css";

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <rect
      x="4"
      y="4"
      width="16"
      height="16"
      rx="5"
    />
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="17" cy="7" r="1" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.4l0.6-3h-3V9c0-0.6 0.4-1 1-1Z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <rect
      x="3"
      y="6"
      width="18"
      height="12"
      rx="4"
    />
    <path d="M10 9.5v5l5-2.5-5-2.5Z" />
  </svg>
);

export default function Footer() {
  const handleSubscribe = (event) => {
    event.preventDefault();
  };

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <Link
            to="/"
            className="footer__logoLink"
          >
            <img
              src="/logo.png"
              alt="VG Maharashtra Heritage"
              className="footer__logo"
            />
          </Link>

          <p>
            Discover Maharashtra’s legendary forts, ancient caves,
            sacred temples and timeless cultural heritage.
          </p>

          <div className="footer__socials">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
            >
              <InstagramIcon />
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
            >
              <FacebookIcon />
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              title="YouTube"
            >
              <YoutubeIcon />
            </a>
          </div>
        </div>

        <div className="footer__column">
          <h3>Explore</h3>

          <Link to="/destinations#packages">Destinations</Link>
          <Link to="/destinations#packages">Heritage Tours</Link>
          <Link to="/stories#stories">Stories</Link>
          <Link to="/about#about">About Us</Link>
          <Link to="/contact#contact">Contact</Link>
        </div>

        <div className="footer__column">
          <h3>Heritage</h3>

          <Link to="/destinations?category=Forts#packages">Historic Forts</Link>
          <Link to="/destinations?category=Caves#packages">Ancient Caves</Link>
          <Link to="/destinations?category=Temples#packages">Sacred Temples</Link>
          <Link to="/destinations?category=UNESCO#packages">UNESCO Sites</Link>
        </div>

        <div className="footer__newsletter">
          <h3>Travel Inspiration</h3>

          <p>
            Receive Maharashtra destination guides and heritage
            stories in your inbox.
          </p>

          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Email address"
              required
            />

            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer__divider" />

      <div className="footer__bottom">
        <p>© 2026 VG Maharashtra Heritage. All rights reserved.</p>

        <div>
          <Link to="/contact#contact">Privacy Policy</Link>
          <Link to="/contact#contact">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
