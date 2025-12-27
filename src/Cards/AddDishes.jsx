import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Capitalize from "./Capitalize";
import "../CSS/AddDishes.css";

const AddDishes = () => {
  const navigate = useNavigate();

  const [allDishes, setAllDishes] = useState([]);
  const [addedDishes, setAddedDishes] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://reviewbackend-990d.onrender.com/auth/cafe/getCafe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authToken: `Bearer ${localStorage.getItem("jwtTokenPauriWebSite")}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let dishes = [];
        for (let i of data.dishes) {
          dishes.push(i.name);
        }
        setAddedDishes(dishes);
      });

    fetch("https://reviewbackend-990d.onrender.com/auth/dish/get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(setAllDishes);
  }, []);

  const toggleDish = (dish) => {
    if (addedDishes.includes(dish.name)) return;

    setSelected((prev) =>
      prev.includes(dish.name)
        ? prev.filter((d) => d !== dish.name)
        : [...prev, dish.name]
    );
  };

  const handleSave = async () => {
    if (selected.length === 0) {
      alert("No dishes selected");
      return;
    }

    setLoading(true);

    try {
      for (let i of selected) {
        const res = await fetch(
          "https://reviewbackend-990d.onrender.com/auth/cafe/adddish",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              dish: { name: i },
              authToken: `Bearer ${localStorage.getItem("jwtTokenPauriWebSite")}`,
            }),
          }
        );
        if (!res.ok) throw new Error("Failed to add dishes");
        navigate("/cafedashboard");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-dishes-page">
      <div className="add-dishes-card">
        <h1>Add Dishes</h1>
        <p className="subtitle">Select dishes to add to your cafe menu</p>

        <div className="dish-grid">
          {allDishes.map((dish, idx) => {
            const isAdded = addedDishes.includes(dish.name);
            const isSelected = selected.includes(dish.name);

            return (
              <div
                key={idx}
                className={`dish-card ${
                  isAdded ? "added" : isSelected ? "selected" : ""
                }`}
                onClick={() => toggleDish(dish)}
              >
                <img src={dish.url} alt={dish.name} />
                <h4>{Capitalize(dish.name)}</h4>

                {isAdded && <span className="badge added">Added</span>}
                {!isAdded && isSelected && (
                  <span className="badge selected">Selected</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="button-row">
          <button className="secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button className="primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Add Selected"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDishes;
