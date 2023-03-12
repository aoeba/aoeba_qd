import { reactive,computed } from 'vue'
import { defineStore } from 'pinia'
import { getTags as getTagsApi } from '@/api/note'

export const useTagStore = defineStore('tag', () => {
    // {name:'',size:''}
    const tags = reactive([])
    const getTags = computed(()=> {
        if (tags.length == 0) {
            getTagsApi().then((res) => {
                tags.push(...res)
            })
        }
        return tags
    })
    function addTag(tag) {
        tags.push(tag)
    }
    return { tags,getTags, addTag }
})
