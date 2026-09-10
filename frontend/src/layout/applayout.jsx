import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthModal from "../component/AuthModal";
import { saveBooking } from "../services/bookingService";
import "../css/applayout.css";
import Footer from "./footer";
import Header from "./header";

/*
====================================================
GET DATA FROM LOCAL STORAGE
====================================================
*/

const getStoredJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const getValidStoredUser = () => {
  const savedUser = getStoredJson("loggedInUser", null);

  if (!savedUser) {
    return null;
  }

  return savedUser;
};


/*
====================================================
APP LAYOUT
====================================================
*/

export default function AppLayout() {

  const navigate = useNavigate();

  const location = useLocation();


  /*
  ==================================================
  STATES
  ==================================================
  */

  const [showBooking, setShowBooking] = useState(false);

  const [bookingSuccess, setBookingSuccess] = useState(null);

  const [showAuth, setShowAuth] = useState(false);

  const [openBookingAfterLogin, setOpenBookingAfterLogin] =
    useState(false);


  /*
  ==================================================
  LOGGED IN USER
  ==================================================
  */

  const [loggedInUser, setLoggedInUser] = useState(() =>
    getValidStoredUser()
  );


  /*
  ==================================================
  BOOKING FORM
  ==================================================
  */

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [destination, setDestination] = useState("");


  /*
  ==================================================
  SCROLL TO FOOTER LINK SECTION
  ==================================================
  */

  useEffect(() => {

    const scrollTimer = window.setTimeout(() => {

      if (location.hash) {

        const section = document.getElementById(
          location.hash.replace("#", "")
        );

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }

        return;
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }, 100);

    return () => {
      window.clearTimeout(scrollTimer);
    };

  }, [
    location.pathname,
    location.search,
    location.hash
  ]);


  /*
  ==================================================
  SELECTED TOUR
  ==================================================
  */

  const setSelectedTour = useCallback((tour) => {

    if (!tour) {
      return;
    }

    localStorage.setItem(
      "selectedTour",
      JSON.stringify(tour)
    );

    setDestination(tour.name || "");

  }, []);


  /*
  ==================================================
  OPEN BOOKING FORM
  ==================================================
  */

  const openBookingForm = useCallback(
    (tour = null) => {

      /*
      Save selected tour
      */

      if (tour) {
        setSelectedTour(tour);
      }

      setBookingSuccess(null);


      /*
      USER NOT LOGGED IN
      */

      if (!loggedInUser) {

        setOpenBookingAfterLogin(true);

        setShowAuth(true);

        return;
      }


      /*
      USER ALREADY LOGGED IN
      */

      setName(
        loggedInUser.fullName || ""
      );

      setEmail(
        loggedInUser.email || ""
      );

      setPhone(
        loggedInUser.phone || ""
      );


      /*
      If selected tour exists,
      restore it
      */

      const selectedTour =
        getStoredJson(
          "selectedTour",
          null
        );

      if (selectedTour) {

        setDestination(
          selectedTour.name || ""
        );

      }


      setShowBooking(true);

    },
    [
      loggedInUser,
      setSelectedTour
    ]
  );


  /*
  ==================================================
  ESCAPE KEY
  ==================================================
  */

  useEffect(() => {

    if (!showBooking) {
      return undefined;
    }


    const handleEscape = (event) => {

      if (event.key === "Escape") {

        setShowBooking(false);

        setBookingSuccess(null);

      }

    };


    document.addEventListener(
      "keydown",
      handleEscape
    );


    return () => {

      document.removeEventListener(
        "keydown",
        handleEscape
      );

    };

  }, [showBooking]);


  /*
  ==================================================
  LISTEN FOR BOOK TOUR FROM TOUR CARD
  ==================================================
  */

  useEffect(() => {

    const handleBookingRequest = (event) => {

      openBookingForm(
        event.detail?.tour || null
      );

    };


    window.addEventListener(
      "openBookingForm",
      handleBookingRequest
    );


    return () => {

      window.removeEventListener(
        "openBookingForm",
        handleBookingRequest
      );

    };

  }, [openBookingForm]);


  /*
  ==================================================
  LOGIN SUCCESS
  ==================================================
  */

  const handleLoginSuccess = (user) => {

    /*
    Save logged-in user
    */

    setLoggedInUser(user);


    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(user)
    );


    /*
    LOGIN → BOOKING
    */

    if (openBookingAfterLogin) {

      setName(
        user.fullName || ""
      );

      setEmail(
        user.email || ""
      );

      setPhone(
        user.phone || ""
      );


      /*
      Restore selected tour
      */

      const selectedTour =
        getStoredJson(
          "selectedTour",
          null
        );


      if (selectedTour) {

        setDestination(
          selectedTour.name || ""
        );

      }


      setShowAuth(false);

      setShowBooking(true);

      setOpenBookingAfterLogin(false);

      return;
    }


    /*
    ADMIN LOGIN
    */

    if (
      user.role &&
      user.role.toLowerCase() === "admin"
    ) {

      navigate("/admin");

      return;
    }


    /*
    NORMAL USER LOGIN
    */

    navigate("/profile");

  };


  /*
  ==================================================
  CLOSE LOGIN
  ==================================================
  */

  const closeAuthModal = () => {

    setShowAuth(false);

    setOpenBookingAfterLogin(false);

  };


  /*
  ==================================================
  CLOSE BOOKING
  ==================================================
  */

  const closeBookingModal = () => {

    setShowBooking(false);

    setBookingSuccess(null);

  };

  const goToProfileAfterBooking = () => {

    closeBookingModal();

    navigate("/profile");

  };


  /*
  ==================================================
  LOGOUT
  ==================================================
  */

  const handleLogout = () => {

    localStorage.removeItem(
      "loggedInUser"
    );

    localStorage.removeItem(
      "selectedTour"
    );


    setLoggedInUser(null);

    closeBookingModal();

    setName("");

    setEmail("");

    setPhone("");

    setDestination("");


    navigate("/");

  };


  /*
  ==================================================
  SUBMIT BOOKING
  ==================================================
  */

  const handleSubmit = async (event) => {

    event.preventDefault();


    /*
    CHECK LOGIN
    */

    const storedUser =
      getStoredJson(
        "loggedInUser",
        null
      );


    if (!storedUser) {

      setShowBooking(false);

      setOpenBookingAfterLogin(true);

      setShowAuth(true);

      return;
    }


    /*
    GET SELECTED TOUR
    */

    const selectedTour =
      getStoredJson(
        "selectedTour",
        null
      );


    /*
    BOOKING DATA
    */

    const bookingData = {

      fullName:
        storedUser.fullName || name,

      email:
        storedUser.email || email,

      phone:
        phone || storedUser.phone || "",

      destination:
        destination ||
        selectedTour?.name ||
        "",

    };


    /*
    VALIDATION
    */

    if (!bookingData.fullName) {

      alert("Please enter your full name.");

      return;

    }


    if (!bookingData.email) {

      alert("Please enter your email.");

      return;

    }


    if (
      !bookingData.phone ||
      !/^[0-9]{10}$/.test(
        bookingData.phone
      )
    ) {

      alert(
        "Please enter a valid 10 digit phone number."
      );

      return;

    }


    if (!bookingData.destination) {

      alert(
        "Please select a destination."
      );

      return;

    }


    /*
    ==================================================
    SAVE TO DATABASE
    ==================================================
    */

    try {

      console.log(
        "Sending booking to backend:",
        bookingData
      );


      const savedBooking =
        await saveBooking(
          bookingData
        );


      console.log(
        "Booking saved in database:",
        savedBooking
      );


      /*
      Show thank you message after database save.
      */

      setBookingSuccess(
        bookingData
      );


      /*
      CLEAR FORM
      */

      setName("");

      setEmail("");

      setPhone("");

      setDestination("");


      /*
      Keep selected tour if needed,
      or remove it after successful booking.
      */

      localStorage.removeItem(
        "selectedTour"
      );


    } catch (error) {

      console.error(
        "Booking error:",
        error
      );


      if (error.response) {

        console.error(
          "Backend response:",
          error.response.data
        );

      }


      alert(
        "Failed to submit booking. Please try again."
      );

    }

  };


  /*
  ==================================================
  RETURN
  ==================================================
  */

  return (

    <>

      {/* HEADER */}

      <Header
        loggedInUser={loggedInUser}

        onLoginClick={() =>
          setShowAuth(true)
        }

        onLogout={handleLogout}
      />


      {/* PAGE */}

      <main>

        <Outlet />

      </main>


      {/* =================================================
          FLOATING BOOK TOUR BUTTON
      ================================================= */}

      <button
        type="button"
        className="floatingBookingBtn"
        onClick={() =>
          openBookingForm()
        }
      >

        Book Tour

      </button>


      {/* =================================================
          LOGIN / REGISTER MODAL
      ================================================= */}

      {showAuth && (

        <AuthModal

          closeModal={
            closeAuthModal
          }

          onLoginSuccess={
            handleLoginSuccess
          }

          redirectAdmin={
            !openBookingAfterLogin
          }

        />

      )}


      {/* =================================================
          BOOKING MODAL
      ================================================= */}

      {showBooking && (

        <div
          className="bookingOverlay"

          onClick={closeBookingModal}
        >

          <div
            className="bookingModal"

            onClick={(event) =>
              event.stopPropagation()
            }
          >


            {/* CLOSE */}

            <button
              type="button"
              className="closeBtn"

              onClick={closeBookingModal}

              aria-label="Close booking form"
            >

              X

            </button>


            {bookingSuccess ? (

              <div className="bookingThankYou">

                <div className="bookingThankYouIcon">
                  ✓
                </div>

                <h2>
                  Thank You!
                </h2>

                <p>
                  Your booking request for{" "}
                  <strong>
                    {bookingSuccess.destination}
                  </strong>{" "}
                  has been submitted successfully.
                </p>

                <span>
                  We will contact you soon with the journey details.
                </span>

                <div className="bookingThankYouActions">

                  <button
                    type="button"
                    onClick={closeBookingModal}
                  >
                    Done
                  </button>

                  <button
                    type="button"
                    className="secondaryBookingBtn"
                    onClick={goToProfileAfterBooking}
                  >
                    View Profile
                  </button>

                </div>

              </div>

            ) : (

              <>

                {/* TITLE */}

                <h2>
                  Book Your Journey
                </h2>


                {/* FORM */}

                <form
                  className="bookingForm"
                  onSubmit={handleSubmit}
                >


                  {/* NAME */}

                  <input
                    type="text"

                    placeholder="Full Name"

                    value={name}

                    onChange={(event) =>
                      setName(
                        event.target.value
                      )
                    }

                    required
                  />


                  {/* EMAIL */}

                  <input
                    type="email"

                    placeholder="Email Address"

                    value={email}

                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }

                    required
                  />


                  {/* PHONE */}

                  <input
                    type="tel"

                    placeholder="Phone Number"

                    value={phone}

                    onChange={(event) => {

                      const value =
                        event.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);

                      setPhone(value);

                    }}

                    pattern="[0-9]{10}"

                    maxLength={10}

                    required
                  />


                  {/* DESTINATION */}

                  <select
                    value={destination}

                    onChange={(event) =>
                      setDestination(
                        event.target.value
                      )
                    }

                    required
                  >

                    <option value="">
                      Select Destination
                    </option>

                    <option value="Raigad Fort">
                      Raigad Fort
                    </option>

                    <option value="Ajanta Caves">
                      Ajanta Caves
                    </option>

                    <option value="Ellora Caves">
                      Ellora Caves
                    </option>

                    <option value="Sinhagad Fort">
                      Sinhagad Fort
                    </option>

                  </select>


                  {/* SUBMIT */}

                  <button
                    type="submit"
                  >

                    Submit Booking

                  </button>

                </form>

              </>

            )}

          </div>

        </div>

      )}


      {/* FOOTER */}

      <Footer />

    </>

  );

}
