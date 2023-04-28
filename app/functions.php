<?php

namespace app\function;

use support\Request;

$title_prefix = 'Gagago -- ';

function is_logged(Request $request)
{
  return $request->session()->has('user');
}

function auto(Request $request, string $view, array $argv = [])
{
  if ($request->isPjax()) {
    return view('/layout/templatev2', array_merge(['view' => $view, 'pjax' => true], $argv));
  } else {
    return view('/layout/templatev2', array_merge(['view' => $view, 'pjax' => false], $argv));
  }
}

function verifyRegistionForm(string $email, string $password, mixed $nickname)
{
  if (is_null($email) || is_null($password) || is_null($nickname)) {
    return false;
  }

  if (strlen($nickname) > 20) {
    return false;
  }

  $email = trim($email);
  if (preg_match("/^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])/", $email)) {
    return true;
  }
}

function is_email(mixed $email)
{
  if (preg_match("/^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])/", $email)) {
    return true;
  } else {
    return false;
  }
}

function random_id()
{
  $unit = ['a', 'b', 'c', 'd', 'e', 'f', 'g', '1', '2', '3'];
  $result = '';

  for ($i = 0; $i < 16; $i++) {
    $result = $result . $unit[random_int(0, 9)];
  }

  return 'gg_' . $result;
}
