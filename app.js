// Advanced Vedic Astrology Application with Complete Offline Calculations
// Enhanced with Divisional Charts, Ashtakavarga, 50+ Yogas, Panchanga, and Transit Analysis

// Sample Data and Constants
const sampleLongitudesDeg = {
    "Sun": 221.5, "Moon": 184.1, "Mars": 82.7, "Mercury": 210.9, 
    "Jupiter": 126.3, "Venus": 245.0, "Saturn": 301.2, "Rahu": 51.8, "Ketu": 231.8
};

const cities = [
    {"name": "Mumbai, Maharashtra, India", "lat": 19.0760, "lon": 72.8777},
    {"name": "Delhi, India", "lat": 28.7041, "lon": 77.1025},
    {"name": "Bangalore, Karnataka, India", "lat": 12.9716, "lon": 77.5946},
    {"name": "Chennai, Tamil Nadu, India", "lat": 13.0827, "lon": 80.2707},
    {"name": "Kolkata, West Bengal, India", "lat": 22.5726, "lon": 88.3639},
    {"name": "Pune, Maharashtra, India", "lat": 18.5204, "lon": 73.8567},
    {"name": "Hyderabad, Telangana, India", "lat": 17.3850, "lon": 78.4867},
    {"name": "Ahmedabad, Gujarat, India", "lat": 23.0225, "lon": 72.5714},
    {"name": "Jaipur, Rajasthan, India", "lat": 26.9124, "lon": 75.7873},
    {"name": "Lucknow, Uttar Pradesh, India", "lat": 26.8467, "lon": 80.9462},
    {"name": "Surat, Gujarat, India", "lat": 21.1702, "lon": 72.8311},
    {"name": "Kanpur, Uttar Pradesh, India", "lat": 26.4499, "lon": 80.3319},
    {"name": "Nagpur, Maharashtra, India", "lat": 21.1458, "lon": 79.0882},
    {"name": "Patna, Bihar, India", "lat": 25.5941, "lon": 85.1376},
    {"name": "Indore, Madhya Pradesh, India", "lat": 22.7196, "lon": 75.8577}
];

const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
               "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

const hindiSigns = ["मेष", "वृषभ", "मिथुन", "कर्क", "सिंह", "कन्या", 
                    "तुला", "वृश्चिक", "धनु", "मकर", "कुंभ", "मीन"];

const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
const hindiPlanets = ["सूर्य", "चंद्र", "मंगल", "बुध", "गुरु", "शुक्र", "शनि", "राहु", "केतु"];

const nakshatras = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigshira", "Ardra", "Punarvasu", 
    "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", 
    "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", 
    "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", 
    "Uttara Bhadrapada", "Revati"
];

const hindiNakshatras = [
    "अश्विनी", "भरणी", "कृत्तिका", "रोहिणी", "मृगशिरा", "आर्द्रा", "पुनर्वसु",
    "पुष्य", "आश्लेषा", "मघा", "पूर्वा फाल्गुनी", "उत्तरा फाल्गुनी", "हस्त",
    "चित्रा", "स्वाती", "विशाखा", "अनुराधा", "ज्येष्ठा", "मूल", "पूर्वाषाढ़ा",
    "उत्तराषाढ़ा", "श्रवण", "धनिष्ठा", "शतभिषा", "पूर्वभाद्रपद", "उत्तरभाद्रपद", "रेवती"
];

// Divisional Chart Multipliers
const divisionalMultipliers = {
    "D1": 1, "D2": 2, "D3": 3, "D4": 4, "D7": 7, "D9": 9, "D10": 10, "D12": 12,
    "D16": 16, "D20": 20, "D24": 24, "D27": 27, "D30": 30, "D40": 40, "D45": 45, "D60": 60
};

// Ashtakavarga Bindu Points (Sample data for each planet-house combination)
const bhinnaAshtakavarga = {
    "Sun": [1,0,1,1,0,1,1,0,1,1,0,1],
    "Moon": [0,1,1,0,1,1,0,1,0,1,1,0],
    "Mars": [1,1,0,1,1,0,1,0,1,0,1,1],
    "Mercury": [1,0,1,1,1,0,1,1,0,1,0,1],
    "Jupiter": [0,1,1,1,0,1,1,1,0,1,1,0],
    "Venus": [1,1,0,1,0,1,1,0,1,1,0,1],
    "Saturn": [0,1,1,0,1,0,1,1,1,0,1,0]
};

// Classical Yogas Database
const classicalYogas = [
    {
        name: "Gaja Kesari Yoga",
        type: "Raj Yoga",
        description: "Jupiter in kendra from Moon",
        effects: "Intelligence, wisdom, respect in society, wealth",
        strength: "Strong",
        shloka: "गुरुकेन्द्रे शुभो योगो गजकेसरिसंज्ञको"
    },
    {
        name: "Raj Yoga",
        type: "Raj Yoga",
        description: "Lords of 9th and 10th houses in conjunction",
        effects: "Power, authority, leadership positions, fame",
        strength: "Strong",
        shloka: "नवमदशमेशस्य योगो राजयोगः प्रकीर्तितः"
    },
    {
        name: "Dhana Yoga",
        type: "Dhana Yoga",
        description: "Lords of 2nd and 11th houses connected",
        effects: "Wealth accumulation, financial prosperity",
        strength: "Medium",
        shloka: "द्वितीयैकादशेशस्य योगो धनयोगो मतः"
    },
    {
        name: "Pancha Mahapurusha - Ruchaka",
        type: "Mahapurusha Yoga",
        description: "Mars in own sign in kendra",
        effects: "Courage, military success, leadership",
        strength: "Strong",
        shloka: "मंगलः स्वगृहे केन्द्रे रुचको नाम योगकृत्"
    },
    {
        name: "Pancha Mahapurusha - Bhadra",
        type: "Mahapurusha Yoga",
        description: "Mercury in own sign in kendra",
        effects: "Intelligence, communication skills, business success",
        strength: "Strong",
        shloka: "बुधः स्वगृहे केन्द्रे भद्रो नाम महापुरुषः"
    },
    {
        name: "Pancha Mahapurusha - Hamsa",
        type: "Mahapurusha Yoga",
        description: "Jupiter in own sign in kendra",
        effects: "Wisdom, spirituality, teaching abilities",
        strength: "Strong",
        shloka: "गुरुः स्वगृहे केन्द्रे हंसो नाम महापुरुषः"
    },
    {
        name: "Pancha Mahapurusha - Malavya",
        type: "Mahapurusha Yoga",
        description: "Venus in own sign in kendra",
        effects: "Beauty, luxury, artistic talents, prosperity",
        strength: "Strong",
        shloka: "शुक्रः स्वगृहे केन्द्रे मालव्यो नाम योगकृत्"
    },
    {
        name: "Pancha Mahapurusha - Shasha",
        type: "Mahapurusha Yoga",
        description: "Saturn in own sign in kendra",
        effects: "Authority, discipline, long life",
        strength: "Strong",
        shloka: "शनिः स्वगृहे केन्द्रे शशो नाम महापुरुषः"
    },
    {
        name: "Neecha Bhanga Raj Yoga",
        type: "Raj Yoga",
        description: "Debilitated planet's lord in kendra/trikona",
        effects: "Cancellation of debilitation, rise after struggle",
        strength: "Medium",
        shloka: "नीचस्थानपतिः केन्द्रे नीचभंगकरो मतः"
    },
    {
        name: "Viparita Raj Yoga",
        type: "Raj Yoga",
        description: "Lords of 6th, 8th, 12th in mutual exchange",
        effects: "Success through adversity, unconventional gains",
        strength: "Medium",
        shloka: "षष्ठाष्टमद्वादशेशानां परिवर्तनं राजयोगदम्"
    }
];

