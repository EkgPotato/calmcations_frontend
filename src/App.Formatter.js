// utils/dataFormatter.js
export const formatTravelGuideData = (jsonData) => {
    return {
        id: jsonData.id,
        city: jsonData.capital, // Używamy "capital" jako nazwy miasta
        country: jsonData.country,
        description: jsonData.city_description,
        overallSummary: jsonData.overall_summary,
        overallScore: jsonData.overall_score,
        bestFeatures: jsonData.best_features,
        improvementAreas: jsonData.improvement_areas,
        analysisDate: jsonData.analysis_date,
        safety: {
            score: jsonData.safety.score,
            description: jsonData.safety.description,
            tips: jsonData.safety.tips,
            recommendations: jsonData.safety.recommendations
        },
        sustainability: {
            score: jsonData.sustainability.score,
            description: jsonData.sustainability.description,
            tips: jsonData.sustainability.tips,
            recommendations: jsonData.sustainability.recommendations
        },
        enjoyment: {
            score: jsonData.enjoyment.score,
            description: jsonData.enjoyment.description,
            tips: jsonData.enjoyment.tips,
            recommendations: jsonData.enjoyment.recommendations
        },
        calmcation: {
            score: jsonData.calmcation.score,
            description: jsonData.calmcation.description,
            tips: jsonData.calmcation.tips,
            recommendations: jsonData.calmcation.recommendations
        },
        culturalExchange: {
            score: jsonData.cultural_exchange.score,
            description: jsonData.cultural_exchange.description,
            tips: jsonData.cultural_exchange.tips,
            recommendations: jsonData.cultural_exchange.recommendations
        },
        navigation: {
            score: jsonData.navigation.score,
            description: jsonData.navigation.description,
            tips: jsonData.navigation.tips,
            recommendations: jsonData.navigation.recommendations
        },
        ecoFriendly: {
            score: jsonData.eco_friendly.score,
            description: jsonData.eco_friendly.description,
            tips: jsonData.eco_friendly.tips,
            recommendations: jsonData.eco_friendly.recommendations
        },
    };
};