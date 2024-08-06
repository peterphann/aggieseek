import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';
import anonymous from '../assets/profile.webp';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const navigation = [
  { name: 'Home', href: '/', private: false, hideWhenLoggedIn: true },
  { name: 'Dashboard', href: '/dashboard', private: true },
  { name: 'Settings', href: '/settings', private: true },
];

const notifications = [
  { course: 'CSCE 181', crn: '47550', message: 'Seats increased', hoursAgo: 1, origSeats: 2, newSeats: 3 },
  { course: 'ECEN 350', crn: '21665', message: 'Seats opened up', hoursAgo: 2, origSeats: 0, newSeats: 1 },
  { course: 'MATH 304', crn: '52795', message: 'Seats decreased', hoursAgo: 3, origSeats: 3, newSeats: 4 },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const currentPage = useLocation().pathname;
  const [isUser, setIsUser] = useState(null);

  useEffect(() => {
    getAuth().onAuthStateChanged(user => {
      setIsUser(user);
    });
  }, []);

  const signOut = () => {
    getAuth().signOut();
  };

  return (
    <Disclosure as="nav" className="bg-transparent shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 w-full overflow-hidden">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to={isUser ? "/dashboard" : "/"}>
                    <Logo className="transition-all ease-in-out duration-100 h-8 w-auto object-contain cursor-pointer hover:opacity-80" />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation
                      .filter((item) => (!item.private || isUser) && !(item.hideWhenLoggedIn && isUser))
                      .map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            currentPage === item.href ? 'text-[#8d0509]' : 'text-black',
                            'rounded-md px-3 py-2 text-sm font-semibold transition-transform ease-in-out duration-100 hover:-translate-y-0.5'
                          )}
                          aria-current={currentPage === item.href ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {isUser && (
                  <Menu as="div" className="relative">
                    <Menu.Button className="inline-flex text-gray-400 hover:text-gray-600 justify-center px-4 py-2 text-sm font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
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
                      <Menu.Items className="z-30 absolute right-0 w-80 mt-2 origin-top-right bg-white divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                          <Menu.Item className="bg-[#A8292F]">
                            <div className="p-2">
                              <p className="font-bold text-white">Notifications</p>
                            </div>
                          </Menu.Item>
                          {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                              <Menu.Item key={index}>
                                <div className="p-2">
                                  <div className="flex justify-between">
                                    <p className="text">
                                      <span className="font-bold">{notification.course}</span>
                                      <span className="text-xs text-gray-400 font-bold"> {notification.crn}</span>
                                    </p>
                                    <p className="text">
                                      <span className="text-xs font-bold"> {notification.message}</span>
                                    </p>
                                  </div>
                                  <div className="flex justify-between">
                                    <p className="text-xs">
                                      <span className="text-gray-500">{notification.hoursAgo} hour{notification.hoursAgo === 1 ? "" : "s"} ago</span>
                                    </p>
                                    <p className="text-xs flex items-center">
                                      {notification.origSeats} <span><ArrowLongRightIcon className="mx-1 w-4" /></span> {notification.newSeats}
                                    </p>
                                  </div>
                                </div>
                              </Menu.Item>
                            ))
                          ) : (
                            <Menu.Item>
                              <div className="p-2">
                                <p className="text">No new notifications</p>
                              </div>
                            </Menu.Item>
                          )}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src={anonymous} alt="" />
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
                      {!isUser && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/signin"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Sign In
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                      {isUser && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                      {isUser && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/"
                              onClick={() => signOut()}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 font-semibold text-sm text-gray-700')}
                            >
                              Sign Out
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.filter((item) => (!item.private || isUser)).map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    currentPage === item.href ? 'text-black opacity-40' : 'text-black',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={currentPage === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
