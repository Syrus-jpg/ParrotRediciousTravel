export enum ParrotType {
  COCKATOO = 'cockatoo',
  CAIQUE = 'caique',
  ALEXANDRINE = 'alexandrine'
}

export enum ParrotPersonality {
  NERD = 'nerd🤓',
  ROMANTIC = 'romantic🌹',
  EMO = 'emo😢',
  CRAZY = 'crazy💃',
  FREE_ASSOCIATIVE = 'free-associative🤔',
  CHATTERBOX = 'chatterbox💬'
}

export enum PlanetType {
  ASKREDDIT = 'askreddit',
  AWW = 'aww',
  FUNNY = 'funny',
  GAME = 'game',
  MUSIC = 'music',
  TECHNOLOGY = 'technology',
  SCIENCE = 'science',
  WORLDNEWS = 'worldnews'
}

export enum GameState {
  START_SCREEN = 'startScreen',
  NAME_INPUT = 'nameInput',
  PERSONALITY_SELECT = 'personalitySelect',
  PLANET_SELECT = 'planetSelect',
  LOADING_TRAVEL = 'loadingTravel',
  TRAVEL_RESULT = 'travelResult',
  FAINTED = 'fainted',
  DRINKING = 'drinking',
  THANKING = 'thanking',
  POSTCARDS = 'postcards',
  MEDALS = 'medals',
  HELP_FRIEND = 'helpFriend',
  HOLY_JUICE = 'holyJuice'
}

export interface GameStateType {
  currentState: GameState;
  selectedParrot: ParrotType | null;
  userName: string;
  parrotName: string;
  selectedPersonality: ParrotPersonality | null;
  selectedPlanet: PlanetType | null;
  holyJuiceCount: number;
  dailyTravelCount: number;
  postcards: Postcard[];
  lastLoginDate: string | null;
}

export interface Postcard {
  id: string;
  date: string;
  imageUrl: string;
  redditTitle: string;
  parrotComment: string;
  redditLink: string;
  planet: PlanetType;
  parrotType: ParrotType;
  personality: ParrotPersonality;
}
