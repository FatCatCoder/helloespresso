import create from 'zustand';

const useShotFormStore = create((set, get) => ({
    formError: [],
    setFormError: (error) => set(state => ({formError: error}))
  }))

const useNewRecipeStore = create((set, get) => ({

}))

const globalStore = create((set, get) => ({
  userId: '',
  //setUserId: (id) => set(state => ({userId: id})),
  getUserIdFromJWT: () => {
    const token = localStorage.getItem('Authorization');
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    set({userId: JSON.parse(window.atob(base64)).user.id});
    return JSON.parse(window.atob(base64)).user.id;
}
}))


export {globalStore, useShotFormStore};