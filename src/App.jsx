import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import RoutesManager from './components/RoutesManager';
import 'react-toastify/dist/ReactToastify.css';
import useStore from './store/useStore';
import { NextUIProvider } from '@nextui-org/react'

function App() {
  const { theme } = useStore();
  return (
    <>
      <NextUIProvider theme={theme}>
        <BrowserRouter basename={`/`}>
          <main className={`text-foreground bg-background`}>
            <RoutesManager />
          </main>
        </BrowserRouter>
        <ToastContainer
          position="bottom-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme}
        />
      </NextUIProvider>
    </>
  )
}

export default App
