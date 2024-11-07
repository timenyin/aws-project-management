import { Task } from '@/state/api'
import { format } from 'date-fns'
import Image from 'next/image'
import React from 'react'
import { Check } from 'lucide-react';

type Props = {
    task: Task
}

const TaskCard = ({ task }: Props) => {
    const taskDetails = [
      { label: 'ID', value: task.id },
      { label: 'Title', value: task.title },
      { label: 'Description', value: task.description || 'No description provided' },
      { label: 'Status', value: task.status },
      { label: 'Priority', value: task.priority },
      { label: 'Tags', value: task.tags || 'No tags' },
      { label: 'Start Date', value: task.startDate ? format(new Date(task.startDate), 'P') : 'Not set' },
      { label: 'Due Date', value: task.dueDate ? format(new Date(task.dueDate), 'P') : 'Not set' },
      { label: 'Author', value: task.author ? task.author.username : 'Unknown' },
      { label: 'Assignee', value: task.assignee ? task.assignee.username : 'Unassigned' },
    ];
  
    return (
      <div className="w-96 mb-2 rounded-lg border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-dark-secondary dark:border-dark-border dark:text-white">
        {/* Image Section */}
        {task.attachments && task.attachments.length > 0 && (
          <div className="rounded-t-lg overflow-hidden">
            <Image
              src={`/${task.attachments[0].fileURL}`}
              alt={task.attachments[0].fileName}
              width={400}
              height={200}
              className="w-full h-64 object-cover"
            />
          </div>
        )}
  
        {/* Content Section */}
        <div className="p-4">
          {/* Priority and Tags (Badges) */}
          <div className="flex space-x-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-slate-400 text-white text-xs font-semibold">
            Priority: {task.priority}
            </span>
            {/* {task.tags && task.tags.length > 0 && (
              <span className="px-3 py-1 rounded-full bg-gray-500 text-white text-xs font-semibold">
               Tags: {task.tags}
              </span>
            )} */}
          </div>
  
          {/* Task Details */}
          {taskDetails.map((detail, index) => (
            <p
              key={index}
              className={`text-sm flex items-center ${index < taskDetails.length - 1 ? 'border-b border-dotted border-gray-300 mb-2' : ''}`}
            >
              <Check className="mr-2 h-3 w-2" /> {/* Add the Check icon */}
              {detail.label}: {detail.value}
            </p>
          ))}
        </div>
      </div>
    );
  };
  
  
  
  
  
  

export default TaskCard