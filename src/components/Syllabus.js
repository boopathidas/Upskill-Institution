import React from 'react';
import { useParams } from 'react-router-dom';

const Syllabus = () => {
  const { courseName } = useParams();

  const syllabi = {
    'Excel': 'Working with spreadsheets, formulas, pivot tables, data visualization, macros, etc.',
    'Tally': 'Accounting basics, managing ledgers, creating vouchers, generating reports, etc.',
    'Spoken English': 'Grammar basics, sentence formation, public speaking, communication skills, etc.',
    'Python': 'Programming basics, data types, functions, OOP concepts, web frameworks, etc.',
    'Full Stack Development': 'HTML, CSS, JavaScript, Node.js, React, databases, and server-side programming.'
  };

  return (
    <div>
      <h2>{courseName} Syllabus</h2>
      <p>{syllabi[courseName]}</p>
    </div>
  );
};

export default Syllabus;
