import React, { useEffect, useState } from "react";
import "../CSS/ProductCard.css";
import { useParams } from "react-router-dom";
import DishCard2 from "./DishCard2";
import ImageCarousal from "./ImageCarousal";
import StarRating from "./StarRating";

export default function ProductCard() {
  const { id } = useParams();

  const [restaurantName, setRestaurantName] = useState("");
  const [product, setProduct] = useState(null);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetch(`https://reviewbackend-990d.onrender.com/getcafe/get/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cafe");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setDishes(data.dishes || []);
        setRestaurantName(data.name);
      })
      .catch((error) => {
        Navigate("/login");
        localStorage.removeItem("jwtTokenPauriWebSite");
      });
  }, [id]);

  if (!product) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>
      Loading cafe details…
    </p>;
  }


  return (
    <div className="product-page">
      {/* HERO SECTION */}
      <div className="product-hero">
        <div className="hero-left">
          <h1>{restaurantName}</h1>
          <p className="address">{product.address}</p>

          <div className="rating-row">
            <StarRating onRate={(product.cafeRating!=null)?product.cafeRating:0} />
          </div>
        </div>

        <div className="hero-right">
          <ImageCarousal images={product.images || []} />
        </div>
      </div>

      {/* DISH SECTION */}
      <section className="dish-section">
        <h2>Popular Dishes</h2>

        {(!dishes || dishes.length === 0) ? (
          <p className="no-dishes">No dishes added yet</p>
        ) : (
          <div className="dish-grid" style={{gap:"26px",gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))",alignContent:"space-between"}}>
            {dishes.map((dish) => {
              const count=dish.ratingCount?.reduce((a, b) => a + b, 0) || 0;
              return (
                <div key={dish.name} style={{ position: "relative" }}>
                  <DishCard2
                    src={dish.url}
                    name={dish.name}
                    rating={dish.rating}
                    idDish={dish.name}
                    id={product.id}
                    style={{ margin: "20px" }}
                    reviews={{count}}
                  />
                </div>
              );
            })} 
          </div>
        )}
      </section>
    </div>
  );
}