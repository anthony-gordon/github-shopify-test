//////////////////////////////////////// 
// Helixian general utility functions//
//////////////////////////////////////


function isVisible(elem) {
  const windowScrollY = window.scrollY;
  const { top, bottom } = elem.getBoundingClientRect();

  if (top < 0){
    return false;
  } else {
    return true;
  }
}