import { Switch } from "../components/Switch";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";  // Import Firebase storage
import LoadingCircle from "../components/LoadingCircle";
import InputUndo from "../components/InputUndo.jsx";
import Button from "../components/Button.jsx";
import useUpdate from "../hooks/useUpdate.jsx";
import anonymous from '../assets/profile.webp'
import { usePopup } from "../contexts/PopupContext.jsx";

const Profile = () => {

  const [isLoading, setIsLoading] = useState(true);

  const [actualFirst, setActualFirst] = useState('')
  const [actualLast, setActualLast] = useState('')
  const [actualEmail, setActualEmail] = useState('')
  const [actualProfilePic, setActualProfilePic] = useState('');
  const [inputFirst, setInputFirst] = useState('')
  const [inputLast, setInputLast] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputProfilePic, setInputProfilePic] = useState(null);

  const { updateSetting } = useUpdate()
  const { setPopup } = usePopup()

  const updateAllSettings = () => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;

        const promises = [
          updateSetting('/firstName', inputFirst, setActualFirst),
          updateSetting('/lastName', inputLast, setActualLast),
          updateSetting('/email', inputEmail, setActualEmail),
        ];

        // Only upload profile picture if one is selected
        if (inputProfilePic) {
          const storage = getStorage();
          const storageReference = storageRef(storage, `profilePictures/${uid}`);

          const uploadPromise = uploadBytes(storageReference, inputProfilePic)
            .then(() => getDownloadURL(storageReference))
            .then((url) => {
              console.log('Profile picture URL:', url);
              // Update the profile picture URL in the database
              return set(ref(getDatabase(), `users/${uid}/profilePicUrl`), url);
            })
            .catch((error) => {
              console.error('Failed to upload profile picture:', error);
              setPopup('Failed to upload profile picture.');
            });

          promises.push(uploadPromise);
        }

        Promise.all(promises)
          .then(() => setPopup('Changes saved!'))
          .catch((error) => {
            setPopup('An error has occurred.');
            console.error(error);
          });
      }
    });
  };


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

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      console.log('File selected:', e.target.files[0]); // Debugging: Log selected file
      setInputProfilePic(e.target.files[0]);
    }
  };

  const uploadProfilePicture = (uid) => {
    if (inputProfilePic) {
      const storage = getStorage();
      const storageReference = storageRef(storage, `profilePictures/${uid}`);

      // Step 1: Attempt to upload the file
      uploadBytes(storageReference, inputProfilePic)
        .then(snapshot => {
          console.log('File uploaded successfully:', snapshot);

          // Step 2: Get the download URL
          return getDownloadURL(storageReference);
        })
        .then(url => {
          console.log('Download URL retrieved:', url);

          // Step 3: Save the image URL to Realtime Database
          const db = getDatabase();
          setInputProfilePic(null);
          return set(ref(db, `users/${uid}/profilePicUrl`), url)
            .then(() => {
              // Only after setting the profilePicUrl in the database, update the state
              setActualProfilePic(url);  // Update local state with the image URL
              setPopup('Profile picture updated successfully!');
            });
        })
        .catch((error) => {
          console.error('Error occurred during file upload:', error);
          setPopup('Failed to upload profile picture.');
        });
    } else {
      setPopup('No file selected.');
      console.error('No file selected for upload.');
    }
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
            }),
          fetchFromDatabase(user.uid, '/profilePicUrl/')
            .then(data => {
              setActualProfilePic(data);
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

        {!isLoading &&
          <div className="flex justify-between mt-5">
            <div className="flex flex-col w-full">

              <p className="font-bold text-xl">Personal Information</p>

              <div>
                <p className="text-md font-medium mt-2">First Name</p>
                <div className={"flex items-center"}>
                  <InputUndo type={"text"}
                    actual={actualFirst} setValue={setInputFirst} value={inputFirst}
                    onChange={(e) => setInputFirst(e.target.value)} placeholder="John" />
                </div>

                <p className="text-md font-medium mt-2">Last Name</p>
                <div className={"flex items-center"}>
                  <InputUndo type={"text"}
                    actual={actualLast} setValue={setInputLast} value={inputLast}
                    onChange={(e) => setInputLast(e.target.value)} placeholder="Doe" />
                </div>
              </div>

              <p className="text-md font-medium mt-2">Email</p>
              <div className={"flex items-center"}>
                <InputUndo type={"email"} disabled
                  actual={actualEmail} setValue={setInputEmail} value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="example@gmail.com" />
              </div>

              <div className={"mt-8"}>
                <Button onClick={() => updateAllSettings()}>Save Changes</Button>
              </div>

              <hr className={"my-8 border-black"}></hr>

              {/* Profile Picture Section */}
              <div className="mb-4">
                <p className="font-bold text-xl">Profile Picture</p>
                <img
                  src={inputProfilePic ? URL.createObjectURL(inputProfilePic) : actualProfilePic ? actualProfilePic : anonymous}
                  alt="Profile"
                  className="transition-transform shadow-md hover:scale-95 hover:cursor-pointer w-16 h-16 rounded-full mt-2 object-cover"
                  onClick={() => document.getElementById('profilePicInput').click()}
                />

                <input id="profilePicInput" type="file" accept="image/*" onChange={handleImageChange} className="mt-4 hidden" />

                <Button className={"mt-3"} onClick={() => getAuth().onAuthStateChanged(user => uploadProfilePicture(user.uid))}>
                  Upload Profile Picture
                </Button>
              </div>

              {/* TODO: Add account management stuff */}

              {/* <hr className={"my-8 border-black"}></hr>

              <p className="font-bold text-xl">Security</p>

              <div className={"flex"}>
                <Button disabled className={"mt-3 opacity-70"}>
                  Change Password
                </Button>

                <Button disabled className={"mt-3 ml-6 opacity-70"}>
                  Delete Account
                </Button>

              </div> */}
            </div>
          </div>
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
