import React, { useState } from 'react';
import './Content.css';
import { Button, Modal } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function Content() {
  const [heading, setHeading] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectModalOpen, setSelectModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState('');
  const [articles, setArticles] = useState([]);

 
  const handleOpen = () => {

    setSelectModalOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleSave = (e) => {
    e.preventDefault();
    const newArticle = {
      heading: selectedField === 'heading' ? heading : '',
      title: selectedField === 'title' ? title : '',
      content: selectedField === 'content' ? content : '',
      image: selectedField === 'image' && image ? URL.createObjectURL(image) : null,
    };

    setArticles([...articles, newArticle]);
    handleFormClose();
  };

  const handleSelectionContinue = () => {
    setSelectModalOpen(false);
    setFormModalOpen(true);
  };

  const handleFormClose = () => {
    setFormModalOpen(false);
    setTitle('');
    setHeading('');
    setContent('');
    setImage(null);
  };

  return (
    <>
      <div className="content-wrapper">
        <h3 className='mt-2'>Add New Content</h3>

        {articles.map((article, index) => (
          <div key={index} className="article-card">
            {article.heading && <h3>{article.heading}</h3>}
            {article.title && <h4>{article.title}</h4>}
            {article.content && <p>{article.content}</p>}
            {article.image && (
              <img src={article.image} alt="Uploaded" style={{ width: '200px', marginTop: '10px' }} />
            )}

          </div>
        ))}

        <Button  onClick={handleOpen}>
         <AddCircleOutlineIcon className='me-2'/> Add Article
        </Button>

        {/* Modal 1: Selection Modal */}
        <Modal open={selectModalOpen} onClose={() => setSelectModalOpen(false)}>
          <div className="modal-container">
            <h4>Select Fields to Include</h4>
      
            <div className="content-type d-flex mt-4">
            {['heading', 'title', 'content', 'image'].map((field) => (
                <Button
                  key={field}
                  variant={selectedField === field ? 'contained' : 'outlined'}
                  color={selectedField === field ? 'primary' : 'inherit'}
                  onClick={() => setSelectedField(field)}
                  style={{ marginRight: '10px', textTransform: 'capitalize' }}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Button>
              ))}
            </div>
        

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <Button variant="outlined" onClick={() => setSelectModalOpen(false)} style={{ marginRight: '10px' }}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSelectionContinue} disabled={!selectedField}>
                Continue
              </Button>
            </div>
          </div>
        </Modal>

        <Modal open={formModalOpen} onClose={handleFormClose}>
          <div className="modal-container">
            <h2>Add Article</h2>
            <form onSubmit={handleSave}>

              {selectedField === 'heading' && (
                <div>
                    <label>Enter the Heading</label>
                    <input
                    placeholder='Enter Heading'
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                    />
                </div>
              )}
                {selectedField === 'title' && (
                <div>

                    <label>Enter the Title</label>
                    <input
                     placeholder='Enter Title'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                )}
                {selectedField === 'content' && (
                    <div>
                        <label>Enter the Content </label>
                        <textarea
                            placeholder='Enter Content'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                )}

                {selectedField === 'image' && (
                    <div>
                        <label >Add Image</label>
                        <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        style={{ marginTop: '10px', marginBottom: '10px' }}
                        />
                    </div>
                )}
              <div className='mt-3' style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Button onClick={handleFormClose} variant="outlined">
                  Cancel
                </Button>
                <Button type="submit" variant="outlined">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
}
