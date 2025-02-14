import React, { useState } from 'react';

function ProcessInputForm({ processes, setProcesses, timeQuantum, setTimeQuantum }) {
  const [process, setProcess] = useState({ id: '', arrivalTime: 0, burstTime: 0, priority: 0 });


  const handleAddProcess = () => {
    setProcesses([...processes, { ...process, id: `P${processes.length + 1}` }]);
    setProcess({ id: '', arrivalTime: 0, burstTime: 0, priority: 0 });
  };

  return (
    <div className="ml-8 mb-8">
      <h2 className="text-xl font-semibold mb-4">Add Processes</h2>
      <div className="flex gap-4">
        <input
          type="number"
          placeholder="Arrival Time"
          value={process.arrivalTime}
          onChange={(e) => setProcess({ ...process, arrivalTime: parseInt(e.target.value) })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Burst Time"
          value={process.burstTime}
          onChange={(e) => setProcess({ ...process, burstTime: parseInt(e.target.value) })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Priority"
          value={process.priority}
          onChange={(e) => setProcess({ ...process, priority: parseInt(e.target.value) })}
          className="border p-2 rounded"
        />
        <button onClick={handleAddProcess} className="bg-green-500 text-white px-4 py-2 rounded">
          Add Process
        </button>
      </div>
    </div>
  );
}

export default ProcessInputForm;