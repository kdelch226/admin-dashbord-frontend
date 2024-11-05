import { useLogin } from "@refinedev/core";
import { useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ThemedTitleV2 } from "@refinedev/mui";
import logoful from '../assets/baobab full.png';
import logo from '../assets/baobab.png';


import { CredentialResponse } from "../interfaces/google";
import { Avatar, Stack } from "@mui/material";


export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        gap="36px"
        justifyContent="center"
        flexDirection="column"
      >

        <Stack
          flexDirection='row'
          alignItems='start'
          justifyContent='start'>
          <Avatar
            sx={{ width: 56, height: 56, mt: 1, mr: 1 }}
            alt="Baobad dashbord"
            src={logo}
          />
          <h3>BaoBabWeb Dashbord</h3>
        </Stack>

        <GoogleButton />

        <Typography align="center" sx={{ display: 'flex', alignItems: 'center' }} color={"text.secondary"} fontSize="12px">
          Powered by
          <Avatar
            alt="baobab web service"
            src={logo}
            sx={{ mx: 1 }}
          />
          BWS
        </Typography>
      </Box>
    </Container>
  );
};
