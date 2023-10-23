'use client'
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from "next/link";
import React, { Fragment, useContext } from "react";


const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

import {
  ChevronDownIcon,
  ChevronRightIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowTrendingUpIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  PresentationChartBarIcon,
  ShoppingBagIcon
} from "@heroicons/react/24/solid";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Alert,
  Card,
  Chip,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography
} from "@material-tailwind/react";

import { ThemeContext } from '../(core)/context/homepage';
import { signIn, signOut, useSession } from "next-auth/react";

export default function HeaderBar() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  let { isOpenHeaderLeft, setIsOpenHeaderLeft } = useContext(ThemeContext);

  const sidebarStyles = {
    // display: isOpenHeaderLeft ? 'block' : 'none',
    position: isOpenHeaderLeft ? 'fixed':'absolute',
    transform: isOpenHeaderLeft ? 'translateX(0px)' : 'translateX(-600px)',
    zIndex: 40,
    marginTop: '110px'
    // Agrega otros estilos CSS según tus necesidades
  };


  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const { data: session, status } = useSession();


  return (
    <Fragment>
      <Card style={sidebarStyles} shadow={true} className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        
        {/* <div className="p-2">
          <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" crossOrigin={undefined} />
        </div> */}
        <List>
          {session?.user ? (
            <ListItem>
              <ListItemPrefix>
                {/* <img src={session?.user?.image ? ("hola"):("euy")} alt="user-image" className="w-6 h-6 rounded-full cursor-pointer" /> */}
                <Image
                  src={session.user ? (session.user.image || session.user.img_profile) : ("https://www.mundodeportivo.com/alfabeta/hero/2023/04/all-might-se-convierte-en-iron-man.jpg?width=1200")}
                  alt="Landscape picture"
                  width={50}
                  height={50}
                  className="rounded-full	"
                />
              </ListItemPrefix>
              {session?.user?.first_name || session.user.name}
            </ListItem>
          ) : (null)}
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          {session?.user ? (
            <ListItem onClick={() => signOut()}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              <p>Logout</p>
            </ListItem>

          ) : (
            <ListItem onClick={() => signIn()}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              <p >Signup</p>
            </ListItem>
          )}


        </List>
        <Alert open={openAlert} className="mt-auto" color='blue' onClose={() => setOpenAlert(false)}>
          <CubeTransparentIcon className="mb-4 h-12 w-12" />
          <Typography variant="h6" className="mb-1">
            <span>Version Alpha</span> 
          </Typography>
          <Typography variant="small" className={poppins.className}>
            <span> Esta aplicacion actualmente esta en fase alpha</span>
          </Typography>
          <div className="mt-4 flex gap-3">
            <Typography
              as="a"
              href="#"
              variant="small"
              className={poppins.className}
              onClick={() => setOpenAlert(false)}
            >
              <span>Okey</span>
            </Typography>
          </div>
        </Alert>
      </Card>

    </Fragment>
  );
}