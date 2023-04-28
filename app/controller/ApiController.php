<?php

namespace app\controller;

use support\Request;
use app\model\User;
use support\Db;
use Webman\Captcha\CaptchaBuilder;

use function app\function\verifyRegistionForm;
use function app\function\is_email;
use function app\function\random_id;

class ApiController
{
  public function login(Request $request)
  {
    $email = $request->get('email');
    // $keep = $request->get('keep');

    if (is_null($email) || !is_email($email)) {
      return json(['code' => 3, 'message' => '电子邮箱地址不合法。']);
    }

    $password = $request->get('password');
    if (is_null($password)) {
      return json(['code' => 2, 'message' => '请输入密码。']);
    } else {
      $password = md5($password);
    }

    try {
      $user = User::where('email', $email)->where('password', $password)->firstOrFail(['nickname', 'avatar']);
    } catch (\Throwable $th) {
      return json(['code' => 1, 'message' => '电子邮箱地址或密码错误。', 'error' => $th->getMessage()]);
    }

    $session = $request->session();
    $session->set('user', $user->nickname);
    $session->set('avatar_url', $user->avatar);

    return json(['code' => 0, 'message' => '成功。', 'nickname' => $user->nickname, 'avatar' => $user->avatar]);
  }

  public function register(Request $request)
  {
    $nickname = $request->get('nickname');
    $email = $request->get('email');
    $password = $request->get('password');
    if (!verifyRegistionForm($email, $password, $nickname)) {
      return json(['code' => 3, 'message' => '请完整填写表单。']);
    }

    if (Db::table('gagago_user')->where('email', $email)->exists()) {
      return json(['code' => 3, 'message' => '此邮箱地址已被注册，请前往登录页面。']);
    }

    try {
      $user = new User();
      $user->sec_id = random_id();
      $user->email = $email;
      $user->nickname = $nickname;
      $user->password = md5($password);
      $user->save();
    } catch (\Throwable $th) {
      return json(['code' => 1, 'message' => '内部错误。', 'error' => $th->getMessage()]);
    }

    return json(['code' => 0, 'message' => '成功。']);
  }

  public function logout(Request $request)
  {
    $session = $request->session();
    $session->flush();
    return view('/page/logout');
    // return json(['code' => 0, 'message' => '成功。']);
  }

  public function test()
  {
    return view('/page/test');
  }

  public function upload(Request $request)
  {
    $file = $request->file('avatar');
    if ($file && $file->isValid()) {
      $filename = '/upload/' . random_id() . '.' . $file->getUploadExtension();
      $filepath = public_path() . $filename;
      $file->move($filepath);
      return json(['code' => 0, 'message' => '上传成功。']);
    }
    return json(['code' => 1, 'message' => '失败：文件不存在。']);
  }

  public function uploadavatar(Request $request)
  {
    if ($request->logged) {
      $file = $request->file('avatar');
      if ($file && $file->isValid()) {
        $filename = '/upload/avatar/' . random_id() . '.' . $file->getUploadExtension();
        $filepath = public_path() . $filename;
        $file->move($filepath);

        $user = User::where('nickname', $request->nickname)->update(['avatar' => $filename]);
        $request->session()->set('avatar_url', $filename);
        return json(['code' => 0, 'message' => '头像已更新。']);
      }
      return json(['code' => 1, 'message' => '失败。']);
    }
    return json(['code' => 1, 'message' => '失败。']);
  }
}
