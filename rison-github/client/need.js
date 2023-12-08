document.addEventListener('DOMContentLoaded',
                            function(event)
                                {
                                    function submitForm(event)
                                        {
                                            event.preventDefault();
                                            const username = document.getElementById('username').value;
                                            const password = document.getElementById('password').value;
                                            const formData =
                                                {
                                                    username: username,
                                                    password: password
                                                };
                                            fetch('/sign',
                                                {
                                                    method: 'POST',
                                                    headers:
                                                        {
                                                            'Content-Type': 'application/json',
                                                        },
                                                        body: JSON.stringify(formData),
                                                })
                                                .then(response => response.json())
                                                .then(data => 
                                                    {
                                                        console.log(data);
                                                    });
                                        }
                                        document.getElementById('ContentId').addEventListener('submit', submitForm);
                                });