import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface SkillProps {
  icon: IconDefinition;
  title: string;
  description: string;
}

const Skill: React.FC<SkillProps> = ({ icon, title, description }) => {
  return (
    <div className="m-auto flex w-80 flex-col px-6">
      <div className="m-auto my-6 rounded-lg bg-indigo-500 p-3">
        <FontAwesomeIcon
          icon={icon}
          className="fa-2xl m-auto text-indigo-200"
        />
      </div>
      <h3 className="text-center text-xl font-semibold text-slate-200">
        {title}
      </h3>
      <p className="text-md mt-4 text-center text-slate-300">{description}</p>
    </div>
  );
};

export default Skill;
