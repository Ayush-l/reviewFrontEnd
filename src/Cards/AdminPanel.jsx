import React, { useEffect, useState } from "react";
import "../CSS/AdminPanel.css";
import { useNavigate } from "react-router-dom";
import imageUpload from "../imageUpload";

const AdminPanel = () => {
  const navigate = useNavigate();

  const [dishes, setDishes] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [newDish, setNewDish] = useState({ name: "", image: null });

  useEffect(() => {
    fetch("https://reviewbackend-990d.onrender.com/auth/dish/get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authToken: `Bearer ${localStorage.getItem("jwtTokenPauriWebSite")}`,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("NOT ALLOWED");
      })
      .then((data) => {
        const dishesData = data.map((dish) => ({
          name: dish.name,
          imageUrl: dish.url,
        }));
        setDishes(dishesData);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    return () => {
      dishes.forEach((d) => d.imageUrl && URL.revokeObjectURL(d.imageUrl));
    };
  }, [dishes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDish({ ...newDish, [name]: value });
  };

  const handleImageChange = (e) => {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setNewDish({ ...newDish, image: e.target.files[0] });
  };

  const handleAddDish = async (e) => {
    e.preventDefault();
    if (newDish.name && newDish.image) {
      for (let i of dishes) {
        if (i.name === newDish.name) {
          alert("Dish with this name already exists!");
          return;
        }
      }
      const url = await imageUpload(newDish.image);
      setDishes([...dishes, { name: newDish.name, imageUrl: url }]);
      fetch("https://reviewbackend-990d.onrender.com/auth/dish/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newDish.name,
          url: url,
          jwtToken: `Bearer ${localStorage.getItem("jwtTokenPauriWebSite")}`,
        }),
      });
    }
  };

  const handleDeleteDish = async (dishName, e) => {
    const url = await imageUpload(newDish.image);
  };

  const handleUpdateImage = (index, e) => {
    const updated = [...dishes];
    updated[index].image = URL.createObjectURL(e.target.files[0]);
    setDishes(updated);
  };


  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
      </header>

      {dishes.length !== 0 && (
        <section className="dishes-section">
          <h2>Existing Dishes</h2>
          <div className="dish-list">
            {dishes.map((dish, index) => (
              <div className="dish-card" key={index}>
                <button className="delete-btn" onClick={() => handleDeleteDish(dish.name, dish.imageUrl)}>🗑</button>
                <img src={dish.imageUrl} alt={dish.name} />
                <div className="dish-info">
                  <h3>{dish.name.charAt(0).toUpperCase() + dish.name.slice(1)}</h3>
                  <label className="update-btn">
                    Update Image
                    <input type="file" accept="image/*" onChange={(e) => handleUpdateImage(index, e)} />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="add-dish-section">
        <h2>Add New Dish</h2>
        <form onSubmit={handleAddDish}>
          <input type="text" name="name" placeholder="Dish Name" value={newDish.name} onChange={handleInputChange} required />
          <input type="file" accept="image/*" onChange={handleImageChange} required />

          {previewImage && (
            <div className="image-preview-box">
              <img src={previewImage} alt="Preview" />
              <p>Image Preview</p>
            </div>
          )}

          <button type="submit">Add Dish</button>
        </form>
      </section>
    </div>
  );
};

export default AdminPanel;
