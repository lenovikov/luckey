
const form = document.getElementById('form')
document.addEventListener('DOMContentLoaded', ()=>{

    form.addEventListener('submit',formSend)

    async function formSend(e) {
        e.preventDefault()
        let formData = new FormData(form)
            let response = await fetch('',{
                method:'POST',
                body:formData
            })
            if(response.ok) {
                form.reset()
            }else {
                alert('ошибка')
            }
            alert('заполните поля')
    }
})


function checkInput(value,id){
  if(id ==="UNP"){
    if(value.length === 9){
      addOk(id)
      delInfoErro() 
    }else {
      infoError(id,'unp')
      addError(id)
  }}else if(id = 'numberRasch'){
    if(value.length === 28){
      addOk(id)
      delInfoErro() 
    } else {
      infoError(id,'checkAcc')
      addError(id)
    }}else if(id = 'numberContactFace'){
      if(value.length === 13){
        addOk(id)
        delInfoErro() 
      } else {
        infoError(id,'checNumber')
        addError(id)
      }}
}

function infoError(id,mes){
  delInfoErro()
  document.querySelector(`#${id}`).parentElement.insertAdjacentHTML("afterend",`
  <p class="disc-error">${errorLog[mes]}</p>`)
}


function delInfoErro() {
  const element = document.querySelector(`.disc-error`)
  element&&element.remove()
}

function addOk(id) {
  document.querySelector(`#${id}`).parentElement.classList.remove('error')
  document.querySelector(`#${id}`).parentElement.classList.add('ok');
}

function addError(id) {
  document.querySelector(`#${id}`).parentElement.classList.add('error');
  document.querySelector(`#${id}`).parentElement.classList.remove('ok');
}





function validateForm() {
  let x
  let y
  let i
  let valid = true;
  x = document.querySelectorAll(".position");
  y = x[currentTab].querySelectorAll('.req');
  for (i = 0; i < y.length; i++) {

    if(y[i].type =='checkbox' && y[i].checked === false){
      y[i].parentElement.classList.add("error")
  
    }else if (y[i].value == "") {
      y[i].parentElement.classList.add("error")
      valid = false;
    }else {
      y[i].parentElement.classList.remove("error")
    }
  }
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}

// ! передвижение формы

let currentTab = 0;
showTab(currentTab)

function showTab(n) {
  let tab = document.querySelectorAll('.position')
  tab[n].style.display='block'
  let prevBut = document.getElementById("prevBtn")
  let nextBut = document.getElementById("nextBtn")

  nextBut.addEventListener('click',()=>{
    scroll(0,600)
  })

  if (n == 0) {
      prevBut.style.display = "none";
      } else {
      prevBut.style.display = "block";
      }
  
  if (n == (tab.length - 1)) {
      nextBut.style.display = "none";
      document.querySelector('.form__button').style.display = "block"
    }

  if(n < tab.length-1 ){
    nextBut.style.display = "block";
    document.querySelector('.form__button').style.display = "none"
    
  }
    fixStepIndicator(n)
}

function nextPrev(n) {
  let tab = document.querySelectorAll('.position')
  // if(n==1 && !(validateForm())) {return false}
  tab[currentTab].style.display = "none";
  currentTab = currentTab + n

  if (currentTab >= tab.length) {
      
      return false;
  }
  showTab(currentTab);

  
}

function fixStepIndicator(n) {
  let x = document.querySelectorAll(".step");
  for (let i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", " finish");
  }
  x[n].className += " active";
}



  const errorLog = {
    unp: 'Данного номера УНП не существует',
    empty: 'Нужно ввести данные',
    checkAcc: 'Данного расчетного счёта не существует',
    checkNumber: 'невенрный формат номера'
  }
  

  const buttonPost = document.querySelector('.post-input')
  const buttonRadio = document.querySelector('.radio-chek')
  

  buttonPost.addEventListener('click',()=> {
    if(buttonPost.checked === true) {
      document.querySelector('.legalPostAdressInd').style.display = 'none'
      document.querySelector('.legalPostAdressCit').style.display = 'none'
      document.querySelector('.legalPostAdressAdr').style.display = 'none'
    }else {
      document.querySelector('.legalPostAdressInd').style.display = 'flex'
      document.querySelector('.legalPostAdressCit').style.display = 'flex'
      document.querySelector('.legalPostAdressAdr').style.display = 'flex'
    }
  })


  buttonRadio.addEventListener('click',()=>{
  if(buttonRadio.checked === true) {
    document.querySelector('.radio').style.display = 'none'
  }else {
    document.querySelector('.radio').style.display = 'flex'
  }
})

   





  /* function formValidate() {
        let error = 0
        let formReq = document.querySelectorAll('.req')
        
        for(let index = 0; index < formReq.length;index++){
            const input = formReq[index]
            formRemoveError(input)
            

            if(input.getAttribute("type") === "checkBox" && input.checked === false){
                formAddError(input)
                error++
            }else {
                if(input.value ===''){
                    formAddError(input)
                    error++
                }
            }
        }

        return error
    }


    function formAddError(input){
        input.parentElement.classList.add('error')
        input.classList.add('error')
    }

    function formRemoveError(input){
        input.parentElement.classList.remove('error')
        input.classList.remove('error')
    } */