$(function () {

    //初始化部门和职务的数据
    initDeptAndJob();
    async function initDeptAndJob() {
        let departData = await queryDepart();
        let jobData = await queryJob();
        console.log(departData)
        console.log(jobData)

        if (departData.code === 0){
            departData = departData.data;
            let str = '';
            departData.forEach(item=>{
                str+=`<option value= "${item.id}">${item.name}</option>`;
            })
            $('.userdepartment').html(str)
        }
        if (jobData.code === 0){
            jobData = jobData.data;
            let str = '';
            jobData.forEach(item=>{
                str+=`<option value= "${item.id}">${item.name}</option>`;
            })
            $('.userjob').html(str)
        }
    }

    //校验函数
    function checkname(){
        let val = $('.username').val().trim();
        if (val.length === 0 ){
            $('.spanusername').html('用户名不能为空');
            return false;
        }
        if (!/^[\u4e00-\u9fa5]{2,10}$/.test(val)){
            $('.spanusername').html('用户名必须为2-10位的汉字');
            return false;
        }
        $('.spanusername').html('OK');
        return true;
    }
    function checkemail(){
        let val = $('.useremail').val().trim();
        if (val.length === 0 ){
            $('.spanuseremail').html('邮箱不能为空');
            return false;
        }
        if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(val)){
            $('.spanuseremail').html('邮箱格式错误');
            return false;
        }
        $('.spanuseremail').html('邮箱OK')
        return true;
    }
    function checkphone(){
        let val = $('.userphone').val().trim();
        if (val.length === 0 ){
            $('.spanuserphone').html('号码不能为空');
            return false;
        }
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(val))){
            $('.spanuserphone').html('号码格式有误');
            return false;
        }
        $('.spanuserphone').html('ok')
        return true;
    }

    //失去焦点时，对数据进行校验
    $('.username').blur(checkname)
    //对邮箱进行校验
    $('.useremail').blur(checkemail)
    //对手机号码进行校验
    $('.userphone').blur(checkphone)

    $('.submit').click(async function () {
        if (!checkname() || !checkemail() || !checkphone()){
            alert('数据不合法')
            return;
        }

        //校验通过，获取用户的数据
        let params = {
            name:$('.username').val().trim(),
            sex: $('#man').prop('checked')? 0:1,
            email:$('.useremail').val().trim(),
            phone:$('.userphone').val().trim(),
            departmentId: $('.userdepartment').val(),
            jobId:$('.userjob').val(),
            desc:$('.userdesc').val().trim()
        }
        console.log(params)

        //实现新增功能
        let result = await axios.post('/user/add',params)
        if(result.code === 0){
            alert('添加员工成功');
            window.location.href = 'userlist.html'
            return
        }
        alert('网路不给力')
    })
})