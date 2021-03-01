
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

function check(value,id){
  if(value ==''){
    addError(id)
  } else {
    addOk(id)
  }
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
      valid = false
  
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
  showNumberTab(n)
}

function showNumberTab(value){
  const tab = document.querySelectorAll('.position')
  let field = document.querySelector('.info-place-value')

  if(value >=2 && value<(tab.length-1)){
    document.querySelector('.field__but-reset').insertAdjacentHTML('afterbegin',`
    <button class="button-add">добавить заведение</button>`)
    field.innerHTML = `Заведение № ${value-1}`
  }else if(value === (tab.length-1)){
    document.querySelector('.button-add').remove()
  }
  const buttonAdd = document.querySelector('.button-add')
  buttonAdd&&buttonAdd.addEventListener('click', ()=> {
  addRest(value)
  addStep(value)
  })
}

function addStep(value){
    let step = document.querySelectorAll('.step')
    step[step.length-1]
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
  for (let i = 0; i < x.length-1; i++) {
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
      document.querySelectorAll('.legalPostAdress').forEach(element =>{
        element.style.display ='none'
      })}else {
      document.querySelectorAll('.legalPostAdress').forEach(element =>{
        element.style.display ='flex'
    })}
  })


  buttonRadio.addEventListener('click',()=>{
  if(buttonRadio.checked === true) {
    document.querySelector('.radio').style.display = 'none'
  }else {
    document.querySelector('.radio').style.display = 'flex'
  }
})



   
function addRest(value){
  document.querySelector('.field__info-place').insertAdjacentHTML('afterend',
  `<div class="position field__info-place">
  <h2 class="field__text info-place-value">Заведение ${value}</h2>
  <p>Введите информацию о Заведении, подключаемом к сервису Luckey. Данное Заведение будет привязано к юридическому лицу, указанному ранее.</p>
  <p class="text-subtitle">Контактные данные</p>
<div class="form__item">
  <label for="institutionFormat" class="form__label">Формат заведения</label>
  <input id="institutionFormat" type="text" name="institutionFormat" class="form__input req" onchange=" check(this.value,this.id)">
</div>
<div class="form__item">
  <label for="institutionName" class="form__label">Название заведения</label>
  <input id="institutionName" type="text" name="institutionName" class="form__input req" onchange=" check(this.value,this.id)">
</div>
<div class="form__item">
  <label for="institutionCity" class="form__label">Город</label>
  <input id="institutionCity" type="text" name="institutionCity" class="form__input req" disabled value="Минск">
</div>
<div class="form__item">
  <label for="institutionAdress" class="form__label">Адрес</label>
  <input id="institutionAdress" type="text" name="institutionAdress" class="form__input req" onchange=" check(this.value,this.id)">
</div>
<div class="time">
  <p class="form__label">Режим работы</p>
  <div class="time__work">
      <div class="time__div">Пн<input class="time__input" type="time" id="time" name="timeMonFrom"/><input class="time__input" type="time" id="time" name="timeMonTo"/></div>
      <div class="time__div">Вт<input class="time__input" type="time" id="time" name="timeTutFrom"/><input class="time__input" type="time" id="time" name="timeMonTo"/></div>
      <div class="time__div">Ср<input class="time__input" type="time" id="time" name="timeWenFrom"/><input class="time__input" type="time" id="time" name="timeMonTo"/></div>
      <div class="time__div">Чт<input class="time__input" type="time" id="time" name="timeThuFrom"/><input class="time__input" type="time" id="time" name="timeMonTo"/></div>
      <div class="time__div">Пт<input class="time__input" type="time" id="time" name="timeFriFrom"/><input class="time__input" type="time" id="time" name="timeMonTo"/></div>
      <div class="time__div">Сб<input class="time__input" type="time" id="time" name="timeSunFrom"/><input class="time__input" type="time" id="time" name="timeMonTo"/></div>
      <div class="time__div">Вс<input class="time__input" type="time" id="time" name="timeSatFrom"/><input class="time__input" type="time" id="time" name="timeMonTo"/></div>
  </div>
</div>
<div class="form__item">
  <label for="institutionNumber" class="form__label">Номер телефона</label>
  <input id="institutionNumber" type="tel" name="institutionNumber" class="form__input req" onchange=" checkInput(this.value,this.id)" placeholder="+375 (XX) XXX-XX-XX">
</div>
<div class="form__item">
  <label for="institutionWebsite" class="form__label">Сайт (если есть)</label>
  <input id="institutionWebsite" type="text" name="institutionWebsite" class="form__input" placeholder="Ссылка на ваш сайт">
</div>
<p class="text-subtitle">Особенности заведения</p>
<div class="form__item">
  <label for="institutionTypeCook" class="form__label">Тип Кухни</label>
  <input id="institutionTypeCook" type="text" name="institutionTypeCook" class="form__input req" onchange=" check(this.value,this.id)">
  <p>Европейская / Белорусская / Домашняя / Азиатская / Русская / Итальянская / Грузинская / Китайская / Корейская / Авторская / Немецкая / Турецкая / Мексиканская / Индийская / Украинская / Испанская / Тайская</p>
</div>
<div class="form__item">
  <div class="form__title">Самовывоз?</div>
  <div class="form__item">
      <select name="pickup" class="select">
          <option value="">Да</option>
          <option value="">Нет</option>
      </select>
  </div>
</div>
<div class="form__item">
  <div class="form__label">Обслуживание</div>
  <select name="service" class="select">
      <option value="">Обслуживание официантами</option>
      <option value="">Самообслуживание</option>
  </select>
</div>
<div class="form__item">
  <label for="cookingTime" class="form__label">Среднее ремя приготовления</label>
  <input id="cookingTime" type="text" name="cookingTime" class="form__input req" onchange=" check(this.value,this.id)">
</div>
</div>`)
}





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