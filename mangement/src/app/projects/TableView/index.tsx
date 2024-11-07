import { useAppSelector } from '@/app/redux';
import Header from '@/components/Header';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils'; // Add dataGridSxStyles import
import { useGetTasksQuery } from '@/state/api';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from 'react';

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "description",
    headerName: "Description",
    width: 250,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-gray-300 px-2 text-xs font-semibold leading-5 text-gray-600">
        {params.value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 75,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 200,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 200,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 200,
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value?.author || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value?.assignee || "Unassigned",
  },
  // {
  //   field: "author",
  //   headerName: "Author",
  //   width: 150,
  //   renderCell: (params) => params.value?.username || "Unknown",
  // },
  // {
  //   field: "assignee",
  //   headerName: "Assignee",
  //   width: 150,
  //   renderCell: (params) => params.value?.username || "Unassigned",
  // },
];

const TableView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An Error Occurred while Fetching TimeLine</div>;

  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
          buttonComponent={
            <button
              className="flex items-center rounded bg-gray-500 px-3 py-2 text-white hover:bg-gray-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>
      <DataGrid
        rows={tasks || []}
        columns={columns}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode)} // Apply the sx styles here
      />
    </div>
  );
};

export default TableView;
