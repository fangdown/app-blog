## mongodb命令
命令 | 参考释义
-|-|
help | 显示基本操作命令
db.help() | 显示数据库操作命令
db.collection.help() | 显示集合操作命令
sh.help() | 显示数据库分片操作命令
rs.help() | 显示副本集操作命令
help admin | 显示管理员操作命令
help connect | 显示连接数据库命令
help keys | 显示快捷键
help misc | 显示其他该知道的东西
show dbs | 显示所有数据库列表
show collections | 显示当前数据库所有集合列表
show users | 显示所有用户列表
show logs | 显示所有日志名称列表（默认为global）
use dbname | 切换/创建数据库（若不存在则自动创建）

命令 | 参考释义
-|-|
db.collection.bulkWrite() | 批量写入
db.collection.count() | 返回集合总数或匹配查询的结果集总数
db.collection.createIndex() | 创建一个集合索引
db.collection.dataSize() | 返回集合的大小
db.collection.deleteOne() | 删除集合中的一个文档
db.collection.deleteMany() | 删除集合中的多个文档。
db.collection.distinct() | 返回具有指定字段不同值的文档（去除指定字段的重复数据）
db.collection.drop() | 删除当前数据库中的collection集合
db.collection.dropIndex() | 删除一个集合中的指定索引
db.collection.dropIndexes() | 删除一个集合中的所有索引
db.collection.explain() | 返回各种方法的查询执行信息
db.collection.find() | 查询集合，无参数则查询所有，并返回一个游标对象。
db.collection.findAndModify() | 查询并修改
db.collection.findOne() | 查询单条数据
db.collection.findOneAndDelete() | 查询单条数据并删除
db.collection.findOneAndReplace() | 查询单条数据并替换
db.collection.findOneAndUpdate() | 查询单条数据并更新
db.collection.getIndexes() | 返回当前集合的所有索引数组
db.collection.group() | 提供简单的数据聚合功能
db.collection.insert() | 在当前集合插入一条或多条数据（或叫文档）
db.collection.insertOne() | 在当前集合插入一条数据
db.collection.insertMany() | 在当前集合插入多条数据
db.collection.isCapped() | 判断集合是否为定容量
db.collection.reIndex() | 重建当前集合的所有索引
db.collection.replaceOne() | 替换集合中的一个文档（一条数据）
db.collection.remove() | 从当前集合删除数据
db.collection.renameCollection() | 重命名集合名称
db.collection.save() | 在当前集合插入一条数据，同insert()方法的区别：当要插入的数据已存在时，save会执行更新操作，而insert方法会忽略当前操作
db.collection.stats() | 返回当前集合的状态
db.collection.storageSize() | 返回当前集合已使用的空间大小
db.collection.totalSize() | 返回当前集合的总占用空间，包括所有文件和所有索引
db.collection.totalIndexSize() | 返回当前集合所有的索引所占用的空间大小
db.collection.update() | 修改集合中的数据。
db.collection.updateOne() | 修改集合中的一条数据。
db.collection.updateMany() | 修改集合中的多条数据。
db.collection.validate() | 执行对集合验证操作。