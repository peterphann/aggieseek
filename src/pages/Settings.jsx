import { Switch } from "../components/Switch";
import {useEffect, useState} from "react";
import { getAuth } from "firebase/auth";
import {getDatabase, onValue, ref, get, set} from "firebase/database";
import LoadingCircle from "../components/LoadingCircle";
import InputConfirm from "../components/InputConfirm.jsx";

const Settings = () => {

  const timeZones = ["Pacific Time", "Eastern Time", "Central Time"];
  const [selectedTimeZone, setSelectedTimeZone] = useState(timeZones[0]);
  const notifyMode = ["Seats open up", "Any change occurs"]
  const [selectedNotifyMode, setSelectedNotifyMode] = useState(notifyMode[0]);
  const [isLoading, setIsLoading] = useState(true);


  const [actualPhone, setActualPhone] = useState('')
  const [actualEmail, setActualEmail] = useState('')
  const [actualDiscord, setActualDiscord] = useState('')
  const [inputPhone, setInputPhone] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputDiscord, setInputDiscord] = useState('')
  const [isUsingPhone, setUsingPhone] = useState(false)
  const [isUsingEmail, setUsingEmail] = useState(false)
  const [isUsingDiscord, setUsingDiscord] = useState(false)

  const updateSetting = (path, value, setActual) => {
    const uid = getAuth().currentUser.uid
    const dbRef = ref(getDatabase(), 'users/' + uid + '/' + path)
    set(dbRef, value)
        .then(() => {
            setActual(value)
        });
  }

  const fetchFromDatabase = (uid, info) => {
    return new Promise((resolve, reject) => {
      const dbRef = ref(getDatabase(), 'users/' + uid + info);
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  };

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        Promise.all([
          fetchFromDatabase(user.uid, '/methods/email/')
              .then(data => {
                setActualEmail(data['value'])
                setUsingEmail(data['enabled'])
              }),
          fetchFromDatabase(user.uid, '/methods/discord/')
              .then(data => {
                setActualDiscord(data['value'])
                setUsingDiscord(data['enabled'])
              }),
          fetchFromDatabase(user.uid, '/methods/phone/')
              .then(data => {
                setActualPhone(data['value'])
                setUsingPhone(data['enabled'])
               })
        ]).then(() => {
          setIsLoading(false)
        })

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
      <div className="flex justify-center px-2">
        <div className="flex flex-col w-full max-w-7xl px-8">
          <div className="flex mt-10">
            <h2 className="text-3xl font-bold">Settings</h2> {/* Absolutely positioned to center */}
          </div>

          {!isLoading && <div className="flex justify-between mt-5">
            <div className="flex flex-col">

              <div className={"flex"}>
                <p className="font-bold text-xl">Contact Information</p>
              </div>

              <div className="">
                <p className="text-md font-medium mt-2">Phone</p>
                <div className={"flex items-center"}>
                  <InputConfirm type={"tel"} onClick={() => updateSetting('methods/phone/value', inputPhone, setActualPhone)}
                                confirm={actualPhone !== inputPhone} value={inputPhone}
                                onChange={(e) => setInputPhone(e.target.value)} placeholder="123-456-7890"/>
                  <Switch checked={isUsingPhone} className={"ml-6"}
                          onCheckedChange={() => {
                            setUsingPhone(!isUsingPhone);
                            updateSetting('methods/phone/enabled', !isUsingPhone)
                          }}/>
                </div>

                <p className="text-md font-medium mt-2">Email</p>
                <div className={"flex items-center"}>
                  <InputConfirm type={"email"} disabled onClick={() => updateSetting('methods/email/value', inputEmail, setActualEmail)}
                                confirm={actualEmail !== inputEmail} value={inputEmail}
                                placeholder="example@domain.com"/>
                  <Switch checked={isUsingEmail} className={"ml-6"}
                          onCheckedChange={() => {
                            setUsingEmail(!isUsingEmail);
                            updateSetting('methods/email/enabled', !isUsingEmail)
                          }}/>
                </div>

                <p className="text-md font-medium mt-2">Discord Webhook</p>
                <div className={"flex items-center"}>
                  <InputConfirm type={"url"} onClick={() => updateSetting('methods/discord/value', inputDiscord, setActualDiscord())}
                                confirm={actualDiscord !== inputDiscord} value={inputDiscord}
                                onChange={(e) => setInputDiscord(e.target.value)} placeholder="Webhook URL"/>
                  <Switch checked={isUsingDiscord} className={"ml-6"}
                          onCheckedChange={() => {
                            setUsingDiscord(!isUsingDiscord);
                            updateSetting('methods/discord/enabled', !isUsingDiscord)
                          }}/>
                </div>
              </div>
            </div>

          </div>}

          {isLoading &&
              <div className="flex flex-row justify-center mt-8">
                <LoadingCircle></LoadingCircle>
              </div>}
        </div>
      </div>

  );
}

export default Settings;