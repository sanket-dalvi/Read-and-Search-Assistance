import React from 'react';
import './Loader.css';

const Loader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loader-container">
      <div className="loader">
      <div class="load-9">
        <p>Please Wait</p>
        <div class="spinner">
          <div class="bubble-1"></div>
          <div class="bubble-2"></div>
        </div>
      </div>
    </div>
        
      </div>
  );
};

export default Loader;
