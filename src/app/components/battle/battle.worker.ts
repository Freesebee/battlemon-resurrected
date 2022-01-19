/// <reference lib="webworker" />

/// <reference lib="webworker" />

let isPlaying = false

async function gameLoop(data: any) {//tr1: Trainer, tr2: Trainer
  
  while (isPlaying) {
    await delay(1000);
    postMessage('Update');
  }
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

addEventListener('message', ({ data }) => {
  if(data == 'start') {
    isPlaying = true
    console.log("Battle started")
    gameLoop(data)
  } else if(data == 'stop') {
    isPlaying = false
    console.log("Battle finished")
  } else {
    throw "Data isn't a game message"
  }

  
});
