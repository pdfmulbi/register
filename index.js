document.addEventListener("DOMContentLoaded", function () {
    const registerButton = document.getElementById("registerButton");

    registerButton.addEventListener("click", async function (event) {
        event.preventDefault();

        // Ambil nilai input
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Validasi sederhana
        if (!name || !email || !password) {
            alert("Silakan isi semua kolom.");
            return;
        }

        // Cek format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Email tidak valid.");
            return;
        }

        // Data yang akan dikirim ke backend
        const data = {
            name: name,
            email: email,
            password: password,
        };

        try {
            // URL endpoint backend
            const targetUrl = "https://asia-southeast2-pdfulbi.cloudfunctions.net/pdfmerger/pdfm/register";

            // Kirim data ke backend
            const response = await fetch(targetUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            // Periksa status respons
            if (response.ok) {
                const result = await response.json();
                alert(result.message || "Registrasi berhasil!");

                // Reset form setelah sukses
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";

                // Redirect ke halaman login
                window.location.href = "https://pdfmulbi.github.io/login";
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Gagal melakukan registrasi. Silakan coba lagi.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Terjadi kesalahan saat melakukan registrasi. Silakan coba lagi.");
        }
    });

    // Password visibility toggle
    const passwordInput = document.getElementById("password");
    const togglePasswordButton = document.getElementById("togglePassword");
    const toggleIcon = togglePasswordButton.querySelector("i");

    togglePasswordButton.addEventListener("click", () => {
        const isPasswordVisible = passwordInput.type === "text";
        passwordInput.type = isPasswordVisible ? "password" : "text";
        toggleIcon.classList.toggle("fa-eye-slash", isPasswordVisible);
        toggleIcon.classList.toggle("fa-eye", !isPasswordVisible);
    });
});
