import React, {useEffect, useState} from 'react';
import "./modal.scss"
import axios from "axios";
import {api_key, imgPath} from "../../config/config";

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Carousel from "../Carousel/Carousel";
import {useHistory} from 'react-router-dom'

import YouTubeIcon from '@mui/icons-material/YouTube';


function DetailModal({children, id, media_type}) {


    const [content, setContent] = useState({})
    const [carousel, setCarousel] = useState([])
    const [link, setLink] = useState('')
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const history = useHistory()

    function getMoreInfo() {
        axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${api_key}&language=en-US`)
            .then((res) => {
                setContent(res.data)
            }).catch((error) => {
            console.log(error)
        })
    }

    function getYoutubeLink() {
        axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${api_key}&language=en-US`)
            .then((res) => {
                setLink(res.data.results[0].key)
            }).catch((error) => {
            console.log(error)
        })
    }

    function getCarousel() {
        axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${api_key}&language=en-US`)
            .then((res) => {
                setCarousel(res.data.cast)
            }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getMoreInfo()
        getCarousel()
        getYoutubeLink()
    }, []);


    return (
        <>
            <div onClick={handleOpen} className="content-item-on-modal">
                {children}
            </div>


            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box className="box-style">
                        <div className="d-flex di-flex">
                            <div className="main-image">
                                <img className="img-fluid" src={imgPath + content.poster_path} alt={content.title}/>
                            </div>
                            <div className="w-72">
                                <div className="modal-title">
                                    {content.title || content?.name} ({content?.first_air_date?.slice(0, 4) || content?.release_date?.slice(0, 4)})
                                </div>
                                <i className="text-dark text-center d-block">{content.tagline}</i>
                                <div className="modal-overview">
                                    {content.overview}
                                </div>
                                <div className="modal-carousel">
                                    <Carousel carousel={carousel}/>
                                </div>

                                <a href={`https://www.youtube.com/watch?v=${link}`}
                                   target={"_blank"}
                                   className="youtube-btn">
                                    <YouTubeIcon/>
                                    watch the trailler
                                </a>

                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>

        </>
    );
}

export default DetailModal;