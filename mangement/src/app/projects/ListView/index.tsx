import Header from '@/components/Header';
import TaskCard from "@/components/TaskCard";
import { Task, useGetTasksQuery } from '@/state/api';
import React from 'react'

type Props = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
}

const ListView = ({ id, setIsModalNewTaskOpen}: Props) => {
    const {
        data: tasks,
        error,
        isLoading,
      } = useGetTasksQuery({ projectId: Number(id) });

    if (isLoading) return <div> Loading...</div>
    if (error) return <div> An Error Ocurred while Fetching Task</div>;
  return (
    <div className='px-4 pb-8 xl:px-6'>
        <div className='pt-5'>
            <Header name='List'
            buttonComponent={
              <button className='flex items-center rounded bg-gray-500 px-3 py-2 text-white hover:bg-gray-600' 
              onClick={() => setIsModalNewTaskOpen(true) }>Add Task</button>
            }
            isSmallText />
        </div>
        <div className="flex flex-wrap space-x-2 space-y-2">
        {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  )
}

export default ListView