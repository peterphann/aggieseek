import {
  Table,
  TableBody,
  TableCaption,
  TableFooter,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/Table";
import {Menu, Transition} from '@headlessui/react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/Pagination"
import {Fragment, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, onValue, ref, remove, set, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import LoadingCircle from "../components/LoadingCircle";
import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/16/solid/index.js";

const Dashboard = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [crnInput, setCrnInput] = useState("");
  const [sections, setSections] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchCrnFromDatabase = (uid) => {
    return new Promise((resolve, reject) => {
      const dbRef = ref(getDatabase(), 'users/' + uid + '/sections');
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data === null) {
          resolve([]);
          return;
        }
        const crnArray = Object.keys(data).map(key => parseInt(key));
        resolve(crnArray);
      }, (error) => {
        reject(error);
      })
    })
  };

  const fetchSectionData = async (crns) => {
    try {
        let responses = await Promise.all(
        crns.map(async (crn) => {
          const response = await fetch(`https://api.aggieseek.net/sections/202431/${crn}/`);
          return response.json();
        })
      );

      responses = responses.filter((response) => response.status === 200);

      responses.sort((a, b) => {
        if (a.course < b.course) return -1;
        if (a.course > b.course) return 1;
        return 0;
      });

      setSections(responses);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
    }
  };

  const addSection = () => {
    const userInput = crnInput;
    setCrnInput("");
    fetch(`https://api.aggieseek.net/sections/202431/${userInput}/`)
      .then((data) => {
        if (data.status === 400) return;

        const uid = getAuth().currentUser.uid;
        const dbRef = ref(getDatabase(), 'users/' + uid + '/sections/' + userInput);
        const sectionValueRef = ref(getDatabase(), 'sections/' + userInput + '/value/');
        const sectionDbRef = ref(getDatabase(), 'sections/' + userInput + '/users/' + uid + '/');
        set(dbRef, true);
        set(sectionDbRef, true);

        updateDatabase();
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const removeSection = (crn) => {
    const uid = getAuth().currentUser.uid
    const dbRef = ref(getDatabase(), 'users/' + uid + '/sections/' + crn);
    const sectionUsersRef = ref(getDatabase(), 'sections/' + crn + '/users/' + uid + '/');
    remove(dbRef);
    remove(sectionUsersRef);
    updateDatabase();
  }

  const updateDatabase = () => {
    fetchCrnFromDatabase(getAuth().currentUser.uid)
      .then((data) => {
        fetchSectionData(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        updateDatabase();
      } else {
        navigate('/')
      }
    })
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center mt-10"> {/* Fullscreen container for vertical & horizontal centering */}
        <div className="flex items-center justify-center w-full max-w-4xl px-4 my-4 "> {/* Content container */}
          <h2 className="text-3xl font-bold absolute w-full text-center pointer-events-none">Dashboard</h2> {/* Absolutely positioned to center */}

          <div className="flex flex-row justify-end w-full absolute right-[20%]"> {/* Container for right-aligned items */}
            <Menu as="div" className="inline-block">

              <Menu.Button hidden={isLoading} className="justify-center w-full px-4 py-2 text-sm font-medium text-[#8d0509] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Add New Section
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
                <Menu.Items
                  className="z-10 absolute w-56 mt-2 origin-top-left bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({active}) => (
                        <form onSubmit={(e) => {e.preventDefault(); addSection()}} className={`p-2`}>
                          <label className="block text-sm font-medium text-center text-gray-700">Enter your desired
                            CRN</label>
                          <input value={crnInput} onChange={(e) => setCrnInput(e.target.value)}
                                 onClick={(e) => e.stopPropagation()} type="number" name="crn" id="crn"
                                 placeholder="CRN" autoComplete="off"
                                 className="mt-2 block w-full h-8 rounded-md border-1 shadow-sm sm:text-sm px-2"/>
                          <div className="flex justify-center w-full">
                            <button type="submit"
                                    className="mt-3 inline-flex justify-center border border-transparent bg-[#8d0509] py-2 px-3 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2">
                              Track this section
                            </button>
                          </div>
                        </form>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>

              </Transition>

            </Menu>

            <button hidden={isLoading} onClick={() => setIsEditMode(!isEditMode)}
                    className="px-4 z-10 py-2 text-sm font-medium text-[#8d0509] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              Edit
            </button>
          </div>

        </div>
      </div>

      {!isLoading &&
          <div className="mt-[2%] mb-[2%] px-[5%] flex">
            <div className="flex justify-center w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">CRN</TableHead>
                    <TableHead className={"w-40"}>Term</TableHead>
                    <TableHead className={"w-40"}>Course</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Professor</TableHead>
                    <TableHead className="text-right">Amount of Seats</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    sections.map((section) => (
                        <TableRow key={section.crn}>
                          <TableCell className="font-medium">{section.crn}</TableCell>
                          <TableCell>{section.term}</TableCell>
                          <TableCell>{section.course}</TableCell>
                          <TableCell>{section.title}</TableCell>
                          <TableCell>{section.professor}</TableCell>
                          <TableCell className={`text-right`}>
                            {section.seats.remaining}
                            {isEditMode &&
                                <button className="absolute left-3 pt-0.5" onClick={() => removeSection(section.crn)}>
                                  <XMarkIcon className={"w-4 text-red-600 hover:text-red-700"}></XMarkIcon>
                                </button>}
                          </TableCell>
                        </TableRow>
                    ))
                  }
                  {
                      sections.length == 0 &&
                      <TableRow>
                        <TableCell colSpan="6" className="text-center">Press "Add New Section" to add a
                          section!</TableCell>
                      </TableRow>
                  }
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan="6" className="py-c2">
                      <Pagination className="justify-end">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious href="#"/>
                          </PaginationItem>
                          <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">
                          2
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>}


      {isLoading && !isError &&
      <div className="flex flex-row justify-center mt-8">
        <LoadingCircle></LoadingCircle>
      </div>}

      {isError &&
      <div className="flex flex-col items-center justify-center mt-8">
          <ExclamationTriangleIcon className={"w-12 mr-2"}></ExclamationTriangleIcon>
        An error occurred while loading your courses.
      </div>}

    </div>
  );
}

export default Dashboard;
