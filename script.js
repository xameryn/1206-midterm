const key = 'b948cf200d3dc319327ab48d36a65bf2';
let currentMedia = 'movie';
let currentCategory = 'popular';

const validSelections = ['movie', 'tv', 'popular', 'top_rated', 'upcoming', 'on_the_air'];
const genres = {
    'movie': {
        '28': 'Action',
        '12': 'Adventure',
        '16': 'Animation',
        '35': 'Comedy',
        '80': 'Crime',
        '99': 'Documentary',
        '18': 'Drama',
        '10751': 'Family',
        '14': 'Fantasy',
        '36': 'History',
        '27': 'Horror',
        '10402': 'Music',
        '9648': 'Mystery',
        '10749': 'Romance',
        '878': 'Science Fiction',
        '10770': 'TV Movie',
        '53': 'Thriller',
        '10752': 'War',
        '37': 'Western'
    },
    'tv': {
        '10759': 'Action & Adventure',
        '16': 'Animation',
        '35': 'Comedy',
        '80': 'Crime',
        '99': 'Documentary',
        '18': 'Drama',
        '10751': 'Family',
        '10762': 'Kids',
        '9648': 'Mystery',
        '10763': 'News',
        '10764': 'Reality',
        '10765': 'Sci-Fi & Fantasy',
        '10766': 'Soap',
        '10767': 'Talk',
        '10768': 'War & Politics',
        '37': 'Western'
    }
    
}

const mediaPills = document.querySelectorAll('[id^=pill_media-]');
const categoryPills = document.querySelectorAll('[id^=pill_category-]');

mediaPills.forEach(pill => {
    console.log(pill);
    pill.addEventListener('click', event => {
        if (!validSelections.includes(event.target.parentElement.id.replace(/^.*-/, ''))) {return};
        if (event.target.parentElement.id.replace(/^.*-/, '') == currentMedia) {return}
        currentMedia = event.target.parentElement.id.replace(/^.*-/, '');
        document.getElementById('thumbnail-grid').innerHTML = event.target.innerHTML;
        if (currentMedia == 'tv') {
            if (currentCategory == 'upcoming') {currentCategory = 'on_the_air'};
            document.getElementById('pill_category-upcoming').id = 'pill_category-on_the_air';
            document.getElementById('pill_category-on_the_air').children[0].innerHTML = 'Airing';
        }
        else {
            if (currentCategory == 'on_the_air') {currentCategory = 'upcoming'};
            document.getElementById('pill_category-on_the_air').id = 'pill_category-upcoming';
            document.getElementById('pill_category-upcoming').children[0].innerHTML = 'Upcoming';
        }
        getData();
    });
});

categoryPills.forEach(pills => {
    pills.addEventListener('click', event => {
        if (!validSelections.includes(event.target.parentElement.id.replace(/^.*-/, ''))) {return};
        currentCategory = event.target.parentElement.id.replace(/^.*-/, ''); // remove 'pill-'
        getData();
    });
});

function generateDetails() {
    document.querySelectorAll('[id^=button-]').forEach(button => {
        button.addEventListener('click', event => {
            let targetMedia = data.results.find(element => element.id == event.target.id.replace(/^.*-/, ''))
            document.getElementById('mediaModalLabel').innerHTML = `${currentMedia == 'movie' ? targetMedia.title : targetMedia.name} - ${(currentMedia == 'movie' ? targetMedia.release_date : targetMedia.first_air_date).replace(/-.*/, '')}`;
            document.getElementById('mediaModalBody').innerHTML = targetMedia.overview ? targetMedia.overview : 'No overview available';
            document.getElementById('mediaModalFooter').innerHTML = '';
            targetMedia.genre_ids.forEach(genre => {
                document.getElementById('mediaModalFooter').innerHTML += `${genres[currentMedia][genre]}, `;
            });
            document.getElementById('mediaModalFooter').innerHTML = document.getElementById('mediaModalFooter').innerHTML.replace(/, $/, ''); // remove final comma
        });
    });
}

async function getData() {
    const response = await fetch(`https://api.themoviedb.org/3/${currentMedia}/${currentCategory}?api_key=${key}`);
    data = await response.json();
    document.getElementById('thumbnail-grid').innerHTML = '' // clear the grid
    data.results.forEach((element) => 
        document.getElementById('thumbnail-grid').innerHTML += `
        <div class="col-md-2">
            <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" src="https://image.tmdb.org/t/p/w500/${element.poster_path}.jpg" data-holder-rendered="true">
            <button class="button-details" data-bs-toggle="modal" data-bs-target="#mediaModal" id="button-${element.id}"></button>
            <p class="card-text">${element.title != undefined ? element.title : element.name}</p>
        </div>`
    );
    generateDetails()
}

getData();