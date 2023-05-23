export interface IMovie {
    title: string;
    minAge: number;
}

export function availableMovies(movies: IMovie[], age: number): IMovie[] {
    const allowedMovies = movies.filter((movie) => {
        return movie.minAge < age;
    });

    return allowedMovies;
}
