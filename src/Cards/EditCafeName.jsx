import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/EditCafeName.css";

const EditCafeName = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [loading, setLoading] = useState(false);
  const [id,changeId]= useState("");

  useEffect(() => {
    // Fetch current cafe name
    fetch("https://reviewbackend-990d.onrender.com/auth/cafe/getCafe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authToken: `Bearer ${localStorage.getItem("jwtTokenPauriWebSite")}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.name || "")
        setOriginalName(data.name || "");
        changeId(data.id || "");
    });
  }, []);

  const handleSave = () => {
    if (!name.trim()) {
      alert("Cafe name cannot be empty");
      return;
    }

    setLoading(true);

    try {
        console.log("DOING FETCH");
      fetch(
        "http://localhost:8080/auth/cafe/updateName",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            authToken: `Bearer ${localStorage.getItem(
                "jwtTokenPauriWebSite"
            )}`,
            cafe:{
                name:name,
                id:id
            },
          }),
        })
        .then((res)=>{
            if(res.ok) alert("Cafe name updated successfully");
            else alert("Failed to update cafe name");
        })

      navigate("/cafeDashBoard");
    } catch (err) {
      console.error(err);
      alert("Failed to update cafe name");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-page">
      <div className="edit-card">
        <h1>Edit Cafe Name</h1>
        <p className="subtitle">
          Update your cafe name as it will appear to customers.
        </p>

        <input
          type="text"
          value={name}
          placeholder="Enter cafe name"
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />

        <div className="button-row">
          <button className="secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button
            className="primary"
            onClick={handleSave}
            disabled={loading || name.trim() === originalName.trim()}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCafeName;