# together
做一些接口的适配

解决问题：**添加中间服务，做到不改动客户端，完成对后端服务的对接**

以下简单架构图：

![示例](./doc/problem.png)

# 转换Demo
## 通配 Default
如果未设置任何配置，则会将原始请求，代理给后端，只是替换**后端API地址**
````
// together\server\router\common.js
router.all('*', async (ctx, next) => {
    let respData = await new Transfer({
        ctx
    }).run();
    ctx.body = respData;
})
````

## 修改请求参数
配置userAction规则，在**requestOptions**中自定义http参数
````
// \together\server\action\userAction.js
{
    name: '/user/login',
    type: 0,
    requestOptions: {
        method: 'post',
        url: URL.USER_LOGIN,
        data: {
            'password': function() {
                return md5(this._getData('password'));// 对密码做个md5
            }
        }
    }
}
````

## 单次请求分发多个接口获取数据
还是维护action，注意需要**设置type=1**，区分分发多次；

维护**responseMapper**，对返回参数集合做处理
````
{
    name: '/user/getbalance',
    type: 1,
    children: [{
        name: 'balance',
        type: 0,
        requestOptions: {
            method: 'get',
            url: URL.USER_BALANCE
        }
    }, {
        name: 'user',
        type: 0,
        requestOptions: {
            method: 'get',
            url: URL.USER
        }
    }, {
        name: 'coupon',
        type: 0,
        requestOptions: {
            method: 'get',
            url: URL.USER_COUPON
        }
    }],
    responseMapper(data) {
        data.member.bindCard = data.banks && data.banks.length > 0 || false
        return data;
    }
}
````

## 一般请求
直接调用Http访问
````
router.post('/upload', async (ctx, next) => {
    let formData = new FormData();
    formData.append('picFile', util.getTempFileStream(ctx.state.tempUploadDir));

    let respData = await new Http({
        ctx
    }).request({
        url: ctx.path,
        method: ctx.method,
        data: formData,
        headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
        }
    })
    ctx.body = respData;
})
````