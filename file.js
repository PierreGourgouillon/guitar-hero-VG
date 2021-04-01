
/*Variable pour les colonnes*/
let column1 = document.getElementById("column1")
let column2 = document.getElementById("column2")
let column3 = document.getElementById("column3")
let column4 = document.getElementById("column4")

let boxes = []

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
    column.append(div)
    boxes.push({
        height:50,
        width:50,
        top:0,
        element : div,
    })
}
let compteur = 0

export function animation(){

    let randomNumber = Math.floor(Math.random() * 4);
    if (compteur > 100 ){
        createCube(randomNumber)
        compteur = 0
    }
    
    for(let i =0;i <boxes.length;i++){
        boxes[i].top += 1
        boxes[i].element.style.marginTop = boxes[i].top + 'px'

        if (boxes[i].top > 850){
            boxes[i].element.remove()
        }
    }
    compteur++
    requestAnimationFrame(animation)
}
requestAnimationFrame(animation)

changeColor()

function changeColor(){

    document.addEventListener('click', function(e) {
        e = window.event;
        var target = e.target
        if (target.classList.value == "box"){
            target.style.backgroundColor = "red"
        }
        }, false);
}