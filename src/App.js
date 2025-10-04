import React, { useState, useEffect, useCallback } from 'react';
import styles from './App.module.css';
import citiesData from './citiesData';
import { getCityMetrics } from './app.service';

const formatTravelGuideData = (jsonData) => {
    const formatted = {
        id: jsonData.id,
        city: jsonData.capital,
        country: jsonData.country,
        description: jsonData.city_description,
        overallSummary: jsonData.overall_summary,
        overallScore: jsonData.overall_score,
        bestFeatures: jsonData.best_features,
        improvementAreas: jsonData.improvement_areas,
        analysisDate: jsonData.analysis_date,
        safety: jsonData.safety,
        sustainability: jsonData.sustainability,
        enjoyment: jsonData.enjoyment,
        calmcation: jsonData.calmcation,
        culturalExchange: jsonData.cultural_exchange,
        navigation: jsonData.navigation,
        ecoFriendly: jsonData.eco_friendly,
      
    };
    return formatted;
};


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
      const rawData = await getCityMetrics(city);
      const formattedData = formatTravelGuideData(rawData);
      setTravelGuide(formattedData);
    } catch (err) {
      setError(`Failed to fetch data for ${city}: ${err.message}. Please try again later.`);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedCity) {
      fetchTravelGuide(selectedCity);
    } else {
      setTravelGuide(null);
      setIsCitySelected(true);
    }
  }, [selectedCity, fetchTravelGuide]);


  const renderSection = (sectionName, sectionData) => (
    <div className={styles.section} key={sectionName}>
      <h3 className={styles.sectionHeader}>{sectionName} (Score: {sectionData.score}/10)</h3>
      <p className={styles.sectionDescription}>{sectionData.description}</p>
      {sectionData.tips && sectionData.tips.length > 0 && (
        <>
          <h4 className={styles.subHeader}>Tips:</h4>
          <p>{sectionData.tips}</p>
        </>
      )}
      {sectionData.recommendations && sectionData.recommendations.length > 0 && (
        <>
          <h4 className={styles.subHeader}>Recommendations:</h4>
          <ul className={styles.recommendationsList}>
            {sectionData.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );


  return (
    <div className={styles.container}>
      <h1 className={styles.header}>World City Travel Guide</h1>

      <div className={styles.inputSection}>
        <label htmlFor="city-select" className={styles.label}>Select a city from the list:</label>
        <select
          id="city-select"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className={styles.select}
        >
          <option value="">-- Select a city --</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name} ({city.country})
            </option>
          ))}
        </select>
        {!isCitySelected && (
          <p className={styles.warningMessage}>Please select a city from the list.</p>
        )}
      </div>

      {loading && (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
          <p className={styles.loadingMessage}>Loading information for {selectedCity}...</p>
        </div>
      )}

      {error && <div className={styles.errorMessage}>{error}</div>}

      {travelGuide && !loading && (
        <div className={styles.travelGuideContainer}>
          <h2 className={styles.guideHeader}>Travel Guide for: {travelGuide.city} ({travelGuide.country})</h2>
          <p className={styles.description}>{travelGuide.description}</p>
          <p className={styles.overallSummary}>{travelGuide.overallSummary}</p>
          <p className={styles.overallScore}>Overall Score: <strong className={styles.overallScoreStrong}>{travelGuide.overallScore}/10</strong></p>

          <div className={styles.section}>
            <h3 className={styles.sectionHeader}>Key Features:</h3>
            <p>{travelGuide.bestFeatures}</p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionHeader}>Areas for Improvement:</h3>
            <p>{travelGuide.improvementAreas}</p>
          </div>

          {travelGuide.safety && renderSection("Safety", travelGuide.safety)}
          {travelGuide.enjoyment && renderSection("Enjoyment", travelGuide.enjoyment)}
          {travelGuide.culturalExchange && renderSection("Cultural Exchange", travelGuide.culturalExchange)}
          {travelGuide.navigation && renderSection("Navigation", travelGuide.navigation)}
          {travelGuide.calmcation && renderSection("Calmcation", travelGuide.calmcation)}
          {travelGuide.sustainability && renderSection("Sustainability", travelGuide.sustainability)}
          {travelGuide.ecoFriendly && renderSection("Eco-Friendly", travelGuide.ecoFriendly)}

          {travelGuide.attractions && travelGuide.attractions.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionHeader}>Main Attractions:</h3>
              <div className={styles.attractionsGrid}>
                {travelGuide.attractions.map((attraction, index) => (
                  <div key={index} className={styles.attractionCard}>
                    <h4 className={styles.attractionName}>{attraction.name}</h4>
                    <p className={styles.attractionDetails}>{attraction.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;