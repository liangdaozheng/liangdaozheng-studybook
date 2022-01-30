let appElement = document.querySelector('#app');
// 配置axios
axios.defaults.baseURL = '/api';
axios.interceptors.request.use(function(config) {
    try {
        let token = localStorage.getItem('token');
        axios.defaults.headers.authorization = token;
    } catch (e) {

    }

    return config;
}, function() {})
// 模板引擎配置
const tpl = new nunjucks.Environment(
    new nunjucks.WebLoader('/js/views')
);


(async () => {
    
    // 获取当前用户信息
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem('user'));
    } catch (e) {
        
    }
    // console.log(user);

    // 存放所有的分类信息
    let res = await axios.get('/categories');
    let categories = res.data;

    // const renderString = tpl.render('index.html', {
    //     name: 'zMouse'
    // });
    //
    // console.log(renderString);
    //
    // appElement.innerHTML = renderString;


    const router = new Router({
        routes: [
            {
                path: '/',
                render: async function() {
                    let res = await axios.get('/');

                    const renderString = tpl.render('index.html', {
                        user,
                        categories,
                        categoryItems: res.data
                    });

                    appElement.innerHTML = renderString;
                }
            },
            {
                path: '/list/:categoryId',
                render: async function() {
                     let {categoryId} = this.matchRoute.params;
                     let {page, limit} = this.query;
                     page = page || 1;
                     limit = limit || 4;

                     // 根据当前的 categoryId 获取对应的 分类数据
                    let category = categories.find(c => c.id == categoryId);

                     let res = await axios.get(`/list/${categoryId}`, {
                         params: {
                             page,
                             limit
                         }
                     })

                    const renderString = tpl.render('list.html', {
                        user,
                        categories,
                        category,
                        items: res.data
                    });

                    appElement.innerHTML = renderString;
                }
            },

            {
                path: '/detail/:itemId',
                render: async function() {
                    let {itemId} = this.matchRoute.params;

                    let res = await axios.get(`/detail/${itemId}`);

                    let category = categories.find(c => c.id == res.data.categoryId);

                    let {page, limit} = this.query;
                    page = page || 1;
                    limit = limit || 2;

                    let commentRes = await axios.get(`/comments/${itemId}`, {
                        params: {
                            page,
                            limit
                        }
                    });
                    console.log(commentRes);
                    const renderString = tpl.render('detail.html', {
                        user,
                        categories,
                        category,
                        item: res.data,
                        comments: commentRes.data
                    });

                    appElement.innerHTML = renderString;

                    let commentFormElement = document.querySelector('#comment-form');
                    let contentElement = document.querySelector('#content');

                    commentFormElement.onsubmit = async function (e) {
                        e.preventDefault();

                        try {
                            let res = await axios.post('/comment', {
                                itemId,
                                content: contentElement.value
                            });

                            // console.log(res);
                            alert('评论成功');

                            contentElement.value = '';
                            window.location.reload();
                        } catch (e) {
                            alert(e.response.data);
                        }
                    }

                }
            },

            {
                path: '/signup',
                render: function() {

                    const renderString = tpl.render('signup.html', {
                        categories,
                    });

                    appElement.innerHTML = renderString;

                    // 注册逻辑
                    let signFormElement = document.querySelector('.sign-form');
                    let usernameElement = document.querySelector('#username');
                    let passwordElement = document.querySelector('#password');
                    let repasswordElement = document.querySelector('#repassword');
                    
                    signFormElement.onsubmit = async function(e) {
                        e.preventDefault(); 
                        
                        try {
                            let res = await axios.post('/signup', {
                                username: usernameElement.value,
                                password: passwordElement.value,
                                repassword: repasswordElement.value
                            });
                            alert('注册成功');
                            window.location.href = '#/signin';
                        }catch (e) {
                            alert(e.response.data);
                        }
                    }
                }
            },

            {
                path: '/signin',
                render: function() {
                    const renderString = tpl.render('signin.html', {
                        user,
                        categories,
                    });

                    appElement.innerHTML = renderString;

                    // 注册逻辑
                    let signFormElement = document.querySelector('.sign-form');
                    let usernameElement = document.querySelector('#username');
                    let passwordElement = document.querySelector('#password');

                    signFormElement.onsubmit = async function(e) {
                        e.preventDefault();

                        try {
                            let res = await axios.post('/signin', {
                                username: usernameElement.value,
                                password: passwordElement.value
                            });
                            alert('登录成功');
                            let token = res.headers.authorization;
                            localStorage.setItem('token', token);
                            localStorage.setItem('user', JSON.stringify(res.data));
                            window.location.href = '/index.html';
                        } catch (e) {
                            alert(e.response.data);
                        }
                    }
                }
            },

            {
                path: '/user',
                render: function() {
                    const renderString = tpl.render('user.html', {
                        user,
                        categories,
                    });

                    appElement.innerHTML = renderString;

                    let avatarEditElement = document.querySelector('#avatar-edit');
                    let avatarFormElement = document.querySelector('#avatar-form');
                    let avatarElement = document.querySelector('#avatar');
                    let avatarBgElement = document.querySelector('.avatar-bg');

                    avatarEditElement.onclick = function() {
                        avatarElement.click();
                    }

                    avatarFormElement.onsubmit = function(e) {
                        e.preventDefault();
                    }

                    avatarElement.onchange = async function() {

                       try {
                           let fd = new FormData();
                           fd.append('avatar', this.files[0]);
                           console.log('提交')
                           let res = await axios.post('/avatar', fd);
                           console.log(res)

                           avatarBgElement.style.backgroundImage = `url(http://localhost:8888/${res.data})`;
                       } catch (e) {
                           alert(e.response.data);
                       }
                    }
                }
            }
        ]
    });
})();
