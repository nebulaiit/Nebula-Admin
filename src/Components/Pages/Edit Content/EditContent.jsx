import React, { useEffect, useState } from 'react';
import './EditContent.css';
import { fetchLanguages, getTutorialByName } from '../../APIService/apiservice';

export default function EditContent() {
  const [tutorialList, setTutorialList] = useState([]);

  const [message, setMessage] = useState('');


  useEffect(() => {
    const getLanguages = async () => {
      try {
        const langs = await fetchLanguages();
        setTutorialList(langs);
      } catch (err) {
        setMessage('Failed to load languages');
      }
    };
    getLanguages();
  }, []);


  console.log(tutorialList)



  return (
    <>
      <div className="edit-content-wrapper"> 
        <h2>Edit Tutorial Content</h2>

        <div className='display-tutorial mt-4'>
          <ul className='p-0'>
            {tutorialList.map((tut) => (
              <li key={tut.id} onClick={() => handleTutorialClick(tut.tutorialName)}>
                {tut.name}
              </li>
            ))}
          </ul>
        </div>

        

      </div>
    </>
  );
}
