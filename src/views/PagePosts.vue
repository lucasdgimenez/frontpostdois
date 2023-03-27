<template>
    <section style="background: #e0e0e0;">
        <NavBarLogged/>
        <div class="container">
        
        <section class="item">     
            
            <n-card>
                <router-link :to="`/user/${post.userId}`">
                    <h2>{{post.autor}}</h2>
                </router-link>
                <!--<span>{{post.created}}</span>-->
                <p style="margin-top: 20px;">{{post.content}}</p>
            </n-card>
            
            <hr>
            <h3>Comentários ({{postComments.length}})</h3>
            <hr>
            <n-form inline>
            <n-input 
                v-model:value="commentBody" 
                placeholder="Escreva seu comentário"
                @keydown.enter.prevent 
            />
            <n-button
                @click="createComment"
                type="info"
            >
                Fazer comentário
            </n-button>
           
        </n-form>

            <div v-for="comment in postComments" :key="comment.id" style="margin-top: 10px;"> 
                <n-card>
                    <router-link :to="`/user/${comment.id_user}`">
                        <h3>{{comment.nameUser}}</h3>
                    </router-link>
                    <p>{{comment.body}}</p>
                </n-card>
                
            </div>
            
        </section>

        </div>
    </section>
    
</template>

<script setup>
import NavBarLogged from '@/components/NavBarLogged.vue'
import firebase from "@/services/firebaseConnection"
import { ref, onMounted } from 'vue'
import { defineProps } from "vue";

const props = defineProps(['id', 'postComplete'])
/*const props = defineProps({
    id: String,
    postComplete: null
})*/

console.log("props: ", props)
const comment = ref("")
const commentBody= ref("")
const post= ref({})
const postComments= ref([])
const list= ref([])
const user= ref({})
const loading = ref(false)

onMounted(async () => {
    const userLocal = localStorage.getItem('frontpostdois');
    user.value = JSON.parse(userLocal);
    loading.value = true
    await firebase.firestore().collection('posts')
    .orderBy('created', 'desc')
    .onSnapshot((doc) => {
            doc.forEach((item) => {
                if(props.id === item.id) {
                    post.value = {
                        id: item.id,
                        autor: item.data().autor,
                        content: item.data().content,
                        comments: item.data().comments,
                        created: item.data().created,
                        userId: item.data().userId
                    }
                }
                
            })
            loading.value = false;
            console.log("post: ", post)
    })

    loading.value = false;

    getComments()

})

async function getComments() {
    console.log("84ew9yr897yr839uyfh8uh")
    await firebase.firestore().collection('postcomments')
    .orderBy('created', 'desc')
    .onSnapshot((doc) => {
        postComments.value = []
        doc.forEach((item) => {
            console.log("item: ", item.id)
            if(props.id === item.data().id_post) {
                postComments.value.push({
                    id_post: item.data().id_post,
                    id_user: item.data().id_user,
                    nameUser: item.data().nameUser,
                    body: item.data().body,
                    created: item.data().created,
                })
            }
            
        })
    })
}

async function createComment() {
    console.log("user.value: ", user.value._value)

    await firebase.firestore().collection('postcomments')
    .add({
        created: new Date(),
        id_post: post.value.id,
        id_user: user.value._value.uid,
        nameUser: user.value._value.nome,
        body: commentBody.value,
    })
    .then(()=> {
        loading.value = false;
        commentBody.value = '';
        alert("Comentario criado com sucesso")
    })
    .catch((error)=> {
        console.log("Erro ao criar post: "+ error)
    })
}

</script>

<style scoped>

</style>