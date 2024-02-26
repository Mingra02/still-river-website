"use client";

import { faChevronRight, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Link from "next/link";

interface BreadcrumbLink {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  links: BreadcrumbLink[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ links }) => {
  return (
    <div className="mx-4 mt-6 inline-flex rounded border border-slate-500 px-2 text-slate-400 md:px-4">
      <div className="px-2 py-2 md:px-4">
        <FontAwesomeIcon icon={faHome} className="text-slate-400" />
      </div>
      {links.map((link, index) => (
        <React.Fragment key={index}>
          <div className="px-2 py-2 md:px-4">
            <FontAwesomeIcon icon={faChevronRight} className="text-slate-400" />
          </div>
          <div className="px-2 py-2 md:px-4">
            <Link href={link.url}>{link.name}</Link>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
