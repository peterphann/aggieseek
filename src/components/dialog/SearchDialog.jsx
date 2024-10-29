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
import { fullColumns } from "@/table/columns"
import { useMediaQuery } from "@react-hook/media-query"
import { useSelector } from "react-redux"

const API_URL = import.meta.env.VITE_API_URL
const CURRENT_TERM = import.meta.env.VITE_CURRENT_TERM

const SearchDialog = () => {

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

  const sections = useSelector(state => state.sections)

  const fetchFromDatabase = async url => {
    try {
      const data = await fetch(`${API_URL}/terms/${CURRENT_TERM}/${url}`)
      return await data.json()
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const fetchSubjects = async () => {
    setSubjectState('LOADING')
    try {
      const subjects = await fetchFromDatabase(`subjects`);
      setSubjectState(subjects == [] ? 'ERROR' : 'IDLE')
      setSubjects(subjects.SUBJECTS)
    } catch (error) {
      console.error(error)
      setSubjects([])
      setSubjectState('ERROR')
    }
  }

  const fetchCourses = async subject => {
    setCourseState('LOADING')
    try {
      const courses = await fetchFromDatabase(`subjects/${subject}`);
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
      const sections = await fetchFromDatabase(`subjects/${subject}/${code}`);
      setSectionState(sections == [] ? 'ERROR' : 'IDLE')
      setSectionsList(sections.SECTIONS)
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
    columns: fullColumns,
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
        <div className="flex-col flex w-full space-y-4 md:space-y-0 md:space-x-3 md:flex-row">
          <div className="flex flex-col">
            <Label className={"mb-3"}>Subject</Label>
            <Popover open={subjectOpen} onOpenChange={setSubjectOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={subjectOpen}
                  className="w-64 justify-between">
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
          </div>

          <div className="flex flex-col">
            <Label className={"mb-3"}>Course</Label>
            <div className="flex">
              <Popover open={courseOpen} onOpenChange={setCourseOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={!courses || courses.length === 0}
                    role="combobox"
                    aria-expanded={courseOpen}
                    className={`w-64 ${courseState === 'LOADING' ? 'justify-center' : 'justify-between'}`}>
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
      </div>

      <div className="w-full sm:h-80 h-72 mt-8">
        <div className="flex justify-between mb-2 items-end">
          <Label>Sections</Label>
        </div>
        <div className="h-full">
          <DataTable sections={sections} table={table} columns={fullColumns} data={sectionsList} fetchState={sectionState} />
        </div>
      </div>
    </>
  )

}

export default SearchDialog