pwd
ls
tar -cvzf "/Users/wdorch/Documents/SOASTA/Product/Edge Workers/duanedorch-com/bundle.tgz" "/Users/wdorch/Documents/SOASTA/Product/Edge Workers/duanedorch-com/main.js" "/Users/wdorch/Documents/SOASTA/Product/Edge Workers/duanedorch-com/bundle.json" "/Users/wdorch/Documents/SOASTA/Product/Edge Workers/duanedorch-com/find-replace-stream.js"
/usr/local/bin/akamai ew upload 6689 --bundle "/Users/wdorch/Documents/SOASTA/Product/Edge Workers/duanedorch-com/bundle.tgz" --accountkey B-M-1YX7F48
/usr/local/bin/akamai ew activate 6689 production 0.11 --accountkey B-M-1YX7F48