import React from 'react';

function AlgorithmSelector({ algorithm, setAlgorithm, timeQuantum, setTimeQuantum  }) {
  return (
    <div className="ml-8 mb-8">
      <h2 className="text-xl font-semibold mb-4">Select Algorithm</h2>
      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="FCFS">First-Come, First-Served (FCFS)</option>
        <option value="SJF">Shortest Job First (SJF)</option>
        <option value="RoundRobin">Round Robin</option>
        <option value="Priority">Priority Scheduling</option>
      </select>
      {algorithm === 'RoundRobin' && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Time Quantum:
          </label>
          <input
            type="number"
            onChange={(e) => setTimeQuantum(parseInt(e.target.value))}
            className="mt-1 block border rounded-md"
            placeholder="Enter time quantum"
          />
        </div>
      )}
    </div>
  );
}

export default AlgorithmSelector;