import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import LoadingCircle from "@/components/LoadingCircle";

export function DataTable({ columns, data, fetchState }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
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
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="h-12">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
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