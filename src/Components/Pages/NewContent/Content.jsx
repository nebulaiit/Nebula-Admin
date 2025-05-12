import React, { useEffect, useState } from 'react';
import './Content.css';
import { addNewTutorial, getAllTutorial } from '../../APIService/apiservice'; // Your API function for submitting tutorial data

export default function Content() {
  const [tutorialList , setTutorialList] = useState([])

  const [tutorialName, setTutorialName] = useState('');
  const [headingName, setHeadingName] = useState('');
  const [orderIndex, setOrderIndex] = useState(0);

  const [topicName, setTopicName] = useState('');
  const [urlSlug, setUrlSlug] = useState('');

  const [contentHeading, setContentHeading] = useState('');
  const [blockType, setBlockType] = useState('heading');
  const [blockValue, setBlockValue] = useState('');
  const [blockOrder, setBlockOrder] = useState(0);

  const [blocks, setBlocks] = useState([]);
  const [contents, setContents] = useState([]);
  const [topics, setTopics] = useState([]);
  const [headings, setHeadings] = useState([]);

  const [showModal, setShowModal] = useState(false);

const handleOpenModal = () => setShowModal(true);
const handleCloseModal = () => {
  console.log('Closing modal'); // Debug log
  setShowModal(false);
};

  // Handlers
  const handleAddBlock = () => {
    setBlocks([
      ...blocks,
      {
        type: blockType,
        value: blockValue,
        orderIndex: blockOrder,
      },
    ]);
    setBlockValue('');
    setBlockOrder(blockOrder + 1);
  };

  const handleAddContent = () => {
    setContents([
      ...contents,
      {
        contentHeading,
        blocks,
      },
    ]);
    setContentHeading('');
    setBlocks([]);
  };

  const handleAddTopic = () => {
    setTopics([
      ...topics,
      {
        topicName,
        urlSlug,
        contents,
      },
    ]);
    setTopicName('');
    setUrlSlug('');
    setContents([]);
  };

  const handleAddHeading = () => {
    setHeadings([
      ...headings,
      {
        headingName,
        orderIndex,
        topics,
      },
    ]);
    setHeadingName('');
    setOrderIndex(orderIndex + 1);
    setTopics([]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tutorial = {
      tutorialName,
      heading: headings,
    };

    console.log('Tutorial Data:', tutorial);

    // try {
    //   // Call the API service to save the tutorial data
    //   const response = await addNewTutorial(tutorial);
    //   console.log('Tutorial saved successfully:', response.data);
    // } catch (error) {
    //   console.error('Error saving tutorial:', error);
    // }

    // Reset all fields after submitting
    setTutorialName('');
    setHeadings([]);
  };

  useEffect(()=>{  
    const fetchTutorialList = async () =>{
        try{
            const respone = await getAllTutorial();
            setTutorialList(respone);
        }
        catch (error) {
            console.log(error)
        }
    };
    fetchTutorialList();
  },[])

  return (
    <div className="content-wrapper">
      <div className='d-flex justify-content-between'>
        <div>
          <h2>Add New Tutorial</h2>
          <p>Add & View Courses</p>
        </div>
        <button className='add-content' onClick={handleOpenModal} style={{ marginBottom: '1rem' }}>
          ➕ Add Article
        </button>
      </div>

      <div className='display-tutorial'>
  
        <ul className='p-0' >
          {tutorialList.map((tutorial)=>(
            <li key={tutorial.id}>Tutorial Name :<h4> {tutorial.tutorialName}</h4></li>
          ))}
        </ul>

      </div>

    {showModal && (
      <div className="modal-overlay">
        <div className='modal-wrapper'>
          <button type="button" className='close-btn' onClick={handleCloseModal}>X</button>
          <form onSubmit={handleSubmit}>
        
            <div className='modal-items'>
              <h4>Add Tutorial</h4>
              <input
                type="text"
                placeholder="Tutorial Name"
                value={tutorialName}
                onChange={(e) => setTutorialName(e.target.value)}
              />
            </div>
            <div className='modal-items'>
              <h4>Heading</h4>
              <input
                type="text"
                placeholder="Heading Name"
                value={headingName}
                onChange={(e) => setHeadingName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Order Index"
                value={orderIndex}
                onChange={(e) => setOrderIndex(parseInt(e.target.value))}
              />
              <br />
              <button className='submit-btn' type="button" onClick={handleAddHeading}>Add Heading</button>
            </div>
            <div className='modal-items'>
              <h4>Topic</h4>
              <input
                type="text"
                placeholder="Topic Name"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
              />
              <input
                type="text"
                placeholder="URL Slug"
                value={urlSlug}
                onChange={(e) => setUrlSlug(e.target.value)}
              />
              <br />
              <button type="button" className='submit-btn' onClick={handleAddTopic}>Add Topic</button>
            </div>
            <div className='d-flex justify-content-between'>
              <div className='modal-items'>
                <h4>Content</h4>
                <input
                  type="text"
                  placeholder="Content Heading"
                  value={contentHeading}
                  onChange={(e) => setContentHeading(e.target.value)}
                />
                  <br />
                <button type="button" className='submit-btn' onClick={handleAddContent}>Add Content</button>
              </div>
              <div className='modal-items'>
                <h4>Add Block</h4>
                <select value={blockType} onChange={(e) => setBlockType(e.target.value)}>
                  <option value="heading">Heading</option>
                  <option value="paragraph">Paragraph</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
                <input
                  type="text"
                  placeholder="Block Value"
                  value={blockValue}
                  onChange={(e) => setBlockValue(e.target.value)}
                />
                <br />
                <button type="button" className='submit-btn' onClick={handleAddBlock}>Add Block</button>
              </div>
            </div>
            <button type="submit" className='final-submit-btn' disabled={headings.length === 0} >Save Tutorial</button>
          </form>
        </div>
      </div>
    )}
    </div>
  );
}
