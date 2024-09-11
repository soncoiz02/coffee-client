import { Modal, Stack, styled } from "@mui/material";
import { CONSTANTS } from "../../constants";

export const CustomModal = styled(Modal)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    backdropFilter: 'blur(5px)',
    '& .MuiModal-backdrop': {
        background: 'none'
    }
}))

export const CustomContentModal = styled(Stack)(({ theme }) => ({
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    boxShadow: CONSTANTS.CUSTOM_STYLE_PROPERTY.boxShadow,
    borderRadius: '10px',
    outline: 'none',
    border: 'none'
}))