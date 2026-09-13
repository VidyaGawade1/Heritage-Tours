import { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

const API_BASE_URL = "https://heritagetoursapp.duckdns.org";
const UPLOADS_URL = `${API_BASE_URL}/uploads`;

const getTourImageUrl = (image) => {
  if (!image) {
    return "";
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `${UPLOADS_URL}/${image}`;
};

const TourImage = ({ image, alt, className = "tour-table-image" }) => {
  const [hasError, setHasError] = useState(false);
  const imageUrl = getTourImageUrl(image);

  useEffect(() => {
    setHasError(false);
  }, [imageUrl]);

  if (!imageUrl || hasError) {
    return <div className={`${className} no-image`}>No Image</div>;
  }

  return (
    <img
      className={className}
      src={imageUrl}
      alt={alt}
      onError={() => setHasError(true)}
    />
  );
};

export default function ManageTours() {
  const [tours, setTours] = useState([]);
  const [editingTour, setEditingTour] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  // ================================
  // LOAD TOURS
  // ================================
  useEffect(() => {
    loadTours();
  }, []);

  useEffect(() => {
    return () => {
      if (editImagePreview) {
        URL.revokeObjectURL(editImagePreview);
      }
    };
  }, [editImagePreview]);

  const loadTours = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/tours`
      );

      setTours(response.data);
    } catch (error) {
      console.error("Error loading tours:", error);
      alert("Failed to load tours.");
    }
  };

  // ================================
  // DELETE TOUR
  // ================================
  const deleteTour = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) {
      return;
    }

    try {
      await axios.delete(
        `${API_BASE_URL}/api/tours/${id}`
      );

      await loadTours();

      alert("Tour deleted successfully.");
    } catch (error) {
      console.error("Error deleting tour:", error);
      alert("Failed to delete tour.");
    }
  };

  // ================================
  // UPDATE TOUR
  // ================================
  const updateTour = async () => {
    if (!editingTour) {
      return;
    }

    try {
      setLoading(true);

      const updateUrl = `${API_BASE_URL}/api/tours/${editingTour.id}`;

      if (editingTour.newImage) {
        const formData = new FormData();

        formData.append("name", editingTour.name || "");
        formData.append("location", editingTour.location || "");
        formData.append("category", editingTour.category || "");
        formData.append("price", editingTour.price || "");
        formData.append("duration", editingTour.duration || "");
        formData.append("description", editingTour.description || "");
        formData.append("image", editingTour.newImage);

        await axios.put(updateUrl, formData);
      } else {
        const updatedTour = {
          name: editingTour.name,
          location: editingTour.location,
          category: editingTour.category,
          price: editingTour.price,
          duration: editingTour.duration,
          description: editingTour.description,
          image: editingTour.image
        };

        await axios.put(updateUrl, updatedTour);
      }

      await loadTours();

      clearEditImagePreview();
      setEditingTour(null);

      alert("Tour updated successfully.");
    } catch (error) {
      console.error("Error updating tour:", error);

      alert("Failed to update tour.");
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // HANDLE POPUP INPUT
  // ================================
  const handleChange = (field, value) => {
    setEditingTour((previous) => ({
      ...previous,
      [field]: value
    }));
  };

  const clearEditImagePreview = () => {
    setEditImagePreview((previousPreview) => {
      if (previousPreview) {
        URL.revokeObjectURL(previousPreview);
      }

      return "";
    });
  };

  const handleEditImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    clearEditImagePreview();
    setEditImagePreview(URL.createObjectURL(file));
    setEditingTour((previous) => ({
      ...previous,
      newImage: file,
      imageName: file.name
    }));
  };

  const openEditPopup = (tour) => {
    clearEditImagePreview();
    setEditingTour({ ...tour });
  };

  // ================================
  // CLOSE POPUP
  // ================================
  const closePopup = () => {
    if (!loading) {
      clearEditImagePreview();
      setEditingTour(null);
    }
  };

  return (
    <div className="manage-tours">

      {/* ================================
          PAGE TITLE
      ================================= */}

      <h1>Manage Tours</h1>


      {/* ================================
          TOUR TABLE
      ================================= */}

      <table>

        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Category</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>


        <tbody>

          {tours.length === 0 ? (

            <tr>
              <td colSpan="7" className="no-tours">
                No tours found.
              </td>
            </tr>

          ) : (

            tours.map((tour) => (

              <tr key={tour.id}>

                {/* IMAGE */}

                <td data-label="Image">

                  <TourImage image={tour.image} alt={tour.name} />

                </td>


                {/* NAME */}

                <td data-label="Name">
                  {tour.name}
                </td>


                {/* LOCATION */}

                <td data-label="Location">
                  {tour.location}
                </td>


                {/* CATEGORY */}

                <td data-label="Category">
                  {tour.category}
                </td>


                {/* PRICE */}

                <td data-label="Price">
                  ₹{tour.price}
                </td>


                {/* DURATION */}

                <td data-label="Duration">
                  {tour.duration}
                </td>


                {/* ACTIONS */}

                <td data-label="Actions">

                  <button
                    type="button"
                    className="edit-btn"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      openEditPopup(tour);
                    }}
                  >
                    Edit
                  </button>


                  <button
                    type="button"
                    className="delete-btn"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      deleteTour(tour.id);
                    }}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>


      {/* ==================================================
          EDIT POPUP
      ================================================== */}

      {editingTour && (

        <div
          className="edit-popup-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closePopup();
            }
          }}
        >

          <div
            className="edit-popup"
          >

            {/* POPUP HEADER */}

            <div className="popup-header">

              <h2>
                Edit Tour
              </h2>

              <button
                className="popup-close"
                onClick={closePopup}
                disabled={loading}
              >
                ×
              </button>

            </div>


            {/* ================================
                IMAGE PREVIEW
            ================================= */}

            <div className="edit-image-preview">

              <label>
                {editImagePreview ? "New Image Preview" : "Current Image"}
              </label>

              {editImagePreview ? (
                <img
                  className="edit-preview-image"
                  src={editImagePreview}
                  alt="Selected tour"
                />
              ) : (
                <TourImage
                  image={editingTour.image}
                  alt={editingTour.name}
                  className="edit-preview-image"
                />
              )}

            </div>


            {/* ================================
                CHANGE IMAGE
            ================================= */}

            <div className="edit-upload-box">

              <label className="upload-button">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEditImageChange}
                  disabled={loading}
                />
              </label>

              <p>
                PNG, JPG, WEBP
              </p>

            </div>


            <div className="form-group">

              <label>
                Selected Image
              </label>

              <input
                value={editingTour.imageName || editingTour.image || ""}
                readOnly
              />

            </div>


            {/* ================================
                NAME
            ================================= */}

            <div className="form-group">

              <label>
                Name
              </label>

              <input
                type="text"
                value={editingTour.name || ""}
                onChange={(e) =>
                  handleChange(
                    "name",
                    e.target.value
                  )
                }
              />

            </div>


            {/* ================================
                LOCATION
            ================================= */}

            <div className="form-group">

              <label>
                Location
              </label>

              <input
                type="text"
                value={editingTour.location || ""}
                onChange={(e) =>
                  handleChange(
                    "location",
                    e.target.value
                  )
                }
              />

            </div>


            {/* ================================
                CATEGORY
            ================================= */}

            <div className="form-group">

              <label>
                Category
              </label>

              <input
                type="text"
                value={editingTour.category || ""}
                onChange={(e) =>
                  handleChange(
                    "category",
                    e.target.value
                  )
                }
              />

            </div>


            {/* ================================
                PRICE
            ================================= */}

            <div className="form-group">

              <label>
                Price
              </label>

              <input
                type="number"
                value={editingTour.price || ""}
                onChange={(e) =>
                  handleChange(
                    "price",
                    e.target.value
                  )
                }
              />

            </div>


            {/* ================================
                DURATION
            ================================= */}

            <div className="form-group">

              <label>
                Duration
              </label>

              <input
                type="text"
                value={editingTour.duration || ""}
                onChange={(e) =>
                  handleChange(
                    "duration",
                    e.target.value
                  )
                }
              />

            </div>


            {/* ================================
                BUTTONS
            ================================= */}

            <div className="popup-buttons">

              <button
                type="button"
                className="cancel-btn"
                onClick={closePopup}
                disabled={loading}
              >
                Cancel
              </button>


              <button
                type="button"
                className="update-btn"
                onClick={updateTour}
                disabled={loading}
              >

                {loading
                  ? "Updating..."
                  : "Update"
                }

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
