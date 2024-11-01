import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface PriorityDisplayProps {
  priority: number;
}

function PriorityDisplay(props: PriorityDisplayProps) {
  const levelArray = [];
  const unLevelArray = [];
  for (let i = 1; i <= props.priority; i++) {
    levelArray.push(i);
  }
  for (let i = 1; i <= 5 - props.priority; i++) {
    unLevelArray.push(i);
  }
  return (
    <div className="flex justify-start align-baseline">
      {levelArray.map((el) => (
        <FontAwesomeIcon icon={faFire} className="pr-1 text-red-400" key={el} />
      ))}
      {unLevelArray.map((el) => (
        <FontAwesomeIcon icon={faFire} className=" pr-1 text-slate-400" key={el} />
      ))}
    </div>
  );
}

export default PriorityDisplay;
