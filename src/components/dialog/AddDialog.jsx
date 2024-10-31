import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog"
import { PlusIcon } from "@heroicons/react/16/solid"
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../ui/tabs"
import SearchDialog from "./SearchDialog"
import CRNDialog from "./CRNDialog"
import InstructorDialog from "./InstructorDialog"
import AttributeDialog from "./AttributeDialog"

const AddDialog = ({ open, onOpenChange }) => {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className="flex items-center hover:underline">
        <PlusIcon className="w-4 mr-1" />
        <p className="text-sm font-medium text-aggiered ">Add Sections</p>
      </DialogTrigger>
      <DialogContent className="bg-white w-[90vw] max-w-[1000px] border-2 shadow-none">
        <Tabs defaultValue="search" className="w-full p-4 bg-transparent overflow-x-auto h-[650px]">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="search" className="flex">Subject</TabsTrigger>
            <TabsTrigger value="crn">CRN</TabsTrigger>
            <TabsTrigger disabled value="instructor">Instructor</TabsTrigger>
            <TabsTrigger disabled value="attribute">Attributes</TabsTrigger>
          </TabsList>
          <TabsContent value="search">
            <SearchDialog  />
          </TabsContent>
          <TabsContent value="crn">
            <CRNDialog />
          </TabsContent>
          <TabsContent value="instructor">
            <InstructorDialog />
          </TabsContent>
          <TabsContent value="attribute">
            <AttributeDialog />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )

}

export default AddDialog