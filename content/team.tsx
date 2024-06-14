import {
  faGithub,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const TEAM = [
  {
    url: "michael-ingram",
    name: "Michael Ingram",
    role: "Data Scientist",
    image: "/img/team/michael-ingram.jpg",
    short_description:
      "Michael is a seasoned data scientist with a passion for leveraging data to drive strategic business decisions. He has a wealth of experience in predictive analytics, machine learning, and developing custom data applications.",
    long_description:
      "Highly motivated data scientist with 5 years of digitalization and process development experience. Proven track record in developing data-driven solutions to optimize processes, reduce costs, and improve efficiency. Pursuing opportunities to leverage data science skills to drive decision-making and insights in tech and data science. ",
    education: [
      {
        degree: "M.S. in Data Science",
        school: "Tufts University",
        dates: "Jan 2022 - Dec 2023",
      },
      {
        degree: "B.S. in Chemical Engineering",
        school: "University of Connecticut",
        dates: "Aug 2012 - May 2016",
      },
    ],
    skills: [
      { group_name: "Programming Languages", skills: ["Python", "R", "SQL"] },
      {
        group_name: "Software & Tools",
        skills: [
          "Git/GitLab",
          "Spotfire",
          "Electronic Lab Notebooks",
          "Data Lakes",
        ],
      },
      {
        group_name: "Techniques",
        skills: [
          "Machine Learning",
          "Data Analytics & Visualization",
          "Statistics & Probability",
          "Natural Language Processing",
          "Scrum & SAFe Methodologies",
        ],
      },
    ],
    experience: [
      {
        title: "Engineer",
        department: "Digital Integration and Predictive Technologies",
        company: "Amgen",
        dates: "Oct 2022 - Present",
        bullets: [
          "Developed a hybrid peristaltic filling model which uses in-silico physics and a data driven kernel for pump logic, saving scientists time and resources.",
          "Refactored old product codebases to interface with a new user app store, increasing usability and adoptability of the tools.",
          "Maintained in-silico models by adding features like sensitivity analysis and collaborated with process teams on use cases, reducing the number of runs needed for development.",
          "Enhanced programing skills by following SCRUM framework and good coding practices such as code reviews and unit tests.",
        ],
      },
      {
        title: "Associate Scientist",
        department: "Process Development",
        company: "Amgen",
        dates: "Dec 2018 - Oct 2022",
        bullets: [
          "Developed dashboards in Spotfire for bioreactor studies and chromatography runs, saving teams hours performing analysis and standardizing the results",
          "Developed a data processing pipeline for high throughput screening using TECANs which aided in experiment planning and standardizing results",
          "Planned and executed experiments for multiple products and studies",
        ],
      },
    ],
    social_links: [
      { href: "https://www.twitter.com/", label: "Twitter", icon: faXTwitter },
      {
        href: "https://www.linkedin.com/in/michael-s-ingram/",
        label: "LinkedIn",
        icon: faLinkedin,
      },
      {
        href: "https://github.com/Still-River",
        label: "GitHub",
        icon: faGithub,
      },
      {
        href: "mailto:michael@the-still-river.com",
        label: "Email",
        icon: faEnvelope,
      },
    ],
    certifications: [
      {
        name: "Professional Scrum Master I",
        issuer: "Scrum.org",
        link: "https://www.credly.com/badges/18c60609-e855-4218-8d35-67853464bacb/linked_in_profile",
        img: "/img/certifications/psm1.png",
      },
      {
        name: "Certified Scrum Product Owner",
        issuer: "Scrum Alliance",
        link: "https://bcert.me/bc/html/show-badge.html?b=naoswkzx",
        img: "/img/certifications/CSPO.png",
      },
      {
        name: "Certified SAFe ®️ Practitioner",
        issuer: "Scaled Agile, Inc.",
        link: "https://www.credly.com/badges/d0cd7d79-e64f-4432-8092-2f8d0e9921f0/public_url",
        img: "/img/certifications/SAFe6.png",
      },
      {
        name: "Deep Learning Specialization",
        issuer: "Coursera",
        link: "https://www.coursera.org/account/accomplishments/specialization/certificate/4MXAVLHJ89JN",
        img: "/img/certifications/deeplearning.png",
      },
    ],
    publications: [],
  },
  // {
  //   url: "ting-guo",
  //   name: "Ting Guo",
  //   role: "CFO",
  //   image: "/img/placeholder-female.webp",
  //   short_description:
  //     "Ting is a seasoned financial professional with a passion for leveraging data to drive strategic business decisions. She has a wealth of experience in predictive analytics, machine learning, and developing custom data applications.",
  //   long_description:
  //     "Experienced Senior Scientist with a focus on biopharmaceutical process development and team leadership at 2seventy bio and Amgen. Expert in vector development, GMP manufacturing technology transfers, and regulatory documentation. Leads innovation and digitalization in production processes. Strong background in tissue engineering with skills in data analysis, project management, and cross-functional collaboration.",
  //   education: [
  //     {
  //       degree: "Ph.D. in Biomaterials and Tissue Engineering",
  //       school: "University of Maryland",
  //       dates: "2013 - 2018",
  //     },
  //     {
  //       degree: "M.Eng. in Bioengineering",
  //       school: "Cornell University",
  //       dates: "2011 - 2012",
  //     },
  //   ],
  //   skills: [
  //     {
  //       group_name: "Process Development",
  //       skills: [
  //         "Tissue Engineering",
  //         "Cell Culture",
  //         "Protein Purification",
  //         "Protein Assays",
  //       ],
  //     },
  //     {
  //       group_name: "Data Analysis",
  //       skills: [
  //         "Statistics",
  //         "Python",
  //         "Electronic Lab Notebooks",
  //         "Spotfire",
  //       ],
  //     },
  //     {
  //       group_name: "Management",
  //       skills: [
  //         "Critical Thinking",
  //         "Project Management",
  //         "Problem Solving",
  //         "Communication",
  //         "Cross-Functional Team Leadership",
  //       ],
  //     },
  //   ],
  //   experience: [
  //     {
  //       title: "Senior Scientist and Group Lead",
  //       department: "Vector Process Development",
  //       company: "2seventy bio",
  //       dates: "Dec 2021 - Present",
  //       bullets: [
  //         "Group lead and manager for the vector development upstream team",
  //         "Vector process development (oversee both upstream and downstream) lead for CMC pipeline projects",
  //         "Technology transfer lead for Phase I programs GMP manufacturing at CMO",
  //         "Initiated and led multiple innovation projects to enhance the LVV production process through external collaborations",
  //         "Authored or reviewed regulatory documents including BLA filing, IND, and pre-IND briefing book",
  //         "Initiated and led the vector department digitalization program with data science group",
  //       ],
  //     },
  //     {
  //       title: "Scientist",
  //       department: "Process Development",
  //       company: "Amgen",
  //       dates: "Sep 2018 - Dec 2021",
  //       bullets: [
  //         "Upstream lead for commercial process development: develop commercial production processes for novel Amgen molecules by collaborating with cross-functional groups and CDMOs including manufacturing, attribute sciences, drug product, and technology transfer teams.",
  //         "Market Application: leading the upstream effort to draft filing sections and review documents, preparing RTQs.",
  //         "Platform Advancement: shape Amgen’s future platform through media sourcing with external vendors, media development for flex factory and manufacturing dematerialization.",
  //         "Amgen DST compliance lead: lead the effort to facilitate compliance alignment and training by working and coordinating with different functional groups as the Cambridge representative.",
  //         "Trained new hires and mentored Amgen-Academia collaboration project.",
  //       ],
  //     },
  //   ],
  //   social_links: [
  //     {
  //       href: "https://www.linkedin.com/in/tingguobme/",
  //       label: "LinkedIn",
  //       icon: faLinkedin,
  //     },
  //     {
  //       href: "mailto:ting@the-still-river.com",
  //       label: "Email",
  //       icon: faEnvelope,
  //     },
  //   ],
  //   certifications: [
  //     {
  //       name: "Project Management: The Basics for Success",
  //       issuer: "Coursera",
  //       link: "https://www.coursera.org/account/accomplishments/certificate/3C4CPLDC4KVL",
  //       img: "/img/certifications/coursera.png",
  //     },
  //     {
  //       name: "Financial Markets (with Honors)",
  //       issuer: "Coursera",
  //       link: "https://www.coursera.org/account/accomplishments/certificate/2GLULXS3F5LS",
  //       img: "/img/certifications/coursera.png",
  //     },
  //     {
  //       name: "Introduction to Portoflio Construction and Analysis with Python",
  //       issuer: "Coursera",
  //       link: "https://www.coursera.org/account/accomplishments/certificate/VPZ5AHVVVPGT",
  //       img: "/img/certifications/coursera.png",
  //     },
  //   ],
  //   publications: [],
  // },
  {
    url: "open-position",
    name: "Open Position",
    role: "CHO (Cheif Happiness Officer)",
    image: "/img/placeholder-male.webp",
    short_description:
      "We are currently looking for a seasoned professional to join our team as a Chief Happiness Officer. If you are passionate about leveraging data to drive strategic business decisions, we would love to hear from you. Applicants should have a wealth of experience in predictive analytics, machine learning, and developing custom data applications.",
    long_description:
      "We are currently looking for a seasoned professional to join our team as a Chief Happiness Officer. If you are passionate about leveraging data to drive strategic business decisions, we would love to hear from you. Applicants should have a wealth of experience in predictive analytics, machine learning, and developing custom data applications.",
    education: [],
    skills: [],
    experience: [],
    social_links: [],
    certifications: [],
    publications: [],
  },
];
