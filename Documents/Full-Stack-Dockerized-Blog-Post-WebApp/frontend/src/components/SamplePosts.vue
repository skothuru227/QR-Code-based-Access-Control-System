<template>
    <section class="col-12"> 
        <form class="p-2" v-on:submit.prevent="handleSubmit"> 
            <div class="form-row">
                <div class="col-5">
                    <input type="text" class="form-control" v-model="postContent" placeholder="Post something">
                </div>
                <div class="col-1">
                    <button type="submit" class="btn btn-primary mb-2">Submit</button>
                </div>
            </div>
        </form>
        <div class="row p-2"> 
            <div v-if="!posts"> 
                <p> Fetching posts... </p>
            </div>
            <div class="col-6" v-else> 
                <p v-for="(post, index) in posts" class="post" :key="`post${index}`"> 
                        {{post.content}} 
                </p>
            </div>
        </div>
    </section>
</template>

<script>
    import {baseUrl} from '../constants/constants';

    export default {
        data() {
            return {
                postContent: null,
                posts: null
            }
        },
        methods: {
            async fetchPosts() {
                try {
                    const response = await fetch(`${baseUrl}get_posts`);
                    const json = await response.json();
                    if(json['code']===200) {
                        return json.posts;
                    } else {
                        console.error(`Error while fetching posts: ${json}`);
                    }
                } catch(err) {
                    console.error(err);
                }  
            },
            async createPost(data) {
                try {
                    const response = await fetch(`${baseUrl}create_post`, {
                        method: 'POST',
                        headers:{
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                    const json = await response.json();
                    if(json['code']===200) {
                        console.log(`Post created successfully: ${JSON.stringify(json)}`);
                        return json.post;
                    } else {
                        console.error(`Error while creating post: ${json}`);
                    }
                } catch(err) {
                    console.error(err);
                }  
            },  
            async handleSubmit() {
                console.log(`About to create post: ${this.postContent}`);
                const post = await this.createPost({
                    content: this.postContent
                });
                this.posts.push(post);
                this.postContent = '';
            }
        },
        async mounted() {
            this.posts = await this.fetchPosts();
        }
    }
</script>

<style scoped lang="scss"> 
    .post {
        text-align: left;
        padding: 5px;
        border: 1px solid grey;
    }
</style>