import React, {useState} from 'react';
import {imgPath} from "../../config/config";
import './contentItem.scss'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {Skeleton} from "@mui/material";
import DetailModal from "../detailModal/DetailModal";

function ContentItem({id, title, poster_path, data, media_type, vote_avarage}) {
    const [loading, setLoading] = useState(false);

    setTimeout(() => {
        setLoading(true); // Set loading to false after a certain time (simulated loading)
    }, 2000);


    return (
        <DetailModal id={id} media_type={media_type}>
            <div className="card">
                {loading ? <div className="card-header">
                        <img className="card-img-top"
                             src={poster_path ? imgPath + poster_path : '/assets/images/poster.webp'} alt={title}/>
                        <div className="overlay">
                            <PlayCircleIcon/>
                        </div>
                        <div
                            className={vote_avarage > 8 ? "vote" : vote_avarage > 6 ? "vote vote-warning" : 'vote vote-danger'}>
                            {vote_avarage <= 2 && data?.slice(0, 4) == 2024 ? 'new' : vote_avarage <= 2 && data?.slice(0, 4) != 2024 ? 'NOT RATED' : vote_avarage.toFixed(1)}
                        </div>
                    </div> :
                    <Skeleton animation="wave"
                              variant="retangle"
                              width="100%"
                              height="350px"
                              style={{border: 'none'}}

                    />}
                <div className="card-body">
                    {loading ? <div className="title">{title}</div> :
                        <Skeleton
                            animation="wave"
                            height={"50px"}
                            width={"100%"}
                            style={{margin: "auto auto 8px auto", border: 'none'}}
                        />}
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            {loading ? <div className="year"><span>HD</span></div> :
                                <Skeleton
                                    animation="wave"
                                    width={"40px"}
                                    height={"55px"}
                                    style={{border: 'none'}}
                                />}
                            {loading ? <div className="year">{data?.slice(0, 4)}</div> :
                                <Skeleton
                                    animation="wave"
                                    width={"50px"}
                                    height={"35px"}
                                    style={{border: 'none'}}
                                />
                            }
                        </div>
                        {/*<div className="duration">154m</div>*/}

                        {loading ? <div className="type">{media_type === 'tv' ? 'tv series' : "movie"}</div> :
                            <Skeleton
                                animation="wave"
                                width={"70px"}
                                height={"35px"}
                                style={{border: 'none'}}/>
                        }

                    </div>
                </div>
            </div>
        </DetailModal>
    );
}

export default ContentItem;
