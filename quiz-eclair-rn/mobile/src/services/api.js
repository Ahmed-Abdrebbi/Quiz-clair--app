import Constants from 'expo-constants';

const FALLBACK_QUESTIONS = [
  {
    id: 1,
    category: "Culture Générale",
    text: "Quelle est la capitale historique du Royaume du Maroc où se trouve la célèbre place Jemaa el-Fna ?",
    options: ["Rabat", "Marrakech", "Fès", "Casablanca"],
    correctAnswer: "Marrakech"
  },
  {
    id: 2,
    category: "Culture Générale",
    text: "Quel fleuve traverse la ville de Paris ?",
    options: ["La Loire", "La Seine", "Le Rhône", "La Garonne"],
    correctAnswer: "La Seine"
  },
  {
    id: 3,
    category: "Culture Générale",
    text: "Qui est l'auteur de la célèbre peinture de la Renaissance italienne, 'La Joconde' ?",
    options: ["Claude Monet", "Vincent van Gogh", "Léonard de Vinci", "Pablo Picasso"],
    correctAnswer: "Léonard de Vinci"
  },
  {
    id: 4,
    category: "Culture Générale",
    text: "En quelle année s'est déroulée la prise de la Bastille, marquant le début de la Révolution française ?",
    options: ["1789", "1492", "1914", "1804"],
    correctAnswer: "1789"
  },
  {
    id: 5,
    category: "Culture Générale",
    text: "Quel pays est également connu à travers le monde sous le nom de 'Pays du Soleil Levant' ?",
    options: ["La Chine", "Le Japon", "La Corée du Sud", "La Thaïlande"],
    correctAnswer: "Le Japon"
  },
  {
    id: 6,
    category: "Logique",
    text: "Si un train électrique se dirige vers le nord à 100 km/h et que le vent souffle vers l'est, dans quelle direction va la fumée ?",
    options: ["Vers le sud", "Vers l'est", "Il n'y a pas de fumée", "Vers le bas"],
    correctAnswer: "Il n'y a pas de fumée"
  },
  {
    id: 7,
    category: "Logique",
    text: "Laquelle de ces valeurs complète logiquement la suite numérique suivante : 2, 4, 8, 16, ... ?",
    options: ["20", "24", "32", "64"],
    correctAnswer: "32"
  },
  {
    id: 8,
    category: "Logique",
    text: "Certains mois comptent 30 jours, d'autres 31 jours. Combien de mois dans l'année comptent au moins 28 jours ?",
    options: ["1", "6", "12", "Aucun"],
    correctAnswer: "12"
  },
  {
    id: 9,
    category: "Logique",
    text: "Si Jean possède 3 pommes et qu'il en prend 2 avec lui, combien de pommes a-t-il dans les mains ?",
    options: ["1", "2", "3", "5"],
    correctAnswer: "2"
  },
  {
    id: 10,
    category: "Logique",
    text: "Quel jour de la semaine complète logiquement cette suite : Lundi, Mardi, Mercredi, ... ?",
    options: ["Vendredi", "Samedi", "Jeudi", "Dimanche"],
    correctAnswer: "Jeudi"
  },
  {
    id: 11,
    category: "Divertissement",
    text: "Quel film sud-coréen a marqué l'histoire en remportant l'Oscar du meilleur film en 2020 ?",
    options: ["1917", "Parasite", "Joker", "Once Upon a Time in Hollywood"],
    correctAnswer: "Parasite"
  },
  {
    id: 12,
    category: "Divertissement",
    text: "Qui est le chanteur pop américain légendaire interprète de l'album à succès mondial 'Thriller' ?",
    options: ["Prince", "Michael Jackson", "Madonna", "Elvis Presley"],
    correctAnswer: "Michael Jackson"
  },
  {
    id: 13,
    category: "Divertissement",
    text: "Quelle série télévisée à succès mondial se déroule sur le continent imaginaire de Westeros ?",
    options: ["Breaking Bad", "Stranger Things", "Game of Thrones", "The Witcher"],
    correctAnswer: "Game of Thrones"
  },
  {
    id: 14,
    category: "Divertissement",
    text: "Quel super-héros masqué de DC Comics est l'alter ego secret du milliardaire Bruce Wayne ?",
    options: ["Spider-Man", "Batman", "Iron Man", "Superman"],
    correctAnswer: "Batman"
  },
  {
    id: 15,
    category: "Divertissement",
    text: "Quelle célèbre plateforme de streaming vidéo en ligne a produit et diffusé la série 'Squid Game' ?",
    options: ["Disney+", "Amazon Prime Video", "Netflix", "Apple TV+"],
    correctAnswer: "Netflix"
  }
];

const getBaseUrl = () => {
  // Extract package manager host in development
  const debuggerHost = Constants.expoConfig?.hostUri;
  if (debuggerHost) {
    const ip = debuggerHost.split(':')[0];
    return `http://${ip}:5000`;
  }
  return 'http://localhost:5000';
};

export const fetchQuestions = async (category) => {
  try {
    const url = `${getBaseUrl()}/api/questions` + 
      (category ? `?category=${encodeURIComponent(category)}` : '');
    
    // Add brief timeout for fast fallback
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) throw new Error('API server returned an error');
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('API connection failed, loading local fallback data. Details:', error.message);
    if (category) {
      return FALLBACK_QUESTIONS.filter(
        q => q.category.toLowerCase() === category.toLowerCase()
      );
    }
    return FALLBACK_QUESTIONS;
  }
};
