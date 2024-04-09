import {Table,
  TableBody,
  TableCaption,
  TableFooter,
  TableCell,
  TableHead,
  TableHeader,
  TableRow, } from "../components/Table";
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

const sections = [
  {
    crn: 47550,
    section: 599,
    term: "Fall 2024",
    course: "CSCE 181",
    title: "Introduction to Computing",
    professor: "Tyagi, Aakash",
    seats: 371
  },
  {
    crn: 10937,
    section: 501,
    term: "Fall 2024",
    course: "CSCE 312",
    title: "Computer Organization",
    professor: " Mahapatra, Rabinarayan",
    seats: 22
  },
  {
    crn: 49444,
    section: 507,
    term: "Fall 2024",
    course: "MATH 304",
    title: "Linear Algebra",
    professor: "Not Assigned",
    seats: 33
  },
  {
    crn: 52795,
    section: 514,
    term: "Fall 2024",
    course: "MATH 304",
    title: "Linear Algebra",
    professor: "Not Assigned",
    seats: 0
  },
  {
    crn: 57605,
    section: 500,
    term: "Fall 2024",
    course: "DAEN 331",
    title: "Optimization of Analytics",
    professor: "Not Assigned",
    seats: 35
  },
  {
    crn: 58223,
    section: 500,
    term: "Fall 2024",
    course: "FILM 475",
    title: "Film, Propaganda, and Dissidence",
    professor: "Cooke, Leighton",
    seats: 20
  }
]

const Dashboard = () => {
  return (
    <div>
    <div class="flex justify-center items-center mt-[3%]"> {/* Fullscreen container for vertical & horizontal centering */}
      <div class="flex items-center justify-center w-full max-w-4xl px-4 relative"> {/* Content container */}
        <h2 class="text-3xl font-bold absolute w-full text-center">Sections I'm Watching</h2> {/* Absolutely positioned to center */}
          <div class="flex justify-end w-full"> {/* Container for right-aligned items */}
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-[#8d0509] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Add New Section
              </Menu.Button>
              <Menu.Items className="z-10 absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <form  className={` p-2`}>
                      <label className="block text-sm font-medium text-center text-gray-700">Enter your desired CRN</label>
                      <input onClick={(e) => e.stopPropagation()} type="text" name="crn" id="crn" placeholder = "CRN" autoComplete="off" className="mt-2 block w-full h-8 rounded-md border-1 shadow-sm sm:text-sm px-2" />
                      <div className="flex justify-center w-full">
                      <button type="submit" className="mt-3 inline-flex justify-center border border-transparent bg-[#8d0509] py-2 px-3 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2">
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
    <div class = "mt-[2%] mb-[2%] px-[5%] flex">
      <div class="flex justify-center w-full">
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
        {sections.map((section) => (
          <TableRow>
            <TableCell className="font-medium">{section.crn}</TableCell>
            <TableCell>{section.term}</TableCell>
            <TableCell>{section.course}</TableCell>
            <TableCell>{section.title}</TableCell>
            <TableCell>{section.professor}</TableCell>
            <TableCell className={`text-right ${(section.seats < 1 ? 'text-red-500' : '')}`}>{section.seats}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan="6" className = "py-2">
            <Pagination className = "justify-end">
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
    </div>
    </div>
  );  ``
}

export default Dashboard;
