const key = 'b948cf200d3dc319327ab48d36a65bf2';
let currentTarget = 'popular';

const dropdowns = document.querySelectorAll('[id^=dropdown]');

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', event => {
        currentTarget = event.target.id.slice(9);
        getData();
    });
});

async function getData() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${currentTarget}?api_key=${key}`);
    data = await response.json();
    data.results.forEach((element) => 
        document.getElementById('thumbnail-grid').innerHTML += `
        <div class="col-md-2">
            <div class="card mb-4 box-shadow">
                <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" src="https://image.tmdb.org/t/p/w500/${element.poster_path}.jpg" data-holder-rendered="true">
                <div class="card-body">
                    <p class="card-text">${element.original_title}.</p>
                </div>
            </div>
        </div>`
    );
}

getData();