import ConditionalComponent from './ConditionalComponent'
import React, { useState, useEffect } from 'react';
// Assuming you have 'sections' and 'sectionOptions' data
const sectionOptions = {
    section1: { someOptions: '...' },
    section2: { differentOptions: '...' },
  };
  
  const MyComponent = () => {
    const renderComponent = (sectionData) => {
      // Render form fields based on 'sectionData'
      return (
        // ... form fields using sectionData here ...
        <>abc</>
      );
    };
  
    return (
      <ConditionalComponent
        sections={Object.keys(sectionOptions)} // Extract section names
        sectionOptions={sectionOptions}
        renderComponent={renderComponent}
      />
    );
  };
  export default MyComponent;
  