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
import { Menu } from '@headlessui/react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/Pagination"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import LoadingCircle from "../components/LoadingCircle";

const Dashboard = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [crnInput, setCrnInput] = useState("");
  const [crns, setCrns] = useState([47550, 10937, 49444, 57605, 58223, 52796, 57519]);
  const [sections, setSections] = useState([]);

  const dashboardTest = () => {
    const db = getDatabase();
  };

  const addSection = () => {
    const crnAdd = parseInt(crnInput);
    console.log(crns.includes(crnAdd));
    if (!crns.includes(crnAdd)) {
      setCrns(old => [...old, crnAdd]);
    }
  };

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {


      } else {
        navigate('/')
      }
    })
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const responses = await Promise.all(
        crns.map(async (crn) => {
          const response = await fetch(`http://localhost:8080/sections/202431/${crn}/`);
          return response.json();
        })
      );

      setSections(responses);
      setIsLoading(false);
    };

    fetchData();
  }, [crns]);

  return (
    <div>
      <div className="flex justify-center items-center mt-[3%]"> {/* Fullscreen container for vertical & horizontal centering */}
        <div className="flex items-center justify-center w-full max-w-4xl px-4 relative"> {/* Content container */}
          <h2 className="text-3xl font-bold absolute w-full text-center">Sections I'm Watching</h2> {/* Absolutely positioned to center */}
          <div className="flex justify-end w-full"> {/* Container for right-aligned items */}
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-[#8d0509] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Add New Section
              </Menu.Button>
              <Menu.Items className="z-10 absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <form className={` p-2`}>
                        <label className="block text-sm font-medium text-center text-gray-700">Enter your desired CRN</label>
                        <input value={crnInput} onChange={(e) => setCrnInput(e.target.value)} onClick={(e) => e.stopPropagation()} type="number" name="crn" id="crn" placeholder="CRN" autoComplete="off" className="mt-2 block w-full h-8 rounded-md border-1 shadow-sm sm:text-sm px-2" />
                        <div className="flex justify-center w-full">
                          <button onClick={() => addSection()} type="submit" className="mt-3 inline-flex justify-center border border-transparent bg-[#8d0509] py-2 px-3 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2">
                            Track this section
                          </button>
                        </div>
                      </form>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
            <button className="text-[#8d0509] text-sm font-medium hover:underline">
              Edit
            </button>
          </div>
        </div>
      </div>

      {!isLoading && <div className="mt-[2%] mb-[2%] px-[5%] flex">
        <div className="flex justify-center w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">CRN</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Professor</TableHead>
                <TableHead className="text-right">Amount of Seats</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                sections.map((section) => (
                  <TableRow>
                    <TableCell className="font-medium">{section.crn}</TableCell>
                    <TableCell>{section.term}</TableCell>
                    <TableCell>{section.course}</TableCell>
                    <TableCell>{section.title}</TableCell>
                    <TableCell>{section.professor}</TableCell>
                    <TableCell className={`text-right`}>{section.seats.remaining}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan="6" className="py-2">
                  <Pagination className="justify-end">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>
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

      {isLoading &&
        <div className="flex flex-row justify-center mt-8">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>}
    </div>
  );
}

export default Dashboard;
