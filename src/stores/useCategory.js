import { reactive,computed } from 'vue'
import { defineStore } from 'pinia'
import { getCategories as getCategoriesApi } from '@/api/note'

export const useCategoryStore = defineStore('category', () => {
    // {category:'',size:''}
    const categories = reactive([])
    const getCategories =computed(()=> {
        if (categories.length == 0) {
            getCategoriesApi().then((res) => {
                categories.push(...res.data)
            })
        }
        return categories
    })
    function addCategory(category) {
        categories.push(category)
    }
    return { categories,getCategories, addCategory }
})
