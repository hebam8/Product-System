var productNameInput= document.getElementById('productNameInput');
var productPriceInput= document.getElementById('productPriceInput');
var productCategoryInput= document.getElementById('productCategoryInput');
var productDescriptionInput= document.getElementById('productDescriptionInput');

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
}

function validateProductName(){
var regex=/^[A-Z][a-z]{3,8}$/;
if (regex.test(productNameInput.value) == true){
    productNameInput.classList.replace('is-invalid','is-valid')
 return true
}
else{
    productNameInput.classList.add('is-invalid')
    return false
}
;


}