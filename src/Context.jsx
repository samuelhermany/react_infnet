import { createContext, useContext, useEffect, useState } from 'react';
import { Alert, Grid, Snackbar } from './components';
// import { useTranslation } from 'react-i18next';
import { createClient } from '@supabase/supabase-js';

const AppContext = createContext(null);
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

// Children é o App.tsx
const AppProvider = ({children}) => {
   const timeoutDuration = 6000;

   const [sanckOpen, setSanckOpen] = useState(false)
   const [sanckMessage, setSnackMessage] = useState("")

   const [alertMessage, setAlertMessage] = useState("");
   const [alertSeverity, setAlertSeverity] = useState("");
   const [alertVariant, setAlertVariant] = useState("");

   const changeLanguage = ()=> {
      console.log("oi");
   }

   const showSnackMessage = (mensage) => {
      setSnackMessage(mensage);
      setSanckOpen(true);
   }

   const showAlertMessage = (mensage, severity, variant) => {
      setAlertMessage(mensage);
      setAlertSeverity(severity);
      setAlertVariant(variant);

      // Deve ter um temmpo de 6 segundos para fechar a mensagem pois não possui auto close
      setTimeout(() => {
         setAlertMessage("");
      }, timeoutDuration);
   }

   const handleClose = () => {
      setSnackMessage("");
      setSanckOpen(false);
   };

   const sharedState = {
      changeLanguage,
      showSnackMessage,
      showAlertMessage,
      supabase,
   };

   return (
      <AppContext.Provider value={sharedState}>
         {children}
         {/* Após 6 segundos, chama a função on close */}
         <Snackbar
            autoHideDuration={timeoutDuration}
            onClose={handleClose}
            open={sanckOpen}
            message={sanckMessage}
         />
         {alertMessage ?
         <Grid container={true}
            sx={{
               position:'absolute',
               left:0,
               bottom:0,
               width:'100%',
               padding:2,
            }}>
            <Grid item={true} size={{xs: 12}}>
               <Alert variant={alertVariant} severity={alertSeverity}>{alertMessage}</Alert>
            </Grid>
         </Grid>
         : null}
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