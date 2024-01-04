import React from 'react';

const Button = ({ className, type, text }) => (
  <button
    className={className}
    type={type}
  >
    {text}
  </button>
);

export default Button;
