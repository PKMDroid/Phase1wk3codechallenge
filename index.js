// DOM elements
const filmsList = Array.from(document.querySelectorAll('#films li'))
  .filter(li => !li.querySelector('button'));
const moviePanels = document.querySelectorAll('.movie-panel');

// Movie data
const movies = [
  {
    title: "Kimetsu no Yaiba: Infinity Castle Arc",
    poster: "https://danamic-media.danamic.org/danamic-production/2025/08/14042058/Demon-Slayer_-Kimetsu-no-Yaiba-Infinity-Castle-poster_Crop.jpg",
    runtime: "2h 00m",
    showtime: "7:30 PM",
    tickets_sold: 0,
    capacity: 50
  },
  {
    title: "Lilo & Stitch",
    poster: "https://resizing.flixster.com/s87zsvJvel5yt1087hVcYxpRhpc=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p28572684_v_h9_aj.jpg",
    runtime: "1h 30m",
    showtime: "5:00 PM",
    tickets_sold: 0,
    capacity: 40
  },
  {
    title: "Traumatika",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS88vBFQSiM8tem8j4HGm1LbH9cvkGb1or9Mg&s",
    runtime: "1h 45m",
    showtime: "6:45 PM",
    tickets_sold: 0,
    capacity: 1
  },
  {
    title: "Swiped",
    poster: "https://ntvb.tmsimg.com/assets/p30935942_v_h8_aa.jpg?w=1280&h=720",
    runtime: "1h 50m",
    showtime: "8:00 PM",
    tickets_sold: 0,
    capacity: 45
  },
  {
    title: "Stolen Girl",
    poster: "https://m.media-amazon.com/images/M/MV5BNDAzNzEzZTYtZTcwZi00MjBiLWIzMjEtYjljYTMyNTIzZjQzXkEyXkFqcGc@._V1_.jpg",
    runtime: "2h 10m",
    showtime: "9:00 PM",
    tickets_sold: 0,
    capacity: 30
  }
];

// Set panel background images
movies.forEach((movie, i) => {
  if (moviePanels[i]) moviePanels[i].style.backgroundImage = `url(${movie.poster})`;
});

// Update tickets display
function updateTickets(index) {
  const panel = moviePanels[index];
  const available = movies[index].capacity - movies[index].tickets_sold;
  panel.querySelector('p:nth-of-type(3)').textContent = `Available Tickets: ${available}`;

  const menuItem = filmsList[index];
  const buyButton = panel.querySelector('button');
  if (available <= 0) {
    menuItem.classList.add('sold-out');
    buyButton.textContent = 'Sold Out';
    buyButton.disabled = true;
  } else {
    menuItem.classList.remove('sold-out');
    buyButton.textContent = 'Buy Ticket';
    buyButton.disabled = false;
  }
}

// Initialize
movies.forEach((_, i) => updateTickets(i));

// Menu click
filmsList.forEach((item, i) => {
  item.addEventListener('click', () => {
    moviePanels.forEach(panel => panel.classList.remove('active'));
    if (i < moviePanels.length - 1) moviePanels[i].classList.add('active');
    else moviePanels[moviePanels.length - 1].classList.add('active');

    filmsList.forEach(li => li.classList.remove('active'));
    item.classList.add('active');
  });
});

// Buy tickets
moviePanels.forEach((panel, i) => {
  const button = panel.querySelector('button');
  if (button && i < movies.length) {
    button.addEventListener('click', () => {
      const movie = movies[i];
      if (movie.capacity - movie.tickets_sold > 0) {
        movie.tickets_sold++;
        updateTickets(i);
      }
    });
  }
});

// Request movie
const requestForm = document.getElementById('request-form');
const requestMessage = document.getElementById('request-message');
if (requestForm) {
  requestForm.addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('requested-movie').value.trim();
    if (title) {
      requestMessage.textContent = `Thanks! Your request for "${title}" has been submitted.`;
      requestForm.reset();
    }
  });
}
