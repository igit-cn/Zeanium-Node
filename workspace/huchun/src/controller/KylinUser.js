zn.define(function () {

    return zn.Controller('kylinuser',{
        properties: {

        },
        methods: {
            init: function (args){
                this._action = this.action('KylinUser');
            },
            login: {
                method: 'GET/POST',
                argv: {
                    email: null,
                    password: null
                },
                value: function (request, response, chain){
                    this._action.selectOne(request.getValue()).then(function (user){
                        if(user){
                            request.session.setItem('user', user);
                            response.success(user);
                        } else {
                            response.error('用户名或密码不对');
                        }
                    }, function (error){
                        response.error(error.message);
                    });
                }
            },
            register: {
                method: 'GET/POST',
                argv: {
                    email: null,
                    password: null
                },
                value: function (request, response, chain){
                    this._action.selectOne({email: request.getValue('email')}).then(function (user){
                        if(user){
                            response.error('该邮箱已经注册过，请重新输入！');
                        } else {
                            this._action.addNode(request.getValue()).then(function (info){
                                this._action.selectOne({id: info.insertId}).then(function (user){
                                    request.session.setItem('user', user);
                                    response.success(user);
                                }, function (error){
                                    response.error(error.message);
                                });
                            }.bind(this), function (error){
                                response.error(error.message);
                            });
                        }
                    }.bind(this), function (error){
                        response.error(error.message);
                    });
                }
            },
            getSession: {
                method: 'GET/POST',
                value: function (request, response, chain){
                    response.success(request.session.getItem('user'));
                }
            },
            authenticate: {
                method: 'GET/POST',
                argv: {
                    userId: null,
                    roleId: null
                },
                value: function (request, response, chain){
                    //console.log();
                    response.success(request.session.getItem('user'));
                    /*
                    this._action.updateNode(request.getValue(), { id: request.getValue('userId') }).then(function (data){
                        response.success(data);
                    }.bind(this), function (error){
                        response.error(error.message);
                    });*/
                }
            }
        }
    });
});
