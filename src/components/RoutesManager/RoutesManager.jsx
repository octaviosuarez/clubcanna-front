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
import Plantas from "../Plantas";
import Alimentacion from "../Plantas/Alimentacion";
import Deudores from "../Deudores";
import { obtenerClubId } from "../../api/api";
import { getClubName } from "../../utils/functions";

const manageFavicon = (club_name) => {
  const faviconPath = `/${club_name}.ico`;
  // Buscar si ya existe un elemento link para el favicon
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    // Si no existe, crear uno nuevo
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  // Actualizar el href del link con la nueva ruta del favicon
  link.href = faviconPath;
}

function RoutesManager() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { setClubId, userData, setClubName, club_name } = useStore();

  if (club_name) manageFavicon(club_name);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);

    const actualClubName = getClubName(window.location.href);
    setClubName(actualClubName);
    manageFavicon(actualClubName);
    obtenerClubId(actualClubName).then((res) => {
      if (res?.data?.length > 0) {
        const club = res.data[0];
        setClubId(club?.id);
        document.title = club?.empresa || 'Club';
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            path="/deudores"
            element={
              <PrivateRoute required="admin">
                <Deudores />
              </PrivateRoute>
            }
          />
          <Route
            path="/deudores/:id"
            element={
              <PrivateRoute required="admin">
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
