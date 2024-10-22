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
    accessorKey: "SWV_CLASS_SEARCH_SUBJECT",
    header: 'Subject'
  },
  {
    accessorKey: "SWV_CLASS_SEARCH_COURSE",
    header: 'Course'
  },
  {
    accessorKey: "SWV_CLASS_SEARCH_SECTION",
    header: 'Section'
  },
  {
    accessorKey: "SWV_CLASS_SEARCH_HOURS_LOW",
    header: 'Credits'
  },
]