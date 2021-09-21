import create from 'zustand';

// for form errors
const useShotFormStore = create((set, get) => ({
    formError: [],
    setFormError: (error) => set(state => ({formError: error}))
  }))

// eventually for recipes inMemory state persistance when navigating back and forth between pages.
const useRecipesStore = create((set, get) => ({
  myRecipes: [],
  setMyRecipes: (data) => set(state => ({myRecipes: data})),
  recipeSlice: [],
  setRecipeSlice: (data) => set(state => ({recipeSlice: data})),
  currPage: 1,
  setCurrPage: (number) => set(state => ({currPage: number})),
  nextPage: 1,
  setNextPage: (number) => set(state => ({nextPage: number})),
  recipesPerPage: 8,
  setRecipesPerPage: (number) => set(state => ({recipesPerPage: number})),
  totalRecipes: 8,
  setTotalRecipes: (number) => set(state => ({totalRecipes: number})),
  sortFilters: {},
  setSortFilters: (data) => set(state => ({sortFilters: data})),
  isLoading: true,
  setIsLoading: (bool) => set(state => ({isLoading: bool})),
  refresh: false,
  setRefresh: (bool) => set(state => ({refresh: bool}))
}))

const globalStore = create((set, get) => ({
  userId: '',
  getJWTFromStorage: async() => {
    try{
      const token = localStorage.getItem('Authorization');
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return await JSON.parse(window.atob(base64));
    }
    catch(err){
      console.log(err);
    }
  },
  getUserIdFromJWT: (token) => {
    try{
      if(!token){
        token = localStorage.getItem('Authorization');
      }
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
    try {
      const isValid = await fetch('/api/verify-auth', {
        method: "GET",
        headers: { 'Authorization': localStorage.getItem('Authorization') }
      })
      const parseRes = await isValid.json();

      if(parseRes.verified){
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