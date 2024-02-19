import React, {useEffect, useState} from 'react';
import './search.scss'
import SearchIcon from "@mui/icons-material/Search";
import {Tab, Tabs} from "@mui/material";
import axios from "axios";
import {api_key} from "../../config/config";
import ContentItem from "../../components/contentItem/ContentItem";
import MoviePagination from "../../components/pagination/MoviePagination";

function Search(props) {
    const [type, setType] = useState(0)
    const [searchText, setSearchText] = useState('')
    const [page, setPage] = useState(1)
    const [content, setContent] = useState([])
    const [pageOfNumber, setPageOfNumber] = useState(0)

    function getSearch() {
        axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${api_key}&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
            .then((res) => {
                setContent(res.data.results)
                setPageOfNumber(res.data.total_pages)
            })
            .catch((error) => {
                    console.log(error)
                }
            )
    }

    useEffect(() => {
        getSearch()
    }, [page, type]);


    function handleKey(e) {
        if (e.key === 'Enter') {
            getSearch()
        }
    }

    return (
        <div className="search-page my-4">

            {/*search item*/}
            <div className="row">
                <div className="search-item">
                    <input type="search"
                           onKeyPress={(e) => handleKey(e)}
                           onChange={(e) => setSearchText(e.target.value)}
                           placeholder="Search..."
                           className="form-control input-container"/>
                    <button className="search-button" onClick={getSearch}>
                        <SearchIcon/>
                    </button>
                </div>
            </div>

            {/*button tabs*/}
            <div className="row">
                <Tabs className="my-3" aria-label="basic tabs example" value={type} onChange={(e, newValue) => {
                    setType(newValue)
                    setPage(1)
                }}>
                    <Tab className="text-white tab" label="Search Movies"/>
                    <Tab className="text-white tab" label="Search Series"/>
                </Tabs>
            </div>

            {/*contents*/}
            <div className="row">
                {
                    content && content.map((item) => (
                        <ContentItem key={item.id}
                                     id={item.id}
                                     title={item.title || item.name}
                                     poster_path={item.poster_path}
                                     data={item.first_air_date || item.release_date}
                                     media_type={item.type ? "tv" : "movie"}
                                     vote_avarage={item.vote_average}
                        />

                    ))
                }


                {
                    searchText && content.length === 0 &&
                    (
                        type ? <h2 className="text-white p-2">Tv series not found</h2> :
                            <h2 className="text-white p-2">Movies not found</h2>
                    )
                }
            </div>

            {
                pageOfNumber && pageOfNumber > 1 &&
                (<MoviePagination setPage={setPage} pageOfNumber={pageOfNumber}/>)
            }

        </div>
    );
}

export default Search;
