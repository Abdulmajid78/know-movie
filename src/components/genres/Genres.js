import React, {useEffect, useState} from 'react';
import {Chip} from "@mui/material";
import axios from "axios";
import {api_key} from "../../config/config";

function Genres({type, genres, setGeneres, setPage, selectedGenres, setSelectedGenres}) {


    function getGenres() {
        axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${api_key}&language=en-US`)
            .then((res) => {
                setGeneres(res.data.genres)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    useEffect(() => {
        getGenres()
    }, []);

    function addGenres(item) {
        setSelectedGenres([...selectedGenres, item])
        setGeneres(genres.filter((g) => g.id !== item.id))
        setPage(1)
    }

    function handleDelete(item) {
        setGeneres([...genres, item])
        setSelectedGenres(selectedGenres.filter((g) => g.id !== item.id))
        setPage(1)
    }

    return (
        <div className="col-12 my-2">
            {selectedGenres && selectedGenres.map((item) => (
                <Chip className="m-1 text-white" key={item.id}
                      label={item.name}
                      onDelete={() => handleDelete(item)}
                      clickable
                      color={'primary'}
                />
            ))}

            {genres && genres.map((item) => (
                <Chip className="m-1 text-white" key={item.id}
                      label={item.name}
                      onClick={() => addGenres(item)}
                      clickable
                />
            ))}

        </div>
    );
}

export default Genres;