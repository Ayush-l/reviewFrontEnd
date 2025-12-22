import React from 'react'


const CLOUD_NAME = "dzzeooch1";
const UPLOAD_PRESET = "react_preset";



const imageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    
    const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
        method: "POST",
        body: formData,
    }
    );
    
    const data = await res.json();
    return data.secure_url;
};

export default imageUpload