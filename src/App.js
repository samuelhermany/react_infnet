import React from "react";
import { NativeBaseProvider} from "native-base";
import Index from "./routes";

function App() {
  return (
    <NativeBaseProvider>
      <Index />
    </NativeBaseProvider>
  );
}

export default App;
