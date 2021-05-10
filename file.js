
/*Variable pour les colonnes*/
const line  = document.getElementById("line")
const column1 = document.getElementById("column1")
const column2 = document.getElementById("column2")
const column3 = document.getElementById("column3")
const column4 = document.getElementById("column4")
let boxes = []
let timerFinish = false
let actualScore = 0
let suu = new Audio("su.mp3")
let musicFinish = new Audio("cbo.mp3")
let compteur = 0

function createCube(idColumn){
    let column

    switch (idColumn) {
        case 0:
            column = column1
            break
        case 1:
            column = column2
            break
        case 2:
            column = column3
            break
        case 3:
            column = column4
            break
    }

    let div = document.createElement("div")
    div.className = "box"
    div.setAttribute("isClick","false")
    div.style.width = randomInteger(25,50).toString() + "px"
    div.style.height = randomInteger(50,100).toString() + "px"
    column.append(div)
    boxes.push({
        height:50,
        width:50,
        top:0,
        element : div,
    })
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function animation(){

    let randomNumber = Math.floor(Math.random() * 4);

    if (compteur > 100 ){
        createCube(randomNumber)
        compteur = 0
    }
    
    for(let i =0;i <boxes.length;i++){

        boxes[i].top += 1
        boxes[i].element.style.marginTop = boxes[i].top + 'px'

        if (boxes[i].top > line.getBoundingClientRect().y){
            if (boxes[i].element.getAttribute("isClick") === "false"){
                score(false)
                trolling()
                boxes[i].element.setAttribute("isClick","true")
            }
            boxes[i].element.remove()
        }
    }

    if (timerFinish){
        cancelAnimationFrame(loop)
    }

    compteur++
    let loop = requestAnimationFrame(animation)
}

popUpTimer()

function changeColor(){
    document.addEventListener('click', function(e) {
        e = window.event;
        let target = e.target
        if (target.classList.value === "box"){
            let yLine = line.getBoundingClientRect().y
            target.setAttribute("isClick","true")
            
            if (target.getAttribute("isValid")== null && !timerFinish){
                if (target.getBoundingClientRect().bottom <= yLine && target.getBoundingClientRect().top <= yLine){
                    target.style.backgroundColor = "green"
                    target.setAttribute("isValid","true")
                    score(true)
                    suu.play()
                }else{
                    target.style.backgroundColor = "red"
                    target.setAttribute("isValid","false")
                    score(false)
                    trolling()
                }
            }
        }
    });
}

function score(isHit){
    let scorer = document.getElementById("score")
    scorer.style.visibility = "visible"

    if (isHit){
        actualScore += 10
        scorer.innerText = actualScore.toString() + " points"
    }else{
        actualScore -= 10
        scorer.innerText = actualScore.toString() + " points"
    }
}

function trolling(compt){
    if (actualScore < 0 || compt === 0){
        let text = document.getElementById("div-pop")
        text.style.visibility = "visible"
        timerFinish = true
    }

    if (compt === 0){
        document.getElementById("troll").style.visibility = "hidden"
    }
}

function timer(time){
    let textTimer = document.getElementById("timer")
    let compteur = time

    let intervalTimer = setInterval(()=>{
        textTimer.innerText = compteur
        
        if (compteur === 0 || timerFinish){
            timerFinish = true
            clearInterval(intervalTimer)
            musicFinish.play()
        }

        if (compteur === 0){
            trolling(compteur)
        }
        compteur--
    },1000)
}

function popUpTimer(){
    document.getElementById("btn1").addEventListener('click',function (){
        let popUp = document.getElementById("popUpDiv")
        popUp.style.visibility = "hidden"
        requestAnimationFrame(animation)
        timer(59)
        changeColor()
    })

    document.getElementById("btn2").addEventListener('click',function (){
        let popUp = document.getElementById("popUpDiv")
        popUp.style.visibility = "hidden"
        requestAnimationFrame(animation)
        timer(119)
        changeColor()
    })

    document.getElementById("btn3").addEventListener('click',function (){
        let popUp = document.getElementById("popUpDiv")
        popUp.style.visibility = "hidden"
        requestAnimationFrame(animation)
        timer(179)
        changeColor()
    })
}