const form = document.getElementById("loginForm");
const erro = document.getElementById("erro");

// Login fixo (você pode mudar)
const emailCorreto = "admin@email.com";
const senhaCorreta = "123456";

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if(email === emailCorreto && senha === senhaCorreta) {
    window.location.href = "index.html"; // página ADM
  } else {
    erro.textContent = "Email ou senha incorretos";
  }
});