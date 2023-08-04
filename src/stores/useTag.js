import { reactive, computed, toRaw } from 'vue'
import { defineStore } from 'pinia'
import { useAsyncData } from '@/utils/httpssr'

export const useTagStore = defineStore('tag', () => {
    // {name:'',size:''}
    const tags = reactive([])
    const getTags = computed(() => {
        if (tags.length == 0) {
            useAsyncData('tag', '/note/getTags').then(res => {
                const t = toRaw(res.value)
                tags.push(...t)
            })
        }
        return tags
    })
    function addTag(tag) {
        tags.push(tag)
    }
    return { tags, getTags, addTag }
})
