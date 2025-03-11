export default async function handler(req, res) {
    try {
        const folder = 'gallery';
        const cloudName = 'dvyrzhdi5';
        const apiKey = process.env.CLOUDINARY_API_KEY;
        const apiSecret = process.env.CLOUDINARY_API_SECRET;

        const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search?expression=folder:${folder}&max_results=100`;

        const auth = 'Basic ' + Buffer.from(apiKey + ':' + apiSecret).toString('base64');

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': auth,
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro na API Cloudinary:', errorText);
            throw new Error('Falha ao buscar imagens armazenadas API Cloudinary');
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro na busca da galeria da API Cloudinary:', error.message);
        res.status(500).json({ error: 'Falha ao carregar a galeria' });
    }
}
