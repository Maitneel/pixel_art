(function () {
  'use strict';

  const root_div = document.getElementById('root_div');
  const height = document.getElementById('height');
  const width = document.getElementById('width');
  const create_button = document.getElementById('create_canvas');
  const canvas_select = document.getElementById('canvas_select');

  const color_setting = document.getElementById('color_setting');

  let pixel_pairent = document.createElement('div');
  pixel_pairent.className = 'pixel_pairent';
  pixel_pairent.id = 'pixle_pairent';
  let slice_y_direction = new Array();
  let y_x_pixle = new Array();


  const canvas_info = new Map();

  function create_pixel(info) {
    root_div.innerHTML = "";
    pixel_pairent.innerHTML = "";
    slice_y_direction = new Array();
    y_x_pixle = new Array();

    for (let i = 0; i < info.height; i++) {
      slice_y_direction[i] = document.createElement('div');
      slice_y_direction[i].className = 'slice_y'
      slice_y_direction[i].id = 'slice_y' + i;
      y_x_pixle[i] = new Array();
      for (let j = 0; j < info.width; j++) {
        y_x_pixle[i][j] = document.createElement('div')
        y_x_pixle[i][j].className = 'pixel';
        y_x_pixle[i][j].id = 'pixel_x' + j + 'y' + (info.height - i - 1);
        slice_y_direction[i].appendChild(y_x_pixle[i][j]);
      }
      pixel_pairent.appendChild(slice_y_direction[i]);
    }
    root_div.appendChild(pixel_pairent);
  }

  function set_canvas_info() {
    const info = {
      name: 'canvas' + canvas_info.size,
      height: height.value,
      width: width.value
    }
    return info
  }
  
  function create_select_option(canvas_name) {
    let new_option = document.createElement('option');
    new_option.id = canvas_name;
    new_option.value = canvas_name;
    new_option.innerText = canvas_name;
    new_option.selected = true;
    canvas_select.appendChild(new_option);
  }

  let canvas_name = new Array();

  create_button.addEventListener('click', function() {
    let new_canvas_name = 'canvas' + canvas_info.size
    canvas_name.push(new_canvas_name);
    canvas_info.set(new_canvas_name, set_canvas_info());
    create_select_option(new_canvas_name);
    create_pixel(canvas_info.get(new_canvas_name));
  });

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
    create_button.click();
  }
}

window.addEventListener('load', function() {
  let new_canvas_info = set_canvas_info();
  canvas_info.set(new_canvas_info.name, new_canvas_info);
  create_pixel(new_canvas_info);
})

canvas_select.addEventListener('change', function() {
  create_pixel(canvas_info.get(canvas_select.value));
}, true);

  window.addEventListener('beforeunload', function(event) {
    event.preventDefault();
  })

})();