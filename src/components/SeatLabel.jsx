import { useEffect, useState } from "react";
import LoadingCircle from "./LoadingCircle";

const API_URL = import.meta.env.VITE_API_URL
const CURRENT_TERM = import.meta.env.VITE_CURRENT_TERM

const SeatLabel = ({ crn, className }) => {

  const [seats, setSeats] = useState(null)

  const fetchSeats = async () => {
    const response = await fetch(`${API_URL}/terms/${CURRENT_TERM}/classes/${crn}/seats`);
    const data = await response.json();

    setSeats(data.SEATS);
  }

  useEffect(() => {
    fetchSeats()
  }, [])

  return (
    <div className={'flex justify-end'}>
      {seats == null 
      ? <LoadingCircle className={"w-4 h-4"} />
      : seats.REMAINING}
    </div>
  )
}

export default SeatLabel;