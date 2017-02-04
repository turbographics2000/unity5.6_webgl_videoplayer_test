function consoleLogInjection(code) {
 code = code.replace(
  `function override_JS_Video_Create(url) {
 var str = gameInstance.Module.Pointer_stringify(url);`,
  `function override_JS_Video_Create(url) {
 var str = gameInstance.Module.Pointer_stringify(url);
 console.log(\`_JS_Video_create(url=\$\{url\})\`);`);
 code = code.replace(
  `function override_JS_Video_Time(video) {`,
  `function override_JS_Video_Time(video) {
 console.log(\`_JS_Video_Time(video=\$\{video\})\`);`);
 code = code.replace(
  `function override_JS_Video_Duration(video) {`,
  `function override_JS_Video_Duration(video) {
 console.log(\`_JS_Video_Duration(video=\$\{video\})\`);`);
 code = code.replace(
  `function override_JS_Video_IsReady(video) {`,
  `function override_JS_Video_IsReady(video) {
 console.log(\`_JS_Video_IsReady(video=\$\{video\})\`);`);
 code = code.replace(
  `function override_JS_Video_Width(video) {`,
  `function override_JS_Video_Width(video) {
 console.log(\`_JS_Video_Width(video=\$\{video\})\`);`);
 code = code.replace(
  `function override_JS_Video_Height(video) {`,
  `function override_JS_Video_Height(video) {
 console.log(\`_JS_Video_Height(video=\$\{video\})\`);`);
 code = code.replace(
  `function override_JS_Video_Seek(video, time) {`,
  `function override_JS_Video_Seek(video, time) {
 console.log(\`_JS_Video_Seek(video=\$\{video\}, time=\$\{time\})\`);`);
 code = code.replace(
  `function override_JS_Video_GetAudioLanguageCode(video, trackIndex) {`,
  `function override_JS_Video_GetAudioLanguageCode(video, trackIndex) {
 console.log(\`_JS_Video_GetAudioLanguageCode(video=\$\{video\}, trackIndex=\$\{trackIndex\})\`);`);
 code = code.replace(
  `function override_JS_Video_GetNumAudioTracks(video) {`,
  `function override_JS_Video_GetNumAudioTracks(video) {
 console.log(\`_JS_Video_GetNumAudioTracks(video=\$\{video\})\`);`);
 code = code.replace(
  `function override_JS_Video_SetVolume(video, volume) {`,
  `function override_JS_Video_SetVolume(video, volume) {
 console.log(\`_JS_Video_SetVolume(video=\$\{video\}, volume=\$\{volume\})\`);`);
 code = code.replace(
  `function override_JS_Video_SetLoop(video, loop) {`,
  `function override_JS_Video_SetLoop(video, loop) {
 console.log(\`_JS_Video_SetLoop(video=\$\{video\}, loop=\$\{loop\})\`);`);
 code = code.replace(
  `function override_JS_Video_SetMute(video, muted) {`,
  `function override_JS_Video_SetMute(video, muted) {
 console.log(\`_JS_Video__SetMute(video=\$\{video\}, muted=\$\{muted\})\`);`);
 code = code.replace(
  `function override_JS_Video_SetPlaybackRate(video, rate) {`,
  `function override_JS_Video_SetPlaybackRate(video, rate) {
 console.log(\`_JS_Video__SetPlaybackRate(video=\$\{video\}, muted=\$\{rate\})\`);`);
 code = code.replace(
  `function override_JS_Video_SetSeekedOnceHandler(video, ref, onseeked) {`,
  `function override_JS_Video_SetSeekedOnceHandler(video, ref, onseeked) {
 console.log(\`_JS_Video_SetSeekedOnceHandler(video=\$\{video\}, ref=\$\{ref\}, onseeked=\$\{onseeked\})\`);`);
 code = code.replace(
  `function override_JS_Video_SetReadyHandler(video, ref, onready) {`,
  `function override_JS_Video_SetReadyHandler(video, ref, onready) {
 console.log(\`_JS_Video_SetReadyHandler(video=\$\{video\}, ref=\$\{ref\}, onready=\$\{onready\})\`);`);
 code = code.replace(
  `function override_JS_Video_SetEndedHandler(video, ref, onended) {`,
  `function override_JS_Video_SetEndedHandler(video, ref, onended) {
 console.log(\`_JS_Video_SetEndedHandler(video=\$\{video\}, ref=\$\{ref\}, onended=\$\{onended\})\`);`);
 code = code.replace(
  `function override_JS_Video_SetErrorHandler(video, ref, onerror) {`,
  `function override_JS_Video_SetErrorHandler(video, ref, onerror) {
 console.log(\`_JS_Video_SetErrorHandler(video=\$\{video\}, ref=\$\{ref\}, onended=\$\{onerror\})\`);`);
 code = code.replace(
  `function override_JS_Video_IsPlaying(video) {`,
  `function override_JS_Video_IsPlaying(video) {
 console.log(\`_JS_Video_IsPlaying(video=\$\{video\})\`);`);
 code = code.replace(
  `function override_JS_Video_CanPlayFormat(format) {`,
  `function override_JS_Video_CanPlayFormat(format) {
 console.log(\`_JS_Video_CanPlayFormat(format=\$\{format\})\`);`);
 code = code.replace(
  `function override_JS_Video_Play(video) {`,
  `function override_JS_Video_Play(video) {
 console.log(\`_JS_Video_Play(video=\$\{video\})\`);`);
 code = code.replace(
  `function override_JS_Video_Pause(video) {`,
  `function override_JS_Video_Pause(video) {
 console.log(\`_JS_Video_Pause(video=\$\{video\})\`);`);
 code = code.replace(
  `function override_JS_Video_EnableAudioTrack(video, trackIndex, enabled) {`,
  `function override_JS_Video_EnableAudioTrack(video, trackIndex, enabled) {
 console.log(\`_JS_Video_EnableAudioTrack(video=\$\{video\}, trackIndex=\$\{trackIndex\}, enabled=\$\{enabled\})\`);`);
 code = code.replace(
  `function override_JS_Video_Destroy(video) {`,
  `function override_JS_Video_Destroy(video) {
 console.log(\`_JS_Video_Destroy(video=\$\{video\})\`);`);
 code = code.replace(
  `function override_JS_Video_UpdateToTexture(video, tex) {`,
  `function override_JS_Video_UpdateToTexture(video, tex) {
 console.log(\`_JS_Video_UpdateToTexture(video=\$\{video\}, tex=\$\{tex\})\`);`);

 return code;
}
