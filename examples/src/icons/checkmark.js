import React from 'react';

export default ({selected}) => (
  <div style={selected ? {left: '4px', top: '4px',position: 'absolute', zIndex:'1'} : {display: 'none'}}>
    <svg style={{fill: 'white', position: 'absolute'}} width="24px" height="24px">
      <circle cx="12.5" cy="12.2" r="8.292"></circle>
    </svg>
    <svg style={{fill: '#06befa', position: 'absolute'}} width="24px" height="24px">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
    </svg>
  </div>
);
