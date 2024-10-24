import { Checkbox } from "@/components/ui/checkbox"

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "SWV_CLASS_SEARCH_CRN",
    header: "CRN",
  },
  {
    accessorKey: 'SWV_CLASS_SEARCH_SUBJECT',
    header: 'Course',
    cell: ({ row }) => (
      <div>{row.original.SWV_CLASS_SEARCH_SUBJECT} {row.original.SWV_CLASS_SEARCH_COURSE}</div>
    )
  },
  {
    accessorKey: "SWV_CLASS_SEARCH_SECTION",
    header: 'Section'
  },
  {
    accessorKey: "SWV_CLASS_SEARCH_HOURS_LOW",
    header: 'Credits'
  },
  {
    accessorKey: 'INSTRUCTOR',
    header: 'Instructor'
  },
  {
    accessorKey: 'SWV_CLASS_SEARCH_INST_TYPE',
    header: 'Instruction Mode'
  },
  {
    accessorKey: 'SEATS',
    header: 'Remaining',
    cell: ({ row }) => {
      const remainingSeats = row.original.SEATS.REMAINING;
      return (
        <div className={remainingSeats < 1 && "text-red-700/50"}>{remainingSeats}</div>
      );
    }
  }
]