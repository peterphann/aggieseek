import logo from "../assets/logo-black.png"

const Logo = ({ ...props }) => {
  return (
    <img src={logo} alt="AggieSeek" {...props}/>
  );
}
 


export default Logo;