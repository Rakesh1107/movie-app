const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ea4a238360msh622beae543e8c59p1832dcjsn2fd2bdbe7a07',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

let input = document.getElementById('movie')
let error = document.getElementById('error')
let container = document.getElementById('movies')
let loader = document.getElementById('loader')

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("fetch").click();
  }
});

function getMovieInfo() {
    loader.style.display = 'block'
    let movie = document.getElementById('movie').value.trim()
    if(movie === '') {
        document.getElementById('error').textContent = 'Enter valid movie name'
        return
    }
    fetch('https://imdb8.p.rapidapi.com/auto-complete?q=' + movie, options)
	.then(response => response.json())
	.then(response => {
        loader.style.display = 'none'
        let array = response.d
        container.textContent = ''
        error.textContent = ''
        for(let i = 0; i < array.length; i++) {
            if(array[i].qid === 'movie') {
            var innerDiv = document.createElement('div')
            innerDiv.className = 'block'
            innerDiv.id = 'block-' + i+1
            
            var movieTitle = document.createElement('h3')
            movieTitle.textContent = array[i].l + ' (' + array[i].y + ')'
            movieTitle.style.display = 'block'

            var cast = document.createElement('h4')
            cast.textContent = array[i].s
            movieTitle.style.display = 'block'

            var imageDiv = document.createElement('img')
            imageDiv.style.borderRadius = '10px'
            imageDiv.style.width = '100px'
            if(array[i].i !== undefined) {
                imageDiv.setAttribute('src', array[i].i.imageUrl)
            }
            
            innerDiv.appendChild(imageDiv)
            innerDiv.append(movieTitle)
            innerDiv.append(cast)

            container.appendChild(innerDiv)
            }
        }
        
    })
	.catch(err => {
        container.textContent = ''
        error.textContent = err
    });
}