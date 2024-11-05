import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom";

import Home from "../views/Home";
import Settings from "../views/Settings";
import SingUp from "../views/Singup";
import SignIn from "../views/Signin";
import Protected from "./protected";
import { handleVerificationProtected, isAuthenticated } from "../services/authentication";


const router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/">
         <Route element={Protected}>
            <Route index element={<Home />} loader={() => handleVerificationProtected()}/>
            <Route path="settings" element={<Settings />} loader={() => handleVerificationProtected()}/>
         </Route>
         <Route path="signin" element={<SignIn />} loader={() => isAuthenticated()}/>
         <Route path="singup" element={<SingUp />} loader={() => isAuthenticated()}/>
      </Route>
   )
);


const Index =() => {
   return (
      <RouterProvider router={router} />
   )
};

export default Index;