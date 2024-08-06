import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'
import Logo from './Logo'
import anonymous from '../assets/profile.webp'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import {getDatabase, onValue, ref} from "firebase/database";

const navigation = [
  { name: 'Home', href: '/', private: false, hideWhenLoggedIn: true},
  { name: 'Dashboard', href: '/dashboard', private: true},
  { name: 'Settings', href: '/settings', private: true}
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const currentPage = useLocation().pathname
  const [isUser, setIsUser] = useState(null)
  const [notifications, setNotifications] = useState([])

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

  useEffect(() => {
    getAuth().onAuthStateChanged(user => {
      setIsUser(user)
      if (user) {
        getNotifications()
          .then(data => {
            console.log(data)
            setNotifications(data)
          })
      }
    })
  }, [])

  const signOut = () => {
    getAuth().signOut()
  }

  return (
    <Disclosure as="nav" className="bg-transparent shadow-sm">
      {({ open }) => (
        <>
          <div className="max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
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
                        (currentPage == item.href) ? ' text-[#8d0509]' : ' text-black ',
                        'rounded-md px-3 py-2 text-sm font-semibold transition-transform ease-in-out duration-100 hover:-translate-y-0.5'
                      )}
                      aria-current={(currentPage == item.href) ? 'page' : undefined}
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

                    <Menu.Button className="transition-opacity duration-100 relative inline-flex text-gray-600 opacity-80 hover:opacity-100 justify-center w-full px-2 py-2 text-sm font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                      {notifications.length > 0 && (
                          <p className={"text-sm scale-75 text-white flex justify-center items-center absolute left-0 top-0 rounded-full bg-red-500 w-6 h-6"}>{notifications.length}</p>
                      )}
                    </Menu.Button>

                    <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="z-30 absolute right-0 w-64 sm:w-80 mt-2 origin-top-right bg-white divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1">
                        <Menu.Item className="bg-[#A8292F]">
                          <div className='p-2'>
                            <p className=' font-bold text-white'>
                              Notifications
                            </p>
                          </div>
                        </Menu.Item>
                        {notifications.length > 0 ? (
                          notifications.map((notification, index) => (
                            <Menu.Item key={index}>
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
                            </Menu.Item>
                          ))
                        ) : (
                          <Menu.Item>
                            <div className='p-2'>
                              <p className='text'>No new notifications</p>
                            </div>
                          </Menu.Item>
                        )}
                      </div>
                    </Menu.Items>
                    </Transition>

                  </Menu>
                }

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={anonymous}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-20 mt-2 w-48 origin-top-right bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {!isUser && <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/signin"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm font-semibold text-gray-700')}
                          >
                            Sign In
                          </Link>
                        )}
                      </Menu.Item>}

                      {isUser && <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm font-semibold text-gray-700')}
                          >
                            Profile
                          </Link>
                        )}
                      </Menu.Item>}

                      {isUser && <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/"
                            onClick={() => signOut()}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 font-semibold text-sm text-gray-700')}
                          >
                            Sign Out
                          </Link>
                        )}
                      </Menu.Item>}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.filter((item) => (!item.private || isUser) && !(item.hideWhenLoggedIn && isUser)).map((item) => (
                <Disclosure.Button
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
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
