import logo from "../assets/logo-white.png"

const Logo = ({ ...props }) => {
  return (
    <img src={logo} alt="AggieSeek" {...props}/>
  );
}
 


export default Logo;