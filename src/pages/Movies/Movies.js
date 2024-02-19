import React, {useEffect, useState} from 'react';
import './movies.scss'
import ContentItem from "../../components/contentItem/ContentItem";
import MoviePagination from "../../components/pagination/MoviePagination";
import axios from "axios";
import {api_key, useGenres} from "../../config/config";
import Genres from "../../components/genres/Genres";

function Movies(props) {

    const [content, setContent] = useState([])
    const [page, setPage] = useState(1)
    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])

    const [pageOfNumber, setPageOfNumber] = useState([])
    const genreForUrl = useGenres(selectedGenres)


    function getMovies() {

        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForUrl}`)
            .then((res) => {
                setPageOfNumber(res.data.total_pages)
                setContent(res.data.results)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getMovies()
    }, [page, genreForUrl]);


    return (
        <div className="container movies-container">
            {/*title*/}
            <div className="row">
                <div>
                    <h1>discover movies</h1>
                </div>
            </div>

            {/*genres*/}
            <div className="row">
                <Genres type="movie" genres={genres} setGeneres={setGenres}
                        setPage={setPage} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}/>
            </div>

            {/*content*/}
            <div className="row">
                {/*<marquee behavior="alternate" scrollamount="20" direction="right" >Assalomu alekun akala</marquee>*/}
                {
                    content && content.map((item) => (
                        <ContentItem key={item.id}
                                     id={item.id}
                                     title={item.title || item.name}
                                     poster_path={item.poster_path}
                                     data={item.first_air_date || item.release_date}
                                     media_type={"movie"}
                                     vote_avarage={item.vote_average}
                        />

                    ))
                }
            </div>

            {/*<MoviePagination setPage={setPage} pageOfNumber={pageOfNumber}/>*/}
            {
                pageOfNumber == 1 ? '' : <MoviePagination setPage={setPage} pageOfNumber={pageOfNumber}/>
            }
        </div>
    );
}

export default Movies;
