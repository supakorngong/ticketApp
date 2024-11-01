import React from "react";

function ProgressDisplay({ progress }: { progress: number }) {
  const colorPlate = { notStart: "bg-slate-600", started: "bg-blue-600", done: "bg-green-600" };

  const getColor = (progress: number) => {
    if (progress && progress > 0) {
      if (progress === 0) return colorPlate["notStart"];
      else if (progress > 0 && progress < 100) return colorPlate["started"];
      else return colorPlate["done"];
    } else return;
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className={`${getColor(progress)} h-2.5 rounded-full`} style={{ width: progress }}></div>
    </div>
  );
}

export default ProgressDisplay;
