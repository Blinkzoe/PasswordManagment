async function login(){


    const username =
        document.getElementById(
            "username"
        ).value;


    const password =
        document.getElementById(
            "password"
        ).value;



    const response =
        await fetch(
            "/auth/login",
            {

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json"

                },

                body:JSON.stringify({

                    username,

                    password

                })

            }
        );



    const data =
        await response.json();



    if(!response.ok){


        document.getElementById(
            "message"
        ).innerText =
        "Login incorrect";


        return;

    }



    localStorage.setItem(
        "token",
        data.token
    );


    console.log(
        "Logged in"
    );


    window.location =
        "/dashboard.html";


}