import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import styles from "../css/Destinations.module.css";

/*
====================================================
OLD DATA
====================================================
KEEP THIS DATA EXACTLY AS IT IS
====================================================
*/

const oldPackages = [
  {
    id: 1,
    name: "Raigad Fort Trail",
    location: "Raigad",
    category: "Forts",
    image: "/img/destinations/raigad.webp",
    rating: "4.9",
    reviews: 128,
    duration: "2 Days",
    price: "₹6,500",
  },
  {
    id: 2,
    name: "Ajanta Cave Experience",
    location: "Chhatrapati Sambhajinagar",
    category: "Caves",
    image: "/img/destinations/ajanta.webp",
    rating: "4.8",
    reviews: 185,
    duration: "2 Days",
    price: "₹7,500",
  },
  {
    id: 3,
    name: "Ellora Heritage Journey",
    location: "Chhatrapati Sambhajinagar",
    category: "UNESCO",
    image: "/img/destinations/ellora.webp",
    rating: "4.9",
    reviews: 214,
    duration: "3 Days",
    price: "₹9,500",
  },
  {
    id: 4,
    name: "Maratha Fort Circuit",
    location: "Pune and Satara",
    category: "Forts",
    image: "/img/destinations/fort-circuit.webp",
    rating: "4.8",
    reviews: 156,
    duration: "4 Days",
    price: "₹12,500",
  },
  {
    id: 5,
    name: "Pune Heritage Walk",
    location: "Pune",
    category: "Monuments",
    image: "/img/destinations/pune-heritage.webp",
    rating: "4.7",
    reviews: 96,
    duration: "1 Day",
    price: "₹2,500",
  },
  {
    id: 6,
    name: "Sacred Maharashtra",
    location: "Nashik",
    category: "Temples",
    image: "/img/destinations/sacred-maharashtra.webp",
    rating: "4.9",
    reviews: 172,
    duration: "3 Days",
    price: "₹8,500",
  },
];

/*
====================================================
FILTERS
====================================================
*/

const filters = [
  "All",
  "Forts",
  "Caves",
  "Temples",
  "Monuments",
  "UNESCO",
  "Culture",
  "range trek",
];

/*
====================================================
FORMAT DURATION
====================================================
*/

const formatDuration = (duration) => {
  if (!duration) {
    return "1 Day";
  }

  const value = String(duration).trim();

  if (value.toLowerCase().includes("day")) {
    return value;
  }

  return `${value} ${value === "1" ? "Day" : "Days"}`;
};

/*
====================================================
DESTINATIONS COMPONENT
====================================================
*/

