import { Button } from "../components";
import { useAppContext } from "../Context";

const Home: React.FC = () => {
   const {user, changeLanguage} = useAppContext();
   console.log(user);

   return <Button onClick={changeLanguage}>MUDAR IDIOMA</Button>;
};

export default Home;