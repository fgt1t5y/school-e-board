<?php

namespace app\middleware;

use Webman\MiddlewareInterface;
use Webman\http\Request;
use Webman\http\Response;

use function app\function\is_logged;

class Login implements MiddlewareInterface
{
  public function process(Request $request, callable $handel): Response
  {
    if (is_logged($request)) {
      if ($request->controller == 'app\controller\AuthController') {
        return redirect('/');
      }
    } else {
      if ($request->controller == 'app\controller\ImautherController') {
        return redirect('/auth');
      }
    }

    return $handel($request);
  }
}