export default function Destinations() {

  const [searchParams] = useSearchParams();

  /*
  ==================================================
  ADMIN ADDED TOURS
  ==================================================
  */

  const [newPackages, setNewPackages] = useState([]);

  const [activeFilter, setActiveFilter] =
    useState("All");

  /*
  ==================================================
  LOAD ADMIN TOURS
  ==================================================
  */

  useEffect(() => {
    loadTours();
  }, []);

  useEffect(() => {

    const selectedCategory =
      searchParams.get("category");

    const matchingFilter =
      filters.find(
        (filter) =>
          filter.toLowerCase() ===
          selectedCategory?.toLowerCase()
      );

    setActiveFilter(
      matchingFilter || "All"
    );

  }, [searchParams]);

  const loadTours = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8088/api/tours"
      );

      console.log(
        "Admin tours:",
        response.data
      );

      setNewPackages(response.data);

    } catch (error) {

      console.error(
        "Error loading admin tours:",
        error
      );

    }

  };

  /*
  ==================================================
  OLD DATA + ADMIN DATA
  ==================================================
  */

  const allPackages = [
    ...oldPackages,
    ...newPackages,
  ];

  /*
  ==================================================
  FILTERED DATA
  ==================================================
  */

  const filteredPackages =
    activeFilter === "All"
      ? allPackages
      : allPackages.filter(
          (tour) =>
            tour.category?.toLowerCase() ===
            activeFilter.toLowerCase()
        );

  /*
  ==================================================
  IMAGE
  ==================================================
  */

  const getImage = (tour) => {

    /*
    OLD IMAGE
    */

    if (
      tour.image &&
      tour.image.startsWith("/")
    ) {
      return tour.image;
    }

    /*
    ADMIN UPLOADED IMAGE
    */

    if (tour.image) {
      return `http://localhost:8088/uploads/${tour.image}`;
    }

    /*
    DEFAULT IMAGE
    */

    return "/img/destinations/raigad.webp";
  };

  /*
  ==================================================
  BOOK TOUR
  ==================================================
  */

  const handleBookTour = (tour) => {

    localStorage.setItem(
      "selectedTour",
      JSON.stringify(tour)
    );

    window.dispatchEvent(
      new CustomEvent("openBookingForm", {
        detail: { tour },
      })
    );
  };

  return (

    <main className={styles.page}>

      {/* ==========================================
          PAGE HERO
      ========================================== */}

      <section id="destinations" className={styles.hero}>

        <p>
          DISCOVER TIMELESS MAHARASHTRA
        </p>

        <h1>
          Popular Heritage Packages
        </h1>

        <span>
          Explore forts, caves, temples and historic
          cities through carefully designed Maharashtra
          heritage journeys.
        </span>

      </section>


      {/* ==========================================
          PACKAGES SECTION
      ========================================== */}

      <section id="packages" className={styles.packages}>

        {/* HEADING */}

        <div className={styles.heading}>

          <div>

            <p>
              Explore Maharashtra
            </p>

            <h2>
              Choose Your Journey
            </h2>

          </div>

          <span>
            {filteredPackages.length} packages
          </span>

        </div>


        {/* ========================================
            FILTERS
        ======================================== */}

        <div className={styles.filters}>

          {filters.map((filter) => (

            <button
              type="button"
              key={filter}
              className={
                activeFilter === filter
                  ? styles.activeFilter
                  : ""
              }
              onClick={() =>
                setActiveFilter(filter)
              }
            >
              {filter}
            </button>

          ))}

        </div>


        {/* ========================================
            PACKAGE CARDS
        ======================================== */}

        <div className={styles.grid}>

          {filteredPackages.map((tour) => (

            <article
              className={styles.card}
              key={`${tour.id}-${tour.name}`}
            >

              {/* IMAGE */}

              <div className={styles.cardImage}>

                <img
                  src={getImage(tour)}
                  alt={tour.name}

                  onError={(e) => {

                    console.log(
                      "Image not found:",
                      e.currentTarget.src
                    );

                    e.currentTarget.src =
                      "/img/destinations/raigad.webp";

                  }}
                />

                <span
                  className={styles.duration}
                >
                  {formatDuration(tour.duration)}
                </span>

                <span
                  className={styles.category}
                >
                  {tour.category}
                </span>

              </div>


              {/* CONTENT */}

              <div className={styles.cardContent}>

                <div className={styles.location}>

                  {tour.location}

                  {!tour.location
                    ?.toLowerCase()
                    .includes("maharashtra")
                    ? ", Maharashtra"
                    : ""}

                </div>


                <h3>
                  {tour.name}
                </h3>


                {/* RATING */}

                <div className={styles.rating}>

                  <span>
                    ★★★★★
                  </span>

                  <strong>
                    {tour.rating || "4.9"}
                  </strong>

                  <small>
                    ({tour.reviews || 0} reviews)
                  </small>

                </div>


                {/* PRICE + BUTTON */}

                <div
                  className={styles.cardBottom}
                >

                  <div
                    className={styles.price}
                  >

                    <small>
                      From
                    </small>

                    <strong>
                      {tour.price}
                    </strong>

                    <span>
                      / person
                    </span>

                  </div>


                  {/* =================================
                      BOOK TOUR BUTTON
                  ================================= */}

                  <button
                    type="button"
                    className={styles.viewButton}
                    onClick={() =>
                      handleBookTour(tour)
                    }
                  >
                    Book Tour
                  </button>

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>

    </main>

  );
}
