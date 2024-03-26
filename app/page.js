"use client"
import React, {useState, useEffect } from 'react';

export default function Home() {
  const [chelseaClubData, setChelseaClubData] = useState([]);
  const [playerClubData, setPlayerClubData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les données du club Chelsea
        const chelseaResponse = await fetch('api/clubs/631/profile');
        if (!chelseaResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const chelseaData = await chelseaResponse.json();
        setChelseaClubData(chelseaData);

        // Récupérer les données des joueurs pour chaque club
        const clubDataArray = [];
        for (const club of CLUBS_BDD) {
          const clubResponse = await fetch(`api/clubs/${club.id}/players`);
          if (!clubResponse.ok) {
            throw new Error('Network response was not ok');
          }
          const clubData = await clubResponse.json();
          clubDataArray.push(clubData);
        }
        setPlayerClubData(clubDataArray);
        setLoading(false); // Mettre à jour l'état du chargement une fois les données récupérées
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 p-12">
      <h1>Données</h1>
      <div className='flex flex-col gap-8'>
        {playerClubData.map((club, index) => (
          <Club key={index} data={club} />
        ))}
      </div>
    </main>
  );
}

function Club({data}) {
  let ageTab = []
  let heightTab = []
  let valueTab = []
  console.log(data.players)
  for(const playerId in data.players){
    const player = data.players[playerId]
    ageTab.push(player.age)
    heightTab.push(convertHeightToFloat(player.height))
    valueTab.push(player.marketValue)
  }
  console.log(ageTab)
  return(
    <div className='flex flex-col gap-6 bg-slate-300 p-6 border border-black rounded'>
      <h2>{getClubNameById(data.id)}</h2>
      <div className='flex flex-col'>
          <div className='grid grid-cols-8'>
            <p>Nom</p>
            <p>Poste</p>
            <p>Age</p>
            <p>Pied préféré</p>
            <p>Taille</p>
            <p>rejoint le</p>
            <p>Valeur</p>
            <p>Signé de</p>
          </div>
      </div>
      <div className='flex flex-col gap-4'>
        {data.players.map((player, index)=>(
          <Player key={index} player={player}/>
        ))}
      </div>
      <div>
        <h3>Statistique</h3>
        <p>Age</p>
        <p>Taille</p>
        <p>Valeur</p>
      </div>
    </div>
  )
}

function Player({player}) {
  return(
    <div className="grid grid-cols-8 border-b border-black">
      <p>{player.name}</p>
      <p>{player.position}</p>
      <p>{player.age} ans</p>
      <p>{player.foot}</p>
      <p>{player.height}</p>
      <p>{player.joinedOn}</p>
      <p>{player.marketValue}</p>
      <p>{player.signedFrom}</p>
    </div>
  )
}

const getClubNameById = (id) => {
  const club = CLUBS_BDD.find((club) => club.id === id);
  return club ? club.name : "Club inconnu"; // Si le club est trouvé, retournez son nom, sinon retournez "Club inconnu"
};

function calculateStats(numbers) {
  if (numbers.length === 0) {
      return {
          min: null,
          max: null,
          average: null,
          median: null
      };
  }

  // Minimum
  const min = Math.min(...numbers);

  // Maximum
  const max = Math.max(...numbers);

  // Somme des nombres
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);

  // Moyenne
  const average = sum / numbers.length;

  // Médiane
  const sortedNumbers = numbers.slice().sort((a, b) => a - b);
  let median;
  if (sortedNumbers.length % 2 === 0) {
      median = (sortedNumbers[sortedNumbers.length / 2 - 1] + sortedNumbers[sortedNumbers.length / 2]) / 2;
  } else {
      median = sortedNumbers[Math.floor(sortedNumbers.length / 2)];
  }

  return {
      min,
      max,
      average,
      median
  };
}

function convertHeightToFloat(heightString) {
  // Supprimer le "m" à la fin de la chaîne
  const heightWithoutUnit = heightString.replace("m", "");
  
  // Remplacer la virgule par un point pour obtenir un nombre valide
  const heightFloat = parseFloat(heightWithoutUnit.replace(",", "."));
  
  return heightFloat;
}

const CLUBS_BDD = [
  {
    "id": "281",
    "name": "Manchester City"
  },
  {
    "id": "11",
    "name": "Arsenal FC"
  },
  {
    "id": "631",
    "name": "Chelsea FC"
  },
  {
    "id": "31",
    "name": "Liverpool FC"
  },
  {
    "id": "148",
    "name": "Tottenham Hotspur"
  },
  {
    "id": "985",
    "name": "Manchester United"
  },
  {
    "id": "405",
    "name": "Aston Villa"
  },
  {
    "id": "762",
    "name": "Newcastle United"
  },
  {
    "id": "1237",
    "name": "Brighton & Hove Albion"
  },
  {
    "id": "379",
    "name": "West Ham United"
  },
  {
    "id": "1148",
    "name": "Brentford FC"
  },
  {
    "id": "873",
    "name": "Crystal Palace"
  },
  {
    "id": "703",
    "name": "Nottingham Forest"
  },
  {
    "id": "989",
    "name": "AFC Bournemouth"
  },
  {
    "id": "29",
    "name": "Everton FC"
  },
  {
    "id": "543",
    "name": "Wolverhampton Wanderers"
  },
  {
    "id": "931",
    "name": "Fulham FC"
  },
  {
    "id": "1132",
    "name": "Burnley FC"
  },
  {
    "id": "350",
    "name": "Sheffield United"
  },
  {
    "id": "1031",
    "name": "Luton Town"
  }
]