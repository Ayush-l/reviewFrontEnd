import React, { useState } from "react";
import "../CSS/AddCafe.css";

const AddCafe = () => {
  const [cafeName, setCafeName] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 7) {
      alert("You can only upload up to 7 images.");
      return;
    }

    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cafe Name:", cafeName);
    console.log("Images:", images);
    alert("Form submitted!");
  };

  const removeImage = (idx) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  return (
    <div className="cafe-form-container">
      <form onSubmit={handleSubmit} className="cafe-form">
        <h2 className="title">Add Your Cafe</h2>

        <div className="input-group">
          <label htmlFor="cafeName">Cafe Name</label>
          <input
            type="text"
            id="cafeName"
            value={cafeName}
            onChange={(e) => setCafeName(e.target.value)}
            placeholder="Enter cafe name"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="images">Upload Images (max 7)</label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>

        <div className={`image-preview ${images.length === 0 ? "no-images" : ""}`}>
          {images.length === 0 && <p className="placeholder-text">No images selected</p>}
          {images.map((img, idx) => (
            <div key={idx} className="image-container">
              <img src={img} alt={`preview-${idx}`} />
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeImage(idx)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="submit-btn">
          Submit Cafe
        </button>
      </form>
    </div>
  );
};

export default AddCafe;