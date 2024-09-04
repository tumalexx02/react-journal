import './Button.css';

function Button({ children, onClick, ...props }) {

  return (
    <button 
      {...props}
      className='button accent'
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
