import { Input } from "../components/Input";
import { Switch } from "../components/Switch";
import {useEffect, useState} from "react";
import {Listbox} from "@headlessui/react";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref, get } from "firebase/database";
import LoadingCircle from "../components/LoadingCircle";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const Settings = () => {
  // TODO: create course tracking settings as shown in figma

  const timeZones = ["Pacific Time", "Eastern Time", "Central Time"];
  const [selectedTimeZone, setSelectedTimeZone] = useState(timeZones[0]);
  const notifyMode = ["Seats open up", "Any change occurs"]
  const [selectedNotifyMode, setSelectedNotifyMode] = useState(notifyMode[0]);


  const [phone, setPhone] = useState('')
  const [isUsingPhone, setUsingPhone] = useState(false)
  const [email, setEmail] = useState('')
  const [isUsingEmail, setUsingEmail] = useState(false)
  const [discord, setDiscord] = useState('')
  const [isUsingDiscord, setUsingDiscord] = useState(false)

  const updateSettings = () => {
    get(ref(getDatabase(), 'sections/')).then(
        r => {
          console.log(r.val())
        }
    )
  }
  const fetchFromDatabase = (uid, info, set) => {
    return new Promise((resolve, reject) => {
      const dbRef = ref(getDatabase(), 'users/' + uid + info);
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        set(data);
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  };

  useEffect(() => {
    updateSettings()
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        fetchFromDatabase(user.uid, '/methods/email/value', setEmail);
        fetchFromDatabase(user.uid, '/methods/discord/value', setDiscord)
        fetchFromDatabase(user.uid, '/methods/phone/value', setPhone)
        fetchFromDatabase(user.uid, '/methods/email/enabled', setUsingEmail)
        fetchFromDatabase(user.uid, '/methods/discord/enabled', setUsingDiscord)
        fetchFromDatabase(user.uid, '/methods/phone/enabled', setUsingPhone)
      }
    })
  }, []);

  return (
      <div>

        <div
            className="flex justify-center items-center mt-10"> {/* Fullscreen container for vertical & horizontal centering */}
          <div className="flex items-center justify-center w-full max-w-4xl px-4 my-4 "> {/* Content container */}
            <h2 className="text-3xl font-bold absolute w-full text-center pointer-events-none">Settings</h2> {/* Absolutely positioned to center */}

            <div className="flex flex-row justify-end w-full absolute right-[25%]">
              <button
                  className="px-4 z-10 py-2 text-sm font-medium text-[#8d0509] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Save Changes
              </button>
            </div>

          </div>
        </div>


        <div className="px-[15%] flex justify-between mt-5">
          <div className="flex flex-col">
            <p className="font-bold text-xl">Contact Information</p>
            <div className="">
              <p className="text-md font-medium mt-2">Phone</p>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="123-456-7890"/>
              <p className="text-md font-medium mt-2">Email</p>
              <Input value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="example@domain.com"/>
              <p className="text-md font-medium mt-2">Discord Webhook</p>
              <Input value={discord} onChange={(e) => setDiscord(e.target.value)}  placeholder="Webhook URL"/>
            </div>
          </div>

        </div>
        <div className="flex justify-center mt-4 mb-4">
          <hr className="border-gray-300 w-[70%]"/>
          {/* Adjusted horizontal line */}
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
                {({open}) => (
                    <div className="relative mt-1">
                      <Listbox.Button
                          className="relative w-full h-8 pl-3 border pr-10 text-left bg-white shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        {selectedTimeZone}
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                  </span>
                      </Listbox.Button>
                      <Listbox.Options
                          className="absolute z-20 w-full py-1 mt-1 overflow-auto text-base bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {timeZones.map((timeZone, timeZoneIdx) => (
                            <Listbox.Option
                                key={timeZoneIdx}
                                className={({active}) =>
                                    `cursor-pointer select-none relative py-2 pl-10 pr-4 ${active ? 'text-amber-900 bg-red-100' : 'text-gray-900'}`
                                }
                                value={timeZone}
                            >
                              {({selected, active}) => (
                                  <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {timeZone}
                          </span>
                                    {selected ? (
                                        <span
                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-red-600' : 'text-red-600'}`}>
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
                {({open}) => (
                    <div className="relative mt-1">
                      <Listbox.Button
                          className="relative w-full h-8 pl-3 border pr-10 text-left bg-white shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        {selectedNotifyMode}
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                  </span>
                      </Listbox.Button>
                      <Listbox.Options
                          className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {notifyMode.map((notify, notifyIdx) => (
                            <Listbox.Option
                                key={notifyIdx}
                                className={({active}) =>
                                    `cursor-pointer select-none relative py-2 pl-10 pr-4 ${active ? 'text-amber-900 bg-red-100' : 'text-gray-900'}`
                                }
                                value={notify}
                            >
                              {({selected, active}) => (
                                  <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {notify}
                          </span>
                                    {selected ? (
                                        <span
                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-red-600' : 'text-red-600'}`}>
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
              <Switch checked={isUsingPhone} onCheckedChange={() => setUsingPhone(!isUsingPhone)}/>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <p className="text-md font-medium">Email</p>
              <Switch checked={isUsingEmail} onCheckedChange={() => setUsingEmail(!isUsingEmail)}/>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <p className="text-md font-medium">Discord</p>
              <Switch checked={isUsingDiscord} onCheckedChange={() => setUsingDiscord(!isUsingDiscord)}/>
            </div>

          </div>
        </div>
      </div>
  );
}

export default Settings;