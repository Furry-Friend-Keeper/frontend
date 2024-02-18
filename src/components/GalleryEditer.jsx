import { useState } from 'react';
import { Button, IconButton, styled, Snackbar, Alert, AlertTitle } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import CollectionsIcon from '@mui/icons-material/Collections';
import axios from "axios";

function GalleryEditer(props) {
    const { galleryData, keeperId, fetchData } = props
    const [ galleryContent, setGalleyContent] = useState(galleryData)
    const [galleryDelete, setGalleryDelete] = useState([]);
    const maxGallery = 8;
    const [galleryPreviews, setGalleryPreviews] = useState(Array(maxGallery).fill(''));
    const [imageGallery, setImageGallery] = useState([]);
    const [alertStatus, setAlertStatus] = useState("");
    const [messageLog, setMessageLog] = useState('')
    const [open, setOpen] = useState(false);

    const handleGalleryChange = (event, index) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const updatedPreviews = [...galleryPreviews];
            updatedPreviews[index] = e.target.result;
            setGalleryPreviews(updatedPreviews);
        };

        if (file) {
            reader.readAsDataURL(file);
            setImageGallery([...imageGallery,file])
        }
    };

    const removeImagePreview = (index) => {
        const updatedPreviews = [...galleryPreviews];
        updatedPreviews[index] = '';
        setGalleryPreviews(updatedPreviews);
    };

    const removeImageGallery = (data) => {
        console.log(galleryContent)
        setGalleyContent(galleryContent.filter(image => image !== data))
        setGalleryDelete([...galleryDelete,data])
    }

    const GalleryImageKeeper = async () => {
        const formData = new FormData();
        galleryDelete.forEach(image => {
            formData.append('delete', image)
        })
        imageGallery.forEach((preview) => {
            formData.append(`file`, preview);
        });
        if( galleryDelete.length === 0 ) {
            formData.append('delete', '')
        }
        if (imageGallery.length === 0) {
            const emptyFile = new Blob([], { type: 'application/octet-stream' });
            formData.append('file', emptyFile)
        }
        // galleryData.length === 0 ? formData.append('delete', '') : formData.append('file', null)
        await axios.patch(import.meta.env.VITE_KEEPERS_ID + keeperId + "/gallery", formData, {
            headers: { 'content-type': 'multipart/form-data' }
        }).then((res) => {
            fetchData();
            setImageGallery([])
            setGalleryPreviews(Array(maxGallery).fill(''))
            setOpen(true)
            setAlertStatus('success')
        }).catch((err) => {
            console.log(err)
            setOpen(true)
            setMessageLog(err.message)
            setAlertStatus('error')
        })
   
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

  return (
    <>
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}  anchorOrigin={{ vertical : 'top', horizontal : 'center' }} >
        <Alert onClose={handleClose} severity={alertStatus === 'success' ? 'success' : 'error'} elevation={6} >
            {alertStatus === 'success' ?
            <div>
                <AlertTitle>Success</AlertTitle>
                Successful!!!
            </div>
            :
            <div>
                <AlertTitle>Failed</AlertTitle>
                {/* Signup Failed!! Email must be unique. */}
                {messageLog}
            </div>
            }
        </Alert>
    </Snackbar>
    <div className="container pt-lg-4">
        <div className="carousel col-md-12">
            <div className="m-4">
                <div className="gallery-wrapper">
                <div className="gallery">
                    {galleryContent.map((gallery, index) => (
                        <div key={index} className="position-relative">
                            <img
                                src={import.meta.env.VITE_KEEPER_IMAGE + keeperId + "/gallery/" + gallery}
                                alt={`Preview ${index}`}
                                style={{ maxWidth: '100%', maxHeight: 'auto' }}
                            />
                            <IconButton
                                style={{ position: 'absolute', top: 0, right: 0 }}
                                onClick={() => removeImageGallery(gallery)}
                            >
                                <CloseIcon className="close-gallery" />
                            </IconButton>
                        </div>
                    ))}
                    {Array.from(Array(maxGallery-galleryContent.length),(_, index) => (
                    <div key={index} className="gallery-list">
                        <Button component="label">
                            {!galleryPreviews[index] && (
                            <div>
                                <AddPhotoAlternateIcon className="add-gallery" />
                                <VisuallyHiddenInput type="file" onChange={(e) => handleGalleryChange(e, index)} />
                            </div>
                            )}
                            {/* <AddPhotoAlternateIcon /> */}
                        </Button>

                        {galleryPreviews[index] && (
                                <div className="position-relative">
                                    <img
                                        src={galleryPreviews[index]}
                                        alt={`Preview ${index}`}
                                        style={{ maxWidth: '100%', maxHeight: 'auto' }}
                                    />
                                    <IconButton
                                        style={{ position: 'absolute', top: 0, right: 0 }}
                                        onClick={() => removeImagePreview(index)}
                                    >
                                        <CloseIcon className="close-gallery" />
                                    </IconButton>
                                </div>  ) }
                    </div>
                    ))}
                </div>
                    {/* <h4 className="error-message text-center">Image  (0/9)</h4> */}
                    <div className="text-center">
                        <Button onClick={GalleryImageKeeper} className="rounded-5 py-3 px-4 fs-6" variant="contained" size="large" color="warning" startIcon={ <CollectionsIcon />}>
                            Save Gallery
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

export default GalleryEditer