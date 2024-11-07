import AppProvider from "./Context";
import Routes from "./routes";

const App = () => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  )
}

export default App;