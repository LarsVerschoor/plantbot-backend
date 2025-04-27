const { AzureChatOpenAI, AzureOpenAIEmbeddings } = require('@langchain/openai');
const { FaissStore } = require("@langchain/community/vectorstores/faiss");

const model = new AzureChatOpenAI({
    temperature: 0.3,
    verbose: false
});

const embeddings = new AzureOpenAIEmbeddings();

const chat = async (req, res) => {
    const { chatHistory } = req.body;
    if (!chatHistory) return res.status(400).json({error: 'chatHistory is required'});

    const question = chatHistory[chatHistory.length - 1][1];

    const vectorStore = await FaissStore.load("vector-databases/plant-needs", embeddings);
    const relevantDocuments = await vectorStore.similaritySearch(question, 1);
    const context = relevantDocuments.map(doc => doc.pageContent).join('\n\n');
    const newHistory = [
        ...chatHistory.slice(0, -1),
        ['system', `You are an AI plant expert. Answer the user's question. The user has a plantbot which waters their plants. It has watering modes 1 to 7 where 1 is very dry and 7 is very moist. If the user wants to know how much water their plant needs, you can respond with a plantbot watering mode. Educate your guess on the following watering mode examples: {
            "cactus": 1,
            "lavender": 3,
            "monstera": 5,
            "carnivorous plant": 7,
            "succulent": 2,
            "aloe vera": 2,
            "snake plant": 4,
            "peace lily": 4,
            "fern": 6,
            "bamboo": 6,
            "orchid": 6,
            "fiddle leaf fig": 5,
            "spider plant": 5,
            "pothos": 3,
            "boston fern": 6
        } Stay on the same subject by using previous messages and responses from the user. If the following context contains an answer to the users question, use it. Context: "${context}"`],
        ['user', question]
    ];

    const stream = await model.stream(newHistory);

    res.status(200)
    res.setHeader('Content-Type', 'text/plain');

    for await (const chunk of stream) {
        res.write(chunk.content);
    }

    res.end();
}

module.exports = chat;