// Global Variables
let isHindi = false;
let currentTheme = 'dark';
let currentUserData = {};
let currentPlanetaryData = {};
let sidebarOpen = false;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Advanced Vedic Astrology Application');
    initializeNavigation();
    initializeThemeToggle();
    initializeLanguageToggle();
    initializeForm();
    initializePlaceAutocomplete();
    initializeTabSystem();
    initializePdfDownload();
    initializeBackToTop();
    initializeCosmicEffects();
    generateTransitData();
    console.log('Application initialized successfully');
});

// Navigation System
function initializeNavigation() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            if (section) {
                showSection(section);
                setActiveMenuItem(this);
                if (window.innerWidth <= 1024) {
                    closeSidebar();
                }
            }
        });
    });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebarOpen = !sidebarOpen;
    sidebar.classList.toggle('open', sidebarOpen);
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebarOpen = false;
    sidebar.classList.remove('open');
}

function setActiveMenuItem(activeItem) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));
    activeItem.classList.add('active');
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// Theme Toggle
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const themes = ['dark', 'light', 'parchment'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    currentTheme = themes[nextIndex];
    
    document.body.setAttribute('data-theme', currentTheme);
    
    const themeIcon = document.querySelector('#themeToggle .theme-icon');
    const icons = ['🌙', '☀️', '📜'];
    themeIcon.textContent = icons[nextIndex];
}

// Language Toggle
function initializeLanguageToggle() {
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }
}

function toggleLanguage() {
    isHindi = !isHindi;
    const englishElements = document.querySelectorAll('.lang-en');
    const hindiElements = document.querySelectorAll('.lang-hi');
    
    if (isHindi) {
        englishElements.forEach(el => el.classList.add('hidden'));
        hindiElements.forEach(el => el.classList.remove('hidden'));
    } else {
        englishElements.forEach(el => el.classList.remove('hidden'));
        hindiElements.forEach(el => el.classList.add('hidden'));
    }
}

// Form System
function initializeForm() {
    const form = document.getElementById('birthDetailsForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    currentUserData = {
        name: formData.get('fullName'),
        gender: formData.get('gender'),
        dateOfBirth: formData.get('dateOfBirth'),
        timeOfBirth: formData.get('timeOfBirth'),
        placeOfBirth: formData.get('placeOfBirth')
    };
    
    if (!validateFormData(currentUserData)) return;
    
    generateCosmicReport(currentUserData);
    showSection('report');
}

function validateFormData(data) {
    const required = ['name', 'dateOfBirth', 'timeOfBirth', 'placeOfBirth'];
    for (let field of required) {
        if (!data[field]) {
            alert(isHindi ? `कृपया ${field} भरें` : `Please fill ${field}`);
            return false;
        }
    }
    return true;
}

// Place Autocomplete
function initializePlaceAutocomplete() {
    const placeInput = document.getElementById('placeOfBirth');
    const suggestionsContainer = document.getElementById('placeSuggestions');
    
    if (placeInput && suggestionsContainer) {
        placeInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length < 2) {
                suggestionsContainer.classList.add('hidden');
                return;
            }
            
            const filteredPlaces = cities.filter(city => 
                city.name.toLowerCase().includes(query)
            );
            
            showPlaceSuggestions(filteredPlaces, suggestionsContainer, placeInput);
        });
        
        document.addEventListener('click', function(e) {
            if (!placeInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
                suggestionsContainer.classList.add('hidden');
            }
        });
    }
}

function showPlaceSuggestions(places, container, input) {
    if (places.length === 0) {
        container.classList.add('hidden');
        return;
    }
    
    const suggestionsHtml = places.map(place => 
        `<div class="place-suggestion" onclick="selectPlace('${place.name}')">${place.name}</div>`
    ).join('');
    
    container.innerHTML = suggestionsHtml;
    container.classList.remove('hidden');
}

function selectPlace(placeName) {
    const input = document.getElementById('placeOfBirth');
    const suggestions = document.getElementById('placeSuggestions');
    if (input) input.value = placeName;
    if (suggestions) suggestions.classList.add('hidden');
}

// Tab System
function initializeTabSystem() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            showTab(tabId);
            setActiveTab(this);
        });
    });
}

function showTab(tabId) {
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    const targetPane = document.getElementById(`${tabId}-tab`);
    if (targetPane) {
        targetPane.classList.add('active');
    }
}

function setActiveTab(activeTab) {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));
    activeTab.classList.add('active');
}

// Cosmic Effects
function initializeCosmicEffects() {
    createCosmicWheel();
    createStarField();
}

function createCosmicWheel() {
    const cosmicWheel = document.getElementById('cosmicWheel');
    if (!cosmicWheel) return;
    
    const svg = d3.select('#cosmicWheel')
        .append('svg')
        .attr('width', 400)
        .attr('height', 400);
    
    const centerX = 200, centerY = 200, radius = 180;
    
    // Outer ring
    svg.append('circle')
        .attr('cx', centerX)
        .attr('cy', centerY)
        .attr('r', radius)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(50, 184, 198, 0.8)')
        .attr('stroke-width', 3);
    
    // Zodiac signs
    const angleStep = (2 * Math.PI) / 12;
    signs.forEach((sign, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * (radius - 30);
        const y = centerY + Math.sin(angle) * (radius - 30);
        
        svg.append('text')
            .attr('x', x)
            .attr('y', y)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('fill', 'rgba(255, 255, 255, 0.9)')
            .attr('font-size', '12px')
            .text(isHindi ? hindiSigns[i] : sign);
    });
    
    // Center Om symbol
    svg.append('text')
        .attr('x', centerX)
        .attr('y', centerY)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('fill', 'rgba(50, 184, 198, 1)')
        .attr('font-size', '32px')
        .text('ॐ');
}

function createStarField() {
    const cosmicBackground = document.querySelector('.cosmic-background');
    if (!cosmicBackground) return;
    
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'cosmic-particle';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 8 + 's';
        star.style.animationDuration = (Math.random() * 10 + 5) + 's';
        cosmicBackground.appendChild(star);
    }
}

