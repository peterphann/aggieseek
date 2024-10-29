import { DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { motion } from "framer-motion"
import { useState } from "react"
import { getAuth } from "firebase/auth"
import { ref, getDatabase, set } from "firebase/database"
import LoadingCircle from "../LoadingCircle"
import { toast } from "@/hooks/use-toast"
import { addSection } from "@/store/slice"
import { fetchSection } from "@/lib/utils"
import { useDispatch, useSelector } from "react-redux"

const CURRENT_TERM = import.meta.env.VITE_CURRENT_TERM
const MAXIMUM_SECTIONS = import.meta.env.VITE_MAXIMUM_SECTIONS

const CRNDialog = () => {

  const [crnInput, setCRNInput] = useState("")
  const [buttonState, setButtonState] = useState("IDLE")

  const sections = useSelector(state => state.sections)
  const dispatch = useDispatch()

  const handleCRNInput = (e) => {
    setButtonState('IDLE')
    if (isNaN(parseInt(e.target.value)) && e.target.value !== '') return;

    setCRNInput(e.target.value)
  }

  const handleAdd = async crn => {
    if (!crn) return;
    setButtonState('LOADING')
    const data = await fetchSection(crn);
    console.log('test')
    if (data.STATUS != 200) {
      toast({
        title: 'Error',
        description: `CRN ${crn} doesn't exist!`
      });
      setButtonState('ERROR')
      return
    };
    if (sections.length >= MAXIMUM_SECTIONS) {
      toast({
        title: 'Error',
        description: `You cannot exceed more than ${MAXIMUM_SECTIONS} sections.`
      });
      setButtonState('IDLE')
      return;
    }

    const uid = getAuth().currentUser.uid;
    const dbRef = ref(getDatabase(), `users/${uid}/sections/${CURRENT_TERM}/${crn}`);
    const sectionDbRef = ref(getDatabase(), `sections/${CURRENT_TERM}/${crn}/users/${uid}`);
    set(dbRef, true);
    set(sectionDbRef, true);

    toast({
      title: 'Success!',
      description: `Added CRN ${crn}.`
    })
    setButtonState('IDLE')
    dispatch(addSection(data));
  }

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
          handleAdd(crnInput);
        }}>
          <Label className={"mb-3"}>CRN</Label>
          <Input 
          value={crnInput} onChange={e => handleCRNInput(e)}
          maxLength={5} className={`w-52 ${buttonState === 'ERROR' && "bg-red-50"}`} placeholder="#####" />

          <motion.div
            className="mt-5 w-24 inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <Button type="submit" className="flex justify-center bg-aggiered hover:bg-aggiered w-24">
              {buttonState === 'LOADING'
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