import React, { useEffect, useRef, useState } from 'react';
import './CourseContent.css';
import BackIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';

export default function CourseContent({ onBack, onNext }) {
  const [uploadedContent, setUploadedContent] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [showFolderInput, setShowFolderInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedFolderName, setSelectedFolderName] = useState("");
  const [activeFolderId, setActiveFolderId] = useState(null);

  const fileInputs = useRef({});

  const contentTypes = [
    { label: "Video", icon: "🎥", accept: "video/*" },
    { label: "Study/Notes/Text", icon: "📄", accept: ".txt,.pdf,.doc,.docx" },
    { label: "Document", icon: "📃", accept: ".pdf,.doc,.docx" },
    { label: "Image", icon: "🖼", accept: "image/*" },
    { label: "ZIP file", icon: "🗜", accept: ".zip,.rar,.7z" },
  ];

  const toggleDropdown = (fileId) => {
    setActiveDropdown(prev => (prev === fileId ? null : fileId));
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".dropdown") && !e.target.closest(".dots-menu")) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleCreateFolder = () => {
    if (newFolderName.trim() === "") return;
    const newFolder = {
      fileId: Date.now(),
      fileName: newFolderName,
      label: "Folder",
      children: [],
    };

    setUploadedContent(prev =>
      selectedFolderId
        ? prev.map(item =>
            item.fileId === selectedFolderId
              ? { ...item, children: [...(item.children || []), newFolder] }
              : item
          )
        : [...prev, newFolder]
    );

    setNewFolderName("");
    setShowFolderInput(false);
  };

  const toggleFolder = (folderId, folderName) => {
    setExpandedFolders(prev => {
      const isOpening = !prev[folderId];

      if (isOpening) {
        setSelectedFolderId(folderId);
        setSelectedFolderName(folderName);
      } else {
        setSelectedFolderId(null);
        setSelectedFolderName("");
      }

      return {
        ...prev,
        [folderId]: isOpening,
      };
    });

    setActiveFolderId(prev => (prev === folderId ? null : folderId));
  };

  const handleOptionClick = (label, folderId) => {
    if (fileInputs.current[label]) {
      fileInputs.current[label].dataset.folderId = folderId || "";
      fileInputs.current[label].click();
    }
  };

  const handleFileUpload = (label, e) => {
    const file = e.target.files[0];
    const folderId = e.target.dataset.folderId || null;

    if (file) {
      const newContent = {
        label,
        fileName: file.name,
        fileType: file.type,
        fileId: Date.now(),
      };

      setUploadedContent(prev =>
        folderId
          ? prev.map(item =>
              item.fileId === parseInt(folderId)
                ? { ...item, children: [...(item.children || []), newContent] }
                : item
            )
          : [...prev, newContent]
      );
    }
  };

  const handleDelete = (fileId) => {
    setUploadedContent(prev =>
      prev.filter(item => item.fileId !== fileId)
    );

    // If deleted folder is selected, go to root
    if (selectedFolderId === fileId) {
      setSelectedFolderId(null);
      setSelectedFolderName("");
    }

    setActiveDropdown(null);
  };

  const handleEdit = (fileId) => {
    const newFileName = prompt("Enter new file name:");
    if (newFileName) {
      setUploadedContent(prev =>
        prev.map(item =>
          item.fileId === fileId ? { ...item, fileName: newFileName } : item
        )
      );
    }
    setActiveDropdown(null);
  };

  return (
    <div className="file-manager">
      <div className="add-content-wrapper">
        <div className="folder-section">
          <h3>Contents</h3>
          <div className="uploaded-content">
            {uploadedContent.length === 0 ? (
              <p>No content uploaded yet.</p>
            ) : (
              <div>
                 {selectedFolderId && (
                  <div className="folder-indicator d-flex justify-content-between mb-2">
                    <p className="text-sm text-light mb-1">
                      Adding to folder: <strong>{selectedFolderName}</strong>
                    </p>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => {
                            setExpandedFolders(prev => ({
                              ...prev,
                              [selectedFolderId]: false
                            }));
                            setSelectedFolderId(null);
                            setSelectedFolderName("");
                          }}
                    >
                      ⬅ Back to Root
                    </button>
                  </div>
                )}
                <ul className="p-0">
                  {uploadedContent.map((item) => (
                    <li key={item.fileId} >
                      <div className="content-item">
                        <div>
                          <span
                            className="icon"
                            style={{ cursor: item.label === "Folder" ? "pointer" : "default" }}
                            onClick={() =>
                              item.label === "Folder" && toggleFolder(item.fileId, item.fileName)
                            }
                          >
                            {item.label === "Folder"
                              ? "📁"
                              : contentTypes.find(ct => ct.label === item.label)?.icon}
                          </span>{" "}
                          {item.fileName} (Type: {item.label})
                        </div>
                        <div className="dropdown">
                          <button
                            className="dots-menu"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDropdown(item.fileId);
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
                      </div>


                      {/* Folder Content */}
                      {item.label === "Folder" && expandedFolders[item.fileId] && (
                        <div className="folder-contents ps-4">
                          <p>Inside folder: <strong>{item.fileName}</strong></p>
                          {/* Show uploaded files inside folder */}
                          <ul className="nested-content-list">
                            {(item.children || []).map(child => (
                              <li key={child.fileId}>
                                {contentTypes.find(ct => ct.label === child.label)?.icon}{" "}
                                <p>{child.fileName}</p> 
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="add-content">
          <h3>Add Content</h3>
          <ul>
            <li className="file-content" onClick={() => setShowFolderInput(true)}>
              <span className="icon">📁</span> Folder
            </li>

            {showFolderInput && (
              <li className="folder-input">
                <input
                  type="text"
                  placeholder="Folder name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                />
                <button onClick={handleCreateFolder}>Create</button>
              </li>
            )}

            {contentTypes.map((item) => (
              <li key={item.label} onClick={() => handleOptionClick(item.label, selectedFolderId)}>
                <span className="icon">{item.icon}</span> {item.label}
                <input
                  type="file"
                  ref={(el) => (fileInputs.current[item.label] = el)}
                  accept={item.accept}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileUpload(item.label, e)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="input-button-wrapper d-flex justify-content-between me-4 mt-5">
        <button onClick={onBack}><BackIcon />Previous</button>
        <button type="button" onClick={onNext}>Publish<EastIcon /></button>
      </div>
    </div>
  );
}
