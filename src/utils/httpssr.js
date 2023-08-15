import { useContext } from 'vite-ssr/vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const Config = {
   axiosConfig: {}, // AxiosRequestConfig
   /**
    * For Client, if {true} asyncData will try to block component's initialization
    * if {false} it will fetch the data onMounted hook.
    */
   awaitSetup: true
}

const baseUrl = import.meta.env.VITE_BASE_URL
// 新创建一个对象，避免和客户端的冲突
const _axios = axios.create()
export async function useAsyncData(key, location, config = Config) {
   const { isClient, initialState } = useContext();
   //- craete a ref via initialState[key] value
   const responseValue = ref(initialState[key] || null);
   //- Axios get request
   const request = () => _axios.get(baseUrl+location, config?.axiosConfig);

   //- request handler function, to prevent code duplication I created inline function.
   const handler = async (type) => {
      try {
         const { data } = await request();
         const resp = data.data;
         responseValue.value = resp;
         if (type === 'server') initialState[key] = resp;
      } catch (error) {
         console.log(error);
         // throw error;
      }
   };

   // remove data from initialState when component unmounts or deactivates
   // onUnmounted(() => {
   //    //- make sure that it is client
   //    if (isClient) initialState[key] = null;
   // });
   // onDeactivated(() => {
   //    if (isClient) initialState[key] = null;
   // });

   //- is this function running on server side
   if (!isClient) {
      await handler('server');
   } else {
      //- if this function is running on client side

      //- if initialState[key] already exists mutate responseValue.value
      if (initialState[key]) {
         responseValue.value = initialState[key];
      } else {
         //- if inital state value does not exist fetch the data in onMounted hook.
         const fn = async () => {
            await handler('client');
         };
         if (config?.awaitSetup) {
            await fn();
         } else {
            onMounted(fn);
         }
      }
   }

   return responseValue;
}