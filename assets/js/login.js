$(function () {
    $('.div_login').on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show()
    })
    $('.div_reg').on('click', function () {
        $('.login_box').show()
        $('.reg_box').hide()
    })
})


const form = layui.form;
const layer = layui.layer
form.verify({
    pwd: [
        /^[\S]{6,12}$/,
        '密码必须6到12位，且不能出现空格'
    ],
    username: function (value, item) { //value：表单的值、item：表单的DOM对象
        if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
            return '用户名不能有特殊字符';
        }
        if (/(^\_)|(\__)|(\_+$)/.test(value)) {
            return '用户名首尾不能出现下划线\'_\'';
        }
        if (/^\d+\d+\d$/.test(value)) {
            return '用户名不能全为数字';
        }
    },
    repwd: function (value) {
        const pwd = $('#layui-input-pwd').val()
        if (pwd !== value) {
            return '两次输入的密码不一致'
        }
    }
})


$('#form_reg').on('submit', function (e) {
    e.preventDefault()
    const inputparms = {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', inputparms, function (res) {
        if (res.status !== 0) {
            return layer.msg(res.message)
        }
        layer.msg('注册成功')
    })
    $('.div_reg').click()
})


$('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        url: '/api/login',
        type: 'POST',
        data: $(this).serialize(),
        success: function (res) {
            // debugger
            if (res.status !== 0) {
                return layer.msg('登录失败');
            }
            layer.msg('登录成功')
            localStorage.setItem('token', res.token)
            location.href = '/index.html'
        }
    })
})




