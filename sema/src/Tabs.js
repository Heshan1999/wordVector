// import React, { useState } from 'react';
// import './Tabs.css'; // Make sure to import the CSS file

// function Tabs() {
//   const [feedbackGroup1, setFeedbackGroup1] = useState('');
// const [feedbackGroup2, setFeedbackGroup2] = useState('');

//   const [activeTab, setActiveTab] = useState('tab1');

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleEnterClick = async (participant) => {
//     const feedback = activeTab === 'tab1' ? feedbackGroup1 : feedbackGroup2;
//     const response = await fetch('http://localhost:8000/submit_feedback/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         group: activeTab,
//         participant,
//         feedback,
//       }),
//     });
  
//     if (response.ok) {
//       console.log('Feedback submitted successfully');
//       // Reset feedback input
//       if (activeTab === 'tab1') {
//         setFeedbackGroup1('');
//       } else {
//         setFeedbackGroup2('');
//       }
//     } else {
//       console.error('Failed to submit feedback');
//     }
//   };
  

//   return (
    
//     <div className="tab-container">
//       <div className='heading'>
//        <h1>SEMA</h1>
//         <h2>Feedback Portal</h2>
//       </div>
//       <div className="tab-buttons">
//         <button
//           onClick={() => handleTabClick('tab1')}
//           className={activeTab === 'tab1' ? 'active' : ''}
//         >
//           Group 1 Feedback
//         </button>
//         <button
//           onClick={() => handleTabClick('tab2')}
//           className={activeTab === 'tab2' ? 'active' : ''}
//         >
//           Group 2 Feedback
//         </button>
//       </div>

//       <div className="tab-content">
//         {activeTab === 'tab1' && (
//           <div>
//             {/* <p>Participant 01</p> */}
//             <input type="text" placeholder="Enter feedback..." value={feedbackGroup1} onChange={(e) => setFeedbackGroup1(e.target.value)}
// />
//             <div>
//               <button onClick={() => handleEnterClick('Participant 01')}>Enter</button>
             
//             </div>
//           </div>
//         )}
//         {activeTab === 'tab2' && (
//           <div>
//             {/* <p>Participant 02</p> */}
//             <input type="text" placeholder="Enter feedback..." value={feedbackGroup2} onChange={(e) => setFeedbackGroup2(e.target.value)}
// />            <div>
//               <button onClick={() => handleEnterClick('Participant 02')}>Enter</button> 
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Tabs;


// import React, { useState, useEffect } from 'react';
// import './Tabs.css'; // Make sure to import the CSS file

// function Tabs() {
//   const [feedbackGroup1, setFeedbackGroup1] = useState('');
//   const [feedbackGroup2, setFeedbackGroup2] = useState('');
//   const [imageURL, setImageURL] = useState('');
  
//   const [activeTab, setActiveTab] = useState('tab1');

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleEnterClick = async (participant) => {
//     const feedback = activeTab === 'tab1' ? feedbackGroup1 : feedbackGroup2;
//     const response = await fetch('http://localhost:8000/submit_feedback/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         group: activeTab,
//         participant,
//         feedback,
//       }),
//     });

//     if (response.ok) {
//       console.log('Feedback submitted successfully');
//       // Reset feedback input
//       if (activeTab === 'tab1') {
//         setFeedbackGroup1('');
//       } else {
//         setFeedbackGroup2('');
//       }
//     } else {
//       console.error('Failed to submit feedback');
//     }
//   };

//   useEffect(() => {
//     const fetchImageURL = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/plot_feedback/');
//         const data = await response.json();
//         setImageURL(data.image_url);
//       } catch (error) {
//         console.error('Failed to fetch image URL:', error);
//       }
//     };

//     fetchImageURL();
//   }, [activeTab]); // Fetch the image URL whenever the active tab changes

//   return (
//     <div className="tab-container">
//       <div className='heading'>
//         <h1>SEMA</h1>
//         <h2>Feedback Portal</h2>
//       </div>
//       <div className="tab-buttons">
//         <button
//           onClick={() => handleTabClick('tab1')}
//           className={activeTab === 'tab1' ? 'active' : ''}
//         >
//           Group 1 Feedback
//         </button>
//         <button
//           onClick={() => handleTabClick('tab2')}
//           className={activeTab === 'tab2' ? 'active' : ''}
//         >
//           Group 2 Feedback
//         </button>
//       </div>

//       <div className="tab-content">
//         {activeTab === 'tab1' && (
//           <div>
//             <input
//               type="text"
//               placeholder="Enter feedback..."
//               value={feedbackGroup1}
//               onChange={(e) => setFeedbackGroup1(e.target.value)}
//             />
//             <div>
//               <button onClick={() => handleEnterClick('Participant 01')}>Enter</button>
//             </div>
//           </div>
//         )}
//         {activeTab === 'tab2' && (
//           <div>
//             <input
//               type="text"
//               placeholder="Enter feedback..."
//               value={feedbackGroup2}
//               onChange={(e) => setFeedbackGroup2(e.target.value)}
//             />
//             <div>
//               <button onClick={() => handleEnterClick('Participant 02')}>Enter</button>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="plot-container">
//         {imageURL && <img src={imageURL} alt="Feedback Plot" />}
//       </div>
//     </div>
//   );
// }

// export default Tabs;




// import React, { useState, useEffect } from 'react';
// import './Tabs.css'; // Make sure to import the CSS file

// function Tabs() {
//   const [feedbackGroup1, setFeedbackGroup1] = useState('');
//   const [feedbackGroup2, setFeedbackGroup2] = useState('');
//   const [imageURL, setImageURL] = useState('');
//   const [imageError, setImageError] = useState(null);
  
//   const [activeTab, setActiveTab] = useState('tab1');

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleEnterClick = async (participant) => {
//     const feedback = activeTab === 'tab1' ? feedbackGroup1 : feedbackGroup2;
//     try {
//       const response = await fetch('http://localhost:8000/submit_feedback/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           group: activeTab,
//           participant,
//           feedback,
//         }),
//       });

//       if (response.ok) {
//         console.log('Feedback submitted successfully');
//         // Reset feedback input
//         if (activeTab === 'tab1') {
//           setFeedbackGroup1('');
//         } else {
//           setFeedbackGroup2('');
//         }
//       } else {
//         console.error('Failed to submit feedback');
//       }
//     } catch (error) {
//       console.error('Error submitting feedback:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchImageURL = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/plot_feedback/');
//         if (!response.ok) {
//           throw new Error('Failed to fetch image URL');
//         }
//         const data = await response.json();
//         setImageURL(data.image_url);
//         setImageError(null); // Reset error state
//       } catch (error) {
//         console.error('Failed to fetch image URL:', error);
//         setImageURL(''); // Reset image URL on error
//         setImageError('Failed to fetch image URL'); // Set error state
//       }
//     };

//     fetchImageURL();
//   }, [activeTab]); // Fetch the image URL whenever the active tab changes

//   return (
//     <div className="tab-container">
//       <div className='heading'>
//         <h1>SEMA</h1>
//         <h2>Feedback Portal</h2>
//       </div>
//       <div className="tab-buttons">
//         <button
//           onClick={() => handleTabClick('tab1')}
//           className={activeTab === 'tab1' ? 'active' : ''}
//         >
//           Group 1 Feedback
//         </button>
//         <button
//           onClick={() => handleTabClick('tab2')}
//           className={activeTab === 'tab2' ? 'active' : ''}
//         >
//           Group 2 Feedback
//         </button>
//       </div>

//       <div className="tab-content">
//         {activeTab === 'tab1' && (
//           <div>
//             <input
//               type="text"
//               placeholder="Enter feedback..."
//               value={feedbackGroup1}
//               onChange={(e) => setFeedbackGroup1(e.target.value)}
//             />
//             <div>
//               <button onClick={() => handleEnterClick('Participant 01')}>Enter</button>
//             </div>
//           </div>
//         )}
//         {activeTab === 'tab2' && (
//           <div>
//             <input
//               type="text"
//               placeholder="Enter feedback..."
//               value={feedbackGroup2}
//               onChange={(e) => setFeedbackGroup2(e.target.value)}
//             />
//             <div>
//               <button onClick={() => handleEnterClick('Participant 02')}>Enter</button>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="plot-container">
//         {imageError ? (
//           <div style={{ color: 'red' }}>Error: {imageError}</div>
//         ) : (
//           imageURL && <img src={imageURL} alt="Feedback Plot" />
//         )}
//       </div>
//     </div>
//   );
// }

// export default Tabs;

// -------------------

// import React, { useState, useEffect } from 'react';
// import './Tabs.css';

// function Tabs() {
//   const [feedbackGroup1, setFeedbackGroup1] = useState('');
//   const [feedbackGroup2, setFeedbackGroup2] = useState('');
//   const [imageURL, setImageURL] = useState('');
//   const [imageError, setImageError] = useState(null);
//   const [activeTab, setActiveTab] = useState('tab1');

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleEnterClick = async () => {
//     const feedback = activeTab === 'tab1' ? feedbackGroup1 : feedbackGroup2;
//     try {
//       const response = await fetch('http://localhost:8000/submit_feedback/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           group: activeTab,
//           feedback,
//         }),
//       });

//       if (response.ok) {
//         console.log('Feedback submitted successfully');
//         activeTab === 'tab1' ? setFeedbackGroup1('') : setFeedbackGroup2('');
//       } else {
//         console.error('Failed to submit feedback');
//       }
//     } catch (error) {
//       console.error('Error submitting feedback:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchImageURL = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/plot_feedback/');
//         if (!response.ok) {
//           throw new Error(`Failed to fetch image URL. Server returned ${response.status}`);
//         }
//         const data = await response.json();
//         setImageURL(data.image_url);
//         setImageError(null);
//       } catch (error) {
//         console.error('Failed to fetch image URL:', error);
//         setImageURL('');
//         setImageError(`Error: ${error.message}`);
//       }
//     };

//     fetchImageURL();
//   }, [activeTab, feedbackGroup1, feedbackGroup2]); // Fetch the image URL whenever the active tab or feedback changes

//   return (
//     <div className="tab-container">
//       <div className='heading'>
//         <h1>SEMA</h1>
//         <h2>Feedback Portal</h2>
//       </div>
//       <div className="tab-buttons">
//         <button onClick={() => handleTabClick('tab1')} className={activeTab === 'tab1' ? 'active' : ''}>
//           Group 1 Feedback
//         </button>
//         <button onClick={() => handleTabClick('tab2')} className={activeTab === 'tab2' ? 'active' : ''}>
//           Group 2 Feedback
//         </button>
//       </div>

//       <div className="tab-content">
//         {activeTab === 'tab1' && (
//           <div>
//             <input
//               type="text"
//               placeholder="Enter feedback..."
//               value={feedbackGroup1}
//               onChange={(e) => setFeedbackGroup1(e.target.value)}
//             />
//             <button onClick={handleEnterClick}>Enter</button>
//           </div>
//         )}
//         {activeTab === 'tab2' && (
//           <div>
//             <input
//               type="text"
//               placeholder="Enter feedback..."
//               value={feedbackGroup2}
//               onChange={(e) => setFeedbackGroup2(e.target.value)}
//             />
//             <button onClick={handleEnterClick}>Enter</button>
//           </div>
//         )}
//       </div>

//       <div className="plot-container">
//         {imageError ? (
//           <div style={{ color: 'red' }}>Error: {imageError}</div>
//         ) : (
//           imageURL && <img src={imageURL} alt="Feedback Plot" />
//         )}
//       </div>
//     </div>
//   );
// }

// export default Tabs;

import React, { useState, useEffect } from 'react';
import './Tabs.css';

function Tabs() {
  const [feedbackGroup1, setFeedbackGroup1] = useState('');
  const [feedbackGroup2, setFeedbackGroup2] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [imageError, setImageError] = useState(null);
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const submitFeedback = async () => {
    const feedback = activeTab === 'tab1' ? feedbackGroup1 : feedbackGroup2;
    try {
      const response = await fetch('http://localhost:8000/submit_feedback/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          group: activeTab,
          feedback,
        }),
      });

      if (response.ok) {
        console.log('Feedback submitted successfully');
        activeTab === 'tab1' ? setFeedbackGroup1('') : setFeedbackGroup2('');
        fetchImageURL();  // Fetch new plot after submitting feedback
      } else {
        console.error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitFeedback();
    }
  }

  const fetchImageURL = async () => {
    try {
      const response = await fetch('http://localhost:8000/plot_feedback/');
      if (response.ok) {
        const data = await response.json();
        setImageURL(data.image_url);
        setImageError(null);
      } else {
        throw new Error(`Failed to fetch image URL. Server returned ${response.status}`);
      }
    } catch (error) {
      setImageURL('');
      setImageError(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchImageURL();
  }, []);

  return (
    <div className="tab-container">
      <div className='heading'>
        <h1>SEMA</h1>
        <h2>Feedback Portal</h2>
      </div>
      <div className="tab-buttons">
        <button onClick={() => handleTabClick('tab1')} className={activeTab === 'tab1' ? 'active' : ''}>
          Group 1 Feedback
        </button>
        <button onClick={() => handleTabClick('tab2')} className={activeTab === 'tab2' ? 'active' : ''}>
          Group 2 Feedback
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'tab1' && (
          <div>
            <input
              type="text"
              placeholder="Enter feedback..."
              value={feedbackGroup1}
              onChange={(e) => setFeedbackGroup1(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={submitFeedback}>Enter</button>
          </div>
        )}
        {activeTab === 'tab2' && (
          <div>
            <input
              type="text"
              placeholder="Enter feedback..."
              value={feedbackGroup2}
              onChange={(e) => setFeedbackGroup2(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={submitFeedback}>Enter</button>
          </div>
        )}
      </div>

      <div className="plot-container">
        {imageError ? (
          <div style={{ color: 'red' }}>Error: {imageError}</div>
        ) : (
          imageURL && <img src={imageURL} alt="Feedback Plot" />
        )}
      </div>
    </div>
  );
}

export default Tabs;






