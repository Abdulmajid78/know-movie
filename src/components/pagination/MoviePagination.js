import React from 'react';
import Pagination from '@mui/material/Pagination';

function MoviePagination({setPage, pageOfNumber=10}) {

    function handleChange(e) {
        setPage(e.target.textContent)
        window.scroll(0,0)
    }

    return (
        <div className="d-flex justify-content-center my-3">
            <Pagination
                onChange={handleChange}
                className="pagination" count={pageOfNumber} shape="rounded" color="primary"/>
        </div>
    );
}

export default MoviePagination;
