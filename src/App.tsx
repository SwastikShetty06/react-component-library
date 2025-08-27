/* Demo App - minimal demo for local preview */

import React from 'react';
import  InputField  from './components/InputField';
import DataTable from './components/DataTable/DataTable';
import './index.css';

const sample = [
  { id:1, name:'John Doe', email:'john@example.com', status:'active' },
  { id:2, name:'Jane Smith', email:'jane@example.com', status:'inactive' }
];

export default function App(){
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Component Library Demo</h1>
      <div className="mb-6 max-w-md">
        <InputField label="Search" placeholder="Search..." clearable />
      </div>
      <div>
        <DataTable data={sample as any} columns={[{key:'name',title:'Name',dataIndex:'name'},{key:'email',title:'Email',dataIndex:'email'}]} />
      </div>
    </div>
  );
}
