const Button = ({ children, ...props }) => {
  return (
    <button 
    className="transition-transform ease-in-out duration-100 px-6 py-2 bg-[#8d0509] shadow-lg text-white font-bold active:scale-95"
    {...props}>
      {children}
    </button>
  );
}
 
export default Button;