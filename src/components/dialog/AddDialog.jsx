import { Dialog, DialogTrigger, DialogContent, DialogClose } from "../ui/dialog"
import { PlusIcon } from "@heroicons/react/16/solid"
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../ui/tabs"
import SearchDialog from "./SearchDialog"
import CRNDialog from "./CRNDialog"
import { Hash } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL
const CURRENT_TERM = import.meta.env.VITE_CURRENT_TERM

const AddDialog = ({ sections, updateDatabase }) => {

  return (
    <Dialog>
      <DialogTrigger className="mx-8 flex items-center">
        <PlusIcon className="w-4 mr-1" />
        <p className="text-sm font-medium text-aggiered hover:underline ">Add Sections</p>
      </DialogTrigger>
      <DialogContent className="bg-white w-screen lg:w-[1000px] border-none shadow-none">
        <Tabs defaultValue="search" className="bg-transparent p-4 pt-0 h-[650px]">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="search" className="flex">Subject</TabsTrigger>
            <TabsTrigger value="crn">CRN</TabsTrigger>
            <TabsTrigger disabled value="instructor">Instructor</TabsTrigger>
            <TabsTrigger disabled value="attributes">Attributes</TabsTrigger>
          </TabsList>
          <TabsContent value="search">
            <SearchDialog />
          </TabsContent>
          <TabsContent value="crn">
            <CRNDialog sections={sections} updateDatabase={updateDatabase} />
          </TabsContent>
          <TabsContent value="instructor">
            <CRNDialog sections={sections} updateDatabase={updateDatabase} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>


  )

}

export default AddDialog