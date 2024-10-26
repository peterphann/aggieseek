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
import { useMediaQuery } from "@react-hook/media-query"

const API_URL = import.meta.env.VITE_API_URL
const CURRENT_TERM = import.meta.env.VITE_CURRENT_TERM
const MAXIMUM_SECTIONS = import.meta.env.VITE_MAXIMUM_SECTIONS

const SearchDialog = ({ sections, updateDatabase }) => {

  const matches = useMediaQuery('(min-width: 700px)')

  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sectionsList, setSectionsList] = useState([])

  const [subjectOpen, setSubjectOpen] = useState(false)
  const [courseOpen, setCourseOpen] = useState(false)

  const [subjectState, setSubjectState] = useState('IDLE')
  const [courseState, setCourseState] = useState('IDLE')
  const [sectionState, setSectionState] = useState('IDLE')

  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("")

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

    if (crns.length != selectedRows.length) {
      toast({
        title: 'Error',
        description: 'You selected a section you are already tracking!'
      });
      return;
    }

    if (sections.length + crns.length > MAXIMUM_SECTIONS) {
      toast({
        title: 'Error',
        description: 'You cannot exceed more than 8 sections!'
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

  const fetchSubjects = async () => {
    setSubjectState('LOADING')
    try {
      const departments = await fetchFromDatabase(`subjects/${CURRENT_TERM}`);
      setSubjectState(departments == [] ? 'ERROR' : 'IDLE')
      setSubjects(departments.DEPARTMENTS)
    } catch (error) {
      console.error(error)
      setSubjects([])
      setSubjectState('ERROR')
    }
  }

  const fetchCourses = async subject => {
    setCourseState('LOADING')
    try {
      const courses = await fetchFromDatabase(`subjects/${CURRENT_TERM}/${subject}`);
      setCourseState(courses == [] ? 'ERROR' : 'IDLE')
      setCourses(courses.COURSES)
    } catch (error) {
      console.error(error)
      setCourses([])
      setCourseState('ERROR')
    }
  }

  const fetchSections = async (subject, course) => {
    setSectionState('LOADING')
    const code = course.substring(0, 3)
    try {
      const sections = await fetchFromDatabase(`subjects/${CURRENT_TERM}/${subject}/${code}`);
      setSectionState(sections == [] ? 'ERROR' : 'IDLE')
      setSectionsList(sections.SECTIONS)
      console.log(sections)
    } catch (error) {
      console.error(error)
      setSectionsList([])
      setSectionState('ERROR')
    }
  }

  useEffect(() => {
    fetchSubjects()
  }, [])

  useEffect(() => {
    setCourses([])
    setSectionsList([])
    setSelectedCourse("")
    if (selectedSubject != "") {
      fetchCourses(selectedSubject)
    }
  }, [selectedSubject])

  useEffect(() => {
    table.resetRowSelection();
    setSectionsList([])
  }, [selectedCourse])

  const table = useReactTable({
    data: sectionsList,
    columns: matches ? fullColumns : mobileColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <DialogHeader>
        <DialogTitle className='text-2xl'>Search Sections</DialogTitle>
        <DialogDescription>
          Select a course from the dropdown to track it.
        </DialogDescription>
      </DialogHeader>

      <div className="flex justify-between mt-6">
        <div className="flex-col flex w-full">
          <Label className={"mb-3"}>Subject</Label>
          <Popover open={subjectOpen} onOpenChange={setSubjectOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={subjectOpen}
                className="w-2/3 md:w-1/3 justify-between">
                {selectedSubject
                  ? <span className="truncate">{subjects.find((subject) => subject.SUBJECT === selectedSubject)?.DESCRIPTION}</span>
                  : "Select subject..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" style={{ width: 'var(--radix-popover-trigger-width)' }} align="start" className="w-full h-60 p-0" >
              <Command>
                <CommandInput placeholder="Search subject..." />
                <CommandList>
                  <CommandEmpty>{
                    subjectState === "IDLE"
                      ? "No subjects found."
                      : subjectState === "LOADING"
                        ? <LoadingCircle />
                        : "An error has occurred."
                  }</CommandEmpty>
                  <CommandGroup>
                    {subjects.map((subject) => (
                      <CommandItem
                        key={subject.SUBJECT}
                        value={subject.SUBJECT}
                        onSelect={(currentValue) => {
                          setSelectedSubject(currentValue === selectedSubject ? "" : currentValue)
                          setSubjectOpen(false)
                        }}
                        className={"cursor-pointer"}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedSubject === subject.SUBJECT ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {subject.DESCRIPTION}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Label className={"mt-5 mb-3"}>Course</Label>
          <div className="flex">
            <Popover open={courseOpen} onOpenChange={setCourseOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  disabled={!courses || courses.length === 0}
                  role="combobox"
                  aria-expanded={courseOpen}
                  className={`w-2/3 md:w-1/3 ${courseState === 'LOADING' ? 'justify-center' : 'justify-between'}`}>
                  {selectedCourse
                    ? <span className="truncate">{courses.find((course) => course.DISPLAY === selectedCourse)?.DISPLAY}</span>
                    : courseState === 'LOADING'
                      ? <LoadingCircle />
                      : "Select course..."}
                  {courseState !== 'LOADING' &&
                    <ChevronsUpDown className="ml-2 relative h-4 w-4 shrink-0 opacity-50" />}
                </Button>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="start" style={{ width: 'var(--radix-popover-trigger-width)' }} className="p-0" >
                <Command>
                  <CommandInput placeholder="Search course..." />
                  <CommandList>
                    <CommandEmpty>{
                      courseState === "IDLE"
                        ? "No courses found."
                        : courseState === "LOADING"
                          ? <LoadingCircle />
                          : "An error has occurred."
                    }</CommandEmpty>
                    <CommandGroup>
                      {courses.map((course) => (
                        <CommandItem
                          key={course.COURSE}
                          value={course.DISPLAY}
                          onSelect={(currentValue) => {
                            setSelectedCourse(currentValue === selectedCourse ? "" : currentValue)
                            setCourseOpen(false)
                          }}
                          className={"cursor-pointer"}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCourse === course.DISPLAY ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {course.DISPLAY}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {selectedCourse != "" &&
              <button
                onClick={() => fetchSections(selectedSubject, selectedCourse)}
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

export default SearchDialog