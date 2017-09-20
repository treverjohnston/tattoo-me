<template>
    <div class="purchased">
        <md-whiteframe md-elevation="24">
            <div @click="zoomIn(cardProp)" class="well picture">
                <div class="row">
                    <div v-if="!showButtons">
                        <div class="col-xs-2">
                            <button @click="show" class="btn show glyphicon glyphicon-chevron-right"></button>
                        </div>
                    </div>
                    <div v-if="showButtons">
                        <div class="col-xs-2">
                            <button @click="show" class="btn show glyphicon glyphicon-chevron-left"></button>
                        </div>
                        <div class="col-xs-2">
                            <router-link :to="'/artistmobile'">
                                <button @click="zoomIn(cardProp)" class="btn glyphicon glyphicon-resize-full"></button>
                            </router-link>
                        </div>
                        <div class="col-xs-4">
                            <md-button v-if="liked" @click="like(cardProp._id)" class="vote btn"><span class="glyphicon glyphicon-thumbs-up liked"></span> {{cardProp.numLikes}}</md-button>
                            <md-button v-else @click="like(cardProp._id)" class="vote btn"><span class="glyphicon glyphicon-thumbs-up"></span> {{cardProp.numLikes}}</md-button>
                        </div>
                        <div class="col-xs-2">
                            <button @click="check(cardProp._id)" class="btn glyphicon glyphicon-remove"></button>
                        </div>
                    </div>
                </div>
                <router-link :to="'/artistmobile'">
                    <div class="row">
                        <div class="col-xs-12">
                            <img :src="cardProp.url" alt="image">
                        </div>
                    </div>
                </router-link>
            </div>
        </md-whiteframe>
    </div>
</template>

<script>
    export default {
        name: 'purchased',
        props: ["cardProp"],
        data() {
            return {
                showButtons: false
            }
        },
        methods: {
            check(id) {
                var id = id
                var _this = this
                swal("Are you sure you want to delete this?", {
                    buttons: {
                        cancel: "Nope!",
                        delete: true,
                    },
                })
                    .then((value) => {
                        switch (value) {
                            case "delete":
                                _this.$store.dispatch('removeTattoo', id);
                                swal("Welp that's gone forever");
                                break;

                            case "cancel":
                                return;

                            default:
                                return;
                        }
                    })
            },
            zoomIn(card) {
                this.$store.commit('zoomIn', card)
            },
            like(id) {
                if (this.signedIn()) {
                    var obj = {
                        id: id
                    }
                    this.$store.dispatch('like', obj)
                }
            },
            show() {
                this.showButtons = !this.showButtons
            },
            confirm(card) {
                this.$store.commit('confirm', card)
            }
        },
        computed: {
            liked() {
                if (!this.$store.state.userInfo._id)
                    return false;
                return this.cardProp.likes.includes(this.$store.state.userInfo._id)
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    a {
        color: black;
    }

    .vote {
        color: black;
    }

    img {
        min-width: 20vw;
    }


    .btn {
        background-color: transparent;
        font-size: 4rem;
        color: black;
    }

    .liked {
        color: green
    }

    .well {
        padding: 0 0 5em 0;
    }
</style>