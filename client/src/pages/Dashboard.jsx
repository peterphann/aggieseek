import {Table,
  TableBody,
  TableCaption,
  TableFooter,
  TableCell,
  TableHead,
  TableHeader,
  TableRow, } from "@/components/table";
import { Menu } from '@headlessui/react';
const Dashboard = () => {
  return (
    <div>
    <div class="flex justify-center items-center mt-[3%]"> {/* Fullscreen container for vertical & horizontal centering */}
      <div class="flex items-center justify-center w-full max-w-4xl px-4 relative"> {/* Content container */}
        <h2 class="text-3xl font-bold absolute w-full text-center">Sections I'm Watching</h2> {/* Absolutely positioned to center */}
          <div class="flex justify-end w-full"> {/* Container for right-aligned items */}
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-[#8d0509] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Add New Section
              </Menu.Button>
              <Menu.Items className="z-10 absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <form  className={` p-2`}>
                      <label className="block text-sm font-medium text-center text-gray-700">Enter your desired CRN</label>
                      <input onClick={(e) => e.stopPropagation()} type="text" name="crn" id="crn" autoComplete="off" className="mt-1 block w-full h-8 rounded-md border-b2 shadow-sm sm:text-sm " />
                      <div className="flex justify-center w-full">
                      <button type="submit" className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-[#8d0509] py-2 px-3 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2">
                        Track this section
                      </button>
                      </div>
                      </form>
                  )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          <button>
          <h2 class="text-sm font-medium ml-4 text-[#8d0509]">Edit</h2>
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
          <TableHead>Course Title</TableHead>
          <TableHead>Professor</TableHead>
          <TableHead className="text-right">Amount of Seats</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      <TableRow>
        <TableCell className="font-medium">37730</TableCell>
        <TableCell>Fall 2024</TableCell>
        <TableCell>Data Structures and Algorithms</TableCell>
        <TableCell>UrMom</TableCell>
        <TableCell className="text-right">-10</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">31333</TableCell>
        <TableCell>Fall 2024</TableCell>
        <TableCell>Girl Math</TableCell>
        <TableCell>Joe Mama</TableCell>
        <TableCell className="text-right">0</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">31333</TableCell>
        <TableCell>Fall 2024</TableCell>
        <TableCell>Girl Math</TableCell>
        <TableCell>Joe Mama</TableCell>
        <TableCell className="text-right">0</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">31333</TableCell>
        <TableCell>Fall 2024</TableCell>
        <TableCell>Girl Math</TableCell>
        <TableCell>Joe Mama</TableCell>
        <TableCell className="text-right">0</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">31333</TableCell>
        <TableCell>Fall 2024</TableCell>
        <TableCell>Girl Math</TableCell>
        <TableCell>Joe Mama</TableCell>
        <TableCell className="text-right">0</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">31333</TableCell>
        <TableCell>Fall 2024</TableCell>
        <TableCell>Girl Math</TableCell>
        <TableCell>Joe Mama</TableCell>
        <TableCell className="text-right">0</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">31333</TableCell>
        <TableCell>Fall 2024</TableCell>
        <TableCell>Girl Math</TableCell>
        <TableCell>Joe Mama</TableCell>
        <TableCell className="text-right">0</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">31333</TableCell>
        <TableCell>Fall 2024</TableCell>
        <TableCell>Girl Math</TableCell>
        <TableCell>Joe Mama</TableCell>
        <TableCell className="text-right">0</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">31333</TableCell>
        <TableCell>Fall 2024</TableCell>
        <TableCell>Girl Math</TableCell>
        <TableCell>Joe Mama</TableCell>
        <TableCell className="text-right">0</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">31333</TableCell>
        <TableCell>Fall 2024</TableCell>
        <TableCell>Girl Math</TableCell>
        <TableCell>Joe Mama</TableCell>
        <TableCell className="text-right">0</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">31333</TableCell>
        <TableCell>Fall 2024</TableCell>
        <TableCell>Girl Math</TableCell>
        <TableCell>Joe Mama</TableCell>
        <TableCell className="text-right">0</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">31333</TableCell>
        <TableCell>Fall 2024</TableCell>
        <TableCell>Girl Math</TableCell>
        <TableCell>Joe Mama</TableCell>
        <TableCell className="text-right">0</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">31333</TableCell>
        <TableCell>Fall 2024</TableCell>
        <TableCell>Girl Math</TableCell>
        <TableCell>Joe Mama</TableCell>
        <TableCell className="text-right">0</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">31333</TableCell>
        <TableCell>Fall 2024</TableCell>
        <TableCell>Girl Math</TableCell>
        <TableCell>Joe Mama</TableCell>
        <TableCell className="text-right">0</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">31333</TableCell>
        <TableCell>Fall 2024</TableCell>
        <TableCell>Girl Math</TableCell>
        <TableCell>Joe Mama</TableCell>
        <TableCell className="text-right">0</TableCell>
      </TableRow>
      </TableBody>
    </Table>
    </div>
    </div>
    </div>
  );  ``
}

export default Dashboard;