class InterceptorManager {

    constructor() {
        this.handlers = [];
    }

    use(fulfilled, rejected) {
        this.handlers.push({
            fulfilled: fulfilled,
            rejected: rejected
        });
        return this.handlers.length - 1;
    }
}

class Kxios {

    constructor(instanceConfig) {
        this.defaults = instanceConfig;
        this.interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager()
        };
    }

    request(config) {
        // console.log('request');
        // console.log(this.defaults);

        // 把每次调用 request 方法传入的 config，与 实例默认初始化的 this.defaults 进行合并，request.config 覆盖 this.defautls
        let requestConfig = Object.assign({}, this.defaults, config);


        // 使用 Promise 对请求进行包装
        let chain = [dispatchRequest, undefined];

        // 初始化一个成功状态的 Promise 对象，并传入 config
        let promise = Promise.resolve(requestConfig);

        // 循环处理request拦截器
        // chain = [dispatchRequest, undefined]
        this.interceptors.request.handlers.forEach(interceptor => {
            // interceptor = {fulfilled: fulfilled,rejected: rejected}
            chain.unshift(interceptor.fulfilled, interceptor.rejected);
        })
        //chain = [fulfilled2, rejected2, fulfilled1, rejected1, dispatchRequest, undefined]

        // 循环处理response拦截器
        this.interceptors.response.handlers.forEach(interceptor => {
            // interceptor = {fulfilled: fulfilled,rejected: rejected}
            chain.push(interceptor.fulfilled, interceptor.rejected);
        })
        //chain = [fulfilled2, rejected2, fulfilled1, rejected1, dispatchRequest, undefined, fulfilled1,rejected1, fulfilled2, rejected2]

        while (chain.length) {
            promise = promise.then(chain.shift(), chain.shift());
        }

        return promise;
    }
}

function dispatchRequest(config) {

    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open(config.method, config.url);

        xhr.onload = function() {
            if ( config.validateStatus(this.status) ) {
               // 满足status的验证
               // resolve(this.responseText);

                resolve({
                    data: config.transformResponse(this.responseText),
                    status: this.status,
                    statusText: this.statusText,
                    headers: this.getAllResponseHeaders(),
                    config,
                    request: {}
                })
            } else {
               reject(this.responseText);
            }
        }

        for (let [k, v] of Object.entries(config.headers)) {
            // console.log(k, v);
            xhr.setRequestHeader(k, v);
        }

        xhr.send(config.data);
    });
}

['delete', 'get', 'head', 'options'].forEach(method => {
    Kxios.prototype[method] =function(url, config = {}) {
        return this.request(Object.assign({}, config, {
            method,
            url
        }));
    };
});

['post', 'put', 'patch'].forEach(method => {
    Kxios.prototype[method] =function(url, data, config = {}) {
        return this.request(Object.assign({}, config, {
            method,
            url,
            data
        }));
    };
});

function createInstance(defaultConfig) {
    let context = new Kxios(defaultConfig);

    let instance = Kxios.prototype.request.bind(context);
    // instance.get = Kxios.prototype.get;
    instance.request = Kxios.prototype.request.bind(context);
    for (let prototype in Kxios.prototype) {
        if (Kxios.prototype.hasOwnProperty(prototype)) {
             instance[prototype] = Kxios.prototype[prototype].bind(context);
        }
    }

    for (let prototype in context) {
        if (context.hasOwnProperty(prototype)) {
            instance[prototype] = context[prototype];
        }
    }

    return instance;
}


const kxiosDefaultConfigs = {
    transformResponse(data) {
        if (typeof data === 'string') {
            try {
                data = JSON.parse(data);
            } catch (e) { /* Ignore */ }
        }
        return data;
    },
    headers: {},
    validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
    }
}

const kxios = createInstance(kxiosDefaultConfigs);

// const kxios = (new Kxios()).request;
