import { redirect } from "react-router-dom";

const isAuthenticated = () => {
   const token = localStorage.getItem('token');

   // se tem token, redireciona pra página inicial
   if (token) throw redirect ("/");
   return null;
}

   const handleVerificationProtected =() =>{
      const token = localStorage.getItem('token');

      // se não tem token, redireciona pra página singin
      if (!token) throw redirect ("/signin");
      return null;
   }

export{
   isAuthenticated,
   handleVerificationProtected
}