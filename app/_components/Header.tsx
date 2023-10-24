'use client'
import {
  Bars4Icon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  PresentationChartBarIcon,
  ShoppingBagIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  UserGroupIcon
} from "@heroicons/react/20/solid";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

import {
  Button,
  Card,
  Chip,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography
} from "@material-tailwind/react";


import { Poppins } from 'next/font/google';
import { Fragment, useState, useEffect, createElement } from "react";
const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

const poppinsTitle = Poppins({
  weight: '600',
  subsets: ['latin'],

})

const navListMenuProyectsItems = [
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: SquaresPlusIcon,
  },
  {
    title: "About Us",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
  },
  {
    title: "Blog",
    description: "Find the perfect solution for your needs.",
    icon: Bars4Icon,
  },
];

const navListMenuWorksItems = [
  {
    title: "Trabajos Freelancer",
    description: "Find the perfect solution for your needs.",
    icon: SquaresPlusIcon,
  },
  {
    title: "Como hacer dinero",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
  },
  {
    title: "Blog",
    description: "Find the perfect solution for your needs.",
    icon: Bars4Icon,
  },
];

function NavListProyectosMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const renderItems = navListMenuProyectsItems.map(
    ({ icon, title, description }, key) => (
      <a href="#" key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    ),
  );

  return (
    <Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="paragraph" className="font-medium text-lg">
            <ListItem
              className="flex items-center gap-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              <span className={poppins.className}>Proyectos</span>
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-5 w-5 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-5 w-5 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </ListItem>
          </Typography>

        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-2 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </Fragment>
  );
}

function NavListTrabajosMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderItems = navListMenuWorksItems.map(
    ({ icon, title, description }, key) => (
      <a href="#" key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    ),
  );

  return (
    <Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="paragraph" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-lg text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              <span className={poppins.className}>Trabajos</span>
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-5 w-5 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-5 w-5 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </ListItem>
          </Typography>

        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-2 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </Fragment>
  );
}

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography as="div" variant="paragraph" className="">
        <ListItem
          className="flex items-center gap-2 py-2 pr-4 text-gray-900"
        >
          <a href="#nosotros" className="text-lg">Nosotros</a>
          <InformationCircleIcon
            strokeWidth={1}
            color="bg-blue-500	"
            className={`hidden h-6 w-6 text-blue-400 transition-transform lg:block`}
          />
        </ListItem>
      </Typography>
      <Typography as="div" variant="paragraph" className="">
        <ListItem
          className="flex items-center gap-2 py-2 pr-4 text-gray-900"
        >
          <a href="#escanea" className="text-lg">Escanea</a>
          <InformationCircleIcon
            strokeWidth={1}
            color="bg-blue-500	"
            className={`hidden h-6 w-6 text-blue-400 transition-transform lg:block`}
          />
        </ListItem>
      </Typography>
      {/* <NavListProyectosMenu />
      <NavListTrabajosMenu /> */}

    </List>
  );
}








export default function HeaderLanding() {
  const [openNav, setOpenNav] = useState(false);

  // const closeDrawerTop = () => setOpenNav(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">

      <div className="hidden lg:block">
        <NavList />
      </div>

    </ul>
  );

  return (
    <Fragment>
      <Drawer placement="left" overlay={false} open={openNav} className="mt-14">
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
          <List>
            <ListItem>
              <div className="flex items-center gap-x-1">
                <Button
                  variant="gradient"
                  size="md"
                  color="blue"
                  className="lg:inline-block text-sm p-4"
                >
                  <a href="/login" className="font-semibold">Inicia en la aplicacion</a>
                </Button>
              </div>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <InformationCircleIcon className="h-5 w-5 text-blue-400" />
              </ListItemPrefix>
              <Typography as="div" variant="paragraph" className="">
                <ListItem
                  className="flex items-center gap-2 py-2 pr-4 text-gray-900"
                >
                  <a href="#nosotros" className="text-lg">Nosotros</a>
                  <InformationCircleIcon
                    strokeWidth={1}
                    color="bg-blue-500	"
                    className={`hidden h-6 w-6 text-blue-400 transition-transform lg:block`}
                  />
                </ListItem>
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <InformationCircleIcon className="h-5 w-5 text-blue-400" />
              </ListItemPrefix>
              <Typography as="div" variant="paragraph" className="">
                <ListItem
                  className="flex items-center gap-2 py-2 pr-4 text-gray-900"
                >
                  <a href="#escanea" className="text-lg">Escanea</a>
                  <InformationCircleIcon
                    strokeWidth={1}
                    color="bg-blue-500	"
                    className={`hidden h-6 w-6 text-blue-400 transition-transform lg:block`}
                  />
                </ListItem>
              </Typography>
            </ListItem>


          </List>
        </Card>
      </Drawer>

      <Navbar className="mx-auto w-full px-4 py-6 lg:px-8 lg:py-4 rounded-none max-w-none	">
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">


          <div className="flex items-center ">
            <img
              alt="Flowbite React Logo"
              className="mr-3 h-6 sm:h-9"
              src="https://seeklogo.com/images/R/recycling-logo-FD00AE4529-seeklogo.com.png"
            />
            <span className="text-lg">kodirecicla</span>
          </div>
          <div className="hidden lg:block">{navList}</div>


          <div className="flex items-center gap-x-1">
            <Button
              variant="gradient"
              size="md"
              color="blue"
              className="hidden lg:inline-block text-base	"
            >
              <a href="/login" className="font-semibold">Inicia en la aplicacion</a>
            </Button>
          </div>

          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>

      </Navbar>
    </Fragment>
  );
}