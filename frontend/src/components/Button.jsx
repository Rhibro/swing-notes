import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ variant = 'default', onClick, children, type = 'button' }) => {
  let buttonClass = 'px-4 py-2 rounded-lg font-semibold transition duration-200 m-2';

  if (variant === 'default') {
    buttonClass += ' bg-blue-600 text-white hover:bg-blue-700';
  } else if (variant === 'outline') {
    buttonClass += ' border border-blue-600 text-blue-600 hover:bg-blue-100';
  } else if (variant === 'destructive') {
    buttonClass += ' bg-red-600 text-white hover:bg-red-700';
  }

  return (
    <button type={type} onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['default', 'outline', 'destructive']),
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
