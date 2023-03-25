<template>
    <section class="container">
        <h1>Faça seu cadastro</h1>
        <n-form ref="formRef" :model="model" :rules="rules">
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

<script>
import firebase from "@/services/firebaseConnection"
import { useRouter } from 'vue-router'

const router = useRouter()
export default {
    name: 'Register',
    components: {},
    data() {
        return {
            formRef: null,
            rPasswordFormItemRef: null,
            model: {
                name: '',
                email: '',
                celular: null,
                password: null,
                reenteredPassword: null
            },
            rules: {
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
                    validator: this.validatePasswordStartWith,
                    trigger: "input"
                    },
                    {
                    validator: this.validatePasswordSame,
                    trigger: ["blur", "password-input"]
                    }
                ]
            }
        }
    },
    methods: {
        validatePasswordStartWith(rule, value) {
            return !!this.model.password && this.model.password.startsWith(value) && this.model.password.length >= value.length;
        },
        validatePasswordSame(rule, value) {
            return value === this.model.password;
        },
        handlePasswordInput() {
            if (this.model.reenteredPassword) {
                this.rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
            }
        },
        async handleRegister() {
            let name = this.model.name
            let email = this.model.email
            var user = firebase.auth().createUserWithEmailAndPassword(this.model.email, 
            this.model.password).then(cred => {
            return firebase.firestore().collection('USERS').doc(cred.user.uid).set({ 
                email,
                name
            })
                
            })

            const usuarioLogado = {
                    uid: user.uid,
                    nome: this.model.nome,
                    email: this.model.email,
                };
                await localStorage.setItem('frontpost', JSON.stringify(usuarioLogado))

            router.push('/')
            
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
            
            
            
    },

}
</script>

<style scoped>

</style>