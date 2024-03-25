const Button = ({ children, ...props }) => {
  return (
    <button 
    className="transition-transform ease-in-out duration-100 rounded-lg px-6 py-2 bg-white shadow-md text-black hover:bg-red-50 font-bold active:translate-y-1"
    {...props}>
      {children}
    </button>
  );
}
 
export default Button;