var productNameInput= document.getElementById('productNameInput');
var productPriceInput= document.getElementById('productPriceInput');
var productCategoryInput= document.getElementById('productCategoryInput');
var productDescriptionInput= document.getElementById('productDescriptionInput');
var textValidateName=document.getElementById('textValidateName')
var textValidatePrice=document.getElementById('textValidatePrice')
var textValidateCategory=document.getElementById('textValidateCategory')
var textValidateDesc=document.getElementById('textValidateDesc')

console.log(productNameInput,productPriceInput,productCategoryInput,productDescriptionInput);
var  productContainer;
var idUpdate =0;
addBtn=document.getElementById('addBtn');
updateBtn=document.getElementById('updateBtn');

if (localStorage.getItem("my product") != null){
 productContainer=JSON.parse(localStorage.getItem("my product"));
 displayProuduct(productContainer);
}
else{
    productContainer=[];
}

function  addProduct() {

    if (validateProductName() == true){
        var product={
            name:productNameInput.value   ,
            price:productPriceInput.value,
            category:productCategoryInput.value,
            description:productDescriptionInput.value
         }  
         productContainer.push(product);
         console.log(productContainer);
         localStorage.setItem("my product",JSON.stringify(productContainer))
         clearForm();
         displayProuduct(productContainer);
    }
  else{
    alert('product invalid')
  }
}

function clearForm(){
    productNameInput.value="";
    productPriceInput.value="";
    productCategoryInput.value="";
    productDescriptionInput.value=""
}

function displayProuduct(productList){
var cartoona=``;
for(var i=0; i<productList.length; i++){
    cartoona+=`    <tr>
    <td>${i+1}</td>
    <td>${productList[i].name}</td>
    <td>${productList[i].price}</td>
    <td>${productList[i].category}</td>
    <td>${productList[i].description}</td>
    <td><button onclick=setFormForUbdate(${i}) class="btn btn-outline-warning">update</button></td>
    <td><button onclick=deletProuduct(${i}) class="btn btn-outline-danger">delete</button></td>
</tr>`
}

document.getElementById('tableBody').innerHTML=cartoona;
}


function searchProuduct(searchTerm){
    var searchResult=[];
    for(var i=0; i< productContainer.length; i++){
        if (productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())){
               searchResult.push(productContainer[i])
        }
    }
    displayProuduct(searchResult)
}


function deletProuduct(deletedItem){
    productContainer.splice(deletedItem,1);
    localStorage.setItem('my product', JSON.stringify(productContainer));
    displayProuduct(productContainer);
}

function setFormForUbdate(updatedIndex){
    idUpdate = updatedIndex;
    productNameInput.value =productContainer[updatedIndex].name;
    productPriceInput.value =productContainer[updatedIndex].price;
    productCategoryInput.value =productContainer[updatedIndex].category;
    productDescriptionInput.value =productContainer[updatedIndex].description;
    
    updateBtn.classList.replace('d-none','d-inline-block');
    addBtn.classList.add('d-none');
}

function updateProdut(){
   
    var product= {
        name:productNameInput.value   ,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        description:productDescriptionInput.value
    }   
      productContainer.splice(idUpdate,1,product);
      console.log(productContainer)
      localStorage.setItem('my product',JSON.stringify(productContainer));
      displayProuduct(productContainer)
      clearForm()
      addBtn.classList.replace('d-none','d-inline-block');
      updateBtn.classList.add('d-none');
}

// function validateProductName(){
// var regex=/^[A-Z][a-z]{3,8}$/;
// if (regex.test(productNameInput.value) == true){
//     productNameInput.classList.replace('is-invalid','is-valid')
//  return true
// }
// else{
//     productNameInput.classList.add('is-invalid')
//     return false
// }
// ;


// }



//  ---------validation ---------------
function validateProductName(){
 
    var regEx=/^[A-Z][a-z ]{3,20}$/;
   if ( regEx.test(productNameInput.value) ){
    productNameInput.classList.replace('is-invalid', 'is-valid');
    textValidateName.innerHTML='';
    return true;
   }
   else{
    productNameInput.classList.add('is-invalid');
    textValidateName.innerHTML='Please enter your name start with capital letter';

    return false;
   }
}

function validateProductPrice(){
    var regEx=/^[0-9]{1,}$/;
   if ( regEx.test(productPriceInput.value)){
    productPriceInput.classList.replace('is-invalid', 'is-valid');
    textValidatePrice.innerHTML='';
    return true;
   }
   else{
    productPriceInput.classList.add('is-invalid');
    textValidatePrice.innerHTML='The price shoud be only numbers';

    return false;
   }
}
function validateProductCategory(){
    var regEx=/^[a-z A-Z]{5,30}$/;
   if ( regEx.test(productCategoryInput.value)  ){
    productCategoryInput.classList.replace('is-invalid', 'is-valid');
    textValidateCategory.innerHTML='';
    return true;
   }
   else{
    productCategoryInput.classList.add('is-invalid');
    textValidateCategory.innerHTML='The text size must be no less than 5 characters and no more than 30 characters.';

    return false;
   }
}
function validateProductDescription(){
    var regEx=/^[a-z A-Z0-9]{5,90}$/;
   if ( regEx.test(productDescriptionInput.value) ){
    productDescriptionInput.classList.replace('is-invalid', 'is-valid');
    textValidateDesc.innerHTML='';
    return true;
   }
   else{
    productDescriptionInput.classList.add('is-invalid');
    textValidateDesc.innerHTML='The text size must be no less than 5 characters and no more than 30 characters.';
    return false;
   }

}
