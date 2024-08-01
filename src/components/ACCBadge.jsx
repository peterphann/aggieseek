import accIcon from "../assets/acc-icon.png"
import accLogo from "../assets/acc-logo.png"

const ACCBadge = () => {
  return (
    <a href="https://aggiecodingclub.com/" className="transition-all ease-in-out duration-100 flex-row flex items-center hover:scale-95">
      <img src={accIcon} alt="" className="object-contain w-16" />
      <div className="text-center">
        <img src={accLogo} alt="" className="object-contain w-32" />
        <h2 className="font-bold text-[#3366B4]">Approved</h2>
      </div>
    </a>
  );
}

export default ACCBadge;