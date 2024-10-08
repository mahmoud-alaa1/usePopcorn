# 🎬 usePopcorn - Movie Watchlist and Ratings

## Overview

usePopcorn is a movie discovery and watchlist application built with React. The app allows users to search for movies, view details, rate movies, and maintain a list of movies they have watched. The project demonstrates the use of custom hooks, component-based architecture, and local storage management in React.

## Features
- 🔍 Search Movies: Find movies by typing in the search bar, powered by the OMDB API.
- 🎥 Movie Details: View detailed information about a movie, including rating, plot, actors, and more.
- 🌟 Star Rating: Rate movies using a star rating system.
- 📝 Watched List: Keep track of movies you’ve watched, along with your personal rating.
- 🗑️ Remove from Watchlist: Remove movies from your watched list.

## Live Demo
You can explore the project on Vercel here [usePopcorn](https://usepopcorn-puce.vercel.app/)

## Screenshots
Here’s a glimpse of the usePopcorn app in action:

![image](https://github.com/user-attachments/assets/e27e792b-ed72-43c0-8183-ee58f59b85ec)
![image](https://github.com/user-attachments/assets/c9def625-ab27-4d5b-9d3b-882504ba08f4)
![image](https://github.com/user-attachments/assets/b3da6fad-7681-4964-94b4-34aad1be9e30)


## Installation
1. Clone the repository:
```
git clone https://github.com/mahmoud-alaa1/usePopcorn.git
```

2. Navigate to the project directory:
```
cd usePopcorn
```
3. Install dependencies:
```
npm install
```
4. Obtain an OMDB API key from [OMDB API](https://www.omdbapi.com/apikey.aspx)

5. Enjoy


## Technologies Used
- React: JavaScript library for building user interfaces.
- OMDB API: Movie database API for retrieving movie data.
- Custom Hooks: Encapsulation of logic into reusable hooks.
- Local Storage: Persistence of user data in the browser's local storage.
- CSS: Styling of components.

## Project Structure
```
├── public
├── src
│   ├── components
│   │   ├── NavBar.js
│   │   ├── Search.js
│   │   ├── MovieList.js
│   │   ├── MovieDetails.js
│   │   ├── WatchedMovieList.js
│   │   ├── StarRating.js
│   │   ├── Loader.js
│   ├── hooks
│   │   ├── useMovies.js
│   │   ├── useLocalStorageState.js
│   │   ├── useKey.js
│   ├── App.js
│   ├── index.css
│   └── index.js
```
## Contact
If you have any questions or suggestions, feel free to reach out to me at mahmoud.alaa.dev1@gmail.com


