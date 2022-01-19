/// <reference lib="webworker" />

/// <reference lib="webworker" />

async function gameLoop() {//tr1: Trainer, tr2: Trainer
  console.log("Start");
  
  while (true) {
    await delay(1000);
    // console.log("Waited 1s");
  }
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

addEventListener('message', ({ data }) => {
  gameLoop()
  const response = `worker response to ${data}`;
  postMessage(response);
});
