import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { Label } from "./ui/label"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "./ui/command"
import { ChevronsUpDown, Check, SendHorizonal } from "lucide-react"
import { cn } from "@/lib/utils"
import LoadingCircle from "./LoadingCircle"
import { DataTable } from "@/table/data-table"
import { columns } from "@/table/columns"

const API_URL = import.meta.env.VITE_API_URL
const CURRENT_TERM = import.meta.env.VITE_CURRENT_TERM

const SearchDialog = () => {

  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([])

  const [subjectOpen, setSubjectOpen] = useState(false)
  const [courseOpen, setCourseOpen] = useState(false)

  const [subjectState, setSubjectState] = useState('IDLE')
  const [courseState, setCourseState] = useState('IDLE')
  const [sectionState, setSectionState] = useState('IDLE')

  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedCourse, setSelectedCourse] = useState(null)

  const fetchSubjects = () => {
    setSubjectState('LOADING')
    fetch(`${API_URL}/subjects/${CURRENT_TERM}`)
      .then(data => {
        return data.json()
      }).then(json => {
        const departments = json.DEPARTMENTS
        setSubjectState('IDLE')
        setSubjects(departments)
      }).catch(e => {
        setSubjectState('ERROR')
        setSubjects([])
        console.log(e)
      })
  }

  const fetchCourses = subject => {
    setCourseState('LOADING')
    fetch(`${API_URL}/subjects/${CURRENT_TERM}/${subject}`)
      .then(data => {
        return data.json()
      }).then(json => {
        setCourseState('IDLE')
        setCourses(json.COURSES)
      }).catch(e => {
        setCourseState('ERROR')
        setCourses([])
        console.log(e)
      })
  }

  const fetchSections = (subject, course) => {
    setSectionState('LOADING')
    fetch(`${API_URL}/subjects/${CURRENT_TERM}/${subject}/${course}`)
      .then(data => {
        return data.json()
      }).then(json => {
        setSectionState('IDLE')
        setSections(json.SECTIONS)
      }).catch(e => {
        setSectionState('ERROR')
        setSections([])
        console.log(e)
      })
  }

  useEffect(() => {
    fetchSubjects()
  }, [])

  useEffect(() => {
    setCourses([])
    setSections([])
    setSelectedCourse(null)
    fetchCourses(selectedSubject)
  }, [selectedSubject])

  useEffect(() => {
    setSections([])
  }, [selectedCourse])

  return (
    <Dialog>
      <DialogTrigger className="mx-8 flex items-center">
        <MagnifyingGlassIcon className="w-4 mr-1" />
        <p className="text-sm font-medium text-aggiered hover:underline ">Search Sections</p>
      </DialogTrigger>
      <DialogContent className="w-[1000px]">
        <DialogHeader>
          <DialogTitle>Search Sections</DialogTitle>
          <DialogDescription>
            Select a course from the dropdown to track it.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-col flex">
          <Label className={"mb-3"}>Subject</Label>

          <Popover open={subjectOpen} onOpenChange={setSubjectOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={subjectOpen}
                className="w-[400px] justify-between">
                {selectedSubject
                  ? subjects.find((subject) => subject.SUBJECT === selectedSubject)?.DESCRIPTION
                  : "Select subject..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="w-[400px] h-60 p-0" >
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
                  className="w-[400px] justify-between">
                  {selectedCourse
                    ? courses.find((course) => course.COURSE === selectedCourse)?.DISPLAY
                    : "Select course..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="start" className="w-[400px] p-0" >
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
                          value={course.COURSE}
                          onSelect={(currentValue) => {
                            setSelectedCourse(currentValue === selectedCourse ? "" : currentValue)
                            setCourseOpen(false)
                          }}
                          className={"cursor-pointer"}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCourse === course.COURSE ? "opacity-100" : "opacity-0"
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

            {selectedCourse != null &&
              <button
                onClick={() => fetchSections(selectedSubject, selectedCourse)}
                className="transition-colors hover:cursor-pointer w-10 h-10 flex justify-center items-center border rounded-md ml-2 hover:bg-slate-100">
                <SendHorizonal className="w-5 opacity-50" />
              </button>}
          </div>

          <Label className={"mt-5 mb-3"}>Sections</Label>

          <div>
            <DataTable columns={columns} data={sections} fetchState={sectionState} />
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )

}

export default SearchDialog