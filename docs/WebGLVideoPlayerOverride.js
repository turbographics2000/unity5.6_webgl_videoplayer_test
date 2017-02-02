function override_JS_Video_Create(url) {
    var str = Pointer_stringify(url);
    addLog(`_JS_Video_create(url=${url})`);
    var video = document.createElement("video");
    video.style.display = "none";
    video.src = str;
    video.crossOrigin = "anonymous";
    video.looping = false;
    video.addEventListener("ended", (function (evt) {
        if (video.looping) {
            video.play();
        }
    }));
    return videoInstances.push(video) - 1;
}


// Property
function override_JS_Video_Time(video) {
    addLog(`_JS_Video_Time(video=${video})`);
    return videoInstances[video].currentTime;
}
function override_JS_Video_Duration(video) {
    addLog(`_JS_Video_Duration(video=${video})`);
    return videoInstances[video].duration;
}
function override_JS_Video_IsReady(video) {
    addLog(`_JS_Video_IsReady(video=${video})`);
    return videoInstances[video].readyState >= videoInstances[video].HAVE_ENOUGH_DATA;
}
function override_JS_Video_Width(video) {
    addLog(`_JS_Video_Width(video=${video})`);
    return videoInstances[video].videoWidth;
}
function override_JS_Video_Height(video) {
    addLog(`_JS_Video_Height(video=${video})`);
    return videoInstances[video].videoHeight;
}
function override_JS_Video_Seek(video, time) {
    addLog(`_JS_Video_Seek(video=${video}, time=${time})`);
    videoInstances[video].currentTime = time;
}


// Get
function override_JS_Video_GetAudioLanguageCode(video, trackIndex) {
    addLog(`_JS_Video_GetAudioLanguageCode(video=${video}, trackIndex=${trackIndex})`);
    var tracks = videoInstances[video].audioTracks;
    if (!tracks) return "";
    var track = tracks[trackIndex];
    return track ? track.language : "";
}
function override_JS_Video_GetNumAudioTracks(video) {
    addLog(`_JS_Video_GetNumAudioTracks(video=${video})`);
    var tracks = videoInstances[video].audioTracks;
    return tracks ? tracks.length : 1;
}


// Set
function override_JS_Video_SetVolume(video, volume) {
    addLog(`_JS_Video_SetVolume(video=${video}, volume=${volume})`);
    videoInstances[video].volume = volume;
}
function override_JS_Video_SetLoop(video, loop) {
    addLog(`_JS_Video_SetLoop(video=${video}, loop=${loop})`);
    videoInstances[video].looping = loop;
}
function override_JS_Video_SetMute(video, muted) {
    videoInstances[video].muted = muted;
}
function override_JS_Video_SetPlaybackRate(video, rate) {
    videoInstances[video].playbackRate = rate;
}
function override_JS_Video_SetSeekedOnceHandler(video, ref, onseeked) {
    addLog(`_JS_Video_SetSeekedOnceHandler(video=${video}, ref=${ref}, onseeked=${onseeked})`);
    var instance = videoInstances[video];
    instance.addEventListener("seeked", function listener(evt) {
        instance.removeEventListener("seeked", listener);
        Runtime.dynCall("vi", onseeked, [ref]);
    });
}
function override_JS_Video_SetReadyHandler(video, ref, onready) {
    addLog(`_JS_Video_SetReadyHandler(video=${video}, ref=${ref}, onready=${onready})`);
    videoInstances[video].addEventListener("canplay", (function (evt) {
        Runtime.dynCall("vi", onready, [ref]);
    }));
}
function override_JS_Video_SetEndedHandler(video, ref, onended) {
    addLog(`_JS_Video_SetEndedHandler(video=${video}, ref=${ref}, onended=${onended})`);
    videoInstances[video].addEventListener("ended", (function (evt) {
        Runtime.dynCall("vi", onended, [ref]);
    }));
}
function override_JS_Video_SetErrorHandler(video, ref, onerror) {
    addLog(`_JS_Video_SetErrorHandler(video=${video}, ref=${ref}, onended=${onerror})`);
    videoInstances[video].onerror = (function (evt) {
        Runtime.dynCall("vii", onerror, [ref, evt.target.error.code]);
    });
}


