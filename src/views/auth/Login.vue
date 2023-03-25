<template>
    <section class="all">
        <div class="container pageLogin">
        <h1>Faça o login</h1>
        <n-form ref="formRef" :model="model">
            <n-form-item 
                path="email" 
                label="E-mail"
            >
                <n-input 
                    v-model:value="model.email" 
                    placeholder=""
                    @keydown.enter.prevent 
                />
            </n-form-item>
            <n-form-item 
                path="password" 
                label="Senha"
            >
                <n-input
                    v-model:value="model.password"
                    placeholder=""
                    type="password"
                    @keydown.enter.prevent
                />
            </n-form-item>

            <n-button
                @click="handleLogin"
            >
                Login
            </n-button>
           
        </n-form>
        </div>
    </section>
    
</template>

<script setup>
import firebase from "@/services/firebaseConnection"
import { ref } from 'vue'
import {useCounterStore} from '@/stores/index'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useCounterStore()
const model = ref({
    email: '',
    password: null,
})

 async function handleLogin() {
    const {user} = await firebase.auth().signInWithEmailAndPassword(model.value.email, model.value.password)
    console.log("user: ", user)
    const userProfile = await firebase.firestore().collection('USERS')
    .doc(user.uid).get();

    const usuarioLogado = ref({
        uid: user.uid,
        nome: userProfile.data().name
    })

    localStorage.setItem('frontpostdois', JSON.stringify(usuarioLogado))
    store.changeUserLogged()
    //this.$store.commit("changeUserLogged", true)
    router.push({ name: 'Home' })

}
/*export default {
    name: 'Login',
    data() {
        return {
            model: {
                email: '',
                password: null,
                list: [],
                userLogged: {}
            } 
        }
    },
    methods: {
        async handleLogin() {
            const {user} = await firebase.auth().signInWithEmailAndPassword(this.model.email, this.model.password)
            console.log("user: ", user)
            const userProfile = await firebase.firestore().collection('USERS')
            .doc(user.uid).get();

            const usuarioLogado = {
                uid: user.uid,
                nome: userProfile.data().name
            }

            localStorage.setItem('frontpost', JSON.stringify(usuarioLogado))
            this.$store.commit("changeUserLogged", true)
            this.$router.push({ name: 'Home' })
        
        }
    }
}*/

</script>


<style scoped>
.pageLogin {
    background: #EDEEF0;
}

</style>