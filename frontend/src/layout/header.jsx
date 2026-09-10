import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/header.css";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Destinations", path: "/destinations" },
  { label: "About", path: "/about" },
  { label: "Stories", path: "/stories" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar({ loggedInUser, onLoginClick, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <nav className="navbar__container">

          {/* Logo */}
          <div className="navbar__brandText">
            <NavLink to="/" onClick={closeMenu}>
              <img
                src="/logo.png"
                alt="VG Explore Heritage"
              />
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="navbar__toggle"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span className={menuOpen ? "line line--one" : "line"} />
            <span className={menuOpen ? "line line--two" : "line"} />
            <span className={menuOpen ? "line line--three" : "line"} />
          </button>

          {/* Navigation */}
          <div
            className={`navbar__menu ${
              menuOpen ? "navbar__menu--open" : ""
            }`}
          >
            <ul className="navbar__links">
              {navItems.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "navbar__link navbar__link--active"
                        : "navbar__link"
                    }
                    onClick={closeMenu}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}

              {loggedInUser && (
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive
                        ? "navbar__link navbar__link--active"
                        : "navbar__link"
                    }
                    onClick={closeMenu}
                  >
                    Profile
                  </NavLink>
                </li>
              )}
            </ul>

            {/* Login Button */}
            {loggedInUser ? (
              <button
                type="button"
                className="navbar__button"
                onClick={() => {
                  closeMenu();
                  onLogout();
                }}
              >
                Logout
              </button>
            ) : (
              <button
                type="button"
                className="navbar__button"
                onClick={() => {
                  closeMenu();
                  onLoginClick();
                }}
              >
                Login
              </button>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
