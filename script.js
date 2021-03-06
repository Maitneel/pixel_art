(function() {
  'use strict';
  
  const height = document.getElementById('height');
  const width = document.getElementById('width');
  const create_button = document.getElementById('create_canvas');
  const canvas_select = document.getElementById('canvas_select')

  const color_input = document.getElementById('color_input');
  const color_palette_root = document.getElementById('color_palette_root');

  let color_div;
  let input_color;
  let choicing_color_index = 0;


  let canvas_data = new Map();
  let canvas_index = 0;

  function create_canvas_date() {
  let new_canvas = new Array(height.value);
    for (let i = 0; i < height.value; i++) {
      new_canvas[i] = new Array(width.value);
      for (let j = 0; j < width.value; j++) {
        new_canvas[i][j] = null;
      }
    }
    console.log(new_canvas)
    return new_canvas;
  }

  

  


  
  function get_pixel() {
    color_div = new Array();
    input_color = new Array();
    for (let i = 0; i < 10; i++) {
      color_div[i] = document.getElementById('color_div' + i);
      input_color[i] = document.getElementById('input_color' + i);
      color_div[i].onclick = () => {
        choicing_color_index = i;
        console.log('color pushed ' + i);
      }
      color_div[i].ondblclick = () => {
        console.log('dblclick');
        input_color[i].focus();
        // input_color[i].dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
        
      }
    }
  }

  let choosing_color = "#ffffff";

  let pixel;
  function create_canvas(canvas_size) {
    let height = canvas_size.height;
    let width = canvas_size.width;
    pixel = new Array();
    for (let i = 0; i < height; i++) {
      pixel[i] = new Array();
      for (let j = 0; j < width; j++) {
        pixel[i][j] = document.getElementById('pixel_x' + j + 'y' + (height - i - 1));
        pixel[i][j].onclick = () => {
          // console.log(input_color[choicing_color_index].value)
          pixel[i][j].style.backgroundColor = choosing_color;
          canvas_data.get(canvas_select.value)[i][j] = choosing_color;
        }
      }
    }
  }
  



  function create_color_palette_pixel(color_value, id) {
    let color = document.createElement('div')
    color.className = 'color_palette_pixel';
    color.id = 'color' + id;
    color.style.backgroundColor = color_value;
    return color;
  }

  let color_list = new Array();
  color_list[0] = new Array();

  let color_palette_div = new Array()
  let color_palette_slice = new Array();
  let choosing_index = {i: 0, j: 0};

  // when choose color(input), append color palette
  function append_color(color) {
    let i, j;
    i = color_list.length - 1;
    console.log(color_list.length + ' ' + color_list[i].length)
    console.log((color_list.length === 1 ) + ' ' + ( color_list[i].length === 0))
    if (color_list[i].length === 10 || (color_list.length === 1 && color_list[i].length === 0)) {
      console.log('append func')
      color_palette_root.style.borderWidth = '1px';
      if (color_list[i].length !== 0) {
        i += 1;
      }
      color_list[i] = new Array();
      color_palette_div[i] = new Array();
      color_palette_slice[i] = document.createElement('div');
      color_palette_slice[i].className = 'color_palette_slice_y';
      color_palette_slice[i].id = 'color_palette_slice_y' + i;
      for (let j = 0; j < 10; j++) {
        color_palette_div[i][j] = document.createElement('div');
        color_palette_div[i][j].className = 'color_palette_pixel';
        color_palette_div[i][j].id = 'color_' + i + '_' + j;
        color_palette_div[i][j].onclick = () => {
          console.log(choosing_index)
          choosing_color = color_palette_div[i][j].style.backgroundColor;
          color_palette_div[choosing_index.i][choosing_index.j].style.borderColor = "#666666";
          // console.log(color_palette_div[choosing_index.i][choosing_index.j].style.)
          color_palette_div[i][j].style.borderColor = '#ffffff';
          choosing_index.i = i;
          choosing_index.j = j;
          console.log(choosing_index)
        }

        color_palette_slice[i].appendChild(color_palette_div[i][j]);
      }
      color_palette_root.appendChild(color_palette_slice[i]);
    }
    j = color_list[i].length
    color_list[i][j] = color;
    console.log('i: ' + i + ' j: ' + j);
    console.log(color_palette_div)
    color_palette_div[i][j].style.backgroundColor = color;
    color_palette_div[i][j].onclick();
  }

  let canvas_size = new Map();

  function set_canvas_color(canvas) {
    for (let i = 0; i < pixel.length; i++) {
      for (let j = 0; j < pixel[i].length; j++) {
        pixel[i][j].style.backgroundColor = canvas[i][j];
      }
    }
  }


  color_input.onchange = (event) => {
    console.log('changed: ' + event.target.value)
    // color_palette_root.style.backgroundColor = event.target.value;
    append_color(event.target.value);
    choosing_color = event.target.value;
  }

  window.addEventListener('load', function() {
    canvas_size.set(canvas_select.value, {
      height: height.value,
      width: width.value
    });
    canvas_data.set(canvas_select.value, create_canvas_date());
    console.log('canvas')
    console.log(canvas_data);
    create_canvas(canvas_size.get(canvas_select.value));
  })


  create_button.addEventListener('click', function() {
    canvas_size.set(canvas_select.value, {
      height: height.value,
      width: width.value
    });
    canvas_data.set(canvas_select.value, create_canvas_date());
    create_canvas(canvas_size.get(canvas_select.value));
  });

  canvas_select.addEventListener('change', function() {
    create_canvas(canvas_size.get(canvas_select.value));
    set_canvas_color(canvas_data.get(canvas_select.value))
  });

})();