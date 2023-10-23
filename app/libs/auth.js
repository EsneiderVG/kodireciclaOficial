// lib/auth.js
import { getSession } from 'next-auth/react';

const protectedRoutes = ['/login', '/register'];

const protectRouteMiddleware = async (context) => {
  const session = await getSession(context);

  // Si el usuario está autenticado y está intentando acceder a una ruta protegida, redirígelo a otra página, como el dashboard.
  if (session && protectedRoutes.includes(context.req.url)) {
    return {
      redirect: {
        destination: '/dashboard', // Cambia esto a la ruta a la que deseas redirigir a los usuarios autenticados.
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default protectRouteMiddleware;
