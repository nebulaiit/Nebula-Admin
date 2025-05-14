import React from "react";
import BackIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';
import './Publish.css';

function Publish({ onBack, data = {} }) {
  const {
    name = '',
    description = '',
    price = '',
    discount = '',
    thumbnail = null,
    videos = [],
    documents = [],
  } = data;

  const saveDraft = () => {
    console.log("Saved as draft:", data);
    alert("Draft saved!");
  };

  const publish = () => {
    console.log("Published course:", data);
    alert("Course published!");
  };

  return (
    <div className="publish-wrapper">
      <div className="publish-content">
        <div className="publish-left">
          <h2>Publish</h2>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Description:</strong> {description}</p>
          <p><strong>Price:</strong> ₹{price}</p>
          <p><strong>Discount:</strong> {discount}%</p>
        </div>

        <div className="publish-right">
          {thumbnail && (
            <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail" />
          )}
          <h4>Videos: {videos.length}</h4>
          <h4>Documents: {documents.length}</h4>
        </div>
      </div>

      <div className="Publish-button-wrapper">
        <button onClick={onBack}><BackIcon/>Previous</button>
        <button onClick={saveDraft}>Save Draft</button>
        <button onClick={publish}>Publish<EastIcon /></button>
      </div>
    </div>
  );
}

export default Publish;
