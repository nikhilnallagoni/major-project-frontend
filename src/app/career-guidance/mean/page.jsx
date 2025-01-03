"use client"
import React,{useState} from 'react';
import { ReactFlow } from '@xyflow/react';
import Modal from 'react-modal'; // Importing the Modal component
import '@xyflow/react/dist/style.css';

import { resources } from './data';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog"
import { CircleArrowOutUpRight } from 'lucide-react';


const initialNodes = [
  { id: '1', position: { x: 690, y: 0 }, data: { label: 'MEAN Stack Development' } },

  // Frontend Branch
  { id: '2', position: { x: 190, y: 100 }, data: { label: 'Frontend' }, style: { backgroundColor: '#ffcccb' } },
  { id: '3', position: { x: 190, y: 200 }, data: { label: 'Angular' }, style: { backgroundColor: '#add8e6' } },

  // Backend Branch (Node.js)
  { id: '4', position: { x: 690, y: 100 }, data: { label: 'Backend' }, style: { backgroundColor: '#ffcccb' } },
  { id: '5', position: { x: 690, y: 200 }, data: { label: 'Node.js' }, style: { backgroundColor: '#add8e6' } },
  { id: '6', position: { x: 690, y: 300 }, data: { label: 'Frameworks' }, style: { backgroundColor: '#f9f9f9' } },
  { id: '7', position: { x: 690, y: 400 }, data: { label: 'Express.js' }, style: { backgroundColor: '#add8e6' } },

  // Databases Branch
  { id: '8', position: { x: 1190, y: 100 }, data: { label: 'Databases' }, style: { backgroundColor: '#ffcccb' } },
  { id: '9', position: { x: 1190, y: 200 }, data: { label: 'MongoDB (NoSQL)' }, style: { backgroundColor: '#add8e6' } },
];

const initialEdges = [
  // Connecting MEAN Stack Development to Frontend, Backend, and Databases
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-4', source: '1', target: '4' },
  { id: 'e1-8', source: '1', target: '8' },

  // Frontend connections
  { id: 'e2-3', source: '2', target: '3' },

  // Backend connections (Node.js and Frameworks)
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'e5-6', source: '5', target: '6' },
  { id: 'e6-7', source: '6', target: '7' },

  // Databases connection
  { id: 'e8-9', source: '8', target: '9' },
];




export default function AIMap() {
  const [selectedNode, setSelectedNode] = useState(null);

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  const closeDialog = () => setSelectedNode(null);

  return (
    <div className="text-black w-full h-full m-2 flex items-center justify-center flex-col">
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          boxSizing: "border-box",
          backgroundColor: "#f9f9f9",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          fitView
          onNodeClick={onNodeClick}
        />
      </div>
      <Dialog>
      <DialogTrigger asChild>
        <button className=" m-2 p-2 rounded-lg bg-red-300 text-black">View Resource</button>
      </DialogTrigger>
      <DialogContent className="max-h-[80%]  max-w-[80%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Resouces</DialogTitle>
          <div  >
            {resources.map((resource,index)=>{
              
              return <div key={index} className='bg-sky-100 my-3 rounded-lg p-2 bg-card shadow-md text-black '>
                <h1 className='text-2xl'>{resource.title}</h1>
                <h2>{resource.intro}</h2>
                <div className='flex  items-center gap-3'>Documentation  {resource.documentationResources.map((r,i)=>{
                  return <a key={i}  className="text-blue-500 flex" href={r.url}><CircleArrowOutUpRight> {i} </CircleArrowOutUpRight></a>
                })}</div>
              </div>
            })}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>

      
    </div>
  );
}