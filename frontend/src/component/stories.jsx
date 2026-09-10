import { Link } from "react-router-dom";
import "../css/stories.css";

const stories = [
  {
    id: 1,
    category: "FORTS & LEGENDS",
    title: "The Legacy of Raigad Fort",
    description:
      "Discover the history, stories and legacy of one of Maharashtra's most iconic forts.",
    image: "/img/stories/raigad.webp",
    location:
      "https://www.google.com/maps/search/?api=1&query=Raigad+Fort",
  },

  {
    id: 2,
    category: "ANCIENT WONDERS",
    title: "The Mystery of Ajanta Caves",
    description:
      "Step into a world of ancient paintings, sculptures and remarkable rock-cut architecture.",
    image: "/img/stories/ajanta.webp",
    location:
      "https://www.google.com/maps/search/?api=1&query=Ajanta+Caves",
  },

  {
    id: 3,
    category: "ANCIENT WONDERS",
    title: "The Story of Ellora",
    description:
      "Explore the extraordinary caves where different traditions and architectural styles meet.",
    image: "/img/stories/ellora.webp",
    location:
      "https://www.google.com/maps/search/?api=1&query=Ellora+Caves",
  },

  {
    id: 4,
    category: "FORTS & LEGENDS",
    title: "Legends of Sinhagad",
    description:
      "Discover the stories of courage and sacrifice connected with this legendary fort.",
    image: "/img/stories/sinhagad.webp",
    location:
      "https://www.google.com/maps/search/?api=1&query=Sinhagad+Fort",
  },

  {
    id: 5,
    category: "SACRED STORIES",
    title: "The Spiritual Side of Maharashtra",
    description:
      "Explore sacred places, traditions and spiritual journeys across Maharashtra.",
    image: "/img/stories/temple.webp",
    location:
      "https://www.google.com/maps/search/?api=1&query=Pandharpur+Temple",
  },

  {
    id: 6,
    category: "CULTURE & TRADITIONS",
    title: "The Living Culture of Maharashtra",
    description:
      "Discover festivals, food, music, art and traditions that continue to shape Maharashtra.",
    image: "/img/stories/culture.webp",
    location:
      "https://www.google.com/maps/search/?api=1&query=Kolhapur",
  },
];

export default function Stories() {
  return (
    <main className="storiesPage">

      {/* ================= HERO ================= */}

      <section id="stories" className="storiesHero">

        <div className="storiesHeroContent">

          <p>STORIES OF MAHARASHTRA</p>

          <h1>
            Every Place
            <br />
            Has a Story
          </h1>

          <span>
            Discover the legends, people, culture and history
            behind Maharashtra's most remarkable places.
          </span>

        </div>

      </section>


      {/* ================= FEATURED STORY ================= */}

      <section className="featuredStory">

        <div className="featuredImage">

          <img
            src="/img/stories/raigad.webp"
            alt="Raigad Fort"
          />

        </div>

        <div className="featuredContent">

          <p className="storyLabel">
            FEATURED STORY
          </p>

          <h2>
            The Legacy of
            <br />
            Raigad Fort
          </h2>

          <p>
            Rising among the Sahyadri mountains, Raigad Fort
            carries centuries of history and stories of the
            Maratha era.
          </p>

          <p>
            Discover the people, events and legacy that make
            Raigad one of Maharashtra's most important
            historical landmarks.
          </p>

          <Link
            to="/stories/raigad"
            className="readStoryButton"
          >
            Full Story →
          </Link>

        </div>

      </section>


      {/* ================= STORIES ================= */}

      <section id="stories-list" className="storiesSection">

        <div className="storiesHeading">

          <div>

            <p>EXPLORE OUR STORIES</p>

            <h2>
              Stories Worth
              <br />
              Discovering
            </h2>

          </div>

          <span>
            From legendary forts to ancient caves and
            vibrant traditions, discover the stories that
            make Maharashtra unique.
          </span>

        </div>


        {/* ================= STORY CARDS ================= */}

        <div className="storiesGrid">

          {stories.map((story) => (

            <article
              className="storyCard"
              key={story.id}
            >

              <div className="storyImage">

                <img
                  src={story.image}
                  alt={story.title}
                />

                <span className="storyNumber">
                  0{story.id}
                </span>

              </div>


              <div className="storyCardContent">

                <p>
                  {story.category}
                </p>

                <h3>
                  {story.title}
                </h3>

                <span>
                  {story.description}
                </span>

               <a
  href={story.location}
  target="_blank"
  rel="noopener noreferrer"
  className="locationBtn"
>
  View Location 📍
</a>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* ================= CATEGORIES ================= */}

      <section className="storyCategories">

        <p>DISCOVER BY CATEGORY</p>

        <h2>
          Find Your Kind
          <br />
          of Story
        </h2>

        <div className="categoryList">

          <Link to="/stories/forts">
            <span>01</span>
            Forts & Legends
            <b>→</b>
          </Link>

          <Link to="/stories/ancient-wonders">
            <span>02</span>
            Ancient Wonders
            <b>→</b>
          </Link>

          <Link to="/stories/sacred">
            <span>03</span>
            Sacred Stories
            <b>→</b>
          </Link>

          <Link to="/stories/culture">
            <span>04</span>
            Culture & Traditions
            <b>→</b>
          </Link>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="storiesCTA">

        <p>YOUR JOURNEY STARTS HERE</p>

        <h2>
          Go Beyond the
          <br />
          Destination
        </h2>

        <span>
          Explore Maharashtra through its stories,
          history and unforgettable experiences.
        </span>

        <div className="storiesCTAButtons">

          <Link
            to="/destinations"
            className="storiesPrimary"
          >
            Explore Destinations
          </Link>

          <Link
            to="/experiences"
            className="storiesSecondary"
          >
            Discover Experiences
          </Link>

        </div>

      </section>

    </main>
  );
}
