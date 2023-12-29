//登录页面用户名校验规则
export function nameRule(rules, value, callback) {
    let reg = /(^[a-zA-Z0-9]{4,10}$)/
    if (value === '') {
        callback(new Error('请输入用户名'))
    } else if (!reg.test(value)) {
        callback(new Error('请输入4-10位用户名'))
    } else {
        callback()
    }
}
//登录页面密码校验规则
export function passwordRule(rules, value, callback) {
    let reg = /(^[a-zA-Z0-9]{6,12}$)/
    if (value === '') {
        callback(new Error('请输入密码'))
    } else if (!reg.test(value)) {
        callback(new Error('请输入6-12位密码!'))
    } else {
        callback()
    }
}

export function checkPasseord(rule, value, callback) {
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (value !== this.manager.password) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  }
