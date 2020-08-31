$(function () {

    init();

    //用来实现发布订阅
    let $plan = $.Callbacks();

    $plan.add((power)=>{
        //渲染菜单
        console.log('渲染菜单',power)
    });
    $plan.add((_,info)=>{
        //渲染用户信息和实现退出登录
        console.log('渲染用户信息和实现退出登录',info)

        $('.baseBox>span').html(`你好，${info.name || ''}`)

        //实现退出登录
        $('.baseBox>a').click(async function () {
            let result = await axios.get('/user/signout')
            if(result.code == 0){
                window.location.href = 'login.html'
                return
            }
            //退出登录失败
            alert('退出登录失败')

        })
    })

    async function init() {
        //判断当前用户有没有登录
        let result = await axios.get('/user/login');
        console.log(result)

        if (result.code !== 0){
            alert('你还没有登录，请先登录')
            window.location.href ='login.html'
            return ;
        }

        let [power,info] = await axios.all([
            axios.get('/user/power'),
            axios.get('/user/info')
        ])
        // console.log(power)
        // console.log(info)

        info.code ===0 ? info=info.data : null

        $plan.fire(power,info)
    }
})