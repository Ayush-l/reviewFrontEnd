import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import imageUpload from "../imageUpload"
import "../CSS/ManageImages.css";

const MAX_IMAGES = 7;

const ManageImages = () => {
  const navigate = useNavigate();

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id,changeId]=useState("");

  /* Fetch cafe images */
  useEffect(() => {
    fetch("https://reviewbackend-990d.onrender.com/auth/cafe/getCafe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authToken: `Bearer ${localStorage.getItem("jwtTokenPauriWebSite")}`,
      }),
    })
      .then((res) => res.json())
      .then((data) =>{
        setExistingImages(data.images || [])
        changeId(data.id || "");
      })
      .catch(() => navigate("/cafedashboard"));
  }, []);

  /* Add new images */
  const handleAddImages = (e) => {
    const files = Array.from(e.target.files);

    if (existingImages.length + newImages.length + files.length > MAX_IMAGES) {
      alert(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setNewImages((prev) => [...prev, ...previews]);
  };

  /* Remove image */
  const removeExistingImage = (idx) => {
    setExistingImages(existingImages.filter((_, i) => i !== idx));
  };

  const removeNewImage = (idx) => {
    setNewImages(newImages.filter((_, i) => i !== idx));
  };

  /* Save changes */
  const handleSave = async () => {
    setLoading(true);

    try {
      // Upload new images (you already have imageUpload util)
      const uploadedUrls = [];
      for (const img of newImages) {
        const url = await imageUpload(img.file);
        uploadedUrls.push(url);
      }
      console.log(uploadedUrls);
      const updatedImages = [...existingImages, ...uploadedUrls];

      const res = await fetch(
        "https://reviewbackend-990d.onrender.com/file/uploadcafeimage",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            {
                authToken: `Bearer ${localStorage.getItem("jwtTokenPauriWebSite")}`,
                cafe:{
                    images: updatedImages,
                    id:id
                }
            }
        ),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      navigate("/cafedashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to update images");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manage-images-page">
      <div className="manage-images-card">
        <h1>Manage Cafe Images</h1>
        <p className="subtitle">
          Add or remove images that represent your cafe
        </p>

        <div className="image-grid">
          {existingImages.map((img, idx) => (
            <div key={idx} className="image-box">
              <img src={img} alt="cafe" />
              <button onClick={() => removeExistingImage(idx)}>×</button>
            </div>
          ))}

          {newImages.map((img, idx) => (
            <div key={idx} className="image-box new">
              <img src={img.preview} alt="new" />
              <button onClick={() => removeNewImage(idx)}>×</button>
            </div>
          ))}
        </div>

        <label className="upload-btn">
          + Add Images
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleAddImages}
            hidden
          />
        </label>

        <div className="button-row">
          <button className="secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button
            className="primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageImages;