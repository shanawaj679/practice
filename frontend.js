async function putdata() {
    try {
        const data = {
            email: document.getElementById("email").value,
            name: document.getElementById("name").value,
            password: document.getElementById("password").value
        };

        const response = await fetch(
            "http://localhost:3000/postdata",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        const outcome = await response.text();
        console.log(outcome);
    }
    catch (err) {
        console.log(err);
    }
}

async function getdata() {
    try {
        const response = await fetch(
            "http://localhost:3000/getdata"
        );

        if (!response.ok) {
            console.log("Error", response.status);
            return;
        }

        const data = await response.json();

        document.getElementById("showdata").innerHTML =
            data.map(user =>
                `<p>${user.name} - ${user.email}</p>`
            ).join("");
    }
    catch (err) {
        console.log(err);
    }
}

async function modifydata() {
    try {
        const data = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };

        const response = await fetch(
            "http://localhost:3000/updatedata",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        const outcome = await response.text();
        console.log(outcome);
    }
    catch (err) {
        console.log(err);
    }
}

async function deletedata() {
    try {
        const email =
            document.getElementById("email").value;

        const response = await fetch(
            "http://localhost:3000/deletedata",
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            }
        );

        const outcome = await response.text();
        console.log(outcome);
    }
    catch (err) {
        console.log(err);
    }
}