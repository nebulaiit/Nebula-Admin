import React, { useEffect, useRef, useState } from 'react'
import './CourseContent.css'
import BackIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';

export default function CourseContent({ onBack, onNext }) {
      // State to track uploaded content
  const [uploadedContent, setUploadedContent] = useState([]);

  // State to handle the visibility of dropdowns
  const [activeDropdown, setActiveDropdown] = useState(null);  // track which dropdown is open

  // Refs for different input types
  const fileInputs = {
    Folder: useRef(),
    Video: useRef(),
    "Study/Notes/Text": useRef(),
    Document: useRef(),
    Image: useRef(),
    "ZIP file": useRef(),
  };

  const handleOptionClick = (label) => {
    if (fileInputs[label]) {
      fileInputs[label].current.click();
    }
  };

  const handleFileUpload = (label, event) => {
    const file = event.target.files[0];
    if (file) {
      // Add the uploaded file to the list of uploaded content
      const newContent = {
        label,
        fileName: file.name,
        fileType: file.type,
        fileId: Date.now(), // Unique ID to identify each item
      };
      setUploadedContent((prevContent) => [...prevContent, newContent]);
      alert(`Uploaded ${label}: ${file.name}`);
    }
  };

  const handleDelete = (fileId) => {
    const updatedContent = uploadedContent.filter((item) => item.fileId !== fileId);
    setUploadedContent(updatedContent);
    setActiveDropdown(null);  // Close the dropdown after delete
  };

  const handleEdit = (fileId) => {
    const newFileName = prompt("Enter new file name:");
    if (newFileName) {
      const updatedContent = uploadedContent.map((item) =>
        item.fileId === fileId ? { ...item, fileName: newFileName } : item
      );
      setUploadedContent(updatedContent);
    }
    setActiveDropdown(null);  // Close the dropdown after edit
  };

  const toggleDropdown = (fileId) => {
    // Toggle dropdown visibility by comparing current fileId with activeDropdown
    setActiveDropdown((prevState) => (prevState === fileId ? null : fileId));
  };

  // Click outside handler to close dropdown
  const handleClickOutside = (e) => {
    // Check if the click is outside of the dropdown button
    if (!e.target.closest(".dropdown") && !e.target.closest(".dots-menu")) {
      setActiveDropdown(null);
    }
  };

  // Adding event listener for click outside of dropdown
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const contentTypes = [
    // { label: "Folder", icon: "📁", accept: "" }, // Browsers can't select folders easily here
    { label: "Video", icon: "🎥", accept: "video/*" },
    { label: "Study/Notes/Text", icon: "📄", accept: ".txt,.pdf,.doc,.docx" },
    { label: "Document", icon: "📃", accept: ".pdf,.doc,.docx" },
    { label: "Image", icon: "🖼", accept: "image/*" },
    { label: "ZIP file", icon: "🗜", accept: ".zip,.rar,.7z" },
  ];

  return (
    <> 
    <div className="file-manager">
        <div className="add-content-wrapper">
            <div className="folder-section">
                <h3>Contents</h3>

                <div className="uploaded-content">
                {uploadedContent.length === 0 ? (
                    <p>No content uploaded yet.</p>
                ) : (
                    <ul className='p-0'>

                    {uploadedContent.map((item) => (
                        <li key={item.fileId} className="content-item">
                            <div>
                                <span className="icon">
                                    {contentTypes.find((ct) => ct.label === item.label)?.icon}
                                </span>
                                 {item.fileName} (Type: {item.label})
                            </div>

                        {/* Dots menu for Edit and Delete */}
                        <div className="dropdown">
                            <button
                            className="dots-menu"
                            onClick={(e) => {
                                e.stopPropagation();  // Prevent click from bubbling up
                                toggleDropdown(item.fileId);  // Handle left-click toggle
                            }}
                            >
                            ⋮
                            </button>
                            {activeDropdown === item.fileId && (
                            <div className="dropdown-content">
                                <button onClick={() => handleEdit(item.fileId)}>Edit</button>
                                <button onClick={() => handleDelete(item.fileId)}>Delete</button>
                            </div>
                            )}
                        </div>
                        </li>
                    ))}
                    </ul>
                )}
                </div>
            </div>
            <div className="add-content">
                <h3>Add Content</h3>
                <ul>
                    <li 
                        className='file-content'
                        onClick={() => {
                    
                            // ✅ Create new folder without file input
                            const newFolder = {
                            fileId: Date.now().toString(), // unique ID
                            fileName: `New Folder`,
                            label: "Folder",
                            };
                            setUploadedContent((prev) => [...prev, newFolder]);
                    
                        }}> 
                        <span className="icon">📁</span> Folder</li>


                    {contentTypes.map((item) => (
                        <li key={item.label} onClick={() => handleOptionClick(item.label)}>
                        <span className="icon">{item.icon}</span> {item.label}
                        <input
                            type="file"
                            ref={fileInputs[item.label]}
                            accept={item.accept}
                            style={{ display: "none" }}
                            onChange={(e) => handleFileUpload(item.label, e)}
                        />
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <div className="input-button-wrapper d-flex justify-content-between me-4 mt-5 ">
            <button onClick={onBack}><BackIcon/>Previous</button>
            <button type="button" onClick={onNext}>Publish<EastIcon /></button>
        </div>
    </div>

    
    </>
  )
}
