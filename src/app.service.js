const API_BASE_URL = 'http://localhost:5000'; 

async function handleResponse(response) {
    if (!response.ok) {
        let errorMsg = `Błąd HTTP: ${response.status}`;
        try {
            const errorData = await response.json();
            if (errorData.detail) {
                errorMsg += ` - Szczegóły: ${errorData.detail}`;
            }
        } catch (e) {
        }
        throw new Error(errorMsg);
    }
    return response.json();
}

/**
 * Pobiera szczegółowe metryki dla danego miasta.
 * Odpowiada endpointowi GET /city/{city_name}
 * @param {string} cityName - Nazwa miasta.
 * @param {string} [country=null] - Nazwa kraju (opcjonalnie, do rozróżnienia miast o tej samej nazwie).
 * @returns {Promise<object>} - Obiekt z pełnymi metrykami miasta.
 */
export async function getCityMetrics(cityName, country = null) {
    let url = `${API_BASE_URL}/city/${cityName}`;
    if (country) {
        url += `?country=${encodeURIComponent(country)}`;
    }
    try {
        const response = await fetch(url);
        console.log(response);
        return handleResponse(response);
    } catch (error) {
        console.error(`Błąd w getCityMetrics dla ${cityName}:`, error);
        throw error; // Przekaż błąd dalej do obsługi w komponencie
    }
}

/**
 * Pobiera listę wszystkich dostępnych miast.
 * Odpowiada endpointowi GET /cities
 * @returns {Promise<object>} - Obiekt zawierający listę miast i ich całkowitą liczbę.
 */
export async function getAllCities() {
    try {
        const response = await fetch(`${API_BASE_URL}/cities`);
        return handleResponse(response);
    } catch (error) {
        console.error("Błąd w getAllCities:", error);
        throw error;
    }
}

/**
 * Pobiera tylko wyniki (scores) dla danego miasta.
 * Odpowiada endpointowi GET /city/{city_name}/scores
 * @param {string} cityName - Nazwa miasta.
 * @param {string} [country=null] - Nazwa kraju (opcjonalnie).
 * @returns {Promise<object>} - Obiekt z wynikami miasta.
 */
export async function getCityScores(cityName, country = null) {
    let url = `${API_BASE_URL}/city/${cityName}/scores`;
    if (country) {
        url += `?country=${encodeURIComponent(country)}`;
    }
    try {
        const response = await fetch(url);
        return handleResponse(response);
    } catch (error) {
        console.error(`Błąd w getCityScores dla ${cityName}:`, error);
        throw error;
    }
}

/**
 * Pobiera topowe miasta według ogólnego wyniku.
 * Odpowiada endpointowi GET /top-cities
 * @param {number} [limit=10] - Liczba miast do zwrócenia.
 * @returns {Promise<Array<object>>} - Tablica obiektów topowych miast.
 */
export async function getTopCities(limit = 10) {
    try {
        const response = await fetch(`${API_BASE_URL}/top-cities?limit=${limit}`);
        return handleResponse(response);
    } catch (error) {
        console.error("Błąd w getTopCities:", error);
        throw error;
    }
}

/**
 * Pobiera topowe miasta według określonej kategorii.
 * Odpowiada endpointowi GET /top-cities/{category}
 * @param {string} category - Kategoria (np. "safety", "enjoyment").
 * @param {number} [limit=10] - Liczba miast do zwrócenia.
 * @returns {Promise<object>} - Obiekt zawierający kategorię i listę topowych miast.
 */
export async function getTopCitiesByCategory(category, limit = 10) {
    try {
        const response = await fetch(`${API_BASE_URL}/top-cities/${encodeURIComponent(category)}?limit=${limit}`);
        return handleResponse(response);
    } catch (error) {
        console.error(`Błąd w getTopCitiesByCategory dla ${category}:`, error);
        throw error;
    }
}

/**
 * Wyszukuje miasta po nazwie lub kraju.
 * Odpowiada endpointowi GET /search
 * @param {string} query - Fraza wyszukiwania.
 * @param {number} [limit=10] - Maksymalna liczba wyników.
 * @returns {Promise<Array<object>>} - Tablica miast pasujących do zapytania.
 */
export async function searchCities(query, limit = 10) {
    try {
        const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}&limit=${limit}`);
        return handleResponse(response);
    } catch (error) {
        console.error(`Błąd w searchCities dla "${query}":`, error);
        throw error;
    }
}

/**
 * Sprawdza stan API i połączenie z bazą danych.
 * Odpowiada endpointowi GET /health
 * @returns {Promise<object>} - Obiekt ze statusem zdrowia API.
 */
export async function getHealthStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        return handleResponse(response);
    } catch (error) {
        console.error("Błąd w getHealthStatus:", error);
        throw error;
    }
}