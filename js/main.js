var productNameInput= document.getElementById('productNameInput');
var productPriceInput= document.getElementById('productPriceInput');
var productCategoryInput= document.getElementById('productCategoryInput');
var productDescriptionInput= document.getElementById('productDescriptionInput');

console.log(productNameInput,productPriceInput,productCategoryInput,productDescriptionInput);
var  productContainer;

if (localStorage.getItem("my product") != null){
 productContainer=JSON.parse(localStorage.getItem("my product"));
 displayProuduct(productContainer);
}
else{
    productContainer=[];
}

function  addProduct() {
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

function clearForm(){
    productNameInput.value="";
    productPriceInput.value="";
    productCategoryInput.value="";
    productDescriptionInput.value=""
}

function displayProuduct(productList){
var cartoona=``;
for(i=0; i<productList.length; i++){
    cartoona+=`    <tr>
    <td>${i+1}</td>
    <td>${productList[i].name}</td>
    <td>${productList[i].price}</td>
    <td>${productList[i].category}</td>
    <td>${productList[i].description}</td>
    <td><button class="btn btn-outline-warning">update</button></td>
    <td><button class="btn btn-outline-danger">delete</button></td>
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