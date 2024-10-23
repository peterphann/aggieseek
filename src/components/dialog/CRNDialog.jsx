import { DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { motion } from "framer-motion"
import { useState } from "react"
import { usePopup } from "../../contexts/PopupContext"
import { getAuth } from "firebase/auth"
import { ref, getDatabase, set } from "firebase/database"
import LoadingCircle from "../LoadingCircle"
import { toast } from "@/hooks/use-toast"

const API_URL = import.meta.env.VITE_API_URL
const CURRENT_TERM = import.meta.env.VITE_CURRENT_TERM
const MAXIMUM_SECTIONS = import.meta.env.VITE_MAXIMUM_SECTIONS

const CRNDialog = ({ sections, updateDatabase }) => {

  const [crnInput, setCRNInput] = useState("")
  const [buttonState, setButtonState] = useState("IDLE")

  const { setPopup } = usePopup()

  const handleCRNInput = (e) => {
    setButtonState('IDLE')
    if (isNaN(parseInt(e.target.value)) && e.target.value !== '') return;

    setCRNInput(e.target.value)
  }

  const addSection = () => {
    const userInput = crnInput;
    if (userInput === '') return;
    if (sections.length >= MAXIMUM_SECTIONS) {
      toast({
        title: "Error occurred",
        description: `You've reached the maximum number of sections!`,
      })
      return;
    }
    if (sections.some(section => section.CRN === userInput)) {
      toast({
        title: "Error occurred",
        description: `You are already tracking CRN ${userInput}!`,
      })
      return
    }
    
    

    setButtonState('WAITING')
    fetch(`${API_URL}/classes/${CURRENT_TERM}/${userInput}/`)
      .then((data) => {
        console.log(data)
        if (data.status === 400) {
          setButtonState('ERROR')
          toast({
            title: "Error occurred",
            description: `CRN ${userInput} does not exist!`,
          })
          return;
        }

        const uid = getAuth().currentUser.uid;
        const dbRef = ref(getDatabase(), `users/${uid}/sections/${CURRENT_TERM}/${userInput}`);
        const sectionDbRef = ref(getDatabase(), `sections/${CURRENT_TERM}/${userInput}/users/${uid}`);
        set(dbRef, true);
        set(sectionDbRef, true);

        updateDatabase();
        toast({
          title: "Added section",
          description: `CRN ${userInput} has been added!`,
        })
        setCRNInput("");
        setButtonState('IDLE')
      })
      .catch((error) => {
        console.log(error);
        setButtonState('IDLE');
        toast({
          title: "Error occuurred",
          description: `CRN ${userInput} has been added!`,
        })
        setPopup('Please try again.');
      })
  };

  return (
    <div className="">
      <DialogHeader>
        <DialogTitle className='text-2xl'>Search CRN</DialogTitle>
        <DialogDescription>
          Enter a known CRN to track it.
        </DialogDescription>
      </DialogHeader>

      <div className="flex justify-between mt-6">
        <form className="flex flex-col"
        onSubmit={e => {
          e.preventDefault();
          addSection();
        }}>
          <Label className={"mb-3"}>CRN</Label>
          <Input 
          value={crnInput} onChange={e => handleCRNInput(e)}
          maxLength={5} className={`w-52 ${buttonState === 'ERROR' && "bg-red-50"}`} placeholder="#####" />

          <motion.div
            className="mt-5 w-32"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <Button type="submit" className="bg-aggiered hover:bg-aggiered w-32">
              {buttonState === 'WAITING'
              ? <LoadingCircle className={"text-white"} />
              : "Track"}
            </Button>
          </motion.div>
        </form>
      </div>

    </div>
  )

}

export default CRNDialog