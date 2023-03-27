<template>
    <section class="container pageLogin">
        <NavBar/>
        <h1>Faça seu cadastro</h1>
        <n-form ref="formRef" :model="model">
            <n-form-item 
                path="name" 
                label="Nome"
            >
                <n-input 
                    v-model:value="model.name" 
                    placeholder=""
                    @keydown.enter.prevent 
                />
            </n-form-item>
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
                path="celular" 
                label="Telefone celular"
            >
                <n-input 
                    v-model:value="model.celular" 
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
                    type="password"
                    placeholder=""
                    @input="handlePasswordInput"
                    @keydown.enter.prevent
                />
            </n-form-item>
            <n-form-item
                ref="rPasswordFormItemRef"
                first
                path="reenteredPassword"
                label="Confirme a senha"
            >
                <n-input
                    v-model:value="model.reenteredPassword"
                    :disabled="!model.password"
                    placeholder=""
                    type="password"
                    @keydown.enter.prevent
                />
            </n-form-item>

            <n-button
                display="block"
                @click="handleRegister"
            >
                Cadastrar
            </n-button>
           
        </n-form>
    </section>
  
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import firebase from "@/services/firebaseConnection"
import { ref } from 'vue'
import {useCounterStore} from '@/stores/index'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useCounterStore()
const model = ref({
    name: '',
    email: '',
    celular: null,
    password: null,
    reenteredPassword: null
})
const formRef = ref(null)
const rPasswordFormItemRef = ref(null)
const rules = ref({
                password: [
                    {
                    required: true,
                    }
                ],
                reenteredPassword: [
                    {
                    required: true,
                    trigger: ["input", "blur"]
                    },
                    {
                    validator: validatePasswordStartWith(),
                    trigger: "input"
                    },
                    {
                    validator: validatePasswordSame(),
                    trigger: ["blur", "password-input"]
                    }
                ]
            }) 

function validatePasswordStartWith(rule, value) {
            return !!model.value.password && model.value.password.startsWith(value) && model.value.password.length >= value.length;
        }

function validatePasswordSame(rule, value) {
            return value === model.value.password;
        }

function handlePasswordInput() {
            if (model.value.reenteredPassword) {
                rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
            }
        }

async function handleRegister() {
    let name = model.value.name
    let email = model.value.email
    var user = firebase.auth().createUserWithEmailAndPassword(model.value.email, model.value.password).then(cred => {
    return firebase.firestore().collection('USERS').doc(cred.user.uid).set({ 
        email,
        name
    })
                
    })

    const usuarioLogado = {
            uid: user.uid,
            nome: model.value.nome,
            email: model.value.email,
        };
        await localStorage.setItem('frontpostdois', JSON.stringify(usuarioLogado))
        store.changeUserLogged()
        router.push({ name: 'Home' })

    
    return { user }

            
            /*const {user} = await firebase.auth().createUserWithEmailAndPassword(this.model.email, this.model.password)
            
            await firebase.firestore().collection('users')
            .doc(user.uid).set({
                nome: this.model.nome,
                email: this.model.email,
                celular: this.model.celular
            }) 
            .then( async () => {
                const usuarioLogado = {
                    uid: user.uid,
                    nome: this.model.nome,
                    email: this.model.email,
                };
                await localStorage.setItem('frontblog', JSON.stringify(usuarioLogado))

            })
            .catch(()=> {
                console.log("Erro no cadastro")
            });
            this.$router.push('/')*/
}

</script>

<style scoped>

</style>