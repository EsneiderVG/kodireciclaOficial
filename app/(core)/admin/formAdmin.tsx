'use client'
import {
  ExclamationTriangleIcon
} from "@heroicons/react/24/solid";
import {
  Alert,
  Button,
  Card,
  Dialog,
  DialogBody,
  Input,
  Spinner,
  Typography
} from "@material-tailwind/react";
import React from 'react';
import {PAPELERYSMAIN, PAPELERYS, STATUS, USERS} from '@/const/uri'

import { verificarValores } from '../../../utils/FunctionsUtils';
import axios, { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';
import { Poppins } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { User } from '../models/User';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

const PageAdmin = () => {
  const router = useRouter();
  const [error, setError] = useState("")
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

 


  const handlerSubmit = async (e: any) => {
    e.preventDefault();

    try {

      const formData = new FormData(e.currentTarget)
      const first_name = formData.get('first_name') as string
      const last_name = formData.get('last_name') as string
      const cc = formData.get('cc') as string
      const email = formData.get('email') as string
      const phone = formData.get('phone') as string
      const shift = formData.get('shift') as string
      const password = formData.get('password') as string
      const user_type = formData.get('user_type') as unknown as number
      const img_profile = "https://img.freepik.com/premium-vector/3d-simple-user-icon-isolated_169241-6976.jpg";
      var today = new Date();
      var created_at = today.toISOString()
      const fechaSubmit = new Date(created_at);
      var updated_at = "" as unknown as Date

      const user: User = {
        first_name: first_name,
        last_name: last_name,
        cc: cc,
        email: email,
        phone: phone,
        shift: shift,
        password: password,
        user_type: user_type,
        img_profile: img_profile,
        created_at: fechaSubmit,
        updated_at: updated_at,
      }

      try {
        verificarValores(user);
        setError("")
        
      } catch (error: any) {
        setError(error.message)
        return false;
      }
      setOpen(true)

      const resultRegister = await axios.post(USERS, user)

      console.log(resultRegister);
    
      if (resultRegister?.status == 200) {
        const resLogin = await signIn('credentials', {
          email: user.email,
          password: user.password,
          redirect: false
        })

        if (resLogin?.error) {
          setError(resLogin.error as string)
        }
        if (resLogin?.ok) {

          router.push("/home")
        }
      }
      setOpen(false)
    } catch (error) {

      if (error instanceof AxiosError) {
        // console.log(error);
        setOpen(false)
        setError(error.response?.data.error)
      }
    }

  }

  return (
    <div className="container mx-auto h-screen">

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

      <Card color="transparent" shadow={false} className='items-center justify-center h-screen'>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form onSubmit={handlerSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" type='text' label="nombres" name='first_name' crossOrigin={null} />

            <Input size="lg" type='text' label="apellidos" name='last_name' crossOrigin={null} />

            <Input size="lg" type='number' label="cedula o documento" name='cc' crossOrigin={null} />

            <Input size="lg" type='email' label="Email" name='email' crossOrigin={null} />
            <Input size="lg" type='tel' label="telefono movil" name='phone' crossOrigin={null} />
            <Input size="lg" type='text' label="turno" name='shift' crossOrigin={null} />

            <Input type="password" size="lg" label="Password" name="password" crossOrigin={null} />
            {/* <Input size="lg" label="user_type" name='user_type' type='number' crossOrigin={undefined} /> */}
            {/* <Select label="user_type"  >
              <Option value='1'>Admin</Option>
              <Option value='2'>Corriente</Option>
            </Select> */}
            <select className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" name='user_type'>
              <option value="1">Admin</option>
              <option value="2">Corriente</option>
            </select>
            {/* alertas */}
            {
              error ? (
                <Alert
                  icon={<ExclamationTriangleIcon />}
                  className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
                >
                  {error}
                </Alert>
              ) : (null)
            }


          </div>
          
          <Button type='submit' className="mt-6" fullWidth>
            Register
          </Button>
          
        </form>
      </Card>
    </div>

  )
}

export default PageAdmin;