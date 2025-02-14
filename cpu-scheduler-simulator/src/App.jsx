import React, { useState } from 'react';
import ProcessInputForm from './components/ProcessInputForm';
import AlgorithmSelector from './components/AlgorithmSelector';
import GanttChart from './components/GanttChart';
import MetricsDisplay from './components/MetricsDisplay';
import { calculateScheduling } from './utils/schedulingAlgorithms';

function App() {
  const [processes, setProcesses] = useState([]);
  const [algorithm, setAlgorithm] = useState('FCFS');
  const [timeQuantum, setTimeQuantum] = useState(0);
  const [ganttData, setGanttData] = useState([]);
  const [metrics, setMetrics] = useState({ averageWaitingTime: 0, averageTurnaroundTime: 0 });

  const handleSimulate = () => {
    const { schedule, avgWaitingTime, avgTurnaroundTime } = calculateScheduling(processes, algorithm, timeQuantum);
    setGanttData(schedule);
    setMetrics({ averageWaitingTime: avgWaitingTime, averageTurnaroundTime: avgTurnaroundTime });
  };

  return (
    <div className=" bg-gray-500 w-full h-full">
      <div className="text-center bg-blue-500 text-white pb-4 center flex justify-center  ">
      <div className=" text-3xl font-bold mb-4">CPU Scheduler Simulator</div>
      </div>
        <ProcessInputForm processes={processes} setProcesses={setProcesses} timeQuantum={timeQuantum} setTimeQuantum={setTimeQuantum} />
      <AlgorithmSelector algorithm={algorithm} setAlgorithm={setAlgorithm} timeQuantum={timeQuantum} setTimeQuantum={setTimeQuantum} />
 
      <button onClick={handleSimulate} className="bg-blue-500 text-white px-4 py-2 rounded  ml-8 mt-4">
        Simulate
      </button>
      <div className=" m-10 flex justify-center w-fit-content bg-white rounded-lg">
      <GanttChart data={ganttData} />
      </div>
      <MetricsDisplay metrics={metrics} />
    </div>
  );
}

export default App;