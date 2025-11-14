
export interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export interface BotResponse {
  responseText: string;
  progressChange: number;
  isGameWon: boolean;
}
   