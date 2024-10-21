import { Search } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

const SearchDialog = () => {

    return (
        <Dialog>
            <DialogTrigger className="mx-8 flex items-center">
                <MagnifyingGlassIcon className="w-4 mr-1"/>
                <p className="text-sm font-medium text-aggiered hover:underline ">Search Sections</p>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Search Sections</DialogTitle>
                    <DialogDescription>
                        Enter the course name to search for available sections.
                    </DialogDescription>
                </DialogHeader>

                <div>
                    <Label>Course Name</Label>
                    <Input className={"mt-1"} placeholder={"CSCE 120"}/>
                </div>
            </DialogContent>
        </Dialog>
    )

}

export default SearchDialog