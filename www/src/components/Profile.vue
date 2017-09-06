<template>
    <div class="profile">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12">
                    <h2>
                        {{info.name}}
                    </h2>
                </div>
                <div class="col-xs-12">
                    <h2>
                    {{info.email}}
                    </h2>
                </div>
                <div class="col-xs-12">
                    <button @click="logout()" class="btn btn-default">Logout</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'profile',
        data() {
            return {
            }
        },
        methods: {
            logout() {
                return this.$store.dispatch('logout')
            }
        },
        computed: {
            info() {
                return this.$store.state.userInfo
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button{
    margin-top: 2rem;
}
</style>