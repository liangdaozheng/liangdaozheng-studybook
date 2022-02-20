# 后端-Sequelize-cli工具的使用

[toc]

## 1、🍉 种子

上一节，我们已经实现了数据库与表的构建。

这一节，我们来构建项目中需要使用到的一些测试数据。

这就要用到 `Sequelize-cli` 提供的种子：`seeder` 脚本。



## 2、🍓 创建种子脚本

执行种子文件生成命令

```shell
sequelize seed:create --name UserInit
```



## 3、🍊 编写种子脚本

与 `migration` 脚本类似，它也有 `up` 与 `down`。

```js
const crypto = require('crypto');

module.exports = {
    up(queryInterface, Sequelize) {
        let md5 = crypto.createHash('md5');
        let password = md5.update('123456').digest('hex');
        let date = new Date();

        return queryInterface.bulkInsert('User', ['zMouse', 'mt', 'leo', 'reci'].map((name, index) => {
            return {
                id: index + 1,
                name,
                password,
                createdAt: date,
                updatedAt: date
            }
        }));
    },

    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('User', null, {});
    }
};
```

**bulkInsert**

批量插入数据

**bulkDelete**

批量删除



## 4、🍇 执行种子脚本

执行命令

```shell
sequelize db:seed:all
```

撤销/回滚

```shell
sequelize db:seed:undo:all
```



## 5、🍅 构建项目种子脚本

同迁移脚本一样，根据项目表结构，使用种子脚本生成一批数据。



## 6、🍑 添加 scripts 命令

我们给 `package.json` 的 `scripts` 添加几个简化命令来自动执行迁移和种子脚本。

```json
// file: backend/package.json

{
  	// ...
  	"db:init": "sequelize db:create && sequelize db:migrate && sequelize db:seed:all",
    "db:redo": "sequelize db:drop && npm run db:init"
}
```

**db:init**

初始化，创建数据库->执行迁移->执行种子。

**db:redo**

重构。



## 7、🍐 model

准备好了数据库相关的一些东西以后，我们就可以开始进入正式的编码了。

下一步，我们就来定义 `Model` 相关的内容，后续实际编码过程中，我们就是通过 `Model` 类和对象类对数据库中的数据进行操作的。

