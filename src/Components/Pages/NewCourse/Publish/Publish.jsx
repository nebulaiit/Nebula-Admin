import React from "react";

function Publish({ prev, data }) {
  const saveDraft = () => {
    console.log("Saved as draft:", data);
    alert("Draft saved!");
  };

  const publish = () => {
    console.log("Published course:", data);
    alert("Course published!");
  };

  return (
    <div>
    
      <button onClick={prev}>Previous</button>
      <button onClick={saveDraft}>Save Draft</button>
      <button onClick={publish}>Publish</button>
    </div>
  );
}

export default Publish;
