import { useRef, useState } from "react";
import "./Admin.css";
import axios from "axios";

const initialTour = {
  name: "",
  location: "",
  category: "",
  price: "",
  duration: "",
  description: "",
  image: "",
  imageName: "",
};

const tourCategories = [
  "All",
  "Forts",
  "Caves",
  "Temples",
  "Monuments",
  "UNESCO",
  "Culture",
  "Range Trek",
];

export default function AddTour() {
  const [tour, setTour] = useState(initialTour);
  const [imagePreview, setImagePreview] = useState("");
  const imageInputRef = useRef(null);

  const handleChange = (e) => {
    setTour({
      ...tour,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setTour({
      ...tour,
      image: file,
      imageName: file.name,
    });

    setImagePreview((previousPreview) => {
      if (previousPreview) {
        URL.revokeObjectURL(previousPreview);
      }

      return URL.createObjectURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", tour.name);
    formData.append("location", tour.location);
    formData.append("category", tour.category);
    formData.append("price", tour.price);
    formData.append("duration", tour.duration);
    formData.append("description", tour.description);
    formData.append("image", tour.image);

    try {
      await axios.post("http://heritage-backend-env.eba-ktrdzivs.us-east-1.elasticbeanstalk.com/api/tours", formData);

      alert("Tour Added Successfully");
      setTour(initialTour);
      setImagePreview((previousPreview) => {
        if (previousPreview) {
          URL.revokeObjectURL(previousPreview);
        }

        return "";
      });

      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
      alert("Failed to Add Tour");
    }
  };
  return (
    <div className="add-tour-container">
      <div className="add-tour-card">
        <h1>Add Tour</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tour Name</label>
            <input
              name="name"
              value={tour.name}
              placeholder="Enter tour name"
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input
                name="location"
                value={tour.location}
                placeholder="Location"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={tour.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                {tourCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price</label>
              <input
                name="price"
                type="number"
                value={tour.price}
                placeholder="Price"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Duration</label>
              <input
                name="duration"
                value={tour.duration}
                placeholder="Duration"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows="5"
              value={tour.description}
              placeholder="Description"
              onChange={handleChange}
            />
          </div>

          <div className="image-upload-box">
            <label className="upload-button">
              Upload Image
              <input
                name="image"
                type="file"
                accept="image/*"
                ref={imageInputRef}
                onChange={handleImageChange}
              />
            </label>
            <p>PNG, JPG, WEBP</p>
          </div>

          {imagePreview && (
            <div className="image-preview">
              <h3>Image Preview</h3>
              <img src={imagePreview} alt="Selected tour" />
            </div>
          )}

          <div className="form-group">
            <label>Selected Image</label>
            <input value={tour.imageName} readOnly />
          </div>

          <button type="submit" className="add-tour-button">
            Add Tour
          </button>
        </form>
      </div>
    </div>
  );
}
