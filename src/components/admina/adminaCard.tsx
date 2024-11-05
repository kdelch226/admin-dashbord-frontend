import React from 'react';
import { AgentCardProp, InfoBarProps } from '../../interfaces/agent';
import { Link } from 'react-router-dom';
import { useGetIdentity } from '@refinedev/core';
import { Box, Typography, Stack } from '@mui/material';
import { EmailOutlined, Phone,PinDrop } from '@mui/icons-material';
type IIdentity = {
  id: number;
  email: string
};

const InfoBar = ({ icon, name }: InfoBarProps) => (
  <Stack
    flex={1}
    minWidth={{ xs: "100%", sm: 300 }}
    gap={1.5}
    direction="row"
  >
    {icon}
    <Typography fontSize={14} color="#808191">
      {name?name:'undifined'}
    </Typography>
  </Stack>
);
const AdminaCard = ({ id, name, email, number, avatar,adress }: AgentCardProp) => {

  const { data: currentUser } = useGetIdentity<IIdentity>()

  const LinkAdminDetail = () => {
    const link = currentUser?.email === email ? '/my-profile' : `/users/show/${id}`;
    return link;
  }

  return (
    <Box
      component={Link}
      to={LinkAdminDetail()}
      width="100%"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: "20px",
        padding: "20px",
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176,176,176,0.1)",
        },
      }}
    >
      <img
        src={
          avatar.length > 0
            ? avatar
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
        }
        alt="user"
        width={90}
        height={90}
        style={{ borderRadius: 8, objectFit: "cover" }}
      />
      <Stack
        direction="column"
        justifyContent="space-between"
        flex={1}
        gap={{ xs: 4, sm: 2 }}
      >
        <Stack
          gap={2}
          direction="row"
          flexWrap="wrap"
          alignItems="center"
        >
          <Typography fontSize={22} fontWeight={600} color="#11142d">
            {name}
          </Typography>
          <Typography fontSize={14} color="#808191">
            companie Administrator
          </Typography>
        </Stack>
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <InfoBar
            icon={<EmailOutlined sx={{ color: "#808191" }} />}
            name={email}
          />

          <InfoBar
            icon={<PinDrop sx={{ color: "#808191" }} />}
            name={adress}
          />

          <InfoBar
            icon={<Phone sx={{ color: "#808191" }} />}
            name={number}
          />
        </Stack>
      </Stack>
    </Box>
  )
}

export default AdminaCard