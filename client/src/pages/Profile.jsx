import { Input } from "../components/Input";
import { Menu } from "@headlessui/react";
import anonymous from '../assets/profile.webp'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import LoadingCircle from "../components/LoadingCircle";

const Profile = () => {
  const navigate = useNavigate();

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(true);

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
        fetchFromDatabase(user.uid, '/firstName')
        .then((data) => {
          setFirst(data);
        })
        .catch((error) => {
          console.log(error);
        })

        fetchFromDatabase(user.uid, '/lastName')
        .then((data) => {
          setLast(data);
        })
        .catch((error) => {
          console.log(error);
        })

        fetchFromDatabase(user.uid, '/email')
        .then((data) => {
          setEmail(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        })
      } else {
        navigate('/');
      }
    });

  }, []);

  return (
    <div>
      <div className="flex items-center justify-center px-[15%] mt-[3%]">
        <h2 className="text-3xl font-bold flex-grow-0">Profile</h2>
        {/* <div className="text-sm text-center font-medium text-[#8d0509] flex-grow">
          <button className="hover:underline">
            Save Info
          </button>
        </div> */}
      </div>

      {!isLoading && <div>
        <div className="px-[15%] flex justify-between mt-5">
          <div className="flex flex-col">
            <p className="font-bold text-xl">Personal Information</p>
            <div className="">
              <p className="text-md font-medium m2">First Name</p>
              <Input placeholder="First Name" defaultValue={first} />
              <p className="text-md font-medium mt-2">Last Name</p>
              <Input placeholder="Last Name" defaultValue={last} />
              <p className="text-md font-medium mt-2">Profile Photo</p>
              <div>
                <Menu>
                  <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-10 w-10 rounded-full"
                      src={anonymous}
                      alt=""
                    />
                  </Menu.Button>
                  <Menu.Items className="w-[20%] absolute mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={`w-full rounded-md px-0 text-sm text-gray-900`}
                          >
                            <Input type="file" onClick={(e) => e.stopPropagation()} className="h-10 shadow-none px-1" />
                            <button
                              className={`${active ? 'bg-red-100' : ''
                                } group mt-1 flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                            >
                              Change Profile Photo
                            </button>
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${active ? 'bg-red-100' : ''
                              } group mt-1 flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                          >
                            Delete Profile Photo
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4 mb-4">
          <hr className="border-gray-300 w-[70%]" /> {/* Adjusted horizontal line */}
        </div>
        <div className="px-[15%] flex justify-between">
          <div className="flex flex-col">
            <p className="font-bold text-xl">Security</p>
            <div className="">
              <p className="text-md font-medium mt-2">Email</p>
              <Input placeholder="example@domain.com" defaultValue={email} />
              <p className="text-md font-medium mt-2">Password</p>
              <Input placeholder="Password" />
              <p className="text-md font-medium mt-2">Confirm Password</p>
              <Input placeholder="Confirm Password" />
            </div>
          </div>
        </div>
      </div>}

      {isLoading &&
        <div className="flex flex-row justify-center mt-8">
          <LoadingCircle></LoadingCircle>
        </div>}

    </div>
  );
}

export default Profile;