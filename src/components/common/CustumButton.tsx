import React from 'react'
import { Button } from '@mui/material';
import { CustomButtonProps } from '../../interfaces/common';

const CustumButton = ({ type, title, handleClick, backgroundColor, color, icon, fullWidth, disabled,variant }: CustomButtonProps) => {
  return (
    <Button
      disabled={disabled}
      variant={variant?variant:"contained"}
      type={type === "submit" ? "submit" : "button"}
      sx={{
        flex: fullWidth ? 1 : 'unset',
        p: '10px 15px',
        width: fullWidth ? '100%' : 'fit-content',
        height:30,
        fontSize: 16,
        gap: 1,
        '&:hover': {
          opacity: 0.8,
          backgroundColor,
          color
        }
      }}
      onClick={handleClick}>
      {icon}
      {title}
    </Button>)
}

export default CustumButton