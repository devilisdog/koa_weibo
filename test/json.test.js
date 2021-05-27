const server = require('./server')

test('json接口返回数据正确', async () => {
    const res = await server.get('/json')
    expect(res.body).toEqual({
        title: 'koa2 json'
    })

    expect(res.body.title).toEqual('koa2 json')
})
