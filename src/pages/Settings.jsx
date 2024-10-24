import { Switch } from "../components/ui/switch";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import LoadingCircle from "../components/LoadingCircle";
import Button from "../components/Button.jsx";
import InputUndo from "../components/InputUndo.jsx";
import useUpdate from "../hooks/useUpdate.jsx";
import validator from 'validator'
import { Info } from "lucide-react";
import discord from '../assets/discord-mark-blue.png'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../components/ui/dialog";
import { toast } from "@/hooks/use-toast";

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
  const [invalidPhone, setInvalidPhone] = useState(false)

  const { updateSetting } = useUpdate()

  const validateNumber = (number) => {
    return validator.isMobilePhone(number)
  }

  const updateAllSettings = () => {
    if (!validateNumber(inputPhone)) {
      toast({
        title: "Error",
        description: `Invalid phone number.`,
      })
      setInvalidPhone(true)
      return;
    }

    Promise.all([
      updateSetting('/methods/phone/value', inputPhone, setActualPhone),
      updateSetting('/methods/email/value', inputEmail, setActualEmail),
      updateSetting('/methods/discord/value', inputDiscord, setActualDiscord)
    ])
      .then(() => toast({
        title: "Success!",
        description: `Your changes have been saved.`,
      }))
      .catch((error) => {
        toast({
          title: "Error",
          description: `An unknown error has occurred.`,
        })
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

          {!isLoading && <form onSubmit={(e) => {
            e.preventDefault();
            updateAllSettings();
          }}>
            <div className="flex justify-between mt-5">
              <div className="flex flex-col">

                <div className={"flex"}>
                  <p className="font-bold text-xl">Contact Information</p>
                </div>

                <div className="">
                  <p className="text-md font-medium mt-2">Phone</p>
                  <div className={"flex items-center"}>
                    <InputUndo invalid={invalidPhone} type={"tel"} placeholder="123-456-7890"
                      value={inputPhone} setValue={setInputPhone} actual={actualPhone}
                      onChange={(e) => { setInputPhone(e.target.value); setInvalidPhone(false) }}></InputUndo>
                    <Switch checked={isUsingPhone} className={"ml-6"}
                      onCheckedChange={() => {
                        setUsingPhone(!isUsingPhone);
                        updateSetting('methods/phone/enabled', !isUsingPhone)
                      }} />
                  </div>

                  <p className="text-md font-medium mt-2">Email</p>
                  <div className={"flex items-center"}>
                    <InputUndo type={"email"} placeholder="example@domain.com" disabled
                      value={inputEmail} setValue={setInputEmail} actual={actualEmail}
                      onChange={(e) => setInputEmail(e.target.value)}></InputUndo>
                    <Switch checked={isUsingEmail} className={"ml-6"} disabled
                      onCheckedChange={() => {
                        setUsingEmail(!isUsingEmail);
                        updateSetting('methods/email/enabled', !isUsingEmail)
                      }} />
                  </div>

                  <p className="flex items-center text-md font-medium mt-2">Discord Webhook
                    <Dialog>
                      <DialogTrigger><Info className="transition-opacity w-4 ml-2 opacity-50 hover:cursor-pointer hover:opacity-100" /></DialogTrigger>
                      <DialogContent className={"w-screen md:w-[500px]"}>
                        <DialogHeader>
                          <DialogTitle className="flex">Using Discord Webhooks
                            <img src={discord} className="w-6 ml-2 object-contain"></img>
                          </DialogTitle>
                          <DialogDescription>
                            <p className="mt-3">In order to receive discord notifications, you'll need to create your own discord channel along with a webhook to connect to.</p>

                            <p className="mt-3">Follow the instructions <a className="underline text-blue-700" target="_blank" rel="noopener noreferrer" href="https://www.svix.com/resources/guides/how-to-make-webhook-discord/">here</a> to generate your own webhook URL to use with AggieSeek!</p>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </p>

                  <div className={"flex items-center"}>
                    <InputUndo type={"url"} placeholder="Webhook URL"
                      value={inputDiscord} setValue={setInputDiscord} actual={actualDiscord}
                      onChange={(e) => setInputDiscord(e.target.value)}></InputUndo>
                    <Switch className={"ml-6"}
                      checked={isUsingDiscord}
                      onCheckedChange={() => {
                        setUsingDiscord(!isUsingDiscord);
                        updateSetting('methods/discord/enabled', !isUsingDiscord)
                      }} />
                  </div>
                </div>
              </div>
            </div>

            <div className={"mt-8"}>
              <Button type={"submit"}>Save Changes</Button>
            </div>
          </form>}

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