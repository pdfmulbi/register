// Import fungsi postJSON
// import { postJSON } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js';

document.addEventListener("DOMContentLoaded", function () {
    const registerButton = document.getElementById("registerButton");

    registerButton.addEventListener("click", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Basic validation
        if (!name || !email || !password) {
            alert("Silakan isi semua kolom.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Kata sandi dan konfirmasi kata sandi tidak cocok.");
            return;
        }

        // Cek nama unik di backend
        try {
            const checkUrl = `https://asia-southeast2-pdfulbi.cloudfunctions.net/pdfmerger/pdfm/get/users?name=${encodeURIComponent(name)}`;
            const checkResponse = await fetch(checkUrl);

            if (!checkResponse.ok) {
                throw new Error("Gagal memeriksa ketersediaan nama.");
            }

            const checkData = await checkResponse.json();

            if (checkData.exists) {
                alert("Nama sudah digunakan. Silakan gunakan nama lain.");
                return;
            }

            // Prepare data for registration
            const data = {
                name: name,
                email: email,
                password: password,
            };

            // URL endpoint backend
            const target_url = "https://asia-southeast2-pdfulbi.cloudfunctions.net/pdfmerger/pdfm/register";

            // Tampilkan spinner loading (opsional)
            document.getElementById("loading-spinner").style.display = "block";

            // Kirim data ke backend
            const response = await postJSON(
                target_url,
                "Content-Type",
                "application/json",
                data
            );

            // Sembunyikan spinner loading
            document.getElementById("loading-spinner").style.display = "none";

            if (response.status >= 200 && response.status < 300) {
                alert("Registration successful!");
                // Reset form setelah berhasil
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
            } else {
                alert("Error: " + response.data.message);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Terjadi kesalahan saat melakukan registrasi. Silakan coba lagi.");
            document.getElementById("loading-spinner").style.display = "none";
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.getElementById('togglePassword');
    const toggleIcon = togglePasswordButton.querySelector('i');

    // Add event listener to the toggle button
    togglePasswordButton.addEventListener('click', () => {
        // Check current state
        const isPasswordVisible = passwordInput.type === 'text';

        // Toggle password visibility
        passwordInput.type = isPasswordVisible ? 'password' : 'text';

        // Toggle the icon
        toggleIcon.classList.toggle('fa-eye', !isPasswordVisible);
        toggleIcon.classList.toggle('fa-eye-slash', isPasswordVisible);
    });
});