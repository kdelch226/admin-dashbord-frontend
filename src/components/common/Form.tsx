import React from 'react';
import { Box, Typography, TextField, FormHelperText, FormControl, TextareaAutosize, Stack, Select, MenuItem, Button, InputLabel } from '@mui/material';
import { FormProps } from '../../interfaces/common';
import CustumButton from './CustumButton';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



const Form = ({ type, register, handleSubmit, formLoading, handleImageChange, onFinishHandler, serviceImage }: FormProps) => {
  const navigate=useNavigate()
  const location = useLocation();

  const handleClickCancel=()=>{
    const actualpath= location?.pathname.split('/');
    const previouspath= actualpath.slice(0,2).join('/');
    navigate(previouspath)
  }; 
  return (
    <Box>
      <Typography fontWeight={600} fontSize={22} mb={2} >
        {type} a Service
      </Typography>

      <Box borderRadius={1} p={2} bgcolor='#f5f3f4'>
        <form onSubmit={handleSubmit(onFinishHandler)} style={{ marginTop: '20px', width: '100%', gap: '15px', display: 'flex', flexDirection: 'column' }}>
          <FormControl>

            <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Service Name</FormHelperText>
            <TextField
              placeholder='title *'
              fullWidth
              required
              id='name'
              color='info'
              variant='outlined'
              {...register('title', { required: true })}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="expertiseLabel">Expertise</InputLabel>
            <Select
              defaultValue='Web Development'
              labelId="expertiseLabel"
              id="expertiseLabel"
              label="Expertise"
              {...register('expertise', { required: true })}
            >
              <MenuItem value='Web Development'>Web Development</MenuItem>
              <MenuItem value='Design and UX/UI'>Design and UX/UI</MenuItem>
              <MenuItem value='Digital Marketing'>Digital Marketing</MenuItem>
              <MenuItem value='Analytics and Data'>Analytics and Data</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <FormHelperText sx={{ fontSize: 16, m: 1, fontWeight: 500, color: 'black' }}>Description</FormHelperText>
            <TextareaAutosize
              placeholder='write a entire description of the service, it will be the same on the client app
              *'
              style={{
                background: 'transparent',
                width: '100%',
                padding: 10,
                borderColor: 'rgba(0,0,0,0.23)',
                borderRadius: 5
              }}
              minRows={5}
              id='name'
              {...register('description', { required: true })}
            />
          </FormControl>
          <Stack direction='column' gap={1} justifyContent='center' mb={2}>
            <Stack direction='row' gap={1} alignItems='center'>
              <Typography fontWeight={600} fontSize={15} m={1} >
                Service photo
              </Typography>

              <Button
                sx={{ fontSize: 15, width: 'fit-content' }}
                component="label"
                variant='outlined'
                startIcon={<CloudUploadIcon />}
              >
                Upload photo
                <input
                  hidden
                  accept='image/*'
                  type='file'
                  onChange={(e) => {

                    //@ts-ignore
                    //@ts-ignore
                    handleImageChange(e.target.files[0])
                  }
                  }
                />
              </Button>
            </Stack>
            <Typography fontWeight={500} fontSize={12} m={1} sx={{ wordBreak: 'break-all', color: '#0466c8' }}  >
              {serviceImage?.name} <InsertPhotoIcon sx={{ color: '#14213d' }} />
            </Typography>
          </Stack>

          <Stack direction='row' gap={2}>
            <CustumButton
              type='submit'
              title={formLoading ? 'is submiting' : 'submit'}
              backgroundColor='#ebdec2'
              color='#000'

            />
            <CustumButton
              type='Cancel'
              title='Cancel'
              backgroundColor='#d00000'
              color='#000'
              handleClick={handleClickCancel}
            />
          </Stack>


        </form>

      </Box>
    </Box >
  )
}

export default Form