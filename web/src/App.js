import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { React, createContext, useState } from 'react';
import { Context } from "./context.js";
import Home from './screens/Home.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
]);

function App() {
  const [accesibleMode, setAccesibleMode] = useState(false)
  return (
    <Context.Provider value={[accesibleMode, setAccesibleMode]}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
}

export default App;
