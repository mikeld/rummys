
export interface TrivialQuestion {
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: string;
  explicacion: string;
}

export interface LocationData {
  historia: string;
  curiosidades: string[];
  ginkana: string[];
  imageUrl: string;
}

export interface LocationCollection {
  [key: string]: LocationData;
}