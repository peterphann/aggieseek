const Button = ({ children, onClick }) => {
  return (
    <button 
    className="transition-transform ease-in-out duration-100 rounded-lg px-6 py-2 bg-white shadow-md text-black font-bold active:translate-y-1"
    onClick={onClick}>
      {children}
    </button>
  );
}
 
export default Button;