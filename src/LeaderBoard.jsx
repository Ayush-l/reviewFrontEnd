import React, { useEffect, useState } from "react";
import RestaurantCard from "./Cards/RestaurantCard";
import Pagination from "./Cards/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import "../CSS/LeaderBoard.css";

const LeaderBoard = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // page number (1-based)

  const [cafes, setCafes] = useState([]);
  const [currPage, setCurrPage] = useState(Number(id) || 1);
  const [totalPages, setTotalPages] = useState(1);

  const onPageChange = (page) => {
    setCurrPage(page);
    navigate(`/leaderboard/${page}`);
  };

  useEffect(() => {
    fetch(`https://reviewbackend-990d.onrender.com/getcafe/getall/${currPage}`)
      .then((res) => {
        console.log(res)
        if (!res.ok) throw new Error("Failed to fetch cafes");
        return res.json();
      })
      .then((page) => {
        setCafes(page.content);
        setTotalPages(page.totalPages);
      })
      // .catch(() => navigate("/login"));
  }, [currPage]);

  return (
    <div className="leaderboard-page">
      <h1 className="leaderboard-title">🏆 Leaderboard</h1>

      <div className="cafes-grid">
        {cafes.map((cafe) =>(
            <RestaurantCard
              key={cafe.id}
              id={cafe.id}
              name={cafe.name}
              rating={cafe.rating}
              srcImg={cafe.image}
            />

          ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default LeaderBoard;