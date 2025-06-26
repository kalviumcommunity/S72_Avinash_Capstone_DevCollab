import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadedPath, setUploadedPath] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploadedPath(data.path);
  };

  return (
    <div>
      <h3>Upload a File</h3>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      {uploadedPath && (
        <p>
          File uploaded: <a href={uploadedPath}>{uploadedPath}</a>
        </p>
      )}
    </div>
  );
};

export default FileUpload;
