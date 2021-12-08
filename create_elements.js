(function () {
  'use strict';

  const root_div = document.getElementById('root_div');
  const height = document.getElementById('height');
  const width = document.getElementById('width');
  const update_button = document.getElementById('update');

  const color_setting = document.getElementById('color_setting');

  let pixel_pairent = document.createElement('div');
  pixel_pairent.className = 'pixel_pairent';
  pixel_pairent.id = 'pixle_pairent';
  let slice_y_direction = new Array();
  let y_x_pixle = new Array();


  function create_pixel() {
    root_div.innerHTML = "";
    pixel_pairent.innerHTML = "";
    slice_y_direction = new Array();
    y_x_pixle = new Array();

    for (let i = 0; i < height.value; i++) {
      slice_y_direction[i] = document.createElement('div');
      slice_y_direction[i].className = 'slice_y'
      slice_y_direction[i].id = 'slice_y' + i;
      y_x_pixle[i] = new Array();
      for (let j = 0; j < width.value; j++) {
        y_x_pixle[i][j] = document.createElement('div')
        y_x_pixle[i][j].className = 'pixel';
        y_x_pixle[i][j].id = 'pixel_x' + i + 'y' + j;
        slice_y_direction[i].appendChild(y_x_pixle[i][j]);
      }
      pixel_pairent.appendChild(slice_y_direction[i]);
    }
    root_div.appendChild(pixel_pairent);
  }
  create_pixel();
  
  update_button.onclick = () => {
    create_pixel();
  }

/*
  let color = new Array();
  let input_color = new Array();
  for (let i = 0; i < 10; i++) {
    color[i] = document.createElement('div');
    color[i].className = 'color_pixel';
    color[i].id = 'color_div' + i;
    input_color[i] = document.createElement('input');
    input_color[i].type = 'color';
    input_color[i].id = 'input_color' + i;
    color[i].appendChild(input_color[i]);
    color[i].onclick = () => {
      input_color[i].focus();
    }
    color_setting.appendChild(color[i]);

  }
//*/


height.onkeydown = (event) => {
  if (event.key == 'Enter') {
    width.focus();
  }
}

width.onkeydown = (event) => {
  if (event.key == 'Enter') {
    update_button.onclick();
  }
}



})();