<?php

namespace app\controller;

use support\Request;

class ImautherController
{
  public function index(Request $request)
  {
    return view('/imauther/app');
  }

  public function ssr(Request $request)
  {
    return view('/imauther/ssr/' . $request->get('page'));
  }
}
