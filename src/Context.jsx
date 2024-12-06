import { createContext, useContext, useEffect, useState } from 'react';
import { Alert, Grid, Snackbar } from './components';
import { useTranslation } from 'react-i18next';
import { createClient } from '@supabase/supabase-js';
import { ThemeProvider, useMediaQuery } from '@mui/material';
import { darkTheme, lightTheme } from './theme';

import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from 'dayjs';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

const AppContext = createContext(null);
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_API_KEY)

// Children é o App.tsx
const AppProvider = ({children}) => {
   const { t, i18n } = useTranslation();
   const timeoutDuration = 6000;
   const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
   
   const [snackOpen, setSnackOpen] = useState(false);
   const [snackMessage, setSnackMessage] = useState("");

   const [alertMessage, setAlertMessage] = useState("");
   const [alertSeverity, setAlertSeverity] = useState("");
   const [alertVariant, setAlertVariant] = useState(null);

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
      supabase,
      t
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
      <div className="app-background">
         <AppContext.Provider value={sharedState}>
                     <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                           {children}
                           <Snackbar
                              autoHideDuration={timeoutDuration}
                              onClose={handleClose}
                              open={snackOpen}
                              message={snackMessage}
                           />
                           { alertMessage 
                           ?   <Grid container={true}
                                    sx={{
                                       position: 'absolute',
                                       left: 0,
                                       bottom: 0,
                                       width: '100%',
                                       padding: 2
                                    }}
                              >
                                    <Grid item={true} size={{ xs: 12 }}>
                                       <Alert variant={alertVariant} severity={alertSeverity}>{alertMessage}</Alert>
                                    </Grid>
                              </Grid>
                           : null}    
                        </ThemeProvider>                
         </AppContext.Provider>
      </div>
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