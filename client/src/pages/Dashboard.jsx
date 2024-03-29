import {  Table,
  TableBody,
  TableCaption,
  TableFooter,
  TableCell,
  TableHead,
  TableHeader,
  TableRow, } from "@/components/table";
const Dashboard = () => {
  return (
    <div>
    <div class="flex justify-center items-center mt-[3%]"> {/* Fullscreen container for vertical & horizontal centering */}
      <div class="flex items-center justify-center w-full max-w-4xl px-4 relative"> {/* Content container */}
        <h2 class="text-3xl font-bold absolute w-full text-center">Sections I'm Watching</h2> {/* Absolutely positioned to center */}
        <div class="flex justify-end w-full"> {/* Container for right-aligned items */}
          <h2 class="text-sm font-medium text-[#8d0509]">Add New Section</h2>
          <h2 class="text-sm font-medium ml-4 text-[#8d0509]">Edit</h2>
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