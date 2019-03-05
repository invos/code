var startTime = new Date().getTime();

function fileUpload(config) {
    // Method 1
    showPreview1(config);
    // Method 2
    showPreview2(config);
    // Method 3
    showPreview3(config);
    sendToServer(config.serverUrl, config.file, config.headers);
}

function showPreview1({file, showPreview, output}) {
    var preview1 = document.querySelector(output[0]);
    var reader  = new FileReader();
    reader.onloadend = function () {
        preview1.src = reader.result;
    }
    reader.readAsDataURL(file);
    preview1.style.display = 'inline-block';
}

function showPreview2({file, showPreview, output}) {
    var preview2 = document.querySelector(output[1]);
    preview2.src = URL.createObjectURL(file);
    preview2.style.display = 'inline-block'; 
}

function showPreview3({file, showPreview, output}) {
    var preview3 = document.querySelector(output[2]);
    var reader  = new FileReader();
    reader.onloadend = function () {
        var image = new Image();
        image.onload = function() {
            var ctx = preview3.getContext("2d");
            ctx.drawImage(image, 0, 0);
            doneLoading(output[2]); 
        }
        image.src = reader.result;    
    }
    reader.readAsDataURL(file);
}

function sendToServer(serverUrl, file, headers) {
    var formData = new FormData();
    formData.append('imageFile', file);
    headers.body = formData;
    fetch(serverUrl, headers);
}

function doneLoading(img) {
    var loadtime = new Date().getTime() - startTime;
    console.log(img + " took " + loadtime + "ms to load");
}