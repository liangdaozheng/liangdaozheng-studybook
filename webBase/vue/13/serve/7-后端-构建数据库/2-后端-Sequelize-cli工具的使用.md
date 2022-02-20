# 后端-Sequelize-cli工具的使用

[toc]

## 1、🍉 Sequelize 与 Sequelize-cli

### 1-1、Sequelize

`Sequelize` 是一个基于 `Node.js` 的 `ORM` 库。

### 1-2、ORM

`ORM` 全称：`Object Relational Mapping - 对象关系映射`，是通过使用描述对象和数据库之间映射的元数据，将面向对象语言程序中的对象自动持久化到关系数据库中。说简单一些，就是像操作对象一样去操作数据库，而不是 `SQL` 。

### 1-3、Sequelize-cli

`Sequelize-cli` 是其中的一个独立的工具，提供了一些快速操作数据库的功能。比如：创建数据库、创建表等……。



## 2、🍓 Sequelize-cli

### 2-1、安装

首先，我们需要安装 `Sequelize-cli`

```shell
npm i -D sequelize-cli
```

仅仅有这个工具还不够，应该需要设计到数据库的具体操作。所以，我还要安装 `Sequelize`（它们就像是 `vue-cli/Vue`、`create-react-app/React` 之间的关系)。而且 `Sequelize` 在我们的项目里面还要使用的，所以就安装它。

```shell
npm i sequelize
```

最后，`Sequelize` 是对 `MySQL`、`MSSQL` 等数据操作的一种抽象封装，提供了统一的 `API`，实际具体的数据库操作需要我们独立安装对应的库，比如，我们要操作的是 `MySQL` ，那么我们需要安装 `mysql2` 这个独立的模块。

```shell
npm i mysql2
```

#### 2-1-1、数据库与对应的模块

| 数据库     | 模块           | 地址                                    |
| ---------- | -------------- | --------------------------------------- |
| MySQL      | mysql2@^1.5.2  | https://www.npmjs.com/package/mysql2    |
| SQLite     | sqlite3@^4.0.0 | https://www.npmjs.com/package/sqlite3   |
| MariaDB    | mariadb        | https://www.npmjs.com/package/mariadb   |
| PostgreSQL | pg@^7.0.0      | https://www.npmjs.com/package/pg        |
|            | pg-hstore      | https://www.npmjs.com/package/pg-hstore |
| MSSQL      | tedious@^6.0.0 | https://www.npmjs.com/package/tedious   |



## 3、🍊 基础概念

首先，我们先来了解几个概念，同时通过这几个概念来了解这个工具到底是做什么的。

- 迁移
- 种子

### 3-1、迁移

迁移的功能类似于 `Git` 。通过它，我们可以追踪数据库的状态以及变更记录，我们会把这些信息存储到指定的文件中，然后执行指定的命令来更新数据库或者恢复到某个原有状态。

### 3-2、种子

有的时候，我们需要为数据库写入一些测试数据，那么这个时候，我们就可以通过种子来完成这个需求。



## 4、🍇 配置文件

我们在根目录下创建一个文件：`.sequelizerc` ，这是我们使用 `Sequelize-cli` 工具的时候读取的配置文件。

```js
// file: backend/.sequelizerc

const path = require('path');

module.exports = {
    'env': 'development',
    'config': path.resolve('src', 'configs/database.json'),
    'migrations-path': path.resolve('src', 'database/migrations'),
    'seeders-path': path.resolve('src', 'database/seeders'),
    'models-path': path.resolve('src', 'database/models'),
    'debug': true
};
```

### 4-1、配置选项

#### 4-1-1、env

设置 `Sequelize` 的环境变量，默认读取系统的环境变量 `NODE_ENV` 的值，如果不存在 `NODE_ENV` 则为 `development`。该变量会影响下面 `config` 的读取。

#### 4-1-1、config

`Sequelize` 数据库配置文件存放目录。

#### 4-1-1、migrations-path

数据库迁移脚本文件存放目录。

#### 4-1-1、seeders-path

数据库种子脚本文件存放目录。

#### 4-1-1、models-path

数据库模型文件存放目录。

#### 4-1-1、debug

是否显示详细的 debug 信息。



## 5、🍅 数据库配置

按照上面 `.sequelizerc` 中的配置，我们在 `backend/src/configs` 目录下创建一个 `database.json` 的数据库配置文件，它主要提供链接数据库所需要的一些配置。

```json
{
  "development": {
    // 数据库服务器主机
    "host": "127.0.0.1",
    // 数据库类型
    "dialect": "mysql",
    // 数据库服务器连接用户名
    "username": "root",
    // 数据库服务器连接密码
    "password": null,
    // 数据库名称
    "database": "database_development"
  },
  "test": {
    //...
  },
  "production": {
    //...
  }
}
```

正如我们看到的，配置文件中默认会有三个不同环境的配置：`development`、`test`、`production`，分别对应：`开发环境`、`测试环境`、`生产环境`（我们也可以根据具体情况增减），它会根据 `.sequelizerc` 中的 `env` 的值读取不同的环境下的配置 。



## 6、🍑 创建/销毁数据库

做好以上的一些准备工作以后，下面我们就开始来使用 `Sequelize-cli` 来帮助我们完成第一个工作：创建数据库。

### 6-1、sequelize db:create

这条命令可以帮助我们根据当前 `env` 值找到对应 `database.json` 中的配置，最后根据 `database` 项创建对应的数据库。

### 6-2、sequelize db:drop

