// pages/register.js
'use client'
import { signIn, useSession } from 'next-auth/react';
import React, { FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Dialog,
  DialogBody,
  Alert,
  Spinner
} from "@material-tailwind/react";

import { Poppins } from 'next/font/google'
import axios, { AxiosError } from 'axios';
import { validatePassAndEmail } from '@/utils/FunctionsUtils';
import Footer from '@/app/_components/Footer';
import HeaderNone from '@/app/_components/HeaderNone';


const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

function RegisterPage() {
  // const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState("")
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const handlerGoogle = (e: any) => {
    e.preventDefault();

    signIn('google');

  }

  // async function loadDataSQL(email: any) {
  //   const { data } = await axios.get(LOGIN + email)
  //   return data;
  // }



  const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {

      e.preventDefault();

      const formData = new FormData(e.currentTarget)

      const email = formData.get('email')
      const password = formData.get('password')
      // console.log({
      //   email, password
      // });


      try {
        validatePassAndEmail(email, password);
        // console.log("Valores verificados con éxito.");
        setError("")

        const resLog = await signIn('credentials', {
          email,
          password,
          redirect: false,

        });

        if (resLog?.error) {
          setError(resLog.error as string)
        }

        if (resLog?.ok) {
          router.push("/home")
        }
        // console.log(user);

      } catch (error: any) {
        setError(error.message)
      }




    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {


        setError(error.response?.data.message)
      }

    }

  }


  return (
    <div className="container mx-auto ">
      <HeaderNone />
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        key={"spinner"}
      >
        <DialogBody divider className='flex flex-col justify-center items-center h-screen h-fit gap-5'>
          <p className={poppins.className}>Registrando e Iniciando session</p>
          <Spinner color="blue" className="h-16 w-16 text-gray-900/50" />
        </DialogBody>

      </Dialog>
      <Card color="transparent" shadow={false} className='items-center justify-center py-44'>

        <div className="p-8 text-center shadow-gray-400	rounded shadow shadow-blue-500/40	">
          <Typography variant="h4" color="blue" >
             <span>Bienvenido a kodirecicla</span>
          </Typography>
          <Typography variant="h4" color="blue-gray" >
            <span>Inicio de Session</span>
          </Typography>
          <Typography color="gray" className={poppins.className} >
            <span>Ingresa tus Datos</span>
          </Typography>
          <form onSubmit={handlerSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" label="Email" name='email' crossOrigin={undefined} />
              <Input type="password" size="lg" label="Password" name='password' crossOrigin={undefined} />
              {error ? (
                <Alert color="red">
                  {error}
                </Alert>
              ) : (null)}
            </div>
            <Button type='submit' className="mt-6 text-base" color='blue' fullWidth>
              <span className={poppins.className}>Ingresar</span>
            </Button>
            {/* <Button type='button' onClick={handlerGoogle} className="mt-6 text-base" fullWidth>
                <span className={poppins.className}>Google</span>
              </Button> */}
          </form>

        </div>


      </Card>
      <div className="container">
        <Footer />
      </div>

    </div>
  );



}

export default RegisterPage;
