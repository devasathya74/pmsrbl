/**
 * NCERT Class 6 Science (Curiosity) - Complete 12 Chapters Curriculum
 * Police Modern School, 25th Bn PAC, Raebareli
 * Black & White Exam-Grade Question Sheet with Required Figures & Scientific Diagrams
 */

const SCIENCE_CHAPTERS_DATA = [
  {
    "id": 1,
    "title": "The Wonderful World of Science",
    "unit": "Unit 1: The Spirit of Inquiry",
    "summary": "Understand the nature of science as a joyful exploration, the step-by-step scientific method (observation, questioning, hypothesis, testing, analysis, conclusion), and developing scientific temper in daily life.",
    "diagram": {
      "title": "Fig 1.1: The Scientific Method Flowchart",
      "svg": "<svg viewBox=\"0 0 500 240\" class=\"w-full h-auto max-w-[480px] mx-auto border border-black bg-white p-2\">\n  <defs>\n    <marker id=\"arrow\" viewBox=\"0 0 10 10\" refX=\"5\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\">\n      <path d=\"M 0 0 L 10 5 L 0 10 z\" fill=\"#000000\"/>\n    </marker>\n  </defs>\n  <!-- Step 1: Observation -->\n  <rect x=\"20\" y=\"20\" width=\"120\" height=\"42\" rx=\"4\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <text x=\"80\" y=\"38\" font-family=\"sans-serif\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#000000\">1. OBSERVATION</text>\n  <text x=\"80\" y=\"52\" font-family=\"sans-serif\" font-size=\"9\" text-anchor=\"middle\" fill=\"#000000\">Notice surroundings</text>\n  \n  <line x1=\"140\" y1=\"41\" x2=\"180\" y2=\"41\" stroke=\"#000000\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/>\n\n  <!-- Step 2: Question -->\n  <rect x=\"180\" y=\"20\" width=\"130\" height=\"42\" rx=\"4\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <text x=\"245\" y=\"38\" font-family=\"sans-serif\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#000000\">2. QUESTIONING</text>\n  <text x=\"245\" y=\"52\" font-family=\"sans-serif\" font-size=\"9\" text-anchor=\"middle\" fill=\"#000000\">Ask Why? How? What?</text>\n\n  <line x1=\"310\" y1=\"41\" x2=\"350\" y2=\"41\" stroke=\"#000000\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/>\n\n  <!-- Step 3: Hypothesis -->\n  <rect x=\"350\" y=\"20\" width=\"130\" height=\"42\" rx=\"4\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <text x=\"415\" y=\"38\" font-family=\"sans-serif\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#000000\">3. HYPOTHESIS</text>\n  <text x=\"415\" y=\"52\" font-family=\"sans-serif\" font-size=\"9\" text-anchor=\"middle\" fill=\"#000000\">Make an educated guess</text>\n\n  <!-- Downward arrow -->\n  <line x1=\"415\" y1=\"62\" x2=\"415\" y2=\"110\" stroke=\"#000000\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/>\n\n  <!-- Step 4: Experiment -->\n  <rect x=\"340\" y=\"110\" width=\"150\" height=\"45\" rx=\"4\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <text x=\"415\" y=\"128\" font-family=\"sans-serif\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#000000\">4. EXPERIMENTATION</text>\n  <text x=\"415\" y=\"143\" font-family=\"sans-serif\" font-size=\"9\" text-anchor=\"middle\" fill=\"#000000\">Perform tests & gather data</text>\n\n  <!-- Leftward arrow -->\n  <line x1=\"340\" y1=\"132\" x2=\"300\" y2=\"132\" stroke=\"#000000\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/>\n\n  <!-- Step 5: Analysis -->\n  <rect x=\"170\" y=\"110\" width=\"130\" height=\"45\" rx=\"4\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <text x=\"235\" y=\"128\" font-family=\"sans-serif\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#000000\">5. DATA ANALYSIS</text>\n  <text x=\"235\" y=\"143\" font-family=\"sans-serif\" font-size=\"9\" text-anchor=\"middle\" fill=\"#000000\">Does data support guess?</text>\n\n  <!-- Leftward arrow -->\n  <line x1=\"170\" y1=\"132\" x2=\"130\" y2=\"132\" stroke=\"#000000\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/>\n\n  <!-- Step 6: Conclusion -->\n  <rect x=\"10\" y=\"110\" width=\"120\" height=\"45\" rx=\"4\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <text x=\"70\" y=\"128\" font-family=\"sans-serif\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#000000\">6. CONCLUSION</text>\n  <text x=\"70\" y=\"143\" font-family=\"sans-serif\" font-size=\"9\" text-anchor=\"middle\" fill=\"#000000\">Share findings & discover</text>\n\n  <!-- Feedback loop: if false, guess again -->\n  <path d=\"M 235 155 L 235 190 L 415 190 L 415 160\" fill=\"none\" stroke=\"#000000\" stroke-dasharray=\"4,4\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/>\n  <text x=\"325\" y=\"205\" font-family=\"sans-serif\" font-size=\"8.5\" font-style=\"italic\" text-anchor=\"middle\" fill=\"#000000\">If guess is incorrect → Formulate new hypothesis</text>\n  <text x=\"250\" y=\"230\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#000000\">Core Principle: Science is an ongoing, step-by-step quest for truth</text>\n</svg>",
      "caption": "Figure 1.1: Schematic representation of the Scientific Method. Notice the feedback loop that leads to new hypotheses when experimental results contradict initial assumptions."
    },
    "diagramQuestions": [
      {
        "q": "According to the scientific method flowchart in Fig 1.1, what step should a scientist take if experimental results do not match their initial hypothesis?",
        "ans": "The scientist does not discard the investigation; instead, they analyze the results, formulate a new educated hypothesis, and design fresh experiments to test it."
      },
      {
        "q": "Give a simple daily-life example where a common person uses the scientific method.",
        "ans": "When an electric bulb stops glowing: Observation (bulb off) → Question (why is it off?) → Guess (bulb fused) → Test (replace with another bulb) → Conclusion (if it glows, previous bulb was fused; if not, check main switch)."
      }
    ],
    "sectionA": [
      {
        "q": "What is Science? Explain why Science is compared to an unending giant jigsaw puzzle.",
        "ans": "Science is a systematic way of observing, thinking, questioning, and experimenting to understand how our universe functions. It is compared to an unending jigsaw puzzle because every new scientific discovery adds another piece to our knowledge. Furthermore, every solved piece raises new questions, expanding the puzzle continuously."
      },
      {
        "q": "Describe the key steps involved in the 'Scientific Method' with an appropriate illustration.",
        "ans": "The scientific method comprises six fundamental steps: (1) Observation of a phenomenon, (2) Asking questions (Why? How?), (3) Formulating a hypothesis (an educated guess), (4) Performing controlled experiments to gather data, (5) Analyzing data objectively, and (6) Drawing conclusions. If results contradict the hypothesis, a new hypothesis is tested."
      }
    ],
    "sectionB": [
      {
        "q": "Who is a scientist?",
        "ans": "Anyone who systematically observes their surroundings, poses questions, and tests hypotheses using scientific methods is working as a scientist."
      },
      {
        "q": "Why is peer collaboration important in scientific research?",
        "ans": "Scientists work in teams because sharing ideas, data, and peer-review prevents personal bias and leads to more robust discoveries."
      },
      {
        "q": "What is the motto 'To be a wise person, you must be a whys person' implying?",
        "ans": "It implies that true wisdom and scientific progress stem from relentless curiosity and constantly asking 'Why' about natural phenomena."
      }
    ],
    "sectionC": [
      {
        "q": "Science is merely a collection of memorized facts and formulas.",
        "ans": "False",
        "reason": "Science is an active process of questioning, experimenting, and understanding rather than rote memorization."
      },
      {
        "q": "If an experiment disproves our hypothesis, the investigation is a failure.",
        "ans": "False",
        "reason": "Disproving a hypothesis is valuable because it rules out false ideas and guides us toward the correct answer."
      },
      {
        "q": "Curiosity and keen observation are the starting points of scientific discovery.",
        "ans": "True",
        "reason": "Observing patterns in nature triggers questions that lead to major discoveries."
      },
      {
        "q": "Scientific theories can change when new, more accurate evidence is discovered.",
        "ans": "True",
        "reason": "Science is dynamic and self-correcting based on verifiable evidence."
      },
      {
        "q": "Only professional researchers in laboratories can practice the scientific method.",
        "ans": "False",
        "reason": "Anyone solving daily problems systematically (like fixing a bicycle or cooking) uses the scientific method."
      }
    ],
    "sectionD": [
      {
        "q": "A tentative explanation or educated guess to answer a scientific question is called a ________.",
        "ans": "Hypothesis"
      },
      {
        "q": "The process of verifying a hypothesis through controlled practical testing is called ________.",
        "ans": "Experimentation"
      },
      {
        "q": "Science develops a rational and questioning mindset known as scientific ________.",
        "ans": "Temper"
      },
      {
        "q": "In the new NCERT curriculum, the Grade 6 Science textbook is titled ________.",
        "ans": "Curiosity"
      },
      {
        "q": "Careful examination of objects and events using our five senses is called ________.",
        "ans": "Observation"
      }
    ],
    "sectionE": [
      {
        "left": "Observation",
        "right": "Using senses to notice patterns",
        "pair": "Observation → Using senses to notice patterns"
      },
      {
        "left": "Hypothesis",
        "right": "Testable educated guess",
        "pair": "Hypothesis → Testable educated guess"
      },
      {
        "left": "Experiment",
        "right": "Controlled practical testing",
        "pair": "Experiment → Controlled practical testing"
      },
      {
        "left": "Scientific Temper",
        "right": "Rational and evidence-based thinking",
        "pair": "Scientific Temper → Rational and evidence-based thinking"
      },
      {
        "left": "Conclusion",
        "right": "Final inference drawn from data",
        "pair": "Conclusion → Final inference drawn from data"
      }
    ],
    "goldenPoints": [
      "Science is an active, open-ended quest to uncover the laws governing the universe.",
      "The six steps of the scientific method are: Observe, Question, Hypothesize, Experiment, Analyze, and Conclude.",
      "A hypothesis must always be testable through physical or observational experiments.",
      "Negative results in an experiment are just as valuable as positive ones in refining our understanding.",
      "Curiosity is the fuel of all scientific breakthroughs throughout human history.",
      "Scientists collaborate globally, sharing experimental findings through peer-reviewed reports.",
      "Never accept claims without verifiable evidence and logical reasoning.",
      "A bicycle mechanic or a chef diagnosing problems acts in the spirit of a practical scientist.",
      "Scientific knowledge evolves as more sensitive measurement instruments are engineered.",
      "Class 6 Science lays the foundational groundwork for Physics, Chemistry, and Biology."
    ]
  },
  {
    "id": 2,
    "title": "Diversity in the Living World",
    "unit": "Unit 2: The World of the Living",
    "summary": "Explore biodiversity, plant classifications (herbs, shrubs, trees), root systems (taproot vs fibrous root), leaf venation (reticulate vs parallel), correlation between seed cotyledons, roots and leaves, animal habitats (terrestrial, aquatic, amphibious), and adaptations.",
    "diagram": {
      "title": "Fig 2.1: Types of Root Systems and Leaf Venation",
      "svg": "<svg viewBox=\"0 0 520 260\" class=\"w-full h-auto max-w-[500px] mx-auto border border-black bg-white p-2\">\n  <!-- Left Side: Dicot Plant (Taproot & Reticulate Venation) -->\n  <rect x=\"10\" y=\"10\" width=\"240\" height=\"240\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"130\" y=\"28\" font-family=\"sans-serif\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#000000\">TYPE A: DICOTYLEDONOUS PLANT</text>\n  \n  <!-- Reticulate Leaf -->\n  <path d=\"M 80 120 C 50 80, 50 45, 130 40 C 210 45, 210 80, 180 120 C 150 145, 110 145, 80 120 Z\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1.8\"/>\n  <line x1=\"130\" y1=\"40\" x2=\"130\" y2=\"140\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <!-- Reticulate network veins -->\n  <line x1=\"130\" y1=\"60\" x2=\"90\" y2=\"50\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <line x1=\"130\" y1=\"60\" x2=\"170\" y2=\"50\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <line x1=\"130\" y1=\"80\" x2=\"80\" y2=\"70\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <line x1=\"130\" y1=\"80\" x2=\"180\" y2=\"70\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <line x1=\"130\" y1=\"100\" x2=\"95\" y2=\"95\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <line x1=\"130\" y1=\"100\" x2=\"165\" y2=\"95\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"130\" y=\"155\" font-family=\"sans-serif\" font-size=\"9.5\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#000000\">Reticulate Venation (Net-like)</text>\n  <text x=\"130\" y=\"167\" font-family=\"sans-serif\" font-size=\"8.5\" text-anchor=\"middle\" fill=\"#000000\">(e.g., Peepal, Mustard, Pea)</text>\n\n  <!-- Taproot -->\n  <line x1=\"130\" y1=\"180\" x2=\"130\" y2=\"235\" stroke=\"#000000\" stroke-width=\"3\"/>\n  <line x1=\"130\" y1=\"190\" x2=\"105\" y2=\"200\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <line x1=\"130\" y1=\"195\" x2=\"155\" y2=\"205\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <line x1=\"130\" y1=\"210\" x2=\"110\" y2=\"220\" stroke=\"#000000\" stroke-width=\"1.2\"/>\n  <line x1=\"130\" y1=\"215\" x2=\"150\" y2=\"225\" stroke=\"#000000\" stroke-width=\"1.2\"/>\n  <text x=\"130\" y=\"248\" font-family=\"sans-serif\" font-size=\"9.5\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#000000\">Taproot System (Primary + Lateral)</text>\n\n  <!-- Right Side: Monocot Plant (Fibrous Root & Parallel Venation) -->\n  <rect x=\"270\" y=\"10\" width=\"240\" height=\"240\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"390\" y=\"28\" font-family=\"sans-serif\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#000000\">TYPE B: MONOCOTYLEDONOUS PLANT</text>\n\n  <!-- Parallel Leaf (Grass/Wheat blade) -->\n  <path d=\"M 360 140 C 370 70, 380 45, 390 38 C 400 45, 410 70, 420 140 Z\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1.8\"/>\n  <line x1=\"375\" y1=\"45\" x2=\"375\" y2=\"140\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <line x1=\"382\" y1=\"40\" x2=\"382\" y2=\"140\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <line x1=\"390\" y1=\"38\" x2=\"390\" y2=\"140\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <line x1=\"398\" y1=\"40\" x2=\"398\" y2=\"140\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <line x1=\"405\" y1=\"45\" x2=\"405\" y2=\"140\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"390\" y=\"155\" font-family=\"sans-serif\" font-size=\"9.5\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#000000\">Parallel Venation (Straight lines)</text>\n  <text x=\"390\" y=\"167\" font-family=\"sans-serif\" font-size=\"8.5\" text-anchor=\"middle\" fill=\"#000000\">(e.g., Grass, Wheat, Maize, Banana)</text>\n\n  <!-- Fibrous Roots -->\n  <path d=\"M 390 180 L 360 235 M 390 180 L 370 238 M 390 180 L 380 240 M 390 180 L 390 242 M 390 180 L 400 240 M 390 180 L 410 238 M 390 180 L 420 235\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <text x=\"390\" y=\"248\" font-family=\"sans-serif\" font-size=\"9.5\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#000000\">Fibrous Root System (Cluster of Roots)</text>\n</svg>",
      "caption": "Figure 2.1: Scientific correlation between root systems and leaf venation. Plants with reticulate venation possess taproots (dicots), whereas plants with parallel venation possess fibrous roots (monocots)."
    },
    "diagramQuestions": [
      {
        "q": "Examine Fig 2.1. If you observe a plant with parallel venation in its leaves, what type of root system will it definitely possess without uprooting it?",
        "ans": "It will have a Fibrous root system (Type B), as seen in monocotyledonous plants like wheat, maize, and grasses."
      },
      {
        "q": "A farmer is harvesting radishes from the garden. Radish is an edible swollen taproot. Predict the venation of radish leaves.",
        "ans": "Because radish has a primary taproot system, its leaves will display reticulate (net-like) venation."
      }
    ],
    "sectionA": [
      {
        "q": "Explain the remarkable biological correlation between seeds, leaf venation, and root systems in plants.",
        "ans": "In flowering plants, there is a consistent three-way relationship: (1) Dicotyledonous seeds (seeds with two cotyledons like pea, gram, mustard) produce plants with reticulate leaf venation and a primary taproot system. (2) Monocotyledonous seeds (seeds with a single cotyledon like wheat, maize, rice) produce plants with parallel leaf venation and a fibrous root system. This allows scientists to determine root types without uprooting plants."
      },
      {
        "q": "Classify plants on the basis of their height, stem nature, and life span into Herbs, Shrubs, and Trees with examples.",
        "ans": "(1) Herbs: Small plants with green, soft, and tender stems; usually short and short-lived (e.g., Tomato, Mint, Mustard). (2) Shrubs: Medium-sized plants with hard woody stems branching out near the ground level; no single prominent trunk (e.g., Rose, Hibiscus/Gudhal, Lemon). (3) Trees: Tall, robust plants with a thick, hard, brown woody trunk branching in upper parts (e.g., Mango, Banyan, Neem)."
      }
    ],
    "sectionB": [
      {
        "q": "What is a habitat? Name the major habitats of living organisms.",
        "ans": "A habitat is the natural living environment that provides an organism food, water, shelter, and suitable conditions for reproduction. Major habitats include Terrestrial (land, forests, deserts, mountains) and Aquatic (freshwater ponds, rivers, oceans)."
      },
      {
        "q": "How does a mountain goat differ from a plain goat in terms of adaptation?",
        "ans": "A mountain goat has thick warm fur to survive freezing temperatures and strong curved hooves that provide exceptional grip on steep rocky cliffs."
      },
      {
        "q": "What are amphibians? Give two examples.",
        "ans": "Amphibians are organisms adapted to live both on land and in freshwater bodies, such as frogs and toads."
      }
    ],
    "sectionC": [
      {
        "q": "Plants with fibrous roots always have leaves with reticulate venation.",
        "ans": "False",
        "reason": "Plants with fibrous roots always have parallel leaf venation (monocots)."
      },
      {
        "q": "A hibiscus (Gudhal) plant is classified as a shrub because it branches near the base.",
        "ans": "True",
        "reason": "Hibiscus has a hard woody stem with multiple branches arising close to ground level."
      },
      {
        "q": "Dolphins and whales breathe underwater using gills just like ordinary fishes.",
        "ans": "False",
        "reason": "Dolphins and whales are mammals; they breathe atmospheric air using lungs through blowholes."
      },
      {
        "q": "The main thick root that grows vertically downward from the stem base is called a taproot.",
        "ans": "True",
        "reason": "A taproot has one main primary root that sprouts smaller lateral branch roots."
      },
      {
        "q": "Camels have broad flat padded feet to help them walk effortlessly on loose desert sand.",
        "ans": "True",
        "reason": "Broad feet increase surface area, preventing them from sinking into loose sand."
      }
    ],
    "sectionD": [
      {
        "q": "The pattern of veins arranged on the lamina of a green leaf is termed leaf ________.",
        "ans": "Venation"
      },
      {
        "q": "Seeds of gram and kidney beans have two seed leaves and are called ________.",
        "ans": "Dicots (Dicotyledonous)"
      },
      {
        "q": "Organisms that live in water bodies like ponds, rivers, and oceans are called ________ animals.",
        "ans": "Aquatic"
      },
      {
        "q": "Special physical features that enable a plant or animal to thrive in its habitat are called ________.",
        "ans": "Adaptations"
      },
      {
        "q": "The broad, expanded green part of a leaf is called the ________.",
        "ans": "Lamina (Leaf blade)"
      }
    ],
    "sectionE": [
      {
        "left": "Taproot",
        "right": "Reticulate leaf venation",
        "pair": "Taproot → Reticulate leaf venation"
      },
      {
        "left": "Fibrous root",
        "right": "Parallel leaf venation",
        "pair": "Fibrous root → Parallel leaf venation"
      },
      {
        "left": "Fish",
        "right": "Streamlined body & gills",
        "pair": "Fish → Streamlined body & gills"
      },
      {
        "left": "Camel",
        "right": "Hump for fat storage",
        "pair": "Camel → Hump for fat storage"
      },
      {
        "left": "Hibiscus",
        "right": "Woody bushy shrub",
        "pair": "Hibiscus → Woody bushy shrub"
      }
    ],
    "goldenPoints": [
      "Biodiversity encompasses the vast variety of plants, animals, and microorganisms on Earth.",
      "Herbs have tender green stems; shrubs branch near the base; trees have a thick woody trunk.",
      "Taproot systems feature a dominant primary root with smaller secondary lateral rootlets.",
      "Fibrous root systems feature a cluster of thin hair-like roots arising from the stem base.",
      "Reticulate venation forms a complex web; parallel venation runs in parallel lines.",
      "Monocot seeds correspond to fibrous roots; dicot seeds correspond to taproots.",
      "Terrestrial habitats include deserts, grasslands, mountains, and forests.",
      "Streamlined body shape reduces water resistance in swimming aquatic animals.",
      "Mountain animals possess thick fur and layers of insulating fat against extreme cold.",
      "Conserving diverse habitats is essential to sustain planetary ecological balance."
    ]
  },
  {
    "id": 3,
    "title": "Mindful Eating: A Path to a Healthy Body",
    "unit": "Unit 2: The World of the Living",
    "summary": "Nutritional science, major food components (carbohydrates, fats, proteins, vitamins, minerals, dietary fibre, water), food testing (starch, protein, fat), deficiency diseases, and traditional balanced diet practices.",
    "diagram": {
      "title": "Fig 3.1: The Balanced Diet Plate & Nutrient Testing Apparatus",
      "svg": "<svg viewBox=\"0 0 520 240\" class=\"w-full h-auto max-w-[500px] mx-auto border border-black bg-white p-2\">\n  <!-- Left Side: Balanced Diet Plate -->\n  <circle cx=\"130\" cy=\"115\" r=\"90\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"2.5\"/>\n  <circle cx=\"130\" cy=\"115\" r=\"82\" fill=\"#ffffff\" stroke=\"#000000\" stroke-dasharray=\"3,3\" stroke-width=\"1\"/>\n  \n  <!-- Division lines on plate -->\n  <!-- 40% Veg & Fruits -->\n  <path d=\"M 130 115 L 130 33 A 82 82 0 0 1 208 140 Z\" fill=\"#f0f0f0\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <text x=\"175\" y=\"80\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" text-anchor=\"middle\">VEGETABLES</text>\n  <text x=\"175\" y=\"92\" font-family=\"sans-serif\" font-size=\"8\" text-anchor=\"middle\">& FRUITS</text>\n  <text x=\"175\" y=\"103\" font-family=\"sans-serif\" font-size=\"7.5\" text-anchor=\"middle\">(Vitamins & Minerals)</text>\n\n  <!-- 30% Whole Grains -->\n  <path d=\"M 130 115 L 208 140 A 82 82 0 0 1 75 178 Z\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <text x=\"145\" y=\"150\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" text-anchor=\"middle\">WHOLE GRAINS</text>\n  <text x=\"145\" y=\"162\" font-family=\"sans-serif\" font-size=\"7.5\" text-anchor=\"middle\">(Carbohydrates & Fibre)</text>\n\n  <!-- 25% Proteins & Pulses -->\n  <path d=\"M 130 115 L 75 178 A 82 82 0 0 1 130 33 Z\" fill=\"#e5e5e5\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <text x=\"85\" y=\"85\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" text-anchor=\"middle\">PROTEINS</text>\n  <text x=\"85\" y=\"97\" font-family=\"sans-serif\" font-size=\"7.5\" text-anchor=\"middle\">(Pulses, Milk,</text>\n  <text x=\"85\" y=\"107\" font-family=\"sans-serif\" font-size=\"7.5\" text-anchor=\"middle\">Eggs, Paneer)</text>\n\n  <text x=\"130\" y=\"225\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">BALANCED DIET THALI</text>\n\n  <!-- Right Side: Laboratory Nutrient Test Setup -->\n  <rect x=\"270\" y=\"15\" width=\"240\" height=\"210\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"390\" y=\"32\" font-family=\"sans-serif\" font-size=\"10.5\" font-weight=\"bold\" text-anchor=\"middle\">TEST FOR STARCH & PROTEIN</text>\n\n  <!-- Starch Test: Dropper + Potato slice -->\n  <path d=\"M 310 130 C 310 110, 360 110, 360 130 Z\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <ellipse cx=\"335\" cy=\"130\" rx=\"25\" ry=\"8\" fill=\"#e0e0e0\" stroke=\"#000000\" stroke-width=\"1.2\"/>\n  <text x=\"335\" y=\"145\" font-family=\"sans-serif\" font-size=\"8\" font-weight=\"bold\" text-anchor=\"middle\">Potato Slice</text>\n  \n  <!-- Dropper -->\n  <rect x=\"332\" y=\"50\" width=\"6\" height=\"35\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1.2\"/>\n  <path d=\"M 330 50 C 330 42, 340 42, 340 50 Z\" fill=\"#000000\"/>\n  <line x1=\"335\" y1=\"85\" x2=\"335\" y2=\"105\" stroke=\"#000000\" stroke-dasharray=\"2,2\"/>\n  <circle cx=\"335\" cy=\"115\" r=\"5\" fill=\"#000000\"/>\n  <text x=\"375\" y=\"70\" font-family=\"sans-serif\" font-size=\"8\" text-anchor=\"start\">Dilute Iodine</text>\n  <text x=\"375\" y=\"80\" font-family=\"sans-serif\" font-size=\"8\" text-anchor=\"start\">Solution</text>\n  <text x=\"335\" y=\"165\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#000000\">Turns Blue-Black = STARCH Present</text>\n\n  <!-- Protein Test: Test tube -->\n  <rect x=\"440\" y=\"55\" width=\"22\" height=\"70\" rx=\"5\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <rect x=\"442\" y=\"90\" width=\"18\" height=\"32\" rx=\"3\" fill=\"#cccccc\"/>\n  <text x=\"451\" y=\"145\" font-family=\"sans-serif\" font-size=\"8\" font-weight=\"bold\" text-anchor=\"middle\">Test Tube</text>\n  <text x=\"451\" y=\"165\" font-family=\"sans-serif\" font-size=\"8\" text-anchor=\"middle\">CuSO₄ + NaOH</text>\n  <text x=\"451\" y=\"177\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" text-anchor=\"middle\">Violet = PROTEIN</text>\n</svg>",
      "caption": "Figure 3.1: (Left) Recommended nutrient proportions in a wholesome balanced diet thali. (Right) Standard chemical tests for detecting starch (blue-black with iodine) and proteins (violet color with copper sulphate and caustic soda)."
    },
    "diagramQuestions": [
      {
        "q": "Referring to Fig 3.1, what color change indicates the presence of starch when drops of dilute iodine solution are added to a crushed food sample?",
        "ans": "The food item turns distinctly blue-black, confirming the presence of starch (carbohydrates)."
      },
      {
        "q": "Which two chemical reagents are required to test the presence of protein in food, and what positive color is observed?",
        "ans": "Copper sulphate (CuSO₄) solution and Caustic soda (NaOH) solution. A violet/purple color confirms protein."
      }
    ],
    "sectionA": [
      {
        "q": "What is a balanced diet? Describe the five major nutrient groups and their physiological roles in the human body.",
        "ans": "A balanced diet contains all essential nutrients in proper amounts, along with adequate dietary fibre (roughage) and water. The five nutrient groups are: (1) Carbohydrates: Main immediate energy source (wheat, rice, potato). (2) Fats: High-density energy reserves and body insulation (ghee, butter, nuts). (3) Proteins: Building blocks for growth and tissue repair (pulses, milk, eggs, paneer). (4) Vitamins: Disease-fighting organic protectors (Vit A, B-complex, C, D). (5) Minerals: Structural and metabolic regulators (Calcium for bones, Iron for red blood cells)."
      },
      {
        "q": "What are deficiency diseases? Explain any three deficiency diseases with their causative nutrient and symptoms.",
        "ans": "Diseases caused by the prolonged lack of specific nutrients in our diet are deficiency diseases: (1) Scurvy: Caused by Vitamin C deficiency; symptoms include bleeding gums and delayed wound healing. (2) Rickets: Caused by Vitamin D/Calcium deficiency; symptoms include soft, weak, and bent leg bones. (3) Anaemia: Caused by Iron deficiency; symptoms include severe weakness, pale skin, and fatigue."
      }
    ],
    "sectionB": [
      {
        "q": "Why is dietary fibre (roughage) essential when it provides no nutritional energy?",
        "ans": "Dietary fibre adds bulk to undigested food, retains moisture, ensures healthy intestinal peristalsis, and prevents constipation."
      },
      {
        "q": "How can you test a food sample for the presence of fats?",
        "ans": "Crush a small piece of food between folds of clean white paper; a translucent, greasy oily patch that lets light through indicates fat."
      },
      {
        "q": "What happens when rice or pulses are washed repeatedly with excess water before cooking?",
        "ans": "Repeated vigorous washing strips away vital water-soluble vitamins (Vitamin B-complex) and minerals present on the grain surface."
      }
    ],
    "sectionC": [
      {
        "q": "Fats provide more than twice the amount of energy per gram compared to carbohydrates.",
        "ans": "True",
        "reason": "Fats are concentrated energy reserves that yield approximately 9 kcal/gram versus 4 kcal/gram from carbohydrates."
      },
      {
        "q": "Night blindness is caused by a severe deficiency of Vitamin C in the diet.",
        "ans": "False",
        "reason": "Night blindness (poor vision in dim light) is caused by Vitamin A deficiency; Scurvy is caused by Vitamin C deficiency."
      },
      {
        "q": "Drinking 8-10 glasses of water daily helps in waste excretion through urine and sweat.",
        "ans": "True",
        "reason": "Water acts as a biological solvent, transporting nutrients and flushing out metabolic toxins."
      },
      {
        "q": "A diet consisting solely of fast foods like burgers and pizzas constitutes a balanced diet.",
        "ans": "False",
        "reason": "Junk foods lack essential dietary fibres, vitamins, and minerals while containing unhealthy saturated fats and refined sugars."
      },
      {
        "q": "Goitre is characterized by an enlarged, swollen thyroid gland in the neck due to Iodine deficiency.",
        "ans": "True",
        "reason": "Iodine is essential for thyroid hormone synthesis; its absence causes thyroid gland swelling."
      }
    ],
    "sectionD": [
      {
        "q": "The chemical solution used to test for the presence of starch in food is dilute ________ solution.",
        "ans": "Iodine"
      },
      {
        "q": "Vitamin ________ is produced naturally in our skin when exposed to gentle morning sunlight.",
        "ans": "Vitamin D"
      },
      {
        "q": "Deficiency of ________ in our diet leads to swelling of the thyroid gland in the neck called goitre.",
        "ans": "Iodine"
      },
      {
        "q": "Indigestible plant cellulose that aids in smooth bowel movements is termed dietary ________.",
        "ans": "Fibre (Roughage)"
      },
      {
        "q": "Severe deficiency of proteins and calories in young children causes a wasting disease called ________.",
        "ans": "Kwashiorkor / Marasmus"
      }
    ],
    "sectionE": [
      {
        "left": "Vitamin A",
        "right": "Night blindness & dry eyes",
        "pair": "Vitamin A → Night blindness & dry eyes"
      },
      {
        "left": "Vitamin C",
        "right": "Scurvy & bleeding gums",
        "pair": "Vitamin C → Scurvy & bleeding gums"
      },
      {
        "left": "Vitamin D",
        "right": "Rickets & soft bent bones",
        "pair": "Vitamin D → Rickets & soft bent bones"
      },
      {
        "left": "Iron",
        "right": "Anaemia & general fatigue",
        "pair": "Iron → Anaemia & general fatigue"
      },
      {
        "left": "Iodine",
        "right": "Goitre & swollen neck gland",
        "pair": "Iodine → Goitre & swollen neck gland"
      }
    ],
    "goldenPoints": [
      "Food provides five essential nutrients: carbohydrates, fats, proteins, vitamins, and minerals.",
      "Starch turns dark blue-black with iodine; proteins turn violet with copper sulphate and caustic soda.",
      "Fats produce a persistent greasy translucent patch on plain paper.",
      "A balanced diet must incorporate fresh seasonal vegetables, fruits, whole grains, and dairy/pulses.",
      "Roughage prevents constipation; water maintains body temperature and metabolic transport.",
      "Overcooking and deep-frying destroys heat-sensitive vitamins, especially Vitamin C.",
      "Nutrient deficiency over prolonged periods manifests as specific clinical diseases.",
      "Iron builds haemoglobin for oxygen transport; calcium and phosphorus build skeletal teeth and bones.",
      "Traditional Indian thalis naturally combine cereals, pulses, vegetables, and curd into a balanced meal.",
      "Mindful eating means chewing food thoroughly without screen distractions."
    ]
  },
  {
    "id": 4,
    "title": "Exploring Magnets",
    "unit": "Unit 3: Exploring Matter and Energy",
    "summary": "Discovery of lodestones, magnetic vs non-magnetic materials, poles of a magnet, magnetic attraction and repulsion, making artificial magnets, magnetic compass, and caring for magnets.",
    "diagram": {
      "title": "Fig 4.1: Magnetic Poles, Field Lines & Interactions",
      "svg": "<svg viewBox=\"0 0 520 240\" class=\"w-full h-auto max-w-[500px] mx-auto border border-black bg-white p-2\">\n  <!-- Top: Bar Magnet with Poles and Iron Filings Concentration -->\n  <rect x=\"50\" y=\"20\" width=\"180\" height=\"35\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <line x1=\"140\" y1=\"20\" x2=\"140\" y2=\"55\" stroke=\"#000000\" stroke-width=\"1.5\" stroke-dasharray=\"2,2\"/>\n  <!-- North Pole side -->\n  <rect x=\"50\" y=\"20\" width=\"90\" height=\"35\" fill=\"#e5e5e5\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"95\" y=\"43\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">NORTH (N)</text>\n  <!-- South Pole side -->\n  <rect x=\"140\" y=\"20\" width=\"90\" height=\"35\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"185\" y=\"43\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">SOUTH (S)</text>\n\n  <!-- Filings dots clustered at poles -->\n  <text x=\"35\" y=\"42\" font-family=\"sans-serif\" font-size=\"18\" text-anchor=\"middle\">⋮⋮⋮</text>\n  <text x=\"245\" y=\"42\" font-family=\"sans-serif\" font-size=\"18\" text-anchor=\"middle\">⋮⋮⋮</text>\n  <text x=\"140\" y=\"70\" font-family=\"sans-serif\" font-size=\"9\" text-anchor=\"middle\" font-weight=\"bold\">Maximum magnetic attraction occurs at the POLES</text>\n\n  <!-- Top Right: Magnetic Compass -->\n  <circle cx=\"390\" cy=\"50\" r=\"38\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <text x=\"390\" y=\"22\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" text-anchor=\"middle\">N</text>\n  <text x=\"390\" y=\"85\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" text-anchor=\"middle\">S</text>\n  <text x=\"424\" y=\"53\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" text-anchor=\"middle\">E</text>\n  <text x=\"356\" y=\"53\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" text-anchor=\"middle\">W</text>\n  <!-- Compass Needle -->\n  <polygon points=\"390,26 384,50 390,46 396,50\" fill=\"#000000\"/>\n  <polygon points=\"390,74 384,50 390,46 396,50\" fill=\"#ffffff\" stroke=\"#000000\"/>\n  <text x=\"390\" y=\"102\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" text-anchor=\"middle\">Magnetic Compass</text>\n\n  <!-- Bottom: Law of Magnetic Poles (Attraction vs Repulsion) -->\n  <rect x=\"20\" y=\"115\" width=\"480\" height=\"110\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"260\" y=\"132\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">FUNDAMENTAL LAW OF MAGNETIC INTERACTIONS</text>\n\n  <!-- Case 1: Like Poles Repel -->\n  <rect x=\"40\" y=\"145\" width=\"60\" height=\"25\" fill=\"#e5e5e5\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <text x=\"70\" y=\"162\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">N</text>\n  <rect x=\"130\" y=\"145\" width=\"60\" height=\"25\" fill=\"#e5e5e5\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <text x=\"160\" y=\"162\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">N</text>\n  <!-- Repulsion arrows -->\n  <line x1=\"90\" y1=\"157\" x2=\"80\" y2=\"157\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <line x1=\"140\" y1=\"157\" x2=\"150\" y2=\"157\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <text x=\"115\" y=\"190\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" text-anchor=\"middle\">LIKE POLES REPEL</text>\n  <text x=\"115\" y=\"202\" font-family=\"sans-serif\" font-size=\"8\" text-anchor=\"middle\">(N-N or S-S push apart)</text>\n\n  <!-- Case 2: Unlike Poles Attract -->\n  <rect x=\"300\" y=\"145\" width=\"60\" height=\"25\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <text x=\"330\" y=\"162\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">S</text>\n  <rect x=\"390\" y=\"145\" width=\"60\" height=\"25\" fill=\"#e5e5e5\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <text x=\"420\" y=\"162\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">N</text>\n  <!-- Attraction arrows -->\n  <line x1=\"365\" y1=\"157\" x2=\"385\" y2=\"157\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <text x=\"375\" y=\"190\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" text-anchor=\"middle\">UNLIKE POLES ATTRACT</text>\n  <text x=\"375\" y=\"202\" font-family=\"sans-serif\" font-size=\"8\" text-anchor=\"middle\">(N-S pull strongly together)</text>\n</svg>",
      "caption": "Figure 4.1: Magnetic properties: (Top left) Maximum magnetic strength concentrates at the two opposite poles. (Top right) A pivoted magnetic needle points North-South. (Bottom) Fundamental law: Like poles repel each other, while unlike poles attract."
    },
    "diagramQuestions": [
      {
        "q": "Based on Fig 4.1, if the North pole of a bar magnet is brought near the North pole of another suspended magnet, what observable interaction occurs?",
        "ans": "The two magnets push each other away because like magnetic poles (N-N) repel each other."
      },
      {
        "q": "Why does a freely suspended magnetic needle always align itself in the North-South geographical direction?",
        "ans": "Because the Earth itself behaves like an enormous magnet with magnetic poles that exert rotational force on the needle."
      }
    ],
    "sectionA": [
      {
        "q": "State the fundamental law of magnetism. Describe an activity to demonstrate that magnetic poles always exist in inseparable pairs.",
        "ans": "The law of magnetism states: 'Like magnetic poles repel each other, whereas unlike magnetic poles attract each other.' If a bar magnet is broken into two halves, we do not obtain isolated North or South poles; instead, each broken piece immediately forms its own new North and South poles. Even if broken into microscopic fragments, magnetic monopoles cannot exist independently."
      },
      {
        "q": "How can you make an artificial magnet from an ordinary iron nail using the touch-and-stroke method?",
        "ans": "Place an iron nail on a wooden table. Take a bar magnet and place one of its poles (e.g., North pole) at one end of the nail. Without lifting, drag the magnet along the entire length to the opposite end. Lift the magnet, bring the same pole back to the starting point, and repeat this stroking motion in the same direction 30-40 times. The nail becomes magnetized."
      }
    ],
    "sectionB": [
      {
        "q": "Differentiate between magnetic and non-magnetic materials with two examples of each.",
        "ans": "Magnetic materials are attracted towards magnets (e.g., Iron, Nickel, Cobalt). Non-magnetic materials are not attracted by magnets (e.g., Wood, Plastic, Glass, Copper, Aluminium)."
      },
      {
        "q": "List three precautions required to prevent magnets from losing their magnetism (demagnetization).",
        "ans": "(1) Never heat magnets over a flame. (2) Never hammer or drop magnets from a height onto hard floors. (3) Always store bar magnets in pairs with unlike poles adjacent, separated by wooden pieces and bridged with soft iron keepers."
      },
      {
        "q": "What is a lodestone?",
        "ans": "A lodestone is a naturally occurring magnetic rock containing the mineral magnetite, historically used by ancient navigators to discover directions."
      }
    ],
    "sectionC": [
      {
        "q": "A freely suspended bar magnet always settles in the East-West direction.",
        "ans": "False",
        "reason": "It always aligns along the North-South geographical direction due to Earth's magnetic field."
      },
      {
        "q": "Magnetic attraction is strongest at the center of a bar magnet.",
        "ans": "False",
        "reason": "Magnetic attraction is strongest at the two ends (poles) and weakest in the middle."
      },
      {
        "q": "A magnetic compass needle is itself a tiny, freely pivoted magnet.",
        "ans": "True",
        "reason": "The compass needle is a magnetized steel pointer that rotates freely on a brass pivot."
      },
      {
        "q": "Heating a magnet strongly increases its magnetic strength.",
        "ans": "False",
        "reason": "Heating jumbles the internal magnetic domains, causing the magnet to lose its magnetism completely."
      },
      {
        "q": "Repulsion is the only surefire test to confirm whether an object is a magnet.",
        "ans": "True",
        "reason": "A magnet attracts both opposite magnetic poles and unmagnetized iron objects, but repels only a like magnetic pole."
      }
    ],
    "sectionD": [
      {
        "q": "The natural magnetic ore discovered in ancient times is called ________.",
        "ans": "Magnetite (Lodestone)"
      },
      {
        "q": "The two ends of a magnet where magnetic attraction is concentrated are called magnetic ________.",
        "ans": "Poles"
      },
      {
        "q": "Like magnetic poles ________ each other, while unlike magnetic poles attract.",
        "ans": "Repel"
      },
      {
        "q": "Soft iron pieces placed across the poles of stored magnets are known as magnetic ________.",
        "ans": "Keepers"
      },
      {
        "q": "The instrument used by sailors and trekkers to determine geographical direction is the magnetic ________.",
        "ans": "Compass"
      }
    ],
    "sectionE": [
      {
        "left": "Bar magnet",
        "right": "Rectangular magnetic rod",
        "pair": "Bar magnet → Rectangular magnetic rod"
      },
      {
        "left": "Like poles (N-N)",
        "right": "Repulsion force",
        "pair": "Like poles (N-N) → Repulsion force"
      },
      {
        "left": "Unlike poles (N-S)",
        "right": "Attraction force",
        "pair": "Unlike poles (N-S) → Attraction force"
      },
      {
        "left": "Compass needle",
        "right": "Points towards North",
        "pair": "Compass needle → Points towards North"
      },
      {
        "left": "Plastic ruler",
        "right": "Non-magnetic material",
        "pair": "Plastic ruler → Non-magnetic material"
      }
    ],
    "goldenPoints": [
      "Magnetite is a naturally occurring magnetic mineral discovered in Magnesia (ancient Greece).",
      "Every magnet has two poles: a North-seeking pole (N) and a South-seeking pole (S).",
      "Poles cannot be isolated; cutting a magnet creates smaller independent magnets.",
      "Magnetic forces pass through non-magnetic media such as paper, plastic, water, and glass.",
      "Earth behaves as a giant magnet with its magnetic South pole situated near the geographic North pole.",
      "A magnetic compass needle points North-South due to terrestrial magnetism.",
      "Repulsion is the definitive test of magnetism; attraction occurs with unmagnetized iron too.",
      "Magnets lose strength if dropped, hammered, or exposed to excessive heat.",
      "Keepers made of soft iron protect bar and horseshoe magnets during storage.",
      "Modern technologies (speakers, hard drives, MRI machines, electric motors) rely on powerful magnets."
    ]
  },
  {
    "id": 5,
    "title": "Measurement of Length and Motion",
    "unit": "Unit 3: Moving Things, People and Ideas",
    "summary": "Standard units of measurement (SI units), avoiding parallax error when reading a ruler, measuring curved lines using thread, and classifying motion (rectilinear, circular, periodic, rotational).",
    "diagram": {
      "title": "Fig 5.1: Parallax Error in Length Measurement & Types of Motion",
      "svg": "<svg viewBox=\"0 0 520 260\" class=\"w-full h-auto max-w-[500px] mx-auto border border-black bg-white p-2\">\n  <!-- Top: Reading a scale and Eye Positions (Parallax Error) -->\n  <rect x=\"20\" y=\"15\" width=\"480\" height=\"115\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"260\" y=\"32\" font-family=\"sans-serif\" font-size=\"10.5\" font-weight=\"bold\" text-anchor=\"middle\">CORRECT EYE POSITION FOR AVOIDING PARALLAX ERROR</text>\n\n  <!-- Wooden/Plastic Ruler -->\n  <rect x=\"40\" y=\"80\" width=\"440\" height=\"28\" fill=\"#f8f8f8\" stroke=\"#000000\" stroke-width=\"1.8\"/>\n  <!-- cm markings -->\n  <!-- 0 cm -->\n  <line x1=\"60\" y1=\"80\" x2=\"60\" y2=\"96\" stroke=\"#000000\" stroke-width=\"1.5\"/><text x=\"60\" y=\"104\" font-family=\"sans-serif\" font-size=\"8\" text-anchor=\"middle\">0</text>\n  <!-- 1 cm -->\n  <line x1=\"120\" y1=\"80\" x2=\"120\" y2=\"96\" stroke=\"#000000\" stroke-width=\"1.5\"/><text x=\"120\" y=\"104\" font-family=\"sans-serif\" font-size=\"8\" text-anchor=\"middle\">1</text>\n  <!-- 2 cm -->\n  <line x1=\"180\" y1=\"80\" x2=\"180\" y2=\"96\" stroke=\"#000000\" stroke-width=\"1.5\"/><text x=\"180\" y=\"104\" font-family=\"sans-serif\" font-size=\"8\" text-anchor=\"middle\">2</text>\n  <!-- 3 cm -->\n  <line x1=\"240\" y1=\"80\" x2=\"240\" y2=\"96\" stroke=\"#000000\" stroke-width=\"1.5\"/><text x=\"240\" y=\"104\" font-family=\"sans-serif\" font-size=\"8\" text-anchor=\"middle\">3</text>\n  <!-- 4 cm -->\n  <line x1=\"300\" y1=\"80\" x2=\"300\" y2=\"96\" stroke=\"#000000\" stroke-width=\"1.5\"/><text x=\"300\" y=\"104\" font-family=\"sans-serif\" font-size=\"8\" text-anchor=\"middle\">4</text>\n  <!-- 5 cm -->\n  <line x1=\"360\" y1=\"80\" x2=\"360\" y2=\"96\" stroke=\"#000000\" stroke-width=\"1.5\"/><text x=\"360\" y=\"104\" font-family=\"sans-serif\" font-size=\"8\" text-anchor=\"middle\">5</text>\n  <!-- 6 cm -->\n  <line x1=\"420\" y1=\"80\" x2=\"420\" y2=\"96\" stroke=\"#000000\" stroke-width=\"1.5\"/><text x=\"420\" y=\"104\" font-family=\"sans-serif\" font-size=\"8\" text-anchor=\"middle\">6</text>\n\n  <!-- Object being measured: length 3.0 cm -->\n  <rect x=\"60\" y=\"70\" width=\"180\" height=\"9\" fill=\"#000000\"/>\n  <text x=\"150\" y=\"66\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" text-anchor=\"middle\">Object to measure (Exact = 3.0 cm)</text>\n\n  <!-- Three Eye Positions: A (wrong left), B (CORRECT VERTICAL), C (wrong right) -->\n  <!-- Position A -->\n  <circle cx=\"190\" cy=\"48\" r=\"7\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1.2\"/><circle cx=\"190\" cy=\"48\" r=\"3\" fill=\"#000000\"/>\n  <line x1=\"190\" y1=\"55\" x2=\"235\" y2=\"80\" stroke=\"#000000\" stroke-dasharray=\"2,2\"/>\n  <text x=\"190\" y=\"40\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" text-anchor=\"middle\">Eye A ✗</text>\n\n  <!-- Position B (Correct) -->\n  <circle cx=\"240\" cy=\"45\" r=\"8\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"2\"/><circle cx=\"240\" cy=\"45\" r=\"4\" fill=\"#000000\"/>\n  <line x1=\"240\" y1=\"53\" x2=\"240\" y2=\"80\" stroke=\"#000000\" stroke-width=\"1.8\"/>\n  <text x=\"240\" y=\"37\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#000000\">Eye B ✓ (CORRECT)</text>\n\n  <!-- Position C -->\n  <circle cx=\"290\" cy=\"48\" r=\"7\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1.2\"/><circle cx=\"290\" cy=\"48\" r=\"3\" fill=\"#000000\"/>\n  <line x1=\"290\" y1=\"55\" x2=\"245\" y2=\"80\" stroke=\"#000000\" stroke-dasharray=\"2,2\"/>\n  <text x=\"290\" y=\"40\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" text-anchor=\"middle\">Eye C ✗</text>\n\n  <!-- Bottom: Three Types of Motion -->\n  <rect x=\"20\" y=\"140\" width=\"480\" height=\"110\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"260\" y=\"156\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">TYPES OF MOTION IN SCIENCE</text>\n\n  <!-- Motion 1: Rectilinear -->\n  <rect x=\"35\" y=\"165\" width=\"130\" height=\"75\" fill=\"#fbfbfb\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <line x1=\"45\" y1=\"195\" x2=\"155\" y2=\"195\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <polygon points=\"155,195 147,191 147,199\" fill=\"#000000\"/>\n  <rect x=\"60\" y=\"185\" width=\"25\" height=\"10\" fill=\"#ffffff\" stroke=\"#000000\"/>\n  <text x=\"100\" y=\"180\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" text-anchor=\"middle\">RECTILINEAR</text>\n  <text x=\"100\" y=\"222\" font-family=\"sans-serif\" font-size=\"7.5\" text-anchor=\"middle\">Car moving in straight line</text>\n\n  <!-- Motion 2: Circular / Rotational -->\n  <rect x=\"195\" y=\"165\" width=\"130\" height=\"75\" fill=\"#fbfbfb\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <circle cx=\"260\" cy=\"200\" r=\"20\" fill=\"none\" stroke=\"#000000\" stroke-dasharray=\"3,3\" stroke-width=\"1.5\"/>\n  <circle cx=\"260\" cy=\"200\" r=\"3\" fill=\"#000000\"/>\n  <circle cx=\"280\" cy=\"200\" r=\"4\" fill=\"#000000\"/>\n  <polygon points=\"262,180 255,183 260,175\" fill=\"#000000\"/>\n  <text x=\"260\" y=\"180\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" text-anchor=\"middle\">CIRCULAR</text>\n  <text x=\"260\" y=\"232\" font-family=\"sans-serif\" font-size=\"7.5\" text-anchor=\"middle\">Blades of a rotating fan</text>\n\n  <!-- Motion 3: Periodic (Pendulum) -->\n  <rect x=\"355\" y=\"165\" width=\"130\" height=\"75\" fill=\"#fbfbfb\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <line x1=\"395\" y1=\"170\" x2=\"445\" y2=\"170\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <line x1=\"420\" y1=\"170\" x2=\"420\" y2=\"215\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <line x1=\"420\" y1=\"170\" x2=\"395\" y2=\"208\" stroke=\"#000000\" stroke-dasharray=\"2,2\"/>\n  <line x1=\"420\" y1=\"170\" x2=\"445\" y2=\"208\" stroke=\"#000000\" stroke-dasharray=\"2,2\"/>\n  <circle cx=\"420\" cy=\"215\" r=\"5\" fill=\"#000000\"/>\n  <text x=\"420\" y=\"180\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" text-anchor=\"middle\">PERIODIC</text>\n  <text x=\"420\" y=\"232\" font-family=\"sans-serif\" font-size=\"7.5\" text-anchor=\"middle\">Swinging clock pendulum</text>\n</svg>",
      "caption": "Figure 5.1: (Top) The eye must be placed vertically above the mark being read (Eye B) to prevent parallax error. (Bottom) Three fundamental types of motion: rectilinear (straight), circular (orbital/rotary), and periodic (repetitive oscillation)."
    },
    "diagramQuestions": [
      {
        "q": "In Fig 5.1, which eye position (A, B, or C) yields the true measurement of length without parallax error?",
        "ans": "Eye position B is correct because the line of sight is placed directly and vertically above the graduation mark being read."
      },
      {
        "q": "Give two real-world examples of periodic motion illustrated in Fig 5.1.",
        "ans": "(1) The rhythmic oscillation of a simple pendulum in a wall clock. (2) The swinging motion of a child on a playground swing."
      }
    ],
    "sectionA": [
      {
        "q": "Why can handspans, footsteps, and arm lengths not be used as standard units of measurement? What is the SI unit of length?",
        "ans": "Body-based units like handspans and cubits vary significantly from person to person depending on physical height and age. Hence, they lack universal consistency and reproducibility, leading to commercial disputes. To ensure uniformity worldwide, the International System of Units (SI unit) adopted the 'Metre' (m) as the standard unit of length."
      },
      {
        "q": "Explain the step-by-step method to measure the length of a curved line using a piece of thread and a metre scale.",
        "ans": "To measure a curved line: (1) Tie a small knot at one end of a fine cotton thread to mark the zero starting point. (2) Place this knot at the start of the curved line on paper. (3) Trace small, successive segments of the curve carefully with the thread, holding it taut with fingers until reaching the final endpoint. (4) Mark the endpoint on the thread with ink. (5) Stretch the thread straight along a standard centimetre ruler from the 0 mark to the ink mark to obtain the exact length."
      }
    ],
    "sectionB": [
      {
        "q": "What precautions should be observed while measuring length with a wooden ruler?",
        "ans": "(1) Align the scale exactly parallel along the edge of the object. (2) If the zero mark is damaged or chipped, start measuring from another clear mark (e.g., 1.0 cm) and subtract that reading from the final reading. (3) Keep the eye vertically above the point being measured to eliminate parallax error."
      },
      {
        "q": "Differentiate between circular motion and rotational motion.",
        "ans": "In circular motion, an object travels along a circular path around an external center (e.g., Earth orbiting the Sun). In rotational motion, the object spins around its own internal axis (e.g., spinning top, rotation of Earth on its axis)."
      },
      {
        "q": "Convert 4.5 kilometres into metres and centimetres.",
        "ans": "1 km = 1,000 m, so 4.5 km = 4.5 × 1,000 = 4,500 metres. Since 1 m = 100 cm, 4,500 m = 4,500 × 100 = 450,000 centimetres."
      }
    ],
    "sectionC": [
      {
        "q": "The SI unit of length is the foot.",
        "ans": "False",
        "reason": "The standard SI unit of length is the Metre (m)."
      },
      {
        "q": "A swinging child on a swing exhibits periodic motion.",
        "ans": "True",
        "reason": "The motion repeats itself at regular fixed intervals of time."
      },
      {
        "q": "Looking at a scale obliquely from an angle leads to parallax error in measurement.",
        "ans": "True",
        "reason": "Viewing at an angle misaligns the pointer with the graduation line beneath it."
      },
      {
        "q": "Motion of a falling apple from a tree branch is an example of circular motion.",
        "ans": "False",
        "reason": "An apple falls straight down due to gravity, which is rectilinear motion."
      },
      {
        "q": "1 centimetre is equal to 10 millimetres.",
        "ans": "True",
        "reason": "1 cm = 10 mm on a standard metric ruler."
      }
    ],
    "sectionD": [
      {
        "q": "The international standard unit adopted globally for measuring length is the ________.",
        "ans": "Metre (m)"
      },
      {
        "q": "Motion that repeats itself after equal, regular intervals of time is called ________ motion.",
        "ans": "Periodic"
      },
      {
        "q": "The visual error caused by viewing a measurement scale from an angular position is known as ________ error.",
        "ans": "Parallax"
      },
      {
        "q": "The motion of vehicles moving along a straight highway is termed ________ motion.",
        "ans": "Rectilinear"
      },
      {
        "q": "1 kilometre is equal to exactly ________ metres.",
        "ans": "1,000"
      }
    ],
    "sectionE": [
      {
        "left": "Rectilinear motion",
        "right": "March-past of soldiers in parade",
        "pair": "Rectilinear motion → March-past of soldiers in parade"
      },
      {
        "left": "Circular motion",
        "right": "Hands of a mechanical clock",
        "pair": "Circular motion → Hands of a mechanical clock"
      },
      {
        "left": "Periodic motion",
        "right": "Plucked string of a sitar",
        "pair": "Periodic motion → Plucked string of a sitar"
      },
      {
        "left": "1 Metre",
        "right": "100 Centimetres",
        "pair": "1 Metre → 100 Centimetres"
      },
      {
        "left": "1 Kilometre",
        "right": "1,000 Metres",
        "pair": "1 Kilometre → 1,000 Metres"
      }
    ],
    "goldenPoints": [
      "Measurement involves comparing an unknown quantity with a known fixed standard unit.",
      "SI unit of length is the Metre (m); mass is Kilogram (kg); time is Second (s).",
      "Non-standard ancient units (cubit, foot, angul) varied with personal body dimensions.",
      "Eye position must be perpendicular to the scale graduation to avoid parallax error.",
      "Damaged scale zero? Read from 1.0 cm and calculate: Length = Final mark − 1.0 cm.",
      "Curved distances are determined accurately by tracing with thread before measuring on a ruler.",
      "Rectilinear motion proceeds strictly along a straight linear trajectory.",
      "Circular motion maintains a constant radial distance from a central fixed axis point.",
      "Periodic motion recurs at consistent, uniform cycles of time (pendulums, heartbeats).",
      "An object can possess multiple motions simultaneously (rolling ball has rotational + rectilinear)."
    ]
  },
  {
    "id": 6,
    "title": "Materials Around Us",
    "unit": "Unit 3: Exploring Matter and Energy",
    "summary": "Properties of materials (lustre, hardness, solubility, density/floating, transparency: transparent, translucent, opaque) and grouping materials on the basis of similarities and differences.",
    "diagram": {
      "title": "Fig 6.1: Transparency of Materials & Sinking vs Floating Test",
      "svg": "<svg viewBox=\"0 0 520 240\" class=\"w-full h-auto max-w-[500px] mx-auto border border-black bg-white p-2\">\n  <!-- Left Side: Transparency (Transparent, Translucent, Opaque) -->\n  <rect x=\"15\" y=\"15\" width=\"260\" height=\"210\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"145\" y=\"32\" font-family=\"sans-serif\" font-size=\"10.5\" font-weight=\"bold\" text-anchor=\"middle\">TRANSPARENCY OF MATERIALS</text>\n\n  <!-- Flashlight Source -->\n  <polygon points=\"30,70 50,60 50,80\" fill=\"#000000\"/>\n  <rect x=\"20\" y=\"66\" width=\"10\" height=\"8\" fill=\"#000000\"/>\n  <!-- Light beam rays -->\n  <line x1=\"50\" y1=\"65\" x2=\"90\" y2=\"65\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <line x1=\"50\" y1=\"75\" x2=\"90\" y2=\"75\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n\n  <!-- 1. Transparent Sheet -->\n  <rect x=\"90\" y=\"50\" width=\"8\" height=\"40\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <!-- Rays pass through fully -->\n  <line x1=\"98\" y1=\"65\" x2=\"160\" y2=\"65\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <line x1=\"98\" y1=\"75\" x2=\"160\" y2=\"75\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <text x=\"175\" y=\"65\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\">TRANSPARENT</text>\n  <text x=\"175\" y=\"77\" font-family=\"sans-serif\" font-size=\"7.5\">(Clear Glass/Water)</text>\n  <text x=\"175\" y=\"87\" font-family=\"sans-serif\" font-size=\"7\" font-style=\"italic\">All light passes</text>\n\n  <!-- 2. Translucent Sheet -->\n  <rect x=\"90\" y=\"105\" width=\"8\" height=\"40\" fill=\"#e5e5e5\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <!-- Rays pass partially scattered -->\n  <line x1=\"50\" y1=\"120\" x2=\"90\" y2=\"120\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <line x1=\"98\" y1=\"118\" x2=\"150\" y2=\"114\" stroke=\"#000000\" stroke-dasharray=\"2,2\"/>\n  <line x1=\"98\" y1=\"125\" x2=\"150\" y2=\"130\" stroke=\"#000000\" stroke-dasharray=\"2,2\"/>\n  <text x=\"175\" y=\"120\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\">TRANSLUCENT</text>\n  <text x=\"175\" y=\"132\" font-family=\"sans-serif\" font-size=\"7.5\">(Butter paper/Frosted glass)</text>\n  <text x=\"175\" y=\"142\" font-family=\"sans-serif\" font-size=\"7\" font-style=\"italic\">Partial light passes</text>\n\n  <!-- 3. Opaque Sheet -->\n  <rect x=\"90\" y=\"160\" width=\"8\" height=\"40\" fill=\"#000000\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <!-- Rays blocked -->\n  <line x1=\"50\" y1=\"180\" x2=\"90\" y2=\"180\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <!-- Shadow on other side -->\n  <rect x=\"130\" y=\"165\" width=\"20\" height=\"30\" fill=\"#e0e0e0\" stroke=\"#000000\" stroke-dasharray=\"2,2\"/>\n  <text x=\"175\" y=\"175\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\">OPAQUE</text>\n  <text x=\"175\" y=\"187\" font-family=\"sans-serif\" font-size=\"7.5\">(Cardboard/Wood/Iron)</text>\n  <text x=\"175\" y=\"197\" font-family=\"sans-serif\" font-size=\"7\" font-style=\"italic\">Blocks light, casts shadow</text>\n\n  <!-- Right Side: Sinking vs Floating in Water Beaker -->\n  <rect x=\"290\" y=\"15\" width=\"215\" height=\"210\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"397\" y=\"32\" font-family=\"sans-serif\" font-size=\"10.5\" font-weight=\"bold\" text-anchor=\"middle\">SINKING VS FLOATING TEST</text>\n\n  <!-- Beaker with water -->\n  <rect x=\"330\" y=\"55\" width=\"135\" height=\"135\" rx=\"3\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <!-- Water line -->\n  <line x1=\"330\" y1=\"90\" x2=\"465\" y2=\"90\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <text x=\"397\" y=\"85\" font-family=\"sans-serif\" font-size=\"8\" text-anchor=\"middle\" font-style=\"italic\">Water surface</text>\n\n  <!-- Floating items (wood cork, dry leaf, plastic ball) -->\n  <circle cx=\"360\" cy=\"88\" r=\"8\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <text x=\"360\" y=\"91\" font-family=\"sans-serif\" font-size=\"7\" font-weight=\"bold\" text-anchor=\"middle\">Cork</text>\n  <path d=\"M 420 85 C 410 82, 430 80, 440 86 Z\" fill=\"#e0e0e0\" stroke=\"#000000\"/>\n  <text x=\"430\" y=\"78\" font-family=\"sans-serif\" font-size=\"7\" text-anchor=\"middle\">Leaf</text>\n  <text x=\"397\" y=\"110\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" text-anchor=\"middle\">FLOATING (Lighter than water)</text>\n\n  <!-- Sinking items (stone, iron key, glass marble) -->\n  <circle cx=\"360\" cy=\"175\" r=\"7\" fill=\"#000000\"/>\n  <text x=\"360\" y=\"165\" font-family=\"sans-serif\" font-size=\"7\" text-anchor=\"middle\">Stone</text>\n  <rect x=\"420\" y=\"172\" width=\"18\" height=\"8\" fill=\"#666666\" stroke=\"#000000\"/>\n  <text x=\"430\" y=\"165\" font-family=\"sans-serif\" font-size=\"7\" text-anchor=\"middle\">Iron key</text>\n  <text x=\"397\" y=\"200\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" text-anchor=\"middle\">SINKING (Heavier than water)</text>\n</svg>",
      "caption": "Figure 6.1: (Left) Classification of materials based on light transmission: Transparent (clear view), Translucent (hazy view), and Opaque (completely blocks light). (Right) Separation based on buoyancy: Objects less dense than water float, while denser objects sink to the bottom."
    },
    "diagramQuestions": [
      {
        "q": "Examine Fig 6.1 (Left). Why are shopkeeper biscuit containers usually made of transparent glass or clear plastic rather than opaque cardboard?",
        "ans": "Transparent materials allow light to pass straight through, enabling customers to clearly see the contents inside without opening the containers."
      },
      {
        "q": "In Fig 6.1 (Right), why does an iron nail sink to the bottom of the beaker while a dry wooden cork floats on the surface?",
        "ans": "The iron nail has a higher density than water, causing it to sink, whereas the wooden cork is less dense than water, allowing it to float."
      }
    ],
    "sectionA": [
      {
        "q": "Why do we classify and group objects into different categories? Explain four major physical properties used to group materials.",
        "ans": "Grouping objects (sorting) brings systematic order, saves time, helps locate items easily, and enables us to study common scientific patterns in material behavior. Four key properties are: (1) Appearance/Lustre: Metals (gold, copper, iron) have a shiny surface when freshly cut, while non-metals (wood, plastic) are dull. (2) Hardness: Materials that can be easily scratched or compressed are soft (sponge, chalk); those difficult to compress are hard (iron, diamond). (3) Solubility: Substances that dissolve completely in water are soluble (salt, sugar); those that remain undissolved are insoluble (sand, chalk powder). (4) Transparency: Transparent (glass), Translucent (butter paper), and Opaque (wood, cardboard)."
      },
      {
        "q": "What is meant by lustre? Why do iron railings and brass vessels appear dull after exposure to air for a few months?",
        "ans": "Lustre refers to the natural shine or metallic sparkle exhibited on the surface of materials. When metals like iron or brass are exposed to atmospheric air, moisture, and gases over time, chemical reactions take place (such as oxidation and corrosion) forming a thin tarnish layer on their surface, causing them to lose their shine and appear dull. Rubbing with sandpaper removes this tarnish, revealing their shiny metallic lustre again."
      }
    ],
    "sectionB": [
      {
        "q": "Give two examples each of liquids that are miscible and immiscible with water.",
        "ans": "Miscible with water (mix completely): Vinegar and Lemon juice. Immiscible with water (form separate distinct layers): Mustard oil and Kerosene."
      },
      {
        "q": "Why is a tumbler not made of cotton or cloth material?",
        "ans": "A tumbler is designed to hold liquids. Cloth is porous and has microscopic spaces between woven threads through which water would immediately leak out."
      },
      {
        "q": "Name a non-metal that possesses metallic lustre.",
        "ans": "Iodine crystals and graphite are non-metals that display a shiny, lustrous appearance."
      }
    ],
    "sectionC": [
      {
        "q": "Frosted glass and oiled paper are examples of translucent materials.",
        "ans": "True",
        "reason": "They allow light to pass through partially, producing a blurred or hazy view."
      },
      {
        "q": "Cooking oil mixes completely and dissolves uniformly in water.",
        "ans": "False",
        "reason": "Oil is immiscible in water; being less dense, it forms a separate floating layer on top."
      },
      {
        "q": "Diamonds are the hardest naturally occurring substance known on Earth.",
        "ans": "True",
        "reason": "Diamond possesses an exceptionally rigid crystal lattice, making it extremely hard."
      },
      {
        "q": "All gases are completely insoluble in water.",
        "ans": "False",
        "reason": "Gases like Oxygen and Carbon dioxide dissolve in water, which is vital for aquatic respiration and photosynthesis."
      },
      {
        "q": "Metals can be distinguished from non-metals by their characteristic metallic lustre when freshly cut.",
        "ans": "True",
        "reason": "Freshly cut surfaces of metals reflect light strongly, exhibiting distinct metallic lustre."
      }
    ],
    "sectionD": [
      {
        "q": "Materials through which objects can be seen clearly are called ________ materials.",
        "ans": "Transparent"
      },
      {
        "q": "Materials that cannot be scratched or compressed easily are termed ________ materials.",
        "ans": "Hard"
      },
      {
        "q": "Substances that completely disappear and dissolve in water are called ________ substances.",
        "ans": "Soluble"
      },
      {
        "q": "Liquids like oil that do not mix with water and form a separate layer are called ________ liquids.",
        "ans": "Immiscible"
      },
      {
        "q": "The property of a material to float or sink depends on its ________ relative to water.",
        "ans": "Density"
      }
    ],
    "sectionE": [
      {
        "left": "Clear Glass",
        "right": "Transparent material",
        "pair": "Clear Glass → Transparent material"
      },
      {
        "left": "Butter paper",
        "right": "Translucent material",
        "pair": "Butter paper → Translucent material"
      },
      {
        "left": "Wooden plank",
        "right": "Opaque material",
        "pair": "Wooden plank → Opaque material"
      },
      {
        "left": "Granulated Sugar",
        "right": "Soluble in water",
        "pair": "Granulated Sugar → Soluble in water"
      },
      {
        "left": "Dry Sawdust",
        "right": "Floats on water & insoluble",
        "pair": "Dry Sawdust → Floats on water & insoluble"
      }
    ],
    "goldenPoints": [
      "Objects are manufactured from one or more materials chosen for specific required properties.",
      "Sorting materials into groups simplifies classification, retrieval, and property comparison.",
      "Lustre is the characteristic shine of metals, often dulled by environmental oxidation.",
      "Transparent materials transmit light freely; translucent scatter light; opaque block light totally.",
      "Solubility measures the capacity of a solid, liquid, or gas to dissolve in a liquid solvent.",
      "Water is the 'universal solvent' because it dissolves a greater variety of substances than any other liquid.",
      "Aquatic plants and animals rely on dissolved oxygen and carbon dioxide for survival.",
      "Density determines buoyancy: substances less dense than water float; denser ones sink.",
      "Hardness is tested by scratch resistance; soft materials yield easily to harder ones.",
      "Grouping items in grocery stores and libraries is a practical application of classification science."
    ]
  },
  {
    "id": 7,
    "title": "Temperature and its Measurement",
    "unit": "Unit 3: Exploring Matter and Energy",
    "summary": "Concept of hot and cold, limitations of the sense of touch, definition of temperature, clinical thermometer (features, kink/constriction, range 35°C to 42°C), laboratory thermometer (range -10°C to 110°C), digital thermometers, and reading temperatures accurately.",
    "diagram": {
      "title": "Fig 7.1: Anatomy of Clinical Thermometer & Laboratory Thermometer",
      "svg": "<svg viewBox=\"0 0 520 230\" class=\"w-full h-auto max-w-[500px] mx-auto border border-black bg-white p-2\">\n  <!-- Top: Clinical Thermometer with Kink -->\n  <rect x=\"20\" y=\"15\" width=\"480\" height=\"95\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"260\" y=\"30\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">CLINICAL THERMOMETER (Range: 35°C to 42°C)</text>\n\n  <!-- Thermometer Glass Stem -->\n  <rect x=\"50\" y=\"45\" width=\"420\" height=\"24\" rx=\"12\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <!-- Bulb -->\n  <ellipse cx=\"65\" cy=\"57\" rx=\"14\" ry=\"10\" fill=\"#666666\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <text x=\"65\" y=\"80\" font-family=\"sans-serif\" font-size=\"7.5\" font-weight=\"bold\" text-anchor=\"middle\">Mercury Bulb</text>\n  \n  <!-- Capillary Tube with Kink -->\n  <line x1=\"79\" y1=\"57\" x2=\"105\" y2=\"57\" stroke=\"#000000\" stroke-width=\"2.5\"/>\n  <!-- Constriction (Kink) -->\n  <path d=\"M 105 57 L 110 52 L 114 62 L 118 57\" fill=\"none\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <line x1=\"118\" y1=\"57\" x2=\"350\" y2=\"57\" stroke=\"#000000\" stroke-width=\"2.5\"/>\n  <!-- Thread ending at 37°C -->\n  <line x1=\"350\" y1=\"57\" x2=\"450\" y2=\"57\" stroke=\"#000000\" stroke-width=\"1\" stroke-dasharray=\"1,1\"/>\n  <circle cx=\"350\" cy=\"57\" r=\"2\" fill=\"#000000\"/>\n\n  <!-- Arrow pointing to Kink -->\n  <line x1=\"112\" y1=\"85\" x2=\"112\" y2=\"65\" stroke=\"#000000\" stroke-width=\"1.2\"/>\n  <text x=\"112\" y=\"95\" font-family=\"sans-serif\" font-size=\"7.5\" font-weight=\"bold\" text-anchor=\"middle\">Constriction (Kink)</text>\n  <text x=\"112\" y=\"104\" font-family=\"sans-serif\" font-size=\"7\" text-anchor=\"middle\">Prevents backflow of mercury</text>\n\n  <!-- Calibration Marks 35, 36, 37 (Normal), 38, 39, 40, 41, 42 -->\n  <text x=\"170\" y=\"42\" font-family=\"sans-serif\" font-size=\"7\">35</text><line x1=\"175\" y1=\"45\" x2=\"175\" y2=\"51\" stroke=\"#000000\"/>\n  <text x=\"250\" y=\"42\" font-family=\"sans-serif\" font-size=\"7\">37 (Normal: 37°C)</text><line x1=\"280\" y1=\"45\" x2=\"280\" y2=\"52\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <text x=\"400\" y=\"42\" font-family=\"sans-serif\" font-size=\"7\">42°C</text><line x1=\"410\" y1=\"45\" x2=\"410\" y2=\"51\" stroke=\"#000000\"/>\n\n  <!-- Bottom: Laboratory Thermometer -->\n  <rect x=\"20\" y=\"120\" width=\"480\" height=\"95\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"260\" y=\"135\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">LABORATORY THERMOMETER (Range: −10°C to 110°C, No Kink)</text>\n\n  <!-- Lab Thermometer Body (Longer & Straight) -->\n  <rect x=\"50\" y=\"150\" width=\"420\" height=\"20\" rx=\"4\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <!-- Bulb -->\n  <ellipse cx=\"65\" cy=\"160\" rx=\"13\" ry=\"8\" fill=\"#444444\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <text x=\"65\" y=\"182\" font-family=\"sans-serif\" font-size=\"7.5\" font-weight=\"bold\" text-anchor=\"middle\">Bulb</text>\n\n  <!-- Straight Capillary (No Kink) -->\n  <line x1=\"78\" y1=\"160\" x2=\"310\" y2=\"160\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <line x1=\"310\" y1=\"160\" x2=\"455\" y2=\"160\" stroke=\"#000000\" stroke-width=\"0.8\" stroke-dasharray=\"1,1\"/>\n\n  <!-- Calibration Marks -10, 0, 50, 100, 110 -->\n  <text x=\"100\" y=\"147\" font-family=\"sans-serif\" font-size=\"7\">-10°C</text><line x1=\"110\" y1=\"150\" x2=\"110\" y2=\"156\" stroke=\"#000000\"/>\n  <text x=\"160\" y=\"147\" font-family=\"sans-serif\" font-size=\"7\">0°C (Ice)</text><line x1=\"175\" y1=\"150\" x2=\"175\" y2=\"156\" stroke=\"#000000\"/>\n  <text x=\"290\" y=\"147\" font-family=\"sans-serif\" font-size=\"7\">50°C</text><line x1=\"298\" y1=\"150\" x2=\"298\" y2=\"156\" stroke=\"#000000\"/>\n  <text x=\"400\" y=\"147\" font-family=\"sans-serif\" font-size=\"7\">100°C (Boiling)</text><line x1=\"420\" y1=\"150\" x2=\"420\" y2=\"156\" stroke=\"#000000\"/>\n\n  <text x=\"260\" y=\"195\" font-family=\"sans-serif\" font-size=\"8\" font-style=\"italic\" text-anchor=\"middle\">Must be read while kept immersed in liquid because it lacks a kink</text>\n  <text x=\"260\" y=\"206\" font-family=\"sans-serif\" font-size=\"8\" font-weight=\"bold\" text-anchor=\"middle\">Normal human body temperature = 37.0°C (98.6°F)</text>\n</svg>",
      "caption": "Figure 7.1: Scientific comparison: The clinical thermometer has a narrow range (35°C to 42°C) with a constriction (kink) that stops mercury from falling when removed from the mouth. The laboratory thermometer has a broader range (-10°C to 110°C) with no kink."
    },
    "diagramQuestions": [
      {
        "q": "Examine Fig 7.1. What is the crucial function of the constriction (kink) near the bulb of a clinical thermometer?",
        "ans": "The constriction (kink) prevents the expanded mercury column from dropping back into the bulb automatically when the thermometer is taken out of the patient's mouth, allowing accurate reading."
      },
      {
        "q": "Why can a laboratory thermometer not be used to measure human body temperature accurately?",
        "ans": "A laboratory thermometer lacks a constriction (kink). The moment it is removed from the mouth, the mercury thread drops immediately due to room temperature, giving a false reading."
      }
    ],
    "sectionA": [
      {
        "q": "Why is our human sense of touch unreliable for determining the exact temperature of an object? Define temperature and its standard SI unit.",
        "ans": "Our sense of touch is relative and subjective; it only senses whether an object is hotter or colder compared to our own skin temperature at that moment. For example, if a hand kept in ice water is dipped into room-temperature water, the water feels warm; but if a hand kept in hot water is dipped into the same water, it feels cold. Therefore, an objective measurement is required. Temperature is the measure of the degree of hotness or coldness of an object. Its standard SI unit is Kelvin (K), though Degree Celsius (°C) is commonly used."
      },
      {
        "q": "List four key differences between a clinical thermometer and a laboratory thermometer.",
        "ans": "(1) Range: Clinical thermometer has a narrow range from 35°C to 42°C; Laboratory thermometer has a wide range from -10°C to 110°C. (2) Kink: Clinical thermometer has a constriction (kink) near the bulb; Laboratory thermometer has no kink. (3) Reading: Clinical thermometer is read after removing it from the body; Laboratory thermometer must be read while immersed in the liquid. (4) Purpose: Clinical thermometer measures human body temperature; Laboratory thermometer measures chemical and physical laboratory processes."
      }
    ],
    "sectionB": [
      {
        "q": "What is the normal human body temperature in Celsius and Fahrenheit scales?",
        "ans": "The normal human body temperature is 37.0°C (equivalent to 98.6°F)."
      },
      {
        "q": "Why does a clinical thermometer have a limited range of only 35°C to 42°C?",
        "ans": "The human body temperature never drops below 35°C or rises above 42°C under living conditions."
      },
      {
        "q": "Why are digital thermometers rapidly replacing traditional mercury glass thermometers?",
        "ans": "Mercury is a highly toxic, poisonous liquid metal that is dangerous if a glass thermometer breaks; digital thermometers use safe electronic heat sensors without any toxic liquids."
      }
    ],
    "sectionC": [
      {
        "q": "The normal temperature of a healthy human body is 98.6°C.",
        "ans": "False",
        "reason": "It is 98.6°F or 37.0°C. 98.6°C would be near the boiling point of water."
      },
      {
        "q": "A laboratory thermometer must always be kept upright without tilting while reading temperature.",
        "ans": "True",
        "reason": "Keeping it vertical prevents the liquid meniscus from curving inaccurately."
      },
      {
        "q": "Water can be conveniently used instead of mercury in ordinary clinical thermometers.",
        "ans": "False",
        "reason": "Water sticks to glass, has high transparency, and freezes at 0°C, making it unsuitable."
      },
      {
        "q": "Before using a clinical thermometer, it should be given a few sharp jerks to bring mercury below 35°C.",
        "ans": "True",
        "reason": "Jerks force the mercury thread back past the constriction into the bulb."
      },
      {
        "q": "Temperature tells us the direction of heat flow between two bodies in contact.",
        "ans": "True",
        "reason": "Heat always flows spontaneously from a higher temperature body to a lower temperature body."
      }
    ],
    "sectionD": [
      {
        "q": "The reliable device used for measuring the temperature of an object is called a ________.",
        "ans": "Thermometer"
      },
      {
        "q": "The narrow bend in the capillary tube of a clinical thermometer is called a ________.",
        "ans": "Constriction (Kink)"
      },
      {
        "q": "The standard SI unit of temperature used in scientific physics is ________.",
        "ans": "Kelvin (K)"
      },
      {
        "q": "Liquid mercury in the bulb of a thermometer ________ uniformly when heated.",
        "ans": "Expands"
      },
      {
        "q": "Modern thermometers that display temperature in digital numbers without mercury are called ________ thermometers.",
        "ans": "Digital"
      }
    ],
    "sectionE": [
      {
        "left": "Normal body temperature",
        "right": "37°C / 98.6°F",
        "pair": "Normal body temperature → 37°C / 98.6°F"
      },
      {
        "left": "Clinical thermometer range",
        "right": "35°C to 42°C",
        "pair": "Clinical thermometer range → 35°C to 42°C"
      },
      {
        "left": "Laboratory thermometer range",
        "right": "-10°C to 110°C",
        "pair": "Laboratory thermometer range → -10°C to 110°C"
      },
      {
        "left": "Boiling point of pure water",
        "right": "100°C",
        "pair": "Boiling point of pure water → 100°C"
      },
      {
        "left": "Freezing point of pure water",
        "right": "0°C",
        "pair": "Freezing point of pure water → 0°C"
      }
    ],
    "goldenPoints": [
      "Temperature measures the thermal kinetic state of matter, not heat quantity.",
      "Our tactile sense of touch is subjective and cannot give dependable numerical temperatures.",
      "Mercury expands linearly with heat and does not adhere to the internal capillary wall.",
      "Clinical thermometer kink preserves the reading until the thermometer is manually jerked.",
      "Never wash a clinical thermometer with boiling hot water, as the bulb may burst.",
      "Laboratory thermometers must be read while the bulb remains immersed in the liquid.",
      "Digital thermometers employ electronic thermistors for safe, mercury-free diagnostics.",
      "Standard laboratory thermometer graduations represent increments of 1°C or 0.1°C.",
      "Heat energy transfers spontaneously from higher temperature objects to cooler ones.",
      "The Celsius scale sets 0°C at water freezing point and 100°C at normal boiling point."
    ]
  },
  {
    "id": 8,
    "title": "A Journey through States of Water",
    "unit": "Unit 3: Exploring Matter and Energy",
    "summary": "Three physical states of water (solid ice, liquid water, gaseous water vapour/steam), inter-conversion of states (melting, evaporation, boiling, condensation, freezing), the natural water cycle, transpiration from leaves, and rainfall patterns.",
    "diagram": {
      "title": "Fig 8.1: Interconversion of States of Water & Condensation Test",
      "svg": "<svg viewBox=\"0 0 520 250\" class=\"w-full h-auto max-w-[500px] mx-auto border border-black bg-white p-2\">\n  <defs>\n    <marker id=\"arrow2\" viewBox=\"0 0 10 10\" refX=\"5\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\">\n      <path d=\"M 0 0 L 10 5 L 0 10 z\" fill=\"#000000\"/>\n    </marker>\n  </defs>\n\n  <!-- Left: Triangle of Changes of State -->\n  <rect x=\"15\" y=\"15\" width=\"280\" height=\"220\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"155\" y=\"32\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">THREE STATES OF WATER & INTERCONVERSION</text>\n\n  <!-- Solid (Ice) -->\n  <rect x=\"30\" y=\"160\" width=\"75\" height=\"45\" rx=\"3\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <text x=\"67\" y=\"180\" font-family=\"sans-serif\" font-size=\"9.5\" font-weight=\"bold\" text-anchor=\"middle\">SOLID</text>\n  <text x=\"67\" y=\"194\" font-family=\"sans-serif\" font-size=\"8.5\" text-anchor=\"middle\">(Ice / Snow)</text>\n\n  <!-- Liquid (Water) -->\n  <rect x=\"200\" y=\"160\" width=\"75\" height=\"45\" rx=\"3\" fill=\"#f0f0f0\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <text x=\"237\" y=\"180\" font-family=\"sans-serif\" font-size=\"9.5\" font-weight=\"bold\" text-anchor=\"middle\">LIQUID</text>\n  <text x=\"237\" y=\"194\" font-family=\"sans-serif\" font-size=\"8.5\" text-anchor=\"middle\">(Water)</text>\n\n  <!-- Gas (Water Vapour) -->\n  <rect x=\"115\" y=\"55\" width=\"80\" height=\"45\" rx=\"3\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <text x=\"155\" y=\"75\" font-family=\"sans-serif\" font-size=\"9.5\" font-weight=\"bold\" text-anchor=\"middle\">GAS</text>\n  <text x=\"155\" y=\"89\" font-family=\"sans-serif\" font-size=\"8\" text-anchor=\"middle\">(Steam / Vapour)</text>\n\n  <!-- Arrows: Solid <-> Liquid -->\n  <!-- Melting (Solid -> Liquid on heating) -->\n  <line x1=\"105\" y1=\"172\" x2=\"195\" y2=\"172\" stroke=\"#000000\" stroke-width=\"1.8\" marker-end=\"url(#arrow2)\"/>\n  <text x=\"150\" y=\"168\" font-family=\"sans-serif\" font-size=\"7.5\" font-weight=\"bold\" text-anchor=\"middle\">MELTING (Heat)</text>\n  <!-- Freezing (Liquid -> Solid on cooling) -->\n  <line x1=\"195\" y1=\"192\" x2=\"105\" y2=\"192\" stroke=\"#000000\" stroke-width=\"1.8\" marker-end=\"url(#arrow2)\"/>\n  <text x=\"150\" y=\"204\" font-family=\"sans-serif\" font-size=\"7.5\" font-weight=\"bold\" text-anchor=\"middle\">FREEZING (Cool)</text>\n\n  <!-- Liquid -> Gas: Evaporation / Boiling -->\n  <line x1=\"240\" y1=\"160\" x2=\"185\" y2=\"103\" stroke=\"#000000\" stroke-width=\"1.8\" marker-end=\"url(#arrow2)\"/>\n  <text x=\"235\" y=\"125\" font-family=\"sans-serif\" font-size=\"7.5\" font-weight=\"bold\" text-anchor=\"start\">EVAPORATION</text>\n  <text x=\"235\" y=\"135\" font-family=\"sans-serif\" font-size=\"7\" text-anchor=\"start\">(Heating)</text>\n\n  <!-- Gas -> Liquid: Condensation -->\n  <line x1=\"130\" y1=\"103\" x2=\"80\" y2=\"160\" stroke=\"#000000\" stroke-width=\"1.8\" marker-end=\"url(#arrow2)\"/>\n  <text x=\"45\" y=\"125\" font-family=\"sans-serif\" font-size=\"7.5\" font-weight=\"bold\" text-anchor=\"start\">CONDENSATION</text>\n  <text x=\"55\" y=\"135\" font-family=\"sans-serif\" font-size=\"7\" text-anchor=\"start\">(Cooling)</text>\n\n  <!-- Right: Condensation Experiment (Cold glass with droplets) -->\n  <rect x=\"310\" y=\"15\" width=\"195\" height=\"220\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"407\" y=\"32\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">CONDENSATION DEMONSTRATION</text>\n\n  <!-- Tumbler with ice -->\n  <path d=\"M 360 70 L 370 180 L 445 180 L 455 70 Z\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <!-- Ice cubes inside -->\n  <rect x=\"380\" y=\"120\" width=\"22\" height=\"22\" fill=\"#e5e5e5\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <rect x=\"410\" y=\"125\" width=\"20\" height=\"20\" fill=\"#e5e5e5\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <rect x=\"395\" y=\"145\" width=\"24\" height=\"22\" fill=\"#e5e5e5\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"407\" y=\"110\" font-family=\"sans-serif\" font-size=\"7.5\" text-anchor=\"middle\">Ice + Cold Water</text>\n\n  <!-- Droplets on outer wall -->\n  <circle cx=\"363\" cy=\"110\" r=\"2.5\" fill=\"#000000\"/>\n  <circle cx=\"366\" cy=\"135\" r=\"3\" fill=\"#000000\"/>\n  <circle cx=\"368\" cy=\"155\" r=\"2.5\" fill=\"#000000\"/>\n  <circle cx=\"452\" cy=\"115\" r=\"2.5\" fill=\"#000000\"/>\n  <circle cx=\"450\" cy=\"140\" r=\"3\" fill=\"#000000\"/>\n  <circle cx=\"447\" cy=\"160\" r=\"2.5\" fill=\"#000000\"/>\n\n  <line x1=\"475\" y1=\"135\" x2=\"453\" y2=\"135\" stroke=\"#000000\" stroke-width=\"1.2\"/>\n  <text x=\"478\" y=\"132\" font-family=\"sans-serif\" font-size=\"7\" font-weight=\"bold\">Water droplets</text>\n  <text x=\"478\" y=\"142\" font-family=\"sans-serif\" font-size=\"6.5\">from air vapour</text>\n\n  <text x=\"407\" y=\"205\" font-family=\"sans-serif\" font-size=\"7.5\" font-weight=\"bold\" text-anchor=\"middle\">Water droplets appear on outer surface</text>\n  <text x=\"407\" y=\"217\" font-family=\"sans-serif\" font-size=\"7\" text-anchor=\"middle\">when warm airborne vapour hits cold glass</text>\n</svg>",
      "caption": "Figure 8.1: (Left) The phase change cycle of water driven by heating and cooling. (Right) Demonstration of condensation: Water droplets on the outer surface of an ice-cold tumbler originate from invisible water vapour present in surrounding atmospheric air."
    },
    "diagramQuestions": [
      {
        "q": "According to Fig 8.1 (Right), where do the water droplets appearing on the outer surface of a glass tumbler filled with ice come from?",
        "ans": "They come from the water vapour present in the surrounding air. When warm invisible airborne water vapour touches the freezing cold glass surface, it cools down and condenses into visible liquid droplets."
      },
      {
        "q": "Name the processes by which: (a) solid ice turns into water, and (b) liquid water turns into ice.",
        "ans": "(a) Melting (gaining heat), and (b) Freezing / Solidification (losing heat)."
      }
    ],
    "sectionA": [
      {
        "q": "Describe the natural Water Cycle with its four core scientific processes: Evaporation, Transpiration, Condensation, and Precipitation.",
        "ans": "The Water Cycle is the continuous circulation of water from Earth's surface into the atmosphere and back: (1) Evaporation: Heat from the Sun causes liquid water from oceans, rivers, and soil to convert into invisible water vapour and rise upward. (2) Transpiration: Living plants release excess water into the atmosphere as vapour through microscopic leaf pores (stomata). (3) Condensation: As warm water vapour ascends, it cools down and condenses around airborne dust particles to form clouds composed of tiny droplets. (4) Precipitation: When cloud droplets coalesce and become too heavy to remain suspended, they fall back to Earth as rain, snow, or hail, refilling water bodies."
      },
      {
        "q": "What is evaporation? State three physical factors that accelerate the rate of evaporation of water in daily life.",
        "ans": "Evaporation is the slow, continuous conversion of a liquid into its gaseous vapour state at any temperature below its boiling point. Three factors that increase evaporation are: (1) Surface Area: Larger exposed surface area allows more water molecules to escape (e.g., spreading out wet clothes dries them faster than keeping them folded). (2) Temperature: Higher heat energy provides molecules greater speed to escape. (3) Wind Speed: Fast-moving wind carries away evaporated vapour, allowing fresh evaporation."
      }
    ],
    "sectionB": [
      {
        "q": "What is transpiration? How can it be demonstrated experimentally?",
        "ans": "Transpiration is the biological release of water vapour from plant leaves. Tie a dry transparent polythene bag over a green leafy branch of a potted plant in sunlight; within hours, droplets of water condense inside the bag."
      },
      {
        "q": "Why do wet clothes dry faster on a hot, sunny, windy day than on a humid, cloudy day?",
        "ans": "High atmospheric temperature and high wind speed accelerate the rate of water evaporation from the fabric fibers."
      },
      {
        "q": "Define the terms: (a) Boiling point, and (b) Melting point.",
        "ans": "(a) Boiling point is the specific constant temperature at which a liquid boils into vapor rapidly (100°C for pure water). (b) Melting point is the temperature at which a solid changes into liquid (0°C for ice)."
      }
    ],
    "sectionC": [
      {
        "q": "Condensation is the process of converting liquid water into water vapour on heating.",
        "ans": "False",
        "reason": "Condensation is the conversion of water vapour back into liquid water on cooling."
      },
      {
        "q": "Evaporation of water occurs only at its boiling point of 100°C.",
        "ans": "False",
        "reason": "Evaporation occurs continuously at all temperatures below the boiling point."
      },
      {
        "q": "The total amount of water on Earth remains relatively constant through the water cycle.",
        "ans": "True",
        "reason": "Water constantly circulates between atmosphere, oceans, and continents without permanent loss."
      },
      {
        "q": "Droplets appearing on cold soda cans prove the existence of water vapour in atmospheric air.",
        "ans": "True",
        "reason": "Airborne water vapour condenses upon contacting the chilled container wall."
      },
      {
        "q": "Hail and snow are solid precipitation forms of water falling from clouds.",
        "ans": "True",
        "reason": "When upper atmospheric air is below 0°C, condensing cloud droplets freeze into snow crystals."
      }
    ],
    "sectionD": [
      {
        "q": "The process of conversion of water into water vapour is called ________.",
        "ans": "Evaporation"
      },
      {
        "q": "The process of conversion of water vapour into tiny liquid water droplets upon cooling is called ________.",
        "ans": "Condensation"
      },
      {
        "q": "Loss of water vapour through tiny stomatal pores of plant leaves is known as ________.",
        "ans": "Transpiration"
      },
      {
        "q": "The continuous cyclic movement of water between the Earth and atmosphere is the ________ cycle.",
        "ans": "Water"
      },
      {
        "q": "Water boils into steam at exactly ________ °C under standard atmospheric pressure.",
        "ans": "100"
      }
    ],
    "sectionE": [
      {
        "left": "Ice to water",
        "right": "Melting (Endothermic heat absorption)",
        "pair": "Ice to water → Melting (Endothermic heat absorption)"
      },
      {
        "left": "Water to steam",
        "right": "Evaporation / Boiling",
        "pair": "Water to steam → Evaporation / Boiling"
      },
      {
        "left": "Steam to water",
        "right": "Condensation (Cooling)",
        "pair": "Steam to water → Condensation (Cooling)"
      },
      {
        "left": "Water to ice",
        "right": "Freezing / Solidification",
        "pair": "Water to ice → Freezing / Solidification"
      },
      {
        "left": "Plant leaves",
        "right": "Transpiration of water vapour",
        "pair": "Plant leaves → Transpiration of water vapour"
      }
    ],
    "goldenPoints": [
      "Water exists naturally in three interchangeable physical states: ice, water, and steam.",
      "Temperature change drives phase transitions: heating causes melting/boiling; cooling causes freezing/condensation.",
      "Evaporation is a surface phenomenon occurring at all temperatures; boiling is a bulk phenomenon at 100°C.",
      "Transpiration from vast forest canopies contributes significantly to cloud formation and local rainfall.",
      "Air always contains variable quantities of invisible gaseous moisture known as humidity.",
      "Cloud formation occurs when rising warm air expands, cools, and reaches its dew point condensation.",
      "Precipitation replenishes groundwater tables, lakes, rivers, and continental reservoirs.",
      "Deforestation reduces transpiration, leading to localized rainfall deficits and desertification.",
      "Rainwater harvesting conserves runoff water to recharge depleted subterranean aquifers.",
      "Water conservation is a shared global responsibility because freshwater represents less than 3% of all Earth water."
    ]
  },
  {
    "id": 9,
    "title": "Methods of Separation in Everyday Life",
    "unit": "Unit 3: Exploring Matter and Energy",
    "summary": "Need for separating substances, separation methods for solid-solid mixtures (handpicking, winnowing, threshing, sieving), solid-liquid mixtures (sedimentation, decantation, filtration, evaporation, condensation), and saturation of solutions.",
    "diagram": {
      "title": "Fig 9.1: Scientific Filtration Apparatus & Decantation Setup",
      "svg": "<svg viewBox=\"0 0 520 250\" class=\"w-full h-auto max-w-[500px] mx-auto border border-black bg-white p-2\">\n  <!-- Left: Filtration Apparatus Setup -->\n  <rect x=\"15\" y=\"15\" width=\"280\" height=\"220\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"155\" y=\"32\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">FILTRATION APPARATUS SETUP</text>\n\n  <!-- Retort Stand -->\n  <line x1=\"40\" y1=\"45\" x2=\"40\" y2=\"215\" stroke=\"#000000\" stroke-width=\"3\"/>\n  <rect x=\"25\" y=\"210\" width=\"80\" height=\"8\" fill=\"#000000\"/>\n  <!-- Clamp & Ring -->\n  <rect x=\"38\" y=\"90\" width=\"40\" height=\"5\" fill=\"#000000\"/>\n\n  <!-- Glass Funnel -->\n  <polygon points=\"70,95 120,95 100,140 100,165 92,165 92,140\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1.8\"/>\n  <!-- Filter Paper Cone inside funnel -->\n  <polygon points=\"74,96 116,96 96,138\" fill=\"#e5e5e5\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <!-- Insoluble Residue on paper -->\n  <circle cx=\"95\" cy=\"115\" r=\"4\" fill=\"#000000\"/>\n  <circle cx=\"90\" cy=\"118\" r=\"3\" fill=\"#000000\"/>\n  <circle cx=\"100\" cy=\"118\" r=\"3\" fill=\"#000000\"/>\n\n  <!-- Pouring Beaker with Glass Rod -->\n  <path d=\"M 105 45 L 140 75 L 125 90 L 95 60 Z\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <line x1=\"85\" y1=\"95\" x2=\"135\" y2=\"45\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <text x=\"145\" y=\"55\" font-family=\"sans-serif\" font-size=\"7.5\" font-weight=\"bold\">Glass Rod</text>\n  <text x=\"145\" y=\"70\" font-family=\"sans-serif\" font-size=\"7\">Mixture of</text>\n  <text x=\"145\" y=\"80\" font-family=\"sans-serif\" font-size=\"7\">Sand + Water</text>\n\n  <!-- Receiving Beaker below funnel -->\n  <rect x=\"75\" y=\"160\" width=\"45\" height=\"50\" rx=\"2\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1.8\"/>\n  <!-- Clear Filtrate level -->\n  <line x1=\"76\" y1=\"185\" x2=\"119\" y2=\"185\" stroke=\"#000000\" stroke-width=\"1.2\"/>\n  <text x=\"97\" y=\"200\" font-family=\"sans-serif\" font-size=\"7.5\" text-anchor=\"middle\">Clear Liquid</text>\n\n  <!-- Labels with callouts -->\n  <line x1=\"116\" y1=\"110\" x2=\"160\" y2=\"110\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"165\" y=\"113\" font-family=\"sans-serif\" font-size=\"8\" font-weight=\"bold\">RESIDUE (Sand)</text>\n\n  <line x1=\"116\" y1=\"125\" x2=\"160\" y2=\"125\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"165\" y=\"128\" font-family=\"sans-serif\" font-size=\"8\">Filter Paper Cone</text>\n\n  <line x1=\"120\" y1=\"190\" x2=\"160\" y2=\"190\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"165\" y=\"193\" font-family=\"sans-serif\" font-size=\"8\" font-weight=\"bold\">FILTRATE (Water)</text>\n\n  <!-- Right: Sedimentation and Decantation -->\n  <rect x=\"310\" y=\"15\" width=\"195\" height=\"220\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"407\" y=\"32\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">DECANTATION PROCESS</text>\n\n  <!-- Tilting Beaker pouring clear water into second beaker -->\n  <!-- Top Beaker pouring -->\n  <path d=\"M 345 65 L 390 90 L 375 115 L 330 90 Z\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <!-- Settled Sediment at bottom corner of tilted beaker -->\n  <polygon points=\"345,95 365,108 355,115 335,102\" fill=\"#000000\"/>\n  <text x=\"320\" y=\"120\" font-family=\"sans-serif\" font-size=\"7.5\" font-weight=\"bold\">Sediment</text>\n\n  <!-- Stream of liquid flowing -->\n  <path d=\"M 390 90 Q 405 110, 410 135\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1.8\"/>\n\n  <!-- Receiving Beaker -->\n  <rect x=\"390\" y=\"135\" width=\"45\" height=\"60\" rx=\"2\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1.8\"/>\n  <line x1=\"391\" y1=\"165\" x2=\"434\" y2=\"165\" stroke=\"#000000\" stroke-width=\"1.2\"/>\n  <text x=\"412\" y=\"180\" font-family=\"sans-serif\" font-size=\"7.5\" text-anchor=\"middle\">Decanted</text>\n  <text x=\"412\" y=\"190\" font-family=\"sans-serif\" font-size=\"7.5\" text-anchor=\"middle\">Clean Liquid</text>\n\n  <text x=\"407\" y=\"210\" font-family=\"sans-serif\" font-size=\"7.5\" font-weight=\"bold\" text-anchor=\"middle\">Separating clear liquid after</text>\n  <text x=\"407\" y=\"222\" font-family=\"sans-serif\" font-size=\"7\" text-anchor=\"middle\">heavier solids settle at the bottom</text>\n</svg>",
      "caption": "Figure 9.1: (Left) Laboratory filtration apparatus: The solid trapped on filter paper is the Residue, while the clear liquid passing through is the Filtrate. (Right) Decantation: Carefully pouring off the upper clear liquid without disturbing the bottom sediment."
    },
    "diagramQuestions": [
      {
        "q": "Referring to Fig 9.1 (Left), distinguish clearly between 'Residue' and 'Filtrate' in a filtration setup.",
        "ans": "Residue is the insoluble solid particulate matter that remains trapped on the filter paper (e.g., sand or tea leaves). Filtrate is the clear liquid that passes through the microscopic pores of the filter paper into the receiving beaker."
      },
      {
        "q": "What is the difference between Sedimentation and Decantation as shown in Fig 9.1 (Right)?",
        "ans": "Sedimentation is the settling down of heavier insoluble solid particles at the bottom of a container. Decantation is the careful pouring out of the upper clear liquid without disturbing the settled sediment."
      }
    ],
    "sectionA": [
      {
        "q": "Why do we need to separate different components of a mixture? Explain with two distinct daily-life examples.",
        "ans": "We separate mixtures for three primary scientific reasons: (1) To remove undesirable or harmful impurities (e.g., handpicking small stones and dirt particles from rice grains before cooking to prevent dental injury and contamination). (2) To separate two useful components that are mixed together (e.g., churning curd/milk to obtain wholesome butter and nutritious buttermilk). (3) To obtain pure substances for scientific experiments and pharmaceutical formulations."
      },
      {
        "q": "Explain the working principle and procedure of the following separation methods: (a) Winnowing, and (b) Sieving.",
        "ans": "(a) Winnowing: Based on the difference in weight/mass of mixture components. The mixture of grain and light husk is dropped from a height in moving wind. The heavier grains fall almost vertically down to form a heap, while lighter dry husk is carried away by wind to form a separate heap. (b) Sieving: Based on the difference in particle sizes. When the mixture is shaken over a woven wire mesh (sieve), smaller fine particles (like wheat flour) pass through the mesh pores, while larger particles (like husk or stones) remain retained on the sieve."
      }
    ],
    "sectionB": [
      {
        "q": "How is common salt obtained from seawater on a commercial scale?",
        "ans": "Seawater is trapped in shallow earthen pits (salt pans) exposed to sunlight. Solar heat evaporates the water into the atmosphere, leaving behind a solid crust of common salt and other minerals, which is subsequently purified."
      },
      {
        "q": "What is a saturated solution? How can you dissolve more solute in a saturated solution?",
        "ans": "A solution in which no more solute can dissolve at a given temperature is called a saturated solution. More solute can be dissolved by heating the solution, which increases solvent solubility."
      },
      {
        "q": "How would you separate a mixture of sand, salt, and water?",
        "ans": "First, perform filtration to separate insoluble sand as residue. Then, heat the remaining salt-water filtrate in a distillation flask/evaporation basin; water evaporates and condenses, leaving pure solid salt behind."
      }
    ],
    "sectionC": [
      {
        "q": "A mixture of milk and water can be completely separated by filtration using filter paper.",
        "ans": "False",
        "reason": "Milk is a colloidal mixture; fat and protein particles pass through filter paper pores along with water."
      },
      {
        "q": "Winnowing effectively separates grains from chaff because of differences in their mass and density.",
        "ans": "True",
        "reason": "Wind carries lighter chaff farther away while heavier grains drop straight down."
      },
      {
        "q": "Straining tea leaves using a wire mesh strainer is an example of domestic filtration.",
        "ans": "True",
        "reason": "The wire mesh acts as a filter medium, retaining solid tea leaves and letting liquid tea pass."
      },
      {
        "q": "Heating a saturated salt solution decreases its capacity to dissolve more salt.",
        "ans": "False",
        "reason": "Heating increases the kinetic energy of water molecules, allowing more solute to dissolve."
      },
      {
        "q": "Threshing is the process used to separate grain seeds from harvested stalks by beating.",
        "ans": "True",
        "reason": "Beating stalks against a hard surface frees the dried grain seeds."
      }
    ],
    "sectionD": [
      {
        "q": "The method of separating seeds of paddy or wheat from their harvested stalks is called ________.",
        "ans": "Threshing"
      },
      {
        "q": "The clear liquid collected in the beaker beneath the funnel in filtration is called the ________.",
        "ans": "Filtrate"
      },
      {
        "q": "The process of converting a liquid into its vapour by continuous heating is termed ________.",
        "ans": "Evaporation"
      },
      {
        "q": "A solution that cannot dissolve any more solute at that specific temperature is a ________ solution.",
        "ans": "Saturated"
      },
      {
        "q": "Farmers use moving wind currents to separate light husk from heavy grains in the process of ________.",
        "ans": "Winnowing"
      }
    ],
    "sectionE": [
      {
        "left": "Handpicking",
        "right": "Separating stones from rice by size/color",
        "pair": "Handpicking → Separating stones from rice by size/color"
      },
      {
        "left": "Threshing",
        "right": "Beating stalks to free grain seeds",
        "pair": "Threshing → Beating stalks to free grain seeds"
      },
      {
        "left": "Winnowing",
        "right": "Wind separates light husk from grain",
        "pair": "Winnowing → Wind separates light husk from grain"
      },
      {
        "left": "Filtration",
        "right": "Separating sand from muddy water",
        "pair": "Filtration → Separating sand from muddy water"
      },
      {
        "left": "Evaporation",
        "right": "Recovering salt from seawater",
        "pair": "Evaporation → Recovering salt from seawater"
      }
    ],
    "goldenPoints": [
      "Mixture separation methods exploit differences in physical properties (size, mass, density, solubility).",
      "Handpicking suits small-quantity mixtures with visible differences in color, shape, or size.",
      "Threshing separates grain kernels from dry straw through mechanical impact or motorized threshers.",
      "Winnowing relies upon natural wind or artificial blowing fans to segregate low-density chaff.",
      "Sieving utilizes graduated mesh pores to classify powdered or granular mixtures into size fractions.",
      "Sedimentation settles heavy insoluble solids; decantation pours off supernatant liquid.",
      "Filtration yields superior clarity compared to decantation due to microscopic filter paper pores.",
      "Solute dissolves in solvent to form a homogeneous solution (e.g., salt in water).",
      "Solubility increases with temperature; cooling a hot saturated solution precipitates excess solute.",
      "Combining multiple separation steps (decantation + filtration + evaporation) solves complex mixtures."
    ]
  },
  {
    "id": 10,
    "title": "Living Creatures: Exploring their Characteristics",
    "unit": "Unit 2: The World of the Living",
    "summary": "Essential characteristics of living beings: cellular organization, nutrition, growth, respiration (lungs, gills, skin, stomata), response to stimuli (touch-me-not, phototropism), excretion, reproduction, and lifespan.",
    "diagram": {
      "title": "Fig 10.1: Respiratory Organs in Organisms & Plant Response to Stimulus",
      "svg": "<svg viewBox=\"0 0 520 240\" class=\"w-full h-auto max-w-[500px] mx-auto border border-black bg-white p-2\">\n  <!-- Left Side: Diversity in Respiration -->\n  <rect x=\"15\" y=\"15\" width=\"280\" height=\"210\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"155\" y=\"32\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">RESPIRATORY ORGANS IN DIVERSE ORGANISMS</text>\n\n  <!-- 1. Fish: Gills -->\n  <path d=\"M 30 75 C 50 60, 90 60, 110 75 C 90 90, 50 90, 30 75 Z\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <polygon points=\"110,75 125,65 125,85\" fill=\"#000000\"/>\n  <!-- Operculum/Gills slit -->\n  <path d=\"M 65 68 C 70 75, 70 80, 65 82\" fill=\"none\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <text x=\"135\" y=\"73\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\">FISH: GILLS</text>\n  <text x=\"135\" y=\"83\" font-family=\"sans-serif\" font-size=\"7.5\">Breathe dissolved oxygen in water</text>\n\n  <!-- 2. Earthworm: Moist Skin -->\n  <path d=\"M 30 120 Q 55 110, 80 120 T 130 120\" fill=\"none\" stroke=\"#000000\" stroke-width=\"3\"/>\n  <text x=\"135\" y=\"118\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\">EARTHWORM: MOIST SKIN</text>\n  <text x=\"135\" y=\"128\" font-family=\"sans-serif\" font-size=\"7.5\">Gaseous exchange via slimy epidermis</text>\n\n  <!-- 3. Green Plant: Stomata -->\n  <ellipse cx=\"60\" cy=\"175\" rx=\"20\" ry=\"12\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <ellipse cx=\"60\" cy=\"175\" rx=\"5\" ry=\"8\" fill=\"#000000\"/>\n  <!-- Guard cells -->\n  <path d=\"M 55 167 C 52 175, 52 175, 55 183\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <path d=\"M 65 167 C 68 175, 68 175, 65 183\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <text x=\"135\" y=\"168\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\">PLANT: STOMATA</text>\n  <text x=\"135\" y=\"178\" font-family=\"sans-serif\" font-size=\"7.5\">Microscopic pore with guard cells</text>\n\n  <!-- Right Side: Response to Stimuli (Mimosa Pudica / Touch-me-not) -->\n  <rect x=\"310\" y=\"15\" width=\"195\" height=\"210\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"407\" y=\"32\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">RESPONSE TO STIMULI</text>\n\n  <!-- Open leaves before touch -->\n  <line x1=\"335\" y1=\"95\" x2=\"385\" y2=\"70\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <ellipse cx=\"355\" cy=\"80\" rx=\"6\" ry=\"3\" fill=\"#ffffff\" stroke=\"#000000\" transform=\"rotate(-25, 355, 80)\"/>\n  <ellipse cx=\"370\" cy=\"72\" rx=\"6\" ry=\"3\" fill=\"#ffffff\" stroke=\"#000000\" transform=\"rotate(-25, 370, 72)\"/>\n  <text x=\"360\" y=\"105\" font-family=\"sans-serif\" font-size=\"7.5\" font-weight=\"bold\">Before Touch: Open Leaves</text>\n\n  <!-- Finger touching leaves -->\n  <path d=\"M 470 65 C 440 65, 420 70, 395 72\" fill=\"none\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <text x=\"460\" y=\"58\" font-family=\"sans-serif\" font-size=\"7.5\">Stimulus (Touch)</text>\n\n  <!-- Drooping / Closed leaves after touch -->\n  <line x1=\"340\" y1=\"160\" x2=\"390\" y2=\"175\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <line x1=\"355\" y1=\"165\" x2=\"355\" y2=\"178\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <line x1=\"370\" y1=\"170\" x2=\"370\" y2=\"183\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <text x=\"407\" y=\"198\" font-family=\"sans-serif\" font-size=\"8\" font-weight=\"bold\" text-anchor=\"middle\">Touch-me-not (Mimosa)</text>\n  <text x=\"407\" y=\"210\" font-family=\"sans-serif\" font-size=\"7\" text-anchor=\"middle\">Leaves droop immediately on contact</text>\n</svg>",
      "caption": "Figure 10.1: (Left) Diverse respiratory adaptations across kingdoms: Fish absorb dissolved oxygen via gills; earthworms breathe through moist skin; plants exchange gases through leaf stomata. (Right) Response to stimuli demonstrated by rapid leaf-folding in Mimosa pudica."
    },
    "diagramQuestions": [
      {
        "q": "Based on Fig 10.1, why does an earthworm suffocate and die if its outer skin becomes dry?",
        "ans": "Earthworms lack lungs and gills; atmospheric oxygen can only dissolve and diffuse into their blood capillaries through a moist, slimy skin layer."
      },
      {
        "q": "What biological phenomenon is illustrated by the leaf-folding of Mimosa pudica in Fig 10.1 (Right)?",
        "ans": "Response to stimuli (thigmonasty): Sudden touch acts as an external environmental stimulus, causing rapid loss of cell turgor and leaf drooping."
      }
    ],
    "sectionA": [
      {
        "q": "What are the common characteristics shared by all living organisms that set them apart from non-living matter?",
        "ans": "All living organisms share seven fundamental characteristics: (1) Nutrition: Require food for metabolic energy. (2) Respiration: Release cellular energy from food by taking in oxygen and giving out carbon dioxide. (3) Growth: Irreversible increase in size and complexity. (4) Response to Stimuli: Detect and react to changes in surrounding light, touch, temperature, or sound. (5) Excretion: Removal of toxic metabolic waste products. (6) Reproduction: Produce new offspring of their own kind to sustain the species. (7) Definite Lifespan: Pass through stages of birth, maturity, aging, and death."
      },
      {
        "q": "Explain the difference between breathing and respiration. How do green plants perform respiration?",
        "ans": "Breathing is a purely physical mechanical process of inhaling oxygen-rich air and exhaling carbon dioxide-rich air. Respiration is a biochemical cellular process occurring inside all living cells where glucose food is oxidized to release usable metabolic energy. Plants breathe continuously day and night; they take in oxygen through microscopic stomatal pores on leaves and lenticels on stems to breakdown food, releasing carbon dioxide."
      }
    ],
    "sectionB": [
      {
        "q": "What are stimuli? Give two examples of animal response to environmental stimuli.",
        "ans": "Changes in an organism's external or internal environment that evoke a specific biological reaction are stimuli. Examples: (1) Cockroaches immediately scurry to dark corners when kitchen lights are switched on. (2) Dogs salivate when smelling food."
      },
      {
        "q": "Why is excretion necessary for all living organisms?",
        "ans": "Chemical reactions inside living bodies generate toxic wastes (urea, excess salts, carbon dioxide). If allowed to accumulate, these poisons would damage cells and cause death."
      },
      {
        "q": "How does a seed show that it is a living entity even when stored dry in a jar?",
        "ans": "A dry seed stays in a dormant metabolic state (respirates at an undetectable rate); when provided moisture, warmth, and air, it breaks dormancy and germinates into a living seedling."
      }
    ],
    "sectionC": [
      {
        "q": "Plants respire only during the night and do not need oxygen during the daytime.",
        "ans": "False",
        "reason": "Plants respire continuously 24 hours a day; in daytime, photosynthesis produces oxygen faster than respiration consumes it."
      },
      {
        "q": "Excretion is the process by which living organisms produce offspring of their own kind.",
        "ans": "False",
        "reason": "Producing offspring is reproduction; excretion is the biological expulsion of toxic metabolic waste."
      },
      {
        "q": "Gills in a freshwater fish are richly supplied with blood capillaries to absorb dissolved oxygen.",
        "ans": "True",
        "reason": "Water flows over thin gill filaments where dissolved oxygen diffuses directly into blood vessels."
      },
      {
        "q": "Non-living things like clouds and crystals can grow irreversibly from the inside.",
        "ans": "False",
        "reason": "Non-living growth occurs by external surface accumulation (like sand dunes), not internal cellular division."
      },
      {
        "q": "Phototropism is the directional growth movement of plant stems towards light.",
        "ans": "True",
        "reason": "Plant shoots bend toward sunlight to maximize light absorption for photosynthesis."
      }
    ],
    "sectionD": [
      {
        "q": "The microscopic breathing pores present on the epidermal surface of plant leaves are called ________.",
        "ans": "Stomata"
      },
      {
        "q": "The biological process of releasing energy from digested food inside living cells is called ________.",
        "ans": "Respiration"
      },
      {
        "q": "Any change in our surroundings that causes us to respond or react is termed a ________.",
        "ans": "Stimulus"
      },
      {
        "q": "The removal of harmful toxic waste substances from the body of an organism is known as ________.",
        "ans": "Excretion"
      },
      {
        "q": "Earthworms perform gaseous respiratory exchange through their thin, moist ________.",
        "ans": "Skin (Epidermis)"
      }
    ],
    "sectionE": [
      {
        "left": "Fish respiration",
        "right": "Gills absorb dissolved oxygen",
        "pair": "Fish respiration → Gills absorb dissolved oxygen"
      },
      {
        "left": "Plant gas exchange",
        "right": "Microscopic stomatal pores",
        "pair": "Plant gas exchange → Microscopic stomatal pores"
      },
      {
        "left": "Mimosa pudica",
        "right": "Folds leaves upon tactile touch",
        "pair": "Mimosa pudica → Folds leaves upon tactile touch"
      },
      {
        "left": "Reproduction",
        "right": "Perpetuation of species",
        "pair": "Reproduction → Perpetuation of species"
      },
      {
        "left": "Kidneys",
        "right": "Excretion of liquid metabolic waste",
        "pair": "Kidneys → Excretion of liquid metabolic waste"
      }
    ],
    "goldenPoints": [
      "All living creatures exhibit cellular structure, metabolism, homeostasis, growth, and reproduction.",
      "Respiration is universal to all living cells, releasing chemical energy (ATP) from glucose.",
      "Breathing organs vary with habitat: lungs in mammals/birds, gills in fish, moist skin in amphibians/worms.",
      "Stomata open and close via guard cells to regulate both gas exchange and water transpiration.",
      "Living organisms sense environmental stimuli through receptors and respond for self-protection.",
      "Excretory mechanisms eliminate nitrogenous toxins before they poison delicate biological tissue.",
      "Reproduction occurs sexually (seeds, eggs, live birth) or asexually (cuttings, budding).",
      "A dormant seed maintains minimal respiration until optimal germination conditions trigger growth.",
      "Viruses occupy the boundary between living and non-living, reproducing only within host cells.",
      "Respect for all living creatures preserves the delicate biodiversity sustaining our biosphere."
    ]
  },
  {
    "id": 11,
    "title": "Nature’s Treasures",
    "unit": "Unit 4: The Earth and Beyond",
    "summary": "Invaluable natural treasures: fresh air (composition of atmospheric gases, oxygen candle experiment), water resources, fertile soil (layers, living organisms), sunlight, forests, fossil fuels, and renewable vs non-renewable conservation.",
    "diagram": {
      "title": "Fig 11.1: Composition of Air & Inverted Tumbler Candle Experiment",
      "svg": "<svg viewBox=\"0 0 520 240\" class=\"w-full h-auto max-w-[500px] mx-auto border border-black bg-white p-2\">\n  <!-- Left Side: Composition of Air Pie Chart -->\n  <rect x=\"15\" y=\"15\" width=\"240\" height=\"210\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"135\" y=\"32\" font-family=\"sans-serif\" font-size=\"10.5\" font-weight=\"bold\" text-anchor=\"middle\">COMPOSITION OF ATMOSPHERIC AIR</text>\n\n  <!-- Pie Chart -->\n  <circle cx=\"120\" cy=\"115\" r=\"70\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <!-- Nitrogen slice 78% -->\n  <path d=\"M 120 115 L 120 45 A 70 70 0 1 1 54 139 Z\" fill=\"#e5e5e5\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <!-- Oxygen slice 21% -->\n  <path d=\"M 120 115 L 54 139 A 70 70 0 0 1 113 45 Z\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <!-- Other gases 1% -->\n  <path d=\"M 120 115 L 113 45 A 70 70 0 0 1 120 45 Z\" fill=\"#000000\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n\n  <text x=\"145\" y=\"125\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\">NITROGEN</text>\n  <text x=\"145\" y=\"137\" font-family=\"sans-serif\" font-size=\"8.5\">(~78%)</text>\n\n  <text x=\"75\" y=\"90\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\">OXYGEN</text>\n  <text x=\"75\" y=\"102\" font-family=\"sans-serif\" font-size=\"8.5\">(~21%)</text>\n\n  <line x1=\"116\" y1=\"45\" x2=\"116\" y2=\"28\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"120\" y=\"200\" font-family=\"sans-serif\" font-size=\"8\" font-weight=\"bold\" text-anchor=\"middle\">CO₂, Argon & Water Vapour (~1%)</text>\n\n  <!-- Right Side: Burning Candle Experiment (Oxygen supports combustion) -->\n  <rect x=\"270\" y=\"15\" width=\"235\" height=\"210\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"387\" y=\"32\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">OXYGEN SUPPORTS COMBUSTION</text>\n\n  <!-- Trough with water -->\n  <rect x=\"290\" y=\"155\" width=\"195\" height=\"25\" fill=\"#f0f0f0\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <!-- Candle -->\n  <rect x=\"380\" y=\"120\" width=\"14\" height=\"45\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <!-- Wick & Extinguished smoke -->\n  <line x1=\"387\" y1=\"120\" x2=\"387\" y2=\"112\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <path d=\"M 387 112 Q 392 105, 385 100 T 390 92\" fill=\"none\" stroke=\"#000000\" stroke-dasharray=\"2,2\"/>\n\n  <!-- Inverted Glass Tumbler -->\n  <rect x=\"360\" y=\"70\" width=\"55\" height=\"95\" rx=\"3\" fill=\"none\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <!-- Water level inside glass rose up by 1/5th (20%) -->\n  <rect x=\"360\" y=\"145\" width=\"55\" height=\"20\" fill=\"#cccccc\" stroke=\"#000000\" stroke-width=\"1\"/>\n\n  <!-- Annotations -->\n  <line x1=\"420\" y1=\"95\" x2=\"445\" y2=\"95\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"450\" y=\"98\" font-family=\"sans-serif\" font-size=\"7.5\">Inverted glass</text>\n\n  <line x1=\"387\" y1=\"110\" x2=\"435\" y2=\"115\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"440\" y=\"118\" font-family=\"sans-serif\" font-size=\"7.5\">Flame goes out</text>\n\n  <line x1=\"415\" y1=\"155\" x2=\"445\" y2=\"155\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"450\" y=\"152\" font-family=\"sans-serif\" font-size=\"7.5\" font-weight=\"bold\">Water rises 1/5th</text>\n  <text x=\"450\" y=\"162\" font-family=\"sans-serif\" font-size=\"7\">(Oxygen consumed)</text>\n\n  <text x=\"387\" y=\"200\" font-family=\"sans-serif\" font-size=\"7.5\" font-weight=\"bold\" text-anchor=\"middle\">Air is 1/5th Oxygen (combustion component)</text>\n  <text x=\"387\" y=\"212\" font-family=\"sans-serif\" font-size=\"7\" text-anchor=\"middle\">Remaining 4/5th is Nitrogen (does not burn)</text>\n</svg>",
      "caption": "Figure 11.1: (Left) Relative percentage proportions of atmospheric gases. (Right) Burning candle under inverted glass: The flame extinguishes when oxygen is exhausted, and water rises by approximately 1/5th of the tumbler volume to replace the consumed oxygen."
    },
    "diagramQuestions": [
      {
        "q": "Based on Fig 11.1 (Right), why does the candle flame extinguish after being covered with an inverted glass tumbler?",
        "ans": "The candle flame consumes the limited amount of oxygen gas trapped inside the tumbler. Once oxygen is exhausted, combustion cannot continue and the flame extinguishes."
      },
      {
        "q": "Why does the water level rise inside the inverted tumbler by approximately one-fifth (21%) of the tumbler's volume?",
        "ans": "Because oxygen makes up roughly 21% (one-fifth) of atmospheric air. When this volume of oxygen is consumed during burning, water rises from the trough to occupy the vacant space."
      }
    ],
    "sectionA": [
      {
        "q": "What are natural resources? Differentiate between renewable and non-renewable natural resources with two examples each.",
        "ans": "Natural resources are valuable treasures and materials provided by nature that are essential for human survival and welfare. They are classified into: (1) Renewable Resources: Resources that replenish naturally at a rate faster than or equal to their consumption and never get exhausted if used responsibly (e.g., Solar energy, Wind energy, Fresh water, Forests). (2) Non-Renewable Resources: Resources that exist in limited, finite quantities and take millions of years of geological time to form; once exhausted, they cannot be readily replaced (e.g., Coal, Petroleum/crude oil, Natural gas, Metallic mineral ores)."
      },
      {
        "q": "Describe the composition of atmospheric air. State two biological reasons why Nitrogen gas is indispensable for living beings.",
        "ans": "Atmospheric air is a homogeneous mixture of gases: Nitrogen (~78%), Oxygen (~21%), Carbon dioxide (~0.04%), Argon (~0.9%), variable water vapour, and trace noble gases. Nitrogen is indispensable because: (1) It dilutes oxygen, moderating burning and preventing widespread uncontrolled forest fires on Earth. (2) Nitrogen is a fundamental chemical building block of amino acids, proteins, and genetic DNA in all plants, animals, and humans (fixed by soil rhizobia bacteria)."
      }
    ],
    "sectionB": [
      {
        "q": "How do green plants and animals maintain the balance of oxygen and carbon dioxide in nature?",
        "ans": "During daylight, green plants carry out photosynthesis, absorbing carbon dioxide and releasing abundant oxygen. Animals and plants inhale this oxygen for respiration and exhale carbon dioxide, forming a harmonious perpetual biological cycle."
      },
      {
        "q": "Why is fertile topsoil considered one of nature's greatest treasures?",
        "ans": "Topsoil is rich in organic humus, beneficial microbial flora, and essential minerals that nourish agricultural crops, producing all our food, timber, and cotton."
      },
      {
        "q": "What is air pollution, and what are its primary causes in urban areas?",
        "ans": "Air pollution is the contamination of air by toxic chemicals, particulate soot, and smoke, primarily caused by automobile exhaust fumes, coal thermal power plants, and industrial factory emissions."
      }
    ],
    "sectionC": [
      {
        "q": "Nitrogen gas supports burning and fire vigorously just like oxygen.",
        "ans": "False",
        "reason": "Nitrogen does not support combustion; oxygen is the gas required for burning."
      },
      {
        "q": "Solar energy and wind energy are inexhaustible renewable energy sources.",
        "ans": "True",
        "reason": "They are naturally replenished by solar radiation and planetary atmospheric currents continuously."
      },
      {
        "q": "Earthworms improve soil aeration and fertility, acting as farmers' friends.",
        "ans": "True",
        "reason": "Earthworms burrow through soil, creating air passages and producing nutrient-rich organic vermicompost."
      },
      {
        "q": "Petroleum reserves inside the Earth are unlimited and can never be depleted.",
        "ans": "False",
        "reason": "Petroleum is a finite fossil fuel formed over millions of years and will be exhausted if over-extracted."
      },
      {
        "q": "Carbon dioxide gas is utilized by green plants to synthesize carbohydrates during photosynthesis.",
        "ans": "True",
        "reason": "Plants combine carbon dioxide and water in the presence of chlorophyll and sunlight to produce glucose."
      }
    ],
    "sectionD": [
      {
        "q": "The gas that constitutes approximately 78% of the Earth's atmosphere is ________.",
        "ans": "Nitrogen"
      },
      {
        "q": "The life-supporting gas required by animals for respiration and fire combustion is ________.",
        "ans": "Oxygen"
      },
      {
        "q": "Natural treasures like coal and crude petroleum that take millions of years to form are called ________ fuels.",
        "ans": "Fossil"
      },
      {
        "q": "The dark, nutrient-rich organic component of soil formed by decomposed leaves and organisms is ________.",
        "ans": "Humus"
      },
      {
        "q": "The process of planting extensive forests on barren land to conserve soil and air is called ________.",
        "ans": "Afforestation"
      }
    ],
    "sectionE": [
      {
        "left": "Nitrogen (~78%)",
        "right": "Moderates combustion & builds proteins",
        "pair": "Nitrogen (~78%) → Moderates combustion & builds proteins"
      },
      {
        "left": "Oxygen (~21%)",
        "right": "Supports respiration and fire",
        "pair": "Oxygen (~21%) → Supports respiration and fire"
      },
      {
        "left": "Carbon dioxide (0.04%)",
        "right": "Raw material for plant photosynthesis",
        "pair": "Carbon dioxide (0.04%) → Raw material for plant photosynthesis"
      },
      {
        "left": "Solar energy",
        "right": "Clean, inexhaustible renewable resource",
        "pair": "Solar energy → Clean, inexhaustible renewable resource"
      },
      {
        "left": "Coal & Petroleum",
        "right": "Non-renewable exhaustible fossil fuels",
        "pair": "Coal & Petroleum → Non-renewable exhaustible fossil fuels"
      }
    ],
    "goldenPoints": [
      "Air, water, soil, sunlight, and forests are fundamental treasures sustaining terrestrial life.",
      "Air is a mixture of approximately 78% Nitrogen, 21% Oxygen, and 1% other gases and vapour.",
      "Combustion strictly consumes oxygen; water rises 1/5th volume in an enclosed burning test.",
      "Plants synthesize atmospheric carbon dioxide into food while regenerating life-giving oxygen.",
      "Humus-rich topsoil requires hundreds of years of rock weathering to generate a few centimeters.",
      "Groundwater tables are depleting rapidly due to excessive tube-well pumping and concrete paving.",
      "Fossil fuels (coal, petroleum) emit greenhouse gases and sulfur dioxide, driving global warming.",
      "Renewable energy (solar panels, wind turbines) provides clean alternatives to carbon fuels.",
      "Conservation entails prudent, non-wasteful usage ensuring intergenerational sustainability.",
      "Every citizen must reduce single-use consumption, plant native trees, and protect local water bodies."
    ]
  },
  {
    "id": 12,
    "title": "Beyond Earth",
    "unit": "Unit 4: The Earth and Beyond",
    "summary": "Exploring the cosmos: the Sun as our star, the eight planets of the Solar System in order, planetary satellites (the Moon), constellations (Ursa Major/Saptarishi, Orion), locating the Pole Star (Dhruva Tara), asteroids, and the vast Milky Way galaxy.",
    "diagram": {
      "title": "Fig 12.1: The Solar System & Ursa Major (Saptarishi) Locating Pole Star",
      "svg": "<svg viewBox=\"0 0 520 250\" class=\"w-full h-auto max-w-[500px] mx-auto border border-black bg-white p-2\">\n  <!-- Left Side: The Solar System (Sun + 8 Planets) -->\n  <rect x=\"15\" y=\"15\" width=\"280\" height=\"220\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"155\" y=\"32\" font-family=\"sans-serif\" font-size=\"10.5\" font-weight=\"bold\" text-anchor=\"middle\">THE SOLAR SYSTEM (8 PLANETS)</text>\n\n  <!-- The Sun (Partial Arc on Left) -->\n  <path d=\"M 20 45 A 80 80 0 0 1 20 215 Z\" fill=\"#000000\" stroke=\"#000000\"/>\n  <text x=\"35\" y=\"135\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" fill=\"#ffffff\" transform=\"rotate(-90, 35, 135)\">THE SUN</text>\n\n  <!-- Orbital Ellipse Guides -->\n  <path d=\"M 20 60 A 60 40 0 0 1 20 200\" fill=\"none\" stroke=\"#000000\" stroke-width=\"0.8\" stroke-dasharray=\"2,2\"/>\n  <path d=\"M 20 50 A 85 55 0 0 1 20 210\" fill=\"none\" stroke=\"#000000\" stroke-width=\"0.8\" stroke-dasharray=\"2,2\"/>\n  <path d=\"M 20 40 A 110 70 0 0 1 20 220\" fill=\"none\" stroke=\"#000000\" stroke-width=\"0.8\" stroke-dasharray=\"2,2\"/>\n\n  <!-- Planets in order -->\n  <!-- 1. Mercury -->\n  <circle cx=\"65\" cy=\"120\" r=\"3.5\" fill=\"#000000\"/>\n  <text x=\"65\" y=\"140\" font-family=\"sans-serif\" font-size=\"6.5\" font-weight=\"bold\" text-anchor=\"middle\">Mercury</text>\n\n  <!-- 2. Venus -->\n  <circle cx=\"85\" cy=\"115\" r=\"5\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1.2\"/>\n  <text x=\"85\" y=\"100\" font-family=\"sans-serif\" font-size=\"6.5\" font-weight=\"bold\" text-anchor=\"middle\">Venus</text>\n\n  <!-- 3. Earth -->\n  <circle cx=\"110\" cy=\"125\" r=\"5.5\" fill=\"#666666\" stroke=\"#000000\" stroke-width=\"1.2\"/>\n  <text x=\"110\" y=\"145\" font-family=\"sans-serif\" font-size=\"7\" font-weight=\"bold\" text-anchor=\"middle\">Earth</text>\n\n  <!-- 4. Mars -->\n  <circle cx=\"135\" cy=\"110\" r=\"4.2\" fill=\"#000000\"/>\n  <text x=\"135\" y=\"98\" font-family=\"sans-serif\" font-size=\"6.5\" font-weight=\"bold\" text-anchor=\"middle\">Mars</text>\n\n  <!-- Asteroid Belt -->\n  <text x=\"155\" y=\"125\" font-family=\"sans-serif\" font-size=\"8\" text-anchor=\"middle\">⋮⋮⋮</text>\n\n  <!-- 5. Jupiter (Largest) -->\n  <circle cx=\"180\" cy=\"125\" r=\"11\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"2\"/>\n  <text x=\"180\" y=\"150\" font-family=\"sans-serif\" font-size=\"7\" font-weight=\"bold\" text-anchor=\"middle\">Jupiter</text>\n\n  <!-- 6. Saturn (with rings) -->\n  <ellipse cx=\"218\" cy=\"115\" rx=\"8\" ry=\"8\" fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1.5\"/>\n  <ellipse cx=\"218\" cy=\"115\" rx=\"15\" ry=\"3.5\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1.2\" transform=\"rotate(-15, 218, 115)\"/>\n  <text x=\"218\" y=\"137\" font-family=\"sans-serif\" font-size=\"7\" font-weight=\"bold\" text-anchor=\"middle\">Saturn</text>\n\n  <!-- 7. Uranus -->\n  <circle cx=\"250\" cy=\"115\" r=\"6.5\" fill=\"#e5e5e5\" stroke=\"#000000\" stroke-width=\"1.2\"/>\n  <text x=\"250\" y=\"135\" font-family=\"sans-serif\" font-size=\"6.5\" text-anchor=\"middle\">Uranus</text>\n\n  <!-- 8. Neptune -->\n  <circle cx=\"275\" cy=\"115\" r=\"6\" fill=\"#000000\"/>\n  <text x=\"275\" y=\"135\" font-family=\"sans-serif\" font-size=\"6.5\" text-anchor=\"middle\">Neptune</text>\n\n  <text x=\"155\" y=\"215\" font-family=\"sans-serif\" font-size=\"8\" text-anchor=\"middle\" font-style=\"italic\">Order: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune</text>\n\n  <!-- Right Side: Ursa Major (Saptarishi) & Pole Star -->\n  <rect x=\"310\" y=\"15\" width=\"195\" height=\"220\" fill=\"none\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <text x=\"407\" y=\"32\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">URSA MAJOR (SAPTARISHI)</text>\n\n  <!-- 7 Stars of Saptarishi / Big Dipper -->\n  <!-- Handle (3 stars) -->\n  <circle cx=\"330\" cy=\"80\" r=\"3.5\" fill=\"#000000\"/><text x=\"325\" y=\"75\" font-family=\"sans-serif\" font-size=\"6.5\">1</text>\n  <circle cx=\"345\" cy=\"95\" r=\"3.5\" fill=\"#000000\"/><text x=\"340\" y=\"90\" font-family=\"sans-serif\" font-size=\"6.5\">2</text>\n  <circle cx=\"365\" cy=\"105\" r=\"3.5\" fill=\"#000000\"/><text x=\"360\" y=\"100\" font-family=\"sans-serif\" font-size=\"6.5\">3</text>\n\n  <!-- Bowl / Quadrangle (4 stars) -->\n  <circle cx=\"390\" cy=\"110\" r=\"3.5\" fill=\"#000000\"/><text x=\"388\" y=\"102\" font-family=\"sans-serif\" font-size=\"6.5\">4</text>\n  <circle cx=\"390\" cy=\"140\" r=\"3.5\" fill=\"#000000\"/><text x=\"385\" y=\"150\" font-family=\"sans-serif\" font-size=\"6.5\">5</text>\n  <circle cx=\"425\" cy=\"145\" r=\"4\" fill=\"#000000\"/><text x=\"425\" y=\"157\" font-family=\"sans-serif\" font-size=\"6.5\">6</text>\n  <circle cx=\"425\" cy=\"115\" r=\"4\" fill=\"#000000\"/><text x=\"425\" y=\"107\" font-family=\"sans-serif\" font-size=\"6.5\">7</text>\n\n  <!-- Connecting constellation lines -->\n  <line x1=\"330\" y1=\"80\" x2=\"345\" y2=\"95\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <line x1=\"345\" y1=\"95\" x2=\"365\" y2=\"105\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <line x1=\"365\" y1=\"105\" x2=\"390\" y2=\"110\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <line x1=\"390\" y1=\"110\" x2=\"390\" y2=\"140\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <line x1=\"390\" y1=\"140\" x2=\"425\" y2=\"145\" stroke=\"#000000\" stroke-width=\"1\"/>\n  <line x1=\"425\" y1=\"145\" x2=\"425\" y2=\"115\" stroke=\"#000000\" stroke-width=\"1.8\"/>\n  <line x1=\"425\" y1=\"115\" x2=\"390\" y2=\"110\" stroke=\"#000000\" stroke-width=\"1\"/>\n\n  <!-- Pointer Stars (6 & 7) extending directly to POLE STAR -->\n  <line x1=\"425\" y1=\"145\" x2=\"425\" y2=\"45\" stroke=\"#000000\" stroke-width=\"1.5\" stroke-dasharray=\"3,3\"/>\n  <!-- Pole Star (Dhruva Tara) -->\n  <polygon points=\"425,35 428,45 438,45 430,51 433,60 425,55 417,60 420,51 412,45 422,45\" fill=\"#000000\"/>\n  <text x=\"450\" y=\"48\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\">POLE STAR</text>\n  <text x=\"450\" y=\"58\" font-family=\"sans-serif\" font-size=\"7\">(Dhruva Tara - North)</text>\n\n  <text x=\"407\" y=\"195\" font-family=\"sans-serif\" font-size=\"7.5\" font-weight=\"bold\" text-anchor=\"middle\">Pointer stars 6 & 7 point directly to North</text>\n  <text x=\"407\" y=\"208\" font-family=\"sans-serif\" font-size=\"7\" text-anchor=\"middle\">Ancient mariners used it to find directions</text>\n</svg>",
      "caption": "Figure 12.1: (Left) The eight planets in order of distance from the Sun. (Right) Ursa Major (Saptarishi constellation): A line drawn through the two pointer stars (Khadga/Pointers) leads directly to the fixed Pole Star (Dhruva Tara) in the North."
    },
    "diagramQuestions": [
      {
        "q": "According to Fig 12.1 (Left), name the third planet from the Sun and the largest planet in our Solar System.",
        "ans": "The third planet from the Sun is Earth (our home planet). The largest planet in the Solar System is Jupiter."
      },
      {
        "q": "Explain how ancient travellers used the Ursa Major (Saptarishi) constellation shown in Fig 12.1 (Right) to locate true North at night.",
        "ans": "They identified the two outer stars at the edge of the Saptarishi cup (pointer stars). An imaginary straight line drawn through these two stars extended toward the northern sky points directly to the bright, stationary Pole Star (Dhruva Tara), indicating true geographic North."
      }
    ],
    "sectionA": [
      {
        "q": "What is the Solar System? Enumerate all eight planets in the correct sequence of their increasing distance from the Sun.",
        "ans": "The Solar System consists of the Sun (a medium star) at its gravitational center, along with eight planets, their natural moons/satellites, dwarf planets, millions of rocky asteroids, comets, and meteors orbiting it. In order of increasing distance from the Sun, the eight planets are: (1) Mercury, (2) Venus, (3) Earth, (4) Mars, (5) Jupiter, (6) Saturn, (7) Uranus, and (8) Neptune."
      },
      {
        "q": "What are constellations? Describe Ursa Major (Saptarishi) and Orion the Hunter with their key identifying features.",
        "ans": "Constellations are identifiable groups of stars that appear to form recognizable patterns or figures in the night sky. (1) Ursa Major (Great Bear / Saptarishi): A prominent northern constellation containing seven bright stars arranged in the shape of a large ladle/dipper (three in the curved handle and four forming the bowl); its two front pointer stars always point to the Pole Star. (2) Orion (The Hunter): A striking winter constellation easily recognized by three bright aligned stars forming the hunter's belt, surrounded by four bright stars forming a large quadrangle."
      }
    ],
    "sectionB": [
      {
        "q": "Why do stars appear to twinkle in the night sky, whereas planets shine with a steady light?",
        "ans": "Stars are point-sized light sources trillions of kilometers away; their light refracts continuously through shifting turbulent layers of Earth's atmosphere, causing fluctuating intensity (twinkling). Planets are much closer and appear as extended discs, averaging out atmospheric fluctuations into steady light."
      },
      {
        "q": "What is a light year?",
        "ans": "A light year is the astronomical unit of distance that light travels through vacuum in one Julian year (approx. 9.46 trillion kilometres). It is used to measure interstellar distances between stars and galaxies."
      },
      {
        "q": "Why is the Pole Star (Dhruva Tara) unique compared to all other stars in the sky?",
        "ans": "The Pole Star lies directly aligned with the rotational axis of the Earth; hence, as the Earth spins on its axis, all other stars appear to rotate from East to West, while the Pole Star appears stationary in the North."
      }
    ],
    "sectionC": [
      {
        "q": "The Sun is classified by astrophysicists as a star.",
        "ans": "True",
        "reason": "The Sun is a self-luminous glowing sphere of hot plasma powered by nuclear fusion."
      },
      {
        "q": "Pluto is currently classified as the ninth planet of our Solar System.",
        "ans": "False",
        "reason": "In 2006, the International Astronomical Union (IAU) reclassified Pluto as a 'dwarf planet'."
      },
      {
        "q": "Venus is the closest planet to the Sun.",
        "ans": "False",
        "reason": "Mercury is the closest planet to the Sun; Venus is the second planet."
      },
      {
        "q": "The Moon shines brightly because it produces its own nuclear light like the Sun.",
        "ans": "False",
        "reason": "The Moon has no light of its own; it reflects sunlight falling on its rocky surface."
      },
      {
        "q": "Ursa Major is also popularly known as Saptarishi in Indian astronomy.",
        "ans": "True",
        "reason": "Saptarishi represents the seven mythical sages formed by the seven prominent stars of the Big Dipper."
      }
    ],
    "sectionD": [
      {
        "q": "The natural celestial body that continuously orbits around a planet is called a ________.",
        "ans": "Satellite (Moon)"
      },
      {
        "q": "A cluster of stars that forms an identifiable pattern in the night sky is called a ________.",
        "ans": "Constellation"
      },
      {
        "q": "The stationary star that always indicates the true North direction is the ________ Star.",
        "ans": "Pole (Dhruva Tara)"
      },
      {
        "q": "The largest planet in our Solar System is ________.",
        "ans": "Jupiter"
      },
      {
        "q": "The vast spiral galaxy of billions of stars that contains our Solar System is the ________.",
        "ans": "Milky Way (Akash Ganga)"
      }
    ],
    "sectionE": [
      {
        "left": "Mercury",
        "right": "Smallest & nearest planet to Sun",
        "pair": "Mercury → Smallest & nearest planet to Sun"
      },
      {
        "left": "Venus",
        "right": "Hottest planet & Morning/Evening star",
        "pair": "Venus → Hottest planet & Morning/Evening star"
      },
      {
        "left": "Jupiter",
        "right": "Largest planet in the Solar System",
        "pair": "Jupiter → Largest planet in the Solar System"
      },
      {
        "left": "Saturn",
        "right": "Magnificent visible ring system",
        "pair": "Saturn → Magnificent visible ring system"
      },
      {
        "left": "Pole Star (Dhruva Tara)",
        "right": "Stationary star in northern sky",
        "pair": "Pole Star → Stationary star in northern sky"
      }
    ],
    "goldenPoints": [
      "The universe comprises billions of galaxies; our Solar System resides within the Milky Way.",
      "The Sun accounts for over 99.8% of the entire mass of the Solar System.",
      "The eight planets in sequence are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.",
      "Mercury, Venus, Earth, and Mars are dense rocky terrestrial planets.",
      "Jupiter, Saturn, Uranus, and Neptune are outer gaseous and icy giant planets.",
      "Asteroids orbit predominantly in a broad belt between Mars and Jupiter.",
      "The Moon is Earth's sole natural satellite, orbiting at an average distance of 384,400 km.",
      "Constellations provided ancient navigators with natural celestial compasses and seasonal calendars.",
      "The Pole Star sits stationary above Earth's North pole, acting as a permanent navigational beacon.",
      "Space exploration expands our understanding of life's origin, climate, and human technological frontier."
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SCIENCE_CHAPTERS_DATA };
}
