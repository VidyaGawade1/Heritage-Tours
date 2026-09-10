import { Link } from "react-router-dom";
import "../css/about.css";


export default function About() {
  return (
    <main className="aboutPage">

      {/* ================= HERO ================= */}

      <section id="about" className="aboutHero">

        <img
          src="/img/about/a1.webp"
          alt="Maharashtra Heritage"
        />

        <div className="aboutHeroOverlay">

          <p>ABOUT VG EXPLORE HERITAGE</p>

          <h1>
            Discover the Soul
            <br />
            of Maharashtra
          </h1>

          <span>
            Explore the history, culture, heritage and
            unforgettable journeys of Maharashtra.
          </span>

        </div>

      </section>


      {/* ================= OUR STORY ================= */}

      <section id="about-story" className="aboutStory">

        <div className="aboutStoryImage">

          <img
            src="/img/about/a1.webp"
            alt="Ancient caves of Maharashtra"
          />

        </div>

        <div className="aboutStoryContent">

          <p className="aboutLabel">
            OUR STORY
          </p>

          <h2>
            Where History Meets
            <br />
            the Journey
          </h2>

          <p>
            Maharashtra is a land where history and culture
            live in every corner. From magnificent forts and
            ancient caves to sacred temples and vibrant
            traditions, every destination has a story to tell.
          </p>

          <p>
            VG Explore Heritage was created to help travelers
            discover these remarkable places and experience
            the rich heritage of Maharashtra.
          </p>

          <Link
            to="/destinations"
            className="aboutButton"
          >
            Explore Destinations →
          </Link>

        </div>

      </section>


      {/* ================= FIVE IMAGES ================= */}

      <section className="heritageGallery">

        <div className="galleryHeading">

          <p>EXPLORE MAHARASHTRA</p>

          <h2>
            A Land of Stories,
            <br />
            Culture & Heritage
          </h2>

          <span>
            Discover the diverse experiences that make
            Maharashtra truly special.
          </span>

        </div>


        <div className="galleryGrid">

          {/* IMAGE 1 */}

          <div className="galleryCard galleryLarge">

            <img
              src="/img/about/forts.webp"
              alt="Historic fort"
            />

            <div className="galleryText">
              <span>01</span>
              <h3>Historic Forts</h3>
              <p>
                Walk through the legacy of Maharashtra's
                legendary forts.
              </p>
            </div>

          </div>


          {/* IMAGE 2 */}

          <div className="galleryCard">

            <img
              src="/img/about/caves.webp"
              alt="Ancient caves"
            />

            <div className="galleryText">
              <span>02</span>
              <h3>Ancient Caves</h3>
              <p>
                Discover remarkable rock-cut architecture
                and ancient art.
              </p>
            </div>

          </div>


          {/* IMAGE 3 */}

          <div className="galleryCard">

            <img
              src="/img/about/temple.webp"
              alt="Temple in Maharashtra"
            />

            <div className="galleryText">
              <span>03</span>
              <h3>Sacred Places</h3>
              <p>
                Experience the spiritual heritage of
                Maharashtra.
              </p>
            </div>

          </div>


          {/* IMAGE 4 */}

          <div className="galleryCard">

            <img
              src="/img/about/culture.webp"
              alt="Maharashtra culture"
            />

            <div className="galleryText">
              <span>04</span>
              <h3>Rich Culture</h3>
              <p>
                Experience traditional art, food, festivals
                and local traditions.
              </p>
            </div>

          </div>


          {/* IMAGE 5 */}

          <div className="galleryCard galleryWide">

            <img
              src="/img/about/nature.webp"
              alt="Maharashtra landscape"
            />

            <div className="galleryText">
              <span>05</span>
              <h3>Natural Beauty</h3>
              <p>
                From mountains and waterfalls to peaceful
                landscapes, discover another side of Maharashtra.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= WHAT WE OFFER ================= */}

      <section className="offerSection">

        <div className="offerHeading">

          <p>WHAT WE OFFER</p>

          <h2>
            Everything You Need
            <br />
            for Your Journey
          </h2>

        </div>


        <div className="offerGrid">

          <div className="offerCard">
            <span>01</span>
            <h3>Heritage Destinations</h3>
            <p>
              Explore forts, caves, temples, palaces and
              historic landmarks.
            </p>
          </div>


          <div className="offerCard">
            <span>02</span>
            <h3>Curated Journeys</h3>
            <p>
              Discover carefully selected travel experiences
              across Maharashtra.
            </p>
          </div>


          <div className="offerCard">
            <span>03</span>
            <h3>Stories & History</h3>
            <p>
              Learn about the stories and traditions behind
              every destination.
            </p>
          </div>


          <div className="offerCard">
            <span>04</span>
            <h3>Cultural Experiences</h3>
            <p>
              Experience Maharashtra through its culture,
              food, festivals and traditions.
            </p>
          </div>

        </div>

      </section>


      {/* ================= MISSION ================= */}

      <section className="missionSection">

        <div className="missionImage">

          <img
            src="/img/about/culture.webp"
            alt="Maharashtra culture"
          />

        </div>

        <div className="missionContent">

          <p>OUR MISSION</p>

          <h2>
            Travel With Meaning.
            <br />
            Discover With Purpose.
          </h2>

          <span>
            Our mission is to inspire travelers to explore
            Maharashtra responsibly, appreciate its heritage
            and create meaningful travel experiences.
          </span>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="aboutCTA">

        <p>YOUR NEXT JOURNEY AWAITS</p>

        <h2>
          Ready to Explore
          <br />
          Maharashtra?
        </h2>

        <span>
          Start your journey through Maharashtra's incredible
          heritage, culture and landscapes.
        </span>

        <div className="aboutCTAButtons">

          <Link
            to="/destinations"
            className="ctaPrimary"
          >
            Explore Destinations
          </Link>

          <Link
            to="/experiences"
            className="ctaSecondary"
          >
            Discover Experiences
          </Link>

        </div>

      </section>

    </main>
  );
}
