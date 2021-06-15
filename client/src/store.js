import create from 'zustand';

const useShotFormStore = create((set, get) => ({
    formError: [],
    setFormError: (error) => set(state => ({formError: error}))
  }))

const useNewRecipeStore = create((set, get) => ({

}))


export default useShotFormStore;
  