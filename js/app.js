/* Searchbox show & hide on the header */
const search_input = document.querySelector('#search-input');
function toggleseacrhbox(){
  search_input.classList.toggle('active');
}

const btn_toggler = document.querySelector(".navOpenBtn")
const menu_open = document.querySelector(".menuresp")
const modetheme_open = document.querySelector(".modethemeresp")
const body_click = document.querySelector("body")
/* defilement menu */
function ToggleMenu() {
  btn_toggler.classList.toggle('active');
  menu_open.classList.toggle('active');
  modetheme_open.classList.toggle('active');
}


const AllSection = document.querySelectorAll('section');
AllSection.forEach((Section) => {
  Section.addEventListener('click', function(event) {
    btn_toggler.classList.remove('active');
    menu_open.classList.remove('active');
    modetheme_open.classList.remove('active'); 
  });
});

const navLinks = document.querySelectorAll('.nav-menu');
document.addEventListener('scroll', function() {
  AllSection.forEach((section) => {
    var rect = section.getBoundingClientRect();
    var topSection = rect.top;

    // Utilisez une tolérance pour considérer que la section est à la vue
    var tolerance = 200 ; // Ajustez la tolérance selon vos besoins

    if (topSection >= -tolerance && topSection <= tolerance) {
      var targetNavItem = document.querySelector(`.nav-menu a[href="#${section.id}"]`);
      navLinks.forEach((navLink) => {
        navLink.classList.remove('active');
      });
      targetNavItem.parentNode.classList.add('active');
    }
  });
});



 

const Acceuil_Section = document.querySelector('#Acceuil');
const Myheader = document.querySelector('.Myheader');

document.addEventListener('scroll', function() {
    var rect = Acceuil_Section.getBoundingClientRect();
    var top_acceuil = rect.top;

    if (top_acceuil >= -10) {
      Myheader.classList.remove('header_hide', 'header_semi_hide');
    } else if (top_acceuil >= -270 && top_acceuil <= -10) {
        Myheader.classList.add('header_hide');
    } else {
        Myheader.classList.add('header_semi_hide');
    }
});




document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-menu');

  navLinks.forEach((link, index) => {
    link.addEventListener('click', function(event) {
      navLinks.forEach(link => link.classList.remove('active'));
      this.classList.add('active');

    });
  });

  this.document.querySelector('a').click();

});


/* theme de couleur */
if (localStorage.getItem('modeSombre') === 'activé') {
  document.body.classList.add('dark');
}

// Fonction pour activer le mode sombre
function activerModeSombre() {
  document.body.classList.add('dark');
  localStorage.setItem('modeSombre', 'activé');
}

// Fonction pour désactiver le mode sombre
function desactiverModeSombre() {
  document.body.classList.remove('dark');
  localStorage.setItem('modeSombre', 'désactivé');
}

// Vérifier si le mode sombre est activé dans le local storage
if (localStorage.getItem('modeSombre') === 'activé') {
  // Mettre à jour les éléments en mode sombre
  document.querySelector("#moon-sun-img").classList.remove('sun');
  document.querySelector("#moon-sun-img").classList.add('moon');
  document.querySelector('.moon-sun').classList.remove('light');
  document.querySelector('.sun-component').style.opacity = '0';
  document.querySelector('.moon-component').style.opacity = '1';
}

function modeSwitcher() {

  document.querySelector('.moon-sun').classList.toggle('light');
  
  const moon_sun_img= document.querySelector("#moon-sun-img");

  const sunComponent = document.querySelector('.sun-component');
  const moonComponent = document.querySelector('.moon-component');
  moon_sun_img.classList.toggle('sun');
  moon_sun_img.classList.toggle('moon');
  if (sunComponent.style.opacity === '1') {
      sunComponent.style.opacity = '0';
      moonComponent.style.opacity = '1';
     
  } else {
      sunComponent.style.opacity = '1';
      moonComponent.style.opacity = '0';
  }

  document.body.classList.toggle('dark');
  const modeSombre = localStorage.getItem('modeSombre');
  if (modeSombre === 'activé') {
      localStorage.setItem('modeSombre', 'désactivé');
  } else {
      localStorage.setItem('modeSombre', 'activé');
  }
}



