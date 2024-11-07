import { createContext, ReactNode, useContext } from "react";
import { isAuthenticated } from "./services/authentication";

interface AppProviderProps {
   children: ReactNode;
}
interface AppContextInterface {
   changeLanguage: void,
   user:object,
   isAuthenticated: boolean | null,
}

const AppContext = createContext<AppContextInterface | null>(null);

// Children é o App.tsx
const AppProvider: React.FC<AppProviderProps> = ({children}) => {
   const changeLanguage = ()=> {
      console.log("escolhendo um idioma");
   }

   const sharedState = {
      changeLanguage,
      isAuthenticated
   };

   return (
      <AppContext.Provider value={sharedState}>
         {children}
      </AppContext.Provider>
   )
}
// devolve com o contexto o AppContext e com todas as funções dentro do AppProvider
// se o contexto não for nulo, devolve o contexto
// é para precaver se o crregamento for lento
export const useAppContext = () => {
   const context = useContext(AppContext);
   if (context === null) {
      throw new Error("useAppContext must be used within an AppProvider");
   }
   return context;
};

export default AppProvider;