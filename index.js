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
            Swal.fire({
                icon: "warning",
                title: "Peringatan!",
                text: "Silakan isi semua kolom.",
                confirmButtonText: "OK"
            });
            return;
        }

        // Cek format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: "error",
                title: "Email Tidak Valid!",
                text: "Harap masukkan email yang benar.",
                confirmButtonText: "OK"
            });
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

                // Notifikasi sukses dengan redirect otomatis
                Swal.fire({
                    icon: "success",
                    title: "Registrasi Berhasil!",
                    text: result.message || "Anda akan diarahkan ke halaman login.",
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    // Reset form setelah sukses
                    document.getElementById("name").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("password").value = "";

                    // Redirect ke halaman login
                    window.location.href = "https://pdfmulbi.github.io/login";
                });

            } else {
                const errorData = await response.json();
                Swal.fire({
                    icon: "error",
                    title: "Registrasi Gagal!",
                    text: errorData.message || "Silakan coba lagi.",
                    confirmButtonText: "OK"
                });
            }
        } catch (error) {
            console.error("Error during registration:", error);
            Swal.fire({
                icon: "error",
                title: "Terjadi Kesalahan!",
                text: "Silakan coba lagi nanti.",
                confirmButtonText: "OK"
            });
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
