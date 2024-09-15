import React, { useEffect } from 'react';
import { useGetIdentity, useOne, useUpdate } from '@refinedev/core';
import { Box, Typography, Stack, FormControl, FormHelperText, TextField } from '@mui/material';
import { useForm } from '@refinedev/react-hook-form';
import { FieldValues } from 'react-hook-form';
import { CustumButton } from '../../components';
import { useLocation, useNavigate } from 'react-router-dom';

type IIdentity = {
  id: number;
  email: string;
  userid: string;
};

const EditProfil = () => {
  const { data: user } = useGetIdentity<IIdentity>();
  const userId = user?.userid;

  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: userId,
  });
  const mydata = data?.data ?? {};

  const {
    refineCore: { onFinish },
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    refineCoreProps: {
      resource: "users",
      id:userId,
      action:'edit'
    },
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (mydata) {
      reset({
        adress: mydata.adress,
        number: mydata.number,
      });
    }
  }, [mydata, reset]);

  const onFinishHandler = async (data: FieldValues) => {
    await onFinish({
      ...data,
    });
  };

  const handleClickCancel = () => {
    const actualpath = location?.pathname.split('/');
    const previouspath = actualpath.slice(0, 2).join('/');
    navigate(previouspath);
  };

  return (
    <Box>
      <Typography fontWeight={600} fontSize={22} mb={2}>
        Edit Profile
      </Typography>

      <Box borderRadius={1} p={2} bgcolor='#f5f3f4'>
        <form
          onSubmit={handleSubmit(onFinishHandler)}
          style={{ marginTop: '20px', width: '100%', gap: '15px', display: 'flex', flexDirection: 'column' }}
        >
          <FormControl>
            <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>
              Address
            </FormHelperText>
            <TextField
              placeholder='Address *'
              fullWidth
              required
              id='adress'
              color='info'
              variant='outlined'
              {...register('adress', { required: true })}
            />
          </FormControl>

          <FormControl>
            <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>
              Phone Number
            </FormHelperText>
            <TextField
              placeholder='Number *'
              fullWidth
              required
              id='number'
              color='info'
              variant='outlined'
              {...register('number', { required: true })}
            />
          </FormControl>

          <Stack direction='row' gap={2}>
            <CustumButton
              type='submit'
              title={isSubmitting ? 'Submitting...' : 'Submit'}
              backgroundColor='#ebdec2'
              color='#000'
            />
            <CustumButton
              type='button'
              title='Cancel'
              backgroundColor='#d00000'
              color='#000'
              handleClick={handleClickCancel}
            />
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default EditProfil;
