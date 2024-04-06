import { Input } from "../components/input";
import { Switch } from "../components/switch";
import { useState } from "react";
import { Listbox } from "@headlessui/react";

const Settings = () => {
  // TODO: create course tracking settings as shown in figma
  // make sure to remove the h1 :)
  const timeZones = ["Pacific Time", "Eastern Time", "Central Time"];
  const [selectedTimeZone, setSelectedTimeZone] = useState(timeZones[0]);
  const notifyMode = ["Seats open up","Any change occurs"]
  const [selectedNotifyMode, setSelectedNotifyMode] = useState(notifyMode[0]);
  return (
    <div>
      <div class="flex justify-center  mt-[3%]">
      <h2 class="text-3xl font-bold absolute w-full text-center">Settings</h2>
      </div>
      <div class="px-[15%] flex justify-between mt-10">
        <div class="flex flex-col">
          <p class="font-bold text-xl">Notification Contact Information</p>
          <div class="">
            <p class="text-md font-medium mt-1">Phone</p>
            <Input placeholder="123-456-7890"/>
            <p class="text-md font-medium mt-0.5">Email</p>
            <Input placeholder="user@gmail.com"/>
            <p class="text-md font-medium mt-0.5">Discord</p>
            <Input placeholder="urdiscordusername"/>
          </div>
        </div>
        <div class="flex flex-col">
          <p class="font-bold text-xl">Desired Display Mode</p>
          <div class="mt-2 flex items-center space-x-2">
            <p class="text-md font-medium">Dark Mode</p>
            <Switch/>
            <p class="text-md font-medium">Light Mode</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 mb-4">
        <hr className="border-gray-300 w-[70%]"/> {/* Adjusted horizontal line */}
      </div>
      <div class="px-[15%] flex justify-between mt-0">
        <div class="flex flex-col">
          <p class="font-bold text-xl">Desired Notification Times</p>
          <div class="">
            <p class="text-md font-medium mt-1">I want to be notified from</p>
            <div class="flex items-center space-x-2">
              <Input placeholder="123-456-7890"/>
              <p class="text-md font-regular">to</p>
              <Input placeholder="123-456-7890"/>
            </div>
            <p class="text-md font-medium mt-0.5">Time Zone</p>
            <Listbox value={selectedTimeZone} onChange={setSelectedTimeZone}>
            {({ open }) => (
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full py-2 pl-3 border pr-10 text-left  bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  {selectedTimeZone}
                </Listbox.Button>
                <Listbox.Options className="absolute z-20 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {timeZones.map((timeZone, timeZoneIdx) => (
                    <Listbox.Option
                      key={timeZoneIdx}
                      className={({ active }) => 
                        `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'text-amber-900 bg-red-100' : 'text-gray-900'}`
                      }
                      value={timeZone}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {timeZone}
                          </span>
                          {selected ? (
                            <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-red-600' : 'text-red-600'}`}>
                              &#10003;
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            )}
          </Listbox>
            <p class="text-md font-medium mt-0.5">I want to be notified when</p>
            <Listbox value={selectedNotifyMode} onChange={setSelectedNotifyMode}>
            {({ open }) => (
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full py-2 pl-3 border pr-10 text-left  bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  {selectedNotifyMode}
                </Listbox.Button>
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {notifyMode.map((notify, notifyIdx) => (
                    <Listbox.Option
                      key={notifyIdx}
                      className={({ active }) => 
                        `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'text-amber-900 bg-red-100' : 'text-gray-900'}`
                      }
                      value={notify}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {notify}
                          </span>
                          {selected ? (
                            <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-red-600' : 'text-red-600'}`}>
                              &#10003;
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            )}
          </Listbox>
          </div>
        </div>
        <div class="flex flex-col">
          <p class="font-bold text-xl">Desired Notification Modes</p>
          <div class="mt-2 flex items-center space-x-2">
            <p class="text-md font-medium">SMS</p>
            <Switch/>
          </div>
          <div class="mt-2 flex items-center space-x-2">
            <p class="text-md font-medium">Discord</p>
            <Switch/>
          </div>
          <div class="mt-2 flex items-center space-x-2">
            <p class="text-md font-medium">Email</p>
            <Switch/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;