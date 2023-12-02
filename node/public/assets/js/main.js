// wait until the dom is ready
document.addEventListener('DOMContentLoaded', function(event){
    // alert('dom is ready');
    //submit function
    function submitForm(event){
        //prevent the default button behavior 
        event.preventDefault();

        const name = document.getElementById('name').value;
        const country = document.getElementById('country').value;
        const formData = {
            name: name,
            country: country
        };

        fetch('/signup', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById('msg-text').textContent = data.message;
            document.getElementById('msg-container').classList.add('msg-visible'); 
        });

        //  alert('data is ready '+name +':'+country);
    }

    document.getElementById('signupForm').addEventListener('submit', submitForm);
});