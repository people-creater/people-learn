import {defineStore} from "pinia";
import {ref} from "vue";

//定义用户token,setToken方法
export const useUsersStore = defineStore('users', ()=>{
    const token = ref('')
    const setToken = (newValue)=>{
        token.value = newValue
    }
    return {
        token,
        setToken
    }
})