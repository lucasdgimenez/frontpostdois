<template>
    <section style="background: #e0e0e0;">
        <NavBarLogged/>
        <div class="container">
            <section style="background: white;" class="page">
                <h1>Perfil</h1>
                <label for="">
                    Nome: {{user.name}}
                </label><br>
                <label for="">
                    E-mail: {{user.email}}
                </label>
            </section>
                
        </div>
    </section>
</template>

<script setup>
import NavBarLogged from '@/components/NavBarLogged.vue'
import firebase from "@/services/firebaseConnection"
import { defineProps } from "vue";
import { ref, onMounted } from 'vue'

const props = defineProps(['id'])
const list = ref([])
const user = ref({})
const loading = ref(false)

    onMounted(async() => {
        const userLocal = localStorage.getItem('frontpostdois');
        user.value = JSON.parse(userLocal);
        loading.value = true
        await firebase.firestore().collection('USERS')
        .get().then((querySnapshot) => {
            list.value = querySnapshot.docs.map((doc) => {
                console.log("doc.id: ", doc.id)
                console.log("props.id: ", props.id)
                if(doc.id === props.id) {
                    user.value = {
                        id: doc.id,
                        name: doc.data().name,
                        email: doc.data().email,
                        
                    }
                    console.log("user: ", user)
                }
                
            })
                
                
                
            loading.value = false;
            
        })

    })
    

</script>

<style scoped>
section {
    height: 60vh;
}
</style>