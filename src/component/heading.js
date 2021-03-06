import React from 'react';

export default function Heading(props) {
  return (
    <div className="heading center" style={{ height: `${props.size}rem` }}>
      <h5 style={{ fontSize: `${(props.size * 4) / 5}rem` }}>{props.text}</h5>
      <h5
        style={{
          fontSize: `${props.size / 2}rem`,
          letterSpacing: `${props.size / 10}rem`,
        }}
      >
        {props.text}
      </h5>
    </div>
  );
}
