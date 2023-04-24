$('#start-register').on('submit', function (event) {
  event.preventDefault();
  if ($('#password-input').val() === $('#password-input-again').val()) {
    $.getJSON('/api/register',
      {
        email: $('#email-input').val(),
        password: $('#password-input').val(),
        nickname: $('#nickname-input').val()
      }, function (data) {
        console.log(data);
        if (data.code > 0) {
          $('#err').text(data.message);
        } else {
          location.href = '/auth?reg=1';
        }
      })
  } else {
    $('#err').text('两次输入的密码不一致。')
  }
})

$('#start-login').on('submit', function (event) {
  event.preventDefault();
  $.getJSON('/api/login',
    {
      email: $('#email-input').val(),
      password: $('#password-input').val(),
    }, function (data) {
      console.log(data);
      if (data.code > 0) {
        $('#err').text(data.message);
      } else {
        localStorage.setItem('nickname', data.nickname);
        localStorage.setItem('avatar_url', data.avatar);
        location.href = '/';
      }
    })
})
