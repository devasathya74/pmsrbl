/**
 * NCERT Class 5 Social Science & EVS - Our Wondrous World
 * Complete 10-Chapter Question & Answer Curriculum Data with SVG Diagrams & Figure Questions
 * Police Modern School, 25th Bn PAC, Raebareli
 */

const SST5_CHAPTERS_DATA = [
  {
    "id": 1,
    "title": "Water — The Essence of Life",
    "theme": "Unit 1: Life Around Us",
    "unit": "Unit 1: Life Around Us",
    "summary": "Explores the vital role of water in sustaining life, states of water, the water cycle, groundwater depletion, traditional rainwater harvesting (Baolis, Johads), and water stewardship.",
    "diagram": {
      "title": "Fig 1.1: The Continuous Natural Water Cycle",
      "svg": `<svg viewBox="0 0 520 240" class="w-full h-auto max-w-[480px] mx-auto border border-amber-300 rounded bg-gradient-to-b from-sky-50 to-blue-50 p-2">
  <circle cx="60" cy="45" r="22" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
  <text x="60" y="49" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle" fill="#78350f">SUN</text>
  
  <path d="M 230 40 Q 240 25 260 25 Q 280 20 300 35 Q 320 30 330 45 Q 340 60 320 65 L 230 65 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="280" y="50" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle" fill="#334155">2. CONDENSATION</text>
  <text x="280" y="60" font-family="sans-serif" font-size="7.5" text-anchor="middle" fill="#475569">Clouds form</text>

  <path d="M 120 160 Q 140 110 160 80" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="4,3"/>
  <path d="M 140 165 Q 160 115 180 85" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="4,3"/>
  <text x="135" y="120" font-family="sans-serif" font-size="8.5" font-weight="bold" fill="#0369a1">1. EVAPORATION</text>

  <line x1="380" y1="75" x2="370" y2="115" stroke="#0284c7" stroke-width="2" stroke-dasharray="2,3"/>
  <line x1="400" y1="75" x2="390" y2="115" stroke="#0284c7" stroke-width="2" stroke-dasharray="2,3"/>
  <text x="430" y="95" font-family="sans-serif" font-size="8.5" font-weight="bold" fill="#1d4ed8">3. PRECIPITATION</text>
  <text x="430" y="107" font-family="sans-serif" font-size="7.5" fill="#3b82f6">Rain / Snow</text>

  <polygon points="320,175 390,100 470,175" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
  <polygon points="410,175 460,120 510,175" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/>

  <rect x="20" y="170" width="220" height="55" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5" rx="4"/>
  <text x="130" y="200" font-family="sans-serif" font-size="9.5" font-weight="bold" text-anchor="middle" fill="#075985">4. COLLECTION (Ocean / Lake)</text>
  
  <rect x="245" y="170" width="265" height="55" fill="#d6d3d1" stroke="#78716c" stroke-width="1.5" rx="4"/>
  <text x="375" y="195" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#44403c">5. INFILTRATION &amp; GROUNDWATER</text>
  <text x="375" y="208" font-family="sans-serif" font-size="7.5" text-anchor="middle" fill="#57534e">Recharges underground aquifers &amp; Baolis</text>
</svg>`,
      "caption": "Figure 1.1: Schematic diagram of the Water Cycle showing Evaporation, Condensation, Precipitation, and Groundwater Infiltration."
    },
    "diagramQuestions": [
      {
        "q": "Identify the stage where liquid water turns into invisible water vapour due to the Sun's heat.",
        "ans": "Evaporation (Stage 1) is the process where solar thermal energy converts liquid surface water into water vapour."
      },
      {
        "q": "What happens to rainwater after it falls on open ground according to Stage 5?",
        "ans": "Rainwater naturally seeps deep into porous soil and rock fissures through infiltration, recharging underground aquifers and wells."
      }
    ],
    "sectionA": [
      {
        "q": "Why is water called the 'Essence of Life'? Explain its essential roles in living organisms and nature.",
        "ans": "Water is fundamental to all forms of life on Earth. <strong>1. Biological Survival:</strong> It constitutes 60–70% of living bodies, regulates body temperature, aids digestion, and transports vital nutrients. <strong>2. Photosynthesis:</strong> Plants absorb dissolved minerals from soil through water to produce food and oxygen. <strong>3. Ecosystems:</strong> Rivers, lakes, and wetlands provide natural habitats for millions of aquatic species. <strong>4. Human Society:</strong> Fresh water is essential for drinking, cooking, farming, and sanitation.",
        "tts": "Water is called the essence of life because it makes up 60 to 70 percent of living bodies, enables plant photosynthesis, sustains aquatic ecosystems, and supports agriculture."
      },
      {
        "q": "Explain the four main continuous stages of the Water Cycle.",
        "ans": "<strong>1. Evaporation & Transpiration:</strong> Sun's heat warms water bodies, turning water into vapour; plants also release vapour through leaf pores. <strong>2. Condensation:</strong> Rising vapour cools high in the atmosphere and condenses into droplets to form clouds. <strong>3. Precipitation:</strong> Heavy cloud droplets fall back as rain, snow, or hail. <strong>4. Collection & Infiltration:</strong> Water gathers in oceans, rivers, and seeps into soil as groundwater.",
        "tts": "The water cycle comprises evaporation and transpiration, condensation into clouds, precipitation as rain, and collection in water bodies and groundwater."
      },
      {
        "q": "What is groundwater depletion, what causes it, and what are sustainable solutions?",
        "ans": "<strong>Groundwater depletion</strong> is the excessive decline of the water table caused by over-pumping. <strong>Causes:</strong> Excessive tube well extraction for farming, rapid city concretisation preventing rainwater absorption, and deforestation. <strong>Remedies:</strong> Rooftop rainwater harvesting, drip irrigation in agriculture, and restoring village ponds and stepwells (Baolis).",
        "tts": "Groundwater depletion occurs when water is pumped faster than rain recharges it. Solutions include rainwater harvesting, drip irrigation, and reviving traditional ponds."
      },
      {
        "q": "Describe traditional Indian water conservation structures like Baolis and Johads.",
        "ans": "India has ancient water harvesting wisdom: <strong>1. Baolis (Stepwells):</strong> Multi-storey stone structures in Rajasthan and Gujarat collecting monsoon rain for drinking and cooling. <strong>2. Johads:</strong> Small earthen check-dams recharging local groundwater. <strong>3. Kunds / Tankas:</strong> Covered underground rainwater cisterns in Thar desert homes. <strong>4. Kuhls:</strong> Mountain glacial channels in Himachal Pradesh.",
        "tts": "Traditional Indian water structures include Baolis in Rajasthan, Johads in villages, and Kunds in desert homes. They highlight ancient conservation wisdom."
      },
      {
        "q": "What practical steps can students take at home and school to prevent water wastage?",
        "ans": "<strong>1. Turn off taps:</strong> Close taps while brushing or soaping. <strong>2. Repair leaks:</strong> Fix dripping taps that waste 15–30 litres daily. <strong>3. Reuse greywater:</strong> Use RO and vegetable wash water for watering plants. <strong>4. Bucket over hose:</strong> Use a bucket instead of running hoses for washing. <strong>5. Awareness:</strong> Promote water conservation among friends and family.",
        "tts": "Students can save water by closing taps while brushing, repairing leaks promptly, reusing kitchen wash water for plants, and using buckets instead of hoses."
      }
    ],
    "sectionB": [
      {
        "q": "What are the three physical states of water in nature?",
        "ans": "Water exists in three states: <strong>Solid</strong> (ice, snow), <strong>Liquid</strong> (rivers, oceans, rain), and <strong>Gas</strong> (water vapour, steam).",
        "tts": "The three physical states of water are solid ice, liquid water, and gaseous water vapour."
      },
      {
        "q": "What is rainwater harvesting?",
        "ans": "It is the technique of collecting, filtering, and storing rainwater from rooftops and open grounds for immediate reuse and groundwater recharge.",
        "tts": "Rainwater harvesting is collecting and storing rooftop rainwater for reuse and groundwater recharge."
      },
      {
        "q": "Why is sea/ocean water not suitable for direct drinking or farming?",
        "ans": "Ocean water has extremely high salinity (dissolved salts), making it toxic for human cells and harmful to crop soil.",
        "tts": "Ocean water has high dissolved salt content, making it unfit for drinking and agriculture."
      },
      {
        "q": "What is plant transpiration?",
        "ans": "It is the process by which plants release excess absorbed water into the air as vapour through microscopic leaf pores (stomata).",
        "tts": "Transpiration is the release of water vapour by plants through leaf stomata into the air."
      },
      {
        "q": "What is an aquifer?",
        "ans": "An aquifer is an underground geological layer of permeable rock or sand that holds fresh groundwater.",
        "tts": "An aquifer is an underground water-bearing layer of rock or sand."
      }
    ],
    "trueFalse": [
      {"q": "Freshwater accounts for only about 3% of all water on Earth.", "ans": "True", "reason": "97% of Earth's water is saline ocean water; only around 3% is fresh water."},
      {"q": "A leaking tap wastes only a few drops and has no real impact.", "ans": "False", "reason": "A single dripping tap can waste 15 to 30 litres of drinking water daily."},
      {"q": "Drip irrigation helps save immense water by targeting plant roots directly.", "ans": "True", "reason": "It delivers precise water drops to roots with zero runoff and minimal evaporation."},
      {"q": "Boiling water converts it into solid ice.", "ans": "False", "reason": "Boiling turns water into steam/vapour; freezing turns water into ice."},
      {"q": "Concretising ground surfaces helps in faster groundwater recharge.", "ans": "False", "reason": "Concrete is impermeable and forces rainwater into stormwater drains without soaking."}
    ],
    "oneWord": [
      {"q": "The process of liquid water turning into vapour due to heat.", "ans": "Evaporation"},
      {"q": "The cooling of water vapour into tiny liquid cloud droplets.", "ans": "Condensation"},
      {"q": "A traditional multi-storey stone stepwell in Rajasthan.", "ans": "Baoli"},
      {"q": "Fresh water stored underground in soil and rock pores.", "ans": "Groundwater"},
      {"q": "Microscopic pores on plant leaves releasing moisture.", "ans": "Stomata"}
    ],
    "matchFollowing": [
      {"left": "Evaporation", "right": "Sun's heat turning water into vapour", "pair": "Evaporation → Water to vapour by solar heat"},
      {"left": "Condensation", "right": "Cooling vapour forming clouds", "pair": "Condensation → Cooling vapour forming clouds"},
      {"left": "Baoli", "right": "Traditional Indian stepwell", "pair": "Baoli → Traditional Indian stepwell"},
      {"left": "Drip Irrigation", "right": "Root-targeted water conservation", "pair": "Drip Irrigation → Root-targeted water conservation"},
      {"left": "Aquifer", "right": "Underground water-bearing rock layer", "pair": "Aquifer → Underground water-bearing rock layer"}
    ],
    "goldenPoints": [
      "Water is the fundamental basis of all life on planet Earth.",
      "About 71% of Earth's surface is water, but only around 3% is fresh water.",
      "The Water Cycle consists of Evaporation, Transpiration, Condensation, and Precipitation.",
      "Groundwater is fresh water stored in underground aquifers beneath the soil.",
      "Over-extraction of groundwater causes the water table to drop drastically.",
      "Rainwater harvesting collects rooftop rain to recharge groundwater and save fresh water.",
      "Traditional Indian structures like Baolis, Johads, and Kunds represent ancient conservation wisdom.",
      "Drip and sprinkler irrigation prevent water wastage in farming.",
      "Every small effort like closing running taps and repairing leaks saves thousands of litres annually.",
      "Water conservation is our shared collective responsibility for a sustainable future."
    ],
    "sectionMCQ": [
      {"q": "Which of the following processes turns water vapour into clouds?", "options": ["A. Evaporation", "B. Condensation", "C. Filtration", "D. Sedimentation"], "ans": "B. Condensation", "exp": "Condensation occurs when rising water vapour cools to form cloud droplets."},
      {"q": "What percentage of Earth's total water is fresh water?", "options": ["A. 50%", "B. 25%", "C. About 3%", "D. 71%"], "ans": "C. About 3%", "exp": "Only around 3% of Earth's water is freshwater, mostly locked in polar ice caps."},
      {"q": "A traditional stepwell in Rajasthan and Gujarat is called a:", "options": ["A. Baoli", "B. Tube well", "C. Canal", "D. Dam"], "ans": "A. Baoli", "exp": "Baolis are historical architectural stepwells for harvesting and cooling rainwater."},
      {"q": "What happens when rainwater falls on an asphalt or concrete road?", "options": ["A. Recharges groundwater easily", "B. Runs off into drains without soaking", "C. Turns to ice instantly", "D. Dissolves the road"], "ans": "B. Runs off into drains without soaking", "exp": "Concrete surfaces are impermeable, preventing water from seeping into soil."},
      {"q": "Which farming method saves the most water by targeting plant roots directly?", "options": ["A. Flood irrigation", "B. Drip irrigation", "C. Canal flooding", "D. Overhead splashing"], "ans": "B. Drip irrigation", "exp": "Drip irrigation supplies water drop-by-drop right at root level with minimal waste."}
    ]
  },
  {
    "id": 2,
    "title": "Journey of a River",
    "theme": "Unit 1: Life Around Us",
    "unit": "Unit 1: Life Around Us",
    "summary": "Told through the vivid life cycle of River Godavari (Dakshin Ganga), this chapter explores river origin, valleys, tributaries, human settlements, deltas, river pollution, and conservation.",
    "diagram": {
      "title": "Fig 2.1: The Complete Course of a River System",
      "svg": `<svg viewBox="0 0 520 240" class="w-full h-auto max-w-[480px] mx-auto border border-amber-300 rounded bg-gradient-to-b from-sky-50 to-emerald-50 p-2">
  <!-- Mountains / Origin -->
  <polygon points="10,120 55,30 100,120" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/>
  <polygon points="70,120 120,45 170,120" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
  <text x="85" y="35" font-family="sans-serif" font-size="8.5" font-weight="bold" fill="#0f172a">SOURCE (Upper Course)</text>
  <text x="85" y="47" font-family="sans-serif" font-size="7.5" fill="#334155">Glaciers / Springs</text>

  <!-- River path -->
  <path d="M 95 100 Q 150 140 220 120 Q 300 100 370 140 Q 430 170 480 160" fill="none" stroke="#0284c7" stroke-width="6"/>
  
  <!-- Tributary -->
  <path d="M 220 40 Q 240 80 260 115" fill="none" stroke="#38bdf8" stroke-width="3.5" stroke-dasharray="3,1"/>
  <text x="250" y="55" font-family="sans-serif" font-size="8" font-weight="bold" fill="#0284c7">TRIBUTARY (सहायक)</text>
  
  <!-- Middle Course Plains -->
  <rect x="180" y="160" width="130" height="35" fill="#dcfce7" stroke="#16a34a" stroke-width="1" rx="4"/>
  <text x="245" y="175" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#14532d">MIDDLE COURSE</text>
  <text x="245" y="187" font-family="sans-serif" font-size="7.5" text-anchor="middle" fill="#166534">Fertile Plains &amp; Cities</text>

  <!-- Delta / Mouth -->
  <path d="M 430 155 L 490 135 M 430 160 L 500 165 M 430 165 L 485 195" stroke="#0284c7" stroke-width="3"/>
  <polygon points="440,140 480,140 500,195 440,195" fill="#fef3c7" stroke="#d97706" stroke-width="1" opacity="0.6"/>
  <text x="465" y="130" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#b45309">DELTA (वितरिका)</text>
  <text x="465" y="210" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle" fill="#0369a1">MOUTH (Sea / Ocean)</text>
</svg>`,
      "caption": "Figure 2.1: Journey of a River from mountain source to delta and ocean mouth."
    },
    "diagramQuestions": [
      {
        "q": "What is the difference between a tributary and a distributary as shown in the diagram?",
        "ans": "A tributary joins the main river in its upper/middle course adding water, whereas distributaries branch out near the delta before entering the sea."
      },
      {
        "q": "Why is the middle course marked as having fertile plains?",
        "ans": "Because the river slows down and deposits mineral-rich alluvial silt across plains, creating prime agricultural land."
      }
    ],
    "sectionA": [
      {
        "q": "Trace the life journey of River Godavari from origin to where it joins the sea.",
        "ans": "River Godavari (Dakshin Ganga) travels 1,465 km across India: <strong>1. Source (Upper Course):</strong> Originates at Trimbakeshwar near Nashik in Maharashtra. <strong>2. Middle Course:</strong> Flows through Maharashtra, Telangana, and Andhra Pradesh, receiving tributaries like Indravati and Manjira. <strong>3. Delta & Mouth:</strong> Splits into distributaries near Rajahmundry, forming a fertile delta before emptying into the Bay of Bengal.",
        "tts": "River Godavari originates at Trimbakeshwar in Maharashtra, flows across three states, and empties into the Bay of Bengal."
      },
      {
        "q": "Why have human civilizations always settled and flourished along riverbanks?",
        "ans": "Rivers are the cradles of civilization because they provide: <strong>1. Perennial Fresh Water</strong> for drinking and livestock. <strong>2. Fertile Alluvial Soil</strong> deposited by annual floods for agriculture. <strong>3. Natural Trade Routes</strong> for boats and merchandise. <strong>4. Spiritual & Cultural Centres</strong> like Varanasi, Haridwar, and Nashik.",
        "tts": "Civilizations settled on riverbanks because rivers provided fresh water, fertile agricultural silt, transportation routes, and cultural hubs."
      },
      {
        "q": "Explain major causes of river pollution and practical measures to revive them.",
        "ans": "<strong>Causes:</strong> Untreated industrial toxic effluents, municipal sewage, plastic dumping, and immersion of non-biodegradable idols. <strong>Remedies:</strong> Modern Sewage Treatment Plants (STPs), strict industrial effluent norms, banning single-use plastics along riverbanks, and promoting tree plantation on riverbanks.",
        "tts": "River pollution is caused by factory chemicals, city sewage, and plastic waste. Solutions include sewage treatment plants and stopping plastic dumping."
      },
      {
        "q": "What are multi-purpose river valley projects (Dams)? Discuss their benefits and concerns.",
        "ans": "<strong>Benefits:</strong> Hydroelectric power generation, canal irrigation for drought areas, flood moderation, and inland fisheries. <strong>Concerns:</strong> Submergence of pristine forests, displacement of local and tribal communities, and disruption of river aquatic ecology.",
        "tts": "Dams provide hydro electricity and canal irrigation, but cause forest submergence and displacement of local populations."
      },
      {
        "q": "What is an estuary and how does it differ from a river delta?",
        "ans": "<strong>Delta:</strong> Formed when a river carrying heavy silt splits into channels and deposits soil in a triangular shape (e.g., Godavari, Ganga-Brahmaputra). <strong>Estuary:</strong> A semi-enclosed coastal body where river fresh water directly meets ocean tide without heavy silt accumulation (e.g., Narmada, Tapi).",
        "tts": "A delta is a triangular silt deposit near the sea, while an estuary is where river water mixes directly with tidal ocean water."
      }
    ],
    "sectionB": [
      {
        "q": "Where does River Godavari originate?",
        "ans": "River Godavari originates in the Western Ghats at <strong>Trimbakeshwar near Nashik, Maharashtra</strong>.",
        "tts": "River Godavari originates at Trimbakeshwar in Maharashtra."
      },
      {
        "q": "Why is River Godavari called 'Dakshin Ganga'?",
        "ans": "Because it is the longest, largest, and most sacred river system in the southern Indian peninsula.",
        "tts": "Godavari is called Dakshin Ganga because it is the longest and most sacred river of southern India."
      },
      {
        "q": "Name two major tributaries of River Godavari.",
        "ans": "<strong>Indravati</strong> and <strong>Manjira</strong> (also Pranhita and Penganga).",
        "tts": "Two major tributaries of Godavari are Indravati and Manjira."
      },
      {
        "q": "What is alluvium?",
        "ans": "Alluvium is fertile silt, clay, and sand deposited by river floodwaters on agricultural plains.",
        "tts": "Alluvium is fertile soil deposited by flowing rivers on floodplains."
      },
      {
        "q": "Into which ocean body does River Godavari empty?",
        "ans": "It empties into the <strong>Bay of Bengal</strong>.",
        "tts": "River Godavari empties into the Bay of Bengal."
      }
    ],
    "trueFalse": [
      {"q": "River Godavari originates from the Himalayas.", "ans": "False", "reason": "Godavari originates in the Western Ghats at Trimbakeshwar in Maharashtra."},
      {"q": "A tributary is a small river that joins a larger river.", "ans": "True", "reason": "Tributaries bring water into the main parent river channel."},
      {"q": "Dams are used only for swimming competitions.", "ans": "False", "reason": "Dams generate electricity, store irrigation water, and control floods."},
      {"q": "The Sundarbans delta is the largest river delta in the world.", "ans": "True", "reason": "Formed by Ganga and Brahmaputra, Sundarbans is the world's largest delta."},
      {"q": "Pouring untreated factory waste into rivers makes the water purer.", "ans": "False", "reason": "Industrial effluents contain hazardous toxins that poison aquatic life and drinking water."}
    ],
    "oneWord": [
      {"q": "The sacred source or starting point of a river.", "ans": "Origin / Source"},
      {"q": "The triangular fertile land formed where a river meets the sea.", "ans": "Delta"},
      {"q": "River Godavari is popularly known as __________ Ganga.", "ans": "Dakshin"},
      {"q": "A smaller stream branching out away from a river near its mouth.", "ans": "Distributary"},
      {"q": "The rich fertile silt deposited on plains by flowing rivers.", "ans": "Alluvium"}
    ],
    "matchFollowing": [
      {"left": "Trimbakeshwar", "right": "Origin of River Godavari", "pair": "Trimbakeshwar → Origin of River Godavari"},
      {"left": "Dakshin Ganga", "right": "Honorary name for Godavari", "pair": "Dakshin Ganga → Name for Godavari"},
      {"left": "Tributary", "right": "River joining a larger river", "pair": "Tributary → River joining a larger river"},
      {"left": "Distributary", "right": "Branching channel near delta", "pair": "Distributary → Branching channel near delta"},
      {"left": "Bay of Bengal", "right": "Mouth of River Godavari", "pair": "Bay of Bengal → Mouth of River Godavari"}
    ],
    "goldenPoints": [
      "Rivers are vital lifelines that nurture ecosystems and human civilization.",
      "Godavari is the longest river in Peninsular India (1,465 km).",
      "The upper course has steep valleys, gorges, and fast-flowing water.",
      "The middle course meanders across flat plains, depositing fertile alluvium.",
      "The lower course slows down, splits into distributaries, and creates deltas.",
      "Tributaries add water to the main river; distributaries distribute it.",
      "Civilizations flourished along rivers due to water, fertile soil, and transport.",
      "River pollution from sewage and industry threatens aquatic ecosystems.",
      "Multi-purpose dams provide electricity and irrigation but require ecological care.",
      "Protecting our rivers is essential for environmental survival and future generations."
    ],
    "sectionMCQ": [
      {"q": "River Godavari originates in which Indian state?", "options": ["A. Maharashtra", "B. Karnataka", "C. Uttarakhand", "D. Kerala"], "ans": "A. Maharashtra", "exp": "Godavari originates at Trimbakeshwar in Nashik district, Maharashtra."},
      {"q": "The triangular land formed by silt deposition at a river's mouth is called a:", "options": ["A. Valley", "B. Delta", "C. Plateau", "D. Glacier"], "ans": "B. Delta", "exp": "Deltas are fertile triangular landforms created by sediment deposits."},
      {"q": "Which of the following is a tributary of River Godavari?", "options": ["A. Yamuna", "B. Indravati", "C. Sutlej", "D. Kosi"], "ans": "B. Indravati", "exp": "Indravati is a key left-bank tributary of the Godavari river."},
      {"q": "What is the primary cause of modern river pollution in urban areas?", "options": ["A. Fish swimming", "B. Untreated sewage and industrial effluents", "C. Evaporation", "D. Rainwater"], "ans": "B. Untreated sewage and industrial effluents", "exp": "Toxic chemicals and urban sewage are the chief causes of river pollution."},
      {"q": "Where does River Godavari finally merge into the sea?", "options": ["A. Arabian Sea", "B. Bay of Bengal", "C. Indian Ocean at Kanyakumari", "D. Caspian Sea"], "ans": "B. Bay of Bengal", "exp": "Godavari flows eastward across the Deccan and empties into the Bay of Bengal."}
    ]
  },
  {
    "id": 3,
    "title": "From Seed to Plant",
    "theme": "Unit 1: Life Around Us",
    "unit": "Unit 1: Life Around Us",
    "summary": "Covers seed germination, structure of a seed (cotyledons, embryo, seed coat), seed dispersal mechanisms (wind, water, animals, explosive burst), and plant life cycles.",
    "diagram": {
      "title": "Fig 3.1: Seed Structure and Germination Stages",
      "svg": `<svg viewBox="0 0 520 230" class="w-full h-auto max-w-[480px] mx-auto border border-amber-300 rounded bg-gradient-to-b from-amber-50 to-emerald-50 p-2">
  <!-- Seed Internal Anatomy -->
  <ellipse cx="90" cy="115" rx="55" ry="70" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>
  <path d="M 90 45 Q 120 115 90 185" fill="none" stroke="#d97706" stroke-width="1.5" stroke-dasharray="3,2"/>
  <circle cx="105" cy="115" r="12" fill="#86efac" stroke="#16a34a" stroke-width="1.5"/>
  <text x="90" y="30" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle" fill="#78350f">SEED ANATOMY</text>
  <text x="105" y="118" font-family="sans-serif" font-size="7" font-weight="bold" text-anchor="middle" fill="#14532d">EMBRYO</text>
  <text x="50" y="115" font-family="sans-serif" font-size="7.5" fill="#92400e">Cotyledon<br/>(Food store)</text>

  <!-- Germination arrow -->
  <line x1="160" y1="115" x2="195" y2="115" stroke="#059669" stroke-width="2" marker-end="url(#arrow)"/>

  <!-- Stage 1: Radicle -->
  <circle cx="230" cy="150" r="14" fill="#fef3c7" stroke="#b45309" stroke-width="1.5"/>
  <path d="M 230 164 Q 235 190 240 210" fill="none" stroke="#854d0e" stroke-width="2.5"/>
  <text x="230" y="130" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#334155">1. Radicle</text>
  <text x="230" y="222" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#78350f">Root emerges</text>

  <!-- Stage 2: Plumule -->
  <circle cx="330" cy="140" r="14" fill="#fef3c7" stroke="#b45309" stroke-width="1.5"/>
  <path d="M 330 154 Q 330 190 335 210" fill="none" stroke="#854d0e" stroke-width="2"/>
  <path d="M 330 126 Q 330 90 330 70" fill="none" stroke="#16a34a" stroke-width="2.5"/>
  <ellipse cx="323" cy="65" rx="8" ry="5" fill="#4ade80" stroke="#15803d"/>
  <ellipse cx="337" cy="65" rx="8" ry="5" fill="#4ade80" stroke="#15803d"/>
  <text x="330" y="50" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#15803d">2. Plumule</text>
  <text x="330" y="222" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#78350f">Shoot grows up</text>

  <!-- Stage 3: Seedling -->
  <path d="M 440 210 L 440 80" stroke="#16a34a" stroke-width="3"/>
  <path d="M 440 210 Q 425 220 415 225 M 440 210 Q 455 220 465 225" stroke="#854d0e" stroke-width="1.5"/>
  <ellipse cx="420" cy="95" rx="15" ry="8" fill="#22c55e" stroke="#15803d"/>
  <ellipse cx="460" cy="95" rx="15" ry="8" fill="#22c55e" stroke="#15803d"/>
  <ellipse cx="440" cy="70" rx="12" ry="7" fill="#4ade80" stroke="#15803d"/>
  <text x="440" y="45" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#14532d">3. SEEDLING</text>
  <text x="440" y="58" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#166534">Photosynthesis starts</text>
</svg>`,
      "caption": "Figure 3.1: Parts of a seed and the sequential stages of seed germination into a young plant."
    },
    "diagramQuestions": [
      {
        "q": "What part of the embryo emerges first during seed germination and what does it form?",
        "ans": "The radicle emerges first from the seed coat and grows downwards into the soil to establish the plant's root system."
      },
      {
        "q": "What is the primary function of cotyledons during the initial days of germination?",
        "ans": "Cotyledons store concentrated food starch and protein to nourish the growing baby plant until it develops green leaves for photosynthesis."
      }
    ],
    "sectionA": [
      {
        "q": "Describe the essential conditions required for a seed to germinate successfully.",
        "ans": "A viable seed needs three fundamental environmental conditions: <strong>1. Water (Moisture):</strong> Softens the hard outer seed coat and activates enzymes to break down stored food. <strong>2. Oxygen (Air):</strong> Required for cellular respiration to produce energy for growth. <strong>3. Warmth (Suitable Temperature):</strong> Provides optimum conditions for metabolic activities.",
        "tts": "The three essential conditions for seed germination are water to soften the coat, oxygen for respiration, and warmth for active growth."
      },
      {
        "q": "Explain the structure of a seed with its key functional parts.",
        "ans": "A seed consists of three primary components: <strong>1. Seed Coat (Testa):</strong> The tough outer covering protecting the delicate interior from injury and drying. <strong>2. Cotyledons (Seed Leaves):</strong> Fleshy lobes storing food reserves (monocots have one, dicots have two). <strong>3. Embryo (Baby Plant):</strong> Comprises the radicle (future root) and plumule (future shoot).",
        "tts": "A seed contains a protective seed coat, nutrient-storing cotyledons, and an embryo with a radicle and plumule."
      },
      {
        "q": "What is seed dispersal? Why is it vital for the survival of plant species?",
        "ans": "<strong>Seed dispersal</strong> is the transport or scattering of seeds away from the parent plant. <strong>Importance:</strong> <strong>1. Prevents Overcrowding:</strong> If all seeds fell under the parent tree, they would compete fiercely for light, water, and soil minerals. <strong>2. Colonisation:</strong> Allows plants to spread to new geographic regions. <strong>3. Species Survival:</strong> Prevents total extinction from localized pests or droughts.",
        "tts": "Seed dispersal is the scattering of seeds away from parent plants to avoid overcrowding and competition for sunlight and nutrients."
      },
      {
        "q": "Describe the different agents and mechanisms of seed dispersal with examples.",
        "ans": "<strong>1. Wind Dispersal:</strong> Light, winged, or hairy seeds carried by breeze (e.g., Dandelion, Madar/Aak, Maple). <strong>2. Water Dispersal:</strong> Waterproof, fibrous, or spongy fruits that float across streams and oceans (e.g., Coconut, Lotus). <strong>3. Animal Dispersal:</strong> Hooked or sticky seeds attaching to animal fur (Xanthium), or sweet fleshy fruits eaten by birds with seeds excreted undamaged (Guava, Mango). <strong>4. Explosive Burst:</strong> Pods drying in heat and suddenly bursting open (Balsam, Pea).",
        "tts": "Agents of seed dispersal include wind for light seeds, water for floating coconuts, animals for sticky or fleshy fruits, and explosion for pea pods."
      },
      {
        "q": "What is the difference between monocotyledonous and dicotyledonous seeds?",
        "ans": "<strong>Monocots:</strong> Seeds having only one seed leaf/cotyledon (e.g., Maize, Wheat, Rice, Grass). <strong>Dicots:</strong> Seeds having two distinct seed leaves/cotyledons that easily split into two halves (e.g., Gram/Chana, Pea, Bean, Mango).",
        "tts": "Monocots have one cotyledon like wheat and maize, while dicots have two cotyledons like gram and peas."
      }
    ],
    "sectionB": [
      {
        "q": "What is germination?",
        "ans": "Germination is the biological process by which a dormant seed awakens and grows into a young seedling under suitable conditions.",
        "tts": "Germination is the process where a dormant seed sprouts into a young seedling."
      },
      {
        "q": "Which part of the embryo grows into the plant's shoot system?",
        "ans": "The <strong>plumule</strong> develops into the stem, branches, and green leaves.",
        "tts": "The plumule develops into the stem and green leaves."
      },
      {
        "q": "Give two examples of seeds dispersed by wind.",
        "ans": "<strong>Dandelion</strong> (with parachute hairs) and <strong>Madar (Aak)</strong>.",
        "tts": "Dandelion and Madar seeds are dispersed by wind."
      },
      {
        "q": "How do animals help in seed dispersal?",
        "ans": "Animals eat fleshy fruits and excrete seeds in distant places, or seeds with hooks (like Xanthium) cling to animal fur and drop elsewhere.",
        "tts": "Animals disperse seeds by eating fruits or carrying hooked seeds on their fur."
      },
      {
        "q": "Name a plant whose fruit bursts open with sudden force to disperse seeds.",
        "ans": "<strong>Pea pod</strong> and <strong>Balsam (Touch-me-not)</strong>.",
        "tts": "Pea and Balsam pods burst open explosively to disperse seeds."
      }
    ],
    "trueFalse": [
      {"q": "Seeds can germinate without any water or moisture.", "ans": "False", "reason": "Water is essential to soften the seed coat and activate growth enzymes."},
      {"q": "The radicle of an embryo always grows upward into the sunlight.", "ans": "False", "reason": "The radicle grows downward into soil to form the root; the plumule grows upward."},
      {"q": "Coconut seeds are adapted for water dispersal due to fibrous husk.", "ans": "True", "reason": "The fibrous waterproof husk traps air, making coconuts buoyant in ocean currents."},
      {"q": "Gram and pea seeds are examples of monocot seeds.", "ans": "False", "reason": "Gram and peas split into two cotyledons, making them dicot seeds."},
      {"q": "Seed dispersal prevents overcrowding around the parent plant.", "ans": "True", "reason": "Dispersal ensures young seedlings get adequate sunlight, water, and soil space."}
    ],
    "oneWord": [
      {"q": "The protective outer shell covering a seed.", "ans": "Seed Coat (Testa)"},
      {"q": "The baby plant present inside a dormant seed.", "ans": "Embryo"},
      {"q": "The part of the embryo that develops into the root system.", "ans": "Radicle"},
      {"q": "A seed having two distinct cotyledons.", "ans": "Dicot"},
      {"q": "Seed with sharp hooks that clings to animal fur.", "ans": "Xanthium"}
    ],
    "matchFollowing": [
      {"left": "Dandelion", "right": "Wind dispersal by parachute hairs", "pair": "Dandelion → Wind dispersal by hairs"},
      {"left": "Coconut", "right": "Water dispersal with fibrous husk", "pair": "Coconut → Water dispersal by floating"},
      {"left": "Xanthium", "right": "Animal dispersal with hooks/spines", "pair": "Xanthium → Animal dispersal by hooks"},
      {"left": "Pea Pod", "right": "Explosive mechanical bursting", "pair": "Pea Pod → Explosive bursting"},
      {"left": "Cotyledon", "right": "Stored food for baby embryo", "pair": "Cotyledon → Stored food for embryo"}
    ],
    "goldenPoints": [
      "A seed contains a seed coat, cotyledons (food store), and a living embryo.",
      "Germination requires water, oxygen, and adequate warmth.",
      "The radicle develops into roots; the plumule develops into shoot and leaves.",
      "Monocots have one cotyledon (maize, wheat); dicots have two (gram, beans).",
      "Seed dispersal spreads plants to new areas and prevents resource starvation.",
      "Wind-dispersed seeds are tiny, light, or have parachute tufts.",
      "Water-dispersed seeds have spongy, fibrous, or buoyant coverings.",
      "Animals disperse seeds through sweet edible fruits or spiny clinging burrs.",
      "Some seed pods burst explosively when dry to fling seeds outward.",
      "Plants are primary producers sustaining the entire ecological food chain."
    ],
    "sectionMCQ": [
      {"q": "Which of the following conditions is NOT essential for seed germination?", "options": ["A. Water", "B. Oxygen", "C. Sunlight for non-green embryo", "D. Warmth"], "ans": "C. Sunlight for non-green embryo", "exp": "Most seeds germinate underground in darkness using stored cotyledon food before leaves appear."},
      {"q": "The part of the seed that stores food for the growing embryo is the:", "options": ["A. Radicle", "B. Cotyledon", "C. Plumule", "D. Testa"], "ans": "B. Cotyledon", "exp": "Cotyledons store starch and nutrients to sustain the young seedling."},
      {"q": "Which of these seeds is dispersed primarily by wind?", "options": ["A. Coconut", "B. Mango", "C. Dandelion", "D. Lotus"], "ans": "C. Dandelion", "exp": "Dandelion seeds have feathery parachutes easily carried by wind."},
      {"q": "Which of the following is a dicot seed?", "options": ["A. Wheat", "B. Rice", "C. Maize", "D. Chickpea (Gram)"], "ans": "D. Chickpea (Gram)", "exp": "Chickpea splits into two halves (two cotyledons), making it a dicot."},
      {"q": "What emerges first from a germinating seed?", "options": ["A. Flower", "B. Leaf", "C. Radicle (Root)", "D. Fruit"], "ans": "C. Radicle (Root)", "exp": "The radicle emerges first to anchor the seedling and absorb water."}
    ]
  },
  {
    "id": 4,
    "title": "The Food We Eat",
    "theme": "Unit 1: Life Around Us",
    "unit": "Unit 1: Life Around Us",
    "summary": "Covers balanced nutrition, major food nutrients (carbohydrates, proteins, fats, vitamins, minerals, roughage, water), preservation methods, regional Indian cuisines, and avoiding food wastage.",
    "diagram": {
      "title": "Fig 4.1: The Balanced Diet & Nutrition Pyramid",
      "svg": `<svg viewBox="0 0 520 230" class="w-full h-auto max-w-[480px] mx-auto border border-amber-300 rounded bg-gradient-to-b from-amber-50 to-orange-50 p-2">
  <!-- Food Pyramid Tier 1 (Top - Fats/Sweets - Eat least) -->
  <polygon points="260,25 210,65 310,65" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
  <text x="260" y="50" font-family="sans-serif" font-size="7.5" font-weight="bold" text-anchor="middle" fill="#991b1b">FATS, OILS &amp; SWEETS (Eat Least)</text>

  <!-- Food Pyramid Tier 2 (Proteins & Dairy) -->
  <polygon points="210,65 310,65 350,115 170,115" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="260" y="92" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#92400e">PROTEINS: Milk, Eggs, Pulses, Fish (Moderate)</text>
  <text x="260" y="105" font-family="sans-serif" font-size="7.5" text-anchor="middle" fill="#b45309">Body-Building &amp; Muscle Repair</text>

  <!-- Food Pyramid Tier 3 (Vitamins & Minerals - Veggies & Fruits) -->
  <polygon points="170,115 350,115 390,165 130,165" fill="#dcfce7" stroke="#10b981" stroke-width="1.5"/>
  <text x="260" y="140" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#065f46">PROTECTIVE FOODS: Fruits &amp; Green Vegetables (Generous)</text>
  <text x="260" y="153" font-family="sans-serif" font-size="7.5" text-anchor="middle" fill="#047857">Vitamins, Minerals &amp; Roughage (Fight Diseases)</text>

  <!-- Food Pyramid Tier 4 (Carbohydrates - Base) -->
  <polygon points="130,165 390,165 430,215 90,215" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.5"/>
  <text x="260" y="190" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle" fill="#312e81">ENERGY-GIVING: Rice, Wheat (Roti), Millets, Potatoes (Base)</text>
  <text x="260" y="203" font-family="sans-serif" font-size="7.5" text-anchor="middle" fill="#4338ca">Carbohydrates providing all-day working energy</text>
</svg>`,
      "caption": "Figure 4.1: The Balanced Food Pyramid illustrating proportional daily intake of nutrients."
    },
    "diagramQuestions": [
      {
        "q": "Which food group forms the broad base of our daily balanced nutrition and why?",
        "ans": "Carbohydrates (grains like wheat, rice, millets) form the base because our body requires steady energy for daily physical activities and organ functions."
      },
      {
        "q": "Why are fruits and green vegetables classified as 'Protective Foods'?",
        "ans": "Because they are rich in vitamins, minerals, and antioxidants that strengthen our immune system to protect us against diseases and infections."
      }
    ],
    "sectionA": [
      {
        "q": "What is a Balanced Diet? Name the major nutrient groups and their primary functions.",
        "ans": "A <strong>Balanced Diet</strong> contains all essential nutrients in proper proportions along with adequate roughage and water: <strong>1. Carbohydrates:</strong> Provide immediate energy (rice, wheat). <strong>2. Fats:</strong> Concentrated energy reserves (butter, oil). <strong>3. Proteins:</strong> Body-building, growth, and tissue repair (pulses, milk, paneer). <strong>4. Vitamins & Minerals:</strong> Protect against diseases and keep organs healthy (fruits, green vegetables). <strong>5. Dietary Fibre (Roughage):</strong> Prevents constipation and aids digestion.",
        "tts": "A balanced diet contains carbohydrates for energy, proteins for growth, fats for storage, vitamins and minerals for protection, and roughage for digestion."
      },
      {
        "q": "Explain common methods of preserving food to prevent spoilage.",
        "ans": "<strong>1. Drying (Dehydration):</strong> Removing moisture to inhibit bacterial growth (papads, sun-dried chillies). <strong>2. Pickling & Salting:</strong> Salt and mustard oil prevent microbial reproduction (mango and lemon pickles). <strong>3. Sugaring (Sweetening):</strong> Concentrated sugar syrup dehydrates microbes (jams, jellies, murabba). <strong>4. Boiling:</strong> High heat kills bacteria and moulds (boiling milk). <strong>5. Refrigeration / Freezing:</strong> Low temperature slows microbial growth.",
        "tts": "Food preservation methods include sun drying, pickling with salt and oil, boiling milk, sugaring jams, and refrigeration."
      },
      {
        "q": "What is food wastage, why is it a serious issue, and how can we prevent it?",
        "ans": "<strong>Significance:</strong> Millions go hungry while tons of food are thrown away at weddings and hotels. Producing food consumes vast water, labour, and land. <strong>Prevention:</strong> Take only what you can finish on your plate, store leftovers properly in the fridge, repurpose surplus food, and donate untouched party food to food banks.",
        "tts": "Prevent food wastage by taking only needed portions, storing leftovers properly, and donating surplus food."
      },
      {
        "q": "Discuss India's culinary diversity and how regional climate influences local diets.",
        "ans": "India's food culture reflects local geography: <strong>1. North India:</strong> Wheat, dairy products, mustard, and warming gravies suited to cooler winters. <strong>2. South India:</strong> Rice, coconut, curry leaves, and fermented foods like idli and dosa. <strong>3. Coastal Regions:</strong> Fish curry and rice utilizing abundant marine wealth. <strong>4. Desert Rajasthan:</strong> Millets (Bajra), pulses, and gram flour (Besan) due to water scarcity.",
        "tts": "Indian cuisine varies by region: North India eats wheat and dairy, South India eats rice and coconut, coastal areas eat fish, and deserts eat millets."
      },
      {
        "q": "What is the importance of dietary fibre (roughage) and clean drinking water in our diet?",
        "ans": "<strong>Roughage (Fibre):</strong> Undigested plant material in raw salads, whole grains, and fruit skins that adds bulk to stool, ensuring smooth bowel movements. <strong>Water:</strong> Essential for transporting nutrients, flushing metabolic toxins through sweat and urine, and regulating normal body temperature.",
        "tts": "Roughage adds bulk to food for healthy digestion, and water transports nutrients and removes metabolic toxins."
      }
    ],
    "sectionB": [
      {
        "q": "Which nutrients are known as 'Body-Building Foods'?",
        "ans": "<strong>Proteins</strong> (pulses, milk, paneer, eggs, soyabeans) are body-building foods.",
        "tts": "Proteins are body building foods."
      },
      {
        "q": "Name the vitamin synthesized in our skin in the presence of morning sunlight.",
        "ans": "<strong>Vitamin D</strong> (essential for strong bones and teeth).",
        "tts": "Vitamin D is synthesized in sunlight."
      },
      {
        "q": "Why should we avoid eating open street food exposed to flies?",
        "ans": "Flies carry disease-causing germs from dirt and contaminate open food, causing stomach infections and diarrhoea.",
        "tts": "Flies transmit harmful germs to exposed food causing stomach infections."
      },
      {
        "q": "What is dehydration in the context of food preservation?",
        "ans": "Dehydration is the process of removing all water and moisture from food items by sun drying.",
        "tts": "Dehydration is removing water from food to prevent spoilage."
      },
      {
        "q": "Name two traditional millets grown and eaten in India.",
        "ans": "<strong>Bajra (Pearl Millet)</strong> and <strong>Jowar (Sorghum)</strong> / Ragi.",
        "tts": "Bajra and Jowar are traditional Indian millets."
      }
    ],
    "trueFalse": [
      {"q": "Proteins are primarily responsible for providing instant energy during running.", "ans": "False", "reason": "Carbohydrates provide instant energy; proteins build and repair body muscles."},
      {"q": "Fruits and raw vegetable salads are rich sources of dietary fibre and vitamins.", "ans": "True", "reason": "Fresh vegetables and fruits provide essential vitamins, minerals, and roughage."},
      {"q": "Boiling milk helps kill harmful bacteria present in it.", "ans": "True", "reason": "High temperature boiling pasteurizes milk by eliminating pathogenic microbes."},
      {"q": "Junk foods like potato chips and sodas constitute a healthy balanced diet.", "ans": "False", "reason": "Junk foods lack essential vitamins and roughage, leading to obesity and nutritional deficiencies."},
      {"q": "Freezing food stops the growth of bacteria temporarily.", "ans": "True", "reason": "Sub-zero temperatures freeze water and inactivate bacterial metabolism."}
    ],
    "oneWord": [
      {"q": "Nutrients that provide the main source of working energy.", "ans": "Carbohydrates"},
      {"q": "Nutrients essential for muscle growth and cell repair.", "ans": "Proteins"},
      {"q": "Plant fibre that prevents digestive constipation.", "ans": "Roughage / Dietary Fibre"},
      {"q": "Food preservation method using concentrated salt and mustard oil.", "ans": "Pickling"},
      {"q": "Condition caused by a severe lack of essential nutrients in diet.", "ans": "Malnutrition"}
    ],
    "matchFollowing": [
      {"left": "Carbohydrates", "right": "Instant energy from rice and wheat", "pair": "Carbohydrates → Energy from grains"},
      {"left": "Proteins", "right": "Muscle building from pulses and milk", "pair": "Proteins → Muscle building from pulses"},
      {"left": "Vitamins & Minerals", "right": "Disease protection from fruits and veggies", "pair": "Vitamins → Protection from fruits"},
      {"left": "Roughage", "right": "Fibre aiding smooth bowel movement", "pair": "Roughage → Fibre aiding digestion"},
      {"left": "Dehydration", "right": "Sun drying food to remove moisture", "pair": "Dehydration → Sun drying food"}
    ],
    "goldenPoints": [
      "A balanced diet includes carbohydrates, proteins, fats, vitamins, minerals, fibre, and water.",
      "Carbohydrates and fats are energy-giving foods.",
      "Proteins build muscles, tissues, and help in body growth.",
      "Vitamins and minerals protect the body against illnesses and boost immunity.",
      "Roughage from raw salads and whole grains prevents constipation.",
      "Water constitutes two-thirds of human body weight and flushes toxins.",
      "Food preservation methods include drying, pickling, salting, sugaring, and freezing.",
      "Regional Indian food patterns developed based on local soil and climatic availability.",
      "Millets like Bajra, Jowar, and Ragi are highly nutritious climate-resilient grains.",
      "Preventing food wastage is a moral, economic, and environmental duty."
    ],
    "sectionMCQ": [
      {"q": "Which of the following is considered a body-building food?", "options": ["A. Butter", "B. Sugar", "C. Moong Dal (Pulses)", "D. Potato"], "ans": "C. Moong Dal (Pulses)", "exp": "Pulses are packed with plant proteins necessary for body growth and repair."},
      {"q": "Citrus fruits like lemons, oranges, and amla are rich in:", "options": ["A. Vitamin C", "B. Vitamin D", "C. Fats", "D. Carbohydrates"], "ans": "A. Vitamin C", "exp": "Citrus fruits contain high levels of Vitamin C which boosts immunity."},
      {"q": "Which preservative is commonly used in traditional Indian mango pickles?", "options": ["A. Mustard oil and salt", "B. Sugar syrup only", "C. Boiling water", "D. Ice"], "ans": "A. Mustard oil and salt", "exp": "Salt draws out moisture and mustard oil creates an airtight barrier against bacteria."},
      {"q": "What is the main role of roughage in our daily diet?", "options": ["A. Builds strong muscles", "B. Helps in smooth digestion and bowel movement", "C. Gives instant energy", "D. Makes bones white"], "ans": "B. Helps in smooth digestion and bowel movement", "exp": "Dietary fibre adds bulk to digestive waste preventing constipation."},
      {"q": "Ragi, Bajra, and Jowar belong to which healthy food category?", "options": ["A. Millets (Coarse Grains)", "B. Refined sugars", "C. Junk snacks", "D. Carbonated beverages"], "ans": "A. Millets (Coarse Grains)", "exp": "Millets are nutrient-rich super-grains celebrated for high mineral and fibre content."}
    ]
  },
  {
    "id": 5,
    "title": "Our School, Our Community",
    "theme": "Unit 1: Life Around Us",
    "unit": "Unit 1: Life Around Us",
    "summary": "Focuses on school as a cooperative micro-community, civic responsibilities, inclusive education, disaster preparedness (earthquake, fire drills), and community helpers.",
    "diagram": {
      "title": "Fig 5.1: School Community & Safety Emergency Protocol",
      "svg": `<svg viewBox="0 0 520 220" class="w-full h-auto max-w-[480px] mx-auto border border-amber-300 rounded bg-gradient-to-b from-slate-50 to-amber-50 p-2">
  <!-- Central School Node -->
  <rect x="190" y="20" width="140" height="45" fill="#4f46e5" stroke="#3730a3" stroke-width="2" rx="6"/>
  <text x="260" y="38" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle" fill="#ffffff">OUR SCHOOL</text>
  <text x="260" y="52" font-family="sans-serif" font-size="7.5" text-anchor="middle" fill="#c7d2fe">Learning &amp; Community Hub</text>

  <!-- Left Branch: Civic Values -->
  <rect x="20" y="100" width="140" height="50" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5" rx="4"/>
  <text x="90" y="120" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#065f46">CIVIC VALUES</text>
  <text x="90" y="135" font-family="sans-serif" font-size="7.5" text-anchor="middle" fill="#047857">Discipline, Equality &amp; Unity</text>

  <!-- Middle Branch: Helpers -->
  <rect x="190" y="100" width="140" height="50" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" rx="4"/>
  <text x="260" y="120" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#92400e">HELPERS &amp; STAFF</text>
  <text x="260" y="135" font-family="sans-serif" font-size="7.5" text-anchor="middle" fill="#b45309">Teachers, Guard, Safai Karmi</text>

  <!-- Right Branch: Disaster Safety -->
  <rect x="360" y="100" width="140" height="50" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" rx="4"/>
  <text x="430" y="120" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#991b1b">DISASTER PREPAREDNESS</text>
  <text x="430" y="135" font-family="sans-serif" font-size="7.5" text-anchor="middle" fill="#b91c1c">Drop, Cover &amp; Hold / Evacuate</text>

  <!-- Connecting Lines -->
  <line x1="260" y1="65" x2="90" y2="100" stroke="#64748b" stroke-width="1.5"/>
  <line x1="260" y1="65" x2="260" y2="100" stroke="#64748b" stroke-width="1.5"/>
  <line x1="260" y1="65" x2="430" y2="100" stroke="#64748b" stroke-width="1.5"/>

  <!-- Evacuation Rule Banner -->
  <rect x="50" y="175" width="420" height="30" fill="#1e1b4b" stroke="#312e81" stroke-width="1" rx="4"/>
  <text x="260" y="194" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#fbbf24">EMERGENCY DRILL: Stay calm → Walk in single line → Gather at open assembly ground</text>
</svg>`,
      "caption": "Figure 5.1: School as a community institution fostering civic ethics and disaster preparedness."
    },
    "diagramQuestions": [
      {
        "q": "What core steps should students follow during an earthquake drill at school?",
        "ans": "Students should 'Drop, Cover, and Hold' under sturdy desks, protect their head, avoid panic, and quietly evacuate in single file to open ground."
      },
      {
        "q": "Why is mutual respect for all school helpers essential in a community?",
        "ans": "Every helper—from teachers to cleaning staff and security guards—plays a vital role in maintaining a safe, hygienic, and productive learning environment."
      }
    ],
    "sectionA": [
      {
        "q": "Why is school described as a 'micro-community'? What social values do students learn here?",
        "ans": "School mirrors broader democratic society. <strong>Values Learned:</strong> <strong>1. Cooperation & Teamwork:</strong> Working with peers from diverse backgrounds in sports and group projects. <strong>2. Civic Discipline:</strong> Following shared rules, punctuality, and queue manners. <strong>3. Equality & Inclusivity:</strong> Treating everyone with dignity regardless of background. <strong>4. Leadership & Responsibility:</strong> Managing class duties and respecting public school property.",
        "tts": "School is a micro community where students learn cooperation, civic discipline, equality, and mutual respect."
      },
      {
        "q": "What is the emergency safety protocol during an earthquake when inside a school building?",
        "ans": "<strong>Protocol:</strong> <strong>1. Drop, Cover, and Hold:</strong> Immediately take cover under a sturdy desk or table and hold its legs firmly. <strong>2. Stay away from glass windows</strong> and heavy cupboards. <strong>3. Evacuate calmly</strong> in a queue without pushing once shaking stops. <strong>4. Assemble in open ground</strong> away from overhead power lines and multi-storey walls.",
        "tts": "During an earthquake, drop, cover, and hold under sturdy desks, avoid panic, and evacuate calmly to the open ground."
      },
      {
        "q": "Describe the roles of various community helpers who keep our school running smoothly.",
        "ans": "<strong>1. Principal:</strong> Academic leadership, safety administration, and overall institutional guidance. <strong>2. Teachers:</strong> Imparting knowledge, moral guidance, and inspiring curiosity. <strong>3. Security Guards:</strong> Ensuring gate security and child safety. <strong>4. Sanitation Staff (Safai Karmis):</strong> Maintaining spotless classrooms, clean washrooms, and preventing diseases. <strong>5. Bus Drivers:</strong> Ensuring safe daily transport.",
        "tts": "School helpers include principals, teachers, security guards, sanitation workers, and bus drivers, each performing indispensable duties."
      },
      {
        "q": "What is inclusive education, and how can students support classmates with special needs?",
        "ans": "<strong>Inclusive education</strong> means welcoming and supporting all children, including those with physical or learning challenges, in regular classrooms. <strong>Support:</strong> Be patient and helpful friends, assist them on ramps or stairs, share notes, avoid teasing, and ensure they are included in all games and activities.",
        "tts": "Inclusive education means welcoming all children including differently abled peers, ensuring friendship and equal opportunity."
      },
      {
        "q": "How can students contribute to keeping their school campus clean and eco-friendly?",
        "ans": "<strong>1. Proper waste segregation:</strong> Throw dry waste in blue bins and wet/food waste in green bins. <strong>2. Switch off lights and fans</strong> when leaving classrooms. <strong>3. Protect greenery:</strong> Water plants and never pluck leaves or flowers. <strong>4. Maintain walls and desks:</strong> Never scribble on school furniture or walls.",
        "tts": "Students can keep schools eco friendly by segregating waste into dustbins, turning off fans, and caring for garden plants."
      }
    ],
    "sectionB": [
      {
        "q": "What does 'Drop, Cover, and Hold' signify during an earthquake?",
        "ans": "It is the standard safety action: Drop to the floor, take Cover under a desk, and Hold on firmly until ground shaking ceases.",
        "tts": "Drop, cover, and hold is the universal safety method during earthquake tremors."
      },
      {
        "q": "What colour dustbins are used for biodegradable wet waste and non-biodegradable dry waste?",
        "ans": "<strong>Green Bin</strong> for wet/food waste and <strong>Blue Bin</strong> for dry recyclable waste (paper, plastic).",
        "tts": "Green dustbins are for wet waste and blue dustbins are for dry waste."
      },
      {
        "q": "Why is the dignity of labour important in school life?",
        "ans": "Because every honest work contributes to community welfare, and respecting all workers fosters humility and equality.",
        "tts": "Dignity of labour teaches respect for every profession and worker."
      },
      {
        "q": "What is a mock fire drill?",
        "ans": "A practice simulation to train students and staff to evacuate buildings swiftly and safely during a fire emergency.",
        "tts": "A fire drill is a practice evacuation session for emergency safety."
      },
      {
        "q": "What is the emergency telephone number for Fire and Ambulance in India?",
        "ans": "<strong>101</strong> for Fire Brigade, <strong>102/108</strong> for Ambulance, and <strong>112</strong> for All-in-One National Emergency Helpline.",
        "tts": "Emergency numbers in India are 101 for fire, 108 for ambulance, and 112 for national emergency."
      }
    ],
    "trueFalse": [
      {"q": "During an earthquake, students should run immediately toward glass windows.", "ans": "False", "reason": "Shattering glass poses severe hazard; stay away from windows and heavy furniture."},
      {"q": "A green dustbin is meant for dry plastic wrappers and glass bottles.", "ans": "False", "reason": "Green bins are for biodegradable organic waste; blue bins are for dry recyclables."},
      {"q": "Sanitation staff perform essential work to protect schools from infectious illnesses.", "ans": "True", "reason": "Hygienic classrooms and clean washrooms prevent the spread of harmful germs."},
      {"q": "Using ramps alongside staircases makes schools accessible to wheelchair users.", "ans": "True", "reason": "Ramps and handrails ensure easy barrier-free movement for differently abled students."},
      {"q": "Scribbling on desks and walls shows good school pride.", "ans": "False", "reason": "Damaging school property reflects poor civic sense and disrespect for public resources."}
    ],
    "oneWord": [
      {"q": "The universal earthquake safety action: Drop, Cover, and __________.", "ans": "Hold"},
      {"q": "Dustbin colour designated for food scraps and fruit peels.", "ans": "Green"},
      {"q": "The practice of welcoming students with diverse abilities into mainstream schools.", "ans": "Inclusive Education"},
      {"q": "National All-in-One Emergency Helpline Number in India.", "ans": "112"},
      {"q": "A practice emergency evacuation exercise conducted in schools.", "ans": "Mock Drill"}
    ],
    "matchFollowing": [
      {"left": "Drop, Cover, Hold", "right": "Earthquake safety protocol", "pair": "Drop, Cover, Hold → Earthquake safety"},
      {"left": "Green Dustbin", "right": "Biodegradable wet food waste", "pair": "Green Dustbin → Biodegradable wet waste"},
      {"left": "Blue Dustbin", "right": "Recyclable dry paper and plastic", "pair": "Blue Dustbin → Recyclable dry waste"},
      {"left": "101", "right": "Fire Brigade Emergency Service", "pair": "101 → Fire Brigade Service"},
      {"left": "Ramps", "right": "Barrier-free access for wheelchair", "pair": "Ramps → Barrier-free access"}
    ],
    "goldenPoints": [
      "School is an inclusive community fostering cooperation, empathy, and citizenship.",
      "Every school helper—teacher, guard, or cleaner—deserves deep respect.",
      "Emergency drills prepare students for earthquakes, fires, and safety crises.",
      "Earthquake safety: Drop to the floor, take Cover under a desk, and Hold firmly.",
      "Waste segregation into Green (wet) and Blue (dry) bins maintains campus hygiene.",
      "Inclusive education ensures barrier-free opportunities for all children.",
      "Conserving electricity and water in school demonstrates civic responsibility.",
      "Preserving public school property is every student's fundamental duty.",
      "Teamwork in sports and cultural activities strengthens social unity.",
      "The All-India unified emergency helpline number is 112."
    ],
    "sectionMCQ": [
      {"q": "What should you do first if you feel earthquake tremors while seated in a classroom?", "options": ["A. Run toward the staircase immediately", "B. Drop, Cover under your sturdy desk and Hold on", "C. Stand on top of the bench", "D. Open glass windows"], "ans": "B. Drop, Cover under your sturdy desk and Hold on", "exp": "Taking cover protects your head and spine from falling debris."},
      {"q": "Which items belong in a green waste bin?", "options": ["A. Banana peels and leftover roti", "B. Plastic pens and foil", "C. Broken glass", "D. Dry batteries"], "ans": "A. Banana peels and leftover roti", "exp": "Organic food waste is biodegradable and goes in green bins for composting."},
      {"q": "What is the emergency helpline number for calling a Fire Brigade in India?", "options": ["A. 100", "B. 101", "C. 108", "D. 1091"], "ans": "B. 101", "exp": "101 connects directly to the Fire Control Room."},
      {"q": "A school architecture featuring ramps and tactile paving is promoting:", "options": ["A. Automobile parking", "B. Accessibility for differently abled students", "C. Roller skating competitions", "D. Rainwater storage"], "ans": "B. Accessibility for differently abled students", "exp": "Ramps allow independent mobility for students using wheelchairs or crutches."},
      {"q": "Why is keeping school desks and walls clean a civic duty?", "options": ["A. It preserves shared community property for all students", "B. To win cash prizes", "C. It is required only on inspection days", "D. Teachers ask for it"], "ans": "A. It preserves shared community property for all students", "exp": "Public school infrastructure is a shared community treasure that must be protected."}
    ]
  },
  {
    "id": 6,
    "title": "The Magnificent Landforms of India",
    "theme": "Unit 2: The Land and Its Wealth",
    "unit": "Unit 2: The Land and Its Wealth",
    "summary": "Covers India's 6 major physical divisions: The Northern Mountains (Himalayas), The Northern Plains, The Great Indian Desert (Thar), The Peninsular Plateau, The Coastal Plains, and The Islands.",
    "diagram": {
      "title": "Fig 6.1: The 6 Major Physical Divisions of India",
      "svg": `<svg viewBox="0 0 520 250" class="w-full h-auto max-w-[480px] mx-auto border border-amber-300 rounded bg-gradient-to-b from-sky-50 to-amber-50 p-2">
  <!-- Northern Mountains -->
  <rect x="20" y="20" width="480" height="32" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5" rx="4"/>
  <text x="260" y="38" font-family="sans-serif" font-size="9.5" font-weight="bold" text-anchor="middle" fill="#0369a1">1. THE NORTHERN MOUNTAINS (The Mighty Himalayas)</text>
  <text x="260" y="48" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#0284c7">Himadri (Greater), Himachal (Lesser), Shiwalik (Outer) • Source of perennial rivers</text>

  <!-- Northern Fertile Plains -->
  <rect x="20" y="58" width="480" height="32" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5" rx="4"/>
  <text x="260" y="76" font-family="sans-serif" font-size="9.5" font-weight="bold" text-anchor="middle" fill="#14532d">2. THE NORTHERN FERTILE PLAINS (Granary of India)</text>
  <text x="260" y="86" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#166534">Ganga, Indus &amp; Brahmaputra basins • Deep rich alluvial soil, dense population</text>

  <!-- Mid Row: Thar Desert & Peninsular Plateau -->
  <rect x="20" y="96" width="235" height="42" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" rx="4"/>
  <text x="137" y="115" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle" fill="#92400e">3. GREAT INDIAN DESERT (Thar)</text>
  <text x="137" y="128" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#b45309">Sand dunes, dry climate, camels, oasis</text>

  <rect x="265" y="96" width="235" height="42" fill="#ffedd5" stroke="#ea580c" stroke-width="1.5" rx="4"/>
  <text x="382" y="115" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle" fill="#9a3412">4. PENINSULAR PLATEAU</text>
  <text x="382" y="128" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#c2410c">Central Highlands &amp; Deccan • Mineral wealth</text>

  <!-- Bottom Row: Coastal Plains & Islands -->
  <rect x="20" y="144" width="235" height="42" fill="#ccfbf1" stroke="#0d9488" stroke-width="1.5" rx="4"/>
  <text x="137" y="163" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle" fill="#115e59">5. COASTAL PLAINS</text>
  <text x="137" y="176" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#0f766e">Western (Narrow) &amp; Eastern (Broad) Coasts</text>

  <rect x="265" y="144" width="235" height="42" fill="#e0e7ff" stroke="#4f46e5" stroke-width="1.5" rx="4"/>
  <text x="382" y="163" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle" fill="#3730a3">6. THE ISLAND GROUPS</text>
  <text x="382" y="176" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#4338ca">Lakshadweep (Arabian Sea) &amp; Andaman (Bay of Bengal)</text>

  <!-- Summary Footer -->
  <rect x="20" y="194" width="480" height="24" fill="#0f172a" rx="4"/>
  <text x="260" y="210" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#fbbf24">India: Unique geographic diversity creating distinct cultures, farming, and climates</text>
</svg>`,
      "caption": "Figure 6.1: Structural overview of India's six diverse physiographic divisions."
    },
    "diagramQuestions": [
      {
        "q": "Why are the Northern Plains called the 'Granary of India'?",
        "ans": "Because the perennial rivers (Ganga, Yamuna, Brahmaputra) continuously deposit deep, fertile alluvial soil, producing bumper crops of wheat and rice."
      },
      {
        "q": "Name the two island groups of India and the respective water bodies where they are situated.",
        "ans": "Lakshadweep Islands are located in the Arabian Sea, and the Andaman and Nicobar Islands are situated in the Bay of Bengal."
      }
    ],
    "sectionA": [
      {
        "q": "Describe the three parallel ranges of the Himalayas and their significance for India.",
        "ans": "The Himalayas comprise three parallel ranges: <strong>1. Himadri (Great Himalayas):</strong> Northernmost, highest range with snow-capped peaks (Mount Everest, Kanchenjunga) and glaciers. <strong>2. Himachal (Lesser Himalayas):</strong> Middle range with pine forests and hill stations (Shimla, Manali). <strong>3. Shiwaliks (Outer Himalayas):</strong> Southernmost foothills prone to landslides. <strong>Significance:</strong> Acts as a climatic barrier blocking freezing Arctic winds and forcing monsoon rains, and is the perennial source of India's sacred rivers.",
        "tts": "The Himalayas have three ranges: Himadri with highest peaks, Himachal with valleys, and Shiwaliks as foothills. They protect India from cold winds and provide river water."
      },
      {
        "q": "Explain the features of the Peninsular Plateau and why it is called India's mineral storehouse.",
        "ans": "The Peninsular Plateau is a triangular, ancient landmass composed of hard crystalline igneous and metamorphic rocks. It consists of the <strong>Central Highlands</strong> (Malwa, Chota Nagpur) in the north and the <strong>Deccan Plateau</strong> in the south, flanked by the Western and Eastern Ghats. <strong>Mineral Wealth:</strong> It contains rich reserves of iron ore, coal, bauxite, manganese, and mica, powering India's industrial backbone.",
        "tts": "The Peninsular Plateau is an ancient triangular tableland rich in minerals like iron ore, coal, and bauxite."
      },
      {
        "q": "Compare the Western Coastal Plains with the Eastern Coastal Plains of India.",
        "ans": "<strong>Western Coastal Plain:</strong> Located between the Western Ghats and the Arabian Sea. Narrow, rocky, with fast streams and natural ports (Mumbai, Kochi). <strong>Eastern Coastal Plain:</strong> Located between the Eastern Ghats and the Bay of Bengal. Broad, level, with massive river deltas (Mahanadi, Godavari, Krishna, Cauvery) and famous beaches (Marina Beach).",
        "tts": "Western coastal plains are narrow with natural ports, while eastern coastal plains are broad with large fertile river deltas."
      },
      {
        "q": "Describe the Great Indian Desert (Thar) and how life adapts to this arid environment.",
        "ans": "The Thar Desert in Rajasthan is a vast sandy expanse with shifting sand dunes, extreme temperature variations (hot days, cold nights), and low rainfall (<15 cm). <strong>Adaptations:</strong> <strong>1. Camel (Ship of the Desert):</strong> Padded feet, hump for fat storage, and long water retention. <strong>2. Vegetation:</strong> Thorny bushes and cactus with deep roots and waxy thorns to prevent transpiration. <strong>3. Indira Gandhi Canal:</strong> Transports Himalayan water to irrigate desert farms.",
        "tts": "The Thar desert has sand dunes and thorny vegetation. Camels with padded feet and the Indira Gandhi Canal support desert life."
      },
      {
        "q": "Explain the geographic significance of India's two major island territories.",
        "ans": "<strong>1. Andaman & Nicobar Islands:</strong> 572 islands in the Bay of Bengal covered in dense tropical rainforests, rich marine coral reefs, and India's only active volcano (Barren Island). <strong>2. Lakshadweep:</strong> 36 coral atoll islands in the Arabian Sea known for clear lagoons. Both are vital for India's maritime defense, fisheries, and naval security.",
        "tts": "Andaman and Nicobar in the Bay of Bengal and Lakshadweep in the Arabian Sea are strategic island territories with rich biodiversity."
      }
    ],
    "sectionB": [
      {
        "q": "What is the highest mountain peak located in India?",
        "ans": "<strong>Kanchenjunga</strong> (8,586 m) in Sikkim is the highest peak in India.",
        "tts": "Kanchenjunga in Sikkim is the highest peak in India."
      },
      {
        "q": "Which animal is known as the 'Ship of the Desert' and why?",
        "ans": "The <strong>Camel</strong>, because its wide padded feet move easily on soft sand without sinking, and it can survive days without water.",
        "tts": "The camel is the ship of the desert due to its padded feet and endurance."
      },
      {
        "q": "Name the two hill ranges that border the Deccan Plateau on the west and east.",
        "ans": "<strong>The Western Ghats (Sahyadri)</strong> and <strong>The Eastern Ghats</strong>.",
        "tts": "The Western Ghats and Eastern Ghats border the Deccan Plateau."
      },
      {
        "q": "What is an Oasis?",
        "ans": "An oasis is a fertile spot in a desert where underground water reaches the surface, allowing date palms and crops to grow.",
        "tts": "An oasis is a fertile water spot in the desert surrounded by date palms."
      },
      {
        "q": "Name the only active volcano in India.",
        "ans": "<strong>Barren Island</strong> in the Andaman and Nicobar Islands.",
        "tts": "Barren Island in the Andaman Sea is India's only active volcano."
      }
    ],
    "trueFalse": [
      {"q": "The Northern Plains of India are thinly populated because of poor soil.", "ans": "False", "reason": "The Northern Plains are the most densely populated region due to flat land and fertile alluvial soil."},
      {"q": "The Western Ghats are continuous hills with very few passes.", "ans": "True", "reason": "Western Ghats form a continuous high wall crossed only through passes like Palghat and Thalghat."},
      {"q": "Lakshadweep islands are formed by volcanic explosions.", "ans": "False", "reason": "Lakshadweep islands are coral atolls formed by coral polyps."},
      {"q": "The Indira Gandhi Canal brings freshwater into parts of the Thar Desert.", "ans": "True", "reason": "The canal channels water from Punjab rivers to green the Rajasthan desert."},
      {"q": "Mount Everest, the highest peak in the world, is located in the Shiwalik range.", "ans": "False", "reason": "Mount Everest is located in the Greater Himalayas (Himadri) in Nepal."}
    ],
    "oneWord": [
      {"q": "The northernmost, highest range of the Himalayas.", "ans": "Himadri (Greater Himalayas)"},
      {"q": "The great sandy desert situated in northwestern India.", "ans": "Thar Desert"},
      {"q": "A triangular piece of land surrounded by water on three sides.", "ans": "Peninsula"},
      {"q": "The coral island group located in the Arabian Sea.", "ans": "Lakshadweep"},
      {"q": "Mounds of loose sand formed by wind action in deserts.", "ans": "Sand Dunes"}
    ],
    "matchFollowing": [
      {"left": "Himadri", "right": "Highest range with glaciers and snow", "pair": "Himadri → Highest snow-capped range"},
      {"left": "Northern Plains", "right": "Alluvial soil and granary of India", "pair": "Northern Plains → Granary of India"},
      {"left": "Thar Desert", "right": "Sand dunes and camel transport", "pair": "Thar Desert → Sand dunes & camels"},
      {"left": "Deccan Plateau", "right": "Mineral-rich ancient tableland", "pair": "Deccan Plateau → Mineral-rich tableland"},
      {"left": "Andaman & Nicobar", "right": "Island chain in the Bay of Bengal", "pair": "Andaman & Nicobar → Islands in Bay of Bengal"}
    ],
    "goldenPoints": [
      "India has 6 physical divisions: Mountains, Plains, Desert, Plateau, Coasts, and Islands.",
      "The Himalayas consist of Himadri (high), Himachal (middle), and Shiwalik (foothills).",
      "The Northern Plains are fertile agricultural zones formed by Indus, Ganga, and Brahmaputra.",
      "The Thar Desert in Rajasthan features extreme heat, sand dunes, and sparse rainfall.",
      "The Peninsular Plateau is a mineral storehouse composed of ancient volcanic rocks.",
      "The Western Coastal Plain is narrow, while the Eastern Coastal Plain is broad with deltas.",
      "Lakshadweep consists of coral islands in the Arabian Sea.",
      "Andaman and Nicobar Islands in the Bay of Bengal contain India's active volcano.",
      "Physical diversity creates different climatic zones, crop patterns, and cultures.",
      "India's landforms provide natural defense, perennial rivers, and immense mineral wealth."
    ],
    "sectionMCQ": [
      {"q": "Which mountain range protects India from cold Siberian winds and captures the monsoon?", "options": ["A. Aravalli", "B. The Himalayas", "C. Satpura", "D. Vindhyas"], "ans": "B. The Himalayas", "exp": "The high Himalayan barrier stops cold northern winds and forces rain-bearing clouds to precipitate."},
      {"q": "The fertile soil brought down and deposited by rivers in the plains is called:", "options": ["A. Black soil", "B. Alluvial soil", "C. Laterite soil", "D. Red soil"], "ans": "B. Alluvial soil", "exp": "Alluvial soil is nutrient-rich silt ideal for wheat, paddy, and sugarcane."},
      {"q": "Where are the Lakshadweep Islands situated?", "options": ["A. Bay of Bengal", "B. Arabian Sea", "C. Pacific Ocean", "D. Red Sea"], "ans": "B. Arabian Sea", "exp": "Lakshadweep is a group of 36 islands located in the Arabian Sea off the Kerala coast."},
      {"q": "What is a major characteristic of plants found in the Thar Desert?", "options": ["A. Broad green leaves", "B. Deep roots and waxy thorns to save water", "C. Submerged under water", "D. Snow needles"], "ans": "B. Deep roots and waxy thorns to save water", "exp": "Desert xerophytes have thorns instead of leaves to prevent transpiration."},
      {"q": "The plateau region of India is especially rich in which natural wealth?", "options": ["A. Coral reefs", "B. Mineral reserves (Iron, Coal, Mica)", "C. Icebergs", "D. Apple orchards"], "ans": "B. Mineral reserves (Iron, Coal, Mica)", "exp": "The Chota Nagpur and Deccan plateaus are India's premier mineral belts."}
    ]
  },
  {
    "id": 7,
    "title": "Climate and Seasons of Our Motherland",
    "theme": "Unit 2: The Land and Its Wealth",
    "unit": "Unit 2: The Land and Its Wealth",
    "summary": "Explores the difference between weather and climate, factors influencing India's monsoon climate, and the traditional Indian 6 seasons (Ritus) alongside modern meteorological seasons.",
    "diagram": {
      "title": "Fig 7.1: The Indian Seasonal Cycle (Ritu Chakra) & Monsoon",
      "svg": `<svg viewBox="0 0 520 230" class="w-full h-auto max-w-[480px] mx-auto border border-amber-300 rounded bg-gradient-to-b from-sky-50 to-orange-50 p-2">
  <!-- Cycle Wheel of 6 Ritus -->
  <circle cx="160" cy="115" r="90" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
  
  <text x="160" y="45" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#dc2626">1. GRISHMA (Summer - May/Jun)</text>
  <text x="235" y="85" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#0284c7">2. VARSHA (Monsoon)</text>
  <text x="235" y="150" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#d97706">3. SHARAD (Autumn)</text>
  <text x="160" y="195" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#4338ca">4. HEMANT (Pre-Winter)</text>
  <text x="85" y="150" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#1e1b4b">5. SHISHIR (Winter)</text>
  <text x="85" y="85" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle" fill="#16a34a">6. VASANT (Spring)</text>

  <circle cx="160" cy="115" r="30" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="160" y="112" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#78350f">RITU</text>
  <text x="160" y="124" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#78350f">CHAKRA</text>

  <!-- Right Block: Monsoon Winds -->
  <rect x="280" y="30" width="225" height="170" fill="#ffffff" stroke="#0284c7" stroke-width="1.5" rx="6"/>
  <text x="392" y="52" font-family="sans-serif" font-size="9.5" font-weight="bold" text-anchor="middle" fill="#0369a1">THE SOUTH-WEST MONSOON</text>
  <text x="392" y="66" font-family="sans-serif" font-size="7.5" text-anchor="middle" fill="#0284c7">Moisture-laden sea winds striking India</text>

  <line x1="300" y1="80" x2="480" y2="80" stroke="#e2e8f0" stroke-width="1"/>

  <text x="300" y="100" font-family="sans-serif" font-size="8" font-weight="bold" fill="#0f172a">• Arabian Sea Branch:</text>
  <text x="310" y="114" font-family="sans-serif" font-size="7.5" fill="#475569">Hits Western Ghats → Heavy coastal rain</text>

  <text x="300" y="134" font-family="sans-serif" font-size="8" font-weight="bold" fill="#0f172a">• Bay of Bengal Branch:</text>
  <text x="310" y="148" font-family="sans-serif" font-size="7.5" fill="#475569">Strikes Northeast hills → Mawsynram</text>

  <text x="300" y="168" font-family="sans-serif" font-size="8" font-weight="bold" fill="#0f172a">• Retreating Monsoon (Oct-Nov):</text>
  <text x="310" y="182" font-family="sans-serif" font-size="7.5" fill="#475569">Brings winter rain to Tamil Nadu coast</text>
</svg>`,
      "caption": "Figure 7.1: The traditional Indian six-season calendar (Ritu Chakra) and Southwest Monsoon dynamics."
    },
    "diagramQuestions": [
      {
        "q": "Which season in the Indian Ritu Chakra corresponds to the South-West Monsoon rains?",
        "ans": "Varsha Ritu ( वर्षा ऋतु - July to August) corresponds to the main Southwest Monsoon rainy season."
      },
      {
        "q": "Why does Mawsynram in Meghalaya receive the world's highest annual rainfall?",
        "ans": "Because the Bay of Bengal monsoon winds are funnelled into the steep Khasi Hills, forcing massive, continuous precipitation."
      }
    ],
    "sectionA": [
      {
        "q": "What is the difference between Weather and Climate? Give examples.",
        "ans": "<strong>Weather:</strong> The day-to-day atmospheric conditions (temperature, humidity, rain, wind) of a specific place at a particular time (e.g., 'Today is sunny and humid in Raebareli'). <strong>Climate:</strong> The average pattern of weather conditions observed over a large region over a long period of 30 to 35 years (e.g., 'India has a Tropical Monsoon Climate').",
        "tts": "Weather is daily atmospheric change, while climate is the average weather pattern over 30 years."
      },
      {
        "q": "Explain the mechanism of the South-West Monsoon and why it is the lifeline of Indian agriculture.",
        "ans": "During summer, intense heat creates a low-pressure area over northern India. Cool, moisture-laden winds blow from the high-pressure Indian Ocean and Arabian Sea toward the mainland. <strong>Lifeline:</strong> Over 70% of Indian farmland depends on monsoon rains for sowing Kharif crops (rice, maize, cotton, pulses). A timely monsoon ensures agricultural prosperity and fills reservoirs.",
        "tts": "The Southwest Monsoon brings sea winds that supply 70 percent of India's rain, sustaining Kharif crops and reservoirs."
      },
      {
        "q": "Describe the traditional Indian Six Seasons (Shad-Ritu) and their English counterparts.",
        "ans": "The ancient Indian calendar divides the year into six distinct two-month Ritus: <strong>1. Vasant (Spring):</strong> March–April (blooming flowers). <strong>2. Grishma (Summer):</strong> May–June (hot days). <strong>3. Varsha (Monsoon):</strong> July–August (heavy rain). <strong>4. Sharad (Autumn):</strong> September–October (clear skies, festivals). <strong>5. Hemant (Pre-Winter):</strong> November–December (mild cold). <strong>6. Shishir (Winter):</strong> January–February (frost and chills).",
        "tts": "The six Indian seasons are Vasant spring, Grishma summer, Varsha monsoon, Sharad autumn, Hemant pre-winter, and Shishir winter."
      },
      {
        "q": "What factors influence the climate of different regions in India?",
        "ans": "<strong>1. Latitude:</strong> Southern India is closer to the Equator and warmer than North India. <strong>2. Altitude (Height):</strong> Hill stations like Shimla and Ooty are cooler than plains. <strong>3. Distance from Sea:</strong> Coastal areas (Mumbai, Chennai) have a moderate climate, whereas inland places (Delhi) face extreme summers and winters. <strong>4. The Himalayas:</strong> Block Arctic winds and trap the monsoon.",
        "tts": "Climate in India is shaped by distance from equator, altitude, distance from the sea, and the protective Himalayas."
      },
      {
        "q": "What is the 'Loo' and what precautions should be taken during severe summer heatwaves?",
        "ans": "The <strong>Loo</strong> is a strong, scorching, dusty hot wind that blows across the plains of northern India in May and June afternoons. <strong>Precautions:</strong> Stay indoors during peak afternoon hours, drink plenty of water, lemon water (Nimbu Pani), and raw mango cooler (Aam Panna), and wear light-coloured loose cotton clothes.",
        "tts": "Loo is the hot summer wind of North India. Drink plenty of water and stay indoors during afternoons."
      }
    ],
    "sectionB": [
      {
        "q": "Which place in India (and the world) receives the highest annual rainfall?",
        "ans": "<strong>Mawsynram</strong> in the Khasi Hills of Meghalaya.",
        "tts": "Mawsynram in Meghalaya receives the highest rainfall in the world."
      },
      {
        "q": "What are the two major agricultural crop seasons in India?",
        "ans": "<strong>Kharif Season</strong> (monsoon crops like rice, cotton) and <strong>Rabi Season</strong> (winter crops like wheat, mustard).",
        "tts": "The two main crop seasons are Kharif in monsoon and Rabi in winter."
      },
      {
        "q": "Why do coastal cities like Mumbai and Chennai not experience severe winters?",
        "ans": "Because the adjacent sea has a moderating effect on coastal temperatures, keeping winters mild and humid.",
        "tts": "Coastal cities have mild winters due to the moderating influence of the sea."
      },
      {
        "q": "What is the Retreating Monsoon?",
        "ans": "During October and November, monsoon winds reverse direction and withdraw from north India, bringing rain to the Tamil Nadu coast.",
        "tts": "The retreating monsoon is the withdrawal of monsoon winds bringing rain to Tamil Nadu."
      },
      {
        "q": "Which traditional Indian drink is consumed to protect against summer heat and Loo?",
        "ans": "<strong>Aam Panna</strong> (roasted raw mango drink) and <strong>Chhach (Buttermilk)</strong>.",
        "tts": "Aam Panna and buttermilk protect against heat stroke and Loo."
      }
    ],
    "trueFalse": [
      {"q": "Weather and Climate have exactly the same meaning in science.", "ans": "False", "reason": "Weather changes daily, while climate is a 30-year average weather pattern."},
      {"q": "The South-West Monsoon arrives in India first on the coast of Kerala around June 1st.", "ans": "True", "reason": "The Arabian Sea monsoon branch strikes the Kerala coast first in early June."},
      {"q": "Mawsynram in Meghalaya is the driest desert in India.", "ans": "False", "reason": "Mawsynram is the wettest place on Earth; Thar in Rajasthan is India's driest desert."},
      {"q": "Tamil Nadu receives most of its rainfall during the winter / retreating monsoon season.", "ans": "True", "reason": "Northeast retreating monsoon winds pick up moisture from the Bay of Bengal to rain on Tamil Nadu."},
      {"q": "Cotton clothes are best suited for freezing winter weather.", "ans": "False", "reason": "Woollen clothes trap body heat in winter; cotton is ideal for summer."}
    ],
    "oneWord": [
      {"q": "The scientific study and daily forecasting of weather.", "ans": "Meteorology"},
      {"q": "The wettest place on Earth located in Meghalaya.", "ans": "Mawsynram"},
      {"q": "The hot, dry wind blowing in northern Indian plains during summer.", "ans": "Loo"},
      {"q": "The winter crop season in India (e.g., wheat, mustard).", "ans": "Rabi"},
      {"q": "Traditional Indian season of blooming flowers and mild warmth.", "ans": "Vasant (Spring)"}
    ],
    "matchFollowing": [
      {"left": "Mawsynram", "right": "Highest annual rainfall in the world", "pair": "Mawsynram → Highest rainfall in world"},
      {"left": "Loo", "right": "Hot summer wind in North India", "pair": "Loo → Hot summer wind in North"},
      {"left": "Kharif Crops", "right": "Sown during monsoon (Paddy, Maize)", "pair": "Kharif Crops → Monsoon crops like Paddy"},
      {"left": "Rabi Crops", "right": "Sown in winter (Wheat, Mustard)", "pair": "Rabi Crops → Winter crops like Wheat"},
      {"left": "Vasant", "right": "Spring season of flowers", "pair": "Vasant → Spring season of flowers"}
    ],
    "goldenPoints": [
      "Weather refers to daily atmospheric conditions; climate is a long-term average.",
      "India has a Tropical Monsoon climate dominated by seasonal wind reversals.",
      "The 6 Indian Ritus are Vasant, Grishma, Varsha, Sharad, Hemant, and Shishir.",
      "The Southwest Monsoon strikes Kerala in June and brings nationwide rain.",
      "Mawsynram in Meghalaya receives the highest annual rainfall on Earth.",
      "The hot, dry wind of northern Indian summer is called 'Loo'.",
      "Kharif crops (rice) rely on monsoon rain; Rabi crops (wheat) grow in winter.",
      "Retreating monsoon brings winter rainfall to the Coromandel (Tamil Nadu) coast.",
      "The Himalayas prevent cold Central Asian winds from entering India.",
      "Climate influences food habits, housing, clothing, and cultural celebrations."
    ],
    "sectionMCQ": [
      {"q": "The monsoon rains in India are brought primarily by which winds?", "options": ["A. North-East winds", "B. South-West Monsoon winds", "C. Westerly jet streams", "D. Polar easterlies"], "ans": "B. South-West Monsoon winds", "exp": "The Southwest Monsoon blowing from the ocean brings over 70% of India's annual rain."},
      {"q": "Which state in India is the first to witness the arrival of the summer monsoon?", "options": ["A. Uttar Pradesh", "B. Kerala", "C. Rajasthan", "D. Punjab"], "ans": "B. Kerala", "exp": "The monsoon arrives on the Kerala coast around June 1st each year."},
      {"q": "Wheat, gram, and mustard are typical examples of which crop season?", "options": ["A. Zaid crops", "B. Kharif crops", "C. Rabi crops", "D. Monsoon crops"], "ans": "C. Rabi crops", "exp": "Rabi crops are sown in winter (October-November) and harvested in spring."},
      {"q": "What is the primary reason hill stations like Ooty and Shimla are cool even in summer?", "options": ["A. Nearness to the sea", "B. High Altitude (elevation above sea level)", "C. Absence of trees", "D. Desert winds"], "ans": "B. High Altitude (elevation above sea level)", "exp": "Temperature drops with increasing elevation above sea level."},
      {"q": "Which Indian Ritu corresponds to the crisp, festive autumn season of September-October?", "options": ["A. Sharad Ritu", "B. Shishir Ritu", "C. Grishma Ritu", "D. Varsha Ritu"], "ans": "A. Sharad Ritu", "exp": "Sharad Ritu brings clear post-monsoon skies and major festivals like Dussehra and Diwali."}
    ]
  },
  {
    "id": 8,
    "title": "Natural Vegetation and Wildlife of India",
    "theme": "Unit 2: The Land and Its Wealth",
    "unit": "Unit 2: The Land and Its Wealth",
    "summary": "Explores India's rich biodiversity, 5 major forest types (Tropical Evergreen, Deciduous/Monsoon, Thorny, Mountain, Mangrove), National Parks, Wildlife Sanctuaries, and wildlife conservation.",
    "diagram": {
      "title": "Fig 8.1: Major Forest Types and Wildlife Conservation in India",
      "svg": `<svg viewBox="0 0 520 230" class="w-full h-auto max-w-[480px] mx-auto border border-amber-300 rounded bg-gradient-to-b from-emerald-50 to-green-50 p-2">
  <!-- 5 Forest Boxes -->
  <rect x="15" y="20" width="90" height="70" fill="#065f46" stroke="#047857" stroke-width="1.5" rx="4"/>
  <text x="60" y="38" font-family="sans-serif" font-size="7.5" font-weight="bold" text-anchor="middle" fill="#ffffff">1. EVERGREEN</text>
  <text x="60" y="52" font-family="sans-serif" font-size="6.5" text-anchor="middle" fill="#a7f3d0">Heavy rain &gt;200cm</text>
  <text x="60" y="64" font-family="sans-serif" font-size="6.5" text-anchor="middle" fill="#ecfdf5">Rosewood, Ebony</text>
  <text x="60" y="76" font-family="sans-serif" font-size="6.5" text-anchor="middle" fill="#ecfdf5">W. Ghats, NE Hills</text>

  <rect x="115" y="20" width="90" height="70" fill="#15803d" stroke="#16a34a" stroke-width="1.5" rx="4"/>
  <text x="160" y="38" font-family="sans-serif" font-size="7.5" font-weight="bold" text-anchor="middle" fill="#ffffff">2. DECIDUOUS</text>
  <text x="160" y="52" font-family="sans-serif" font-size="6.5" text-anchor="middle" fill="#bbf7d0">Monsoon Forests</text>
  <text x="160" y="64" font-family="sans-serif" font-size="6.5" text-anchor="middle" fill="#f0fdf4">Teak, Sal, Shisham</text>
  <text x="160" y="76" font-family="sans-serif" font-size="6.5" text-anchor="middle" fill="#f0fdf4">Shed leaves in dry</text>

  <rect x="215" y="20" width="90" height="70" fill="#b45309" stroke="#d97706" stroke-width="1.5" rx="4"/>
  <text x="260" y="38" font-family="sans-serif" font-size="7.5" font-weight="bold" text-anchor="middle" fill="#ffffff">3. THORN &amp; SCRUB</text>
  <text x="260" y="52" font-family="sans-serif" font-size="6.5" text-anchor="middle" fill="#fde68a">Rain &lt;70cm</text>
  <text x="260" y="64" font-family="sans-serif" font-size="6.5" text-anchor="middle" fill="#fef3c7">Acacia (Kikar), Cactus</text>
  <text x="260" y="76" font-family="sans-serif" font-size="6.5" text-anchor="middle" fill="#fef3c7">Rajasthan, Gujarat</text>

  <rect x="315" y="20" width="90" height="70" fill="#0284c7" stroke="#0369a1" stroke-width="1.5" rx="4"/>
  <text x="360" y="38" font-family="sans-serif" font-size="7.5" font-weight="bold" text-anchor="middle" fill="#ffffff">4. MOUNTAIN</text>
  <text x="360" y="52" font-family="sans-serif" font-size="6.5" text-anchor="middle" fill="#bae6fd">Coniferous trees</text>
  <text x="360" y="64" font-family="sans-serif" font-size="6.5" text-anchor="middle" fill="#f0f9ff">Pine, Deodar, Oak</text>
  <text x="360" y="76" font-family="sans-serif" font-size="6.5" text-anchor="middle" fill="#f0f9ff">Himalayan slopes</text>

  <rect x="415" y="20" width="90" height="70" fill="#0f766e" stroke="#0d9488" stroke-width="1.5" rx="4"/>
  <text x="460" y="38" font-family="sans-serif" font-size="7.5" font-weight="bold" text-anchor="middle" fill="#ffffff">5. MANGROVE</text>
  <text x="460" y="52" font-family="sans-serif" font-size="6.5" text-anchor="middle" fill="#99f6e4">Tidal Delta zones</text>
  <text x="460" y="64" font-family="sans-serif" font-size="6.5" text-anchor="middle" fill="#f0fdfa">Sundari tree</text>
  <text x="460" y="76" font-family="sans-serif" font-size="6.5" text-anchor="middle" fill="#f0fdfa">Royal Bengal Tiger</text>

  <!-- Conservation Banner -->
  <rect x="15" y="105" width="490" height="110" fill="#ffffff" stroke="#16a34a" stroke-width="1.5" rx="6"/>
  <text x="260" y="125" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle" fill="#14532d">WILDLIFE CONSERVATION IN INDIA</text>
  
  <rect x="30" y="135" width="140" height="70" fill="#f0fdf4" stroke="#86efac" stroke-width="1" rx="4"/>
  <text x="100" y="152" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#15803d">NATIONAL PARKS</text>
  <text x="100" y="166" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#334155">Jim Corbett, Kaziranga</text>
  <text x="100" y="178" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#334155">Gir (Asiatic Lion)</text>
  <text x="100" y="192" font-family="sans-serif" font-size="7" font-weight="bold" text-anchor="middle" fill="#166534">Strict protection</text>

  <rect x="190" y="135" width="140" height="70" fill="#fefce8" stroke="#fde047" stroke-width="1" rx="4"/>
  <text x="260" y="152" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#854d0e">WILDLIFE SANCTUARY</text>
  <text x="260" y="166" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#334155">Bharatpur (Bird Paradise)</text>
  <text x="260" y="178" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#334155">Periyar (Elephants)</text>
  <text x="260" y="192" font-family="sans-serif" font-size="7" font-weight="bold" text-anchor="middle" fill="#854d0e">Habitat protection</text>

  <rect x="350" y="135" width="140" height="70" fill="#eff6ff" stroke="#93c5fd" stroke-width="1" rx="4"/>
  <text x="420" y="152" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#1e40af">PROJECT TIGER (1973)</text>
  <text x="420" y="166" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#334155">National Animal Protection</text>
  <text x="420" y="178" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#334155">Rhino &amp; Elephant Projects</text>
  <text x="420" y="192" font-family="sans-serif" font-size="7" font-weight="bold" text-anchor="middle" fill="#1d4ed8">Eco-balance restored</text>
</svg>`,
      "caption": "Figure 8.1: Classification of India's five major forest types and wildlife protection sanctuaries."
    },
    "diagramQuestions": [
      {
        "q": "Which forest type is also known as 'Monsoon Forest' and what is its special adaptation?",
        "ans": "Tropical Deciduous Forests are called Monsoon Forests; their trees shed leaves for 6 to 8 weeks during dry summer to conserve moisture."
      },
      {
        "q": "Name the famous forest in the Ganga-Brahmaputra delta known for the Royal Bengal Tiger.",
        "ans": "The Sundarbans Mangrove Forest, named after the prominent Sundari tree species."
      }
    ],
    "sectionA": [
      {
        "q": "Classify the five major types of natural vegetation found in India with characteristic trees.",
        "ans": "<strong>1. Tropical Evergreen Forests:</strong> Dense, multi-layered, green year-round in heavy rainfall zones (>200 cm) (Ebony, Mahogany, Rosewood). <strong>2. Tropical Deciduous (Monsoon) Forests:</strong> Most widespread; shed leaves in dry season (Teak, Sal, Shisham, Sandalwood). <strong>3. Thorn & Scrub Forests:</strong> Semi-arid regions with thorny cactus and acacia (Kikar, Babool). <strong>4. Mountain (Montane) Forests:</strong> Coniferous trees on cold Himalayan slopes (Pine, Deodar, Oak). <strong>5. Mangrove (Tidal) Forests:</strong> Saline coastal deltas with breathing roots (Sundari tree in Sundarbans).",
        "tts": "India has five forest types: Evergreen in heavy rain, Deciduous monsoon forests, Thorn in deserts, Montane pine in mountains, and Mangrove in coastal deltas."
      },
      {
        "q": "Why are forests essential for maintaining ecological balance and supporting human life?",
        "ans": "<strong>1. Oxygen & Carbon Sink:</strong> Forests absorb carbon dioxide and generate oxygen through photosynthesis. <strong>2. Soil & Water Conservation:</strong> Tree roots bind soil to prevent erosion and recharge groundwater. <strong>3. Economic Resources:</strong> Provide timber, medicinal herbs, gum, resin, and firewood. <strong>4. Wildlife Habitat:</strong> Act as natural homes for thousands of animal and bird species.",
        "tts": "Forests produce oxygen, prevent soil erosion, recharge groundwater, provide timber and medicine, and shelter wildlife."
      },
      {
        "q": "Explain the difference between a National Park, a Wildlife Sanctuary, and a Biosphere Reserve.",
        "ans": "<strong>National Park:</strong> Strictly protected area reserved for wildlife where human activities, grazing, and private forestry are strictly prohibited (e.g., Jim Corbett, Kaziranga). <strong>Wildlife Sanctuary:</strong> Protects specific wild species; limited human activities like timber collection without harming animals may be allowed (e.g., Bharatpur, Periyar). <strong>Biosphere Reserve:</strong> Large multi-purpose protected ecosystem preserving flora, fauna, and indigenous tribal culture (e.g., Nilgiri).",
        "tts": "National Parks have strict protection with no human activity, Wildlife Sanctuaries protect specific animals, and Biosphere Reserves preserve entire ecosystems."
      },
      {
        "q": "Describe the Asiatic Lion's unique habitat and the significance of Project Tiger.",
        "ans": "<strong>Asiatic Lion:</strong> Found only in the wild in the <strong>Gir Forest National Park in Gujarat</strong>. <strong>Project Tiger (launched in 1973):</strong> A landmark national conservation initiative to save India's National Animal (Royal Bengal Tiger) from extinction due to poaching and habitat loss, establishing over 50 dedicated Tiger Reserves.",
        "tts": "Asiatic lions survive only in Gir forest in Gujarat. Project Tiger protects India's national animal across 50 tiger reserves."
      },
      {
        "q": "What is the Chipko Movement and what lesson does it provide for modern conservation?",
        "ans": "Started in the 1970s in the Uttarakhand Himalayas by villagers (led by Gaura Devi and Sunderlal Bahuguna), people hugged forest trees to prevent commercial loggers from cutting them down. <strong>Lesson:</strong> Local community participation and peaceful environmental activism are vital to protect forests and water sources.",
        "tts": "The Chipko Movement saw villagers hugging trees to prevent deforestation, proving that community action protects nature."
      }
    ],
    "sectionB": [
      {
        "q": "Which is the National Animal and National Bird of India?",
        "ans": "<strong>Royal Bengal Tiger</strong> is the National Animal; <strong>Indian Peacock (Mayur)</strong> is the National Bird.",
        "tts": "The Royal Bengal Tiger is our National Animal and the Peacock is our National Bird."
      },
      {
        "q": "Where is Kaziranga National Park located and what is it famous for?",
        "ans": "Located in <strong>Assam</strong>, Kaziranga is world-famous for protecting the endangered <strong>Great Indian One-Horned Rhinoceros</strong>.",
        "tts": "Kaziranga in Assam is famous for the one-horned rhinoceros."
      },
      {
        "q": "What are breathing roots (pneumatophores) in mangrove trees?",
        "ans": "Special roots that grow upward out of waterlogged saline mud into the air to breathe oxygen for the tree.",
        "tts": "Breathing roots in mangroves grow above saline waterlogged mud to absorb oxygen."
      },
      {
        "q": "Name the state known for Gir National Park.",
        "ans": "<strong>Gujarat</strong>.",
        "tts": "Gir National Park is in Gujarat."
      },
      {
        "q": "Name two important timber trees found in Deciduous Forests.",
        "ans": "<strong>Teak (Sagwan)</strong> and <strong>Sal</strong>.",
        "tts": "Teak and Sal are key trees in deciduous forests."
      }
    ],
    "trueFalse": [
      {"q": "Tropical Evergreen forests shed all their leaves together in summer.", "ans": "False", "reason": "Evergreen trees shed leaves at different times of the year, appearing green continuously."},
      {"q": "The Asiatic Lion is found in the wild only in the Gir Forest of Gujarat.", "ans": "True", "reason": "Gir National Park is the last natural refuge of the endangered Asiatic Lion."},
      {"q": "Deforestation causes an increase in rainfall and prevents floods.", "ans": "False", "reason": "Cutting forests causes soil erosion, severe flooding, and declining rainfall."},
      {"q": "Sundari trees in the Sundarbans delta give the forest its name.", "ans": "True", "reason": "Sundarbans delta is named after the abundant Sundari mangrove trees."},
      {"q": "Hunting of wild animals is legally permitted in all National Parks.", "ans": "False", "reason": "Poaching and hunting are strictly punishable crimes under the Wildlife Protection Act."}
    ],
    "oneWord": [
      {"q": "The world-famous one-horned rhinoceros sanctuary located in Assam.", "ans": "Kaziranga National Park"},
      {"q": "Forests whose trees shed their leaves in the dry summer season.", "ans": "Deciduous (Monsoon) Forests"},
      {"q": "Special upward-growing roots that allow mangrove trees to breathe.", "ans": "Breathing Roots (Pneumatophores)"},
      {"q": "The famous movement in Uttarakhand where villagers hugged trees to save them.", "ans": "Chipko Movement"},
      {"q": "The National Animal of India.", "ans": "Royal Bengal Tiger"}
    ],
    "matchFollowing": [
      {"left": "Gir Forest", "right": "Asiatic Lion (Gujarat)", "pair": "Gir Forest → Asiatic Lion in Gujarat"},
      {"left": "Kaziranga", "right": "One-horned Rhinoceros (Assam)", "pair": "Kaziranga → One-horned Rhinoceros in Assam"},
      {"left": "Sundarbans", "right": "Mangrove forest & Royal Bengal Tiger", "pair": "Sundarbans → Mangroves & Bengal Tiger"},
      {"left": "Jim Corbett", "right": "First National Park of India (Uttarakhand)", "pair": "Jim Corbett → First National Park of India"},
      {"left": "Coniferous Pine", "right": "Mountain Montane Forest", "pair": "Coniferous Pine → Mountain Forest"}
    ],
    "goldenPoints": [
      "India's vegetation ranges from tropical rainforests to desert scrub and alpine meadows.",
      "Deciduous forests are India's most widespread forest type (Teak, Sal).",
      "Evergreen forests thrive in high-rainfall zones of Western Ghats and Northeast.",
      "Sundarbans is the world's largest mangrove forest, home to the Royal Bengal Tiger.",
      "Asiatic lions survive in the wild exclusively in Gujarat's Gir National Park.",
      "Kaziranga in Assam protects the endangered Great One-Horned Rhinoceros.",
      "Project Tiger (1973) successfully saved the Bengal Tiger from extinction.",
      "Forests produce oxygen, prevent soil erosion, and regulate regional rainfall.",
      "National Parks and Sanctuaries provide legal protection against hunting and habitat loss.",
      "The Chipko Movement demonstrated the power of community tree conservation."
    ],
    "sectionMCQ": [
      {"q": "Which forest type occupies the largest geographic area in India?", "options": ["A. Mangrove Forests", "B. Tropical Deciduous (Monsoon) Forests", "C. Alpine Meadows", "D. Desert Scrub"], "ans": "B. Tropical Deciduous (Monsoon) Forests", "exp": "Deciduous forests are the most widespread, yielding valuable Teak and Sal timber."},
      {"q": "The only natural home of the Asiatic Lion in the entire world is:", "options": ["A. Jim Corbett National Park", "B. Gir National Park (Gujarat)", "C. Periyar Sanctuary", "D. Sundarbans"], "ans": "B. Gir National Park (Gujarat)", "exp": "Gir Forest in Saurashtra, Gujarat is the last sanctuary for wild Asiatic Lions."},
      {"q": "Which rare animal is protected in Kaziranga National Park, Assam?", "options": ["A. Snow Leopard", "B. One-Horned Rhinoceros", "C. Polar Bear", "D. Kangaroo"], "ans": "B. One-Horned Rhinoceros", "exp": "Kaziranga is famous for the conservation of the Great Indian One-Horned Rhinoceros."},
      {"q": "Trees with cone shapes and needle-like leaves (Pine, Deodar) are found in:", "options": ["A. Desert Forests", "B. Mountain (Montane) Forests", "C. Tidal Mangroves", "D. Coastal Plains"], "ans": "B. Mountain (Montane) Forests", "exp": "Coniferous trees with needle leaves are adapted to shed snow in cold mountain zones."},
      {"q": "In which year was 'Project Tiger' launched in India to save the national animal?", "options": ["A. 1947", "B. 1973", "C. 2005", "D. 2020"], "ans": "B. 1973", "exp": "Project Tiger was launched in 1973 to protect declining tiger populations across India."}
    ]
  },
  {
    "id": 9,
    "title": "Mineral and Energy Wealth of India",
    "theme": "Unit 2: The Land and Its Wealth",
    "unit": "Unit 2: The Land and Its Wealth",
    "summary": "Covers metallic (iron, copper, bauxite, gold) and non-metallic minerals (coal, petroleum, limestone), conventional vs non-conventional renewable energy (solar, wind, hydro), and conservation.",
    "diagram": {
      "title": "Fig 9.1: Renewable vs Non-Renewable Energy Sources",
      "svg": `<svg viewBox="0 0 520 230" class="w-full h-auto max-w-[480px] mx-auto border border-amber-300 rounded bg-gradient-to-b from-amber-50 to-blue-50 p-2">
  <!-- Left Box: Non-Renewable (Fossil Fuels) -->
  <rect x="20" y="20" width="230" height="150" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" rx="6"/>
  <text x="135" y="42" font-family="sans-serif" font-size="9.5" font-weight="bold" text-anchor="middle" fill="#991b1b">NON-RENEWABLE (Exhaustible)</text>
  <text x="135" y="55" font-family="sans-serif" font-size="7.5" text-anchor="middle" fill="#b91c1c">Take millions of years to form • Cause smoke</text>

  <rect x="35" y="65" width="200" height="30" fill="#ffffff" stroke="#f87171" stroke-width="1" rx="4"/>
  <text x="45" y="83" font-family="sans-serif" font-size="8.5" font-weight="bold" fill="#000000">1. COAL (Black Diamond):</text>
  <text x="180" y="83" font-family="sans-serif" font-size="7.5" fill="#475569">Jharia, Raniganj</text>

  <rect x="35" y="100" width="200" height="30" fill="#ffffff" stroke="#f87171" stroke-width="1" rx="4"/>
  <text x="45" y="118" font-family="sans-serif" font-size="8.5" font-weight="bold" fill="#000000">2. PETROLEUM (Liquid Gold):</text>
  <text x="195" y="118" font-family="sans-serif" font-size="7.5" fill="#475569">Bombay High, Digboi</text>

  <rect x="35" y="135" width="200" height="28" fill="#ffffff" stroke="#f87171" stroke-width="1" rx="4"/>
  <text x="45" y="152" font-family="sans-serif" font-size="8.5" font-weight="bold" fill="#000000">3. NATURAL GAS (CNG):</text>
  <text x="175" y="152" font-family="sans-serif" font-size="7.5" fill="#475569">Clean fuel for vehicles</text>

  <!-- Right Box: Renewable (Green Energy) -->
  <rect x="270" y="20" width="230" height="150" fill="#ecfdf5" stroke="#10b981" stroke-width="1.5" rx="6"/>
  <text x="385" y="42" font-family="sans-serif" font-size="9.5" font-weight="bold" text-anchor="middle" fill="#065f46">RENEWABLE (Inexhaustible / Clean)</text>
  <text x="385" y="55" font-family="sans-serif" font-size="7.5" text-anchor="middle" fill="#047857">Never run out • Zero carbon pollution</text>

  <rect x="285" y="65" width="200" height="30" fill="#ffffff" stroke="#6ee7b7" stroke-width="1" rx="4"/>
  <text x="295" y="83" font-family="sans-serif" font-size="8.5" font-weight="bold" fill="#059669">1. SOLAR ENERGY:</text>
  <text x="390" y="83" font-family="sans-serif" font-size="7.5" fill="#475569">Sunlight into power</text>

  <rect x="285" y="100" width="200" height="30" fill="#ffffff" stroke="#6ee7b7" stroke-width="1" rx="4"/>
  <text x="295" y="118" font-family="sans-serif" font-size="8.5" font-weight="bold" fill="#0284c7">2. WIND ENERGY:</text>
  <text x="385" y="118" font-family="sans-serif" font-size="7.5" fill="#475569">Windmills in TN &amp; Gujarat</text>

  <rect x="285" y="135" width="200" height="28" fill="#ffffff" stroke="#6ee7b7" stroke-width="1" rx="4"/>
  <text x="295" y="152" font-family="sans-serif" font-size="8.5" font-weight="bold" fill="#4f46e5">3. HYDROELECTRICITY:</text>
  <text x="420" y="152" font-family="sans-serif" font-size="7.5" fill="#475569">Water turbine power</text>

  <!-- Bottom Core Tip -->
  <rect x="20" y="180" width="480" height="32" fill="#0f172a" rx="4"/>
  <text x="260" y="200" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#fbbf24">ENERGY CONSERVATION: Switch to Solar &amp; LED • Turn off unused appliances</text>
</svg>`,
      "caption": "Figure 9.1: Comparison between exhaustible fossil fuels and sustainable renewable green energy sources."
    },
    "diagramQuestions": [
      {
        "q": "Why is petroleum often called 'Liquid Gold'?",
        "ans": "Because crude petroleum yields indispensable commercial fuels (petrol, diesel, kerosene, LPG) and raw materials for plastics, medicines, and lubricants."
      },
      {
        "q": "State two major benefits of switching to Solar and Wind energy.",
        "ans": "Solar and wind are clean, inexhaustible green energy sources that produce zero greenhouse smoke and reduce dependence on costly imported oil."
      }
    ],
    "sectionA": [
      {
        "q": "What are minerals? Differentiate between Metallic and Non-Metallic minerals with examples.",
        "ans": "<strong>Minerals</strong> are naturally occurring chemical compounds found within the Earth's crust. <strong>1. Metallic Minerals:</strong> Contain metals, have a shine, and can be melted and shaped into wires and sheets (e.g., Iron Ore, Bauxite for aluminium, Copper, Gold). <strong>2. Non-Metallic Minerals:</strong> Do not contain metals and break upon hard impact (e.g., Coal, Petroleum, Limestone, Mica, Gypsum).",
        "tts": "Metallic minerals contain metals like iron and gold, while non-metallic minerals include coal, petroleum, and limestone."
      },
      {
        "q": "Differentiate between Conventional (Exhaustible) and Non-Conventional (Renewable) energy sources.",
        "ans": "<strong>Conventional Energy (Fossil Fuels):</strong> Coal, petroleum, and natural gas. They took millions of years of heat and pressure to form from ancient buried plants and organisms. They are finite, exhaustible, and create air pollution. <strong>Non-Conventional Energy:</strong> Solar, wind, hydro, and biogas. They are clean, infinite, eco-friendly, and replenish naturally every single day.",
        "tts": "Conventional energy like coal is exhaustible and polluting, while renewable energy like solar and wind is clean and infinite."
      },
      {
        "q": "Describe the key mineral-rich belts of India and their strategic economic importance.",
        "ans": "<strong>1. Chota Nagpur Plateau (Jharkhand, Odisha, West Bengal):</strong> India's primary industrial mineral hub holding rich iron ore, coal, and mica mines. <strong>2. Bombay High (Arabian Sea):</strong> India's premier offshore petroleum and natural gas drilling field. <strong>3. Digboi (Assam):</strong> India's oldest continuously operating oil well. <strong>4. Kolar & Hutti (Karnataka):</strong> Historical gold mining centres.",
        "tts": "Key mineral belts include Chota Nagpur plateau for iron and coal, Bombay High for offshore oil, and Digboi for petroleum."
      },
      {
        "q": "Why is it imperative to conserve minerals and fossil fuels? What steps can we take?",
        "ans": "<strong>Why Conserve:</strong> Minerals and fossil fuels are non-renewable; once depleted, they cannot be replaced in human lifetimes. Burning excessive coal and oil causes global warming. <strong>Action Steps:</strong> <strong>1.</strong> Adopt 3R principles (Reduce, Reuse, Recycle scrap metal). <strong>2.</strong> Switch to solar panels and LED lighting. <strong>3.</strong> Use public transport, carpooling, and electric vehicles (EVs). <strong>4.</strong> Turn off electricity switches when leaving rooms.",
        "tts": "Conserve fossil fuels because they cannot be replaced. Use solar energy, recycle metals, use public transport, and turn off unused lights."
      },
      {
        "q": "What is Hydroelectricity and how is it generated at multi-purpose dams?",
        "ans": "<strong>Hydroelectricity</strong> is clean electrical power generated by harnessing the kinetic force of falling river water. Water stored behind high dam reservoirs is released through large penstock pipes to spin powerful hydraulic turbines, which rotate electric generators to produce electricity with zero smoke emissions.",
        "tts": "Hydroelectricity is clean power generated when falling dam water spins turbines connected to electrical generators."
      }
    ],
    "sectionB": [
      {
        "q": "Which mineral ore is used for extracting aluminium metal?",
        "ans": "<strong>Bauxite Ore</strong>.",
        "tts": "Bauxite is the ore used to extract aluminium."
      },
      {
        "q": "Which mineral is commonly known as 'Black Diamond'?",
        "ans": "<strong>Coal</strong>, because of its immense value as a fossil fuel for power generation and steel making.",
        "tts": "Coal is known as Black Diamond."
      },
      {
        "q": "Where is the oldest oil refinery in India located?",
        "ans": "<strong>Digboi</strong> in Assam (established in 1901).",
        "tts": "Digboi in Assam is India's oldest oil refinery."
      },
      {
        "q": "What is CNG and why is it preferred in city transport?",
        "ans": "<strong>Compressed Natural Gas</strong>; it burns cleanly with very low smoke emission compared to petrol and diesel.",
        "tts": "CNG is compressed natural gas that burns cleanly in vehicles."
      },
      {
        "q": "Name a non-metallic mineral used as an electrical insulator.",
        "ans": "<strong>Mica</strong> (found abundantly in Jharkhand and Andhra Pradesh).",
        "tts": "Mica is an electrical insulating mineral."
      }
    ],
    "trueFalse": [
      {"q": "Coal and petroleum will never get exhausted no matter how much we use.", "ans": "False", "reason": "Fossil fuels are finite and will run out in a few decades if consumed excessively."},
      {"q": "Solar energy is an example of an inexhaustible, renewable green energy source.", "ans": "True", "reason": "Solar energy relies on sunlight, which is infinite and produces no carbon pollution."},
      {"q": "Iron ore is a non-metallic mineral.", "ans": "False", "reason": "Iron ore is a metallic mineral from which iron and steel are extracted."},
      {"q": "Bombay High is a major offshore petroleum drilling field in the Arabian Sea.", "ans": "True", "reason": "Located 160 km off the Mumbai coast, Bombay High produces significant domestic crude oil."},
      {"q": "Recycling scrap metals helps in conserving natural mineral deposits.", "ans": "True", "reason": "Recycling aluminium and steel reduces the need to mine fresh bauxite and iron ore."}
    ],
    "oneWord": [
      {"q": "The ore from which aluminium is extracted.", "ans": "Bauxite"},
      {"q": "The industrial mineral popularly called 'Black Diamond'.", "ans": "Coal"},
      {"q": "India's premier offshore oil drilling field near Mumbai.", "ans": "Bombay High"},
      {"q": "Energy generated by the kinetic force of falling water.", "ans": "Hydroelectricity"},
      {"q": "A clean gaseous fuel compressed for vehicle engines.", "ans": "CNG (Compressed Natural Gas)"}
    ],
    "matchFollowing": [
      {"left": "Bauxite", "right": "Ore for aluminium metal", "pair": "Bauxite → Ore for aluminium metal"},
      {"left": "Coal", "right": "Thermal power and Black Diamond", "pair": "Coal → Thermal power & Black Diamond"},
      {"left": "Bombay High", "right": "Offshore petroleum field in Arabian Sea", "pair": "Bombay High → Offshore oil in Arabian Sea"},
      {"left": "Solar Energy", "right": "Renewable clean green power", "pair": "Solar Energy → Clean renewable energy"},
      {"left": "Mica", "right": "Electrical insulator mineral", "pair": "Mica → Electrical insulator mineral"}
    ],
    "goldenPoints": [
      "Minerals are naturally occurring inorganic substances in the Earth's crust.",
      "Metallic minerals include iron ore, copper, bauxite, and gold.",
      "Non-metallic minerals include coal, petroleum, limestone, and mica.",
      "Coal and petroleum are fossil fuels formed from prehistoric buried biomass.",
      "Fossil fuels are exhaustible and produce greenhouse gas emissions.",
      "Renewable sources like Solar, Wind, and Hydro are clean and inexhaustible.",
      "Chota Nagpur Plateau is India's most mineral-rich geographic region.",
      "Bombay High is the largest offshore oil field in the Arabian Sea.",
      "Recycling scrap metals and using public transport conserve finite minerals.",
      "Energy conservation is vital for environmental sustainability and energy security."
    ],
    "sectionMCQ": [
      {"q": "Which of the following is a renewable and eco-friendly energy source?", "options": ["A. Coal", "B. Petroleum", "C. Solar Energy", "D. Diesel"], "ans": "C. Solar Energy", "exp": "Solar energy is inexhaustible and generates clean electricity without smoke."},
      {"q": "Which mineral ore is the primary source of iron and steel?", "options": ["A. Bauxite", "B. Iron Ore (Haematite/Magnetite)", "C. Limestone", "D. Mica"], "ans": "B. Iron Ore (Haematite/Magnetite)", "exp": "Iron ore is smelted in blast furnaces to produce iron and steel."},
      {"q": "Where is the famous 'Bombay High' petroleum field located?", "options": ["A. Bay of Bengal", "B. Offshore Arabian Sea", "C. Indian Ocean at Kanyakumari", "D. Thar Desert"], "ans": "B. Offshore Arabian Sea", "exp": "Bombay High is an offshore oil platform located 160 km off the coast of Mumbai in the Arabian Sea."},
      {"q": "Which of the following is an effective method to conserve electricity at home?", "options": ["A. Keeping lights and fans on 24 hours", "B. Using energy-efficient LED bulbs and switching off unused appliances", "C. Using heavy heaters with open doors", "D. Running TV on full brightness continuously"], "ans": "B. Using energy-efficient LED bulbs and switching off unused appliances", "exp": "LED lights consume 80% less power and switching off unused appliances prevents waste."},
      {"q": "What is extracted from Bauxite ore?", "options": ["A. Iron", "B. Gold", "C. Aluminium", "D. Copper"], "ans": "C. Aluminium", "exp": "Bauxite is the principal ore used to produce lightweight, rust-proof aluminium metal."}
    ]
  },
  {
    "id": 10,
    "title": "Transport, Communication and Our Heritage",
    "theme": "Unit 2: The Land and Its Wealth",
    "unit": "Unit 2: The Land and Its Wealth",
    "summary": "Traces the evolution of transportation (roadways, railways, waterways, airways) and communication (postal, telecom, internet, mass media), alongside safeguarding India's architectural and cultural heritage.",
    "diagram": {
      "title": "Fig 10.1: Four Major Modes of Transport & Modern Communication",
      "svg": `<svg viewBox="0 0 520 230" class="w-full h-auto max-w-[480px] mx-auto border border-amber-300 rounded bg-gradient-to-b from-slate-50 to-indigo-50 p-2">
  <!-- 4 Transport Quadrants -->
  <rect x="20" y="20" width="110" height="70" fill="#f8fafc" stroke="#64748b" stroke-width="1.5" rx="4"/>
  <text x="75" y="38" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#0f172a">1. ROADWAYS</text>
  <text x="75" y="52" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#475569">Door-to-door</text>
  <text x="75" y="64" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#475569">National Highways</text>
  <text x="75" y="76" font-family="sans-serif" font-size="7" font-weight="bold" text-anchor="middle" fill="#2563eb">Golden Quadrilateral</text>

  <rect x="145" y="20" width="110" height="70" fill="#f8fafc" stroke="#64748b" stroke-width="1.5" rx="4"/>
  <text x="200" y="38" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#0f172a">2. RAILWAYS</text>
  <text x="200" y="52" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#475569">Heavy freight &amp; passengers</text>
  <text x="200" y="64" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#475569">Vande Bharat Express</text>
  <text x="200" y="76" font-family="sans-serif" font-size="7" font-weight="bold" text-anchor="middle" fill="#059669">Lifeline of India</text>

  <rect x="270" y="20" width="110" height="70" fill="#f8fafc" stroke="#64748b" stroke-width="1.5" rx="4"/>
  <text x="325" y="38" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#0f172a">3. WATERWAYS</text>
  <text x="325" y="52" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#475569">Cheapest for bulky goods</text>
  <text x="325" y="64" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#475569">Inland NW-1 (Ganga)</text>
  <text x="325" y="76" font-family="sans-serif" font-size="7" font-weight="bold" text-anchor="middle" fill="#0284c7">Major Ocean Ports</text>

  <rect x="395" y="20" width="110" height="70" fill="#f8fafc" stroke="#64748b" stroke-width="1.5" rx="4"/>
  <text x="450" y="38" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#0f172a">4. AIRWAYS</text>
  <text x="450" y="52" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#475569">Fastest &amp; expensive</text>
  <text x="450" y="64" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#475569">Connects mountains/remote</text>
  <text x="450" y="76" font-family="sans-serif" font-size="7" font-weight="bold" text-anchor="middle" fill="#7c3aed">Disaster Rescue</text>

  <!-- Communication & Heritage Banner -->
  <rect x="20" y="105" width="485" height="110" fill="#ffffff" stroke="#4f46e5" stroke-width="1.5" rx="6"/>
  <text x="260" y="125" font-family="sans-serif" font-size="9.5" font-weight="bold" text-anchor="middle" fill="#1e1b4b">COMMUNICATION REVOLUTION &amp; HERITAGE PROTECTION</text>

  <rect x="35" y="135" width="220" height="70" fill="#eff6ff" stroke="#93c5fd" stroke-width="1" rx="4"/>
  <text x="145" y="152" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#1d4ed8">DIGITAL COMMUNICATION</text>
  <text x="145" y="166" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#334155">Internet, Smartphones, UPI, Email</text>
  <text x="145" y="178" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#334155">Mass Media: Radio, TV, News</text>
  <text x="145" y="192" font-family="sans-serif" font-size="7" font-weight="bold" text-anchor="middle" fill="#1e40af">Instant global connectivity</text>

  <rect x="270" y="135" width="220" height="70" fill="#fefce8" stroke="#fde047" stroke-width="1" rx="4"/>
  <text x="380" y="152" font-family="sans-serif" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#854d0e">HERITAGE PRESERVATION</text>
  <text x="380" y="166" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#334155">Historical Forts, Temples, Monuments</text>
  <text x="380" y="178" font-family="sans-serif" font-size="7" text-anchor="middle" fill="#334155">Never deface or litter at monuments</text>
  <text x="380" y="192" font-family="sans-serif" font-size="7" font-weight="bold" text-anchor="middle" fill="#b45309">Preserve our proud history</text>
</svg>`,
      "caption": "Figure 10.1: Four modes of transportation, digital communication, and cultural heritage preservation."
    },
    "diagramQuestions": [
      {
        "q": "Which mode of transport is the most economical for carrying heavy bulky freight across long distances?",
        "ans": "Waterways (followed by Railways) are the most fuel-efficient and economical modes for transporting bulky cargo like coal, iron ore, and grains."
      },
      {
        "q": "What is our civic duty when visiting national heritage monuments like the Taj Mahal or Red Fort?",
        "ans": "We must never scratch names on monument walls, never litter plastic waste, maintain silence, and treat our historic architecture with deep respect."
      }
    ],
    "sectionA": [
      {
        "q": "Compare the four major modes of transport (Roadways, Railways, Waterways, Airways) with their unique advantages.",
        "ans": "<strong>1. Roadways:</strong> Offers direct door-to-door connectivity, reaches remote hill villages, and connects farms to markets. <strong>2. Railways:</strong> The lifeline of India; carries millions of passengers and millions of tons of heavy goods across the country economically. <strong>3. Waterways:</strong> The cheapest, most fuel-efficient mode for international trade and bulky goods over oceans and inland rivers. <strong>4. Airways:</strong> The fastest mode; crucial during emergencies, medical rescues, and connecting inaccessible mountain terrains.",
        "tts": "Roadways provide door to door service, railways carry heavy freight and passengers, waterways are cheapest for trade, and airways are fastest."
      },
      {
        "q": "Explain the difference between Personal Communication and Mass Communication with examples.",
        "ans": "<strong>Personal Communication:</strong> Exchange of information between two individuals or private groups (e.g., telephone calls, WhatsApp messages, private emails, handwritten letters). <strong>Mass Communication:</strong> Delivering news, education, and entertainment simultaneously to millions of people across the nation (e.g., Television broadcasts, All India Radio, Newspapers, Internet news portals).",
        "tts": "Personal communication is between individuals like telephone calls, while mass communication reaches millions like TV and newspapers."
      },
      {
        "q": "How has the Internet and Smartphone revolution transformed daily life and education in India?",
        "ans": "<strong>1. Instant Connectivity:</strong> Video calls and instant messaging connect families globally. <strong>2. Digital Education:</strong> Online classes, digital textbooks, and educational videos empower learners everywhere. <strong>3. Digital Payments:</strong> UPI allows instant cashless transactions. <strong>4. Public Services:</strong> Railway booking, weather forecasts, and emergency alerts are available in seconds on fingertips.",
        "tts": "Smartphones and the internet have revolutionized online learning, instant messaging, digital UPI payments, and access to public services."
      },
      {
        "q": "What is Cultural Heritage? Distinguish between Material (Tangible) and Non-Material (Intangible) heritage.",
        "ans": "<strong>Cultural Heritage:</strong> The legacy of physical artifacts and intangible traditions inherited from past generations. <strong>Material (Tangible) Heritage:</strong> Physical monuments, historical forts, ancient temples, paintings, and sculptures (e.g., Qutub Minar, Ajanta Caves). <strong>Non-Material (Intangible) Heritage:</strong> Living traditions, classical dance forms (Kathak, Bharatanatyam), folk music, yoga, oral folklore, and traditional festivals.",
        "tts": "Tangible heritage includes physical monuments and temples, while intangible heritage includes classical dance, music, yoga, and festivals."
      },
      {
        "q": "Why is it our fundamental duty to protect and preserve India's historical monuments?",
        "ans": "<strong>1. Pride of History:</strong> Monuments are living testimony to our ancestors' architectural genius and history. <strong>2. Tourism Economy:</strong> Millions of domestic and foreign tourists visit heritage sites, generating livelihoods for local artisans and guides. <strong>3. Cultural Identity:</strong> They define India's unique civilizational heritage for future generations.",
        "tts": "Protecting historical monuments preserves our proud history, supports tourism livelihoods, and safeguards national identity."
      }
    ],
    "sectionB": [
      {
        "q": "When did the first passenger train run in India and on which route?",
        "ans": "On <strong>16 April 1853</strong> between <strong>Bombay (Bori Bunder) and Thane</strong> (34 km).",
        "tts": "The first train ran on 16 April 1853 from Bombay to Thane."
      },
      {
        "q": "What is the Golden Quadrilateral (स्वर्णिम चतुर्भुज)?",
        "ans": "A massive 6-lane national superhighway network connecting India's four major mega-cities: <strong>Delhi, Mumbai, Chennai, and Kolkata</strong>.",
        "tts": "The Golden Quadrilateral connects Delhi, Mumbai, Chennai, and Kolkata."
      },
      {
        "q": "What is UPI in modern digital transactions?",
        "ans": "<strong>Unified Payments Interface</strong>; a real-time payment system enabling instant mobile money transfers.",
        "tts": "UPI stands for Unified Payments Interface for instant mobile payments."
      },
      {
        "q": "Name the specialized agency of the United Nations that designates World Heritage Sites.",
        "ans": "<strong>UNESCO</strong> (United Nations Educational, Scientific and Cultural Organization).",
        "tts": "UNESCO designates World Heritage Sites."
      },
      {
        "q": "Why are lighthouses built along ocean coasts and ports?",
        "ans": "To emit powerful light beams warning ships of dangerous rocky shores and guiding them safely into sea ports at night.",
        "tts": "Lighthouses guide ships safely into ports and warn them of rocky shores."
      }
    ],
    "trueFalse": [
      {"q": "Airways is the cheapest and most economical mode of cargo transport.", "ans": "False", "reason": "Airways is the fastest but most expensive mode; Waterways is the cheapest for cargo."},
      {"q": "The first train in India ran between Mumbai and Thane in 1853.", "ans": "True", "reason": "The historic 34 km journey took place on 16 April 1853."},
      {"q": "Mass communication tools like radio and TV reach only one person at a time.", "ans": "False", "reason": "Mass media communicates simultaneously to millions of people across nations."},
      {"q": "Defacing ancient monuments by writing names on walls is a punishable offense.", "ans": "True", "reason": "Damaging protected monuments violates archaeological heritage preservation laws."},
      {"q": "Yoga and classical dances like Kathak are examples of intangible cultural heritage.", "ans": "True", "reason": "They are living cultural traditions passed down through practice and oral heritage."}
    ],
    "oneWord": [
      {"q": "The superhighway network connecting Delhi, Mumbai, Chennai, and Kolkata.", "ans": "Golden Quadrilateral"},
      {"q": "The year in which the first railway train operated in India.", "ans": "1853"},
      {"q": "Real-time instant digital mobile payment system developed in India.", "ans": "UPI"},
      {"q": "International agency that declares World Heritage Sites.", "ans": "UNESCO"},
      {"q": "Coastal tower with a beacon light guiding ocean ships at night.", "ans": "Lighthouse"}
    ],
    "matchFollowing": [
      {"left": "First Train in India", "right": "1853 from Mumbai to Thane", "pair": "First Train → 1853 from Mumbai to Thane"},
      {"left": "Golden Quadrilateral", "right": "4-Metro Superhighway Network", "pair": "Golden Quadrilateral → 4-Metro Superhighway"},
      {"left": "UPI", "right": "Instant digital payment system", "pair": "UPI → Instant digital payment system"},
      {"left": "Waterways", "right": "Cheapest mode for heavy cargo", "pair": "Waterways → Cheapest for heavy cargo"},
      {"left": "UNESCO", "right": "World Heritage Site designation", "pair": "UNESCO → World Heritage Sites"}
    ],
    "goldenPoints": [
      "Roadways provide essential door-to-door connectivity across all terrains.",
      "Indian Railways is the national lifeline transporting millions of people and goods daily.",
      "Waterways are the most fuel-efficient and cheapest mode for heavy bulk cargo.",
      "Airways offer rapid travel and critical disaster rescue capabilities.",
      "The Golden Quadrilateral links Delhi, Mumbai, Chennai, and Kolkata.",
      "Communication has evolved from letters to telegraph, telephone, and high-speed internet.",
      "Mass communication tools like TV and radio inform the entire nation simultaneously.",
      "India's heritage comprises tangible monuments and intangible arts, dance, and yoga.",
      "UNESCO protects exceptional cultural and natural World Heritage Sites.",
      "Preserving historical monuments and civic cleanliness is every citizen's duty."
    ],
    "sectionMCQ": [
      {"q": "Which mode of transport is fastest and most effective during flood and earthquake rescue operations?", "options": ["A. Bullock Cart", "B. Railways", "C. Airways (Helicopters/Aircraft)", "D. Waterways"], "ans": "C. Airways (Helicopters/Aircraft)", "exp": "Aircraft and helicopters can drop emergency food packets and rescue stranded victims in isolated disaster zones."},
      {"q": "The Golden Quadrilateral connects which four major Indian metro cities?", "options": ["A. Delhi, Mumbai, Chennai, Kolkata", "B. Jaipur, Lucknow, Patna, Bhopal", "C. Shimla, Srinagar, Manali, Leh", "D. Goa, Kochi, Pune, Surat"], "ans": "A. Delhi, Mumbai, Chennai, Kolkata", "exp": "The Golden Quadrilateral is a world-class 6-lane highway connecting Delhi, Mumbai, Chennai, and Kolkata."},
      {"q": "In which year was the first commercial railway line opened in India between Bombay and Thane?", "options": ["A. 1947", "B. 1853", "C. 1901", "D. 1885"], "ans": "B. 1853", "exp": "The first train ran 34 km between Bori Bunder (Mumbai) and Thane on 16 April 1853."},
      {"q": "Which of the following is considered an Intangible Cultural Heritage?", "options": ["A. Red Fort", "B. Qutub Minar", "C. Kathak Dance and Yoga", "D. Taj Mahal"], "ans": "C. Kathak Dance and Yoga", "exp": "Intangible heritage consists of living arts, rituals, and practices like classical dance and yoga."},
      {"q": "What is the primary function of a coastal lighthouse?", "options": ["A. Generating solar power", "B. Guiding ships safely and warning them of shallow rocks", "C. Storing fish", "D. Measuring tide height"], "ans": "B. Guiding ships safely and warning them of shallow rocks", "exp": "Lighthouses emit revolving light beams to guide ships into harbors safely."}
    ]
  }
];

// Provide compatibility aliases
if (typeof window !== 'undefined') {
  window.SST5_CHAPTERS_DATA = SST5_CHAPTERS_DATA;
}
