// Mobile menu toggle
document.getElementById('mobile-toggle').addEventListener('click', () => {
  const menu = document.getElementById('mobile-menu');
  const icon = document.querySelector('#mobile-toggle i');
  menu.classList.toggle('hidden');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

// Smooth scrolling + close mobile menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    document.getElementById('mobile-menu')?.classList.add('hidden');
    // reset icon
    const icon = document.querySelector('#mobile-toggle i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

// Project Type Selection
document.querySelectorAll('.project-type').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.project-type').forEach(b => {
      b.classList.remove('border-primary', 'bg-primary/10', 'text-primary');
    });
    btn.classList.add('border-primary', 'bg-primary/10', 'text-primary');
    document.getElementById('selected-type').value = btn.dataset.value;
  });
});

// Load Services
async function loadServices() {
  const grid = document.getElementById('services-grid');
  try {
    const res = await fetch('data/services.json');
    if (!res.ok) throw new Error('Failed to load services');
    const data = await res.json();
    grid.innerHTML = '';
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'bg-white border border-gray-100 rounded-3xl overflow-hidden shadow hover:shadow-xl transition';
      card.innerHTML = `
        <img src="${item.image}" class="w-full h-56 object-cover" alt="${item.title}">
        <div class="p-6 md:p-8">
          <h3 class="font-semibold text-xl mb-3">${item.title}</h3>
          <p class="text-gray-600 text-sm md:text-base leading-relaxed">${item.description}</p>
          <a href="#quote" class="text-primary font-medium mt-6 inline-block hover:underline">Learn More →</a>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (e) {
    grid.innerHTML = '<div class="col-span-full text-center py-12 text-red-600 font-medium">Failed to load services. Please try again later.</div>';
  }
}

// Load Portfolio
async function loadPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  try {
    const res = await fetch('data/portfolio.json');
    if (!res.ok) throw new Error('Failed to load portfolio');
    const data = await res.json();
    grid.innerHTML = '';
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition';
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="w-full h-72 md:h-80 object-cover transition-transform group-hover:scale-110 duration-700">
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
          <div class="text-white">
            <h3 class="text-xl md:text-2xl font-bold">${item.title}</h3>
            <p class="text-sm md:text-base opacity-90">${item.type} • ${item.year}</p>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (e) {
    grid.innerHTML = '<div class="col-span-full text-center py-12 text-red-600 font-medium">Failed to load portfolio. Please try again later.</div>';
  }
}

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadServices();
  loadPortfolio();
});