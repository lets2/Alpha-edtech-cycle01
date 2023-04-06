const chokidar = require("chokidar");
const spawn = require("child_process").spawn;

const watcher = chokidar.watch("./*.ts", {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
});

watcher.on("add", compileFile).on("change", compileFile);

function compileFile(path) {
    console.log(`Compilando arquivo ${path}`);
    const tsc = spawn("tsc", [path]);

    tsc.stdout.on("data", (data) => {
        console.log(data.toString());
    });

    tsc.stderr.on("data", (data) => {
        console.error(data.toString());
    });

    tsc.on("close", (code) => {
        console.log(`Arquivo ${path} compilado com sucesso!`);
    });
}
