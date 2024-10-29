import { flexRender } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import LoadingCircle from "@/components/LoadingCircle";
import { useDispatch, useSelector } from "react-redux";
import { LoaderCircle, MinusIcon, PlusIcon } from "lucide-react";
import { motion } from "framer-motion";
import { fetchSection } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, remove, set } from "firebase/database";
import { addSection, removeSection } from "@/store/slice";
import { useState } from "react";

const CURRENT_TERM = import.meta.env.VITE_CURRENT_TERM
const MAXIMUM_SECTIONS = import.meta.env.VITE_MAXIMUM_SECTIONS

const AddButton = ({ row }) => {

  const [buttonState, setButtonState] = useState('IDLE')

  const handleAdd = async crn => {
    setButtonState('LOADING')
    const data = await fetchSection(crn);
    if (data.STATUS != 200) {
      setButtonState('IDLE')
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
      description: `You are now tracking CRN ${crn}.`
    })
    setButtonState('IDLE')
    dispatch(addSection(data));
  }

  const handleRemove = async crn => {
    const uid = getAuth().currentUser.uid
    const dbRef = ref(getDatabase(), `users/${uid}/sections/${CURRENT_TERM}/${crn}`);
    const sectionUsersRef = ref(getDatabase(), `sections/${CURRENT_TERM}/${crn}/users/${uid}`);

    dispatch(removeSection(crn));
    await remove(dbRef);
    toast({
      title: 'Success!',
      description: `You are no longer tracking CRN ${crn}.`
    })
    await remove(sectionUsersRef);
  }

  const sections = useSelector(state => state.sections);
  const dispatch = useDispatch();

  return (
    <>

      {buttonState === 'LOADING'
        ? <div className="flex">
          <div>
            <motion.div animate={{ rotate: 360 }} transition={{ ease: 'linear', repeat: Infinity, duration: 1 }}>
              <LoaderCircle />
            </motion.div>
          </div>
        </div>
        : sections.some(section => section.CRN == row.original.SWV_CLASS_SEARCH_CRN)
          ? <div onClick={() => handleRemove(row.original.SWV_CLASS_SEARCH_CRN)}>
            <motion.div whileTap={{ scale: 0.8 }}
              className="hover:cursor-pointer text-red-600">
              <MinusIcon />
            </motion.div>
          </div>
          : <div onClick={() => handleAdd(row.original.SWV_CLASS_SEARCH_CRN)}>
            <motion.div whileTap={{ scale: 0.8 }}
              className="hover:cursor-pointer">
              <PlusIcon />
            </motion.div>
          </div>}
    </>
  )
}

export function DataTable({ table, columns, data, fetchState }) {

  return (
    <div className="rounded-md border overflow-x-auto h-full max-w-full">
      <Table className='h-full'>
        <TableHeader className="bg-aggiered">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="text-white h-10" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.id != "select" || data.length > 0
                        ? flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                        : null}
                  </TableHead>
                )
              })}

              <TableHead className="text-white h-10"></TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              return <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="h-12">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}

                <TableCell className="h-12">
                  <AddButton row={row} />
                </TableCell>
              </TableRow>
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <div className="flex justify-center">
                  {fetchState === 'IDLE'
                    ? 'No results.'
                    : fetchState === 'LOADING'
                      ? <LoadingCircle />
                      : 'An error has occurred.'}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}