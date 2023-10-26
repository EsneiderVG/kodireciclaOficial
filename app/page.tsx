'use client'
import { useEffect, useState } from 'react'
import HeaderLanding from '@/app/_components/Header'
import Image from 'next/image'
import LogoImage from '../app/(core)/images/infopage_one.svg';
import { Button, Card, CardBody, CardFooter, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@material-tailwind/react';
import QRReaderComponent from '@/app/_components/QrViewer'
import FooterComponent from '@/app/_components/Footer';
import { CheckIcon, ClockIcon, TrashIcon } from '@heroicons/react/24/solid';
import Footer from '@/app/_components/Footer';

export default function Home() {

  return (
    <>
      <HeaderLanding />
      <div className="pt-12 container mx-auto" id="nosotros">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          {/* <!--Left Col--> */}
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <p className="tracking-loose w-full">Problemas para la contabilidad?</p>
            <h1 className="my-4 text-5xl font-semibold leading-tight poppins">
              Ten el control de los residuos!
            </h1>
            <p className="leading-normal text-xl mb-8">
              obten el control de la cantidad de basura que estan generando, tanto la no aprovechable como la que si!
            </p>
            <a href='/login' className="mx-auto lg:mx-0 hover:underline bg-blue-400 text-white font-semibold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              Ingresa a tu plataforma
            </a>
          </div>
          {/* <!--Right Col--> */}
          <div className="w-full md:w-3/5 py-6 text-center">
            <Image src={LogoImage} className='px-4 sm:mx-12' alt={"svg one"} />
          </div>
        </div>
      </div>
      <section className="bg-white border-b py-8">
        <div className='container mx-auto flex flex-wrap gap-8 justify-start pt-4 pb-12'>
          <Card className="mt-6 w-96">
            <CardBody>
              <TrashIcon className='w-10 text-blue-400 my-5' />
              <Typography variant="h5" color="blue-gray" className="mb-2">
                <span>
                  Recoleccion de Basuras
                </span>
              </Typography>
              <Typography >
                <span>
                  Se trata de dar una solución al problema de la eficiencia y organización de la recolección de basuras
                </span>
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <a href="#" className="inline-block">
                <Button size="sm" variant="text" className="flex items-center gap-2">
                  <span className='text-base text-blue-400'>Learn More</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Button>
              </a>
            </CardFooter>
          </Card>
          <Card className="mt-6 w-96">
            <CardBody>
              <CheckIcon className='w-10 text-blue-400 my-5' />
              <Typography variant="h5" color="blue-gray" className="mb-2">
                <span>
                  Promoviendo aseo
                </span>
              </Typography>
              <Typography>
                <span>
                  Promoviendo el uso de las tic para cumplir la misión de ayudar a los diferentes entes del aseo en el bloque 8 de la universidad
                </span>
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <a href="#" className="inline-block">
                <Button size="sm" variant="text" className="flex items-center gap-2">
                  <span className='text-base text-blue-400'>Learn More</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Button>
              </a>
            </CardFooter>
          </Card>
          <Card className="mt-6 w-96">
            <CardBody>
              <ClockIcon className='w-10 text-blue-400 my-5' />
              <Typography variant="h5" color="blue-gray" className="mb-2">
                <span>
                  tiempo Efectivo
                </span>
              </Typography>
              <Typography>
                <span>
                  clasificando las basuras en un tiempo de recogida determinado para una mayor efectividad en la recolección
                </span>
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <a href="#" className="inline-block">
                <Button size="sm" variant="text" className="flex items-center gap-2">
                  <span className='text-base text-blue-400'>Learn More</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Button>
              </a>
            </CardFooter>
          </Card>
        </div>
      </section>
      <div id="escanea" className='container'>
        <QRReaderComponent />

      </div>
      <Footer />
    </>
  )
}

// export Home();