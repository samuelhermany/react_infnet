import { Button } from "../components";
import { useAppContext } from "../Context";

const SignIn: React.FC = () => {
   const {showSnackMessage, showAlertMessage} = useAppContext();

   return (
      <>
         <Button onClick={() => showSnackMessage("mensagem customizada")}>Clique aqui</Button>
         <Button onClick={() => showAlertMessage("mensagem customizada" , "success", "filled")}>Clique sucess</Button>
         <Button onClick={() => showAlertMessage("mensagem customizada" , "warning", "outlined")}>Clique warning</Button>
         <Button onClick={() => showAlertMessage("mensagem customizada" , "error")}>Clique error</Button>
         <Button onClick={() => showAlertMessage("mensagem customizada" , "info")}>Clique info</Button>
      </>
   )
};

export default SignIn;