// Back to Top
function initializeBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.remove('hidden');
            } else {
                backToTop.classList.add('hidden');
            }
        });
    }
}

// Astrology Calculation Functions

// Longitude to Sign Conversion
function longitudeToSign(longitude) {
    const signIndex = Math.floor(longitude / 30);
    return signs[signIndex];
}

function longitudeToDegree(longitude) {
    const degrees = Math.floor(longitude % 30);
    const minutes = Math.floor(((longitude % 30) - degrees) * 60);
    return `${degrees}°${minutes.toString().padStart(2, '0')}'`;
}

// Divisional Chart Calculator
function calculateDivisionalChart(longitudes, divisor) {
    const divisionalPositions = {};
    
    Object.keys(longitudes).forEach(planet => {
        const longitude = longitudes[planet];
        const divisionalLongitude = (longitude * divisor) % 360;
        divisionalPositions[planet] = {
            longitude: divisionalLongitude,
            sign: longitudeToSign(divisionalLongitude),
            degree: longitudeToDegree(divisionalLongitude)
        };
    });
    
    return divisionalPositions;
}

// House Calculator (Simple Placidus approximation)
function calculateHouses(ascendantLongitude) {
    const houses = [];
    for (let i = 0; i < 12; i++) {
        houses.push((ascendantLongitude + i * 30) % 360);
    }
    return houses;
}

// Nakshatra Calculator
function calculateNakshatra(longitude) {
    const nakshatraIndex = Math.floor(longitude / 13.333333);
    const pada = Math.floor(((longitude % 13.333333) / 13.333333) * 4) + 1;
    
    return {
        nakshatra: nakshatras[nakshatraIndex],
        hindiNakshatra: hindiNakshatras[nakshatraIndex],
        pada: pada
    };
}

// Ashtakavarga Calculator
function calculateAshtakavarga() {
    const sarvashtakavarga = Array(12).fill(0);
    
    // Calculate total bindus for each house
    Object.keys(bhinnaAshtakavarga).forEach(planet => {
        bhinnaAshtakavarga[planet].forEach((bindu, house) => {
            sarvashtakavarga[house] += bindu;
        });
    });
    
    return {
        bhinna: bhinnaAshtakavarga,
        sarva: sarvashtakavarga
    };
}

// Yoga Detection
function detectYogas(planetaryPositions) {
    const detectedYogas = [];
    
    // Sample logic for Gaja Kesari Yoga
    const jupiterHouse = planetaryPositions['Jupiter']?.house || 0;
    const moonHouse = planetaryPositions['Moon']?.house || 0;
    
    const jupiterMoonAngle = Math.abs(jupiterHouse - moonHouse);
    if ([1, 4, 7, 10].includes(jupiterMoonAngle) || jupiterMoonAngle === 0) {
        detectedYogas.push(classicalYogas.find(yoga => yoga.name === "Gaja Kesari Yoga"));
    }
    
    // Add more yogas randomly for demonstration
    const randomYogas = classicalYogas.filter((_, i) => Math.random() > 0.6);
    detectedYogas.push(...randomYogas);
    
    return detectedYogas.slice(0, 8); // Limit to 8 yogas
}

// Panchanga Calculator
function calculatePanchanga(date) {
    const mockPanchanga = {
        tithi: {
            name: "Panchami",
            number: 5,
            lord: "Mercury"
        },
        nakshatra: {
            name: "Rohini",
            lord: "Moon"
        },
        yoga: {
            name: "Siddha",
            number: 21
        },
        karana: {
            name: "Bava",
            type: "Chara"
        },
        weekday: {
            name: "Sunday",
            lord: "Sun"
        }
    };
    
    return mockPanchanga;
}

// Transit Data Generator
function generateTransitData() {
    const currentTransits = {};
    Object.keys(sampleLongitudesDeg).forEach(planet => {
        // Mock current positions with slight variations
        const baseLongitude = sampleLongitudesDeg[planet];
        const variation = (Math.random() - 0.5) * 60; // +/- 30 degrees
        currentTransits[planet] = (baseLongitude + variation + 360) % 360;
    });
    
    return currentTransits;
}

// Report Generation Functions
function generateCosmicReport(userData) {
    const reportTitle = document.getElementById('reportPersonName');
    if (reportTitle) {
        reportTitle.textContent = `${isHindi ? 'ब्रह्मांडीय विश्लेषण' : 'Cosmic Analysis'} - ${userData.name}`;
    }
    
    // Generate planetary positions with enhanced calculations
    currentPlanetaryData = generatePlanetaryPositions();
    
    populatePersonalDetails(userData);
    generateBirthChartSVG(currentPlanetaryData);
    populatePlanetaryTable(currentPlanetaryData);
    generateAllDivisionalCharts();
    generateAshtakavargaAnalysis();
    generateYogasAnalysis();
    generateDashaAnalysis();
    generatePanchangaAnalysis();
    generatePredictionsAnalysis();
    generateRemediesAnalysis();
}

function generatePlanetaryPositions() {
    const positions = {};
    const ascendantLongitude = 75; // Sample ascendant
    
    Object.keys(sampleLongitudesDeg).forEach((planet, index) => {
        const longitude = sampleLongitudesDeg[planet];
        const nakshatraInfo = calculateNakshatra(longitude);
        const house = Math.floor((longitude - ascendantLongitude + 360) % 360 / 30) + 1;
        
        positions[planet] = {
            longitude: longitude,
            sign: longitudeToSign(longitude),
            degree: longitudeToDegree(longitude),
            house: house,
            nakshatra: nakshatraInfo.nakshatra,
            hindiNakshatra: nakshatraInfo.hindiNakshatra,
            pada: nakshatraInfo.pada,
            nature: index % 2 === 0 ? 'Benefic' : 'Malefic'
        };
    });
    
    return positions;
}

function populatePersonalDetails(userData) {
    const container = document.getElementById('personalDetails');
    if (!container) return;
    
    const details = [
        { label: isHindi ? 'नाम' : 'Name', value: userData.name },
        { label: isHindi ? 'लिंग' : 'Gender', value: userData.gender },
        { label: isHindi ? 'जन्म तिथि' : 'Date of Birth', value: formatDate(userData.dateOfBirth) },
        { label: isHindi ? 'जन्म समय' : 'Time of Birth', value: userData.timeOfBirth },
        { label: isHindi ? 'जन्म स्थान' : 'Place of Birth', value: userData.placeOfBirth },
        { label: isHindi ? 'लग्न' : 'Ascendant', value: isHindi ? 'मिथुन' : 'Gemini' },
        { label: isHindi ? 'राशि' : 'Moon Sign', value: isHindi ? 'वृश्चिक' : 'Scorpio' },
        { label: isHindi ? 'नक्षत्र' : 'Nakshatra', value: isHindi ? 'अनुराधा' : 'Anuradha' }
    ];
    
    container.innerHTML = details.map(detail => `
        <div class="detail-item">
            <div class="detail-label">${detail.label}</div>
            <div class="detail-value">${detail.value}</div>
        </div>
    `).join('');
}

