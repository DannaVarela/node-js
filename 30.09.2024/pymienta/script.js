const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let scrollAmount = 0;
const cardWidth = document.querySelector('.promo-card').offsetWidth + 30; // Width of card + margin

nextBtn.addEventListener('click', () => {
  carousel.scrollBy({
    left: cardWidth,
    behavior: 'smooth'
  });
});

prevBtn.addEventListener('click', () => {
  carousel.scrollBy({
    left: -cardWidth,
    behavior: 'smooth'
  });
});

function includeHTML() {
  let elements = document.querySelectorAll('[data-include]');
  elements.forEach(function(el) {
    let file = el.getAttribute("data-include");
    fetch(file)
      .then(response => {
        if (response.ok) return response.text();
        throw new Error('Error loading file ' + file);
      })
      .then(data => el.innerHTML = data)
      .catch(err => console.error(err));
  });
}

window.onload = includeHTML;

