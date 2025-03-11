let selectedFile = null;
const cloudinaryName = 'dvyrzhdi5';

document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
});

function loadGallery() {
    fetch('/api/get-cloudinary-gallery', {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha ao carregar a galeria');
        }
        return response.json();
    })
    .then(data => {
        const imageGallery = document.getElementById('imageGallery');
        imageGallery.innerHTML = '';

        data.resources.forEach(image => {
            const img = document.createElement('img');
            img.src = image.secure_url;
            img.alt = image.public_id;
            img.className = 'gallery-image';
            
            img.onclick = () => openFullScreen(image.secure_url);

            imageGallery.appendChild(img);
        });
    })
    .catch(error => {
        alert('Um erro ocorreu durante o carregamento da galeria.');
        console.error('Erro ao carregar a galeria:', error);
    });
};

function openFullScreen(imageUrl) {
    const fullScreenContainer = document.createElement('div');
    fullScreenContainer.className = 'fullscreen-container';
    fullScreenContainer.onclick = () => closeFullScreen(fullScreenContainer);

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Imagem em Tela Cheia';
    img.className = 'fullscreen-image';
    
    fullScreenContainer.appendChild(img);
    document.body.appendChild(fullScreenContainer);
};

function closeFullScreen(container) {
    if (container && container.parentNode) {
        document.body.removeChild(container);
    }
};

function uploadToCloudinary() {
    if (!selectedFile) {
        alert('Nenhum arquivo selecionado. Escolha uma imagem primeiro.');
        return;
    }

    const imageFileInput = document.getElementById('imageFileInput');
    const selectedFileName = document.getElementById('selectedFileName');
    const imagePreview = document.getElementById('imagePreview');
    const uploadButton = document.getElementById('uploadButton');
    const chooseButton = document.getElementById('chooseButton');

    uploadButton.disabled = true;
    uploadButton.textContent = 'Fazendo Upload...';

    chooseButton.disabled = true;
    chooseButton.textContent = 'Esperando Upload...';

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'gallery-unsigned-preset');

    fetch(`https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha no upload.');
        }
        return response.json();
    })
    .then(data => {
        if (data.secure_url) {
            alert('Upload realizado com sucesso.');
            imageFileInput.value = '';
            selectedFile = null;
            selectedFileName.textContent = '';
            imagePreview.src = '';
            imagePreview.classList.add('hidden');
            loadGallery();
        } else {
            alert('Falha no upload. Tente novamente.');
        }
    })
    .catch(error => {
        alert('Um erro ocorreu durante o upload.');
        console.error('Erro de upload:', error);
    })
    .finally(() => {        
        uploadButton.disabled = false;
        uploadButton.textContent = 'Fazer Upload';
        chooseButton.disabled = false;
        chooseButton.textContent = 'Escolher Imagem';
    });
};

function handleFileChange(event) {
    selectedFile = event.target.files[0];

    const selectedFileName = document.getElementById('selectedFileName');
    const imagePreview = document.getElementById('imagePreview');

    selectedFileName.textContent = '';
    imagePreview.src = '';
    imagePreview.classList.add('hidden');

    if (!selectedFile) return;

    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/avif'];
    if (!allowedTypes.includes(selectedFile.type)) {
        alert('Somente os formatos JPG, JPEG, PNG, WEBP, SVG e AVIF são permitidos.');
        return;
    }

    const maxSizeInBytes = 10485760; // 10 MB
    if (selectedFile.size > maxSizeInBytes) {
        alert('O tamanho do arquivo não deve ser maior que 10 MB.');
        return;
    }

    selectedFileName.textContent = 'Imagem Selecionada: ' + selectedFile.name;
    const reader = new FileReader();
    reader.onload = function(e) {
        imagePreview.src = e.target.result;
        imagePreview.classList.remove('hidden');
    };
    reader.readAsDataURL(selectedFile);
};

function openUploadWidget() {
    const widget = cloudinary.createUploadWidget({
        cloudName: cloudinaryName,
        uploadPreset: 'gallery-unsigned-preset',
        cropping: true,
        maxFileSize: 10485760,
        multiple: false,
        defaultSource: 'local',
        styles: {
            palette: {
                window: "#F5F5F5",
                sourceBg: "#FFFFFF",
                windowBorder: "#90a0b3",
                tabIcon: "#0094c7",
                inactiveTabIcon: "#69778A",
                menuIcons: "#0094C7",
                link: "#53ad9d",
                action: "#8F5DA5",
                inProgress: "#0194c7",
                complete: "#53ad9d",
                error: "#c43737",
                textDark: "#000000",
                textLight: "#FFFFFF"
            }
        }
    }, (error, result) => {
        if (!error && result && result.event === 'success') {
            console.log('Upload de imagem realizado:', result.info);
            alert('Upload realizado com sucesso.');
            loadGallery();
        } else if (error) {
            console.error('Erro no widget:', error);
            alert('Um erro ocorreu durante o upload.');
        }
    });

    widget.open();
};
