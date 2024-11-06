import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
   const token = localStorage.getItem('token');

   // Se tiver token, renderiza a página, senã oleva pra página singin
   return token ? <Outlet /> : <Navigate to="/signin" />;
}

export default Protected;