const API_URL = 'https://raw.githubusercontent.com/getmanfred/codechallenges/main/vue/movies.json';
export default class MovieService {
    public async getMovies() {
        const movies = await fetch(API_URL);
        return movies.status === 200 ? movies.json() : [];
    }
}

