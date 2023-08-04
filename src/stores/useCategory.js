import { reactive, computed, toRaw } from 'vue'
import { defineStore } from 'pinia'
import { useAsyncData } from '@/utils/httpssr'

export const useCategoryStore = defineStore('category', () => {
    // {category:'',size:''}
    const categories = reactive([])
    const getCategories = computed(() => {
        if (categories.length == 0) {
            useAsyncData('category', '/note/getCategories').then(res => {
                const c = toRaw(res.value)
                categories.push(...c)
            })
        }
        return categories
    })
    function addCategory(category) {
        categories.push(category)
    }
    return { categories, getCategories, addCategory }
})
