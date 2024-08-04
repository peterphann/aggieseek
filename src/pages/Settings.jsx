import { Input } from "../components/Input";
import { Switch } from "../components/Switch";
import {useEffect, useState} from "react";
import {Listbox} from "@headlessui/react";
import { getAuth } from "firebase/auth";
import {getDatabase, onValue, ref, get, set} from "firebase/database";
import LoadingCircle from "../components/LoadingCircle";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import InputConfirm from "../components/InputConfirm.jsx";

const Settings = () => {

  const timeZones = ["Pacific Time", "Eastern Time", "Central Time"];
  const [selectedTimeZone, setSelectedTimeZone] = useState(timeZones[0]);
  const notifyMode = ["Seats open up", "Any change occurs"]
  const [selectedNotifyMode, setSelectedNotifyMode] = useState(notifyMode[0]);


  const [actualPhone, setActualPhone] = useState('')
  const [actualEmail, setActualEmail] = useState('')
  const [actualDiscord, setActualDiscord] = useState('')
  const [inputPhone, setInputPhone] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputDiscord, setInputDiscord] = useState('')
  const [isUsingPhone, setUsingPhone] = useState(false)
  const [isUsingEmail, setUsingEmail] = useState(false)
  const [isUsingDiscord, setUsingDiscord] = useState(false)

  const updateSetting = (path, value) => {
    const uid = getAuth().currentUser.uid
    const dbRef = ref(getDatabase(), 'users/' + uid + '/' + path)
    set(dbRef, value);
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
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        fetchFromDatabase(user.uid, '/methods/email/value', setActualEmail);
        fetchFromDatabase(user.uid, '/methods/discord/value', setActualDiscord)
        fetchFromDatabase(user.uid, '/methods/phone/value', setActualPhone)
        fetchFromDatabase(user.uid, '/methods/email/enabled', setUsingEmail)
        fetchFromDatabase(user.uid, '/methods/discord/enabled', setUsingDiscord)
        fetchFromDatabase(user.uid, '/methods/phone/enabled', setUsingPhone)
      }
    })
  }, []);

  useEffect(() => {
    setInputPhone(actualPhone);
  }, [actualPhone]);

  useEffect(() => {
      setInputEmail(actualEmail);
    }, [actualEmail]);

  useEffect(() => {
      setInputDiscord(actualDiscord);
    }, [actualDiscord]);

  return (
      <div>

        <div
            className="flex justify-center items-center mt-10"> {/* Fullscreen container for vertical & horizontal centering */}
          <div className="flex items-center justify-center w-full max-w-4xl px-4 my-4 "> {/* Content container */}
            <h2 className="text-3xl font-bold absolute w-full text-center pointer-events-none">Settings</h2> {/* Absolutely positioned to center */}

          </div>
        </div>


        <div className="px-[15%] flex justify-between mt-5">
          <div className="flex flex-col">

            <div className={"flex"}>
              <p className="font-bold text-xl">Contact Information</p>
            </div>

            <div className="">
              <p className="text-md font-medium mt-2">Phone</p>
              <div className={"flex items-center"}>
                <InputConfirm onClick={() => updateSetting('methods/phone/value', inputPhone)}
                              confirm={actualPhone !== inputPhone} value={inputPhone}
                              onChange={(e) => setInputPhone(e.target.value)} placeholder="123-456-7890"/>
                <Switch checked={isUsingPhone} className={"ml-6"}
                        onCheckedChange={() => {setUsingPhone(!isUsingPhone); updateSetting('methods/phone/enabled', !isUsingPhone)}}/>
              </div>

              <p className="text-md font-medium mt-2 opacity-20">Email</p>
              <div className={"flex items-center"}>
                <InputConfirm disabled onClick={() => updateSetting('methods/email/value', inputEmail)}
                              confirm={actualEmail !== inputEmail} value={inputEmail}
                              onChange={(e) => setInputEmail(e.target.value)} placeholder="example@domain.com"/>
                <Switch disabled checked={isUsingEmail} className={"ml-6"}
                        onCheckedChange={() => {setUsingEmail(!isUsingEmail); updateSetting('methods/email/enabled', !isUsingEmail)}}/>
              </div>

              <p className="text-md font-medium mt-2">Discord Webhook</p>
              <div className={"flex items-center"}>
                <InputConfirm onClick={() => updateSetting('methods/discord/value', inputDiscord)}
                              confirm={actualDiscord !== inputDiscord} value={inputDiscord}
                              onChange={(e) => setInputDiscord(e.target.value)} placeholder="Webhook URL"/>
                <Switch checked={isUsingDiscord} className={"ml-6"}
                        onCheckedChange={() => {setUsingDiscord(!isUsingDiscord); updateSetting('methods/discord/enabled', !isUsingDiscord)}}/>
              </div>
            </div>
          </div>

        </div>
        <div className="flex justify-center mt-4 mb-4">
          <hr className="border-gray-300 w-[70%]"/>
          {/* Adjusted horizontal line */}
        </div>
      </div>
  );
}

export default Settings;