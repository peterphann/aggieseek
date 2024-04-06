import { Input } from "../components/input";
import { Switch } from "../components/switch";
import { Menu } from "@headlessui/react";
import anonymous from '../assets/profile.webp'
const Profile = () => {
  // TODO: create profile and user settings as shown in figma
  // make sure to remove the h1 :)
  return (
    <div>
      <div className="flex items-center justify-between px-[15%] mt-[3%]">
        {<div className="flex-grow"></div>}  {/* Empty div for balancing */}
        <h2 className="text-3xl font-bold flex-grow-0">Profile</h2>
        <button className="text-sm font-medium text-[#8d0509] hover:underline flex-grow">
          Save Info
        </button>
      </div>
      <div class="px-[15%] flex justify-between mt-5">
        <div class="flex flex-col">
          <p class="font-bold text-xl">Personal Information</p>
          <div class="">
            <p class="text-md font-medium mt-1">First Name</p>
            <Input placeholder="ur first name"/>
            <p class="text-md font-medium mt-0.5">Last Name</p>
            <Input placeholder="ur last name"/>
            <p class="text-md font-medium mt-0.5">Profile Photo</p>
            <div>
              <Menu>
                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                      src={anonymous}
                      alt=""
                  />
                </Menu.Button>
              </Menu>
            </div>
          </div>
        </div>
      </div>   
      <div className="flex justify-center mt-4 mb-4">
        <hr className="border-gray-300 w-[70%]"/> {/* Adjusted horizontal line */}
      </div>
      <div class="px-[15%] flex justify-between">
        <div class="flex flex-col">
          <p class="font-bold text-xl">Security</p>
          <div class="">
            <p class="text-md font-medium mt-1">Email</p>
            <Input placeholder="ur email"/>
            <p class="text-md font-medium mt-0.5">Password</p>
            <Input placeholder="ur password"/>
            <p class="text-md font-medium mt-0.5">Reconfirm Password</p>
            <Input placeholder="ur password"/>
          </div>
        </div>
      </div>   
    </div>
  );
}
 
export default Profile;