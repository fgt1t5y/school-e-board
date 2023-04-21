<?php

namespace app\controller;

use support\Request;

use function app\function\auto;

class IndexController
{
  public function index(Request $request)
  {
    return auto($request, '/page/mainpage.html', ['title' => '小说发布、交流与共享平台']);
  }

  public function fdata()
  {
    return response('fdata');
  }
}
