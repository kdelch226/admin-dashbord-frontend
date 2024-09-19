import {
  AuthBindings,
  Authenticated,
  Refine,
} from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ThemedSiderV2,
  ThemedTitleV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import axios from "axios";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { CredentialResponse } from "./interfaces/google";

import {
  AllServices,
  CreateService,
  DetailService,
  EditService
} from "./pages/services";

import {
  AllProject,
  CreateProject,
  DetailProject,
  EditProject
} from "./pages/projets/";

import {
  EditClient,
  DetailClient,
  CreateClient,
  AllClient,
} from "./pages/clients";

import {
  EditAgent,
  DetailAgent,
  CreateAgent,
  AllAgent,
} from "./pages/agent";



import { Login } from "./pages/login";
import { parseJwt } from "./utils/parse-jwt";
import HomeIcon from '@mui/icons-material/Home';
import { Avatar, Box, Button, Typography } from "@mui/material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PortraitIcon from '@mui/icons-material/Portrait';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Logo from './assets/baobab.png'
import { Home } from "./pages";
import { Stack } from "react-bootstrap";
import { useState } from "react";
import Admina from "./pages/admina/admina";
import MyProfil from "./pages/profil/MyProfil";
import AdminaDetail from "./pages/admina/adminaDetail";
import EditProfil from "./pages/profil/EditProfil";
import AllTasks from "./pages/task/AllTasks";
import CreateTask from "./pages/task/CreateTask";
import EditTask from "./pages/task/Edit-Task";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  let userEmail = '';
  if (userString) userEmail = JSON.parse(userString).email;

  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers['X-Email-Creator'] = userEmail;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Suppression du token et redirection vers la page de login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login'; // Redirection vers la page de login

    }
    return Promise.reject(error);
  }
)
function App() {
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;
      if (profileObj) {
        const response = await fetch('http://localhost:3000/baobabapi/v1/connexion/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Email-Creator': profileObj.email },
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture
          })
        })

        const data = await response.json()
        console.log('response ', credential)
        if (response.status === 200) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: data._id
            })
          );
        }
        else {
          return Promise.reject();
        }

      }

      localStorage.setItem("token", `${credential}`);

      return {
        success: true,
        redirectTo: "/",
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };
  const [color, changeColor] = useState("#e5e5e5");
  document.body.style.backgroundColor = color;

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider("http://localhost:3000/baobabapi/v1", axiosInstance)}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={[
                {
                  name: "dashboard",
                  list: "/",
                  meta: {
                    icon: <DashboardIcon />,
                    label: "Dashboard"
                  }
                },
                {
                  name: "services",
                  list: "/services",
                  create: "/services/create",
                  edit: "/services/edit/:id",
                  show: "/services/show/:id",
                  meta: {
                    icon: <DesignServicesIcon />,
                    label: "Services"
                  }
                },
                {
                  name: "clients",
                  list: "/clients",
                  create: "/clients/create",
                  edit: "/clients/edit/:id",
                  show: "/clients/show/:id",
                  meta: {
                    icon: <PeopleAltIcon />,
                    label: "Clients"
                  }
                },
                {
                  name: "agents",
                  list: "/agents",
                  create: "/agents/create",
                  edit: "/agents/edit/:id",
                  show: "/agents/show/:id",
                  meta: {
                    icon: <HeadsetMicIcon />,
                    label: "Agents"
                  }
                },
                {
                  name: "users",
                  list: "/users",
                  show: "/users/show/:id",
                  meta: {
                    icon: <AdminPanelSettingsIcon />,
                    label: "Admins"
                  }
                },
                {
                  name: "projets",
                  list: "/projets",
                  create: "/projets/create",
                  edit: "/projets/edit/:id",
                  show: "/projets/show/:id",
                  meta: {
                    icon: <FolderCopyIcon />,
                    label: "Projets"
                  }
                },
                {
                  name: "tasks",
                  list: "/tasks",
                  create: "/tasks/create",
                  edit: "/tasks/edit/:id",
                  meta: {
                    icon: <AssignmentIcon />,
                    label: "Tasks"
                  }
                },
                {
                  name: "messages",
                  list: "/messages",
                  meta: {
                    icon: <ChatBubbleOutlineIcon />,
                    label: "Messages"
                  }
                },
                {
                  name: "my-profile",
                  list: "/my-profile",
                  edit: "/my-profil/edit:id",
                  meta: {
                    icon: <PortraitIcon />,
                    label: "My Profile"
                  }
                }
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "le5jk9-YXA4yi-BqSjKW",
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-inner"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <ThemedLayoutV2 Header={Header}

                        Sider={() => (
                          <ThemedSiderV2
                            Title={({ collapsed }) => (
                              <ThemedTitleV2
                                collapsed={collapsed}
                                icon={<HomeIcon />}
                                text="BaoBab DashBoard"
                              />)}
                            render={({ items, logout }) => {
                              return (
                                <Box>
                                  {items}
                                  {logout}
                                </Box>
                              );
                            }}
                          />
                        )}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >


                  <Route index element={<Home />} />
                  <Route path="/services">
                    <Route index element={<AllServices />} />
                    <Route path="create" element={<CreateService />} />
                    <Route path="edit/:id" element={<EditService />} />
                    <Route path="show/:id" element={<DetailService />} />
                  </Route>
                  <Route path="/clients">
                    <Route index element={<AllClient />} />
                    <Route path="create" element={<CreateClient />} />
                    <Route path="edit/:id" element={<EditClient />} />
                    <Route path="show/:id" element={<DetailClient />} />
                  </Route>
                  <Route path="/agents">
                    <Route index element={<AllAgent />} />
                    <Route path="create" element={<CreateAgent />} />
                    <Route path="edit/:id" element={<EditAgent />} />
                    <Route path="show/:id" element={<DetailAgent />} />
                  </Route>
                  <Route path="/projets">
                    <Route index element={<AllProject />} />
                    <Route path="create" element={<CreateProject />} />
                    <Route path="edit/:id" element={<EditProject />} />
                    <Route path="show/:id" element={<DetailProject />} />
                  </Route>
                  <Route path="/tasks">
                    <Route index element={<AllTasks />} />
                    <Route path="create" element={<CreateTask />} />
                    <Route path="edit/:id" element={<EditTask />} />
                  </Route>
                  <Route path="/users">
                    <Route index element={<Admina />} />
                    <Route path="show/:id" element={<AdminaDetail />} />
                  </Route>
                  {/* <Route path="/messages">
                    <Route index element={<Messages />} />
                  </Route> */}
                  <Route path="/my-profile">
                    <Route index element={<MyProfil />} />
                    <Route path="edit/:id" element={<EditProfil />} />
                  </Route>

                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-outer"
                      fallback={<Outlet />}
                    >
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
