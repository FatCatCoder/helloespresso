import React from 'react';
import './App.scss';

function Header(){
    return(
        <>
        <div id="header" class="border-bottom pb-1">
        <img alt="altLogoImg" class="img-fluid d-block mx-auto w-25" src="https://icons-for-free.com/iconfiles/png/512/coffee+espresso+machine+portafilter+tamper+icon-1320086035176622247.png" />

        <h1 class="text-center">hello coffee</h1>      
      </div>


      <div id="navbar" class="text-center mx-auto d-flex justify-content-center border-bottom w-50 pb-2">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <a class="nav-link active bg-secondary" aria-current="page" href="#">Pull</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Journal</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Recipes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" tabindex="-1" aria-disabled="true">About</a>
          </li>
        </ul>
      </div>
      </>
    )
}

export default Header;