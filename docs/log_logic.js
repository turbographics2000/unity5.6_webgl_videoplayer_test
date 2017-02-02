var callLog = [];
var srcIdx = 0;
var cnts = {};
var list = null;
window.onload = () => {
    list = fucnCallListInner;
}

function callFuncListClear() {
    callLog = [];
    cnts = {};
    list.innerHTML = '';
}

function addLog(log) {
    callLog.push({ log: log });
    var idx = callLog.length - 1;

    var div = document.createElement('div');
    callLog[idx].elm = div;
    div.classList.add('item');
    var span = document.createElement('span');
    span.textContent = callLog[idx].log;
    div.appendChild(span);
    list.appendChild(div);

    var ptnToIdx = null;
    for (var i = idx - 1; i >= 0; i--) {
        if (callLog[i].log === callLog[idx].log) {
            ptnToIdx = i;
            break;
        }
    }
    if (ptnToIdx !== null) {
        var ptnFromIdx = ptnToIdx - (idx - ptnToIdx - 1);
        var isMatch = true;
        for (var i = 0; i < idx - ptnToIdx; i++) {
            if (callLog[ptnFromIdx + i].log !== callLog[ptnToIdx + 1 + i].log) {
                isMatch = false;
                break;
            }
        }
        if (isMatch) {
            for (var i = 0; i < idx - ptnToIdx; i++) {
                if (callLog[ptnFromIdx].elm.parentElement !== callLog[ptnFromIdx + i].elm.parentElement) {
                    isMatch = false;
                    break;
                }
            }
        }
        if (isMatch) {
            var patternCounterId = `logPtnCnt_${ptnFromIdx}-${ptnToIdx}`;
            var patternCounter = document.getElementById(patternCounterId);
            cnts[patternCounterId] = cnts[patternCounterId] || 1;
            cnts[patternCounterId]++;

            if (!patternCounter) {
                var patternRow = document.createElement('div');
                var logPattern = document.createElement('div');
                logPattern.classList.add('log-pattern');
                for (var i = ptnFromIdx; i <= ptnToIdx; i++) {
                    if (callLog[i].elm.parentElement === list) {
                        list.removeChild(callLog[i].elm);
                    }
                    logPattern.appendChild(callLog[i].elm);
                }
                patternCounter = document.createElement('div');
                patternCounter.id = patternCounterId;
                patternCounter.classList.add('pattern-counter');
                logPattern.appendChild(patternCounter);
                patternRow.appendChild(logPattern);
                list.appendChild(patternRow);
            }
            patternCounter.textContent = cnts[patternCounterId];

            for (var i = idx; i > ptnToIdx; i--) {
                list.removeChild(callLog[ptnToIdx + 1].elm);
                callLog.splice(ptnToIdx + 1, 1);
            }
        }
    }
}