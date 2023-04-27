const avatar_input = document.getElementById('avatar-input');
const modal = document.getElementById('avatar-cropper');
const preview = document.getElementById('preview');
const btn_submit = document.getElementById('avatar-submit');
const btn_close = document.getElementById('gg-modal-close');
const form = new FormData();
var new_avatar;

avatar_input.addEventListener('change', function () {
  var img = this.files[0];
  const reader = new FileReader();

  reader.readAsDataURL(img);

  reader.onload = (event) => {
    const base64 = event.target.result;
    preview.src = base64;
    modal.classList.remove('d-none');
  }
})

btn_close.addEventListener('click', function () {
  modal.classList.add('d-none');
  preview.src = '';
  context.clearRect(0, 0, canvas_size, canvas_size);
})

btn_submit.addEventListener('click', function () {
  canvas.toBlob(function (blob) {
    new_avatar = new File([blob], 'avatar.jpg');
    form.append('avatar', new_avatar);

    var xhr = new XMLHttpRequest;

    xhr.open('post', '/api/uploadavatar');
    xhr.send(form);

    xhr.onload = function () {
      modal.classList.add('d-none');
    }
  
  }, 'image/jpeg', '0.8');
})

const canvas = document.getElementById('grap');
const scale_input = document.getElementById('scale-input');
const context = canvas.getContext('2d');

const canvas_size = 256;
var mousedown = false;
var sx = 0;
var offsetX = 0;
var offsetY = 0;
var lastX = 0;
var lastY = 0;
var scale = 1.0;

preview.addEventListener('load', function () {
  scale_input.value = 1.0
  console.log(preview.height, preview.width);
  update();
})

scale_input.addEventListener('input', function () {
  scale = this.value;

  update();
})

canvas.addEventListener('mousedown', function (event) {
  event.preventDefault();

  lastX = event.clientX;
  lastY = event.clientY;
  mousedown = true;
})

canvas.addEventListener('mouseup', function (event) {
  event.preventDefault();

  lastX = event.clientX;
  lastY = event.clientY;
  mousedown = false;
})

canvas.addEventListener('mousemove', function (event) {
  event.preventDefault();

  if (mousedown) {
    if (event.clientX < lastX) {
      move(0, lastX - event.clientX);
    } else {
      move(1, event.clientX - lastX);
    }

    if (event.clientY < lastY) {
      move(2, lastY - event.clientY);
    } else {
      move(3, event.clientY - lastY);
    }

    lastX = event.clientX;
    lastY = event.clientY;
  }
})

function move(direction = 0, distance = 1) {
  // 0 = 左, 1 = 右, 2 = 上, 3 = 下

  switch (direction) {
    case 0:
      if (offsetX + canvas_size * scale > preview.width) {
        return;
      }
      offsetX += distance;
      break;
    case 1:
      if (offsetX <= 0) {
        return;
      }
      offsetX -= distance;
      break;
    case 2:
      if (offsetY + canvas_size * scale > preview.height) {
        return;
      }
      offsetY += distance;
      break;
    case 3:
      if (offsetY <= 0) {
        return;
      }
      offsetY -= distance;
      break;
  }
  update();
}

function update() {
  context.clearRect(0, 0, canvas_size, canvas_size);
  context.drawImage(preview, offsetX, offsetY, canvas_size * scale, canvas_size * scale, 0, 0, canvas_size, canvas_size);
}
