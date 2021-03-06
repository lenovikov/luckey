const errorLog = {
  unp: 'Данного номера УНП не существует',
  empty: 'Нужно ввести данные',
  checkAcc: 'Данного расчетного счёта не существует',
  checkNumber: 'невенрный формат номера',
  checkEmail: 'некоректный Email'
}

//! ==================================


const form = document.getElementById('form')
document.addEventListener('DOMContentLoaded', ()=>{

    form.addEventListener('submit',formSend)
    async function formSend(e) {
        e.preventDefault()
        if(validateFormSubm()){
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
        }
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
  }}else if(id ==='numberRasch'){
    if(value.length === 28){
      addOk(id)
      delInfoErro() 
    } else {
      infoError(id,'checkAcc')
      addError(id)
    }
  }else if(id ==='emailContactFace'){
    if(validateEmail(value)){
      addOk(id)
      delInfoErro() 
    }else{
      infoError(id,'checkEmail')
      addError(id)
    }}

}
function validateEmail(value){
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if(reg.test(value) == false){
    return false
  }else {
    return true
  }
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

function validateFormSubm() {
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
  return valid;
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

// !==================================================================

let currentTab = 0;
showTab(currentTab)

function showTab(n) {
  
  let tab = document.querySelectorAll('.position')
  tab[n].style.display='block'
  let prevBut = document.getElementById("prevBtn")
  let nextBut = document.getElementById("nextBtn")

  if (n == 0) {
      prevBut.style.display = "none";
      } else {
      prevBut.style.display = "block";
      }
  
    if(n < tab.length-1 ){
      scroll(0,600)
      if(n>=2){
        document.querySelector('.button-add').style.display ="block"
      }else if(n<2){
        document.querySelector('.button-add').style.display ="none"
      }
      nextBut.style.display = "block";
      document.querySelector('.form__button').style.display = "none"
    }

  if (n == (tab.length - 1)) {
      nextBut.style.display = "none";
      document.querySelector('.form__button').style.display = "block"
      document.querySelector('.button-add').style.display ="none"
    }
  fixStepIndicator(n)
}

const buttonAdd = document.querySelector('.button-add')
  buttonAdd&&buttonAdd.addEventListener('click', ()=> {
  addStep()
  nextPrev(1)
  })

function addStep(){
      let x = document.querySelectorAll(".step");
      x[x.length-1].insertAdjacentHTML('afterend',`
      <span class="step">${x.length+1}</span>
      `)
      addRest(x.length-1)
}

function nextPrev(n) {
  let tab = document.querySelectorAll('.position')
  if(n==1 && !(validateForm())) {return false}
   
  tab[currentTab].style.display = "none";
  currentTab = currentTab + n
  if(currentTab === tab.length){
    
  }


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
  
function addRest(value){
  document.querySelector('.field__connected-services').insertAdjacentHTML('beforebegin',
  `<div class="position field__info-place">
  <h2 class="field__text info-place-value">Заведение №${value}</h2>
  <p class="form__text">Введите информацию о Заведении, подключаемом к сервису Luckey. Данное Заведение будет привязано к юридическому лицу, указанному ранее.</p>
  <p class="text-subtitle">Контактные данные</p>
<div class="form__item">
  <label for="institutionFormat${value-1}" class="form__label">Формат заведения</label>
  <input id="institutionFormat${value-1}" type="text" name="institutionFormat${value-1}" class="form__input req" placeholder="Ресторан" onchange=" check(this.value,this.id)">
</div>
<div class="form__item">
  <label for="institutionName${value-1}" class="form__label">Название заведения</label>
  <input id="institutionName${value-1}" type="text" name="institutionName${value-1}" class="form__input req" onchange=" check(this.value,this.id)">
</div>
<div class="form__item">
  <label for="institutionCity${value-1}" class="form__label">Город</label>
  <input id="institutionCity${value-1}" type="text" name="institutionCity${value-1}" class="form__input req" disabled value="Минск">
</div>
<div class="form__item">
  <label for="institutionAdress${value-1}" class="form__label">Адрес</label>
  <input id="institutionAdress${value-1}" type="text" name="institutionAdress${value-1}" class="form__input req" onchange=" check(this.value,this.id)">
</div>
<div class="time">
  <p class="form__label">Режим работы</p>
  <div class="time__work">
      <div class="time__div">Пн<input class="time__input ${value-1}" type="time" id="time" name="timeMonFrom${value-1}"/><input class="time__input" type="time" id="time" name="timeMonTo"/></div>
      <div class="time__div">Вт<input class="time__input ${value-1}" type="time" id="time" name="timeTutFrom${value-1}"/><input class="time__input" type="time" id="time" name="timeMonTo"/></div>
      <div class="time__div">Ср<input class="time__input ${value-1}" type="time" id="time" name="timeWenFrom${value-1}"/><input class="time__input" type="time" id="time" name="timeMonTo"/></div>
      <div class="time__div">Чт<input class="time__input ${value-1}" type="time" id="time" name="timeThuFrom${value-1}"/><input class="time__input" type="time" id="time" name="timeMonTo"/></div>
      <div class="time__div">Пт<input class="time__input ${value-1}" type="time" id="time" name="timeFriFrom${value-1}"/><input class="time__input" type="time" id="time" name="timeMonTo"/></div>
      <div class="time__div">Сб<input class="time__input ${value-1}" type="time" id="time" name="timeSunFrom${value-1}"/><input class="time__input" type="time" id="time" name="timeMonTo"/></div>
      <div class="time__div">Вс<input class="time__input ${value-1}" type="time" id="time" name="timeSatFrom${value-1}"/><input class="time__input" type="time" id="time" name="timeMonTo"/></div>
  </div>
</div>
<div class="form__item">
  <label for="institutionNumber${value-1}" class="form__label">Номер телефона</label>
  <input id="institutionNumber${value-1}" type="tel" name="institutionNumber${value-1}" class="form__input req" onchange="check(this.value,this.id)" placeholder="+375 (XX) XXX-XX-XX">
</div>
<div class="form__item">
  <label for="institutionWebsite${value-1}" class="form__label">Сайт (если есть)</label>
  <input id="institutionWebsite${value-1}" type="text" name="institutionWebsite${value-1}" class="form__input" placeholder="Ссылка на ваш сайт" onchange=" check(this.value,this.id)">
</div>
<p class="text-subtitle">Особенности заведения</p>
<div class="form__item type">
  <label for="institutionTypeCook" class="form__label">Тип Кухни</label>
  <input id="institutionTypeCook" type="text" name="institutionTypeCook${value-1}" class="form__input req" onchange="check(this.value,this.id)">
  <p>Европейская / Белорусская / Домашняя / Азиатская / Русская / Итальянская / Грузинская / Китайская / Корейская / Авторская / Немецкая / Турецкая / Мексиканская / Индийская / Украинская / Испанская / Тайская</p>
</div>
<div class="form__item">
  <div class="form__title">Самовывоз?</div>
  <div class="form__item">
      <select name="pickup${value-1}" class="select">
          <option value="Да">Да</option>
          <option value="Нет">Нет</option>
      </select>
  </div>
</div>
<div class="form__item discauntPickup">
<label for="discauntPickup" class="form__label">Скидка на самовывоз </label>
<input id="discauntPickup" type="text" name="discauntPickup${value-1}" class="form__input discauntPickup-input"><span class="discauntPickup-span">%</span><span class="discauntPickup-span1">в(т.ч. 0)</span>
</div>
<div class="form__item">
  <div class="form__label">Обслуживание</div>
  <select name="service${value-1}" class="select">
      <option value="Обслуивание официантами">Обслуживание официантами</option>
      <option value="Самообслуживание">Самообслуживание</option>
  </select>
</div>
<div class="form__item">
  <label for="cookingTime" class="form__label">Среднее ремя приготовления</label>
  <input id="cookingTime${value-1}" type="text" name="cookingTime" class="form__input req" onchange=" check(this.value,this.id)">
</div>
</div>`)
}


//! reset 
//! =========================================================
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
  document.querySelector('.radio').style.display = 'flex'
}else {
  document.querySelector('.radio').style.display = 'none'
}
})

let select = document.querySelector('.pickup')

select.addEventListener('change',()=> {
  if(select.options[select.selectedIndex].value==="Нет"){
    document.querySelector('.discauntPickup').style.display="none"
  }else{
    document.querySelector('.discauntPickup').style.display="block"
  }
})

let deposit = document.querySelector('.deposit')

deposit.addEventListener('change',()=> {
  if(deposit.options[deposit.selectedIndex].value==="Нет"){
    document.querySelector('.deposit__text').style.display="none"
  }else{
    document.querySelector('.deposit__text').style.display="block"
  }
})

let buttonReset = document.querySelector('.field__but-reset')
buttonReset.addEventListener('click',resetField)
function resetField(){
  let x  
  let y
  x = document.querySelectorAll(".position");
  y = x[currentTab].querySelectorAll('.req');


  for (i = 0; i < y.length; i++) {
    y[i].value = '';
    y[i].checked = false;
  }

  for (i = 0; i < y.length; i++) {
  if (y[i].value == "") {
    y[i].parentElement.classList.remove("ok") 
    y[i].parentElement.classList.add("error") }
  }
}