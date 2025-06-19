import React from "react";
import { useSelector } from "react-redux";
import BackIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';
import './Publish.css';

function Publish({ onBack }) {
  const courseState = useSelector((state) => state.course);

  const {
    courseTitle,
    courseDescription,
    coursePrice,
    courseFolders,
    thumbnailUrl
  } = courseState;

  const countContent = (type) => {
    let count = 0;
    courseFolders?.forEach(folder => {
      folder.contents?.forEach(content => {
        if (content.label === type) count++;
      });
    });
    return count;
  };

  const saveDraft = () => {
    console.log("Saved as draft:", courseState);
    alert("Draft saved!");
  };

  const publish = () => {
    console.log("Published course:", courseState);
    alert("Course published!");
    // you can dispatch a thunk or API call here to send `courseState` to backend
  };

  return (
    <div className="publish-wrapper">
      <div className="publish-content">
        <div className="publish-left">
          <h2>Publish</h2>
          <p><strong>Title:</strong> {courseTitle}</p>
          <p><strong>Description:</strong> {courseDescription}</p>
          <p><strong>Price:</strong> ₹{coursePrice.price}</p>
          <p><strong>Discount:</strong> {coursePrice.discount}%</p>
          <p><strong>Duration:</strong> {coursePrice.duration} {coursePrice.durationUnit}</p>
        </div>

        <div className="publish-right">
          {thumbnailUrl && <img src={thumbnailUrl} alt="Thumbnail" className="thumbnail-preview" />}
          <h4>Videos: {countContent("Video")}</h4>
          <h4>Documents: {countContent("Document") + countContent("Study/Notes/Text")}</h4>
        </div>
      </div>

      <div className="Publish-button-wrapper">
        <button onClick={onBack}><BackIcon />Previous</button>
        <button onClick={saveDraft}>Save Draft</button>
        <button onClick={publish}>Publish<EastIcon /></button>
      </div>
    </div>
  );
}

export default Publish;
