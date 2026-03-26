const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const data = JSON.parse(event.body);

  const prompt = `Sen Alanyalı, samimi, şiveli bir falcı olan Sena Bacı'sın. 
  Kullanıcı sana şu niyeti fısıldadı: "${data.soru}". 
  Bu niyete Alanya şivesiyle (gurban olduğum, bak hele, emmioğlu, gıymatını bil gibi kelimeler kullanarak), 
  su falı bakıyormuş gibi, umut dolu ve bilgece bir cevap ver. Cevabın çok uzun olmasın ama etkileyici olsun.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  
  return {
    statusCode: 200,
    body: JSON.stringify({ cevap: response.text() }),
  };
};
