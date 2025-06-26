import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const FileUpload = ({ onUploadSuccess, onUploadError }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      setUploading(true);
      setUploadProgress(0);

      try {
        const formData = new FormData();
        acceptedFiles.forEach((file) => {
          formData.append("files", file);
        });

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/upload/multiple`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(progress);
            },
          }
        );

        if (onUploadSuccess) {
          onUploadSuccess(response.data);
        }
      } catch (error) {
        console.error("Upload error:", error);
        if (onUploadError) {
          onUploadError(error.response?.data?.message || "Upload failed");
        }
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    },
    [onUploadSuccess, onUploadError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/plain": [".txt"],
      "text/javascript": [".js"],
      "text/css": [".css"],
      "text/html": [".html"],
      "application/json": [".json"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }
          ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input {...getInputProps()} disabled={uploading} />
        <div className="space-y-4">
          <div className="text-4xl text-gray-400">
            <i className="fas fa-cloud-upload-alt"></i>
          </div>
          {uploading ? (
            <div className="space-y-2">
              <p className="text-gray-600">Uploading...</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-600">
                {isDragActive
                  ? "Drop the files here..."
                  : "Drag and drop files here, or click to select files"}
              </p>
              <p className="text-sm text-gray-500">
                Supported formats: Images, PDF, DOC, DOCX, TXT, JS, CSS, HTML,
                JSON
                <br />
                Max file size: 5MB
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
