import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
   const session = localStorage.getItem('session');

   // Se tiver token, renderiza a página, senã oleva pra página singin
   return session ? <Outlet /> : <Navigate to="/signin" />;
}

export default Protected;