<?php

namespace app\middleware;

use support\View;
use Webman\MiddlewareInterface;
use Webman\http\Request;
use Webman\http\Response;

use function app\function\is_logged;

class Login implements MiddlewareInterface
{
  public function process(Request $request, callable $handel): Response
  {
    $session = $request->session();
    if ($session->has('user')) {
      if ($request->controller == 'app\controller\AuthController') {
        return redirect('/');
      }
      View::assign([
        'logged' => true,
        'nickname' => $session->get('user'),
        'avatar' => $session->get('avatar_url')
      ]);
      $request->logged = true;
      $request->nickname = $session->get('user');
    } else {
      if ($request->controller == 'app\controller\ImautherController') {
        return redirect('/auth');
      }
      $request->logged = false;
    }

    return $handel($request);
  }
}
