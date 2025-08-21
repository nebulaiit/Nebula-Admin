import React from "react";
import { useSelector,useDispatch } from "react-redux";
import BackIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';
import './Publish.css';
import { showToast } from "../../../redux/toastSlice";

function Publish({ onBack }) {
  const courseState = useSelector((state) => state.course);
  const dispatch = useDispatch();

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
   const validateCourse = () => {
    if (!courseTitle || !courseDescription) {
      dispatch(showToast({ message: "⚠️ Title & description are required", type: "warning" }));
      return false;
    }
    if (!coursePrice?.price) {
      dispatch(showToast({ message: "⚠️ Please set a course price", type: "warning" }));
      return false;
    }
    if (countContent("Video") + countContent("Document") + countContent("Study/Notes/Text") === 0) {
      dispatch(showToast({ message: "⚠️ Add at least one video or document", type: "warning" }));
      return false;
    }
    return true;
  };

const saveDraft = async () => {
    try {
      // await saveDraftCourse(courseState); // API call
      dispatch(showToast({ message: "✅ Course saved as draft", type: "success" }));
    } catch (err) {
      dispatch(showToast({ message: "❌ Failed to save draft", type: "error" }));
    }
  };

  const publish = async () => {
    if (!validateCourse()) return;

    try {
      // await publishCourse(courseState); // API call
      dispatch(showToast({ message: "🚀 Course published successfully!", type: "success" }));

      // Optional: clear builder state or redirect
      // navigate("/dashboard");
    } catch (err) {
      dispatch(showToast({ message: "❌ Failed to publish course", type: "error" }));
    }
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
