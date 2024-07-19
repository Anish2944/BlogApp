import React from "react";

import { Container, Logo, LogOutBtn,MenuButton } from "../index";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {toggleTheme} from '../../store/themeSlice';
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const toggelHandle = () => {
    dispatch(toggleTheme());
  }
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Sign up",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "My posts",
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add posts",
      slug: "/add-posts",
      active: authStatus,
    },
  ];
  return (
    <header className="py-3 shadow text-text2 bg-primary">
      <Container>
        <nav className="flex px-10 md:px-0 font-bold">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <div className="ml-auto z-50 absolute right-4  md:hidden">
              <MenuButton navItems={navItems} navigate={naviagte} authStatus={authStatus} />
          </div>
          <ul className="flex invisible md:visible ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => naviagte(item.slug)}
                    className="inline-block text-text2  px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
              )}
              <button onClick={toggelHandle} className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full" >Theme</button>
            {authStatus && (
              <li>
                <LogOutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
