import React from 'react';
import './infobox.css';

const InfoBox = React.memo(({ title, content }) => 
  <div className="infobox">
    <div className="title">{title}</div>
    <div className="content">{content}</div>
  </div>
);
export default InfoBox;