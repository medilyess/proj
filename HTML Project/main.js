document.querySelector(".control-button span").onclick = function(){

    let yourName = prompt("What's your name?");

    if (yourName == null || yourName == "") {

        document.querySelector(".name span").innerHTML = 'Unknown';

    }else{

        document.querySelector(".name span").innerHTML = yourName;

    }

    document.querySelector(".control-button").remove();

}

let duration = 1000;

let blockContainer = document.querySelector(".blocks");

let blocks = Array.from(blockContainer.children);

let order = [...Array(blocks.length).keys()];

shuffle(order);

blocks.forEach((block,index) =>{
    block.style.order = order[index];
    block.addEventListener('click', function(){
        flipblock(block);
    });
});

function flipblock(selectedBlock){

    selectedBlock.classList.add('is-flipped');
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    if (allFlippedBlocks.length === 2) {
        stopClicking();
        check(allFlippedBlocks[0],allFlippedBlocks[1]);
    }

}

function stopClicking(){
    blockContainer.classList.add('no-clicking');
    setTimeout(()=>{
        blockContainer.classList.remove('no-clicking');
    },duration);
}

function check(firstBlock, secondBlock){

    let triesElement = document.querySelector('.tries span');
    if (firstBlock.dataset.img === secondBlock.dataset.img) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
        
    }else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML)+1;
        setTimeout(()=>{
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        },duration);

    }

}

function shuffle(array){
    let current = array.length,
    temp,
    random;
    while(current>0){
        random=Math.floor(Math.random() * current);
        current--;
        temp=array[current];
        array[current]=array[random];
        array[random]=temp;
    }
    return array;
}
