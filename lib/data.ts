// Shared data for the application

export interface CarData {
  id: number
  name: string
  year: number
  daily: number
  weekly: number
  monthly: number
  discount: number
}

export const cars: CarData[] = [
  { id: 1, name: "KIA K3", year: 2025, daily: 140, weekly: 910, monthly: 2850, discount: 10 },
  { id: 2, name: "Suzuki Dzire", year: 2024, daily: 95, weekly: 560, monthly: 2110, discount: 10 },
  { id: 3, name: "Toyota Corolla", year: 2025, daily: 172, weekly: 1050, monthly: 3800, discount: 10 },
  { id: 4, name: "Hyundai Accent", year: 2024, daily: 110, weekly: 630, monthly: 2550, discount: 10 },
  { id: 5, name: "Nissan Sunny", year: 2024, daily: 95, weekly: 560, monthly: 2100, discount: 10 },
  { id: 6, name: "KIA Pegas", year: 2025, daily: 95, weekly: 560, monthly: 2100, discount: 10 },
  { id: 7, name: "Toyota Yaris", year: 2024, daily: 110, weekly: 630, monthly: 2550, discount: 10 },
  { id: 8, name: "Hyundai Grand i10", year: 2024, daily: 95, weekly: 560, monthly: 2100, discount: 10 },
  { id: 9, name: "Hyundai Elantra", year: 2023, daily: 150, weekly: 945, monthly: 3600, discount: 10 },
  { id: 10, name: "Suzuki Baleno", year: 2024, daily: 100, weekly: 630, monthly: 2250, discount: 10 },
]

// Function to get car image path
export const getCarImage = (carName: string): string => {
  const imageMap: Record<string, string> = {
    "KIA K3": "/KIAK3.png",
    "Suzuki Dzire": "/SuzukiDzire.png",
    "Toyota Corolla": "/ToyotaCorolla.png",
    "Hyundai Accent": "/HyundaiAccent.png",
    "Nissan Sunny": "/NissanSunny.png",
    "KIA Pegas": "/KIAPegas.png",
    "Toyota Yaris": "/ToyotaYaris.png",
    "Hyundai Grand i10": "/HyundaiGrandi10.png",
    "Hyundai Elantra": "/HyundaiElantra.png",
    "Suzuki Baleno": "/SuzukiBaleno.png",
  }
  return imageMap[carName] || `/.jpg?key=xqaqt&height=300&width=500&query=${carName}+luxury+car`
}

