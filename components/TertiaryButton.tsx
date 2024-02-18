import Link from "next/link";
import React from "react";

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TertiaryButtonProps {
  text: string;
  icon: IconDefinition;
  iconPlacement?: "left" | "right";
}

const Button: React.FC<TertiaryButtonProps> = ({
  text,
  icon,
  iconPlacement = "left",
}) => {
  return (
    <div className="justify-baseline group inline-flex items-center text-slate-200">
      {iconPlacement == "left" && (
        <FontAwesomeIcon
          icon={icon}
          height={24}
          width={24}
          className="mr-0 pl-1 transition-all ease-in-out group-hover:mr-1 group-hover:pl-0 group-hover:text-indigo-400"
        />
      )}
      <span className="group-hover:text-indigo-400">{text}</span>
      {iconPlacement == "right" && (
        <FontAwesomeIcon
          icon={icon}
          height={24}
          width={24}
          className="ml-0 pr-1 transition-all ease-in-out group-hover:ml-1 group-hover:pr-0 group-hover:text-indigo-400"
        />
      )}
    </div>
  );
};

export default Button;
