import React, {useEffect, useState} from 'react';
import './Trending-module.scss'
import axios from "axios";
import {api_key} from "../../config/config";
import ContentItem from "../../components/contentItem/ContentItem";
import MoviePagination from "../../components/pagination/MoviePagination";


function Trending(props) {
    const [content, setContent] = useState([])
    const [page, setPage] = useState(1)

    // const [pageOfNumber, setPageOfNumber] = useState([])


    function getTrending() {
        axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}&page=${page}`)
            .then((res) => {
                // setPageOfNumber(res.data.total_pages)
                setContent(res.data.results)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getTrending()
    }, [page]);


    return (
        <div className="container tranding-container">
            {/*title*/}
            <div className="row">
                <div>
                    <h1>trendings today</h1>
                </div>
            </div>

            {/*content*/}
            <div className="row">
                {
                    content && content.map((item) => (
                        <ContentItem key={item.id}
                                     id={item.id}
                                     title={item.title || item.name}
                                     poster_path={item.poster_path}
                                     data={item.first_air_date || item.release_date}
                                     media_type={item.media_type}
                                     vote_avarage={item.vote_average}
                        />

                    ))
                }
            </div>

            <MoviePagination setPage={setPage}/>
        </div>
    );
}

export default Trending;
