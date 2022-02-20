# 后端-使用postman进行接口测试

[toc]

## 1、🍉 什么是 Postman

`Postman` 是一款功能强大的接口调试工具。



## 2、🍓 安装

官网：https://www.postman.com/



## 3、🍊 创建集合

`集合` 是 `Postman` 对请求进行组织的一种方式，方便管理和维护。



## 4、🍇 设置集合变量

我们可以给集合设置一些变量，在请求中进行复用。

### 4-1、添加 baseUrl 变量

在集合变量中添加 `baseUrl` ，值为：`http://localhost:8080/api/v1`



## 5、🍅 添加请求

每一个请求就是我们对 `api` 的一次调用及测试。

### Get

### Post

### Params

### Headers

### Body

###  响应

### 5-1、在请求中使用集合变量

在请求的一些配置（参数）中，我们可以使用 `{{baseUrl}}` 来调用我们在上面集合配置中设置的变量。

### 5-2、其它设置

- 请求方法设置
- `Params` 设置，这里的 `Params` 指的是 `queryString`
- 请求头设置
- 请求正文
  - 正文格式

### 5-3、响应信息

- 响应正文
- 响应头
- 状态码
- 请求日志

### 5-4、postman 内置数据生成器

`postman` 内置提供了许多的随机数据生成器，帮助我们自动生成各种数据。

https://learning.postman.com/docs/postman/scripts/postman-sandbox-api-reference/#dynamic-variables



## 6、🍑 使用文件夹组织请求

我们可以根据请求的类型，把他们通过文件夹的形式有序的进行组织。



## 7、🍐 添加授权

在我们的后续的应用中，许多的接口是需要登录授权后才能访问的。我们所使用的验证方式是 `JWT` ，同时我们是基于 `Header` 来对授权 `token` 进行传输的。根据以上规则，我们可以在 `Postman` 中对这种授权方式进行统一处理。



## 8、🍌 添加断言测试脚本

我们可以给每个接口请求添加断言测试脚本，来帮助我们对接口响应进行测试反馈，减轻人力。

`Postman` 提供了一个内置对象 `pm` 。通过该对象，我们可以发送请求，断言测试也是通过它来完成。下面介绍几个我们这里会用到的几个 `API`：

### Collection 操作

#### 设置集合变量

```js
pm.collectionVariables.set(variableName:String, variableValue:String);
```

#### 获取集合变量

```js
pm.collectionVariables.get(variableName:String);
```

#### 清除集合变量

```
pm.collectionVariables.unset(variableName:String);
```

### 断言测试

```js
pm.test('描述', function() {
  	//断言
  	pm.expect(true).to.be.true;
});
```

#### 响应内容是否包含某个字符串

```js
pm.test("内容包含kkb", function () {
		pm.expect(pm.response.text()).to.include("kkb");
});
```

#### 响应内容是否等于某个字符串

```js
pm.test("内容等于kkb", function () {
    pm.response.to.have.body("kkb");
});
```

#### 检测头信息是否存在指定头

```js
pm.test("存在content-type", function () {
    pm.response.to.have.header("Content-Type");
});
```

#### 响应时间小于指定值

```js
pm.test("响应小于200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});
```

#### 检测状态码是否是200

```js
pm.test("状态码为200", function () {
    pm.response.to.have.status(200);
});
```

#### 状态文本是否包含指定字符串

```js
pm.test("状态文本包含Created", function () {
    pm.response.to.have.status("Created");
});
```

#### 状态码是否为指定的值之一

```js
pm.test("成功", function () {
    pm.expect(pm.response.code).to.be.oneOf([201,202]);
});
```

#### 使用 `ajv` 库进行 `JSON Schema` 格式验证

##### 什么是 `JSON Schema`？

`JSON Schema` 定义了一套词汇和规则，这套词汇和规则用来定义 `JSON` 元数据，且元数据也是通过 `JSON` 数据形式表达的。`JSON` 元数据定义了 `JSON` 数据需要满足的规范，规范包括成员、结构、类型、约束等。使用它我们就可以对 `JSON` 数据进行合法性校验。

参考：http://json-schema.org/draft/2019-09/json-schema-validation.html

```js
const Ajv = require('ajv');
const ajv = new Ajv({logger: console});
const schema = {
  	required: ["id","name", "createAt"],
		properties: {
    		id: {
      			type: "number"
    		},
      	name: {
          	type: "string"
        },
      	createAt: {
          	type: "string",
          	format: "date-time"
        }
  	}
};

pm.test('Schema is valid', function() {
    pm.expect(ajv.validate(schema, {
      "id": 5,
    	"name": "Aryanna",
    	"createAt": "2020-03-27T16:00:47.464Z"
    })).to.be.true;
});
```

`Postman` 内置安装了许多的一些常用第三方库，比如上面的 `ajv` ，还包括：

- [ajv](https://www.npmjs.com/package/ajv) → v6.6.2
- [atob](https://www.npmjs.com/package/atob) → v2.1.2
- [btoa](https://www.npmjs.com/package/btoa) → v1.2.1
- [chai](http://chaijs.com/) → v4.2.0
- [cheerio](https://cheerio.js.org/) → v0.22.0
- [crypto-js](https://www.npmjs.com/package/crypto-js) → v3.1.9-1
- [csv-parse/lib/sync](http://csv.adaltas.com/parse) → v1.2.4
- [lodash](https://lodash.com/) → v4.17.11 (when used with require, the inbuilt `_` object is for v3.10.1)
- [moment](http://momentjs.com/docs/) → v2.22.2 (sans locales)
- [postman-collection](http://www.postmanlabs.com/postman-collection/) → v3.4.0
- [tv4](https://github.com/geraintluff/tv4) → v1.3.0
- [uuid](https://www.npmjs.com/package/uuid) → (the module loaded is a shim for original module)
- [xml2js](https://www.npmjs.com/package/xml2js) → v0.4.19

还有一些 `NodeJS` 模块

[
path](https://nodejs.org/api/path.html)

[assert](https://nodejs.org/api/assert.html)

[buffer](https://nodejs.org/api/buffer.html)

[util](https://nodejs.org/api/util.html)

[url](https://nodejs.org/api/url.html)

[punycode](https://nodejs.org/api/punycode.html)

[querystring](https://nodejs.org/api/querystring.html)

[string-decoder](https://nodejs.org/api/string_decoder.html)

[stream](https://nodejs.org/api/stream.html)

[timers](https://nodejs.org/api/timers.html)

[events](https://nodejs.org/api/events.html)

##### 断言库

https://www.chaijs.com/api/



## 9、🍎 自动化测试

我们不仅仅可以对单个的请求进行测试，还可以对文件夹，整个集合进行批量的测试，提高效率。



## 10、🍒 Postman 脚本的导出与导入

最后，我们还可以把请求测试进行导出和导入。