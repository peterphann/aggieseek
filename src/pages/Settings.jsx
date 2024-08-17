import { Switch } from "../components/Switch";
import {useEffect, useState} from "react";
import { getAuth } from "firebase/auth";
import {getDatabase, onValue, ref, get, set} from "firebase/database";
import LoadingCircle from "../components/LoadingCircle";
import {Input} from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import {usePopup} from "../contexts/PopupContext.jsx";
import DebugPane from "../components/DebugPane.jsx";
import InputUndo from "../components/InputUndo.jsx";
import useUpdate from "../hooks/useUpdate.jsx";

const Settings = () => {

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

    const { setPopup } = usePopup()
    const { updateSetting } = useUpdate()

  const updateAllSettings = () => {
      Promise.all([
          updateSetting('/methods/phone/value', inputPhone, setActualPhone),
          updateSetting('/methods/email/value', inputEmail, setActualEmail),
          updateSetting('/methods/discord/value', inputDiscord, setActualDiscord)
      ])
          .then(() => setPopup('Changes saved!'))
          .catch((error) => {
              setPopup('An error has occurred.')
          })
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
      <>
          <div className="flex justify-center px-2">
              <div className="flex flex-col w-full max-w-7xl px-8">
                  <div className="flex mt-10">
                      <h2 className="text-3xl font-bold">Settings</h2>
                  </div>

                  {!isLoading && <>
                      <div className="flex justify-between mt-5">
                          <div className="flex flex-col">

                              <div className={"flex"}>
                                  <p className="font-bold text-xl">Contact Information</p>
                              </div>

                              <div className="">
                                  <p className="text-md font-medium mt-2">Phone</p>
                                  <div className={"flex items-center"}>
                                      <InputUndo type={"tel"} placeholder="123-456-7890"
                                                 value={inputPhone}  setValue={setInputPhone} actual={actualPhone}
                                                 onChange={(e) => setInputPhone(e.target.value)}></InputUndo>
                                      <Switch checked={isUsingPhone} className={"ml-6"}
                                              onCheckedChange={() => {
                                                  setUsingPhone(!isUsingPhone);
                                                  updateSetting('methods/phone/enabled', !isUsingPhone)
                                              }}/>
                                  </div>

                                  <p className="text-md font-medium mt-2">Email</p>
                                  <div className={"flex items-center"}>
                                      <InputUndo type={"email"} placeholder="example@domain.com" disabled
                                                 value={inputEmail}  setValue={setInputEmail} actual={actualEmail}
                                                 onChange={(e) => setInputEmail(e.target.value)}></InputUndo>
                                      <Switch checked={isUsingEmail} className={"ml-6"} disabled
                                              onCheckedChange={() => {
                                                  setUsingEmail(!isUsingEmail);
                                                  updateSetting('methods/email/enabled', !isUsingEmail)
                                              }}/>
                                  </div>

                                  <p className="text-md font-medium mt-2">Discord Webhook</p>
                                  <div className={"flex items-center"}>
                                      <InputUndo type={"url"} placeholder="Webhook URL"
                                                 value={inputDiscord}  setValue={setInputDiscord} actual={actualDiscord}
                                                 onChange={(e) => setInputDiscord(e.target.value)}></InputUndo>
                                      <Switch className={"ml-6"}
                                              checked={isUsingDiscord}
                                              onCheckedChange={() => {
                                                  setUsingDiscord(!isUsingDiscord);
                                                  updateSetting('methods/discord/enabled', !isUsingDiscord)
                                              }}/>
                                  </div>
                              </div>

                          </div>
                      </div>

                      <div className={"mt-8"}>
                          <Button onClick={() => updateAllSettings()}>Save Changes</Button>
                      </div>
                  </>}

                  {isLoading &&
                      <div className="flex flex-row justify-center mt-8">
                          <LoadingCircle></LoadingCircle>
                      </div>}
              </div>
          </div>


      </>

  );
}

export default Settings;