这条命令是删除对应数据库的。



## 7、🍐 数据库表结构的操作

有了数据库，下面就需要在数据库中创建我们应用所需要用到的各种表以及表结构（字段）。这个时候就轮到前面提到的迁移脚本上场了！

### 7-1、创建迁移脚本文件

首先，我们需要在前面定义的迁移脚本目录下创建一些迁移脚本，通常我们会为每一个表每次变更创建一个独立的迁移脚本。我们可以手动直接创建，也可以使用命令来创建。

#### 7-1-1、sequelize migration:create

```shell
sequelize migration:create --name UserInit
```

使用这个命令，它可以自动在 `migrations` 目录下创建一个 `时间-迁移文件名.js` 的脚本文件。

> 迁移文件的名称最好能比较直观的体现它的作用和目的。比如：UserInit，表示这是一个初始化 User 表的操作。
>
> 后续如果对 User 表进行更改，比如增加了一个用户状态的字段，那么可以创建一个 UserAddStatus 的迁移脚本文件。

### 7-2、编写迁移脚本

脚本其实就是一个 `Node.js` 代码，提供给 `sequelize-cli` 进行读取执行，每一个脚本通过 `module.exports` 导出一个包含了 `down` 和 `up` 方法的对象

- up：执行迁移命令（`db:migrate`）的时候调用
- down：执行撤销/回滚命令（`db:migrate:undo`）的时候调用

#### 7-2-1、queryInterface

`Sequelize` 提供了一个 `queryInterface` 对象，该对象下又提供了许多操作数据库结构的各种方法（`DDL`），如：创建表、字段、索引等。

#### 7-2-2、Sequelize

`Sequelize` 的核心类，提供了一些数据库相关的常量信息，比如数据类型，也可以进行实例化，用于对数据库中的数据进行操作（`DQL`、`DML`）。

#### 7-2-3、up 方法

在 `up` 方法中，我们主要编写的创建表结构，或者新增修改表结构的相关代码。

```js
up: (queryInterface, Sequelize) => {
		/*
				up 需要返回一个 Promise
				queryInterface.createTable 方法用于创建表
						- 第一个参数是要创建的表的名称
						- 第二个参数是一个对象，用来描述表中包含的字段信息
						- queryInterface.createTable 返回一个 Promise
		*/
		return queryInterface.createTable('User', {
				id: {
            // 字段类型：数字
            type: Sequelize.INTEGER,
            // 设置为主键
            primaryKey: true,
            // 自动增长
            autoIncrement: true
    		},
    		name: {
            // 字符串类型（20长度）
            type: Sequelize.STRING(20),
            // 值唯一
            unique: true,
            // 不允许 null 值
            allowNull: false
    		},
    		password: {
            // 字符串类型（32长度）
            type: Sequelize.STRING(32),
            // 不允许 null 值
            allowNull: false
    		},
      	createdAt: {
            // 日期类型
            type: Sequelize.DATE,
            // 不允许 null 值
            allowNull: false
      	}
		});
}
```

**type**

字段类型，`Sequelize` 中支持的类型列表，参考后面的 `DataTypes` 。

**primaryKey**

是否为主键。

**autoIncrement**

自动增长。

**unique**

值唯一。

**allowNull**

是否允许 `Null` 值，一般最好不要使用 `Null`。

**defalutValue**

默认值。

### 7-3、执行迁移脚本

```shell
sequelize db:migrate
```

命令执行成功以后，我们就可以在数据库中看到对应的表以及字段信息了。

操作成功的同时数据库中会有一个叫做 `SequelizeMeta` 的表，这个表是用来记录我们已经执行过的迁移脚本的。当我们执行迁移命令的时候，它就会把当前执行的迁移脚本记录到该表中，下次执行迁移命令的时候就不会重复的去执行已经执行过的迁移脚本了。

### 7-4、撤销/回滚

撤销/回滚 其实就是编写对应的 `down` 脚本。

#### 7-4-1、down 脚本

`down` 方法的本质就是 `up` 方法的一个反向操作。

```js
down: (queryInterface, Sequelize) => {
		// 删除 user 表
    return queryInterface.dropTable('User');
}
```

#### 7-4-2、执行 down

**单次撤销（最近的一次）**

```shell
sequelize db:migrate:undo
```

**撤销所有**

```shell
sequelize db:migrate:undo:all
```

### 7-5、更新迭代

许多时候，因为项目需求的变更，数据库也需要修改更新。比如，当用户修改信息的时候，我们希望记录下来最后一次修改更新的时间，也就是需要给 `user` 表新增一个 `updatedAt` 字段。

**添加一个新的迁移脚本**

```shell
sequelize migration:create --name UserAddUpdatedAt
```

**脚本**

```js
module.exports = {
    up: (queryInterface, Sequelize) => {
      	// 给 User 表添加列（字段）：updateAt
        return queryInterface.addColumn('User', 'updatedAt', {
            type: Sequelize.DATE,
            allowNull: false
        })
    },

    down: (queryInterface, Sequelize) => {
      	// 删除 user 表的 updatedAt 列（字段）
        return queryInterface.removeColumn('User', 'updatedAt');
    }
};
```

**再次执行命令**

```shell
sequelize db:migrate
```

成功以后，数据库中的 `user` 表中，就会多出一个新的字段：`updatedAt`



## 8、🍌 创建项目迁移脚本

根据上一节 `后端-数据库表结构` 中定义的表与结构，创建对应的迁移脚本。