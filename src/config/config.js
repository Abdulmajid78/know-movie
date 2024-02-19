export const api_key = 'e56b7a0db342d9b48b9208462bc6f880'

export const imgPath = 'https://image.tmdb.org/t/p/w500'

export const useGenres = (selectedGenres) => {
    if (selectedGenres.length < 1) return "";
    const genreIds = selectedGenres.map((g) => g.id)
    return genreIds.reduce((acc, curr) => acc + ',' + curr)
}