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
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, onValue, ref, remove, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import LoadingCircle from "../components/LoadingCircle";
import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/16/solid/index.js";
import Button from "../components/Button.jsx";
import {usePopup} from "../contexts/PopupContext.jsx";

const Dashboard = () => {

  const navigate = useNavigate();
  const { setPopup } = usePopup()

  const [isLoading, setIsLoading] = useState(true);
  const [crnInput, setCrnInput] = useState("");
  const [sections, setSections] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(0);
  const [buttonState, setButtonState] = useState('normal')

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
    if (userInput === '') return;
    setButtonState('waiting')

    fetch(`https://api.aggieseek.net/sections/202431/${userInput}/`)
      .then((data) => {
        console.log(data)
        if (data.status === 400) {
          setButtonState('invalid')
          setPopup(`CRN ${userInput} does not exist!`)
          return;
        }

        const uid = getAuth().currentUser.uid;
        const dbRef = ref(getDatabase(), 'users/' + uid + '/sections/' + userInput);
        const sectionDbRef = ref(getDatabase(), 'sections/' + userInput + '/users/' + uid + '/');
        set(dbRef, true);
        set(sectionDbRef, true);

        updateDatabase();
        setPopup(`CRN ${userInput} has been added!`)
        setCrnInput("");
        setButtonState('normal')
      })
      .catch((error) => {
        console.log(error);
      })
  };


  const removeSection = (crn) => {
    const uid = getAuth().currentUser.uid
    const dbRef = ref(getDatabase(), 'users/' + uid + '/sections/' + crn);
    const sectionUsersRef = ref(getDatabase(), 'sections/' + crn + '/users/' + uid + '/');
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
      <div className="flex justify-center items-center mt-10 px-2"> {/* Fullscreen container for vertical & horizontal centering */}
        <div className="flex flex-col md:flex-row justify-between w-full max-w-7xl px-4 sm:px-6 lg:px-8"> {/* Content container */}
          <div className="flex flex-row justify-start">
            <h2 className="text-3xl font-bold">Dashboard</h2> {/* Absolutely positioned to center */}
          </div>

          <div className="flex flex-row sm:justify-start md:justify-end"> {/* Container for right-aligned items */}
            <Popover as="div" className="inline-block">
              <PopoverButton hidden={isLoading} className="justify-center w-full px-0 md:px-4 py-2 text-sm font-medium text-[#8d0509] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Add New Section
              </PopoverButton>

              <PopoverPanel className={"ml-6 md:ml-0 absolute z-40 origin-top-right bg-white border duration-100 shadow-lg p-2 data-[closed]:scale-95 data-[closed]:opacity-0 transition"}
                            transition
                            anchor={"bottom end"}>
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
                         className={`mt-2 block w-full h-8 rounded-md border ${buttonState === 'invalid' && "bg-red-50"} shadow-sm sm:text-sm px-2`}/>
                  <div className="flex justify-center w-full">
                    <Button type="submit"
                            disabled={buttonState === 'waiting'}
                            className="mt-3 w-44 inline-flex text-sm justify-center disabled:bg-[#8d0509] disabled:cursor-default">
                      {buttonState === 'waiting'
                      ? <LoadingCircle className={"text-white"}></LoadingCircle>
                      : "Track this section"}
                    </Button>
                  </div>
                </form>
              </PopoverPanel>
            </Popover>

            <button hidden={isLoading} onClick={() => setIsEditMode(!isEditMode)}
                    className="pl-4 z-10 py-2 text-sm font-medium text-[#8d0509] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              Edit
            </button>
          </div>
        </div>
      </div>

      {!isLoading &&
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
                        <TableRow key={section.crn} className={"transition-colors duration-100 hover:bg-muted/50"}>
                          <TableCell className="font-medium relative">
                            {section.crn}
                            {isEditMode && <button onClick={() => removeSection(section.crn)}>
                              <XMarkIcon className={"w-6 transition-all absolute top-1/2 -translate-y-1/2 text-red-600 hover:scale-95 active:scale-90 hover:text-red-700"}></XMarkIcon>
                            </button>}
                          </TableCell>
                          <TableCell>{section.term}</TableCell>
                          <TableCell>{section.course}</TableCell>
                          <TableCell>{section.title}</TableCell>
                          <TableCell>{section.professor}</TableCell>
                          <TableCell className={`text-right flex justify-end items-center`}>{section.seats.remaining}</TableCell>
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
                            <PaginationPrevious href="#" onClick={() => setPage(Math.min(0, Math.floor(sections.length / 8)))}/>
                          </PaginationItem>
                          {[...Array(Math.ceil(sections.length / 8)).keys()].map(num => (
                              <PaginationItem className={"cursor-pointer"} key={num} onClick={() => setPage(num )}>
                                <PaginationLink isActive={num === page}>{num + 1}</PaginationLink>
                              </PaginationItem>
                          ))}
                        <PaginationItem>
                          <PaginationNext href="#" onClick={() => {setPage(Math.min(Math.floor(sections.length / 8), page + 1))}} />
                        </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </TableCell>
              </TableRow>
            </TableFooter>)}
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
