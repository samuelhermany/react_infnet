import AppProvider from "./Context";
import Routes from "./routes";
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (            
      <AppProvider>
        <Routes />
      </AppProvider> 
  )
}

export default App;