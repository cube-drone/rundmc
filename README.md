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
