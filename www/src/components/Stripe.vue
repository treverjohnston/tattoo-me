
<!--  -->
<!-- WHEN A PERSON PRESSES THE $ BUTTON IT SETS THE TATTOO OBJECT IN THE STATE AT THIS.$STORE.STATE.CONFIRM -->
<!--  -->
<template>
	<div id='app'>
		<h1>Please give us your payment details:</h1>
		<card class='stripe-card' :class='{ complete }' stripe='pk_test_cr5DjQkjunl2TGMOTUIRhzk7' :options='stripeOptions' @change='complete = $event.complete'
		/>
		<button class='pay-with-stripe' @click='pay' :disabled='!complete'>Pay with credit card</button>
	</div>
</template>

<script>
	// import { stripeKey, stripeOptions } from './stripeConfig.json'
	import { Card, createToken } from 'vue-stripe-elements'

	export default {
		data() {
			return {
				complete: false,
				stripeOptions: {
					// see https://stripe.com/docs/stripe.js#element-options for details
				}
			}
		},

		components: { Card },

		methods: {
			pay() {
				// createToken returns a Promise which resolves in a result object with
				// either a token or an error key.
				// See https://stripe.com/docs/api#tokens for the token object.
				// See https://stripe.com/docs/api#errors for the error object.
				// More general https://stripe.com/docs/stripe.js#stripe-create-token.
				createToken().then(data => {
					if (data.token)
						this.$store.dispatch('purchaseTattoo', { token: data.token, tattooId: '59b1c589cb41352e30cee15f' })
					else
						console.log(data)
				})
			}
		}
	}

</script>

<style>
	.stripe-card {
		width: 300px;
		border: 1px solid grey;
	}

	.stripe-card.complete {
		border-color: green;
	}
</style>