
import dotenv from 'dotenv';
dotenv.config();
import { OpenAI } from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY, });


const appController ={
    post: async (req,res)=>{
        const runPrompt = async () => {

            const user_event = req.body.event;
            const user_Greeting = req.body.Greeting;
            const user_Air = req.body.Air;
            
            console.log(user_event,user_Greeting,user_Air);
            const prompt = `I am creating AI art, please provide 3 ideas based on this text:
             greeting for ${user_event}, type for ${user_Greeting}, in atmosphere for ${user_Air},
            dont include in the response "creating","create an ai", "generating", "ai", "desgining", "videos", "incorporating",
             please back the response like follows:
            {
             "1": "...",
             "2": "...",
             "3": "...",
            }`;
    
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages:[{role: "system", content: prompt}],
                max_tokens: 100,
            });
    
            const parsableJSONResponse = response.choices[0].message.content;
    
            console.log("response text: ",parsableJSONResponse);
    
            let parsedResponse;
            try {
                parsedResponse = json.parse(parsableJSONResponse);
            }
            catch (error) {
                console.log ("error parsing json respone", error);
                res.status(500).send("Error parsing JSON response");
                return{};
            }
    
            console.log("prompt 1:",parsedResponse["0"])
            console.log("prompt 2:",parsedResponse["1"])
            console.log("prompt 3:",parsedResponse["2"])
    
            res.json(parsedResponse);
        }
    
        try {
            const response = await runPrompt();
            res.send(response);  // שולח את התגובה ללקוח
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
};

export default appController;