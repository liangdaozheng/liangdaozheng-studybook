class Router {
    options = {};
    path = '';
    query = {};
    matchRoute = null;

    constructor(options = {}) {
        this.options = options;


        this.resolveRoute();

        window.addEventListener('hashchange', (e) => {
            if (e.newURL !== e.oldURL) {
                this.resolveRoute();
            }
        })
    }

    resolveRoute() {
        let route = window.location.hash.substring(1).split('?');

        this.resolvePath(route[0]);
        this.resolveQuery(route[1]);

        // console.log(this);

        // match 会把第一个字符串参数转成正则对象，并返回一个 方法
        // const matchExe = match('/list/:categoryId(\\d+)', { decode: decodeURIComponent });
        // matchExe 会接收一个url字符串，实际就是要匹配的url:  /list/1
        // let matchRoute = matchExe('/list/123');
        // console.log(matchRoute);

        this.options.routes.forEach((route) => {
            const matchExe = match(route.path, { decode: decodeURIComponent });
            const matchRoute = matchExe(this.path);
            if (matchRoute) {
                this.matchRoute = matchRoute;

                typeof route.render === 'function' && route.render.bind(this)();
            }
        })
    }

    resolvePath(path) {
        if (!path)  {
            window.location.href = '#/';
        } else {
            this.path = path || '/';
        }
    }

    resolveQuery(query) {
        if (query) {
            let params = new URLSearchParams(query);
            // console.log(params)
            let entries = params.entries();

            for (const [k, v] of entries) {
                this.query[k] = v;
            }
        }
    }
}
