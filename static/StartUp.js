var title;

// function popper_init() {
//   $('[data-toggle="popover"]').popover({
//     trigger: 'hover',
//     placement: 'bottom',
//     html: true,
//     template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-body"></div></div>',
//     content: '<div id="content_"><div class="spinner-border text-secondary" role="status"></div></div>'
//   }).on('shown.bs.popover', function () {
//     getBookDetail();
//   });
// }

function menu_init() {
  $('#menu').popover({
    trigger: 'focus',
    content: /* html */`
      <a class="d-block btn-poppover" tabindex="1" href="@${localStorage.getItem('nickname')}">我的空间</a>
      <a class="d-block btn-poppover" tabindex="2" href="/imauther/" target="_blank">工作台</a>
      <a class="d-block btn-poppover" tabindex="3" href="#">设置</a>
    `,
    html: true,
    placement: 'bottom'
  })
}

$(function () {
  // popper_init();

  if (document.getElementById('menu') != null) {
    menu_init();
  }

  // enable Pjax
  $(document).pjax('a:not([target])', '#mainView');
  $('#loading').hide();


  const avatar = document.getElementById('avatar');
  avatar.src = localStorage.getItem('avatar_url');
});

function getBookDetail() {
  $('#content_').load('/index/fdata');
}

function logout() {
  $.getJSON('/api/logout', {}, function (data) {
    if (data.code === 0) {
      localStorage.clear();
      location.reload();
      console.log(data);
    }
  })
}

$(document).on('pjax:start', function (event) {
  $('#loading').show();
})

$(document).on('pjax:end', function (event) {
  title = document.getElementById('title');
  if (title.innerText != '') {
    document.title = 'Gagago -- ' + title.innerText;
  }
  else {
    document.title = 'Gagago';
  }
  $('#loading').hide();
  // popper_init();
})