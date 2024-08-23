async function submitData() {
    const url = "https://script.google.com/macros/s/AKfycbyjVlm6qaWIOpw1a3uIdFWVOeExkVfr-LDNWtb_LsrFAeLoGC_3XkbfEQTp1nZjWFbcHQ/exec"; // Replace with your Apps Script web app URL

    const form = document.getElementById("dataForm");
    const formData = new FormData(form);

    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message")
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        document.getElementById("response").textContent = "Data submitted successfully!";
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("response").textContent = "An error occurred.";
    }
}
