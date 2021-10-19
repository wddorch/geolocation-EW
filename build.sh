tar cvzf bundle.tgz main.js bundle.json find-replace-stream.js
akamai ew upload 6689 --bundle bundle.tgz
akamai ew activate 6689 production 0.8
