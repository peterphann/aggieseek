import { Input } from "../components/Input";
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
        <div className="text-sm text-center font-medium text-[#8d0509] flex-grow">
          <button className="hover:underline">
            Save Info
          </button>
        </div>
      </div>
      <div class="px-[15%] flex justify-between mt-5">
        <div class="flex flex-col">
          <p class="font-bold text-xl">Personal Information</p>
          <div class="">
            <p class="text-md font-medium m2">First Name</p>
            <Input placeholder="First Name"/>
            <p class="text-md font-medium mt-2">Last Name</p>
            <Input placeholder="Last Name"/>
            <p class="text-md font-medium mt-2">Profile Photo</p>
            <div>
              <Menu>
                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-10 w-10 rounded-full"
                      src={anonymous}
                      alt=""
                  />
                </Menu.Button>
                <Menu.Items className="w-[20%] absolute mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={`w-full rounded-md px-0 text-sm text-gray-900`}
                        >
                        <Input type = "file" onClick={(e) => e.stopPropagation()} className = "h-10 shadow-none px-1"/>
                        <button 
                          className={`${
                          active ? 'bg-red-100' : ''
                          } group mt-1 flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                        >
                        Change Profile Photo
                        </button>
                      </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                          active ? 'bg-red-100' : ''
                          } group mt-1 flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                        >
                          Delete Profile Photo
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
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
            <p class="text-md font-medium mt-2">Email</p>
            <Input placeholder="example@domain.com"/>
            <p class="text-md font-medium mt-2">Password</p>
            <Input placeholder="Password"/>
            <p class="text-md font-medium mt-2">Confirm Password</p>
            <Input placeholder="Confirm Password"/>
          </div>
        </div>
      </div>   
    </div>
  );
}
 
export default Profile;