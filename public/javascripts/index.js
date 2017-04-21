var key = "<yours>";
var secret = "<yours>";

var s3 = new AWS.S3({accessKeyId: key, secretAccessKey: secret, region: "us-west-2"});

var fileChooser = document.getElementById('hello-file');
var mybutton = document.getElementById('upload-button');
var progress = document.getElementById('progress');

progress.innerHTML = 'No starting yet.';
mybutton.addEventListener('click', function() {
    var file = fileChooser.files[0];
    if (file) {
        var params = {
         Bucket: 'testupload111', Key: file.name,
         Body: file
        };
        var upload = s3.upload(params, {queueSize: 1,connectTimeout:60 * 1000 * 10 , httpOptions: {
        timeout: 60 * 1000 * 10 // 10 minutes
        }}).on('httpUploadProgress', function(e) {
            var precent = parseInt(e.loaded, 10) / parseInt(e.total, 10);
            precent = precent.toFixed(2) * 100;
            setTimeout(function() {
                progress.innerHTML = 'Part: ' + e.part + '  -   Loaded ' + precent + "% <br/>";
            }, 3000)
            console.log(e);
        });

        function sendUpload() {
            upload.send(function (err, data) {
                if (err) {
                    console.log("Error:", err.code, err.message);
                    sendUpload();
                }
                else console.log(data);
            });
        }
        sendUpload();
    } 
}, false);



