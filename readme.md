# OneJQ

> v 0.0.0.2

这是一个我根据对jquery源码学习后，仿照开发的javascript.

在这里实现了一小部分功能。



## 文档

##### $.ajax(options)

> {any} options

| Param       | Type              | Default                                  | Remark |
| ----------- | ----------------- | ---------------------------------------- | ------ |
| url         | String            | location.pathname                        | 请求地址   |
| type        | String            | ‘GET’                                    | 请求方式   |
| async       | Boolean           | true                                     | 是否异步   |
| contentType | String            | 'application/x-www-form-urlencoded;charset=utf-8' | 请求头部   |
| data        | String            | {}                                       | 请求内容   |
| sccuess     | funciton(resData) | null                                     | 成功时的回调 |
| erro        | function()        | null                                     | 错误时的回调 |

