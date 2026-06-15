function showSection(id){

    let sections = document.querySelectorAll('.section');

    sections.forEach(section=>{
        section.classList.remove('active');
    });

    document.getElementById(id).classList.add('active');
}
document.getElementById("contactForm").addEventListener("submit", async function(e){
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    alert(result.message);
});