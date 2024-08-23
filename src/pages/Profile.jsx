import { Switch } from "../components/Switch";
import {useEffect, useState} from "react";
import { getAuth } from "firebase/auth";
import {getDatabase, onValue, ref, get, set} from "firebase/database";
import LoadingCircle from "../components/LoadingCircle";
import InputUndo from "../components/InputUndo.jsx";
import Button from "../components/Button.jsx";
import useUpdate from "../hooks/useUpdate.jsx";
import {usePopup} from "../contexts/PopupContext.jsx";

const Profile = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [actualFirst, setActualFirst] = useState('')
    const [actualLast, setActualLast] = useState('')
    const [actualEmail, setActualEmail] = useState('')
    const [inputFirst, setInputFirst] = useState('')
    const [inputLast, setInputLast] = useState('')
    const [inputEmail, setInputEmail] = useState('')

    const { updateSetting } = useUpdate()
    const { setPopup } = usePopup()

    const updateAllSettings = () => {
        Promise.all([
            updateSetting('/firstName', inputFirst, setActualFirst),
            updateSetting('/lastName', inputLast, setActualLast),
            updateSetting('/email', inputEmail, setActualEmail)
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
          fetchFromDatabase(user.uid, '/firstName/')
              .then(data => {
                setActualFirst(data)
              }),
          fetchFromDatabase(user.uid, '/lastName/')
              .then(data => {
                setActualLast(data)
              }),
          fetchFromDatabase(user.uid, '/email/')
              .then(data => {
                setActualEmail(data)
              })
        ]).then(() => {
          setIsLoading(false)
        })

      }
    })
  }, []);

  useEffect(() => {
    setInputFirst(actualFirst);
  }, [actualFirst]);

  useEffect(() => {
      setInputLast(actualLast);
    }, [actualLast]);

  useEffect(() => {
      setInputEmail(actualEmail);
    }, [actualEmail]);


  return (
      <div className="flex justify-center px-2">
        <div className="flex flex-col w-full max-w-7xl px-8">
          <div className="flex mt-10">
            <h2 className="text-3xl font-bold">Profile</h2>
          </div>

            {!isLoading && <>
                <div className="flex justify-between mt-5">
                    <div className="flex flex-col w-full">

                        <p className="font-bold text-xl">Personal Information</p>

                        <div>
                            <p className="text-md font-medium mt-2">First Name</p>
                            <div className={"flex items-center"}>
                                <InputUndo type={"text"}
                                           actual={actualFirst} setValue={setInputFirst} value={inputFirst}
                                           onChange={(e) => setInputFirst(e.target.value)} placeholder="John"/>
                            </div>

                            <p className="text-md font-medium mt-2">Last Name</p>
                            <div className={"flex items-center"}>
                                <InputUndo type={"text"}
                                           actual={actualLast} setValue={setInputLast} value={inputLast}
                                           onChange={(e) => setInputLast(e.target.value)} placeholder="Doe"/>
                            </div>

                            <p className="text-md font-medium mt-2">Email</p>
                            <div className={"flex items-center"}>
                                <InputUndo type={"email"} disabled
                                           actual={actualEmail} setValue={setInputEmail} value={inputEmail}
                                           onChange={(e) => setInputEmail(e.target.value)}
                                           placeholder="example@gmail.com"/>
                            </div>

                            <div className={"mt-8"}>
                                <Button onClick={() => updateAllSettings()}>Save Changes</Button>
                            </div>

                            <hr className={"my-8"}></hr>

                            <p className="font-bold text-xl">Security</p>

                            <div className={"flex"}>
                                <Button disabled className={"mt-3 opacity-70"}>
                                    Change Password
                                </Button>

                                <Button disabled className={"mt-3 ml-6 opacity-70"}>
                                    Delete Account
                                </Button>

                            </div>
                        </div>
                    </div>
                </div>
            </>
            }

            {isLoading &&
                <div className="flex flex-row justify-center mt-8">
                    <LoadingCircle></LoadingCircle>
                </div>}
        </div>
      </div>

  );
}

export default Profile;