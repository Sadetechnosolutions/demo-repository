import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const allowedExtensions = [".zip"];
const imageExtensions = [".jpg", ".jpeg", ".png", ".gif"];

function DragDrop() {
  const [file, setFile] = useState(null);
  
  const handleChange = (droppedFiles) => {
      console.log("Dropped files:", droppedFiles);

    
    if (droppedFiles.length === 0) {
      alert("No files dropped.");
      return;
    }

    const firstFile = droppedFiles[0];
    if (!firstFile) {
      alert("Invalid file format. Please drop a valid ZIP file.");
      return;
    }

    const fileName = firstFile.name?.toLowerCase();
    if (!fileName) {
      alert("Invalid file format. Please drop a valid ZIP file.");
      return;
    }

    const fileExtension = fileName.substring(fileName.lastIndexOf("."));
    if (allowedExtensions.includes(fileExtension)) {
      // Check if the ZIP file contains images
      const containsImages = firstFile.files?.some((file) =>
        imageExtensions.includes(file.name.toLowerCase())
      );
      if (containsImages) {
        setFile(firstFile);
      } else {
        alert("The ZIP file does not contain images.");
      }
    } else {
      alert("Please drop a ZIP file.");
    }
  };

  return <FileUploader handleChange={handleChange} name="file" />;
}

export default DragDrop;
