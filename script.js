
document.querySelector('.gameOver').innerHTML = "Let's Play"
let score = -1
let cross = undefined
let change = undefined

const but = document.querySelector('button')
but.addEventListener('click' , function(){
    score = 0
    cross = true
    document.querySelector('.gameOver').innerHTML = ""
    let obstracle = document.querySelector('.obstracle')
    obstracle.classList.add('obstracleAni')
    change = setInterval(fn , 100)/**set to 100 */
    but.setAttribute('style', 'display: none');
    document.querySelector('.heading').style.paddingTop = '10vh';
} )

function goUp()
{
    const dino = document.querySelector('.dino')
    dino.classList.add('animateDino')
    setTimeout(function(){
        dino.classList.remove('animateDino')
    } , 1700)
}

document.addEventListener('keydown' ,  function(event){
    if(event.keyCode == 38 || event.keyCode == 32)
    {
        goUp()
    }
    else if(event.keyCode == 39)// mmove right
    {
        let dino = document.querySelector('.dino')
        let drec = dino.getBoundingClientRect();
        let dx = parseInt(drec.left);
        if(dx + drec.width <= window.innerWidth)dino.style.left = (dx + 20) + "px"

    }
    else if(event.keyCode == 37)//mode left
    {
        let dino = document.querySelector('.dino')
        let drec = dino.getBoundingClientRect();
        let dx = parseInt(drec.left);
        if(dx >= 0)dino.style.left = (dx - 20) + "px"
    }
})


document.body.addEventListener('click' ,  function(event){
    // console.log(typeof event.target.tagName);
    if(event.target.tagName == BUTTON)event.stopPropagation()
    goUp()
})

let fn = function()
{
    let dino = document.querySelector('.dino')
    let obstracle = document.querySelector('.obstracle')

    let drec = dino.getBoundingClientRect();
    let dx = parseInt(drec.left + drec.width / 2);
    let dy = parseInt(drec.top + drec.height / 2);
    // console.log(dx  , dy);

    let obrec = obstracle.getBoundingClientRect()
    let ox = parseInt(obrec.left + obrec.width / 2);
    let oy = parseInt(obrec.top + obrec.height / 2);
    // console.log(ox , oy);

    let difx = Math.abs(dx - ox)
    let dify = Math.abs(dy - oy)

    let dist = parseInt(Math.sqrt((difx * difx) + (dify * dify)))
    // console.log(score);
    if(dist <= (window.innerWidth * 10) / 100)
    {
        obstracle.classList.remove('obstracleAni')
        clearInterval(change)
        document.querySelector('.gameOver').innerHTML = "Game Over"
        but.style.display = "";
        document.querySelector('.heading').style.paddingTop = '0vh';
    }
    else
    {
        score++;
        document.querySelector('#scoerContainer').innerHTML = `Your Score : ${score}`
        if(!cross && ox < dx)
        {
            cross = true
        }
        else if(dx < ox && cross)
        {
            cross = false
            let aniDur = parseFloat(window.getComputedStyle(obstracle ,null).getPropertyValue('animation-duration'))
            if(aniDur > 2.3)aniDur -= 0.1;
            console.log(aniDur);
            obstracle.style.animationDuration = aniDur + 's'
        }
    }
}





