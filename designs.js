
const sizePicker = document.querySelector('.size-picker');
const pixelCanvas = document.querySelector('.pixel-canvas');
const quickFill = document.querySelector('.quick-fill');
const eraseMode = document.querySelector('.erase-mode');
const drawMode = document.querySelector('.draw-mode');

function makeGrid() {
  let gridHeight = document.querySelector('.input-height').value;
  let gridWidth = document.querySelector('.input-width').value;
  while (pixelCanvas.firstChild) {
    pixelCanvas.removeChild(pixelCanvas.firstChild);
    }
  // for rows and cells
  for (let i = 1; i <= gridHeight; i++) {
    let gridRow = document.createElement('tr');
    pixelCanvas.appendChild(gridRow);
    for (let j = 1; j <= gridWidth; j++) {
      let gridCell = document.createElement('td');
      gridRow.appendChild(gridCell);
      // fills in cell with picked color 
      gridCell.addEventListener('mousedown', function() {
        const color = document.querySelector('.color-picker').value;
        this.style.backgroundColor = color;
      })
     }
  }
}

makeGrid(10, 10);

sizePicker.addEventListener('submit', function(e) {
  e.preventDefault();
  makeGrid();
});

// enables color dragging with picked color (above is the code for filling in the single cell).
let down = false; // Tracks if mouse pointer is pressed
pixelCanvas.addEventListener('mousedown', function(e) {
	down = true;
	pixelCanvas.addEventListener('mouseup', function() {
		down = false;
	});

  // ensures cells won't be colored if grid is left while pointer is held down
  pixelCanvas.addEventListener('mouseleave', function() {
    down = false;
  });

  pixelCanvas.addEventListener('mouseover', function(e) {
    const color = document.querySelector('.color-picker').value;
  	if (down) {
      // 'TD'  is capitalized as element.tagName returns upper case for DOM trees representing HTML elements
      if (e.target.tagName === 'TD') {
      	e.target.style.backgroundColor = color;
      }
    }
  });
});

quickFill.addEventListener('click', function(e) {
  e.preventDefault();
  const color = document.querySelector('.color-picker').value;
  pixelCanvas.querySelectorAll('td').forEach(td => td.style.backgroundColor = color);
});

// remove color from cell when double-click
pixelCanvas.addEventListener('dblclick', e => {
  e.target.style.backgroundColor = null;
});


// 'erase' button note 'down' was set to false in variable above
eraseMode.addEventListener('click', function() {
  // enables drag erasing while in erase mode
  pixelCanvas.addEventListener('mousedown', function(e) {
  	down = true;
  	pixelCanvas.addEventListener('mouseup', function() {
  		down = false;
  	});
    // ensuring cells don't get erased if grid is left while pointer is held down
    pixelCanvas.addEventListener('mouseleave', function() {
      down = false;
    });
    pixelCanvas.addEventListener('mouseover', function(e) {
    	if (down) {
        if (e.target.tagName === 'TD') {
        	e.target.style.backgroundColor = null;
        }
      }
    });
  });
  // for single-cell erase while in erase mode
  pixelCanvas.addEventListener('mousedown', function(e) {
    e.target.style.backgroundColor = null;
  });
});
drawMode.addEventListener('click', function() {
  pixelCanvas.addEventListener('mousedown', function(e) {
  	down = true;
  	pixelCanvas.addEventListener('mouseup', function() {
  		down = false;
  	});
    
    pixelCanvas.addEventListener('mouseleave', function() {
      down = false;
    });
    pixelCanvas.addEventListener('mouseover', function(e) {
      const color = document.querySelector('.color-picker').value;
    	if (down) {
        if (e.target.tagName === 'TD') {
        	e.target.style.backgroundColor = color;
        }
      }
    });
  });
  
  pixelCanvas.addEventListener('mousedown', function(e) {
    if (e.target.tagName !== 'TD') return;
    const color = document.querySelector('.color-picker').value;
    e.target.style.backgroundColor = color;
  });
});
