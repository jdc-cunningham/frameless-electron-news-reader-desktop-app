// pulled this from SO
// https://stackoverflow.com/questions/47475360/creating-a-web-worker-inside-react
const worker = () => {
    let i = 0;

    function timedCount() {
        setTimeout(() => {
            i = i + 1;
            postMessage(i);
            timedCount();
        }, 10000);
    }

    timedCount();
};

let workerCode = worker.toString(); // wtf is going on here
workerCode = workerCode.substring(workerCode.indexOf("{")+1, workerCode.lastIndexOf("}"));

const blob = new Blob([workerCode], {type: "application/javascript"});
const workerScript = URL.createObjectURL(blob);

module.exports = workerScript;