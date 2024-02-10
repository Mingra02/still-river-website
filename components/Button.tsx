import React from "react";

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonProps {
  text: string;
  icon?: IconDefinition;
  iconPlacement?: "left" | "right";
  bgColor?: string;
  hoverColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  iconPlacement = "left",
  bgColor = "bg-indigo-500",
  hoverColor = "hover:bg-indigo-600",
}) => {
  return (
    <button
      className={`${bgColor} rounded-md px-6 py-2 font-semibold text-indigo-100 ${hoverColor} inline-flex items-center justify-center transition duration-200`}
    >
      {iconPlacement === "left" && icon && (
        <FontAwesomeIcon icon={icon} height={24} width={24} className="mr-3" />
      )}
      {text}
      {iconPlacement === "right" && icon && (
        <FontAwesomeIcon icon={icon} height={24} width={24} className="ml-3" />
      )}
    </button>
  );
};

export default Button;
