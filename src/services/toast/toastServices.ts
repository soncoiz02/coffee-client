import { Bounce, toast } from 'react-toastify';

const baseOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
}

const success = (message: string, ...options: any) => {
    return toast.success(message, { baseOptions, ...options })
}

const error = (message: string, ...options: any) => {
    return toast.error(message, { baseOptions, ...options })
}

export const toastServices = {
    success,
    error
}