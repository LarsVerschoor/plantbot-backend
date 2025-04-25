const { AzureOpenAIEmbeddings } = require("@langchain/openai");
const { TextLoader } = require("langchain/document_loaders/fs/text");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { FaissStore } = require("@langchain/community/vectorstores/faiss");

const embeddings = new AzureOpenAIEmbeddings();

(async () => {
    const loader = new TextLoader('./data/plant-needs.txt');
    const data = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter(
        {chunkSize: 1500, chunkOverlap: 150}
    );
    const splitDocs = await textSplitter.splitDocuments(data);

    for (doc of splitDocs) {
        console.log(doc.pageContent)
        await embeddings.embedQuery(doc.pageContent);
    }

    const vectorStore = await FaissStore.fromDocuments(splitDocs, embeddings);
    await vectorStore.save('vector-databases/plant-needs');
})();