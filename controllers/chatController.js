import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const allowedAnimalTypes = ["kucing", "anjing", "sapi", "babi", "kuda"];

export const chatController = async (req, res) => {
    try {
      const { prompt } = req.body;

      const isAnimalTypeQuestion = allowedAnimalTypes.some(type => prompt.toLowerCase().includes(type));

      if (!isAnimalTypeQuestion) {
        res.send("Maaf, pertanyaan hanya boleh berhubungan dengan jenis hewan seperti kucing, anjing, sapi, babi, atau kuda.");
        return;
      }

      const responsePromise = openai.createChatCompletion({
        model: "gpt-3",
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

      // Atur waktu maksimum eksekusi ke 10 detik
      const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Waktu eksekusi melebihi batas maksimum.'));
        }, 10000); // 10 detik
      });

      // Menggunakan Promise.race untuk menyelesaikan permintaan tercepat
      const response = await Promise.race([responsePromise, timeoutPromise]);

      // Menangani hasil respons sesuai kebutuhan
      if (
        !response.data.choices ||
        !response.data.choices[0] ||
        !response.data.choices[0].message
      ) {
        res.send("Maaf, tidak dapat memberikan jawaban untuk pertanyaan ini.");
        return;
      }

      res.send(response.data.choices[0].message);
    } catch (error) {
      res.send(error.message);
    }
  };

