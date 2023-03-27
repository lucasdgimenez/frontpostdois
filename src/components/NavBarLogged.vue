<template>
  <div class="navbar">
    <nav>
        <RouterLink to="/">FrontBlog</RouterLink>

        <div>
            <n-button 
                type="error"
                @click="logout"
            >
                Sair
            </n-button>
        </div>
    </nav>
    <!--<nav>
        <h1>
            
        </h1>
        <div class="links">
            <div class="count">
                {{StoreCount.count}}
            </div>
            <button @click="add">Mais</button>
            <button @click="sub">Menos</button>
            <div v-if="!userLogged">
                
            </div>

            <div v-else>
                <n-button type="error" @click="logout">Sair</n-button>
            </div>
        </div>
    </nav>-->
  </div>
</template>

<script setup>
import firebase from "@/services/firebaseConnection"
import {useCounterStore} from '@/stores/index'
import {onMounted, ref} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const hasUser = ref(null)
let StoreCount = useCounterStore()
console.log("StoreCount: ", StoreCount.userLogged)

onMounted(async () => {
    let hasUser = localStorage.getItem('frontpostdois') ? true : false
    console.log("hasUser: ", StoreCount.userLogged === false)
    StoreCount.changeUserLogged(hasUser)
})

async function logout() {
    await firebase.auth().signOut()
        .then(async ()=> {
            await localStorage.removeItem('frontpostdois')
            StoreCount.changeUserLogged(false)
            //this.$store.commit("changeUserLogged", false)
            router.push('/login')
        })


    }
/*export default {
    name: 'NavBar',
    data() {
        return {
            userLogged: false
        }
    },
    created() {
        const user = localStorage.getItem('frontpost');
        this.user = JSON.parse(user);
        console.log("user: ", this.user)
    },
    methods: {
        async logout() {
            await firebase.auth().signOut()
                .then(async ()=> {
                    await localStorage.removeItem('frontpost')
                    this.user = {}
                    //this.$store.commit("changeUserLogged", false)
                    this.$router.push('/login')
                })

            
        },
        add() {
            //let count = this.count + 1
            //this.$store.commit("addCount", count)
            
        },  
        sub() {
            this.count--;
        }   
    }
}*/
</script>

<style scoped>
.navbar {
    background: rgb(41, 41, 126);
    z-index: 99;
}

nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1000px;
    margin: 0 auto;
    padding: 15px;    
}

nav a {
    color: white;
}

nav h1 {
    margin-left: 20px;
}

nav .links {
    margin-left: auto;
}

nav .links a, button {
    margin-left: 16px;
    font-size: 14px;
}

.count {
    color: white;
}

</style>