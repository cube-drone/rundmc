# JS Util Template
Hey, self: I've made this a template repo, so that you can copy it 
and cook up js libraries for personal use
using the GitHub Packages pipeline. 

It's set up to take whatever npm package that lives within it and stuff it into
GitHub Packages under your namespace automagically
(delete this template message when you copy the repo)

## Step 0:
* Change the package.json to reflect the actual package details
* Add code to index.js
* That's pretty much it

The reference package is this one: 

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
