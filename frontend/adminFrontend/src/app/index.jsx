import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import {ThemeProvider} from './provider/'
import {AuthProvider} from '../features/auth/context/useAuth'
 
const App = () => {
  return (
    <AuthProvider>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
