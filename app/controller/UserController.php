<?php

namespace app\controller;

use support\Request;

use support\Db;
use app\model\User;

use function app\function\auto;

class UserController
{
  public function index(Request $request, $nickname)
  {
    $nickname = urldecode($nickname);
    try {
      $user = User::where('nickname', $nickname)->firstOrFail(['nickname', 'avatar']);
    } catch (\Throwable $th) {
      return auto($request, '/page/404.html', ['title' => '用户不存在']);
    }
    $is_me = $user->nickname == $request->session()->get('user');
    
    return auto($request, '/page/user.html', ['title' => '@' . $user->nickname, 'user' => $user, 'is_me' => $is_me]);
  }
}