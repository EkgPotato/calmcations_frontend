import React, { useState, useEffect, useCallback } from 'react';
import styles from './App.module.css'; 
import citiesData from './citiesData'; 

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [travelGuide, setTravelGuide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCitySelected, setIsCitySelected] = useState(true);

  const cities = citiesData;

  const fetchTravelGuide = useCallback(async (city) => {
    if (!city) {
      setIsCitySelected(false);
      return;
    }
    setIsCitySelected(true); 

    setLoading(true);
    setError(null);
    setTravelGuide(null);

    try {
      // TODO: Remove
      await new Promise(resolve => setTimeout(resolve, 1500));

      // PAMIĘTAJ! Tutaj normalnie będzie wywołanie do Twojego backendu:
      // const response = await fetch(`http://localhost:5000/api/GetCityTravelGuide?city=${city}`);
      // if (!response.ok) {
      //   throw new Error(`Błąd HTTP: ${response.status}`);
      // }
      // const data = await response.json();

      const cityDetails = cities.find(c => c.name === city);
      const country = cityDetails ? cityDetails.country : 'nieznanym kraju';
      
      // TODO: Remove
      const data = {
        city: city,
        country: country, // Dodana informacja o kraju
        description: `Witaj w ${city}, w ${country}! To wspaniałe miasto oferuje mnóstwo atrakcji i unikalnych doświadczeń. Przygotuj się na niezapomnianą podróż!`,
        attractions: [
          { name: 'Historyczne Centrum', details: `Odwiedź zabytkowe Stare Miasto w ${city}, wpisane na listę światowego dziedzictwa UNESCO.` },
          { name: 'Kulinarna Podróż', details: `Skosztuj lokalnych przysmaków i dań regionalnych w najlepszych restauracjach i kawiarniach.` },
          { name: 'Nocne Życie', details: `Poznaj tętniące życiem bary i kluby, idealne na wieczorne wyjścia.` },
          { name: 'Muzea i Galerie', details: `Zanurz się w kulturze ${city}, odwiedzając liczne muzea i galerie sztuki.` },
        ],
        bestTimeToVisit: 'Wiosna (kwiecień-czerwiec) i wczesna jesień (wrzesień-październik)',
        averageCost: 'Umiarkowany (z możliwością dopasowania do budżetu)',
        transport: 'Dobrze rozwinięta sieć transportu publicznego (autobusy, tramwaje, metro), łatwy dostęp do atrakcji.'
      };

      setTravelGuide(data);
    } catch (err) {
      setError(`Nie udało się pobrać danych dla ${city}: ${err.message}. Spróbuj ponownie później.`);
      console.error("Błąd podczas pobierania danych:", err);
    } finally {
      setLoading(false);
    }
  }, [cities]);

  useEffect(() => {
    if (selectedCity) {
      fetchTravelGuide(selectedCity);
    } else {
      setTravelGuide(null);
      setIsCitySelected(true);
    }
  }, [selectedCity, fetchTravelGuide]);


  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Przewodnik po Miastach Świata</h1>

      <div className={styles.inputSection}>
        <label htmlFor="city-select" className={styles.label}>Wybierz miasto z listy:</label>
        <select
          id="city-select"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className={styles.select}
        >
          <option value="">-- Wybierz miasto --</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name} ({city.country})
            </option>
          ))}
        </select>
        {!isCitySelected && (
          <p className={styles.warningMessage}>Proszę wybrać miasto z listy.</p>
        )}
      </div>

      {loading && (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
          <p className={styles.loadingMessage}>Ładowanie informacji o {selectedCity}...</p>
        </div>
      )}

      {error && <div className={styles.errorMessage}>{error}</div>}

      {travelGuide && !loading && (
        <div className={styles.travelGuideContainer}>
          <h2 className={styles.guideHeader}>Przewodnik po: {travelGuide.city} ({travelGuide.country})</h2>
          <p className={styles.description}>{travelGuide.description}</p>

          <div className={styles.section}>
            <h3 className={styles.sectionHeader}>Główne Atrakcje:</h3>
            <div className={styles.attractionsGrid}>
              {travelGuide.attractions.map((attraction, index) => (
                <div key={index} className={styles.attractionCard}>
                  <h4 className={styles.attractionName}>{attraction.name}</h4>
                  <p className={styles.attractionDetails}>{attraction.details}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionHeader}>Informacje praktyczne:</h3>
            <ul className={styles.infoList}>
              <li className={styles.infoItem}><strong>Najlepszy czas na wizytę:</strong> {travelGuide.bestTimeToVisit}</li>
              <li className={styles.infoItem}><strong>Średni koszt:</strong> {travelGuide.averageCost}</li>
              <li className={styles.infoItem}><strong>Transport:</strong> {travelGuide.transport}</li>
            </ul>
          </div>
           <p style={{marginTop: '30px', textAlign: 'center', fontSize: '1.1em', color: '#555'}}>
                Oto jak może wyglądać {travelGuide.city}:
            </p>
           
        </div>
      )}
    </div>
  );
}

export default App;