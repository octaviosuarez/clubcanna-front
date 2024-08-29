import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Link,
  User,
} from "@nextui-org/react";
import {
  TbSunHigh,
  TbMoonFilled,
  TbUsers,
  TbBox,
  TbLogout,
  TbMenu2,
  TbBrandItch,
  TbCash,
} from "react-icons/tb";
import useStore from "../../store/useStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { capitalize } from "../../utils/functions";

const sidebarOptions = [
  {
    id: "socios",
    link: "/socios",
    icon: <TbUsers size={25} className="ml-4" />,
    required: "admin",
    description: capitalize("socios"),
  },
  {
    id: "stock",
    link: "/stock",
    icon: <TbBox size={25} className="ml-4" />,
    required: "admin",
    description: capitalize("stock"),
  },
  {
    id: "pedidos",
    link: "/pedidos",
    icon: <TbBrandItch size={25} className="ml-4" />,
    required: "admin",
    description: capitalize("pedidos"),
  },
  {
    id: "mis pedidos",
    link: "/mis-pedidos",
    icon: <TbBrandItch size={25} className="ml-4" />,
    required: "user",
    description: capitalize("mis pedidos"),
  },
  {
    id: "deudores",
    link: "/deudores",
    icon: <TbCash size={25} className="ml-4" />,
    required: "admin",
    description: capitalize("deudores"),
  },
  /*
  {
    id: "plantas",
    link: "/plantas",
    icon: <TbBrandItch size={25} className="ml-4" />,
    required: "admin",
    description: capitalize("plantas"),
  },
  */
];

const Sidebar = ({ isMobile }) => {
  const { theme, setTheme, userData, setUserData } = useStore();
  const [activeOption, setActiveOption] = useState("socios");
  const userLevel = userData?.level;
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const logoSrc = theme === "dark" ? "/logo_dark.jpg" : "/logo.jpg";

  const iconLight = <TbSunHigh size={25} />;
  const iconDark = <TbMoonFilled size={25} />;

  useEffect(() => {
    let url = window.location.pathname;
    let option = sidebarOptions.find((option) => option.link === url);
    if (option) {
      setActiveOption(option.id);
    }
  }, []);

  const handleChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleCloseSession = () => {
    setUserData(null);
    navigate("/login");
  };

  const handleNavigate = (link) => {
    setMenuOpen(false);
    navigate(link);
  };

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const sidebarOptionsFiltered = sidebarOptions.filter((option) => {
    if (userLevel === "admin") {
      return option.required === "admin";
    } else {
      return option.required === "user";
    }
  });

  const SidebarContent = () => (
    <div className="flex flex-col gap-2">
      {sidebarOptionsFiltered.map((option) => {
        const isActive = activeOption === option.id;
        return (
          <div
            onClick={() => {
              handleNavigate(option.link);
              setActiveOption(option.id);
            }}
            key={option.id}
            className={`flex items-center justify-center h-12 gap-4 rounded-lg cursor-pointer
                        ${isActive
                ? "bg-gray-300 dark:bg-gray-700"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            {option.icon}
            <Link
              onClick={() => {
                handleNavigate(option.link);
                setActiveOption(option.id);
              }}
              className={`w-full ml-4 font-semibold text-foreground-800 ${isActive ? "font-bold" : ""
                }`}
            >
              {option.description}
            </Link>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {isMobile ? (
        <>
          {/* Mobile Navbar */}
          <div className="flex items-center justify-between p-4 border-b border-gray-300 lg:hidden dark:border-gray-700">
            <User
              name={capitalize(userData?.nombre_completo)}
              description={
                userData?.level === "user" ? "Usuario" : "Administrador"
              }
              avatarProps={{
                src: logoSrc,
              }}
            />
            <Button variant="ghost" onClick={handleToggleMenu}>
              <TbMenu2 size={25} />
            </Button>
          </div>

          {/* Mobile Sidebar */}
          <div
            className={`lg:hidden fixed z-50 top-0 left-0 w-full h-[100dvh] flex-col max-h-[100dvh] bg-white dark:bg-gray-800 transition-transform transform ${menuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            <div className="flex flex-col h-[100dvh] p-4">
              <div className="flex items-center justify-between mb-4">
                <User
                  name={capitalize(userData?.nombre_completo)}
                  description={
                    userData?.level === "user" ? "Usuario" : "Administrador"
                  }
                  avatarProps={{
                    src: logoSrc,
                  }}
                />
                <Button variant="ghost" onClick={handleToggleMenu}>
                  <TbMenu2 size={25} />
                </Button>
              </div>
              <SidebarContent />
              <div className="self-end w-full mt-auto">
                <Dropdown className="w-full">
                  <DropdownTrigger>
                    <Button className="w-full" variant="bordered">
                      Opciones
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu variant="faded" aria-label="Cambio de tema">
                    <DropdownItem
                      key="theme"
                      description={`Cambiar a tema ${theme === "light" ? "oscuro" : "claro"
                        }`}
                      startContent={theme === "light" ? iconLight : iconDark}
                      onClick={handleChangeTheme}
                    >
                      Cambiar tema
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      startContent={<TbLogout size={25} />}
                      onClick={handleCloseSession}
                    >
                      Cerrar sesión
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="hidden lg:flex h-[100dvh] w-[270px] bg-structure flex-col max-h-[100dvh] border-r-1 border-r-gray-300 justify-between py-8 px-3">
          <div>
            <User
              name={capitalize(userData?.nombre_completo)}
              description={
                userData?.level === "user" ? "Usuario" : "Administrador"
              }
              className="mb-10 ml-2"
              avatarProps={{
                src: logoSrc,
              }}
            />
            <SidebarContent />
          </div>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">Opciones</Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Cambio de tema">
              <DropdownItem
                key="theme"
                description={`Cambiar a tema ${theme === "light" ? "oscuro" : "claro"
                  }`}
                startContent={theme === "light" ? iconLight : iconDark}
                onClick={handleChangeTheme}
              >
                Cambiar tema
              </DropdownItem>
              <DropdownItem
                key="logout"
                startContent={<TbLogout size={25} />}
                onClick={handleCloseSession}
              >
                Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
    </>
  );
};

export default Sidebar;
