import SeatLabel from "@/components/SeatLabel";

export const fullColumns = [
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
    header: 'Instructor',
    cell: ({ row }) => {
      const instructor = row.original.INSTRUCTOR
      return <span className={instructor == 'Not assigned' ? 'opacity-25' : undefined} >{instructor}</span>
    }
  },
  {
    accessorKey: 'SWV_CLASS_SEARCH_INST_TYPE',
    header: 'Instruction Mode'
  },
  {
    accessorKey: 'SEATS',
    header: 'Remaining',
    cell: ({ row }) => {
      const crn = row.original.SWV_CLASS_SEARCH_CRN;
      return <SeatLabel crn={crn} />
    }
  }
]
