import { Input } from "../components/Input";
import { Switch } from "../components/Switch";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const Settings = () => {
  // TODO: create course tracking settings as shown in figma
  // make sure to remove the h1 :)
  const timeZones = ["Pacific Time", "Eastern Time", "Central Time"];
  const [selectedTimeZone, setSelectedTimeZone] = useState(timeZones[0]);
  const notifyMode = ["Seats open up", "Any change occurs"]
  const [selectedNotifyMode, setSelectedNotifyMode] = useState(notifyMode[0]);
  return (
    <div className="mt-[3%]">
      <div className="flex items-center justify-between px-[15%] mt-[3%]">
        {<div className="flex-grow"></div>}  {/* Empty div for balancing */}
        <h2 className="text-3xl font-bold flex-grow-0">Settings</h2>
        <div className="text-sm text-center font-medium text-[#8d0509] hover:underline flex-grow">
          <button className="justify-center hover:underline">Save Info</button>
        </div>
      </div>
      <div className="px-[15%] flex justify-between mt-5">
        <div className="flex flex-col">
          <p className="font-bold text-xl">Contact Information</p>
          <div className="">
            <p className="text-md font-medium mt-2">Phone</p>
            <Input placeholder="123-456-7890"/>
            <p className="text-md font-medium mt-2">Email</p>
            <Input placeholder="example@domain.com"/>
            <p className="text-md font-medium mt-2">Discord</p>
            <Input placeholder="Username"/>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-xl">Theme</p>
          <div className="mt-2 flex items-center space-x-2">
            <p className="text-md font-medium">Dark Mode</p>
            <Switch/>
            <p className="text-md font-medium">Light Mode</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 mb-4">
        <hr className="border-gray-300 w-[70%]"/> {/* Adjusted horizontal line */}
      </div>
      <div className="px-[15%] flex justify-between mt-0">
        <div className="flex flex-col">
          <p className="font-bold text-xl">Desired Notification Times</p>
          <div className="">
            <p className="text-md font-medium mt-1">I want to be notified from</p>
            <div className="flex items-center space-x-2">
              <Input placeholder=""/>
              <p className="text-md font-regular">to</p>
              <Input placeholder=""/>
            </div>
            <p className="text-md font-medium mt-0.5">Time Zone</p>
            <Listbox value={selectedTimeZone} onChange={setSelectedTimeZone}>
            {({ open }) => (
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full h-8 pl-3 border pr-10 text-left bg-white shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  {selectedTimeZone}
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute z-20 w-full py-1 mt-1 overflow-auto text-base bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
            <p className="text-md font-medium mt-0.5">I want to be notified when</p>
            <Listbox value={selectedNotifyMode} onChange={setSelectedNotifyMode}>
            {({ open }) => (
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full h-8 pl-3 border pr-10 text-left bg-white shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  {selectedNotifyMode}
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
        <div className="flex flex-col">
          <p className="font-bold text-xl">Desired Notification Modes</p>
          <div className="mt-2 flex items-center space-x-2">
            <p className="text-md font-medium">SMS</p>
            <Switch/>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <p className="text-md font-medium">Discord</p>
            <Switch/>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <p className="text-md font-medium">Email</p>
            <Switch/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;