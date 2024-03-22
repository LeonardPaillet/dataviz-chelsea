"use client"
import React, {useState, useEffect } from 'react';

export default function Home() {
  const [chelseaClubData, setChelseaClubData] = useState([]);
  useEffect(() => {
    const getChelseaClub = async () => {
      try {
        const response = await fetch('api/clubs/631/profile');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setChelseaClubData(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    getChelseaClub();
  }, []);
  console.log(chelseaClubData)
  return (
    <main className="flex min-h-screen flex-col items-center gap-12 p-24">
      <h1>Datavisualisation Chelsea Squad 2023/2024</h1>
      <div>
        <div>
          <p>Nom : </p>
          <p>{chelseaClubData.name}</p>
        </div>
        <div>
          <p>Balance des transfert : </p>
          <p>{chelseaClubData.currentTransferRecord}</p>
        </div>
        <div>
          <p>Taille de l'effectif : </p>
          <p>{chelseaClubData.squad.size}</p>
        </div>
        <div>
          <p>Age moyen des joueurs : </p>
          <p>{chelseaClubData.squad.averageAge} ans</p>
        </div>
      </div>
    </main>
  );
}

const CLUB_BDD = [
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