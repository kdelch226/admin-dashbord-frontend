import { Button } from '@mui/material'
import React from 'react'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

type addButton ={
  onClick:()=>void
}

const KanBanAddNewCard = ({onClick}:addButton) => {
  return (
    <Button
      sx={{width:'150px'}}
      variant="outlined"
      startIcon={<AddCircleOutlineOutlinedIcon/> }
      onClick={onClick}
    >
      Add Task
    </Button>
  )
}

export default KanBanAddNewCard