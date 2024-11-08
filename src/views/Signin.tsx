import { Button, DatePicker, DateTimePicker } from "../components";
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

         {/* O Horário exibido é sempre no formato UTC */}
         <DateTimePicker
            ampm={false}
            format="DD/MM/YYYY HH:mm"
            onChange={(value) => console.log(value.toString())}
         />
         <DatePicker
            format="DD/MM/YYYY"
            onChange={(value) => console.log(value.toString())}
         />
      </>
   )
};

export default SignIn;