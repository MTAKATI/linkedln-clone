import React from 'react';
import "./InputOption.css";

function inputOption({Icon, title, color}) {
  return (
    <div className='inputOption'>
      <Icon style={{color: color}}/>
      <h4>{title}</h4>
    </div>
  )
}

export default inputOption
