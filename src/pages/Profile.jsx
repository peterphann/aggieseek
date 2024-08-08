import { Switch } from "../components/Switch";
import {useEffect, useState} from "react";
import { getAuth } from "firebase/auth";
import {getDatabase, onValue, ref, get, set} from "firebase/database";
import LoadingCircle from "../components/LoadingCircle";
import InputConfirm from "../components/InputConfirm.jsx";

const Profile = () => {

  const [isLoading, setIsLoading] = useState(true);

  const [actualFirst, setActualFirst] = useState('')
  const [actualLast, setActualLast] = useState('')
  const [inputFirst, setInputFirst] = useState('')
  const [inputLast, setInputLast] = useState('')

  const updateSetting = (path, value, setActual) => {
    const uid = getAuth().currentUser.uid
    const dbRef = ref(getDatabase(), 'users/' + uid + '/' + path)
    set(dbRef, value)
        .then(() => {
          setActual(value);
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
          fetchFromDatabase(user.uid, '/firstName/')
              .then(data => {
                setActualFirst(data)
              }),
          fetchFromDatabase(user.uid, '/lastName/')
              .then(data => {
                setActualLast(data)
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


  return (
      <div className="flex justify-center px-2">
        <div className="flex flex-col w-full max-w-7xl px-8">
          <div className="flex mt-10">
            <h2 className="text-3xl font-bold">Profile</h2> {/* Absolutely positioned to center */}
          </div>

          {!isLoading && <div className="flex justify-between mt-5">
            <div className="flex flex-col">

              <div className={"flex"}>
                <p className="font-bold text-xl">Personal Information</p>
              </div>

              <div>
                <p className="text-md font-medium mt-2">First Name</p>
                <div className={"flex items-center"}>
                  <InputConfirm type={"text"} onClick={() => updateSetting('firstName/', inputFirst, setActualFirst)}
                                confirm={actualFirst !== inputFirst} value={inputFirst}
                                onChange={(e) => setInputFirst(e.target.value)} placeholder="John"/>
                </div>

                <p className="text-md font-medium mt-2">Last Name</p>
                <div className={"flex items-center"}>
                  <InputConfirm type={"text"} onClick={() => updateSetting('lastName/', inputLast, setActualLast)}
                                confirm={actualLast !== inputLast} value={inputLast}
                                onChange={(e) => setInputLast(e.target.value)}  placeholder="Doe"/>
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

export default Profile;