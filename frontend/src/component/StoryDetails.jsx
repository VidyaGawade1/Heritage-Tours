import { useParams } from "react-router-dom";

const stories = {
  1: {
    title: "The Legacy of Raigad Fort",
    image: "/img/stories/raigad.webp",
    content: `
      Raigad Fort served as the capital of the Maratha Empire under
      Chhatrapati Shivaji Maharaj. Located in the Sahyadri mountain range,
      it remains one of Maharashtra's most important historical landmarks.

      Visitors can explore the royal palace ruins, marketplace, and the
      magnificent throne area while learning about the glorious Maratha history.
    `,
  },

  2: {
    title: "The Mystery of Ajanta Caves",
    image: "/img/stories/ajanta.webp",
    content: `
      The Ajanta Caves are a UNESCO World Heritage Site known for their
      ancient Buddhist paintings and sculptures.

      These caves date back more than 2000 years and showcase remarkable
      artistic achievements that continue to attract visitors from around
      the world.
    `,
  },

  3: {
    title: "The Story of Ellora",
    image: "/img/stories/ellora.webp",
    content: `
      Ellora is famous for its rock-cut temples and caves representing
      Buddhism, Hinduism, and Jainism.

      The Kailasa Temple is considered one of the greatest examples of
      ancient Indian architecture.
    `,
  },

  4: {
    title: "Legends of Sinhagad",
    image: "/img/stories/sinhagad.webp",
    content: `
      Sinhagad Fort is famous for the bravery of Tanaji Malusare during
      the Battle of Sinhagad.

      The fort stands as a symbol of courage, sacrifice, and the spirit
      of the Maratha warriors.
    `,
  },

  5: {
    title: "The Spiritual Side of Maharashtra",
    image: "/img/stories/temple.webp",
    content: `
      Maharashtra is home to many sacred temples and pilgrimage sites.

      From Pandharpur to Trimbakeshwar, these places reflect the spiritual
      traditions and cultural heritage of the region.
    `,
  },

  6: {
    title: "The Living Culture of Maharashtra",
    image: "/img/stories/culture.webp",
    content: `
      Maharashtra's culture is reflected through its festivals, food,
      folk art, music, and traditions.

      These living traditions continue to connect people with their rich
      heritage and history.
    `,
  },
};

export default function StoryDetails() {
  const { id } = useParams();

  const story = stories[id];

  if (!story) {
    return <h1>Story Not Found</h1>;
  }

  return (
    <div className="storyDetails">

      <div className="storyHero">
        <img
          src={story.image}
          alt={story.title}
        />
      </div>

      <div className="storyContent">

        <h1>{story.title}</h1>

        <p>{story.content}</p>

      </div>

    </div>
  );
}
