const token =
    localStorage.getItem(
        "token"
    );



if(!token){

    window.location = "/";

}





async function loadAccounts(){


    const response =
        await fetch(
            "/accounts",
            {

                headers:{

                    Authorization:
                    "Bearer " + token

                }

            }
        );



    if(!response.ok){


        console.error(
            "Cannot load accounts"
        );


        return;

    }




    const accounts =
        await response.json();



    console.log(
        "Accounts from API:",
        accounts
    );



    renderAccounts(
        accounts
    );


}







function renderAccounts(accounts){



    const container =
        document.getElementById(
            "accounts"
        );



    if(!container){

        console.error(
            "accounts container not found"
        );

        return;

    }



    container.innerHTML = "";




    accounts.forEach(
        account => {



            const name =

                account.name ||

                account.accountName ||

                account.provider ||

                account.id ||

                "Unknown";




            const username =

                account.username ||

                account.login ||

                account.user ||

                "No username";





            const card =

            document.createElement(
                "div"
            );



            card.className =
                "card";



            card.innerHTML = `


                <div class="logo">

                    🌐

                </div>



                <h2>

                    ${name}

                </h2>



                <p>

                    ${username}

                </p>




                <button onclick="openAccount('${account.id}')">

                    Open

                </button>



            `;



            container.appendChild(
                card
            );



        }

    );


}








async function openAccount(
    accountId
){


    console.log(
        "Opening account:",
        accountId
    );



    const response =
        await fetch(

            `/accounts/${accountId}/login`,

            {

                method:"POST",


                headers:{

                    Authorization:
                    "Bearer " + token

                }


            }

        );



    const data =
        await response.json();



    console.log(
        "Login automation result:",
        data
    );



    if(data.success){


        alert(
            "Account opened successfully"
        );


    }else{


        alert(
            "Cannot open account"
        );


    }



}








function logout(){


    localStorage.removeItem(
        "token"
    );


    window.location = "/";


}





loadAccounts();