/*
    Obviously you should put whatever you want in here.
*/

const child_process = require("child_process");

/* 
Run a shell command
*/
async function run(cmd, env){
    console.log(`$> ${cmd}`);
    if(env == null){
        env = process.env;
    }
    else{
        env = {
            ...process.env,
            ...env
        }
    }
    return new Promise((yay, boo)=>{
        let parsedArgs = cmd.split(" ");
        let command = parsedArgs[0];
        let args = parsedArgs.slice(1);

        let proc = child_process.spawn(command, args, {stdio: "inherit", shell: true, env});

        proc.on('exit', (code)=>{
            if(code === 0){
                yay();
            }
            else{
                boo(code);
            }
        })
    });
}

/* 
Run a shell command, returning its results as an array of lines
*/
async function pipe(cmd, env){
    console.log(`$|> ${cmd}`);
    if(env == null){
        env = process.env;
    }
    else{
        env = {
            ...process.env,
            ...env
        }
    }
    return new Promise((yay, boo)=>{
        let parsedArgs = cmd.split(" ");
        let command = parsedArgs[0];
        let args = parsedArgs.slice(1);

        let proc = child_process.spawn(command, args, {stdio: "pipe", shell: true, env});

        let datas = [""];
        proc.stdout.on('data', (buf)=>{
            datas.push(buf.toString());
        })
        proc.stderr.on('data', (buf)=>{
            datas.push(buf.toString());
        })

        proc.on('exit', (code)=>{
            let output = datas.join("").replace(/\r\n/g, '\n').split("\n").filter(x => x !== "");
            if(code === 0){
                yay(output);
            }
            else{
                output.unshift(code);
                boo(output);
            }
        })
    });
}

/* Run a shell command in the background */
function runBg(cmd, env){
    console.log(`$bg> ${cmd}`);
    if(env == null){
        env = process.env;
    }
    else{
        env = {
            ...process.env,
            ...env
        }
    }
    let parsedArgs = cmd.split(" ");
    let command = parsedArgs[0];
    let args = parsedArgs.slice(1);

    let proc = child_process.spawn(command, args, {stdio: "inherit", shell: true, env});

    return proc;
}

module.exports = {
    run,
    pipe,
    runBg
}
