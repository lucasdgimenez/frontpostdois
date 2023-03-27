<template>
    <section style="background: #e0e0e0;">
        <NavBarLogged/>
        <div class="container">
            <h1>Usuarios</h1>
            <section v-for="user in users" :key="user.id" class="page">
                <n-card size="medium" class="item">
                    <router-link :to="`/user/${user.id}`">
                        <h3>{{user.name}}</h3>
                    </router-link>
                    <p>{{user.email}}</p>
                </n-card>
            </section>
                
        </div>
    </section>
    
</template>

<script setup>
import NavBarLogged from '@/components/NavBarLogged.vue'
import firebase from "@/services/firebaseConnection"
import { ref, onMounted } from 'vue'

const list = ref([])
const users = ref([])
const loading = ref(false)
const user = ref({})

onMounted(async() => {
    const userLocal = localStorage.getItem('frontpostdois');
    user.value = JSON.parse(userLocal);
    loading.value = true
    await firebase.firestore().collection('USERS')
    .get().then((querySnapshot) => {
        list.value = querySnapshot.docs.map((doc) => {
            loading.value = true
            users.value.push({
                id: doc.id,
                email: doc.data().email,
                name:  doc.data().name
            })
        })
    //console.log("post12121212: ", post)
    loading.value = false;
    console.log("user: ", user)
    console.log("list: ", list)
    })
})
        

</script>

<style scoped>

</style>