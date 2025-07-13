const textUrl = document.getElementById('text-url');
const qrCode = document.getElementById('qr-code');

const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');

const apiUrl = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=";

textUrl.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        generateQRCode();
    }
});

generateBtn.addEventListener('click', generateQRCode);

downloadBtn.addEventListener('click', downloadQRCode);

function generateQRCode() {
    const text = textUrl.value.trim();

    if (!errorFunction(text)) {
        return;
    }

    const qrImageUrl = apiUrl + encodeURIComponent(text);
    qrCode.innerHTML = `<img src="${qrImageUrl}" alt="QR Code">`;
    textUrl.value = "";
}

function downloadQRCode() {
    const qrImage = qrCode.querySelector('img');

    if (!qrImage) {
        alert("Please generate a QR code first.");
        return;
    }

    const link = document.createElement('a');

    link.href = qrImage.src;
    link.download = 'qr-code.png';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function errorFunction(text) {
    if (text === "") {
        textUrl.value = "Please enter a valid text or URL.";
        textUrl.classList.add("error");

        setTimeout(() => {
            textUrl.value = "";
            textUrl.classList.remove("error");
        }, 1500);

        return false;
    }

    return true;
}
