import Email from "@mui/icons-material/Email";
import Phone from "@mui/icons-material/Phone";
import Place from "@mui/icons-material/Place";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { serviceProps, ProfileProps } from "../../interfaces/common";
import { CustumButton, ServiceCard } from "..";
import bgimage from '../../assets/profil3dmodel.png'
import { useNavigate } from "react-router-dom";
import { useGetIdentity } from "@refinedev/core";

type IIdentity = {
  userid: string;
  name: string;
  email: string
};
const Profile = ({ type, name, avatar, email, services, number, adress }: ProfileProps) => {

  const navigate = useNavigate();

  const { data: user } = useGetIdentity<IIdentity>();

  return (
    <Box>
      <Stack
        direction='row'
        justifyContent='space-between'>
        <Typography fontSize={25} fontWeight={700} color="#11142D">
          {type} Profil
        </Typography>
        {type === 'My' && (
          <CustumButton
            title='Edit Profil'
            backgroundColor=''
            color=''
            handleClick={() => { navigate(`edit/${user?.userid}`) }}
          />
        )}
      </Stack>

      <Box mt="20px" borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2.5,
          }}
        >

          <img
            src={bgimage}
            width={340}
            height={320}
            alt="abstract"
          />
          <Box
            flex={1}
            sx={{
              marginTop: { sm: "58px" },
              marginLeft: { xs: "20px", md: "0px" },
            }}
          >
            <Box
              flex={1}
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              gap={2}
            >
              <img
                src={
                  avatar.length > 3
                    ? avatar
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                }
                width={78}
                height={78}
                alt="user_profile"
                style={{ borderRadius: '100%' }}
              />

              <Box
                flex={1}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                gap={3}
              >
                <Stack direction="column">
                  <Typography
                    fontSize={22}
                    fontWeight={600}
                    color="#11142D"
                  >
                    {name}
                  </Typography>
                  <Typography fontSize={16} color="#808191">
                    Administrator
                  </Typography>
                </Stack>

                <Stack direction="column" gap="30px">
                  <Stack gap="15px">
                    <Typography
                      fontSize={14}
                      fontWeight={500}
                      color="#808191"
                    >
                      Address
                    </Typography>
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      gap="10px"
                    >
                      <Place sx={{ color: "#11142D" }} />
                      <Typography
                        fontSize={14}
                        color="#11142D"
                      >
                        {adress ? adress : 'undifined'}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    gap="20px"
                    pb={4}
                  >
                    <Stack flex={1} gap="15px">
                      <Typography
                        fontSize={14}
                        fontWeight={500}
                        color="#808191"
                      >
                        Phone Number
                      </Typography>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        gap="10px"
                      >
                        <Phone sx={{ color: "#11142D" }} />
                        <Typography
                          fontSize={14}
                          color="#11142D"
                          noWrap
                        >
                          {number ? number : 'undifined'}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack flex={1} gap="15px">
                      <Typography
                        fontSize={14}
                        fontWeight={500}
                        color="#808191"
                      >
                        Email
                      </Typography>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        gap="10px"
                      >
                        <Email sx={{ color: "#11142D" }} />
                        <Typography
                          fontSize={14}
                          color="#11142D"
                        >
                          {email}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {services.length > 0 && (
        <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
          <Typography fontSize={18} fontWeight={600} color="#11142D">
            {type} Services
          </Typography>

          <Box
            mt={2.5}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2.5,
            }}
          >
            {services?.map((service: serviceProps) => (
              <ServiceCard
                key={service._id}
                id={service._id}
                expertise={service.expertise}
                title={service.title}
                photo={service.photo}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}


export default Profile;