import React from 'react';

const Notes = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <embed
        src="/syllabus/Computer_Basics_Notes_No_Images.pdf" // Updated to the correct file path
        type="application/pdf"
        width="80%"
        height="80%"
      />
    </div>
  );
};

export default Notes;
