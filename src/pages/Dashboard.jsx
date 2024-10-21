import {
  Table,
  TableBody,
  TableFooter,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/Table";
import {
  Popover,
  PopoverButton,
  PopoverPanel
} from '@headlessui/react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/Pagination"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, onValue, ref, remove, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import LoadingCircle from "../components/LoadingCircle";
import { ExclamationTriangleIcon, PencilSquareIcon, PlusIcon, XMarkIcon } from "@heroicons/react/16/solid/index.js";
import Button from "../components/Button.jsx";
import { usePopup } from "../contexts/PopupContext.jsx";
import SearchDialog from "../components/SearchDialog";

const API_URL = import.meta.env.VITE_API_URL
const CURRENT_TERM = import.meta.env.VITE_CURRENT_TERM
const MAXIMUM_SECTIONS = parseInt(import.meta.env.VITE_MAXIMUM_SECTIONS)

const Dashboard = () => {

  const navigate = useNavigate();
  const { setPopup } = usePopup()

  const [crnInput, setCrnInput] = useState("");
  const [sections, setSections] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [page, setPage] = useState(0);
  const [buttonState, setButtonState] = useState('normal')
  const [pageState, setPageState] = useState('LOADING');

  const handleCRNInput = (e) => {
    setButtonState('normal')
    if (isNaN(parseInt(e.target.value)) && e.target.value !== '') return;

    setCrnInput(e.target.value)
  }

  function chunkArray(array) {
    const newArray = []
    if (array.length === 0) return [[]]

    for (let i = 0; i < array.length; i += 8) {
      newArray.push(array.slice(i, i + 8));
    }

    return newArray
  }

  const fetchUserCRNs = (uid) => {
    return new Promise((resolve, reject) => {
      const dbRef = ref(getDatabase(), `users/${uid}/sections/${CURRENT_TERM}`);
      onValue(dbRef, snapshot => {
        const data = snapshot.val();
        if (data === null) {
          resolve([]);
          return;
        }
        resolve(data);
      }, (error) => {
        reject(error);
      })
    })
  };

  const fetchSectionData = async crns => {
    crns = Object.keys(crns)

    try {
      let responses = await Promise.all(
        crns.map(async crn => {
          const response = await fetch(`${API_URL}/classes/${CURRENT_TERM}/${crn}/`);
          return response.json();
        })
      )

      responses = responses.filter(response => response.STATUS === 200);

      responses.sort((a, b) => {
        if (a.COURSE_NAME < b.COURSE_NAME) return -1;
        if (a.COURSE_NAME > b.COURSE_NAME) return 1;
        return 0;
      });

      setSections(responses);
      setPageState("LOADED");
    } catch (e) {
      console.log(e);
      setPageState("ERROR")
    }

  }

  const addSection = () => {
    const userInput = crnInput;
    if (userInput === '') return;

    if (sections.length >= MAXIMUM_SECTIONS) {
      setPopup("You've reached the maximum number of sections!")
      return;
    }

    setButtonState('waiting')
    fetch(`${API_URL}/classes/${CURRENT_TERM}/${userInput}/`)
      .then((data) => {
        console.log(data)
        if (data.status === 400) {
          setButtonState('invalid')
          setPopup(`CRN ${userInput} does not exist!`)
          return;
        }

        const uid = getAuth().currentUser.uid;
        const dbRef = ref(getDatabase(), `users/${uid}/sections/${CURRENT_TERM}/${userInput}`);
        const sectionDbRef = ref(getDatabase(), `sections/${CURRENT_TERM}/${userInput}/users/${uid}`);
        set(dbRef, true);
        set(sectionDbRef, true);

        updateDatabase();
        setPopup(`CRN ${userInput} has been added!`)
        setCrnInput("");
        setButtonState('normal')
      })
      .catch((error) => {
        console.log(error);
        setButtonState('normal');
        setPopup('An error occurred while adding the section. Please try again.');
      })
  };

  const removeSection = (crn) => {
    const uid = getAuth().currentUser.uid
    const dbRef = ref(getDatabase(), `users/${uid}/sections/${CURRENT_TERM}/${crn}`);
    const sectionUsersRef = ref(getDatabase(), `sections/${CURRENT_TERM}/${crn}/users/${uid}`);
    setSections(sections.filter(course => course.crn !== crn))
    remove(dbRef)
      .then(() => {
        return remove(sectionUsersRef);
      })
      .then(() => {
        updateDatabase()
      });
  }


  const updateDatabase = () => {
    fetchUserCRNs(getAuth().currentUser.uid)
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
        if (CURRENT_TERM === 'INACTIVE') {
          setPageState('INACTIVE')
        } else {
          updateDatabase();
        }
      } else {
        navigate('/')
      }
    })
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center mt-10 px-2"> {/* Fullscreen container for vertical & horizontal centering */}
        <div className="flex flex-col md:flex-row justify-between w-full max-w-7xl px-4 sm:px-6 lg:px-8"> {/* Content container */}
          <div className="flex flex-row justify-start">
            <h2 className="text-3xl font-bold">Dashboard</h2> {/* Absolutely positioned to center */}
          </div>

          {pageState !== 'INACTIVE' &&
            <div className="flex flex-row sm:justify-start md:justify-end"> {/* Container for right-aligned items */}

              <Popover as="div" className="inline-block">
                <PopoverButton hidden={pageState === 'LOADING'} className="justify-center hover:underline flex items-center w-full py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <PlusIcon className="w-4 mr-1" />
                  <p className="text-sm font-medium text-aggiered">Add Section</p>
                </PopoverButton>

                <PopoverPanel className={"ml-6 md:ml-0 absolute z-40 origin-top-left bg-white border duration-100 shadow-lg p-2 data-[closed]:scale-95 data-[closed]:opacity-0 transition"}
                  transition
                  anchor={"bottom start"}>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    addSection()
                  }} className={"p-2"}>
                    <label className="block text-sm font-medium text-center text-gray-700">Enter your desired
                      CRN</label>
                    <input value={crnInput} onChange={(e) => handleCRNInput(e)}
                      disabled={buttonState === 'waiting'}
                      onClick={(e) => e.stopPropagation()} name="crn" id="crn"
                      placeholder="CRN" autoComplete="off" maxLength={5} inputMode={"numeric"}
                      className={`mt-2 block w-full h-8 rounded-md border ${buttonState === 'invalid' && "bg-red-50"} shadow-sm sm:text-sm px-2`} />
                    <div className="flex justify-center w-full">
                      <Button type="submit"
                        disabled={buttonState === 'waiting'}
                        className="transition-opacity mt-3 w-44 inline-flex text-sm justify-center disabled:opacity-75 disabled:cursor-default">
                        {buttonState === 'waiting'
                          ? <LoadingCircle className={"text-white"}></LoadingCircle>
                          : "Track this section"}
                      </Button>
                    </div>
                  </form>
                </PopoverPanel>
              </Popover>

              <SearchDialog />

              <button hidden={pageState === 'LOADING'} onClick={() => setIsEditMode(!isEditMode)}
                className="z-10 py-2 focus:outline-none flex hover:underline items-center focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <PencilSquareIcon className="w-4 mr-1" />
                <p className="text-sm font-medium text-aggiered">Edit</p>
              </button>
            </div>}
        </div>
      </div>

      {pageState === 'LOADED' &&
        <div className="mt-5 mb-10 px-2 sm:px-6 lg:px-8 flex justify-center">
          <div className="flex justify-center w-full max-w-7xl px-4 origin-top-left">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[10%]">CRN</TableHead>
                  <TableHead className="w-[15%]">Term</TableHead>
                  <TableHead className="w-[15%]">Course</TableHead>
                  <TableHead className="w-[35%]">Title</TableHead>
                  <TableHead className="w-[25%]">Professor</TableHead>
                  <TableHead className="w-[10%] text-right">Seats</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  chunkArray(sections)[sections.length === 0 ? 0 : Math.min(page, Math.floor((sections.length - 1) / 8))].map((section) => (
                    <TableRow key={section.CRN} className={"transition-colors duration-100 hover:bg-muted/50"}>
                      <TableCell className="font-medium relative">
                        {section.CRN}
                        {isEditMode && <button onClick={() => removeSection(section.CRN)}>
                          <XMarkIcon className={"w-6 transition-all absolute top-1/2 -translate-y-1/2 text-red-600 hover:scale-95 active:scale-90 hover:text-red-700"}></XMarkIcon>
                        </button>}
                      </TableCell>
                      <TableCell>{section.TERM_CODE}</TableCell>
                      <TableCell>{section.COURSE_NAME}</TableCell>
                      <TableCell>{section.COURSE_TITLE}</TableCell>
                      <TableCell>{section.INSTRUCTOR}</TableCell>
                      <TableCell className={`text-right flex justify-end items-center`}>{section.SEATS.REMAINING}</TableCell>
                    </TableRow>
                  ))
                }
                {
                  sections.length === 0 &&
                  <TableRow>
                    <TableCell colSpan="6" className="text-center">Press "Add New Section" to add a
                      section!</TableCell>
                  </TableRow>
                }
              </TableBody>
              {sections.length > 8 && (<TableFooter>
                <TableRow>
                  <TableCell colSpan="6" className="py-c2">
                    <Pagination className="justify-end">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" onClick={() => setPage(Math.min(0, Math.floor(sections.length / 8)))} />
                        </PaginationItem>
                        {[...Array(Math.ceil(sections.length / 8)).keys()].map(num => (
                          <PaginationItem className={"cursor-pointer"} key={num} onClick={() => setPage(num)}>
                            <PaginationLink isActive={num === page}>{num + 1}</PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext href="#" onClick={() => { setPage(Math.min(Math.floor(sections.length / 8), page + 1)) }} />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </TableCell>
                </TableRow>
              </TableFooter>)}
            </Table>
          </div>
        </div>}


      {pageState === 'LOADING' &&
        <div className="flex flex-row justify-center mt-8">
          <LoadingCircle></LoadingCircle>
        </div>}

      {pageState === 'ERROR' &&
        <div className="flex flex-col items-center justify-center mt-8">
          <ExclamationTriangleIcon className={"w-12 mr-2"}></ExclamationTriangleIcon>
          An error occurred while loading your courses.
        </div>}

      {pageState === 'INACTIVE' &&
        <div className="flex flex-col items-center justify-center mt-8">
          <ExclamationTriangleIcon className={"w-12 mr-2"}></ExclamationTriangleIcon>
          Course registration is not open yet.
        </div>}

    </div>
  );
}

export default Dashboard;
