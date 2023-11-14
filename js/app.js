/* Menu toggler */
const btn_toggler = document.querySelector("#navOpenBtn")
const nav = document.querySelector("nav");
var menuNumbers=0;
function ToggleMenu(){
btn_toggler.classList.toggle('active')
if (menuNumbers == 0){
    nav.classList.add("openNav");
    menuNumbers++;
}else{
    nav.classList.remove("openNav");
    menuNumbers = 0;
}
}

const menuItems = document.querySelectorAll('.nav-links li a');
const menuSelector = document.querySelector('.menuSelector');

menuItems.forEach((item, index) => {
  item.addEventListener('click', () => {
  
    document.querySelector('.nav-links li a.active').classList.remove('active');
    

    item.classList.add('active');

    const newTop = 101 + (55 * index);
    menuSelector.style.top = `${newTop}px`;
  });
});


