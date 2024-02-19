import React from 'react';

function MovieHeader(props) {
    return (
        <div onClick={()=>window.scroll(0,0)} className="container-fluid header-background">
            <div className="row py-3">
                <h1 className="text-center">Movie Flicks</h1>
            </div>

        </div>
    );
}

export default MovieHeader;