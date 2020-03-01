import React from 'react';
import './Isometric.css';

export default ({ image }) => {
  const style = {
    background: `url(${image})`,
    backgroundSize: 'cover'
  };

  return (
    <div className="iso_box">
      <div className="iso_layer" />
      <div className="iso_layer" style={style} />
    </div>
  );
};
