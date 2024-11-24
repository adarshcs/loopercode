
export class Hotel {
    id: number;
    name: string;
    location: { latitude: number, longitude: number };
    ratesSummary: { minPrice: string };
    
    constructor(id: number, name: string, location: { latitude: number, longitude: number }, ratesSummary: { minPrice: string }) {
      this.id = id;
      this.name = name;
      this.location = location;
      this.ratesSummary = ratesSummary;
    }
  }
  