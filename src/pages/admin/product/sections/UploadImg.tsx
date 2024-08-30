import { faImage, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Button, Stack, styled, Typography, useTheme } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { toastServices } from '../../../../services/toast/toastServices'

const UploadWrapper = styled(Stack)(({ theme }) => ({
    height: '200px',
    padding: '14px',
    borderRadius: '16px',
    background: 'none',
    border: `3px dashed ${theme.palette.primary.main}`
}))

const UploadImg = () => {
    const [previewImg, setPreviewImg] = useState<string>()
    const theme = useTheme()

    const handlePreviewFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = (e.target as any).files[0]
        if (file) {
            if (file.size > 3145728) {
                return toastServices.error('Vui lòng giảm kích thước ảnh')
            }
            const reader = new FileReader()
            reader.onload = () => {
                setPreviewImg(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <Stack alignItems='center'>
            {
                previewImg ?
                    <Stack sx={{ width: { xs: '100%', md: '320px' } }} justifyContent='center' alignItems='center' gap={2}>
                        <Avatar sx={{
                            width: '100%',
                            height: '280px'
                        }} src={previewImg} variant='rounded' />
                        <input style={{ display: 'none' }} type="file" accept='.png, .jpeg, .jpg' id='upload-file' onChange={handlePreviewFile} />
                        <Button variant="contained" component='label' htmlFor='upload-file' startIcon={<FontAwesomeIcon icon={faUpload} />}>Tải ảnh lên</Button>
                    </Stack>
                    :
                    <UploadWrapper sx={{ width: { xs: '100%', md: '320px' } }} justifyContent='center' alignItems='center'>
                        <FontAwesomeIcon color={theme.palette.text.secondary} fontSize='40px' icon={faImage} />
                        <Typography color='text.secondary' variant='body2' textAlign='center' marginTop={1} marginBottom={2}> *.jpg, *.jpeg, *.png và kích thước &lt; 3MB</Typography>
                        <input style={{ display: 'none' }} type="file" accept='.png, .jpeg, .jpg' id='upload-file' onChange={handlePreviewFile} />
                        <Button variant="contained" component='label' htmlFor='upload-file' startIcon={<FontAwesomeIcon icon={faUpload} />}>Tải ảnh lên</Button>
                    </UploadWrapper>
            }
        </Stack>
    )
}

export default UploadImg