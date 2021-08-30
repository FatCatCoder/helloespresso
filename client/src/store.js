import create from 'zustand';
import axios from 'axios';

// for form errors
const useShotFormStore = create((set, get) => ({
    formError: [],
    setFormError: (error) => set(state => ({formError: error}))
  }))

// eventually for recipes inMemory state persistance when navigating back and forth between pages.
const useRecipesStore = create((set, get) => ({
  recipes: [],
  setRecipes: (data) => set(state => ({recipes: data})),
  currPage: 1,
  setCurrPage: (number) => set(state => ({currPage: number}))
}))

const globalStore = create((set, get) => ({
  userId: '',
  getUserIdFromJWT: () => {
    try{
    const token = localStorage.getItem('Authorization');
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    set({userId: JSON.parse(window.atob(base64)).user.id});
    return JSON.parse(window.atob(base64)).user.id;
    }
    catch(err){
      console.log(err);
    }
  },
  isLoggedIn: false,
  setIsLoggedIn: (bool) => {
    set(state => ({isLoggedIn: bool}))
  },
  checkValidToken: async () => {
    const config = {
      method: 'get',
      url: '/verify-auth',
      headers: { 'Authorization': localStorage.getItem('Authorization') }
    }
    try {
      const isValid = await axios(config);
      console.log(isValid.data.verified);

      if(isValid.data.verified){
        set(state => ({isLoggedIn: true}))
        return true;
      }
      set(state => ({isLoggedIn: false}))
        return false;
      } 
    catch (error) {
      set(state => ({isLoggedIn: false}))
      return false;
    }
  },
  currentPage: '/',
  setCurrentPage: (pageStr) => {
    set(state => ({currentPage: pageStr}))
  },
  loadingAuth: true,
  setLoadingAuth: (bool) => {
    set(state => ({loadingAuth: bool}))
  }
}))


export {globalStore, useShotFormStore, useRecipesStore};