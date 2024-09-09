// Hannah de Guzman
// 100786828
// Matchi Match Javascript code to provide flipping, animations, duplicating and matching
// of all cards

window.onload = function() {

   //* reference btn svg
   let myObj = document.getElementById('obj').contentDocument;
   let theButtons = myObj.getElementsByClassName('btns');

    //* reference the splash page

    let mySplash = document.getElementById('splash').contentDocument;
    let beginBtn = mySplash.getElementById('begin-sign');
    let beginButton = mySplash.getElementById('begin');
    // reference clouds
    let myClouds = mySplash.getElementsByClassName('clouds');
    // reference sun
    let mySun = mySplash.getElementById('sun');
    // reference trees
    let myTrees = mySplash.getElementsByClassName('tree');
    // reference leaves
    let myWelcome = mySplash.getElementById('welcome');
    // makimatch reference
    let myLetters = mySplash.getElementsByClassName('tStyle');
    let myShadow = mySplash.getElementsByClassName('makiShadow');

    let myEat = mySplash.getElementsByClassName('eat');

    //   referce the gameboard
    let theBoard = document.querySelector('.gameBoard');    
    //  reference the card class
    let theCard = document.querySelector('.card');

    let theBack = '';

// set up variables

//! change unique card as needed
let uniqueCard = 8;
let totalCards = uniqueCard * 2;

// set up two arrays for two decks of card

//! add more as needed (8total for each deck)
    const deckB = ['./img/deckA/card01.svg', './img/deckA/card02.svg', './img/deckA/card03.svg', './img/deckA/card04.svg', './img/deckA/card05.svg', './img/deckA/card06.svg', './img/deckA/card07.svg', './img/deckA/card08.svg'];

    const deckA = ['./img/deckB/card01.svg', './img/deckB/card02.svg', './img/deckB/card03.svg', './img/deckB/card04.svg', './img/deckB/card05.svg', './img/deckB/card06.svg', './img/deckB/card07.svg', './img/deckB/card08.svg'];

// variables for setting a new Deck after randomizing

let newDeck = [];
let deckX = [];

// variables to keep specific index, id, animation
// related to first card and second card

let firstCard = secondCard = null;
let firstId = secondId = null;
let firstAnimation = secondAnimation = null;
let totalMatch = 0;

// animation timeline for winning

let winAnimation = gsap.timeline({paused:true});
winAnimation.to('#win', {autoAlpha:1})
.from('#win', {scale:0, rotate: -180})
.to('#win', {scale:1, duration: 3, ease: "power1.in", x: 100,})
.to('#win', {autoAlpha:0}, '-=.8')
.to('#obj', {autoAlpha:1});


// clone the class '.card'

function cloningCards(){

    for (var i=0; i<totalCards; i++){
        let clone = theCard.cloneNode(true);
        theBoard.appendChild(clone);
    }
    // remove the first item in class card
    let elements = document.getElementsByClassName('card');
    elements[0].parentNode.removeChild(elements[0]);
}


// !splash animation

// animations for begin button
let splashAnimation = gsap.timeline();

splashAnimation.to('#splash', {autoAlpha:1, duration: 1})

.from (mySun, {
    scale: .9, 
    transformOrigin: 'center center',
    duration: 1.5,
    ease: 'power4.out',
    repeat: -1,
    yoyo: true
})

.from (myClouds, {
    x: 900, 
    duration: 3,
    ease: 'power1.out'
},'-=2')


.from(myLetters, {
    opacity: 0,
    y: -40,
    stagger: {
        each: .05,
        ease: 'circ.in',
        duration: .5,
    },
    duration: .5
}, '-=1')


.from (myEat, {
    autoAlpha: 0,
    duration: 3,
    rotation: -20,
    ease: 'power1',
    scale: .5
})

.from (myShadow, {
    autoAlpha: 0,
    duration: 2
})


.from (myWelcome, {
    scale: .8,
    transformOrigin: 'center center',
    autoAlpha: 0,
    duration: 3
});


gsap.fromTo (myTrees, {
  rotation: 0,
  transformOrigin: 'center center'

}, {
    rotation:5,
    duration: 3,
     repeat:-1, 
     ease:"none",
      yoyo:true, 
      duration:1.5
})

beginBtn.addEventListener('click', function(){
    gsap.to('#splash', {autoAlpha: 0});
    document.body.style.background = 'url(./img/bkground.svg)';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center center fixed';
    gsap.to('#obj', {autoAlpha: 1});
});

beginButton.addEventListener('click', function(){
    gsap.to('#splash', {autoAlpha: 0});
    document.body.style.background = 'url(./img/bkground.svg)';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center center fixed';
    gsap.to('#obj', {autoAlpha: 1});
});

    // allow user to choose a specific deck
    gsap.utils.toArray(theButtons).forEach(function(btn, index){
        btn.addEventListener('click', function(){
            if (index === 0){

                deckX = deckA.slice(0,deckA.length).concat(deckA.slice(0,deckA.length));
                theBack = './img/deckA/card00.svg'
                uniqueCard = deckA.length;
            } else {

                deckX = deckB.slice(0,deckB.length).concat(deckB.slice(0,deckB.length));
                theBack = './img/deckB/card00.svg'
                uniqueCard = deckB.length;
            }
            totalCards = uniqueCard * 2;
            cloningCards();
            setUpGame();
        })
    })

// setupGame function

function setUpGame() {

    // remove the buttons
    gsap.to('#obj', {autoAlpha:0});

    // shuffle card
    for(var i=0; i<totalCards; i++){
        let randNum = Math.floor(Math.random()*deckX.length);
        newDeck[i] = deckX[randNum];
        deckX.splice(randNum, 1);
    }

    let deckOfCard = gsap.utils.toArray('.card > .faces');

    deckOfCard.forEach(function(card, index){
        let newId = 'img' + (index + 1);
        document.getElementById('imgX').id = newId;

    // place graphics
        document.getElementById(newId).src = newDeck[index];

    // back cover
        let backId = 'bk' + (index + 1);
        document.getElementById('bk').id = backId;
        document.getElementById(backId).src = theBack;

        card.index = index;
        card.id = newId;
    
        let animation = gsap.timeline({paused: true});
        animation.fromTo(card, {rotationY:180},{rotationY:0});
        card.animation = animation;

        card.addEventListener('click', flipCard);
    })

// reveal the board
gsap.set(theBoard, {autoAlpha: 1});
}

// function flipCard
function flipCard(){

    // this.animation.play();
    if(firstCard === null){
        firstCard = this.index;
        firstId = this.id;
        firstAnimation = this.animation;
        this.animation.play();
    }
    else if (secondCard === null && this.id != firstId) {
        secondCard = this.index;
        secondId = this.id;
        secondAnimation = this.animation;
        this.animation.play();

        setTimeout(function(){

        if(newDeck[firstCard] === newDeck[secondCard]){
                // animation
               let id_one = '#'+firstId;
               let id_two = '#'+secondId;
               gsap.to([id_one, id_two], {autoAlpha:0, rotateY: 60, duration: 2, ease: "power1",});
               totalMatch++;
            //    
            if(totalMatch === uniqueCard) {
            //   reset all variables
            totalMatch = 0;
            firstCard = secondCard = null;
            firstId = secondId = null;
            firstAnimation = secondAnimation = null;
            deckX = newDeck = [];
            // remove all clone cards
            removeCloning();
            // play win animation
            winAnimation.restart();

            }
        }
            else {
                firstAnimation.reverse();
                secondAnimation.reverse();
            }
            
            firstCard = secondCard = null;
        }, 500);
    }
}

function removeCloning(){
    let elements = document.getElementsByClassName('card');
    // reset the first item in card to 'imgX' and src
    document.getElementsByTagName('img')[0].setAttribute('id', 'imgX');
    document.getElementsByTagName('img')[1].setAttribute('id', 'bk');
    document.getElementById('imgX').setAttribute('src', './img/deckA/card01.svg');

    // remove all others
    while(elements.length > 1) {
        elements[1].parentNode.removeChild(elements[1]);

    }
    gsap.set(theBoard, {autoAlpha:0});
}








}


