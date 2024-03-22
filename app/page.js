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
