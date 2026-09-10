import { Link } from "react-router-dom";
import styles from "../css/Home.module.css";


const popularPlaces = [
  {
    name: "Raigad Fort",
    location: "Raigad",
    image: "/img/home/h4.webp",
  },
  {
    name: "Ajanta Caves",
    location: "Chhatrapati Sambhajinagar",
    image: "/img/home/h5.webp",
  },
  {
    name: "Shaniwar Wada",
    location: "Pune",
    image: "/img/home/h6.webp",
  },
];

export default function Home() {
  const handleSearch = (event) => {
    event.preventDefault();
  };

  return (
    <>
    
      <section id="home" className={styles.hero}>
        <div className={styles.overlay} />

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            Discover the legacy of Maharashtra
          </p>

          <h1>Journey Through Maharashtra</h1>

          <p className={styles.description}>
            Explore majestic forts, ancient caves, sacred temples and
            the timeless stories of the Maratha Empire.
          </p>

          <form
            className={styles.searchBox}
            onSubmit={handleSearch}
          >
            <label className={styles.searchField}>
              <span className={styles.icon}>⌕</span>

              <span className={styles.fieldContent}>
                <small>Destination</small>

                <select defaultValue="">
                  <option value="" disabled>
                    Select destination
                  </option>
                  <option value="raigad">Raigad Fort</option>
                  <option value="sinhagad">Sinhagad Fort</option>
                  <option value="pratapgad">Pratapgad Fort</option>
                  <option value="ajanta">Ajanta Caves</option>
                  <option value="ellora">Ellora Caves</option>
                </select>
              </span>
            </label>

            <label className={styles.searchField}>
              <span className={styles.icon}>▣</span>

              <span className={styles.fieldContent}>
                <small>Travel date</small>
                <input type="date" />
              </span>
            </label>

            <label className={styles.searchField}>
              <span className={styles.icon}>♙</span>

              <span className={styles.fieldContent}>
                <small>Travelers</small>

                <select defaultValue="2">
                  <option value="1">1 Traveler</option>
                  <option value="2">2 Travelers</option>
                  <option value="3">3 Travelers</option>
                  <option value="4">4 Travelers</option>
                  <option value="5">5+ Travelers</option>
                </select>
              </span>
            </label>

            <button
              type="submit"
              className={styles.exploreButton}
            >
              Explore Now
            </button>
          </form>
        </div>

        <a
          href="#destinations"
          className={styles.scrollButton}
        >
          <span>Explore Maharashtra</span>
          <span aria-hidden="true">↓</span>
        </a>
      </section>
      

      <section
        id="destinations"
        className={styles.destinations}
      >
        <div className={styles.sectionHeading}>
          <div>
            <p>Timeless Maharashtra</p>
            <h2>Heritage Experiences</h2>
          </div>

          <Link to="./destinations">View all places →</Link>
        </div>

        <div className={styles.cards}>
          <article className={styles.card}>
            <div className={styles.cardNumber}>01</div>
            <h3>Historic Forts</h3>
            <p>
              Discover Raigad, Sinhagad and Pratapgad,
              Maharashtra’s legendary hill forts.
            </p>
            <a href="/destinations">Explore forts →</a>
          </article>

          <article className={styles.card}>
            <div className={styles.cardNumber}>02</div>
            <h3>Ancient Caves</h3>
            <p>
              Experience the sculptures and paintings of Ajanta,
              Ellora and Elephanta.
            </p>
            <a href="/destinations">Explore caves →</a>
          </article>

          <article className={styles.card}>
            <div className={styles.cardNumber}>03</div>
            <h3>Sacred Temples</h3>
            <p>
              Visit Maharashtra’s historic temples and traditional
              architecture.
            </p>
            <a href="/destinations">Explore temples →</a>
          </article>
        </div>
      </section>
       <section className={styles.heritageStories}>
  <div className={styles.storyHeading}>
    <p>Stories Behind the Stone</p>
    <h2>More Than Monuments</h2>
    <span>
      Every fort, cave and temple carries a different chapter of
      Maharashtra’s history.
    </span>
  </div>

  <div className={styles.storyGrid}>
    <article className={styles.storyCard}>
      <img src="/img/home/h2.webp" alt="Historic Maharashtra fort" />

      <div className={styles.storyContent}>
        <span>Military Architecture</span>
        <h3>Forts Built with the Landscape</h3>

        <p>
          Maharashtra’s hill forts used cliffs, narrow gateways and
          hidden paths as natural defenses.
        </p>

        <strong>350+ historic forts</strong>
      </div>
    </article>

    <article className={styles.storyCard}>
      <img src="/img/home/h1.webp" alt="Ancient Maharashtra caves" />

      <div className={styles.storyContent}>
        <span>Rock-Cut Masterpieces</span>
        <h3>History Carved by Hand</h3>

        <p>
          Ajanta and Ellora were carved directly into volcanic rock
          using simple tools and generations of craftsmanship.
        </p>

        <strong>2,000 years of art</strong>
      </div>
    </article>

    <article className={styles.storyCard}>
      <img src="/img/home/h3.webp" alt="Temple in Maharashtra" />

      <div className={styles.storyContent}>
        <span>Living Traditions</span>
        <h3>Heritage Still in Practice</h3>

        <p>
          Maharashtra’s temples remain active cultural spaces for
          festivals, music, worship and local traditions.
        </p>

        <strong>Centuries of tradition</strong>
      </div>
    </article>
  </div>
</section>
      <section className={styles.popular}>
        <div className={styles.popularHeading}>
          <div>
            <p>Explore Maharashtra</p>
            <h2>Popular Destinations</h2>
          </div>

          <Link to="./destinations">View all →</Link>
        </div>

        <div className={styles.popularGrid}>
          {popularPlaces.map((place) => (
            <article
              className={styles.popularCard}
              key={place.name}
            >
              <div className={styles.popularImage}>
                <img src={place.image} alt={place.name} />
              </div>

              <div className={styles.popularContent}>
                <p>{place.location}, Maharashtra</p>
                <h3>{place.name}</h3>
                <a href="/destinations">Explore →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.aboutMaharashtra}>
  <div className={styles.aboutImage}>
    <img
      src="/img/home/w1.png"
      alt="Beautiful landscape and heritage of Maharashtra"
    />

  </div>

  <div className={styles.aboutContent}>
    <p className={styles.aboutEyebrow}>
      Welcome to Maharashtra
    </p>

    <h2>A Land of History, Culture and Natural Beauty</h2>

    <p>
      Maharashtra is one of India’s most culturally rich states,
      where ancient history meets modern life. Its landscape stretches
      from the Arabian Sea and Konkan coast to the Sahyadri mountains
      and the vast Deccan plateau.
    </p>

    <p>
      The state is home to legendary hill forts, ancient rock-cut
      caves, sacred temples, royal palaces and vibrant traditions.
      Every region offers a different experience, story and style of
      local culture.
    </p>

    <div className={styles.aboutDetails}>
      <div>
        <span>Capital</span>
        <strong>Mumbai</strong>
      </div>

      <div>
        <span>Language</span>
        <strong>Marathi</strong>
      </div>

      <div>
        <span>Known For</span>
        <strong>Forts & Caves</strong>
      </div>
    </div>

    <Link to="/about" className={styles.aboutButton}>
      Learn More About Maharashtra →
    </Link>
  </div>
</section>
  <section className={styles.reviewsSection}>
  <div className={styles.reviewsHeading}>
    <p>Traveler Stories</p>
    <h2>What Our Guests Say</h2>

    <span>
      Experiences shared by travelers who explored Maharashtra’s
      history and heritage.
    </span>
  </div>

  <div className={styles.reviewsGrid}>
    <article className={styles.reviewCard}>
      <div className={styles.reviewTop}>
        <img
          src="/img/home/p1.webp"
          alt="Sample traveler Ananya"
        />

        <div>
          <h3>Ananya Patil</h3>
          <span>Mumbai, Maharashtra</span>
        </div>
      </div>

      <div className={styles.stars} aria-label="5 out of 5 stars">
        ★★★★★
      </div>

      <blockquote>
        “The Raigad tour was beautifully planned. Our guide explained
        the history in a way that made the fort and its stories come
        alive.”
      </blockquote>

      <p className={styles.visitedPlace}>
        Visited: Raigad Fort
      </p>
    </article>

    <article className={styles.reviewCard}>
      <div className={styles.reviewTop}>
        <img
          src="/img/home/customer-2.webp"
          alt="Sample traveler Rahul"
        />

        <div>
          <h3>Rahul Deshmukh</h3>
          <span>Pune, Maharashtra</span>
        </div>
      </div>

      <div className={styles.stars} aria-label="5 out of 5 stars">
        ★★★★★
      </div>

      <blockquote>
        “Ajanta and Ellora were unforgettable. The itinerary gave us
        enough time to understand the art instead of rushing through
        the caves.”
      </blockquote>

      <p className={styles.visitedPlace}>
        Visited: Ajanta and Ellora
      </p>
    </article>

    <article className={styles.reviewCard}>
      <div className={styles.reviewTop}>
        <img
          src="/img/home/customer-3.webp"
          alt="Sample traveler Sneha"
        />

        <div>
          <h3>Sneha Kulkarni</h3>
          <span>Nagpur, Maharashtra</span>
        </div>
      </div>

      <div className={styles.stars} aria-label="5 out of 5 stars">
        ★★★★★
      </div>

      <blockquote>
        “The Pune heritage journey was organized very well. We
        discovered several historic places we had never known about.”
      </blockquote>

      <p className={styles.visitedPlace}>
        Visited: Pune Heritage Trail
      </p>
    </article>
  </div>
</section>
      
    </>
  );
}
