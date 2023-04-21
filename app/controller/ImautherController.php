<?php

namespace app\controller;

use support\Request;
use function app\function\is_logged;

class ImautherController
{
  public function index(Request $request)
  {
    return view('/imauther/app', ['logged' => is_logged($request)]);
  }

  public function ssr(Request $request)
  {
    return view('/imauther/ssr/' . $request->get('page'));
  }
}
