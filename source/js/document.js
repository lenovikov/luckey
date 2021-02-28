


let containerDoc = document.querySelector('.document__container')
let documentSubtitle = document.querySelectorAll('.text')
let documentInfo = document.querySelector('.document__info')

let documentbtn = document.querySelector('.btn-document')
let documentList = document.querySelector('.document__main')

let decendant = Array.prototype.slice.call(
    document.querySelector('.document__container').querySelectorAll('*')
)


documentSubtitle.forEach(element => {
    element.addEventListener('click', event => {
        change()
    })
})




function change() {
    decendant.forEach(element => {
        element.classList.add('open-list')
     });
     containerDoc.classList.add('open-list')
     documentbtn.classList.add('open-list')


}

// !!!!!=========================


documentbtn.addEventListener('click', ()=> {
    toggle()
})

function toggle() {

    documentbtn.classList.toggle('open')
    documentList.classList.toggle('open')
}


//    const url ="https://storage.luckey.by/docs/privacy_policy.docx"

//    function getData(method,url,body = null) {
//        return fetch(url).then(response => {
//            return response.json()
//        })
//    }

//    getData('GET',getData)
//    .then(data => console.log(data))
//    .catch(err => console.log(err))


// import { convertToHtml } from "../../node_modules/mammoth/lib/index.js"

function loadworddoc(){

    var doc = new ActiveXObject("Word.Application"); // creates the word object
  
    doc.Visible=false; // doesn't display Word window
  
    doc.Documents.Open("C:\\Users\lehan\Downloads\privacy_policy (4).docx"); // specify path to document
  
                 
  
    //copy the content from my word document and throw it into my variable
  
    var txt;
  
    txt = doc.Documents("C:\\My Documents\\file.doc").Content; 
  
    document.all.myarea.value = txt;
  
    doc.quit(0); // quit word (very important or you'll quickly chew up memory!)
  
  }