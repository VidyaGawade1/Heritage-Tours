import { Link, useParams } from "react-router-dom";
import "../css/tour.css";

const tours = {
  1: {
    title: "Raigad Fort Trail",
    location: "Raigad, Maharashtra",
    category: "FORTS",
    duration: "4 Days",
    price: "6,500",
    rating: "4.9",
    reviews: "128",
    image: "/raigad.jpg",
    description:
      "Explore the historic Raigad Fort and discover the glorious history of the Maratha Empire. Walk through ancient gateways, royal structures, temples and breathtaking mountain viewpoints.",
  },

  2: {
    title: "Ajanta Cave Experience",
    location: "Chhatrapati Sambhajinagar, Maharashtra",
    category: "CAVES",
    duration: "3 Days",
    price: "7,500",
    rating: "4.8",
    reviews: "185",
    image: "/ajanta.jpg",
    description:
      "Discover the magnificent Ajanta Caves and experience ancient Buddhist art, paintings, sculptures and remarkable rock-cut architecture.",
  },

  3: {
    title: "Ellora Heritage Journey",
    location: "Chhatrapati Sambhajinagar, Maharashtra",
    category: "MONUMENTS",
    duration: "3 Days",
    price: "9,500",
    rating: "4.9",
    reviews: "214",
    image: "/ellora.jpg",
    description:
      "Experience the spectacular Ellora Caves and the famous Kailasa Temple while discovering the cultural and architectural heritage of Maharashtra.",
  },

  4: {
    title: "Maratha Fort Circuit",
    location: "Pune and Satara, Maharashtra",
    category: "FORTS",
    duration: "4 Days",
    price: "8,500",
    rating: "4.8",
    reviews: "156",
    image: "/maratha-fort.jpg",
    description:
      "Journey through some of Maharashtra's most remarkable Maratha forts. Experience historic architecture, mountain landscapes and the legacy of the Maratha Empire.",
  },

  5: {
    title: "Pune Heritage Walk",
    location: "Pune, Maharashtra",
    category: "MONUMENTS",
    duration: "1 Day",
    price: "3,500",
    rating: "4.7",
    reviews: "96",
    image: "/pune.jpg",
    description:
      "Walk through the historic heart of Pune and discover important landmarks, traditional architecture, cultural stories and the city's rich heritage.",
  },

  6: {
    title: "Sacred Maharashtra",
    location: "Nashik, Maharashtra",
    category: "TEMPLES",
    duration: "3 Days",
    price: "6,900",
    rating: "4.9",
    reviews: "172",
    image: "/sacred.jpg",
    description:
      "Explore the spiritual heritage of Maharashtra through historic temples, sacred places and cultural landmarks around Nashik.",
  },
};

export default function Tour() {
  const { id } = useParams();

  const tour = tours[id];

  if (!tour) {
    return (
      <div className="tour-not-found">
        <h1>Tour Not Found</h1>

        <p>
          Sorry, the tour you are looking for is not available.
        </p>

        <Link to="/destinations">
          ← Back to Destinations
        </Link>
      </div>
    );
  }

  return (
    <main className="tour-page">

      {/* HERO */}

      <section className="tourHero">

        <img
          src={tour.image}
          alt={tour.title}
          className="tourHeroImage"
        />

        <div className="tourHeroOverlay">
          <p>{tour.location}</p>

          <h1>{tour.title}</h1>

          <div className="tourRating">
            ★★★★★
            <strong>{tour.rating}</strong>
            <span>({tour.reviews} reviews)</span>
          </div>
        </div>

      </section>


      {/* CONTENT */}

      <section className="tourContainer">

        <div className="tourMain">

          <span className="tourCategory">
            {tour.category}
          </span>

          <h2>Discover {tour.title}</h2>

          <p className="tourDescription">
            {tour.description}
          </p>


          {/* TOUR INFORMATION */}

          <div className="tourInfo">

            <div>
              <span>Duration</span>
              <strong>{tour.duration}</strong>
            </div>

            <div>
              <span>Location</span>
              <strong>{tour.location}</strong>
            </div>

            <div>
              <span>Category</span>
              <strong>{tour.category}</strong>
            </div>

            <div>
              <span>Rating</span>
              <strong>⭐ {tour.rating}</strong>
            </div>

          </div>


          {/* ITINERARY */}

          <section className="tourSection">

            <p className="sectionLabel">
              YOUR JOURNEY
            </p>

            <h2>Tour Itinerary</h2>

            <div className="itinerary">

              <div className="itineraryItem">
                <span>01</span>

                <div>
                  <h3>Arrival & Welcome</h3>
                  <p>
                    Arrive at your destination, check in to
                    your accommodation and enjoy local
                    sightseeing.
                  </p>
                </div>
              </div>


              <div className="itineraryItem">
                <span>02</span>

                <div>
                  <h3>Heritage Exploration</h3>
                  <p>
                    Explore historic landmarks, monuments,
                    temples and important cultural locations.
                  </p>
                </div>
              </div>


              <div className="itineraryItem">
                <span>03</span>

                <div>
                  <h3>Cultural Experience</h3>
                  <p>
                    Experience local traditions, food,
                    architecture and the stories behind
                    Maharashtra's heritage.
                  </p>
                </div>
              </div>


              <div className="itineraryItem">
                <span>04</span>

                <div>
                  <h3>Departure</h3>
                  <p>
                    Enjoy breakfast and final sightseeing
                    before your journey comes to an end.
                  </p>
                </div>
              </div>

            </div>

          </section>


          {/* INCLUDED */}

          <section className="tourSection">

            <p className="sectionLabel">
              TOUR DETAILS
            </p>

            <h2>What's Included</h2>

            <div className="includedGrid">

              <div>✓ Accommodation</div>
              <div>✓ Breakfast</div>
              <div>✓ Local Transportation</div>
              <div>✓ Heritage Guide</div>
              <div>✓ Entry Tickets</div>
              <div>✓ Local Experience</div>

            </div>

          </section>


          {/* NOT INCLUDED */}

          <section className="tourSection">

            <h2>What's Not Included</h2>

            <div className="excludedGrid">

              <div>✕ Personal Expenses</div>
              <div>✕ Lunch & Dinner</div>
              <div>✕ Travel To Destination</div>

            </div>

          </section>

        </div>


        {/* BOOKING CARD */}

        <aside className="bookingCard">

          <span>STARTING FROM</span>

          <h2>
            ₹{tour.price}
          </h2>

          <p>
            per person
          </p>

          <div className="bookingLine"></div>

          <div className="bookingDetail">
            <span>Duration</span>
            <strong>{tour.duration}</strong>
          </div>

          <div className="bookingDetail">
            <span>Rating</span>
            <strong>⭐ {tour.rating}</strong>
          </div>

          <Link
            to={`/booking?tour=${id}`}
            className="bookButton"
          >
            Book This Tour →
          </Link>

          <Link
            to="/destinations"
            className="backButton"
          >
            ← Back to Destinations
          </Link>

        </aside>

      </section>

    </main>
  );
}