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
} from "./pages/projects";

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
import { registerLicense } from '@syncfusion/ej2-base';
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
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventIcon from '@mui/icons-material/Event';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { Home } from "./pages";
import { useState } from "react";
import Admina from "./pages/admina/admina";
import MyProfil from "./pages/profil/MyProfil";
import AdminaDetail from "./pages/admina/adminaDetail";
import EditProfil from "./pages/profil/EditProfil";
import AllTasks from "./pages/task/AllTasks";
import CreateTask from "./pages/task/CreateTask";
import EditTask from "./pages/task/Edit-Task";
import DetailTask from "./pages/task/Detail-Task";
import Calendar from "./pages/event/Calendar";
import DetailEvent from "./pages/event/detail-event";
import AdsClickIcon from '@mui/icons-material/AdsClick';
import Activities from "./pages/activities/Activities";
import ActivitiesDetails from "./pages/activities/activitiesDetails";
import JournalLog from "./pages/journalLog/JournalLog";
import JournaLogDetails from "./pages/journalLog/journalLogDetails";
import AllTransaction from "./pages/transactions/AllTransaction";
import CreateTransaction from "./pages/transactions/CreateTransaction";
import AllObjective from "./pages/objective/AllObjective";
import CreateObjective from "./pages/objective/CreateObjective";
import EditObjective from "./pages/objective/EditObjective";
import CreateAdmina from "./pages/admina/CreateAdmina";


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
registerLicense('ORg4AjUWIQA/Gnt2UlhhQlVMfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5adEBjW3tZdH1VQ2hf');

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
                  name: "projects",
                  list: "/projects",
                  create: "/projects/create",
                  edit: "/projects/edit/:id",
                  show: "/projects/show/:id",
                  meta: {
                    icon: <FolderCopyIcon />,
                    label: "Projects"
                  }
                },
                {
                  name: "transactions",
                  list: "/transactions",
                  create: "/transactions/create",
                  edit: "/transactions/edit/:id",
                  show: "/transactions/show/:id",
                  meta: {
                    icon: <MonetizationOnIcon />,
                    label: "Transactions"
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
                  name: "events",
                  list: "/events",
                  create: "/events/create",
                  edit: "/events/edit/:id",
                  meta: {
                    icon: <EventIcon />,
                    label: "Events"
                  }
                },
                {
                  name: "objectives",
                  list: "/objectives",
                  create: "/objectives/create",
                  edit: "/objectives/edit/:id",
                  meta: {
                    icon: <AdsClickIcon />,
                    label: "Objectives"
                  }
                },
                {
                  name: "activities",
                  list: "/activities",
                  show: "/activities/show/:id",
                  meta: {
                    icon: <EditNoteIcon />,
                    label: "Activities"
                  }
                },
                {
                  name: "journalLogs",
                  list: "/journalLogs",
                  show: "/journalLogs/show/:id",
                  meta: {
                    icon: <ConnectWithoutContactIcon />,
                    label: "journalLogs"
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
                        <Box >
                          <Outlet />
                        </Box>
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
                  <Route path="/projects">
                    <Route index element={<AllProject />} />
                    <Route path="create" element={<CreateProject />} />
                    <Route path="edit/:id" element={<EditProject />} />
                    <Route path="show/:id" element={<DetailProject />} />
                  </Route>
                  <Route path="/transactions">
                    <Route index element={<AllTransaction />} />
                    <Route path="create/:type/:entity?/:entityName?/:entityID?" element={<CreateTransaction />} />
                    <Route path="edit/:id" element={<EditProject />} />
                    <Route path="show/:id" element={<DetailProject />} />
                  </Route>
                  <Route path="/tasks">
                    <Route index element={<AllTasks />} />
                    <Route path="create/:projectId?/:eventId?" element={<CreateTask />} />
                    <Route path="show/:id" element={<DetailTask />} />
                    <Route path="edit/:id" element={<EditTask />} />
                  </Route>
                  <Route path="/events">
                    <Route index element={<Calendar />} />
                    <Route path="show/:id" element={<DetailEvent />} />
                  </Route>
                  <Route path="/objectives">
                    <Route index element={<AllObjective />} />
                    <Route path="create" element={<CreateObjective />} />
                    <Route path="edit/:id" element={<EditObjective />} />
                  </Route>
                  <Route path="/activities">
                    <Route index element={<Activities />} />
                    <Route path="show/:id" element={<ActivitiesDetails />} />
                  </Route>
                  <Route path="/journalLogs">
                    <Route index element={<JournalLog />} />
                    <Route path="show/:id" element={<JournaLogDetails />} />
                  </Route>
                  <Route path="/users">
                    <Route index element={<Admina />} />
                    <Route path="show/:id" element={<AdminaDetail />} />
                    <Route path="create" element={<CreateAdmina />} />
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
