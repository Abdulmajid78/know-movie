import React from 'react';
import {imgPath} from "../../config/config";
import './contentItem.scss'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

function ContentItem({id, title, poster_path, data, media_type, vote_avarage}) {
    return (
        <div className="col-25 content-item">
            <div className="card">
                <div className="card-header">
                    <img className="card-img-top" src={poster_path ? imgPath + poster_path: '/assets/images/poster.webp'} alt={title}/>
                    <div className="overlay">
                        <PlayCircleIcon/>
                    </div>
                    <div className={vote_avarage > 8 ? "vote" : vote_avarage > 6 ? "vote vote-warning":'vote vote-danger'}>
                        {vote_avarage<=2 ? 'new': vote_avarage.toFixed(1)}
                    </div>
                </div>
                <div className="card-body">
                    <div className="title">
                        {title}
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="year"><span>HD</span> {data.slice(0, 4)}</div>
                        {/*<div className="duration">154m</div>*/}
                        <div className="type">{media_type === 'tv' ? 'tv series' : "movie"}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentItem;
