// Ways to perfrom multiple images preview and upload
// Tested on Chrome Version 72.0.3626.119
// Not tested with backend api

// Learning purpose
// Please refer ImageUpload code if you don't want to use canvas

function uploadImages({files, headers, serverUrl, previewContainerSelector}) {
    const previewContainer = previewContainerSelector ? document.querySelector(previewContainerSelector) : body;
    if (files && previewContainer) {
        for (let i = 0 ; i <= files.length; i++) {
            const file = files[i];
            const reader  = new FileReader();
            reader.onloadend = function () {
                const image = new Image();
                image.onload = function() {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(image, 0, 0, 200, 200);
                    const dataURL = canvas.toDataURL(file.type);
                    // const fullQuality = canvas.toDataURL(file.type, 1.0);
                    // const mediumQuality = canvas.toDataURL(file.type, 0.5); // compressed
                    // const lowQuality = canvas.toDataURL(file.type', 0.1); // compressed++
                    previewContainer.appendChild(canvas);
                    sendToServer(serverUrl, dataURL, headers); 
                }
                image.src = reader.result;    
            }
            reader.readAsDataURL(file);
        }
    }
}

function sendToServer(serverUrl, dataURL, headers) {
    const formData = new FormData();
    formData.append('imageFile', dataURL);
    headers.body = formData;
    fetch(serverUrl, headers);
}
