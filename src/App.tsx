import { Route, Routes } from "react-router-dom";
import "./App.css";
import SvgPaint from "./pages/SvgPaint";
import { MantineProvider } from "@mantine/core";

function App() {
 
  return (
    <MantineProvider >

    <Routes>
      <Route path="/" element={<SvgPaint />} />
    </Routes>
    </MantineProvider>
  );
}

export default App;
