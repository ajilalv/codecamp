document.addEventListener('DOMContentLoaded', () => {
    //Image names to use
    const imageNames = ['fries', 'hotdog', 'cheeseburger', 'ice-cream', 'milkshake', 'pizza']

    //create an array from the image names
    var CardsArray = createArray()

    //shuffle the array of images
    CardsArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid');
    const resulttext = document.querySelector('#result')
    var cardsChosen = []
    var cardsChosenId = []
    var score = 0;
    var checkAlready = []

    //Creates an Array from image list
    function createArray() {
        let tempary = []
        for (let index = 0; index < 2; index++) {
            imageNames.forEach(image => {
                tempary.push({ name: image, img: 'images/' + image + '.png' })
            })
        }
        return tempary;
    }

    //create Game Board
    function createBorad() {
        for (let index = 0; index < CardsArray.length; index++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png')
            card.setAttribute('id', index)
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }

    //If only two cards remaining to click, then the game is finished
    function onlyLastTwoCardLeft() {
        var cards = document.querySelectorAll('img')
        var remCards = [];
        cards.forEach(element => {
            if (element.src.endsWith('images/blank.png')) {
                remCards.push(element)
            }
        });
        if (remCards.length === 2) {
            cards[remCards[0].id].setAttribute('src', CardsArray[remCards[0].id].img)
            cards[remCards[1].id].setAttribute('src', CardsArray[remCards[1].id].img)
            cards[remCards[0].id].removeEventListener('click', flipCard);
            cards[remCards[1].id].removeEventListener('click', flipCard);
            setTimeout(gameFinished, 200)
        }
    }

    function gameFinished() {
        score++;
        resulttext.textContent = "Congrats, you won this game !! your score is : " + score;
        var btn = document.createElement('button')
        btn.textContent = "Restart game"
        btn.addEventListener('click', restartGame)
        resulttext.appendChild(btn)
    }

    function restartGame() {
        location.reload();
    }
    function checkForMatch() {
        let match = cardsChosen[0].name === cardsChosen[1].name;
        var cards = document.querySelectorAll('img')

        if (match) {
            cards[cardsChosenId[0]].setAttribute('src', 'images/white.png')
            cards[cardsChosenId[1]].setAttribute('src', 'images/white.png')
            //remove lister
            cards[cardsChosenId[0]].removeEventListener('click', flipCard);
            cards[cardsChosenId[1]].removeEventListener('click', flipCard);
            score++;
            resulttext.textContent = score;
        } else {
            cards[cardsChosenId[0]].setAttribute('src', 'images/blank.png')
            cards[cardsChosenId[1]].setAttribute('src', 'images/blank.png')
        }
        //reset selection
        cardsChosen = []
        cardsChosenId = []
        //if only two cards left, then finish the game
        onlyLastTwoCardLeft()
    }

    function flipCard() {
        var cardId = this.id;
        this.setAttribute('src', CardsArray[cardId].img)
        cardsChosen.push(CardsArray[cardId])
        cardsChosenId.push(cardId)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }

    createBorad()
});
