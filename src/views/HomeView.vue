<template>
   <section class="">
        <div class="container">
        <n-form class="form">
            <n-input 
                v-model:value="body" 
                type="textarea"
                placeholder="Escreva sua postagem"
                @keydown.enter.prevent 
            />
            <n-button
                @click="createPost"
                type="info"
            >
                Criar post
            </n-button>

        </n-form>

        <div v-if="loading.value">
            <h2>Buscando...</h2>
        </div>

        <section v-else style="margin-top: 10px;">
            <div 
                v-for="(post, index) in posts" 
                :key="post.userId+index" 
                @click="goPost(post.id, post)" 
                class="item"
            >
                <n-card :title="post.autor" size="medium" color="blue">
                    <span>{{new Date(post.created.seconds*1000)}}</span>
                    <p>{{post.content}}</p>
                    <hr>
                </n-card>               
            </div>
        </section>

        
        
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {useCounterStore} from '@/stores/index'
import firebase from "@/services/firebaseConnection"
import { useRouter } from 'vue-router'

const router = useRouter()
const storeCounter = useCounterStore()

const count = ref(0)
const user = ref({})
const posts = ref([])
const body = ref("")
const loading = ref(false)

onMounted(async () => {
  const userLocal = localStorage.getItem('frontpostdois');
  user.value = JSON.parse(userLocal);
  await firebase.firestore().collection('posts')
  .orderBy('created', 'desc')
  .onSnapshot((doc) => {
    posts.value = []
        doc.forEach((item) => {
            /*let seconds = item.data().created.seconds;
            let formatted = $moment(seconds*1000).format('MMMM Do YYYY, h:mm:ss a')
            console.log("formatted: ", formatted)*/
            posts.value.push({
                id: item.id,
                autor: item.data().autor,
                content: item.data().content,
                comments: item.data().comments,
                created: item.data().created,
                userId: item.data().userId
            })
        })
        loading.value = false;
        console.log("p: ", posts)
})
})

function goPost(idPost, postComplete) {
  console.log("idPost: ", idPost)
  console.log("postComplete: ", postComplete.autor)
  router.push({name: 'PagePosts', params: { id: idPost ,postComplete: postComplete.autor } })
}

async function createPost() {
  console.log("121212: ", user.value)
  if(body.value === '') {
      alert("Campo de post vazio, digite alguma coisa")
      return;
  } 

  await firebase.firestore().collection('posts')
  .add({
      created: new Date(),
      content: body.value,
      autor: user.value._value.nome,
      userId: user.value._value.uid,
      comments: 0
  })
  .then(()=> {
      this.input = '';
      alert("Post criado com sucesso")
  })
  .catch((error)=> {
      console.log("Erro ao criar post: "+ error)
  })
}

</script>


<style scoped>
.count {
  font-size: 50px;
}
</style>