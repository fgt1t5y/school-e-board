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
});

function getBookDetail() {
  $('#content_').load('/index/fdata');
}

$(document).on('pjax:start', function (event) {
  $('#loading').show();
})

$(document).on('pjax:end', function (event) {
  title = document.getElementById('title');
  if (title.innerText != '') {
    document.title = title.innerText;
  }
  else {
    document.title = 'Gagago';
  }
  $('#loading').hide();
  // popper_init();
})