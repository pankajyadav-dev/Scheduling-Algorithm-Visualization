export const calculateScheduling = (processes, algorithm, timeQuantum) => {
    let schedule = [];
    let avgWaitingTime = 0;
    let avgTurnaroundTime = 0;
  
    switch (algorithm) {
      case 'FCFS':
        return firstComeFirstServed(processes);
      case 'SJF':
        return shortestJobFirst(processes);
      case 'RoundRobin':
        return roundRobin(processes, timeQuantum);
      case 'Priority':
        return priorityScheduling(processes);
      default:
        throw new Error('Invalid scheduling algorithm');
    }
  };
  
  // First-Come, First-Served (FCFS)
  const firstComeFirstServed = (processes) => {
    let schedule = [];
    let currentTime = 0;
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;
  
    // Sort processes by arrival time
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
  
    processes.forEach((process) => {
      const waitingTime = Math.max(0, currentTime - process.arrivalTime);
      const turnaroundTime = waitingTime + process.burstTime;
  
      schedule.push({
        process: process.id,
        start: currentTime,
        end: currentTime + process.burstTime,
      });
  
      currentTime += process.burstTime;
      totalWaitingTime += waitingTime;
      totalTurnaroundTime += turnaroundTime;
    });
  
    const avgWaitingTime = totalWaitingTime / processes.length;
    const avgTurnaroundTime = totalTurnaroundTime / processes.length;
  
    return { schedule, avgWaitingTime, avgTurnaroundTime };
  };
  
  // Shortest Job First (SJF)
  const shortestJobFirst = (processes) => {
    let schedule = [];
    let currentTime = 0;
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;
    let remainingProcesses = [...processes];
  
    while (remainingProcesses.length > 0) {
      // Filter processes that have arrived by the current time
      const availableProcesses = remainingProcesses.filter(
        (process) => process.arrivalTime <= currentTime
      );
  
      if (availableProcesses.length === 0) {
        currentTime++;
        continue;
      }
  
      // Find the process with the shortest burst time
      const nextProcess = availableProcesses.reduce((prev, curr) =>
        curr.burstTime < prev.burstTime ? curr : prev
      );
  
      const waitingTime = currentTime - nextProcess.arrivalTime;
      const turnaroundTime = waitingTime + nextProcess.burstTime;
  
      schedule.push({
        process: nextProcess.id,
        start: currentTime,
        end: currentTime + nextProcess.burstTime,
      });
  
      currentTime += nextProcess.burstTime;
      totalWaitingTime += waitingTime;
      totalTurnaroundTime += turnaroundTime;
  
      // Remove the scheduled process from the remaining processes
      remainingProcesses = remainingProcesses.filter(
        (process) => process.id !== nextProcess.id
      );
    }
  
    const avgWaitingTime = totalWaitingTime / processes.length;
    const avgTurnaroundTime = totalTurnaroundTime / processes.length;
  
    return { schedule, avgWaitingTime, avgTurnaroundTime };
  };
  
  // Round Robin
  const roundRobin = (processes, timeQuantum) => {
    let schedule = [];
    let currentTime = 0;
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;
    let remainingProcesses = processes.map((process) => ({
      ...process,
      remainingTime: process.burstTime,
    }));
  
    while (remainingProcesses.some((process) => process.remainingTime > 0)) {
      for (let i = 0; i < remainingProcesses.length; i++) {
        const process = remainingProcesses[i];
  
        if (process.remainingTime <= 0 || process.arrivalTime > currentTime) {
          continue;
        }
  
        const executionTime = Math.min(timeQuantum, process.remainingTime);
  
        schedule.push({
          process: process.id,
          start: currentTime,
          end: currentTime + executionTime,
        });
  
        currentTime += executionTime;
        process.remainingTime -= executionTime;
  
        if (process.remainingTime === 0) {
          const waitingTime = currentTime - process.arrivalTime - process.burstTime;
          const turnaroundTime = currentTime - process.arrivalTime;
          totalWaitingTime += waitingTime;
          totalTurnaroundTime += turnaroundTime;
        }
      }
    }
  
    const avgWaitingTime = totalWaitingTime / processes.length;
    const avgTurnaroundTime = totalTurnaroundTime / processes.length;
  
    return { schedule, avgWaitingTime, avgTurnaroundTime };
  };
  
  // Priority Scheduling
  const priorityScheduling = (processes) => {
    let schedule = [];
    let currentTime = 0;
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;
    let remainingProcesses = [...processes];
  
    while (remainingProcesses.length > 0) {
      // Filter processes that have arrived by the current time
      const availableProcesses = remainingProcesses.filter(
        (process) => process.arrivalTime <= currentTime
      );
  
      if (availableProcesses.length === 0) {
        currentTime++;
        continue;
      }
  
      // Find the process with the highest priority (lowest priority number)
      const nextProcess = availableProcesses.reduce((prev, curr) =>
        curr.priority < prev.priority ? curr : prev
      );
  
      const waitingTime = currentTime - nextProcess.arrivalTime;
      const turnaroundTime = waitingTime + nextProcess.burstTime;
  
      schedule.push({
        process: nextProcess.id,
        start: currentTime,
        end: currentTime + nextProcess.burstTime,
      });
  
      currentTime += nextProcess.burstTime;
      totalWaitingTime += waitingTime;
      totalTurnaroundTime += turnaroundTime;
  
      // Remove the scheduled process from the remaining processes
      remainingProcesses = remainingProcesses.filter(
        (process) => process.id !== nextProcess.id
      );
    }
  
    const avgWaitingTime = totalWaitingTime / processes.length;
    const avgTurnaroundTime = totalTurnaroundTime / processes.length;
  
    return { schedule, avgWaitingTime, avgTurnaroundTime };
  };