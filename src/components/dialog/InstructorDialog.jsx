import { DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { Label } from "../ui/label"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "../ui/command"
import { ChevronsUpDown, Check, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import LoadingCircle from "../LoadingCircle"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { DataTable } from "@/table/data-table"
import { fullColumns, mobileColumns } from "@/table/columns"
import { motion } from "framer-motion"
import { getAuth } from "firebase/auth"
import { ref, getDatabase, set } from "firebase/database"
import { toast } from "@/hooks/use-toast"

const API_URL = import.meta.env.VITE_API_URL
const CURRENT_TERM = import.meta.env.VITE_CURRENT_TERM
const MAXIMUM_SECTIONS = import.meta.env.VITE_MAXIMUM_SECTIONS

const InstructorDialog = ({ sections, updateDatabase }) => {


  const [instructors, setInstructors] = useState([]);
  const [sectionsList, setSectionsList] = useState([])

  const [instructorOpen, setInstructorOpen] = useState(false)

  const [instructorState, setInstructorState] = useState('IDLE')
  const [sectionState, setSectionState] = useState('IDLE')

  const [selectedInstructor, setSelectedInstructor] = useState("")

  const [buttonState, setButtonState] = useState("IDLE")

  const addSection = crn => {

    return fetch(`${API_URL}/classes/${CURRENT_TERM}/${crn}/`)
      .then((data) => {
        if (data.status === 400) return 'ERROR';

        const uid = getAuth().currentUser.uid;
        const dbRef = ref(getDatabase(), `users/${uid}/sections/${CURRENT_TERM}/${crn}`);
        const sectionDbRef = ref(getDatabase(), `sections/${CURRENT_TERM}/${crn}/users/${uid}`);
        set(dbRef, true);
        set(sectionDbRef, true);

        updateDatabase();

        return 'SUCCESS';
      })
      .catch((error) => {
        console.error(error);
        return 'ERROR';
      })
  };

  const addSections = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const crns = selectedRows
      .map(row => row.original.SWV_CLASS_SEARCH_CRN)
      .filter(crn => !sections.some(section => section.CRN === crn))

    if (crns.length == 0) {
      toast({
        title: 'Error',
        description: `You are already tracking ${selectedRows.length == 1 ? "this section" : "these sections"}!`
      });
      return;
    }

    Promise.all(crns.map(crn => addSection(crn)))
      .then(statuses => {
        if (statuses.every(status => status == 'ERROR')) {
          toast({
            title: 'Error',
            description: 'An unknown error occurred.'
          })
        } else {
          toast({
            title: 'Success!',
            description: 'You have successfully tracked these sections!'
          })
        }
      })
  }

  const fetchFromDatabase = async url => {
    try {
      const data = await fetch(`${API_URL}/${url}`)
      return await data.json()
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const fetchInstructors = async () => {
    setInstructorState('LOADING')
    try {
      const instructors = await fetchFromDatabase(`instructors/${CURRENT_TERM}`);
      setInstructorState(instructors == [] ? 'ERROR' : 'IDLE')
      setInstructors(instructors)
    } catch (error) {
      console.error(error)
      setInstructors([])
      setInstructorState('ERROR')
    }
  }

  const fetchSections = async instructor => {
    setSectionState('LOADING')

    try {
      const sections = await fetchFromDatabase(`instructors/${CURRENT_TERM}/${instructor}`);
      setSectionState(sections == [] ? 'ERROR' : 'IDLE')
      console.log(sections)
      setSectionsList(sections)
    } catch (error) {
      console.error(error)
      setSectionsList([])
      setSectionState('ERROR')
    }
  }

  useEffect(() => {
    fetchInstructors()
  }, [])

  useEffect(() => {
    table.resetRowSelection();
    setSectionsList([])
  }, [selectedInstructor])

  const table = useReactTable({
    data: sectionsList,
    columns: fullColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <DialogHeader>
        <DialogTitle className='text-2xl'>Search Sections</DialogTitle>
        <DialogDescription>
          Select an instructor from the dropdown to track their classes.
        </DialogDescription>
      </DialogHeader>

      <div className="flex justify-between mt-6">
        <div className="flex-col flex w-full">
          <Label className={"mb-3"}>Instructor</Label>
          
          <div className="flex">
          <Popover open={instructorOpen} onOpenChange={setInstructorOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={instructorOpen}
                className="w-2/3 md:w-1/3 justify-between">
                {selectedInstructor
                  ? <span className="truncate">{instructors.find((instructor) => instructor === selectedInstructor)}</span>
                  : "Select instructor..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" style={{ width: 'var(--radix-popover-trigger-width)' }} align="start" className="w-full h-60 p-0" >
              <Command>
                <CommandInput placeholder="Search instructor..." />
                <CommandList>
                  <CommandEmpty>{
                    instructorState === "IDLE"
                      ? "No instructors found."
                      : instructorState === "LOADING"
                        ? <LoadingCircle />
                        : "An error has occurred."
                  }</CommandEmpty>
                  <CommandGroup>
                    {instructors.map(instructor => (
                      <CommandItem
                        key={instructor}
                        value={instructor}
                        onSelect={(currentValue) => {
                          setSelectedInstructor(currentValue === selectedInstructor ? "" : currentValue)
                          setInstructorOpen(false)
                        }}
                        className={"cursor-pointer"}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedInstructor === instructor ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {instructor}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
            
            {selectedInstructor != "" &&
              <button
                onClick={() => fetchSections(selectedInstructor)}
                className="transition-colors hover:cursor-pointer w-10 h-10 flex justify-center items-center border rounded-md ml-2 hover:bg-slate-100">
                <Search className="w-5 opacity-50" />
              </button>}
          </div>
        </div>
      </div>

      <div className="w-full h-64">
        <div className="flex justify-between mb-2 h-12 items-end">
          <Label>Sections</Label>
          {Object.keys(table.getState().rowSelection).length != 0 && <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <Button className="bg-aggiered hover:bg-aggiered w-20 h-8 text-xs"
              onClick={addSections}>
              {buttonState === 'WAITING'
                ? <LoadingCircle className={"text-white"} />
                : "Track"}
            </Button>
          </motion.div>}
        </div>
        <div className="h-full">
          <DataTable sections={sections} table={table} columns={fullColumns} data={sectionsList} fetchState={sectionState} />
        </div>
      </div>
    </>
  )

}

export default InstructorDialog