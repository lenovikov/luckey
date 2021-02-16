
let fieldForCircle = document.querySelector('.navigation')
let navigationList = document.querySelector('.navigation__list')
let navigationBtn = document.querySelector('.navigation__btn')
let navigationElement = document.querySelectorAll('.navigation__link');

let wrapper = document.querySelector('.wrapper')
let backPurple = document.querySelector('.bck-purple')
let backMain = document.querySelector('.bck-main')
let main = document.querySelector('.main__right')
let textTitle = document.querySelector('.main__title')
let textTagline = document.querySelector('.main__tagline')
let textSubtitle = document.querySelector('.main__subtitle')
let textButton = document.querySelector('.main__button')
let mainImage =document.querySelector('.main__image')

let miniBlocks = document.querySelectorAll('.discription__block')



//! прокрутка

$(document).ready(function(){
    $('.services__list').slick({
        slidesToShow:3,
        responsive: [{
            breakpoint: 1260,
            settings: {
                slidesToShow:2 
            },
            breakpoint: 991,
            settings: 'unslick'
        }]
    })
});
$(document).ready(function(){
    $('.download-section__image').slick({
        slidesToShow:1,
        arrows : false,
        
        responsive: [{
            
                breakpoint: 3048,
                settings: "unslick"
            },
            {
               breakpoint: 767,
               settings: {
                  slidesToShow: 1
                      
            }
        }]
    })
});

$(document).ready(function(){
    $('.discription__blocks').slick({
        slidesToShow:1,
        arrows : false, 
        responsive: [{
            
                breakpoint: 3048,
                settings: "unslick"
            },
            {
               breakpoint: 767,
               settings: {
                  slidesToShow: 1,
                  instalSlide:3,
                      
            }
        }]
    })
});

// !=======================================
    
    
    navigationBtn.addEventListener('click', ()=> {
        toggle()
    })

    
    navigationElement.forEach(item => {
        item.addEventListener('click', () => {
            if (navigationBtn.classList.contains('open')) {
                toggle();
            }
        })
    })

    function toggle() {
        navigationBtn.classList.toggle('open')
        navigationList.classList.toggle('open')
    }


//! работа с главным экраном
function showMain() {
    backPurple.classList.add('open')
    wrapper.classList.add('open')
    main.classList.add('open')
    mainImage.classList.add('open')

}
setTimeout(showMain,1000)

function addAnamationText(element) {
    return new Promise((resolve) => {
        setTimeout(()=> {element.classList.add('open')
        resolve()
        },2000)
       
    })
}

function addAnamationTextMin(element) {
    return new Promise((resolve) => {
        setTimeout(()=> {element.classList.add('open')
        resolve()
        },200)
       
    })
}

addAnamationText(textTitle)
.then(()=> addAnamationTextMin(textTagline))
.then(()=> addAnamationTextMin(textSubtitle))
.then(()=> addAnamationTextMin(textButton))

//! скролл

window.addEventListener('scroll', event =>{
    let x = pageYOffset

    if(x > 500 && x <= 1400) {
        openBigSquare()
        openText()
    } else if(x > 1401 && x <= 2300) {
        openCarusel()
    } else if (x > 2300) {
        openDownload()
    }

})

function openBigSquare() {
    miniBlocks.forEach(element => {
       element.classList.add('open')
    })
}

function openText() {
    let discriptionTitle = document.querySelector('.discription__title')
    let discriotionSubtitle = document.querySelector('.discription__subtitle')
    let leftLine = document.querySelector('.discription__text')

    discriptionTitle.classList.add('open')
    discriotionSubtitle.classList.add('open')
    leftLine.classList.add('open')

}


function openCarusel() {
    let servicesCarusel = document.querySelector('.services__list')
    servicesCarusel.classList.add('open')
    let servicesTitle = document.querySelector('.services__title')
    servicesTitle.classList.add('open')
    let servicesSubtitle = document.querySelector('.services__subtitle')
    servicesSubtitle.classList.add('open')
    let servicesSquare = document.querySelector('.services__square')
    servicesSquare.classList.add('open')
    let servicesText = document.querySelector('.services__text')
    servicesText.classList.add('open')
}




function openDownload() {
    let downloadDiscription = document.querySelector('.download-section__discription')
    downloadDiscription.classList.add('open')
    let logoPhone = document.querySelector('.download-section__logo')
    logoPhone.classList.add('open')
    let restPhone = document.querySelector('.download-section__image-restaraunt')
    restPhone.classList.add('open')
}




// ! прокрутка
let navigation = document.querySelector('.navigation')
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    console.log(prevScrollpos);
    console.log(currentScrollPos);
  if (prevScrollpos > currentScrollPos) {
    navigation.classList.remove('open')
  } else {
    navigation.classList.add('open')
  }
  prevScrollpos = currentScrollPos;
}