// State or Info
function override_JS_Video_IsPlaying(video) {
    addLog(`_JS_Video_IsPlaying(video=${video})`);
    var element = videoInstances[video];
    return !element.paused && !element.ended;
}
function override_JS_Video_CanPlayFormat(format) {
    addLog(`_JS_Video_CanPlayFormat(format=${format})`);
    var str = Pointer_stringify(format);
    var video = document.createElement("video");
    return video.canPlayType(str) != "";
}


// Method
function override_JS_Video_Play(video) {
    addLog(`_JS_Video_Play(video=${video})`);
    videoInstances[video].play();
}
function override_JS_Video_Pause(video) {
    addLog(`_JS_Video_Pause(video=${video})`);
    videoInstances[video].pause();
}


// Audio Track
function override_JS_Video_EnableAudioTrack(video, trackIndex, enabled) {
    addLog(`_JS_Video_EnableAudioTrack(video=${video}, trackIndex=${trackIndex}, enabled=${enabled})`);
    var tracks = videoInstances[video].audioTracks;
    if (!tracks) return;
    var track = tracks[trackIndex];
    if (track) track.enabled = enabled ? true : false;
}


// Destroy
function override_JS_Video_Destroy(video) {
    addLog(`_JS_Video_Destroy(video=${video})`);
    videoInstances[video] = null;
}


// WebGL
function override_JS_Video_UpdateToTexture(video, tex) {
    addLog(`_JS_Video_UpdateToTexture(video=${video}, tex=${tex})`);
    GLctx.bindTexture(GLctx.TEXTURE_2D, GL.textures[tex]);
    GLctx.pixelStorei(GLctx.UNPACK_FLIP_Y_WEBGL, true);
    GLctx.texImage2D(GLctx.TEXTURE_2D, 0, GLctx.RGBA, GLctx.RGBA, GLctx.UNSIGNED_BYTE, videoInstances[video]);
    GLctx.pixelStorei(GLctx.UNPACK_FLIP_Y_WEBGL, false);
}

Object.defineProperties(gameInstance.Module, {
    _asmLibraryArg: {
        value: true,
        writable: true
    },
    asmLibraryArg: {
        get: function () {
            return this._asmLibraryArg;
        },
        set: function (val) {
            val._JS_Video_Create = override_JS_Video_Create;
            val._JS_Video_Time = override_JS_Video_Time;
            val._JS_Video_Duration = override_JS_Video_Duration;
            val._JS_Video_IsReady = override_JS_Video_IsReady;
            val._JS_Video_Width = override_JS_Video_Width;
            val._JS_Video_Height = override_JS_Video_Height;
            val._JS_Video_Seek = override_JS_Video_Seek;
            val._JS_Video_GetAudioLanguageCode = override_JS_Video_GetAudioLanguageCode;
            val._JS_Video_GetNumAudioTracks = override_JS_Video_GetNumAudioTracks;
            val._JS_Video_SetVolume = override_JS_Video_SetVolume;
            val._JS_Video_SetLoop = override_JS_Video_SetLoop;
            val._JS_Video_SetMute = override_JS_Video_SetMute;
            val._JS_Video_SetPlaybackRate = override_JS_Video_SetPlaybackRate;
            val._JS_Video_SetSeekedOnceHandler = override_JS_Video_SetSeekedOnceHandler;
            val._JS_Video_SetReadyHandler = override_JS_Video_SetReadyHandler;
            val._JS_Video_SetEndedHandler = override_JS_Video_SetEndedHandler;
            val._JS_Video_SetErrorHandler = override_JS_Video_SetErrorHandler;
            val._JS_Video_IsPlaying = override_JS_Video_IsPlaying;
            val._JS_Video_CanPlayFormat = override_JS_Video_CanPlayFormat;
            val._JS_Video_Play = override_JS_Video_Play;
            val._JS_Video_Pause = override_JS_Video_Pause;
            val._JS_Video_EnableAudioTrack = override_JS_Video_EnableAudioTrack;
            val._JS_Video_Destroy = override_JS_Video_Destroy;
            val._JS_Video_UpdateToTexture = override_JS_Video_UpdateToTexture;
            //val._JS_WebRequest_Send = override_JS_WebRequest_Send;
            this._asmLibraryArg = val;
        }
    }
});