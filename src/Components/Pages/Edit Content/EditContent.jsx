import React, { useEffect, useState } from 'react';
import './EditContent.css';
import { getAllTutorial, getTutorialByName } from '../../APIService/apiservice';

export default function EditContent() {
  const [tutorialList, setTutorialList] = useState([]);
  const [tutorialDetails, setTutorialDetails] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editData, setEditData] = useState({});
    const [editModal, setEditModal] = useState(null); // holds { type, data }


  useEffect(() => {
    const fetchTutorialList = async () => {
      try {
        const response = await getAllTutorial();
        setTutorialList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTutorialList();
  }, []);

    const handleTutorialClick = async (tutorial) => {
    try {
        const response = await getTutorialByName(tutorial);
        console.log(response);
        setTutorialDetails(response)
      } catch (error) {
        console.log(error);
      }
  };


  const handleEditClick = (type, data) => {
    setEditModal({ type, data });
  };

  const handleModalChange = (field, value) => {
    setEditModal((prev) => ({
      ...prev,
      data: { ...prev.data, [field]: value }
    }));
  };

  const closeModal = () => {
    setEditModal(null);
  };    

 const handleUpdate = async () => {
  try {
    if (editModal.type === 'heading') {
      await updateHeading(editModal.data.id, {
        headingName: editModal.data.headingName,
        orderIndex: editModal.data.orderIndex
      });
    } else if (editModal.type === 'topic') {
      await updateTopic(editModal.data.id, {
        topicName: editModal.data.topicName,
        urlSlug: editModal.data.urlSlug
      });
    } else if (editModal.type === 'content') {
      await updateContent(editModal.data.id, {
        contentHeading: editModal.data.contentHeading
      });
    }

    // Optionally refresh data
    if (tutorialDetails?.tutorialName) {
      const updatedData = await getTutorialByName(tutorialDetails.tutorialName);
      setTutorialDetails(updatedData);
    }

    setEditModal(null);
  } catch (error) {
    console.error('Update failed', error);
  }
};


  return (
    <>
   <div className="edit-content-wrapper">
      <h2>Edit Tutorial Content</h2>

      <div className='display-tutorial mt-4'>
          <ul className='p-0'>
            {tutorialList.map((tut) => (
              <li key={tut.id} onClick={() => handleTutorialClick(tut.tutorialName)}>
                {tut.tutorialName}
              </li>
            ))}
          </ul>
      </div>

      {tutorialDetails && (
        <div className="tutorial-details">
          <h3>{tutorialDetails.tutorialName}</h3>
          {tutorialDetails.heading.map((heading) => (
            <div key={heading.id} className="heading-block">
              <div className="heading-items d-flex justify-content-between">
                <h5><strong >Heading  :</strong> <br /> {heading.headingName} (Order: {heading.orderIndex})</h5>
                <button onClick={() => handleEditClick('heading', heading)}>Edit Heading</button>
              </div>

              {heading.topics.map((topic) => (
                <div key={topic.id} className="topic-box">
                  <div className="heading-items d-flex justify-content-between">
                    <div>
                        <h5>Topic : </h5>
                        <h4>{topic.topicName}</h4>
                    </div>
                    <div>
                        <h5>Topic Slug : </h5>
                        <h4>{topic.urlSlug}</h4>
                    </div>
                      {/* <h5><span>Topic:</span> <span> {topic.topicName} - {topic.urlSlug}</span></h5> */}
                      <button onClick={() => handleEditClick('topic', topic)}>Edit Topic</button>
                  </div>

                  {topic.contents.map((content) => (
                    <div key={content.id} className="content-box">
                      <div className="heading-items d-flex justify-content-between">
                          <strong>Content:</strong> {content.contentHeading}
                          <button onClick={() => handleEditClick('content', content)}>Edit Content</button>
                      </div>
                      <ul>
                        {content.blocks.map((block, idx) => (
                          <li key={idx}>
                            {block.type}: {block.value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

        {editModal && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <button className="close-btn" onClick={closeModal}>X</button>
                    <h4>Edit {editModal.type}</h4>

                    {editModal.type === 'heading' && (
                        <div className='input-box'>
                            <div className='w-100 my-2'>
                                <p>Heading Name</p>
                                <input
                                    type="text"
                                    value={editModal.data.headingName}
                                    onChange={(e) => handleModalChange('headingName', e.target.value)}
                                    placeholder="Heading Name"
                                />
                            </div>

                            <div className='w-100 my-2'>
                                <p>Heading Order Index</p>
                                <input
                                    type="number"
                                    value={editModal.data.orderIndex}
                                    onChange={(e) => handleModalChange('orderIndex', parseInt(e.target.value))}
                                    placeholder="Order Index"
                                />
                            </div>
                        </div>
                    )}
                    {editModal.type === 'topic' && (
                        <div className='input-box'>
                            <div className='w-100 my-2'>
                                <p>Topic Name</p>
                                <input
                                    type="text"
                                    value={editModal.data.topicName}
                                    onChange={(e) => handleModalChange('topicName', e.target.value)}
                                    placeholder="Topic Name"
                                />
                            </div>
                            <div className='w-100 my-2'>
                                <p>Topic URLSlug</p>
                                <input
                                    type="text"
                                    value={editModal.data.urlSlug}
                                    onChange={(e) => handleModalChange('urlSlug', e.target.value)}
                                    placeholder="URL Slug"
                                />
                            </div>
                        </div>
                    )}
                    {editModal.type === 'content' && (
                        <div className='input-box'>
                        <div className='w-100 my-2'>
                            <p>Content</p>
                            <input
                                type="text"
                                value={editModal.data.contentHeading}
                                onChange={(e) => handleModalChange('contentHeading', e.target.value)}
                                placeholder="Content Heading"
                            />
                        </div>
                        </div>
                    )}

                    <button className='update-btn' onClick={handleUpdate}>Update</button>
                </div>
            </div>
        )}
    </div>
    </>
  );
}
