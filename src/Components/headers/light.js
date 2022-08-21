import React, { useContext, useEffect } from 'react';
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import useAnimatedNavToggler from "../../helpers/useAnimatedNavToggler.js";

import logo from "../../images/logo resized.png";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { AppBar } from "@material-ui/core";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart.js";
import { UserContext } from '../../App.js';
import userImage from '../../images/user-icon2.png';

const Header = tw.header`
  flex justify-between items-center
  max-w-screen-lg mx-auto bg-black
`;

export const NavLinks = tw.div`inline-block`;

/* hocus: stands for "on hover or focus"
 * hocus:bg-primary-700 will apply the bg-primary-700 class on hover or focus
 */
export const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
`;

export const PrimaryLink = tw(NavLink)`
  lg:mx-0
  px-8 py-3 rounded bg-primary-500 text-gray-100
  hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline
  border-b-0
`;

export const LogoutLink = tw(NavLink)`
  lg:mx-0
  px-8 py-3 rounded bg-transparent text-white bg-red-400
  hocus:bg-red-600 hocus:text-gray-200 focus:shadow-outline
  border-b-0 cursor-pointer
`;

export const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-black border-b-0 text-2xl! ml-0!`};

  img {
    ${tw`w-10 mr-3`}
  }
`;


export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
export const NavToggle = tw.button`
  lg:hidden z-20 focus:outline-none hocus:text-primary-500 transition duration-300
`;
export const MobileNavLinks = motion(styled.div`
  ${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
`);

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 justify-between items-center
`;

export default ({ roundedHeaderButton = false, logoLink, links, className, collapseBreakpointClass = "lg" }) => {

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const handleLogOut = () => {
    if (window.confirm('Are You Sure, You want to Logout?')) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      window.location.reload();
      setLoggedInUser('');
    }
  }
  useEffect(() => {
    if ((sessionStorage.getItem('user'))) {
      setLoggedInUser(JSON.parse(sessionStorage.getItem('user')));
    }
  }, [])

  const defaultLinks = [
    <NavLinks key={1}>
      <Link to="/shop">
        <NavLink>
          Shop
        </NavLink>
      </Link>
      <NavLink href="/blog">Blog</NavLink>
      <NavLink href="/about-us">About</NavLink>
      <NavLink href="/contact-us">Contact Us</NavLink>
      <Link to="/cart">
        <NavLink>
          Cart
        </NavLink>
      </Link>
      <NavLink href="/admin">Admin</NavLink>
      {/* <NavLink href="/#" tw="lg:ml-12!">
        Login
      </NavLink> */}
      {
        loggedInUser.email || sessionStorage.getItem("token") ?
          <LogoutLink css={tw`rounded-full`} onClick={handleLogOut}>
            {/* <img data-tooltip-target="tooltip-default" src={userImage} style={{ width: 'auto' }} />
            <div id="tooltip-default" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
              Log Out
              <div class="tooltip-arrow" data-popper-arrow></div>
            </div> */}
            Log Out
          </LogoutLink>
          :
          <PrimaryLink css={roundedHeaderButton && tw`rounded-full`}
            href="/login"
          >
            Sign In
          </PrimaryLink>


      }


    </NavLinks>
  ];

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss = collapseBreakPointCssMap[collapseBreakpointClass];

  const defaultLogoLink = (
    <Link to='/'>
      <LogoLink >
        <img src={logo} alt="logo" style={{ width: '100%' }} />
        PhonoMania
      </LogoLink>
    </Link>
  );

  logoLink = logoLink || defaultLogoLink;
  links = links || defaultLinks;

  return (
    <Header className={className || "header-dark"}>
      <AppBar style={{ backgroundColor: 'white', border: 'none', paddingLeft: '5rem', paddingRight: '2rem', paddingTop: '.5rem', paddingBottom: '.5rem' }}>
        <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
          {logoLink}
          {links}
        </DesktopNavLinks>

        <MobileNavLinksContainer css={collapseBreakpointCss.mobileNavLinksContainer}>
          {logoLink}
          <MobileNavLinks initial={{ x: "150%", display: "none" }} animate={animation} css={collapseBreakpointCss.mobileNavLinks}>
            {links}
          </MobileNavLinks>
          <NavToggle onClick={toggleNavbar} className={showNavLinks ? "open" : "closed"}>
            {showNavLinks ? <CloseIcon tw="w-6 h-6" /> : <MenuIcon tw="w-6 h-6" />}
          </NavToggle>
        </MobileNavLinksContainer>
      </AppBar>
    </Header>
  );
};

/* The below code is for generating dynamic break points for navbar.
 * Using this you can specify if you want to switch
 * to the toggleable mobile navbar at "sm", "md" or "lg" or "xl" above using the collapseBreakpointClass prop
 * Its written like this because we are using macros and we can not insert dynamic variables in macros
 */

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  }
};
