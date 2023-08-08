const searchBar = document.querySelector(".search input"),
searchIcon = document.querySelector(".search button"),
usersList = document.querySelector(".users-list");

searchIcon.onclick = ()=>{
  searchBar.classList.toggle("show");
  searchIcon.classList.toggle("active");
  searchBar.focus();
  if(searchBar.classList.contains("active")){
    searchBar.value = "";
    searchBar.classList.remove("active");
  }
}

{/* <div class="users-list"><br>
<b>Fatal error</b>:  Uncaught TypeError: mysqli_fetch_assoc(): Argument #1 ($result) must be of type mysqli_result, bool given in D:\Kunal Agrawal\xampp files\htdocs\ChatApp\php\data.php:7
Stack trace:
#0 D:\Kunal Agrawal\xampp files\htdocs\ChatApp\php\data.php(7): mysqli_fetch_assoc(false)
#1 D:\Kunal Agrawal\xampp files\htdocs\ChatApp\php\users.php(11): include_once('D:\\Kunal Agrawa...')
#2 {main}
  thrown in <b>D:\Kunal Agrawal\xampp files\htdocs\ChatApp\php\data.php</b> on line <b>7</b><br>
</div> */}

searchBar.onkeyup = ()=>{
  let searchTerm = searchBar.value;
  if(searchTerm != ""){
    searchBar.classList.add("active");
  }else{
    searchBar.classList.remove("active");
  }
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "php/search.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
          let data = xhr.response;
          usersList.innerHTML = data;
        }
    }
  }
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("searchTerm=" + searchTerm);
}

setInterval(() =>{
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "php/users.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
          let data = xhr.response;
          if(!searchBar.classList.contains("active")){
            usersList.innerHTML = data;
          }
        }
    }
  }
  xhr.send();
}, 500);

