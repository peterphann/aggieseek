import { Fragment, useEffect, useState } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'
import Logo from './Logo'
import anonymous from '../assets/profile.webp'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { getDatabase, onValue, ref, remove } from "firebase/database";
import DebugPane from "./DebugPane.jsx";

const navigation = [
  { name: 'Home', href: '/', private: false, hideWhenLoggedIn: true },
  { name: 'Dashboard', href: '/dashboard', private: true },
  { name: 'Settings', href: '/settings', private: true }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const currentPage = useLocation().pathname
  const [isUser, setIsUser] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [viewed, setViewed] = useState(false)
  const [actualProfilePic, setActualProfilePic] = useState('');

  const clearNotifications = () => {
    setViewed(true)
    const uid = getAuth().currentUser.uid
    const dbRef = ref(getDatabase(), 'users/' + uid + '/notifications/')
    remove(dbRef)
  }

  const getNotifications = () => {
    const uid = getAuth().currentUser.uid
    return new Promise((resolve, reject) => {
      const dbRef = ref(getDatabase(), 'users/' + uid + '/notifications/')
      onValue(dbRef, snapshot => {
        const data = snapshot.val()
        if (data === null) {
          resolve([])
        } else {
          const array = Object.values(data)
          resolve(array)
        }
      }, error => {
        reject(error)
      })
    })
  }

  const getTimeString = (date) => {
    const pastDate = new Date(date)
    const currDate = new Date()

    const difference = currDate - pastDate

    if (difference < 60 * 1000) {
      const seconds = (difference / 1000).toFixed(0)
      return `${seconds} second${seconds === '1' ? '' : 's'} ago`
    } else if (difference < 60 * 60 * 1000) {
      const minutes = (difference / 60000).toFixed(0)
      return `${minutes} minute${minutes === '1' ? '' : 's'} ago`
    } else if (difference < 24 * 60 * 60 * 1000) {
      const hours = (difference / 3600000).toFixed(0)
      return `${hours} hour${hours === '1' ? '' : 's'} ago`
    } else {
      const days = (difference / 86400000).toFixed(0)
      return `${days} day${days === '1' ? '' : 's'} ago`
    }
  }

  const retrieveProfilePicture = () => {
    const uid = getAuth().currentUser.uid;
    const dbRef = ref(getDatabase(), 'users/' + uid + '/profilePicUrl/');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setActualProfilePic(data);
    });
  }

  useEffect(() => {
    getAuth().onAuthStateChanged(user => {
      setIsUser(user)
      if (user) {
        getNotifications()
          .then(data => {
            setNotifications(data)
          })
        retrieveProfilePicture()
      } else {
        setActualProfilePic('');
      }
    })
  }, [])

  const signOut = () => {
    getAuth().signOut()
  }

  return (
    <Disclosure as="nav" className="bg-transparent shadow-sm fixed top-0 left-0 right-0 z-50">
      {({ open }) => (
        <>
          <div className="px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 ml-4 sm:ml-0">
                <div id={"logo-centered"} className="flex items-center">
                  <Link to={isUser ? "/dashboard" : "/"}>
                    <Logo className="transition-all ease-in-out duration-100 h-6 object-contain cursor-pointer hover:opacity-80"></Logo>
                  </Link>
                </div>
                <div className="ml-4 lg:ml-6 hidden sm:block">
                  <div className="flex space-x-4">
                    {navigation.filter((item) => (!item.private || isUser) && !(item.hideWhenLoggedIn && isUser)).map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          (currentPage === item.href) ? ' text-[#8d0509]' : ' text-black ',
                          'rounded-md px-3 py-2 text-sm font-semibold transition-transform ease-in-out duration-100 hover:-translate-y-0.5'
                        )}
                        aria-current={(currentPage === item.href) ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center pr-2 sm:ml-6 sm:pr-0">
                {isUser &&
                  <Menu as="div" className="relative inline-block text-left">

                    <MenuButton
                      className="transition-opacity duration-100 relative inline-flex text-gray-600 opacity-80 hover:opacity-100 justify-center w-full px-2 py-2 text-sm font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                      {notifications.length > 0 && !viewed && (
                        <p className={"text-sm scale-75 text-white flex justify-center items-center absolute left-0 top-0 rounded-full bg-red-500 w-6 h-6"}>{notifications.length <= 9 ? notifications.length : '9+'}</p>
                      )}
                    </MenuButton>

                    <MenuItems anchor="bottom end"
                      transition
                      onFocus={clearNotifications}
                      className="origin-top-right transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0
                                          z-30 absolute right-0 w-64 sm:w-80 mt-2 bg-white divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1">
                        <MenuItem className="bg-[#A8292F]">
                          <div className='p-2'>
                            <p className='font-bold text-white'>
                              Notifications
                            </p>
                          </div>
                        </MenuItem>
                        <div className={"overflow-y-auto max-h-64"}>
                          {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                              <MenuItem key={index}>
                                <div className='p-2'>
                                  <div className='flex justify-between'>
                                    <p className='text'><span className='font-bold'>{notification.title}</span><span className='text-xs text-gray-400 font-bold'> {notification.crn}</span></p>
                                    <p className='text'><span className='text-xs font-bold'> {notification.message}</span></p>
                                  </div>
                                  <div className='flex justify-between'>
                                    <p className='text-xs'><span className='text-gray-500'>{getTimeString(notification.timestamp)}</span></p>
                                    <p className='text-xs flex items-center'>{notification.origSeats} <span><ArrowLongRightIcon className={"mx-1 w-4"}></ArrowLongRightIcon></span> {notification.newSeats}</p>
                                  </div>
                                </div>
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem>
                              <div className='p-2'>
                                <p className='text'>No new notifications</p>
                              </div>
                            </MenuItem>
                          )}
                        </div>
                      </div>
                    </MenuItems>

                  </Menu>
                }

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={actualProfilePic ? actualProfilePic : anonymous}
                        alt=""
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    anchor="bottom end"
                    transition
                    className="origin-top-right transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0
                                          absolute right-0 z-20 mt-2 w-48 bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {!isUser && <MenuItem>
                      <Link
                        to="/signin"
                        className={'block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100'}
                      >
                        Sign In
                      </Link>
                    </MenuItem>}

                    {isUser && <>
                      <MenuItem>
                        <Link
                          to="/profile"
                          className={'block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100'}
                        >
                          Profile
                        </Link>
                      </MenuItem>

                      <MenuItem>
                        <Link
                          to="/"
                          onClick={() => signOut()}
                          className={'block px-4 py-2 font-semibold text-sm text-gray-700 hover:bg-gray-100'}
                        >
                          Sign Out
                        </Link>
                      </MenuItem>
                    </>}
                  </MenuItems>
                </Menu>

              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.filter((item) => (!item.private || isUser) && !(item.hideWhenLoggedIn && isUser)).map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  aria-current={(currentPage === item.href) ? 'page' : undefined}
                >
                  <Link to={item.href}
                    className={classNames(
                      (currentPage === item.href) ? ' text-[#8d0509]' : 'text-black',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}>
                    {item.name}
                  </Link>
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
