import { useLocation, NavLink } from 'react-router-dom';
import css from './Sidebar.module.css';
import { MdSpaceDashboard } from "react-icons/md";
import { AiFillCalendar, AiOutlineTable } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import logo from '../images/logoTT.png';
import { useState } from 'react';

const Sidebar = ({ userEmail }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState(pathname.substring(1));

  // Define the navItems array with the necessary data
  const navItems = [
    {
      path: "FormationFormateur",
      text: "FormationFormateur",
      icon: <MdSpaceDashboard size={30} />,
      

    },
    {
      path: "DashboardFormateur",
      text: "DashboardFormateur",
      icon: <MdSpaceDashboard size={30} />,
    },
    {
      path: "calendarFormateur",
      text: "Calendar",
      icon: <AiFillCalendar size={30} />,
    },
    {
      path: "boardFormateur",
      text: "Trello Board",
      icon: <FaTasks size={30} />,
    },
    {
      path: "datagrid",
      text: "Users",
      icon: <AiOutlineTable size={30} />,
    },
  ];

  return (
    <div className={css.container}>
      <img src={logo} alt="logo" className={css.logo} />
      <div className={css.menu}>
        {navItems.map(({ path, text, icon }) => (
          <NavLink
            key={text}
            to={{ pathname: path, state: { userEmail } }}
            className={`${css.item} ${active === path ? css.active : ''}`}
            title={text}
            onClick={() => setActive(path)}
          >
            {icon}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
