<template>
    <div class="login">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-offset-4 col-xs-4">
                    <h2 class="words">Log In</h2>
                    <form @submit.prevent="login">
                        <div class="form-group">
                            <input type="email" class="form-control" v-model="logEmail" placeholder="email">
                            <input type="password" class="form-control" v-model="logPassword" placeholder="password">
                            <button type="submit" class="btn btn-default">Login</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-offset-4 col-xs-4">
                    <div class="text-center">
                        <h2 class="words">Register</h2>
                        <form @submit.prevent="register">
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="name" placeholder="name">
                                <input type="email" class="form-control" v-model="email" placeholder="email">
                                <input type="password" class="form-control" v-model="password" placeholder="password">
                                <div class="check">
                                    <input type="radio" id="one" value="regular" v-model="picked">
                                    <label for="one">Customer</label>
                                    <input type="radio" id="two" value="artist" v-model="picked">
                                    <label for="two">Artist</label>
                                </div>
                                <button type="submit" class="btn btn-default">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                name: '',
                email: '',
                password: '',
                logEmail: '',
                logPassword: '',
                picked: ''
            }
        },
        methods: {
            login() {
                var obj = {
                    email: this.logEmail,
                    password: this.logPassword,
                }
                this.$store.dispatch('login', obj)
            },
            logout() {
                this.$store.dispatch('logout')
            },
            register() {
                var obj = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    accountType: this.picked
                }
                this.$store.dispatch('register', obj)
                name = '';
            }
        },
        computed: {
            loggedIn() {
                return this.$store.state.loggedIn
            },
            registering() {
                return this.$store.state.registering
            },
            logging() {
                return this.$store.state.logging
            }
        }
    }
</script>

<style scoped>
    .check {
        font-size: 2rem;
        color: white;
    }

    .words {
        color: white;
    }

    .boards {
        color: white;
        background-color: transparent
    }

    .or {
        color: white;
        /* background-color: rgba(0, 0, 0, .8); */
        border-radius: 5px;
    }

    .vue-kanban {
        color: white;
        font-size: 18rem;
        font-family: 'Encode Sans Condensed', sans-serif;
    }
    /* .my-boards {
            position: fixed;
            bottom: 0;
            right: 400px;
        } */
    /* .me-boards {
            width: 800px; */
    /* } */

    .form-control {
        margin: 1rem 0 1rem 0;
    }

    .form-group {
        margin-top: 2rem;
        /* background-color: rgba(0, 0, 0, .8); */
        padding: 1rem;
        border-radius: 5px;
    }

    .login {
        background-color: rgba(0, 0, 0, .8);
        /* border-radius: 25px; */
        /* margin: 0 10rem 0 10rem; */
        padding-top: 3rem;
        padding-bottom: 100vh;
    }
</style>