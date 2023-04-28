var title;

$(function () {
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
})