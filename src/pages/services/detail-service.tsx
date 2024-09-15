import React from 'react'
import { useDelete, useShow, useGetIdentity } from '@refinedev/core'
import { useParams, useNavigate } from 'react-router-dom'
import { CustumButton } from '../../components'
import { Box, Typography, Stack } from '@mui/material'
import { ChatBubble, Delete, Edit, Phone, Place } from '@mui/icons-material'
type IIdentity = {
  id: number;
  email: string
};


const DetailService = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity<IIdentity>();
  const { id } = useParams();
  const { mutate } = useDelete();
  const { queryResult } = useShow();

  const { data, isLoading, isError } = queryResult;
  const serviceDetail = data?.data ?? {}

  if (isLoading) return <Typography>Loading ...</Typography>;
  if (isError) return <Typography>Error ...</Typography>;

  const isCurrentUser = user?.email === serviceDetail?.creator?.email

  const handleDeleteProperty = () => {
    const response = confirm(
      "Are you sure you want to delete this property?",
    );
    if (response) {
      mutate(
        {
          resource: "services",
          id: id as string,
        },
        {
          onSuccess: () => {
            navigate("/services");
          },
        },
      );
    }
  };

  return (
    <Box
      borderRadius={1}
      bgcolor="#fff"
      width='fit-content'
      padding={1}
    >
      <Typography fontWeight={600} fontSize={22}>Details</Typography>
      <Box
        mt='20px'
        display='flex'
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={4}
      >
        <Box flex={1} maxWidth={764}>
          <img src={serviceDetail.photo} alt={serviceDetail.title} style={{ objectFit: 'cover', borderRadius: '10px', width: '100%' }} />
          <Box mt={2}>
            <Typography mt={2} fontWeight={500} fontSize={18} textTransform='capitalize'>
              {serviceDetail?.title}
            </Typography>
            <Typography mt={2} >
              <pre style={{whiteSpace:'pre-wrap',wordWrap:'break-word'}} >{serviceDetail?.description}</pre>
            </Typography>
            <Typography sx={{ float: 'right' }} fontWeight={600} my={2} fontSize={14}>
              {serviceDetail?.expertise}
            </Typography>
          </Box>
        </Box>

        <Box
          width="100%"
          flex={1}
          maxWidth={326}
          display="flex"
          flexDirection="column"
          gap="20px"
          sx={{position:'sticky',top:4}}
        >
          <Stack
            width="100%"
            p={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            border="1px solid #E4E4E4"
            borderRadius={2}
          >
            <Stack
              mt={2}
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <img
                src={
                  serviceDetail.creator.avatar.length > 0
                    ? serviceDetail.creator.avatar
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                }
                alt="avatar"
                width={90}
                height={90}
                style={{
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
              />

              <Box mt="15px">
                <Typography
                  fontSize={18}
                  fontWeight={600}
                  color="#11142D"
                >
                  {serviceDetail.creator.name}
                </Typography>
                <Typography
                  mt="5px"
                  fontSize={14}
                  fontWeight={400}
                  color="#808191"
                >
                  Agent
                </Typography>
              </Box>



              <Typography
                mt={1}
                fontSize={16}
                fontWeight={600}
                color="#11142D"
              >
                {serviceDetail.creator.allService.length}{" "}
                services
              </Typography>
            </Stack>

            <Stack
              width="100%"
              mt="25px"
              direction="row"
              flexWrap="wrap"
              gap={2}
            >
              <CustumButton
                title={!isCurrentUser ? "Message" : "Edit"}
                backgroundColor="#475BE8"
                color="#FCFCFC"
                fullWidth
                icon={
                  !isCurrentUser ? <ChatBubble /> : <Edit />
                }
                handleClick={() => {
                  if (isCurrentUser) {
                    navigate(
                      `/services/edit/${serviceDetail._id}`,
                    );
                  }
                }}
              />
              <CustumButton
                title={!isCurrentUser ? "Call" : "Delete"}
                backgroundColor={
                  !isCurrentUser ? "#2ED480" : "#d42e2e"
                }
                color="#FCFCFC"
                fullWidth
                icon={!isCurrentUser ? <Phone /> : <Delete />}
                handleClick={() => {
                  if (isCurrentUser) handleDeleteProperty();
                }}
              />
            </Stack>
          </Stack>

          
        </Box>
      </Box>
    </Box>
  )
}

export default DetailService