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


$(function () {
  // popper_init();

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