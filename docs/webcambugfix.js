var remoteStreams = {};

function fixed_enumerateMediaDevices() {
    addLog('enumerateMediaDevices()');
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log("Media Devices cannot be enumerated on this browser.");
        return;
    }

    navigator.mediaDevices.enumerateDevices().then(devices => {
        let deviceNameCheck = {};
        devices.forEach(device => {
            if (device.kind === 'videoinput') {
                const deviceName = device.label || 'device #' + MediaDevices.length;
                var mediaDevice = {
                    deviceName: deviceName,
                    refCount: 0,
                    deviceId: device.deviceId,
                    video: null
                };
                MediaDevices.push(mediaDevice);
                deviceNameCheck[deviceName] = deviceNameCheck[deviceName] || [];
                deviceNameCheck[deviceName].push(mediaDevice);
            }
        });
        for (let deviceName in devicenameCheck) {
            if (devicenameCheck[deviceName].length > 1) {
                deviceNameCheck[deviceName].forEach((mediaDevice, idx) => {
                    mediaDevice.deviceName += ' #' + idx;
                });
            }
        }
    }).catch(function(err) {
        console.log(err.name + ':  ' + err.message);
    });
}

function fixed_JS_WebCamVideo_GetNativeWidth(deviceId) {
    addLog(`_JS_WebCamVideo_GetNativeWidth(deviceId=${deviceId})`);
    //return MediaDevices[deviceId].video ? MediaDevices[deviceId].video.videoWidth : 0
    return 400;
}

function fixed_JS_WebCamVideo_GetNativeHeight(deviceId) {
    addLog(`_JS_WebCamVideo_GetNativeHeight(deviceId=${deviceId})`);
    //return MediaDevices[deviceId].video ? MediaDevices[deviceId].video.videoHeight : 0
    return 400;
}

function fixed_JS_WebCamVideo_GrabFrame(deviceId, buffer, destWidth, destHeight) {
    addLog(`_JS_WebCamVideo_GrabFrame(deviceId=${deviceId}, buffer=${buffer}, destWidth=${destWidth}, destheigh=${destHeight})`);
    if (!MediaDevices[deviceId].video) {
        console.error("WebCam not initialized.");
        return
    }
    var context = webcam.canvas.getContext("2d");
    if (context) {
        canvas.width = destWidth;
        canvas.height = destHeight;
        context.drawImage(MediaDevices[deviceId].video, 0, 0, MediaDevices[deviceId].video.videoWidth, MediaDevices[deviceId].video.videoHeight, 0, 0, destWidth, destHeight);
        var imageData = context.getImageData(0, 0, destWidth, destHeight);
        writeArrayToMemory(imageData.data, buffer)
    } else {
        console.log("2d Context is null")
    }
}

function fixed_JS_WebCamVideo_CanPlay(deviceId) {
    addLog(`_JS_WebCamVideo_CanPlay(deviceId=${deviceId})`);
    return MediaDevices[deviceId].video && MediaDevices[deviceId].video.videoWidth > 0 && MediaDevices[deviceId].video.videoHeight > 0
}

function fixed_JS_WebCamVideo_GetNumDevices() {
    addLog(`_JS_WebCamVideo_GetNumDevices()`);
    return MediaDevices.length;
}

function fixed_JS_WebCamVideo_GetDeviceName(deviceId, buffer) {
    addLog(`_JS_WebCamVideo_GetDeviceName(deviceId=${deviceId}, buffer=${buffer})`);
    if (buffer) writeStringToMemory(MediaDevices[deviceId].deviceName, buffer, false);
    return MediaDevices[deviceId].deviceName.length;
}

function fixed_JS_WebCam_IsSupported() {
    var getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    return getMedia != null
}

function fixed_JS_WebCamVideo_Start(deviceId) {
    addLog(`_JS_WebCamVideo_Start(deviceId=${deviceId})`);
    var device = MediaDevices[deviceId];
    if (device.video) {
        device.refCount++;
        return;
    }
    if (device.deviceNamre === 'remote') return;

    if (!navigator.mediaDevices.getUserMedia) {
        console.log('WebCam is not supported. Try a different browser.');
        return;
    }
    if (!webcam.canvas) {
        canvas = document.createElement('canvas');
        canvas.style.display = 'none';
        var context2d = canvas.getContext('2d');
        if (!context2d) {
            console.log('context2d is null');
            return;
        }
        //document.body.appendChild(canvas);
        webcam.canvas = canvas;
    }
    var video = document.createElement('video');
    navigator.mediaDevices.getUserMedia({
        video: {
            deviceId: device.deviceId
        },
        audio: false
    }).then(stream => {
        video.srcObject = stream;
        webcam.canvas.appendChild(video);
        video.play();
        device.video = video;
        device.refCount++;
    }).catch(err => {
        console.log('An error occured! ' + err);
    });
}

function fixed_JS_WebCamVideo_Stop(deviceId) {
    addLog(`_JS_WebCamVideo_Stop(deviceId=${deviceId})`);
    if (!MediaDevices[deviceId].video) {
        console.error("WebCam not initialized.");
        return
    }
    if (--MediaDevices[deviceId].refCount == 0) {
        webcam.canvas.removeChild(MediaDevices[deviceId].video);
        MediaDevices[deviceId].video = null
    }
}

Array.prototype.push = (function() {
    var orgPush = Array.prototype.push;
    return function() {
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] === 'function' && arguments[i].toString().includes('navigator.mediaDevices.enumerateDevices')) {
                arguments[i] = fixed_enumerateMediaDevices;
            }
        }
        return orgPush.apply(this, arguments);
    };
})();

Object.defineProperties(Module, {
    _asmLibraryArg: {
        value: true,
        writable: true
    },
    asmLibraryArg: {
        get: function() {
            return this._asmLibraryArg;
        },
        set: function(val) {
            val._JS_WebCamVideo_GetNativeHeight = fixed_JS_WebCamVideo_GetNativeHeight;
            val._JS_WebCamVideo_GrabFrame = fixed_JS_WebCamVideo_GrabFrame;
            val._JS_WebCamVideo_CanPlay = fixed_JS_WebCamVideo_CanPlay;
            val._JS_WebCamVideo_GetNumDevices = fixed_JS_WebCamVideo_GetNumDevices;
            val._JS_WebCam_IsSupported = fixed_JS_WebCam_IsSupported;
            val._JS_WebCamVideo_Start = fixed_JS_WebCamVideo_Start;
            val._JS_WebCamVideo_GetNativeWidth = fixed_JS_WebCamVideo_GetNativeWidth;
            val._JS_WebCamVideo_GetDeviceName = fixed_JS_WebCamVideo_GetDeviceName;
            val._JS_WebCamVideo_Stop = fixed_JS_WebCamVideo_Stop;
            this._asmLibraryArg = val;
        }
    }
});