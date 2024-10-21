import { Search } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid"

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
                        Search sections here
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )

}

export default SearchDialog