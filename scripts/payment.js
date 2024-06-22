// script.js
document.addEventListener("DOMContentLoaded", function() {
    const paypalButtonContainer = document.getElementById('paypal-button-container');
    const creditCardFormContainer = document.getElementById('credit-card-form-container');
    const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]');
    const amountRadios = document.querySelectorAll('input[name="amount"]');
    const customAmountInput = document.getElementById('custom-amount');

    const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');
    const elements = stripe.elements();
    const card = elements.create('card');
    card.mount('#credit-card-element');

    function getSelectedAmount() {
        const selectedAmount = document.querySelector('input[name="amount"]:checked').value;
        if (selectedAmount === 'custom') {
            return customAmountInput.value;
        } else {
            return selectedAmount;
        }
    }

    function togglePaymentButtons() {
        const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        if (selectedPaymentMethod === 'paypal') {
            paypalButtonContainer.style.display = 'block';
            creditCardFormContainer.style.display = 'none';
        } else {
            paypalButtonContainer.style.display = 'none';
            creditCardFormContainer.style.display = 'block';
        }
    }

    function toggleCustomAmountInput() {
        const selectedAmount = document.querySelector('input[name="amount"]:checked').value;
        if (selectedAmount === 'custom') {
            customAmountInput.style.display = 'block';
        } else {
            customAmountInput.style.display = 'none';
            customAmountInput.value = selectedAmount; // Update input to selected amount
        }
    }

    function handleAmountInputChange() {
        const customAmountValue = customAmountInput.value;
        if (customAmountValue) {
            document.querySelector('input[name="amount"][value="custom"]').checked = true;
        }
    }

    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', togglePaymentButtons);
    });

    amountRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            toggleCustomAmountInput();
        });
    });

    customAmountInput.addEventListener('input', handleAmountInputChange);

    togglePaymentButtons(); // Initialize the correct payment method display
    toggleCustomAmountInput(); // Initialize the correct amount input display

    paypal.Buttons({
        createOrder: function(data, actions) {
            const selectedFrequency = document.querySelector('input[name="frequency"]:checked').value;
            const planType = selectedFrequency === 'monthly' ? 'MONTHLY' : 'ONE-TIME';

            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: getSelectedAmount()
                    },
                    description: `${planType} donation`
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Transaction completed by ' + details.payer.name.given_name);
            });
        }
    }).render('#paypal-button-container');

    document.getElementById('donation-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        const selectedFrequency = document.querySelector('input[name="frequency"]:checked').value;

        if (selectedPaymentMethod === 'card') {
            const amount = getSelectedAmount() * 100; // Convert to cents for Stripe
            const { paymentIntent, error } = await stripe.createPayment({
                amount: amount,
                currency: 'usd',
                payment_method: {
                    card: card,
                    billing_details: {
                        name: 'Donor Name', // You can collect the donor's name in the form
                    },
                },
                confirm: true
            });

            if (error) {
                console.error(error);
                alert('Payment failed');
            } else {
                alert('Payment successful');
            }
        }
    });
});
