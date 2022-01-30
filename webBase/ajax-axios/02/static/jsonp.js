function ajax(options) {
    let opts = Object.assign({
        method: 'get',
        url: '',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        jsonp:"cb",
        data: '',
        success: function () { }
    }, options)
    //处理jsonp请求；
    if(opts.dataType==="jsonp"){
        jsonpFn(opts.url,opts.data,opts.jsonp,opts.success);
        return false;
    }
    function jsonpFn(url,data,cbName,cbFn){
        // cbName   cb/callback
        let fnName = "KKB_"+Math.random().toString().substr(2);
        window[fnName] = cbFn;
        let path = url+"?"+o2u(data)+"&"+cbName+"="+fnName;
        // console.log(path);
        let o = document.createElement("script");
        o.src = path;
        document.querySelector("head").appendChild(o);
    }



    let xhr = new XMLHttpRequest();
    if (options.method == "get") {
        let data = o2u(opts.data)
        options.url = options.url + "?" + data;
    }
    xhr.open(options.method, options.url, true);
    for (let key in opts.headers) {
        xhr.setRequestHeader(key, opts.headers[key]);
    }
    let sendData;
    switch (opts.headers['content-type']) {
        case 'application/x-www-form-urlencoded':
            sendData = o2u(opts.data);
            break;
        case 'application/json':
            sendData = JSON.stringify(opts.data);
            break;
    }
    xhr.onload = function () {
        let resData;
        if (xhr.getResponseHeader("content-type").includes("xml")) {
            resData = xhr.responseXML;
        } else {
            resData = JSON.parse(xhr.responseText);
        }
        options.success(resData);
    }
    if (options.method == "get") {
        xhr.send();
    } else {
        xhr.send(sendData);
    }
}

function o2u(obj) {
    let keys = Object.keys(obj);
    let values = Object.values(obj);
    return keys.map((v, k) => {
        return `${v}=${values[k]}`;
    }).join("&");
}