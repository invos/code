// Ways to perfrom image preview and upload
// Tested on Chrome Version 72.0.3626.119
// Not tested with backend api

const startTime = new Date().getTime();

function fileUpload(config) {
    // Method 1
    showPreview1(config);
    // Method 2
    showPreview2(config);
    // Upload
    sendToServer(config.serverUrl, config.file, config.headers);
    // Method 3 (Prview and upload)
    showPreview3(config); 
}

// Using FileReader
function showPreview1({file, output}) {
    const preview1 = output && output[0] && document.querySelector(output[0]);
    if (file && preview1) {
        const reader  = new FileReader();
        reader.onloadend = function () {
            preview1.src = reader.result;
        }
        reader.readAsDataURL(file);
        preview1.style.display = 'inline-block';
    }
}

// Using URL.createObjectURL
function showPreview2({file, output}) {
    const preview2 = output && output[1] && document.querySelector(output[1]);
    if (file && preview2) {
        preview2.src = URL.createObjectURL(file);
        preview2.style.display = 'inline-block'; 
    }
}

// Using FileReader and Canvas [ Preview and upload ]
function showPreview3({file, output, headers, serverUrl}) {
    const preview3 = output && output[2] && document.querySelector(output[2]);
    if (file && preview3) {
        const reader  = new FileReader();
        reader.onloadend = function () {
            const image = new Image();
            image.onload = function() {
                const ctx = preview3.getContext("2d");
                ctx.drawImage(image, 0, 0, 200, 200);
                doneLoading(output[2]); // calculate loading time
                const dataURL = preview3.toDataURL(file.type);
                // const fullQuality = preview3.toDataURL(file.type, 1.0);
                // const mediumQuality = preview3.toDataURL(file.type, 0.5); // compressed
                // const lowQuality = preview3.toDataURL(file.type', 0.1); // compressed++
                sendToServer(serverUrl, dataURL, headers); 
            }
            image.src = reader.result;    
        }
        reader.readAsDataURL(file);
    }
}

function sendToServer(serverUrl, file, headers) {
    const formData = new FormData();
    formData.append('imageFile', file);
    headers.body = formData;
    fetch(serverUrl, headers);
}

function doneLoading(img) {
    const loadtime = new Date().getTime() - startTime;
    console.log(img + " took " + loadtime + "ms to load");
}