// Fonction pour assombrir une couleur
function darkenColor(color, percent) {
  var num = parseInt(color.slice(1), 16);
  var amt = Math.round(2.55 * percent);
  var r = (num >> 16) - amt;
  var g = (num >> 8 & 0x00FF) - amt;
  var b = (num & 0x0000FF) - amt;

  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

// Fonction pour mettre à jour la couleur du thème
function updateThemeColor(selectedColor) {
  var darkerColor = darkenColor(selectedColor, 20);
  document.documentElement.style.setProperty('--skin--color1', selectedColor);
  document.documentElement.style.setProperty('--skin--color2', darkerColor);
  document.getElementById('stylecolor').style.color = selectedColor;
}

// Vérifier si le mode sombre est activé
var modeSombre = localStorage.getItem('modeSombre') === 'activé';

// Fonction pour gérer le changement de mode
function toggleMode() {
  modeSombre = !modeSombre;
  localStorage.setItem('modeSombre', modeSombre ? 'activé' : 'désactivé');

  if (modeSombre) {
      // Mettez ici les styles pour le mode sombre
      document.body.classList.add('dark-mode');
      document.getElementById('stylecolor').style.color = '#ffffff';
  } else {
      // Mettez ici les styles pour le mode clair
      document.body.classList.remove('dark-mode');
      updateThemeColor(localStorage.getItem('lastSelectedColor'));
  }
}


document.addEventListener('DOMContentLoaded', function() {
  // Récupérez les couleurs du root
  const color1 = getComputedStyle(document.documentElement).getPropertyValue('--skin--color1').trim();
  const color2 = getComputedStyle(document.documentElement).getPropertyValue('--skin--color2').trim();

  // Mettez les couleurs dans le stockage local
  localStorage.setItem('color1', color1);
  localStorage.setItem('color2', color2);

  // Récupérez l'élément input de couleur
  const styleColorInput = document.getElementById('stylecolor');


  styleColorInput.value = color1;

  styleColorInput.addEventListener('input', function() {
    const newColor = this.value;
    const currentColor1 = localStorage.getItem('color1');
    const currentColor2 = localStorage.getItem('color2');

    if (newColor !== currentColor1) {

      document.documentElement.style.setProperty('--skin--color1', newColor);

      // Mettez à jour color2 en conséquence
      const colorDiff = colorDiffBrightness(currentColor1, newColor);
      document.documentElement.style.setProperty('--skin--color2', colorDiff);
      localStorage.setItem('color1', newColor);
      localStorage.setItem('color2', colorDiff);
    } else {
      const lighterColor = lightenColor(newColor, 20);
      document.documentElement.style.setProperty('--skin--color2', lighterColor);
      localStorage.setItem('color2', lighterColor);
    }
  });


function colorDiffBrightness(color1, color2) {
  const tcColor1 = tinycolor(color1);
  const tcColor2 = tinycolor(color2);

  const diffColor = tcColor1.darken().toString();

  return diffColor;
}


function lightenColor(color, percent) {
  const tcColor = tinycolor(color);

  // Calculer une couleur plus claire
  const lighterColor = tcColor.lighten(percent).toString();

  return lighterColor;
}

});


/* card3d */
$(document).ready(function() {
  const cards = document.querySelectorAll(".card3d");
  
  cards.forEach(card => {
      const boundingBox = card.getBoundingClientRect();
      const centerX = boundingBox.left + boundingBox.width / 4;
      const centerY = boundingBox.top + boundingBox.height / 4;

      card.addEventListener("mousemove", e => {
          const { pageX, pageY } = e;
          const [diffX, diffY] = [centerX - pageX, centerY - pageY];
          card.style.transform = `translateZ(-40px) rotateX(${diffY / 65}deg) rotateY(${-diffX / 65}deg)`;
      });
  });
});


