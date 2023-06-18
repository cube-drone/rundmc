## RunDMC

dirt-quick utility functions wrapping node's `child_process` that I use in automation
tasks so that I don't need to remember exactly how `child_process` works every time

```
let {run, pipe, runBg} = require('@cube-drone/rundmc`)

async function main(){
    await run('echo toots')
    let linesOfText = await pipe('docker ps -a')
    for(let line of linesOfText){
        console.warn(line)
    }
    let proc = runBg('node longRunning.thing')
    // do some stuff
    proc.kill()
}
```

### jake? never heard of 'em

I use jake a lot to do local automations, but jake doesn't work if you're delivering your
project as a `bin` using npmrc - so we can use rundmc's `task` and `desc` functions to
monkeypatch jake's `task` and `desc` functions, then call `runCommandFromArgsIfArgsExist`
to turn any bin.js into a local task runner, using (I hope) essentially the same Jakefile
that we've always been using.