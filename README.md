#S3 ManagedUpload

### S3桶的CROS配置
```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>DELETE</AllowedMethod>
    <ExposeHeader>ETag</ExposeHeader>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
</CORSConfiguration>

```

### 参数说明
```
var upload = s3.upload(params, {
        queueSize: 1, // 分片上传并发队列，代表了能同时上传的分片数量
        connectTimeout:60 * 1000 * 10, // 连接timeout时间
        httpOptions: {
            timeout: 60 * 1000 * 10 // 10 minutes
        }})
```

### 测试结果:
a. 上传一个16M的文件，将会分为4片上传， 5M + 5M + 5M + 1M;
b. 当Part1和Part2片上传后，断网，再重新连网，上传将会自动恢复，并且开始从第3片Part3开始上传，直到最后上传完成.

### PS
断点续传是由切片上传完成的，默认切片5M,最小切片5M, 所以续传单位是5M.