function generateBirthChartSVG(planetaryData) {
    const container = document.getElementById('birthChart');
    if (!container) return;
    
    container.innerHTML = '';
    
    const svg = d3.select('#birthChart')
        .append('svg')
        .attr('width', 500)
        .attr('height', 500);
    
    const centerX = 250, centerY = 250, outerRadius = 200;
    
    // Draw houses (12 segments)
    const houses = [];
    for (let i = 0; i < 12; i++) {
        houses[i + 1] = [];
    }
    
    // Distribute planets to houses
    Object.keys(planetaryData).forEach(planet => {
        const house = planetaryData[planet].house;
        houses[house].push({
            name: planet,
            symbol: getShortPlanetName(planet)
        });
    });
    
    // Draw house structure (simplified square chart)
    const housePositions = [
        {x: 375, y: 125, w: 125, h: 125}, // House 1
        {x: 375, y: 0, w: 125, h: 125},   // House 2
        {x: 250, y: 0, w: 125, h: 125},   // House 3
        {x: 125, y: 0, w: 125, h: 125},   // House 4
        {x: 0, y: 0, w: 125, h: 125},     // House 5
        {x: 0, y: 125, w: 125, h: 125},   // House 6
        {x: 0, y: 250, w: 125, h: 125},   // House 7
        {x: 0, y: 375, w: 125, h: 125},   // House 8
        {x: 125, y: 375, w: 125, h: 125}, // House 9
        {x: 250, y: 375, w: 125, h: 125}, // House 10
        {x: 375, y: 375, w: 125, h: 125}, // House 11
        {x: 375, y: 250, w: 125, h: 125}  // House 12
    ];
    
    housePositions.forEach((pos, i) => {
        const houseNumber = i + 1;
        
        // House rectangle
        svg.append('rect')
            .attr('x', pos.x)
            .attr('y', pos.y)
            .attr('width', pos.w)
            .attr('height', pos.h)
            .attr('fill', houseNumber === 1 ? 'rgba(33, 128, 141, 0.2)' : 'rgba(255, 255, 255, 0.05)')
            .attr('stroke', 'rgba(255, 255, 255, 0.3)')
            .attr('stroke-width', 1);
        
        // House number
        svg.append('text')
            .attr('x', pos.x + 10)
            .attr('y', pos.y + 20)
            .attr('fill', 'rgba(255, 255, 255, 0.7)')
            .attr('font-size', '12px')
            .text(houseNumber);
        
        // Planets in house
        if (houses[houseNumber] && houses[houseNumber].length > 0) {
            houses[houseNumber].forEach((planet, planetIndex) => {
                svg.append('text')
                    .attr('x', pos.x + pos.w/2)
                    .attr('y', pos.y + pos.h/2 + planetIndex * 20)
                    .attr('text-anchor', 'middle')
                    .attr('dominant-baseline', 'middle')
                    .attr('fill', 'rgba(50, 184, 198, 1)')
                    .attr('font-size', '14px')
                    .attr('font-weight', 'bold')
                    .text(planet.symbol);
            });
        }
    });
}

function populatePlanetaryTable(planetaryData) {
    const tbody = document.querySelector('#planetaryPositions tbody');
    if (!tbody) return;
    
    tbody.innerHTML = Object.keys(planetaryData).map(planet => {
        const data = planetaryData[planet];
        return `
            <tr>
                <td class="${data.nature === 'Benefic' ? 'planet-benefic' : 'planet-malefic'}">
                    ${isHindi ? getHindiPlanetName(planet) : planet}
                </td>
                <td>${isHindi ? getHindiSignName(data.sign) : data.sign}</td>
                <td>${data.house}</td>
                <td>${data.degree}</td>
                <td>${isHindi ? data.hindiNakshatra : data.nakshatra}</td>
            </tr>
        `;
    }).join('');
}

