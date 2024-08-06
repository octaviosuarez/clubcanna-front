import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import Login from "../Login";
import Sidebar from "../Sidebar";
import Socios from "../Socios";
import Socio from "../Socios/Socio";
import Stock from "../Stock";
import Raza from "../Stock/Raza";
import Pedidos from "../Pedidos";
import MisPedidos from "../Pedidos/MisPedidos";
import { useEffect, useState } from "react";
import Pedido from "../Pedidos/Pedido";
import useStore from "../../store/useStore";
import { user } from "@nextui-org/react";
import Plantas from "../Plantas";
import Alimentacion from "../Plantas/Alimentacion";
function RoutesManager() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { userData } = useStore();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(userData?.level);
  return (
    <div className={`flex ${isMobile ? "flex-col" : "flex-row"} w-screen`}>
      {location.pathname !== "/login" && <Sidebar isMobile={isMobile} />}
      <div
        className={`w-full`}
        style={{
          height: isMobile ? "calc(100dvh - 73px)" : "100dvh",
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/socios"
            element={
              <PrivateRoute required="admin">
                <Socios />
              </PrivateRoute>
            }
          />
          <Route
            path="/socios/:cedula"
            element={
              <PrivateRoute required="admin">
                <Socio />
              </PrivateRoute>
            }
          />
          <Route
            path="/stock"
            element={
              <PrivateRoute required="admin">
                <Stock />
              </PrivateRoute>
            }
          />
          <Route
            path="/stock/:id"
            element={
              <PrivateRoute required="admin">
                <Raza />
              </PrivateRoute>
            }
          />
          <Route
            path="/pedidos"
            element={
              <PrivateRoute required="admin">
                <Pedidos />
              </PrivateRoute>
            }
          />
          <Route
            path="/mis-pedidos"
            element={
              <PrivateRoute required="user">
                <MisPedidos />
              </PrivateRoute>
            }
          />
          <Route
            path="/pedidos/:id"
            element={
              <PrivateRoute required="user">
                <Pedido />
              </PrivateRoute>
            }
          />
          <Route
            path="/plantas"
            element={
              <PrivateRoute required="admin">
                <Plantas />
              </PrivateRoute>
            }
          />
          <Route
            path="/alimentacion/:idPlanta/:nombrePlanta"
            element={
              <PrivateRoute required="admin">
                <Alimentacion />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={
              <Navigate
                to={userData?.level === "admin" ? "/socios" : "/mis-pedidos"}
                replace={true}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default RoutesManager;
