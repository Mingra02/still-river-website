import Image from "next/image";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import TertiaryButton from "./TertiaryButton";

interface PortfolioCardProps {
  imgSrc: string;
  title: string;
  description: string;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  imgSrc,
  title,
  description,
}) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 xl:content-start xl:items-start xl:justify-start xl:align-top">
      <div className="relative m-auto inline-block h-64 w-64 overflow-hidden rounded-md transition hover:overflow-hidden xl:h-56 xl:w-56">
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="m-auto scale-110 transition-transform duration-500 ease-in-out hover:rotate-[-12deg] hover:scale-125"
        />
      </div>
      <div className="m-auto flex h-full max-w-sm flex-col px-2 xl:m-0 xl:w-full">
        <h3 className="mt-6 text-2xl font-semibold text-slate-200 xl:mt-0">
          {title}
        </h3>
        <p className="mt-4 flex-grow hyphens-auto text-justify text-slate-300">
          {description}
        </p>
        <div className="mt-8 text-right">
          <TertiaryButton
            text="Learn More"
            icon={faArrowRight}
            iconPlacement="right"
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
