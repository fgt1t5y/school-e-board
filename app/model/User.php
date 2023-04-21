<?php

namespace app\model;

use support\Model;

class User extends Model
{
  /**
   * 与模型关联的表名
   *
   * @var string
   */
  protected $table = 'gagago_user';

  /**
   * 重定义主键，默认是id
   *
   * @var string
   */
  protected $primaryKey = 'uid';
}