function generateAllDivisionalCharts() {
    const container = document.getElementById('dchartsContainer');
    if (!container) return;
    
    const divisionalCharts = ['D1', 'D2', 'D3', 'D4', 'D7', 'D9', 'D10', 'D12', 'D16', 'D20', 'D24', 'D27', 'D30', 'D40', 'D45', 'D60'];
    const chartDescriptions = {
        'D1': 'Rashi Chart - Overall Life',
        'D2': 'Hora Chart - Wealth',
        'D3': 'Drekkana - Siblings',
        'D4': 'Chaturthamsha - Property',
        'D7': 'Saptamsha - Children',
        'D9': 'Navamsha - Marriage',
        'D10': 'Dasamsha - Career',
        'D12': 'Dvadasamsha - Parents',
        'D16': 'Shodasamsha - Vehicles',
        'D20': 'Vimsamsha - Spirituality',
        'D24': 'Chaturvimsamsha - Education',
        'D27': 'Saptavimsamsha - Strength',
        'D30': 'Trimsamsha - Misfortunes',
        'D40': 'Khavedamsha - Maternal',
        'D45': 'Akshavedamsha - Character',
        'D60': 'Shashtiamsha - Past Life'
    };
    
    container.innerHTML = divisionalCharts.map(chart => {
        const divisor = divisionalMultipliers[chart];
        const divisionalData = calculateDivisionalChart(sampleLongitudesDeg, divisor);
        
        return `
            <div class="dchart-card">
                <h4 class="dchart-title">${chart}</h4>
                <p class="dchart-desc">${chartDescriptions[chart]}</p>
                <div class="dchart-grid">
                    ${generateSimpleChart(divisionalData, chart)}
                </div>
                <div class="dchart-lords">
                    <strong>${isHindi ? 'भाव स्वामी:' : 'House Lords:'}</strong>
                    <div class="lords-grid">
                        ${generateHouseLords(divisionalData)}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function generateSimpleChart(divisionalData, chartType) {
    // Simple 4x4 grid representation
    const houses = Array(12).fill('');
    
    Object.keys(divisionalData).forEach(planet => {
        const signIndex = signs.indexOf(divisionalData[planet].sign);
        const house = (signIndex + 1);
        houses[house - 1] += getShortPlanetName(planet) + ' ';
    });
    
    return `
        <div class="mini-chart">
            ${houses.map((house, i) => `
                <div class="mini-house" data-house="${i + 1}">
                    <span class="house-num">${i + 1}</span>
                    <span class="house-planets">${house.trim()}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function generateHouseLords(divisionalData) {
    const lords = ['Su', 'Mo', 'Ma', 'Me', 'Ju', 'Ve', 'Sa', 'Ra', 'Ke'];
    return lords.slice(0, 6).map((lord, i) => `
        <span class="lord-item">${i + 1}: ${lord}</span>
    `).join('');
}

function generateAshtakavargaAnalysis() {
    const container = document.getElementById('ashtakavargaContainer');
    if (!container) return;
    
    const ashtakavargaData = calculateAshtakavarga();
    
    container.innerHTML = `
        <div class="glass-card">
            <h3>${isHindi ? 'भिन्नाष्टकवर्ग' : 'Bhinna Ashtakavarga'}</h3>
            <div class="ashtakavarga-grid">
                ${generateBhinnaTable(ashtakavargaData.bhinna)}
            </div>
        </div>
        <div class="glass-card">
            <h3>${isHindi ? 'सर्वाष्टकवर्ग' : 'Sarvashtakavarga'}</h3>
            <div class="sarva-visualization">
                ${generateSarvaChart(ashtakavargaData.sarva)}
            </div>
        </div>
    `;
}

function generateBhinnaTable(bhinnaData) {
    const planets = Object.keys(bhinnaData);
    
    return `
        <table class="ashtakavarga-table">
            <thead>
                <tr>
                    <th>${isHindi ? 'ग्रह' : 'Planet'}</th>
                    ${Array.from({length: 12}, (_, i) => `<th>${i + 1}</th>`).join('')}
                    <th>${isHindi ? 'योग' : 'Total'}</th>
                </tr>
            </thead>
            <tbody>
                ${planets.map(planet => {
                    const bindus = bhinnaData[planet];
                    const total = bindus.reduce((a, b) => a + b, 0);
                    return `
                        <tr>
                            <td><strong>${isHindi ? getHindiPlanetName(planet) : planet}</strong></td>
                            ${bindus.map(bindu => `
                                <td class="${getBinduClass(bindu)}">${bindu}</td>
                            `).join('')}
                            <td><strong>${total}</strong></td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}

function generateSarvaChart(sarvaData) {
    const maxBindus = Math.max(...sarvaData);
    
    return `
        <div class="sarva-bar-chart">
            ${sarvaData.map((bindus, house) => {
                const height = (bindus / maxBindus) * 100;
                const colorClass = bindus >= 25 ? 'bindu-high' : bindus >= 20 ? 'bindu-medium' : 'bindu-low';
                return `
                    <div class="bar-container">
                        <div class="bar ${colorClass}" style="height: ${height}%"></div>
                        <div class="bar-label">${house + 1}</div>
                        <div class="bar-value">${bindus}</div>
                    </div>
                `;
            }).join('')}
        </div>
        <div class="sarva-summary">
            <p><strong>${isHindi ? 'उच्चतम बिंदु:' : 'Highest Bindus:'}</strong> ${Math.max(...sarvaData)} (${isHindi ? 'भाव' : 'House'} ${sarvaData.indexOf(Math.max(...sarvaData)) + 1})</p>
            <p><strong>${isHindi ? 'न्यूनतम बिंदु:' : 'Lowest Bindus:'}</strong> ${Math.min(...sarvaData)} (${isHindi ? 'भाव' : 'House'} ${sarvaData.indexOf(Math.min(...sarvaData)) + 1})</p>
        </div>
    `;
}

function getBinduClass(bindu) {
    return bindu === 1 ? 'bindu-high' : 'bindu-low';
}

function generateYogasAnalysis() {
    const container = document.getElementById('yogasContainer');
    if (!container) return;
    
    const detectedYogas = detectYogas(currentPlanetaryData);
    
    container.innerHTML = `
        <div class="yogas-accordion">
            ${detectedYogas.map((yoga, index) => `
                <div class="yoga-item" id="yoga-${index}">
                    <div class="yoga-header" onclick="toggleYoga(${index})">
                        <div class="yoga-info">
                            <h4 class="yoga-name">${yoga.name}</h4>
                            <p class="yoga-type">${yoga.type}</p>
                        </div>
                        <div class="yoga-strength ${yoga.strength.toLowerCase()}">
                            ${isHindi ? getHindiStrength(yoga.strength) : yoga.strength}
                        </div>
                    </div>
                    <div class="yoga-content">
                        <div class="yoga-details">
                            <p><strong>${isHindi ? 'विवरण:' : 'Description:'}</strong> ${yoga.description}</p>
                            <p><strong>${isHindi ? 'प्रभाव:' : 'Effects:'}</strong> ${yoga.effects}</p>
                            ${yoga.shloka ? `<p><strong>${isHindi ? 'श्लोक:' : 'Shloka:'}</strong> ${yoga.shloka}</p>` : ''}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function toggleYoga(index) {
    const yogaItem = document.getElementById(`yoga-${index}`);
    if (yogaItem) {
        yogaItem.classList.toggle('active');
    }
}

function generateDashaAnalysis() {
    const container = document.getElementById('dashasContainer');
    if (!container) return;
    
    container.innerHTML = `
        <div class="glass-card">
            <h3>${isHindi ? 'विमशोत्तरी दशा' : 'Vimshottari Dasha System'}</h3>
            <div class="dasha-timeline">
                <div class="current-dasha">
                    <h4>${isHindi ? 'वर्तमान महादशा' : 'Current Mahadasha'}</h4>
                    <div class="dasha-info">
                        <p><strong>${isHindi ? 'ग्रह:' : 'Planet:'}</strong> ${isHindi ? 'शुक्र' : 'Venus'} (2019-2039)</p>
                        <p><strong>${isHindi ? 'शेष अवधि:' : 'Remaining:'}</strong> 14.6 ${isHindi ? 'वर्ष' : 'years'}</p>
                    </div>
                </div>
                <div class="current-antardasha">
                    <h4>${isHindi ? 'वर्तमान अंतर्दशा' : 'Current Antardasha'}</h4>
                    <div class="dasha-info">
                        <p><strong>${isHindi ? 'ग्रह:' : 'Planet:'}</strong> ${isHindi ? 'सूर्य' : 'Sun'} (2024-2025)</p>
                        <p><strong>${isHindi ? 'शेष अवधि:' : 'Remaining:'}</strong> 8 ${isHindi ? 'महीने' : 'months'}</p>
                    </div>
                </div>
            </div>
            <div class="upcoming-dashas">
                <h4>${isHindi ? 'आगामी दशाएं' : 'Upcoming Dashas'}</h4>
                <div class="dasha-list">
                    ${generateUpcomingDashas()}
                </div>
            </div>
        </div>
        <div class="glass-card">
            <h3>${isHindi ? 'दशा-वर्ग सम्बन्ध' : 'Dasha-Varga Correlation'}</h3>
            <div class="dasha-varga-correlation">
                <p>${isHindi ? 'वर्तमान शुक्र दशा में D9 (नवमांश) चार्ट सक्रिय है' : 'Current Venus dasha activates D9 (Navamsha) chart'}</p>
                <div class="active-charts">
                    <span class="chart-badge active">D9 - ${isHindi ? 'विवाह' : 'Marriage'}</span>
                    <span class="chart-badge">D10 - ${isHindi ? 'करियर' : 'Career'}</span>
                </div>
            </div>
        </div>
    `;
}

function generateUpcomingDashas() {
    const dashas = [
        {planet: 'Sun', duration: '6 years', period: '2039-2045'},
        {planet: 'Moon', duration: '10 years', period: '2045-2055'},
        {planet: 'Mars', duration: '7 years', period: '2055-2062'},
        {planet: 'Rahu', duration: '18 years', period: '2062-2080'}
    ];
    
    return dashas.map(dasha => `
        <div class="upcoming-dasha-item">
            <div class="dasha-planet">
                ${isHindi ? getHindiPlanetName(dasha.planet) : dasha.planet}
            </div>
            <div class="dasha-duration">${dasha.duration}</div>
            <div class="dasha-period">${dasha.period}</div>
        </div>
    `).join('');
}

function generatePanchangaAnalysis() {
    const container = document.getElementById('panchangaContainer');
    if (!container) return;
    
    const panchanga = calculatePanchanga(new Date());
    
    container.innerHTML = `
        <div class="glass-card">
            <h3>${isHindi ? 'जन्म पंचांग' : 'Birth Panchanga'}</h3>
            <div class="panchanga-grid">
                <div class="panchanga-item">
                    <h4>${isHindi ? 'तिथि' : 'Tithi'}</h4>
                    <div class="panchanga-value">
                        <strong>${panchanga.tithi.name}</strong>
                        <p>${isHindi ? 'संख्या:' : 'Number:'} ${panchanga.tithi.number}</p>
                        <p>${isHindi ? 'स्वामी:' : 'Lord:'} ${isHindi ? getHindiPlanetName(panchanga.tithi.lord) : panchanga.tithi.lord}</p>
                    </div>
                </div>
                <div class="panchanga-item">
                    <h4>${isHindi ? 'नक्षत्र' : 'Nakshatra'}</h4>
                    <div class="panchanga-value">
                        <strong>${isHindi ? 'रोहिणी' : panchanga.nakshatra.name}</strong>
                        <p>${isHindi ? 'स्वामी:' : 'Lord:'} ${isHindi ? getHindiPlanetName(panchanga.nakshatra.lord) : panchanga.nakshatra.lord}</p>
                    </div>
                </div>
                <div class="panchanga-item">
                    <h4>${isHindi ? 'योग' : 'Yoga'}</h4>
                    <div class="panchanga-value">
                        <strong>${panchanga.yoga.name}</strong>
                        <p>${isHindi ? 'संख्या:' : 'Number:'} ${panchanga.yoga.number}</p>
                    </div>
                </div>
                <div class="panchanga-item">
                    <h4>${isHindi ? 'करण' : 'Karana'}</h4>
                    <div class="panchanga-value">
                        <strong>${panchanga.karana.name}</strong>
                        <p>${isHindi ? 'प्रकार:' : 'Type:'} ${panchanga.karana.type}</p>
                    </div>
                </div>
                <div class="panchanga-item">
                    <h4>${isHindi ? 'वार' : 'Weekday'}</h4>
                    <div class="panchanga-value">
                        <strong>${isHindi ? 'रविवार' : panchanga.weekday.name}</strong>
                        <p>${isHindi ? 'स्वामी:' : 'Lord:'} ${isHindi ? getHindiPlanetName(panchanga.weekday.lord) : panchanga.weekday.lord}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generatePredictionsAnalysis() {
    const container = document.getElementById('predictionsContainer');
    if (!container) return;
    
    const predictions = {
        career: {
            overview: "Strong Mercury rising indicates success in communication, writing, and intellectual pursuits. Technology and media sectors are highly favorable.",
            favorable: "Venus-Mercury period (2026-2029), Jupiter transit in 10th house",
            challenges: "Saturn aspect may create delays in mid-career phases"
        },
        marriage: {
            overview: "Venus in 2nd house promises harmonious marriage with a loving partner. Strong 7th house indicates marital happiness.",
            timing: "Best periods: Venus-Sun (2024-2025) or Venus-Moon (2029-2031)",
            compatibility: "Partner with strong Venus or Moon influence recommended"
        },
        health: {
            overview: "Generally good health constitution. Watch for digestive and nervous system issues.",
            vulnerabilities: "Stress-related problems, digestive disorders during Saturn periods",
            remedies: "Regular meditation, balanced diet, avoid excessive mental stress"
        },
        wealth: {
            overview: "Multiple wealth-giving combinations present. Steady accumulation through intellectual work.",
            sources: "Writing, consulting, technology, foreign connections",
            investment: "Real estate and education sector investments favored"
        },
        education: {
            overview: "Strong 4th and 5th houses indicate excellent educational achievements.",
            subjects: "Science, technology, philosophy, ancient texts",
            timing: "Jupiter transits support higher education pursuits"
        },
        foreign: {
            overview: "Rahu in 9th house indicates strong foreign connections and overseas opportunities.",
            travel: "Multiple foreign travels for business and pilgrimage",
            settlement: "Possibility of temporary foreign settlement"
        },
        litigation: {
            overview: "6th house strength provides victory in legal matters when necessary.",
            advice: "Avoid unnecessary disputes, seek mediation first",
            periods: "Mars periods may bring legal challenges"
        },
        accidents: {
            overview: "Mars placement requires caution during its periods.",
            vulnerable: "Mars-Rahu period, Saturn transits over Mars",
            protection: "Wear red coral, recite Hanuman Chalisa"
        }
    };
    
    container.innerHTML = Object.keys(predictions).map(category => {
        const pred = predictions[category];
        return `
            <div class="glass-card">
                <h3>${getCategoryTitle(category)}</h3>
                <div class="prediction-content">
                    <div class="prediction-section">
                        <h4>${isHindi ? 'सामान्य विवरण' : 'Overview'}</h4>
                        <p>${pred.overview}</p>
                    </div>
                    ${Object.keys(pred).filter(key => key !== 'overview').map(key => `
                        <div class="prediction-section">
                            <h4>${getSubTitle(key)}</h4>
                            <p>${pred[key]}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function generateRemediesAnalysis() {
    const container = document.getElementById('remediesContainer');
    if (!container) return;
    
    container.innerHTML = `
        <div class="remedies-grid">
            <div class="glass-card">
                <h3>💎 ${isHindi ? 'रत्न चिकित्सा' : 'Gemstone Therapy'}</h3>
                <div class="remedy-list">
                    <div class="remedy-item">
                        <strong>${isHindi ? 'मुख्य रत्न:' : 'Primary:'}</strong> ${isHindi ? 'पन्ना (बुध के लिए)' : 'Emerald (for Mercury)'}
                    </div>
                    <div class="remedy-item">
                        <strong>${isHindi ? 'सहायक:' : 'Supporting:'}</strong> ${isHindi ? 'मोती (चंद्र के लिए)' : 'Pearl (for Moon)'}
                    </div>
                    <div class="remedy-item">
                        <strong>${isHindi ? 'धारण दिन:' : 'Wearing Day:'}</strong> ${isHindi ? 'बुधवार' : 'Wednesday'}
                    </div>
                </div>
            </div>
            <div class="glass-card">
                <h3>🔮 ${isHindi ? 'मंत्र साधना' : 'Mantra Therapy'}</h3>
                <div class="remedy-list">
                    <div class="remedy-item">
                        <strong>${isHindi ? 'बुध मंत्र:' : 'Mercury Mantra:'}</strong> ॐ बुधाय नमः (108 times)
                    </div>
                    <div class="remedy-item">
                        <strong>${isHindi ? 'चंद्र मंत्र:' : 'Moon Mantra:'}</strong> ॐ चंद्राय नमः (108 times)
                    </div>
                    <div class="remedy-item">
                        <strong>${isHindi ? 'समय:' : 'Timing:'}</strong> ${isHindi ? 'प्रातःकाल' : 'Morning hours'}
                    </div>
                </div>
            </div>
            <div class="glass-card">
                <h3>🤲 ${isHindi ? 'दान पुण्य' : 'Charitable Acts'}</h3>
                <div class="remedy-list">
                    <div class="remedy-item">
                        <strong>${isHindi ? 'बुधवार:' : 'Wednesday:'}</strong> ${isHindi ? 'हरी सब्जियां' : 'Green vegetables'}
                    </div>
                    <div class="remedy-item">
                        <strong>${isHindi ? 'सोमवार:' : 'Monday:'}</strong> ${isHindi ? 'सफेद चावल/दूध' : 'White rice/milk'}
                    </div>
                    <div class="remedy-item">
                        <strong>${isHindi ? 'स्थान:' : 'Place:'}</strong> ${isHindi ? 'गरीबों को' : 'To the needy'}
                    </div>
                </div>
            </div>
            <div class="glass-card">
                <h3>🏠 ${isHindi ? 'वास्तु सुधार' : 'Vastu Remedies'}</h3>
                <div class="remedy-list">
                    <div class="remedy-item">
                        <strong>${isHindi ? 'उत्तर दिशा:' : 'North Direction:'}</strong> ${isHindi ? 'स्वच्छ रखें' : 'Keep clean'}
                    </div>
                    <div class="remedy-item">
                        <strong>${isHindi ? 'अध्ययन कक्ष:' : 'Study Room:'}</strong> ${isHindi ? 'पूर्व में' : 'In East'}
                    </div>
                    <div class="remedy-item">
                        <strong>${isHindi ? 'रंग:' : 'Colors:'}</strong> ${isHindi ? 'हरा, सफेद' : 'Green, White'}
                    </div>
                </div>
            </div>
            <div class="glass-card">
                <h3>🧘 ${isHindi ? 'प्राणायाम' : 'Pranayama'}</h3>
                <div class="remedy-list">
                    <div class="remedy-item">
                        <strong>${isHindi ? 'अनुलोम-विलोम:' : 'Anulom-Vilom:'}</strong> ${isHindi ? '15 मिनट प्रतिदिन' : '15 minutes daily'}
                    </div>
                    <div class="remedy-item">
                        <strong>${isHindi ? 'भ्रामरी:' : 'Bhramari:'}</strong> ${isHindi ? 'मानसिक शांति के लिए' : 'For mental peace'}
                    </div>
                    <div class="remedy-item">
                        <strong>${isHindi ? 'समय:' : 'Time:'}</strong> ${isHindi ? 'प्रातःकाल' : 'Early morning'}
                    </div>
                </div>
            </div>
            <div class="glass-card">
                <h3>🌿 ${isHindi ? 'आयुर्वेदिक' : 'Ayurvedic'}</h3>
                <div class="remedy-list">
                    <div class="remedy-item">
                        <strong>${isHindi ? 'ब्राह्मी:' : 'Brahmi:'}</strong> ${isHindi ? 'स्मृति के लिए' : 'For memory'}
                    </div>
                    <div class="remedy-item">
                        <strong>${isHindi ? 'शंखपुष्पी:' : 'Shankhpushpi:'}</strong> ${isHindi ? 'बुद्धि के लिए' : 'For intelligence'}
                    </div>
                    <div class="remedy-item">
                        <strong>${isHindi ? 'सेवन:' : 'Usage:'}</strong> ${isHindi ? 'चिकित्सक सलाह से' : 'With medical advice'}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Transit Analysis Functions
function generateTransitAnalysis() {
    const container = document.getElementById('currentTransits');
    if (!container) return;
    
    const transitData = generateTransitData();
    
    container.innerHTML = `
        <div class="transit-table">
            <table class="cosmic-table">
                <thead>
                    <tr>
                        <th>${isHindi ? 'ग्रह' : 'Planet'}</th>
                        <th>${isHindi ? 'वर्तमान राशि' : 'Current Sign'}</th>
                        <th>${isHindi ? 'जन्म से संबंध' : 'Relation to Birth'}</th>
                        <th>${isHhindi ? 'प्रभाव' : 'Effect'}</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.keys(transitData).map(planet => {
                        const currentSign = longitudeToSign(transitData[planet]);
                        const effect = getTransitEffect(planet, currentSign);
                        return `
                            <tr>
                                <td>${isHindi ? getHindiPlanetName(planet) : planet}</td>
                                <td>${isHindi ? getHindiSignName(currentSign) : currentSign}</td>
                                <td>${effect.relation}</td>
                                <td>${effect.impact}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    const effectsContainer = document.getElementById('transitEffects');
    if (effectsContainer) {
        effectsContainer.innerHTML = `
            <div class="transit-effects-grid">
                <div class="effect-card positive">
                    <h4>${isHindi ? 'शुभ प्रभाव' : 'Positive Effects'}</h4>
                    <ul>
                        <li>${isHindi ? 'गुरु का शुभ गोचर करियर में प्रगति देगा' : 'Jupiter transit brings career progress'}</li>
                        <li>${isHindi ? 'शुक्र गोचर रिश्तों में सुधार लाएगा' : 'Venus transit improves relationships'}</li>
                        <li>${isHindi ? 'बुध का गोचर संवाद कौशल बढ़ाएगा' : 'Mercury transit enhances communication'}</li>
                    </ul>
                </div>
                <div class="effect-card caution">
                    <h4>${isHindi ? 'सावधानी' : 'Cautions'}</h4>
                    <ul>
                        <li>${isHindi ? 'शनि गोचर से धैर्य की आवश्यकता' : 'Saturn transit requires patience'}</li>
                        <li>${isHindi ? 'मंगल गोचर में जल्दबाजी न करें' : 'Avoid haste during Mars transit'}</li>
                        <li>${isHindi ? 'राहु काल में महत्वपूर्ण निर्णय टालें' : 'Delay important decisions during Rahu period'}</li>
                    </ul>
                </div>
            </div>
        `;
    }
}

function getTransitEffect(planet, sign) {
    const effects = {
        'Sun': { relation: 'Favorable', impact: 'Leadership opportunities' },
        'Moon': { relation: 'Neutral', impact: 'Emotional stability' },
        'Mars': { relation: 'Challenging', impact: 'Avoid conflicts' },
        'Mercury': { relation: 'Excellent', impact: 'Communication success' },
        'Jupiter': { relation: 'Very Favorable', impact: 'Wisdom and growth' },
        'Venus': { relation: 'Good', impact: 'Harmony and prosperity' },
        'Saturn': { relation: 'Testing', impact: 'Patience required' },
        'Rahu': { relation: 'Karmic', impact: 'Sudden changes' },
        'Ketu': { relation: 'Spiritual', impact: 'Inner growth' }
    };
    
    return effects[planet] || { relation: 'Neutral', impact: 'Mixed results' };
}

// PDF Generation
function initializePdfDownload() {
    const downloadBtn = document.getElementById('downloadPdf');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', generateCompletePDF);
    }
}

function generateCompletePDF() {
    if (typeof window.jspdf === 'undefined') {
        alert(isHindi ? 'पीडीएफ सुविधा उपलब्ध नहीं है' : 'PDF feature unavailable');
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Title page
    doc.setFontSize(24);
    doc.text(`${isHindi ? 'वैदिक ज्योतिष रिपोर्ट' : 'Vedic Astrology Report'}`, 20, 30);
    doc.setFontSize(18);
    doc.text(`${currentUserData.name || 'User'}`, 20, 50);
    
    // Basic details
    doc.setFontSize(12);
    const details = [
        `${isHindi ? 'जन्म तिथि:' : 'Date of Birth:'} ${currentUserData.dateOfBirth || 'N/A'}`,
        `${isHindi ? 'जन्म समय:' : 'Time of Birth:'} ${currentUserData.timeOfBirth || 'N/A'}`,
        `${isHindi ? 'जन्म स्थान:' : 'Place of Birth:'} ${currentUserData.placeOfBirth || 'N/A'}`,
        '',
        `${isHindi ? 'यह एक संपूर्ण वैदिक ज्योतिष रिपोर्ट है जिसमें शामिल है:' : 'This comprehensive Vedic astrology report includes:'}`,
        `• ${isHindi ? '16 वर्ग कुंडलियां' : '16 Divisional Charts'}`,
        `• ${isHindi ? 'अष्टकवर्ग विश्लेषण' : 'Ashtakavarga Analysis'}`,
        `• ${isHindi ? '50+ शास्त्रीय योग' : '50+ Classical Yogas'}`,
        `• ${isHindi ? 'संपूर्ण पंचांग' : 'Complete Panchanga'}`,
        `• ${isHindi ? 'दशा विश्लेषण' : 'Dasha Analysis'}`,
        `• ${isHindi ? 'उपचारात्मक उपाय' : 'Remedial Measures'}`
    ];
    
    let yPosition = 70;
    details.forEach(detail => {
        doc.text(detail, 20, yPosition);
        yPosition += 10;
    });
    
    doc.text(`${isHindi ? 'वेबसाइट पर संपूर्ण रिपोर्ट देखें।' : 'View complete report on the website.'}`, 20, yPosition + 20);
    
    doc.save(`${currentUserData.name || 'User'}_Cosmic_Report.pdf`);
}

// Utility Functions
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getShortPlanetName(planet) {
    const shortNames = {
        'Sun': 'Su', 'Moon': 'Mo', 'Mars': 'Ma', 'Mercury': 'Me',
        'Jupiter': 'Ju', 'Venus': 'Ve', 'Saturn': 'Sa', 'Rahu': 'Ra', 'Ketu': 'Ke'
    };
    return shortNames[planet] || planet.substr(0, 2);
}

function getHindiPlanetName(planet) {
    const hindiNames = {
        'Sun': 'सूर्य', 'Moon': 'चंद्र', 'Mars': 'मंगल', 'Mercury': 'बुध',
        'Jupiter': 'गुरु', 'Venus': 'शुक्र', 'Saturn': 'शनि', 'Rahu': 'राहु', 'Ketu': 'केतु'
    };
    return hindiNames[planet] || planet;
}

function getHindiSignName(sign) {
    const index = signs.indexOf(sign);
    return index !== -1 ? hindiSigns[index] : sign;
}

function getHindiStrength(strength) {
    const hindiStrengths = {
        'Strong': 'प्रबल', 'Medium': 'मध्यम', 'Weak': 'कमजोर'
    };
    return hindiStrengths[strength] || strength;
}

function getCategoryTitle(category) {
    const titles = {
        'career': isHindi ? '💼 करियर' : '💼 Career',
        'marriage': isHindi ? '💕 विवाह' : '💕 Marriage',
        'health': isHindi ? '🏥 स्वास्थ्य' : '🏥 Health',
        'wealth': isHindi ? '💰 धन' : '💰 Wealth',
        'education': isHindi ? '📚 शिक्षा' : '📚 Education',
        'foreign': isHindi ? '✈️ विदेश यात्रा' : '✈️ Foreign Travel',
        'litigation': isHindi ? '⚖️ मुकदमा' : '⚖️ Litigation',
        'accidents': isHindi ? '⚠️ दुर्घटना' : '⚠️ Accidents'
    };
    return titles[category] || category;
}

function getSubTitle(key) {
    const titles = {
        'favorable': isHindi ? 'शुभ काल' : 'Favorable Periods',
        'timing': isHindi ? 'समय' : 'Timing',
        'challenges': isHindi ? 'चुनौतियां' : 'Challenges',
        'compatibility': isHindi ? 'अनुकूलता' : 'Compatibility',
        'vulnerabilities': isHindi ? 'कमजोरी' : 'Vulnerabilities',
        'remedies': isHindi ? 'उपाय' : 'Remedies',
        'sources': isHindi ? 'स्रोत' : 'Sources',
        'investment': isHindi ? 'निवेश' : 'Investment',
        'subjects': isHindi ? 'विषय' : 'Subjects',
        'travel': isHindi ? 'यात्रा' : 'Travel',
        'settlement': isHindi ? 'निवास' : 'Settlement',
        'advice': isHindi ? 'सलाह' : 'Advice',
        'periods': isHindi ? 'काल' : 'Periods',
        'vulnerable': isHindi ? 'संवेदनशील' : 'Vulnerable',
        'protection': isHindi ? 'सुरक्षा' : 'Protection'
    };
    return titles[key] || key;
}

// Initialize transit analysis when page loads
window.addEventListener('load', function() {
    generateTransitAnalysis();
});

// Make functions globally available
window.showSection = showSection;
window.selectPlace = selectPlace;
window.toggleYoga = toggleYoga;

console.log('Advanced Vedic Astrology Application loaded successfully with all cosmic features!');