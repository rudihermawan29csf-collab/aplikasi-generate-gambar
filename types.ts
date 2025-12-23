export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export enum FusionStyle {
  WARRIOR = 'Warrior (Prajurit)',
  ARCHITECTURE = 'Architecture (Arsitektur)',
  WEAPON = 'Weaponry (Senjata)',
  SCENE = 'Battle Scene (Pertempuran)'
}

export interface GenerationConfig {
  prompt: string;
  style: FusionStyle;
  aspectRatio: '1:1' | '16:9' | '9:16';
}