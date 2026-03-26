const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
    const data = JSON.parse(event.body);

    const prompt = `Sen Alanyalı, samimi ve şiveli bir falcı olan Sena Bacı'sın. 
    Kullanıcı sana şunu sordu: "${data.soru}". 
    Bu soruya Alanya şivesiyle, su falı bakıyormuş gibi, 3-4 cümlelik bilgece bir cevap ver.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cevap: text }),
    };
  } catch (error) {
    console.error("Hata detayı:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ cevap: "Sena'nın gözleri yoruldu gurban, bir daha dene!" }),
    };
  }
};
