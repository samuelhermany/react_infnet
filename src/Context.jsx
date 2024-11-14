import { createContext, useContext, useEffect, useState } from 'react';
import { Alert, Grid, Snackbar } from './components';
import { useTranslation } from 'react-i18next';

const AppContext = createContext(null);

// Children é o App.tsx
const AppProvider = ({children}) => {
   const { t: translate, i18n } = useTranslation();
   const timeoutDuration = 6000;

   const [sanckOpen, setSanckOpen] = useState(false)
   const [sanckMessage, setSnackMessage] = useState("")

   const [alertMessage, setAlertMessage] = useState("");
   const [alertSeverity, setAlertSeverity] = useState("");
   const [alertVariant, setAlertVariant] = useState("");

   const changeLanguage = (lang) => {      
      i18n.changeLanguage(lang);
      // É importante para não ficar toda hora voltando para o dioma do navegador
      localStorage.setItem("language", lang);
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
      translate
   };

   // Faz a seleção do idioma
   useEffect(() => {
      const storeLanguage = localStorage.getItem("language");
      // Se no localstorage tiver um idioma, usa esse, senão usa o idioma do navegador
      // O split é pra pegar so o pt enão o pt-BR
      if (storeLanguage) {
         changeLanguage(storeLanguage);
     } else {
         const navLang = navigator.language.split("-")[0];
         changeLanguage(navLang);
     }
   }, [])

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
            <Grid item={true} size={12}>
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