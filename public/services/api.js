// Configurações da API JSONBin.io
const API_CONFIG = {
  binId: '68d3df3eae596e708ff9eb22',
  secretKey: '$2a$10$6caAdPB5uwJ.DoSHuhbNYetiW2QpxXeURI/QGy0w.RIVkSb6oYvyG'
};

class JsonBinAPI {
  constructor() {
    this.baseURL = 'https://api.jsonbin.io/v3/b';
    this.binId = API_CONFIG.binId;
    this.secretKey = API_CONFIG.secretKey;
  }

  async fetchPropertyData() {
    try {
      const response = await fetch(`${this.baseURL}/${this.binId}/latest`, {
        headers: {
          'X-Master-Key': this.secretKey,
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data.record;
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      return null;
    }
  }
}

export const jsonBinAPI = new JsonBinAPI();