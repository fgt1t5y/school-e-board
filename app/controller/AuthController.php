<?php

namespace app\controller;

use support\Request;

use function app\function\auto;
use support\Db;

class AuthController
{
  public function index(Request $request)
  {
    return auto($request, '/page/auth.html', ['title' => '登录或注册']);
  }

  public function confirm(Request $request)
  {
    $email = $request->get('email');
    if (is_null($email) || $email == '') {
      return json(['code' => 1, 'message' => '需要一个参数。']);
    }
    if (Db::table('gagago_user')->select('email')->where('email', $email)->exists()) {
      return auto($request, '/page/confirm-login.html', ['title' => '登录', 'email' => $email]);
    } else {
      return auto($request, '/page/confirm-register.html', ['title' => '创建密码', 'email' => $email]);
    }
  }

}
