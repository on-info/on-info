import React, { Component } from 'react';

const SliderPreviousBtn = (props) => {
  return (
    <div>
        <button disabled={props.disabled} onClick={props.previousProject} className="prev"></button>
    </div>
  );
}

export default SliderPreviousBtn;