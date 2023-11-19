import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const allowedAnimalTypes = ["kucing", "anjing", "sapi", "babi", "kuda", "hamster", "kelinci", "kura-kura", "otter", "ular"];

export const chatController = async (req, res) => {
    const timeout = 10000; // 10 detik

    let hasResponded = false;

    const timer = setTimeout(() => {
        if (!hasResponded) {
            res.status(500).send('Waktu eksekusi telah melebihi batas.');
            hasResponded = true;
        }
    }, timeout);

    try {
        const { prompt } = req.body;

        const isAnimalTypeQuestion = allowedAnimalTypes.some(type => prompt.toLowerCase().includes(type));

        if (!isAnimalTypeQuestion) {
            clearTimeout(timer);
            res.send("Maaf, pertanyaan hanya boleh berhubungan dengan jenis hewan seperti kucing, anjing, sapi, babi, atau kuda.");
            hasResponded = true;
            return;
        }

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Kamu adalah dokter hewan, saya akan bertanya tentang jenis hewan, gejala hewan, dan deskripsi gejalanya. berikan hasil analisis, jangan bertanya lagi hanya sekali saja dan juga berikan tindakan yang harus dilakukan dan apakah perlu tindak lanjut oleh dokter.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        if (
            !response.data.choices ||
            !response.data.choices[0] ||
            !response.data.choices[0].message
        ) {
            clearTimeout(timer);
            res.send("Maaf, tidak dapat memberikan jawaban untuk pertanyaan ini.");
            hasResponded = true;
            return;
        }

        clearTimeout(timer);
        res.send(response.data.choices[0].message);
        hasResponded = true;
    } catch (error) {
        clearTimeout(timer);
        res.status(500).send(error.message);
        hasResponded = true;
    }
};
