import { BsCurrencyDollar } from "react-icons/bs";
import { FaHandshake, FaShare } from "react-icons/fa";
import {
  FiHome,
  FiLayers,
  FiMail,
  FiMessageCircle,
  FiSettings,
  FiShoppingBag,
  FiShoppingCart,
  FiUsers,
} from "react-icons/fi";

export const links = [
  {
    name: "Dashboard",
    icon: <FiHome />,
    url: "/",
  },
  {
    name: "Project Service",
    icon: <FiShoppingBag />,
    subLinks: [
      {
        name: "create project",
        url: "/create",
      },
      {
        name: "manage projects",
        url: "/manage",
      },
      {
        name: "Assign projects",
        url: "/assign",
      },
      {
        name: "All Projects",
        url: "/list",
      },
      {
        name: "Assigned Projects",
        url: "/assigned",
      },
      {
        name: "Track project",
        url: "/track",
      },
      {
        name: "project report",
        url: "/report",
      },



    ],
  },

  // },
  // {
  //   name: "Reviews",
  //   icon: <FiMessageCircle />,
  //   url: "/reviews",
  // },
  // {
  //   name: "Settings",
  //   icon: <FiSettings />,
  //   url: "/settings",
  // },
  // {
  //   name: "Inbox",
  //   icon: <FiMail />,
  //   url: "/inbox",
  // },
];
