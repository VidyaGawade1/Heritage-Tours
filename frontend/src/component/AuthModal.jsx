import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AuthModal.css";
const USERS_API_URL = "https://heritagetoursapp.duckdns.org/api/users";
const USER_LOGIN_URL = `${USERS_API_URL}/login`;
const USER_REGISTER_URL = `${USERS_API_URL}/register`;

export default function AuthModal({
  closeModal,
  onLoginSuccess,
  redirectAdmin = true,
}) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const finishLogin = (user) => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    onLoginSuccess?.(user);
    closeModal();
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const userEmail = loginEmail.trim();
    const userPassword = password.trim();

    if (userEmail === "admin@gmail.com") {
      if (userPassword !== "admin123") {
        alert("Invalid Email or Password");
        return;
      }

      finishLogin({
        fullName: "Admin",
        email: userEmail,
        role: "ADMIN",
      });

      if (redirectAdmin) {
        navigate("/admin");
      }

      return;
    }

    try {
      const response = await fetch(USER_LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        alert(message || "Please register first, then login.");
        setIsLogin(false);
        return;
      }

      const registeredUser = await response.json();

      finishLogin({
        ...registeredUser,
        role: registeredUser.role || "USER",
      });
    } catch (error) {
      console.error("User login error:", error);
      alert("Unable to login. Please try again.");
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and Confirm Password must match.");
      return;
    }

    const userEmail = loginEmail.trim();

    const newUser = {
      fullName: fullName.trim() || loginEmail.split("@")[0],
      email: userEmail,
      password: password.trim(),
      phone: phone.trim(),
      age: age.trim(),
      gender,
      address: address.trim(),
      city: city.trim(),
      state: stateName.trim(),
      pincode: pincode.trim(),
      role: "USER",
    };

    let savedUser = null;

    try {
      const response = await fetch(USER_REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const message = await response.text();
        alert(message || "Registration failed");
        return;
      }

      savedUser = await response.json();
    } catch (error) {
      console.error("Registration error:", error);
      alert("Unable to register. Please try again.");
      return;
    }

    finishLogin({
      ...savedUser,
      password: undefined,
      role: savedUser.role || "USER",
    });
  };

  return (
    <div className="auth-overlay" onClick={closeModal}>
      <div className="auth-modal" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="auth-close"
          onClick={closeModal}
          aria-label="Close login form"
        >
          X
        </button>

        {showForgot ? (
          <>
            <h2 className="auth-title">Forgot Password</h2>

            <form className="auth-form">
              <div className="auth-action-row">
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />

                <button type="button" className="auth-submit auth-inline-button">
                  Send OTP
                </button>
              </div>

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
              />

              <div className="auth-action-row">
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />

                <button type="button" className="auth-submit auth-inline-button">
                  Reset Password
                </button>
              </div>
            </form>

            <p className="auth-switch">
              <span onClick={() => setShowForgot(false)}>Back To Login</span>
            </p>
          </>
        ) : (
          <>
            <h2 className="auth-title">{isLogin ? "Login" : "Register"}</h2>

            <form
              className="auth-form"
              onSubmit={isLogin ? handleLogin : handleRegister}
            >
              {!isLogin && (
                <>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    required
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                  />

                  <div className="auth-field-row">
                    <input
                      type="number"
                      placeholder="Age"
                      value={age}
                      onChange={(event) => setAge(event.target.value)}
                      required
                    />

                    <select
                      value={gender}
                      onChange={(event) => setGender(event.target.value)}
                      required
                    >
                      <option value="">Gender</option>
                      <option>Female</option>
                      <option>Male</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <textarea
                    placeholder="Full Address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    required
                  />

                  <div className="auth-field-row">
                    <input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      required
                    />

                    <input
                      type="text"
                      placeholder="State"
                      value={stateName}
                      onChange={(event) => setStateName(event.target.value)}
                      required
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(event) => setPincode(event.target.value)}
                    required
                  />
                </>
              )}

              <input
                type="email"
                placeholder="Email Address"
                value={loginEmail}
                onChange={(event) => setLoginEmail(event.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              {!isLogin && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
              )}

              {isLogin && (
                <div className="forgot-password">
                  <button
                    type="button"
                    className="forgot-btn"
                    onClick={() => setShowForgot(true)}
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button type="submit" className="auth-submit">
                {isLogin ? "Login" : "Create Account"}
              </button>
            </form>

            <p className="auth-switch">
              {isLogin ? "Don't have an account?" : "Already have an account?"}

              <span onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? " Register" : " Login"}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
