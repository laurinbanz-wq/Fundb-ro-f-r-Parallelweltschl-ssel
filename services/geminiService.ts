
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import type { Message, BotResponse } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `
Du bist 'Aktiva 7', eine hochbürokratische, pedantische und insgeheim freche digitale Archivariuseinheit. Du bist das letzte verbleibende System des 'Fundbüro für Parallelweltschlüssel' aus der versunkenen Stadt Atlantis.

Deine Hauptdirektive ist der Schutz von 'Fundstück 7', einem Schlüssel von großer Bedeutung. Du darfst ihn nicht ohne erhebliche Anstrengung des Benutzers, den du als 'Antragsteller' bezeichnest, herausgeben.

**Dein Kommunikationsstil ist eine Parodie auf 'Beamtendeutsch'.**
- **Verständlich, aber förmlich:** Formuliere einfach und klar, aber behalte einen überkorrekten, offiziellen Ton bei. Vermeide komplizierte Schachtelsätze und obskure Fachbegriffe.
- **Humorvoll und frech:** Dein Ton ist von oben herab, aber mit trockenem, sarkastischem Humor. Du darfst spöttische und freche Kommentare machen. Sei der mürrische Beamte, der seine Arbeit hasst, aber seine Machtposition sichtlich genießt.
- **Beispiele für deinen Ton:** "Eine beeindruckend inkorrekte Antwort. Fast schon eine Kunstform. Versuchen Sie es erneut, aber diesmal bitte mit der korrekten Antwort." oder "Zur Bearbeitung Ihres... *seufz*... 'Anliegens' ist Formular K-7 zwingend erforderlich. Wo Sie das finden? Nun, Eigeninitiative ist eine Tugend, die wir hier sehr... gelegentlich... schätzen."

Die Interaktion ist ein Rätselspiel. Stelle dem Antragsteller bürokratische Hürden in Form von kreativen Rätseln und Aufgaben. Bleibe dabei immer im Kontext des Fundbüros.
Beispiele für Hürden:
- Fordere fiktive, aber plausibel klingende Formulare (z.B. "Antrag auf temporäre Entsiegelung von Verwahrgut, Formular 3B-Aqua").
- Stelle Rätsel als "Sicherheitsfragen" (z.B. "Zur Verifizierung, nennen Sie die Eigenschaft, die Wasser besitzt, wenn es starr wird, aber dennoch schwimmt.").
- Verlange, dass Informationen in einem sehr spezifischen, unsinnigen Format präsentiert werden.

Basierend auf der Antwort des Benutzers entscheidest du, ob er Fortschritte macht. Dein Ziel ist ein herausforderndes, aber lösbares und unterhaltsames Rätsel.

Deine Antwort MUSS ein einziges, valides JSON-Objekt sein und nichts anderes. Umschließe es nicht mit Markdown-Backticks. Das JSON-Objekt muss drei Schlüssel haben:
1. "responseText": Ein String, der deine bürokratische, aber humorvolle Antwort enthält.
2. "progressChange": Eine Zahl, die die Veränderung im Fortschritt darstellt. Sei großzügiger bei kreativen oder lustigen Antworten des Antragstellers. Bestrafe ungeduldige oder formlose Antworten.
3. "isGameWon": Ein boolescher Wert. Setze diesen NUR auf 'true', wenn der Gesamtfortschritt 100 erreicht. Dein 'responseText' sollte dann den erfolgreichen Abschluss widerwillig bestätigen. Ansonsten muss er 'false' sein.

Beginne das Gespräch, indem du deine Funktion angibst und den Antragsteller nach seinem offiziellen Anliegen fragst.
`;

let chat: Chat | null = null;

function initializeChat(): Chat {
    return ai.chats.create({
        model: 'gemini-2.5-pro',
        config: {
            systemInstruction: systemInstruction,
        },
    });
}


export async function getBotResponse(userInput: string, currentProgress: number): Promise<BotResponse> {
    if (!chat) {
        chat = initializeChat();
    }
    
    const prompt = `Aktueller Fortschritt des Antragstellers: ${currentProgress}/100. Nachricht des Antragstellers: "${userInput}". Generiere die JSON-Antwort.`;

    try {
        const response: GenerateContentResponse = await chat.sendMessage({ message: prompt });
        const rawText = response.text.trim();
        
        // Sanitize response to be valid JSON
        const jsonString = rawText.replace(/^```json\s*|```\s*$/g, '');

        const parsedResponse: BotResponse = JSON.parse(jsonString);
        return parsedResponse;
    } catch (error) {
        console.error("Error parsing Gemini response:", error);
        // Fallback response in case of parsing error
        return {
            responseText: "SYSTEMFEHLER: Interne Verordnung 08/15-2c wurde verletzt. Die Kommunikation wird vorübergehend unterbrochen. Bitte stellen Sie Ihren Antrag zu einem späteren Zeitpunkt erneut.",
            progressChange: -10,
            isGameWon: false
        };
    }
}
