/**
 * NCERT & Standard School Curriculum - English Grammar & Composition
 * Complete 10-Unit Master Question & Answer Bank with Visual Diagrams & Exercises
 * Police Modern School, 25th Bn PAC, Raebareli
 * Academic Session 2026-2027
 */

const GRAMMAR_CHAPTERS_DATA = [
  {
    "id": 1,
    "title": "Parts of Speech Mastery",
    "theme": "Unit 1: Fundamentals of Grammar",
    "unit": "Unit 1: Fundamentals of Grammar",
    "summary": "Comprehensive study of all eight parts of speech (Noun, Pronoun, Adjective, Verb, Adverb, Preposition, Conjunction, Interjection), their classifications, syntactic roles, and contextual usage in standard English sentences.",
    "diagram": {
      "title": "Fig 1.1: The 8 Pillars of English Grammar (Parts of Speech Tree)",
      "svg": "<svg viewBox=\"0 0 600 260\" class=\"w-full h-auto max-w-[540px] mx-auto border border-indigo-200 rounded-lg bg-gradient-to-b from-indigo-50/70 to-slate-50 p-2\">\n  <rect x=\"220\" y=\"10\" width=\"160\" height=\"32\" rx=\"6\" fill=\"#1e1b4b\" stroke=\"#4338ca\" stroke-width=\"1.5\"/>\n  <text x=\"300\" y=\"31\" font-family=\"'Outfit', sans-serif\" font-size=\"11\" font-weight=\"bold\" fill=\"#ffffff\" text-anchor=\"middle\">PARTS OF SPEECH (8)</text>\n  <line x1=\"300\" y1=\"42\" x2=\"300\" y2=\"65\" stroke=\"#6366f1\" stroke-width=\"2\"/>\n  <line x1=\"60\" y1=\"65\" x2=\"540\" y2=\"65\" stroke=\"#6366f1\" stroke-width=\"2\"/>\n  <line x1=\"60\" y1=\"65\" x2=\"60\" y2=\"85\" stroke=\"#6366f1\" stroke-width=\"1.5\"/>\n  <rect x=\"10\" y=\"85\" width=\"100\" height=\"42\" rx=\"5\" fill=\"#e0e7ff\" stroke=\"#4f46e5\" stroke-width=\"1.2\"/>\n  <text x=\"60\" y=\"102\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" fill=\"#312e81\" text-anchor=\"middle\">1. NOUN</text>\n  <text x=\"60\" y=\"117\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#4338ca\" text-anchor=\"middle\">Naming word</text>\n  <line x1=\"60\" y1=\"127\" x2=\"60\" y2=\"145\" stroke=\"#6366f1\" stroke-width=\"1.5\"/>\n  <rect x=\"10\" y=\"145\" width=\"100\" height=\"42\" rx=\"5\" fill=\"#fdf4ff\" stroke=\"#c026d3\" stroke-width=\"1.2\"/>\n  <text x=\"60\" y=\"162\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" fill=\"#701a75\" text-anchor=\"middle\">2. PRONOUN</text>\n  <text x=\"60\" y=\"177\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#a21caf\" text-anchor=\"middle\">Replaces noun</text>\n  <line x1=\"190\" y1=\"65\" x2=\"190\" y2=\"85\" stroke=\"#6366f1\" stroke-width=\"1.5\"/>\n  <rect x=\"140\" y=\"85\" width=\"100\" height=\"42\" rx=\"5\" fill=\"#ecfdf5\" stroke=\"#059669\" stroke-width=\"1.2\"/>\n  <text x=\"190\" y=\"102\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" fill=\"#064e3b\" text-anchor=\"middle\">3. VERB</text>\n  <text x=\"190\" y=\"117\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#047857\" text-anchor=\"middle\">Action / State</text>\n  <line x1=\"190\" y1=\"127\" x2=\"190\" y2=\"145\" stroke=\"#6366f1\" stroke-width=\"1.5\"/>\n  <rect x=\"140\" y=\"145\" width=\"100\" height=\"42\" rx=\"5\" fill=\"#f0fdf4\" stroke=\"#16a34a\" stroke-width=\"1.2\"/>\n  <text x=\"190\" y=\"162\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" fill=\"#14532d\" text-anchor=\"middle\">4. ADVERB</text>\n  <text x=\"190\" y=\"177\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#15803d\" text-anchor=\"middle\">Modifies verb/adj</text>\n  <line x1=\"320\" y1=\"65\" x2=\"320\" y2=\"85\" stroke=\"#6366f1\" stroke-width=\"1.5\"/>\n  <rect x=\"270\" y=\"85\" width=\"100\" height=\"42\" rx=\"5\" fill=\"#fef3c7\" stroke=\"#d97706\" stroke-width=\"1.2\"/>\n  <text x=\"320\" y=\"102\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" fill=\"#78350f\" text-anchor=\"middle\">5. ADJECTIVE</text>\n  <text x=\"320\" y=\"117\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#b45309\" text-anchor=\"middle\">Describes noun</text>\n  <line x1=\"320\" y1=\"127\" x2=\"320\" y2=\"145\" stroke=\"#6366f1\" stroke-width=\"1.5\"/>\n  <rect x=\"270\" y=\"145\" width=\"100\" height=\"42\" rx=\"5\" fill=\"#fff7ed\" stroke=\"#ea580c\" stroke-width=\"1.2\"/>\n  <text x=\"320\" y=\"162\" font-family=\"sans-serif\" font-size=\"9.5\" font-weight=\"bold\" fill=\"#7c2d12\" text-anchor=\"middle\">6. PREPOSITION</text>\n  <text x=\"320\" y=\"177\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#c2410c\" text-anchor=\"middle\">Position / Relation</text>\n  <line x1=\"450\" y1=\"65\" x2=\"450\" y2=\"85\" stroke=\"#6366f1\" stroke-width=\"1.5\"/>\n  <rect x=\"400\" y=\"85\" width=\"100\" height=\"42\" rx=\"5\" fill=\"#f0f9ff\" stroke=\"#0284c7\" stroke-width=\"1.2\"/>\n  <text x=\"450\" y=\"102\" font-family=\"sans-serif\" font-size=\"9.5\" font-weight=\"bold\" fill=\"#0c4a6e\" text-anchor=\"middle\">7. CONJUNCTION</text>\n  <text x=\"450\" y=\"117\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#0369a1\" text-anchor=\"middle\">Joining word</text>\n  <line x1=\"450\" y1=\"127\" x2=\"450\" y2=\"145\" stroke=\"#6366f1\" stroke-width=\"1.5\"/>\n  <rect x=\"400\" y=\"145\" width=\"100\" height=\"42\" rx=\"5\" fill=\"#ffe4e6\" stroke=\"#e11d48\" stroke-width=\"1.2\"/>\n  <text x=\"450\" y=\"162\" font-family=\"sans-serif\" font-size=\"9.5\" font-weight=\"bold\" fill=\"#881337\" text-anchor=\"middle\">8. INTERJECTION</text>\n  <text x=\"450\" y=\"177\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#be123c\" text-anchor=\"middle\">Sudden emotion</text>\n  <rect x=\"40\" y=\"205\" width=\"520\" height=\"38\" rx=\"6\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n  <text x=\"300\" y=\"222\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" fill=\"#1e293b\" text-anchor=\"middle\">Golden Sentence: \"Hurrah! (8) The (Art) young (5) boy (1) and (7) he (2) quickly (4) ran (3) into (6) school.\"</text>\n  <text x=\"300\" y=\"235\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#64748b\" text-anchor=\"middle\">Every single word in an English sentence belongs to one of these eight fundamental grammatical functions.</text>\n</svg>",
      "caption": "Figure 1.1: Functional hierarchy and interconnectivity of the Eight Parts of Speech in English Grammar."
    },
    "diagramQuestions": [
      {
        "q": "Based on Figure 1.1, how does an Adverb differ in function from an Adjective?",
        "ans": "An <strong>Adjective</strong> modifies or describes a Noun or Pronoun (e.g., '<em>smart</em> student'), whereas an <strong>Adverb</strong> modifies a Verb, an Adjective, or another Adverb, indicating how, when, where, or to what degree an action happens (e.g., 'runs <em>swiftly</em>')."
      },
      {
        "q": "In the example sentence in Fig 1.1, classify the words 'Hurrah' and 'into'.",
        "ans": "'<em>Hurrah!</em>' is an <strong>Interjection</strong> expressing spontaneous joy, and '<em>into</em>' is a <strong>Preposition</strong> showing spatial movement towards the interior of the school."
      }
    ],
    "sectionA": [
      {
        "q": "Define Nouns and classify their five major types with two standard examples of each.",
        "ans": "A <strong>Noun</strong> is a word used as the name of a person, place, thing, animal, idea, or quality.<br><strong>1. Proper Noun:</strong> Particular names of individuals, cities, or monuments (e.g., <em>Raebareli, Dr. APJ Abdul Kalam</em>). Always begins with a capital letter.<br><strong>2. Common Noun:</strong> Generic names shared by every member of a class or kind (e.g., <em>student, teacher, river, mountain</em>).<br><strong>3. Collective Noun:</strong> Name of a group of persons or things taken together as one whole (e.g., <em>an army of soldiers, a flock of birds, a fleet of ships</em>).<br><strong>4. Material Noun:</strong> Names of raw substances or matter from which items are made (e.g., <em>gold, silver, cotton, wood</em>).<br><strong>5. Abstract Noun:</strong> Names of qualities, actions, states, or concepts that cannot be seen or touched (e.g., <em>honesty, bravery, childhood, wisdom</em>)."
      },
      {
        "q": "What is a Pronoun? Explain Personal Pronouns and their three Persons with subjective and objective cases.",
        "ans": "A <strong>Pronoun</strong> is a word used in place of a noun to avoid monotonous repetition and maintain sentence coherence.<br><strong>Personal Pronouns</strong> refer to specific grammatical persons:<br><strong>1. First Person (The Speaker):</strong> Singular Subject = <em>I</em>, Object = <em>me</em>; Plural Subject = <em>We</em>, Object = <em>us</em>.<br><strong>2. Second Person (The Person Spoken To):</strong> Singular & Plural Subject = <em>You</em>, Object = <em>you</em>.<br><strong>3. Third Person (The Person/Thing Spoken Of):</strong> Singular Subject = <em>He, She, It</em>; Objects = <em>him, her, it</em>; Plural Subject = <em>They</em>, Object = <em>them</em>."
      },
      {
        "q": "Distinguish between Transitive and Intransitive Verbs with clear illustrative examples.",
        "ans": "A <strong>Verb</strong> expresses an action, occurrence, or state of being.<br><strong>1. Transitive Verb:</strong> A verb that requires a direct object to complete its meaning. The action passes over from the subject to the object.<br><em>Example:</em> 'The boy <em>kicked</em> <u>the football</u>.' (What did he kick? -> 'the football' = Object).<br><strong>2. Intransitive Verb:</strong> A verb that expresses an action or state complete in itself without requiring an object.<br><em>Example:</em> 'The baby <em>slept</em> peacefully.' or 'Birds <em>fly</em> in the sky.' (No direct object receives the action)."
      },
      {
        "q": "Explain the three Degrees of Comparison of Adjectives and provide rules for forming Superlatives.",
        "ans": "Adjectives change form when comparing qualities of nouns:<br><strong>1. Positive Degree:</strong> Denotes the simple quality without comparison (e.g., <em>tall, brave, beautiful</em>).<br><strong>2. Comparative Degree:</strong> Compares the quality between two items/people, usually followed by 'than' (e.g., <em>taller, braver, more beautiful</em>).<br><strong>3. Superlative Degree:</strong> Denotes the highest degree among three or more items, always preceded by the definite article 'the' (e.g., <em>the tallest, the bravest, the most beautiful</em>).<br><em>Rules:</em> Regular 1-syllable words add <em>-er / -est</em>; words ending in <em>-y</em> change to <em>-ier / -iest</em> (happy -> happier -> happiest); multi-syllable adjectives use <em>more / most</em> (intelligent -> more intelligent -> most intelligent); irregulars change completely (good -> better -> best; bad -> worse -> worst)."
      },
      {
        "q": "What are Prepositions? Classify Prepositions of Place, Time, and Movement with contextual sentences.",
        "ans": "A <strong>Preposition</strong> is a word placed before a noun or pronoun to show its relation to some other word in the sentence.<br><strong>1. Prepositions of Time:</strong> <em>At</em> (exact clock time: at 7:00 AM), <em>On</em> (days/dates: on Monday, on 15th August), <em>In</em> (months, years, seasons, centuries: in July, in 2026).<br><strong>2. Prepositions of Place:</strong> <em>In</em> (enclosed space/large city: in the room, in Delhi), <em>At</em> (specific point/small locality: at the bus stop, at home), <em>On</em> (surface contact: on the desk).<br><strong>3. Prepositions of Movement:</strong> <em>Into</em> (movement entering inside: jumped into the pool), <em>Through</em> (moving across 3D space: walked through the forest), <em>Towards</em> (direction: moving towards the goal)."
      }
    ],
    "sectionB": [
      {
        "q": "Identify the part of speech of the underlined word: 'She gave a <u>fast</u> response because she runs <u>fast</u>.'",
        "ans": "In the first clause, 'fast' is an <strong>Adjective</strong> modifying the noun 'response'. In the second clause, 'fast' is an <strong>Adverb of Manner</strong> modifying the verb 'runs'."
      },
      {
        "q": "Give the Collective Noun for: (a) a group of wolves, (b) a collection of keys.",
        "ans": "(a) A <strong>pack</strong> of wolves.<br>(b) A <strong>bunch</strong> of keys."
      },
      {
        "q": "What is an Interjection? Give two examples showing different emotions.",
        "ans": "An <strong>Interjection</strong> is a word that expresses sudden feelings or emotions and is followed by an exclamation mark (!).<br><em>Examples:</em> '<em>Alas!</em> We lost the match.' (Sorrow) and '<em>Bravo!</em> You played exceptionally well.' (Praise)."
      },
      {
        "q": "Differentiate between Coordinating and Subordinating Conjunctions with one example each.",
        "ans": "<strong>Coordinating Conjunctions</strong> (FANBOYS: for, and, nor, but, or, yet, so) connect two independent clauses of equal grammatical rank (e.g., 'He worked hard, <em>but</em> he failed'). <strong>Subordinating Conjunctions</strong> connect a dependent clause to an independent clause (e.g., 'We stayed indoors <em>because</em> it was raining')."
      },
      {
        "q": "Convert the sentence into Comparative and Superlative degrees: 'Iron is a useful metal.'",
        "ans": "<strong>Comparative:</strong> Iron is <em>more useful than</em> any other metal.<br><strong>Superlative:</strong> Iron is <em>the most useful</em> of all metals."
      }
    ],
    "trueFalse": [
      {
        "q": "An abstract noun refers to physical matter that can be touched, weighed, and tasted.",
        "ans": "False",
        "reason": "Abstract nouns represent intangible qualities, concepts, states, or feelings (e.g., truth, kindness) and have no physical substance."
      },
      {
        "q": "The word 'the' must always precede the superlative degree of an adjective.",
        "ans": "True",
        "reason": "The superlative degree denotes a unique highest ranking, requiring the definite article 'the' (e.g., 'the highest peak')."
      },
      {
        "q": "In the sentence 'He speaks English well', the word 'well' is an adjective modifying English.",
        "ans": "False",
        "reason": "'Well' is an adverb of manner modifying the action verb 'speaks'."
      },
      {
        "q": "Prepositions of time use 'on' before specific days of the week and exact dates.",
        "ans": "True",
        "reason": "Standard English grammar mandates 'on Monday' and 'on 26th January'."
      },
      {
        "q": "A pronoun must always agree with its antecedent noun in number, gender, and person.",
        "ans": "True",
        "reason": "Pronoun-antecedent agreement is a fundamental grammatical rule for semantic clarity."
      }
    ],
    "oneWord": [
      {
        "q": "A word that connects words, phrases, or clauses together in a sentence.",
        "ans": "Conjunction"
      },
      {
        "q": "The grammatical case used when a noun or pronoun functions as the subject of a finite verb.",
        "ans": "Nominative Case (Subjective Case)"
      },
      {
        "q": "The collective noun used for a group of lions.",
        "ans": "Pride (A pride of lions)"
      },
      {
        "q": "An adverb that answers the question 'How often?' regarding the verb's action.",
        "ans": "Adverb of Frequency (e.g., always, seldom, never)"
      },
      {
        "q": "The form of a verb that acts as an adjective ending in -ing or -ed/-en.",
        "ans": "Participle"
      }
    ],
    "matchFollowing": [
      {
        "left": "Proper Noun",
        "right": "Mount Everest",
        "pair": "1 -> Mount Everest"
      },
      {
        "left": "Collective Noun",
        "right": "Flock of sheep",
        "pair": "2 -> Flock of sheep"
      },
      {
        "left": "Abstract Noun",
        "right": "Courage",
        "pair": "3 -> Courage"
      },
      {
        "left": "Relative Pronoun",
        "right": "Who / Which / That",
        "pair": "4 -> Who / Which / That"
      },
      {
        "left": "Correlative Conjunction",
        "right": "Neither... nor",
        "pair": "5 -> Neither... nor"
      }
    ],
    "goldenPoints": [
      "There are exactly 8 Parts of Speech: Noun, Pronoun, Adjective, Verb, Adverb, Preposition, Conjunction, Interjection.",
      "Proper Nouns always begin with a Capital letter, regardless of their position in the sentence.",
      "A Transitive Verb must take a direct object (Answers 'What?' or 'Whom?'), whereas an Intransitive Verb takes no object.",
      "Adjectives modify Nouns/Pronouns; Adverbs modify Verbs, Adjectives, or other Adverbs.",
      "Degrees of Comparison: Positive (as...as), Comparative (-er / more... than), Superlative (the -est / the most).",
      "Use 'At' for exact clock times, 'On' for days and dates, and 'In' for months, years, and centuries.",
      "Coordinating Conjunctions can be memorised using the acronym FANBOYS (For, And, Nor, But, Or, Yet, So).",
      "Interjections express sudden bursts of emotion and are followed by an exclamation mark (!).",
      "The same word can function as different parts of speech depending on its syntactic context.",
      "Pronouns replace nouns to avoid repetition and must strictly agree with their antecedent in number and gender."
    ],
    "sectionMCQ": [
      {
        "q": "Identify the part of speech of 'honesty' in: 'Honesty is the best policy.'",
        "options": [
          "A) Proper Noun",
          "B) Abstract Noun",
          "C) Adjective",
          "D) Common Noun"
        ],
        "ans": "B) Abstract Noun",
        "exp": "'Honesty' names an intangible moral quality and cannot be perceived by the five senses."
      },
      {
        "q": "Choose the correct preposition: 'The flight will depart ______ 8:30 PM sharp.'",
        "options": [
          "A) on",
          "B) in",
          "C) at",
          "D) by"
        ],
        "ans": "C) at",
        "exp": "Preposition 'at' is mandatory for precise, specific clock time points."
      },
      {
        "q": "Which word in 'The extremely tired worker fell asleep' is an adverb?",
        "options": [
          "A) worker",
          "B) tired",
          "C) extremely",
          "D) asleep"
        ],
        "ans": "C) extremely",
        "exp": "'Extremely' is an adverb of degree modifying the participial adjective 'tired'."
      },
      {
        "q": "Identify the sentence containing an Intransitive Verb:",
        "options": [
          "A) Rohan wrote an essay.",
          "B) The sun rose brilliantly.",
          "C) Mother baked a cake.",
          "D) She solved the puzzle."
        ],
        "ans": "B) The sun rose brilliantly.",
        "exp": "'Rose' does not pass its action onto any direct object; 'brilliantly' is an adverb of manner."
      },
      {
        "q": "What is the Superlative degree of the adjective 'Little'?",
        "options": [
          "A) Littlest",
          "B) Lesser",
          "C) Less",
          "D) Least"
        ],
        "ans": "D) Least",
        "exp": "The irregular comparison of 'Little' is Positive: Little -> Comparative: Less -> Superlative: Least."
      }
    ]
  },
  {
    "id": 2,
    "title": "The Tenses & Timeline Mastery",
    "theme": "Unit 2: Verb Tenses & Time Relations",
    "unit": "Unit 2: Verb Tenses & Time Relations",
    "summary": "In-depth study of the 12 English grammatical tenses across Present, Past, and Future dimensions. Features structural formulas, signal keywords, timeline maps, and active sentence transformation rules.",
    "diagram": {
      "title": "Fig 2.1: The Complete 3x4 Tense Architecture Matrix & Chronological Timeline",
      "svg": "<svg viewBox=\"0 0 620 270\" class=\"w-full h-auto max-w-[560px] mx-auto border border-blue-200 rounded-lg bg-gradient-to-b from-sky-50/70 to-slate-50 p-2\">\n  <line x1=\"40\" y1=\"35\" x2=\"580\" y2=\"35\" stroke=\"#0369a1\" stroke-width=\"3\"/>\n  <circle cx=\"120\" cy=\"35\" r=\"7\" fill=\"#dc2626\"/>\n  <text x=\"120\" y=\"20\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" fill=\"#991b1b\" text-anchor=\"middle\">PAST</text>\n  <circle cx=\"310\" cy=\"35\" r=\"8\" fill=\"#16a34a\"/>\n  <text x=\"310\" y=\"20\" font-family=\"sans-serif\" font-size=\"11\" font-weight=\"bold\" fill=\"#166534\" text-anchor=\"middle\">PRESENT NOW</text>\n  <circle cx=\"500\" cy=\"35\" r=\"7\" fill=\"#2563eb\"/>\n  <text x=\"500\" y=\"20\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" fill=\"#1e40af\" text-anchor=\"middle\">FUTURE</text>\n  <rect x=\"20\" y=\"55\" width=\"135\" height=\"26\" fill=\"#0f172a\" rx=\"3\"/>\n  <text x=\"87\" y=\"72\" font-family=\"sans-serif\" font-size=\"9.5\" font-weight=\"bold\" fill=\"#ffffff\" text-anchor=\"middle\">ASPECT</text>\n  <rect x=\"160\" y=\"55\" width=\"135\" height=\"26\" fill=\"#1e293b\" rx=\"3\"/>\n  <text x=\"227\" y=\"72\" font-family=\"sans-serif\" font-size=\"9.5\" font-weight=\"bold\" fill=\"#38bdf8\" text-anchor=\"middle\">PRESENT TENSE</text>\n  <rect x=\"300\" y=\"55\" width=\"145\" height=\"26\" fill=\"#1e293b\" rx=\"3\"/>\n  <text x=\"372\" y=\"72\" font-family=\"sans-serif\" font-size=\"9.5\" font-weight=\"bold\" fill=\"#fca5a5\" text-anchor=\"middle\">PAST TENSE</text>\n  <rect x=\"450\" y=\"55\" width=\"150\" height=\"26\" fill=\"#1e293b\" rx=\"3\"/>\n  <text x=\"525\" y=\"72\" font-family=\"sans-serif\" font-size=\"9.5\" font-weight=\"bold\" fill=\"#93c5fd\" text-anchor=\"middle\">FUTURE TENSE</text>\n  <rect x=\"20\" y=\"86\" width=\"135\" height=\"38\" fill=\"#f1f5f9\" stroke=\"#cbd5e1\"/>\n  <text x=\"87\" y=\"103\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" fill=\"#0f172a\" text-anchor=\"middle\">1. SIMPLE / INDEFINITE</text>\n  <text x=\"87\" y=\"116\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#64748b\" text-anchor=\"middle\">Habit / Routine / Fact</text>\n  <rect x=\"160\" y=\"86\" width=\"135\" height=\"38\" fill=\"#f0f9ff\" stroke=\"#bae6fd\"/>\n  <text x=\"227\" y=\"102\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" fill=\"#0369a1\" text-anchor=\"middle\">S + V1 (s/es)</text>\n  <text x=\"227\" y=\"115\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#0284c7\" text-anchor=\"middle\">He writes letters.</text>\n  <rect x=\"300\" y=\"86\" width=\"145\" height=\"38\" fill=\"#fef2f2\" stroke=\"#fecaca\"/>\n  <text x=\"372\" y=\"102\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" fill=\"#b91c1c\" text-anchor=\"middle\">S + V2 (Past form)</text>\n  <text x=\"372\" y=\"115\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#dc2626\" text-anchor=\"middle\">He wrote a letter.</text>\n  <rect x=\"450\" y=\"86\" width=\"150\" height=\"38\" fill=\"#eff6ff\" stroke=\"#bfdbfe\"/>\n  <text x=\"525\" y=\"102\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" fill=\"#1d4ed8\" text-anchor=\"middle\">S + will/shall + V1</text>\n  <text x=\"525\" y=\"115\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#2563eb\" text-anchor=\"middle\">He will write a letter.</text>\n  <rect x=\"20\" y=\"128\" width=\"135\" height=\"38\" fill=\"#f1f5f9\" stroke=\"#cbd5e1\"/>\n  <text x=\"87\" y=\"145\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" fill=\"#0f172a\" text-anchor=\"middle\">2. CONTINUOUS</text>\n  <text x=\"87\" y=\"158\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#64748b\" text-anchor=\"middle\">Action in progress</text>\n  <rect x=\"160\" y=\"128\" width=\"135\" height=\"38\" fill=\"#f0f9ff\" stroke=\"#bae6fd\"/>\n  <text x=\"227\" y=\"144\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" fill=\"#0369a1\" text-anchor=\"middle\">S + is/am/are + V-ing</text>\n  <text x=\"227\" y=\"157\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#0284c7\" text-anchor=\"middle\">He is writing.</text>\n  <rect x=\"300\" y=\"128\" width=\"145\" height=\"38\" fill=\"#fef2f2\" stroke=\"#fecaca\"/>\n  <text x=\"372\" y=\"144\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" fill=\"#b91c1c\" text-anchor=\"middle\">S + was/were + V-ing</text>\n  <text x=\"372\" y=\"157\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#dc2626\" text-anchor=\"middle\">He was writing.</text>\n  <rect x=\"450\" y=\"128\" width=\"150\" height=\"38\" fill=\"#eff6ff\" stroke=\"#bfdbfe\"/>\n  <text x=\"525\" y=\"144\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" fill=\"#1d4ed8\" text-anchor=\"middle\">S + will be + V-ing</text>\n  <text x=\"525\" y=\"157\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#2563eb\" text-anchor=\"middle\">He will be writing.</text>\n  <rect x=\"20\" y=\"170\" width=\"135\" height=\"38\" fill=\"#f1f5f9\" stroke=\"#cbd5e1\"/>\n  <text x=\"87\" y=\"187\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" fill=\"#0f172a\" text-anchor=\"middle\">3. PERFECT</text>\n  <text x=\"87\" y=\"200\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#64748b\" text-anchor=\"middle\">Completed action</text>\n  <rect x=\"160\" y=\"170\" width=\"135\" height=\"38\" fill=\"#f0f9ff\" stroke=\"#bae6fd\"/>\n  <text x=\"227\" y=\"186\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" fill=\"#0369a1\" text-anchor=\"middle\">S + has/have + V3</text>\n  <text x=\"227\" y=\"199\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#0284c7\" text-anchor=\"middle\">He has written.</text>\n  <rect x=\"300\" y=\"170\" width=\"145\" height=\"38\" fill=\"#fef2f2\" stroke=\"#fecaca\"/>\n  <text x=\"372\" y=\"186\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" fill=\"#b91c1c\" text-anchor=\"middle\">S + had + V3</text>\n  <text x=\"372\" y=\"199\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#dc2626\" text-anchor=\"middle\">He had written.</text>\n  <rect x=\"450\" y=\"170\" width=\"150\" height=\"38\" fill=\"#eff6ff\" stroke=\"#bfdbfe\"/>\n  <text x=\"525\" y=\"186\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" fill=\"#1d4ed8\" text-anchor=\"middle\">S + will have + V3</text>\n  <text x=\"525\" y=\"199\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#2563eb\" text-anchor=\"middle\">He will have written.</text>\n  <rect x=\"20\" y=\"212\" width=\"135\" height=\"46\" fill=\"#f1f5f9\" stroke=\"#cbd5e1\"/>\n  <text x=\"87\" y=\"228\" font-family=\"sans-serif\" font-size=\"8\" font-weight=\"bold\" fill=\"#0f172a\" text-anchor=\"middle\">4. PERFECT CONTINUOUS</text>\n  <text x=\"87\" y=\"241\" font-family=\"sans-serif\" font-size=\"7\" fill=\"#64748b\" text-anchor=\"middle\">Started past & continuing</text>\n  <rect x=\"160\" y=\"212\" width=\"135\" height=\"46\" fill=\"#f0f9ff\" stroke=\"#bae6fd\"/>\n  <text x=\"227\" y=\"227\" font-family=\"sans-serif\" font-size=\"8\" font-weight=\"bold\" fill=\"#0369a1\" text-anchor=\"middle\">has/have been + V-ing</text>\n  <text x=\"227\" y=\"240\" font-family=\"sans-serif\" font-size=\"7\" fill=\"#0284c7\" text-anchor=\"middle\">has been writing for 2 hrs</text>\n  <rect x=\"300\" y=\"212\" width=\"145\" height=\"46\" fill=\"#fef2f2\" stroke=\"#fecaca\"/>\n  <text x=\"372\" y=\"227\" font-family=\"sans-serif\" font-size=\"8\" font-weight=\"bold\" fill=\"#b91c1c\" text-anchor=\"middle\">had been + V-ing</text>\n  <text x=\"372\" y=\"240\" font-family=\"sans-serif\" font-size=\"7\" fill=\"#dc2626\" text-anchor=\"middle\">had been writing since 4 PM</text>\n  <rect x=\"450\" y=\"212\" width=\"150\" height=\"46\" fill=\"#eff6ff\" stroke=\"#bfdbfe\"/>\n  <text x=\"525\" y=\"227\" font-family=\"sans-serif\" font-size=\"8\" font-weight=\"bold\" fill=\"#1d4ed8\" text-anchor=\"middle\">will have been + V-ing</text>\n  <text x=\"525\" y=\"240\" font-family=\"sans-serif\" font-size=\"7\" fill=\"#2563eb\" text-anchor=\"middle\">will have been writing</text>\n</svg>",
      "caption": "Figure 2.1: Structural formulas and example sentences for all 12 English Tenses across Present, Past, and Future."
    },
    "diagramQuestions": [
      {
        "q": "What is the structural difference between Present Perfect and Past Perfect tense according to Fig 2.1?",
        "ans": "<strong>Present Perfect</strong> uses the auxiliary verb <em>has/have + V3</em> (connecting past action to present relevance), whereas <strong>Past Perfect</strong> uses <em>had + V3</em> (indicating an action completed before another past event)."
      },
      {
        "q": "State the rule for using 's/es' with verbs in the Simple Present Tense.",
        "ans": "In Simple Present Tense, <em>-s</em> or <em>-es</em> is appended to the base verb (V1) exclusively when the subject is <strong>Third Person Singular</strong> (<em>He, She, It</em>, or singular noun). Plural subjects and <em>I / You</em> take bare V1."
      }
    ],
    "sectionA": [
      {
        "q": "Explain the four Present Tenses with structural formulas, signal keywords, and illustrative sentences.",
        "ans": "<strong>1. Simple Present (Present Indefinite):</strong> Expresses habitual actions, universal truths, and scheduled routines.<br><em>Formula:</em> Subject + V1(s/es) + Object.<br><em>Keywords:</em> always, usually, daily, never, every day.<br><em>Example:</em> 'The Earth <em>revolves</em> around the Sun.'<br><br><strong>2. Present Continuous:</strong> Expresses an action actively progressing right now at the time of speaking.<br><em>Formula:</em> Subject + is/am/are + V1-ing + Object.<br><em>Keywords:</em> now, right now, at present, look!, listen!.<br><em>Example:</em> 'She <em>is reading</em> an English novel now.'<br><br><strong>3. Present Perfect:</strong> Expresses an action completed in the immediate past having current relevance or impact.<br><em>Formula:</em> Subject + has/have + V3 (Past Participle) + Object.<br><em>Keywords:</em> already, just, yet, recently, ever.<br><em>Example:</em> 'I <em>have finished</em> my homework.'<br><br><strong>4. Present Perfect Continuous:</strong> Expresses an action that began in the past and is still ongoing without interruption.<br><em>Formula:</em> Subject + has/have + been + V1-ing + since/for + Time.<br><em>Keywords:</em> since (point of time: since 2020), for (duration: for 3 hours).<br><em>Example:</em> 'They <em>have been playing</em> cricket <em>for</em> two hours.'"
      },
      {
        "q": "Explain the usage of Past Perfect Tense with the 'Two Past Actions' rule (before / after).",
        "ans": "When two actions took place in the past one after the other, the <strong>earlier completed action</strong> is expressed in the <strong>Past Perfect Tense (had + V3)</strong>, and the <strong>subsequent later action</strong> is expressed in the <strong>Simple Past Tense (V2)</strong>.<br><br><em>Rule 1 (Before):</em> Past Perfect + <em>before</em> + Simple Past.<br><em>Example:</em> 'The patient <em>had died</em> before the doctor <em>arrived</em>.'<br><br><em>Rule 2 (After):</em> Simple Past + <em>after</em> + Past Perfect.<br><em>Example:</em> 'The train <em>left</em> after we <em>had reached</em> the station.'"
      },
      {
        "q": "Clarify the precise distinction between 'Since' and 'For' in Perfect Continuous Tenses.",
        "ans": "<strong>1. 'Since' is used for a Point of Time:</strong> Denotes the exact starting moment of an action.<br><em>Examples:</em> since morning, since Monday, since 2015, since 4 o'clock, since childhood.<br><em>Sentence:</em> 'He has been studying in this school <em>since</em> 2022.'<br><br><strong>2. 'For' is used for a Period / Duration of Time:</strong> Denotes the total span or length of time without pinpointing the exact start.<br><em>Examples:</em> for 10 minutes, for 2 hours, for 5 days, for 3 years, for a long time.<br><em>Sentence:</em> 'It has been raining heavily <em>for</em> three hours.'"
      },
      {
        "q": "Describe the Future Continuous and Future Perfect Tenses with practical conversational examples.",
        "ans": "<strong>1. Future Continuous:</strong> Describes an action that will be ongoing and in progress at a specific point in future time.<br><em>Formula:</em> Subject + will be / shall be + V1-ing + Object.<br><em>Example:</em> 'At 10 AM tomorrow, we <em>will be taking</em> our final exam.'<br><br><strong>2. Future Perfect:</strong> Describes an action that will have been fully completed prior to a designated deadline in the future.<br><em>Formula:</em> Subject + will have / shall have + V3 + by/before + Future Time.<br><em>Example:</em> 'By 5 PM, the workers <em>will have finished</em> the painting.'"
      },
      {
        "q": "Transform the sentence 'Rohan drives a car' into all four Past Tense forms.",
        "ans": "<strong>Original:</strong> Rohan drives a car. (Simple Present)<br><strong>1. Simple Past:</strong> Rohan <em>drove</em> a car.<br><strong>2. Past Continuous:</strong> Rohan <em>was driving</em> a car.<br><strong>3. Past Perfect:</strong> Rohan <em>had driven</em> a car.<br><strong>4. Past Perfect Continuous:</strong> Rohan <em>had been driving</em> a car for two hours."
      }
    ],
    "sectionB": [
      {
        "q": "Fill with correct verb form: 'Water ______ (boil) at 100 degrees Celsius.'",
        "ans": "Water <strong>boils</strong> at 100 degrees Celsius. (Universal scientific truth uses Simple Present)."
      },
      {
        "q": "Correct the sentence: 'She is knowing the answer very well.'",
        "ans": "<em>Corrected:</em> 'She <strong>knows</strong> the answer very well.' (Verbs of perception/cognition like 'know', 'love', 'understand' are non-continuous state verbs)."
      },
      {
        "q": "Identify the tense: 'By next December, we will have lived here for ten years.'",
        "ans": "<strong>Future Perfect Tense</strong> ('will have lived' denotes completion by a future date)."
      },
      {
        "q": "Convert into negative: 'They have completed the science project.'",
        "ans": "'They <strong>have not completed</strong> the science project.'"
      },
      {
        "q": "Supply since or for: 'Grandmother has been meditating ______ two hours.'",
        "ans": "Grandmother has been meditating <strong>for</strong> two hours. ('two hours' is a duration)."
      }
    ],
    "trueFalse": [
      {
        "q": "Universal truths and geographical facts are always expressed in the Simple Present Tense.",
        "ans": "True",
        "reason": "Permanent, timeless facts do not change with time and take Simple Present (e.g., 'The Sun rises in the East')."
      },
      {
        "q": "In Past Continuous tense, plural subjects take 'was' as the helping verb.",
        "ans": "False",
        "reason": "Plural subjects (We, You, They, Boys) take 'were' (e.g., 'They were playing')."
      },
      {
        "q": "'Since' denotes a period or total duration of time.",
        "ans": "False",
        "reason": "'Since' denotes an exact starting point of time (e.g., since 8 AM); 'For' denotes duration."
      },
      {
        "q": "Past Perfect Tense utilizes the auxiliary verb 'had' followed by the third form of the verb (V3).",
        "ans": "True",
        "reason": "The standard formula for Past Perfect is Subject + had + V3."
      },
      {
        "q": "Verbs like 'smell', 'taste', 'know', and 'believe' commonly take continuous (-ing) forms in normal usage.",
        "ans": "False",
        "reason": "These are stative verbs and are predominantly used in simple aspect rather than continuous aspect."
      }
    ],
    "oneWord": [
      {
        "q": "The tense used to express an action that started in the past and is still ongoing right now.",
        "ans": "Present Perfect Continuous Tense"
      },
      {
        "q": "The third principal form of a verb used in all perfect tenses and passive voice.",
        "ans": "Past Participle (V3)"
      },
      {
        "q": "Preposition used before a specific starting point of time in perfect continuous sentences.",
        "ans": "Since"
      },
      {
        "q": "The helping verb used for third person singular in Present Perfect Tense.",
        "ans": "Has"
      },
      {
        "q": "The tense of the action that occurred first between two past sequential actions.",
        "ans": "Past Perfect Tense (had + V3)"
      }
    ],
    "matchFollowing": [
      {
        "left": "Simple Present",
        "right": "Subject + V1(s/es)",
        "pair": "1 -> Subject + V1(s/es)"
      },
      {
        "left": "Past Continuous",
        "right": "was/were + V1-ing",
        "pair": "2 -> was/were + V1-ing"
      },
      {
        "left": "Present Perfect",
        "right": "has/have + V3",
        "pair": "3 -> has/have + V3"
      },
      {
        "left": "Past Perfect",
        "right": "had + V3",
        "pair": "4 -> had + V3"
      },
      {
        "left": "Future Continuous",
        "right": "will be + V1-ing",
        "pair": "5 -> will be + V1-ing"
      }
    ],
    "goldenPoints": [
      "There are 3 main Times (Present, Past, Future) and 4 Aspects (Simple, Continuous, Perfect, Perfect Continuous), creating 12 Tenses.",
      "Third-person singular in Simple Present takes '-s' or '-es' (He plays, She watches, It runs).",
      "Do NOT use continuous aspect (-ing) with stative verbs (e.g., say 'I know him', NOT 'I am knowing him').",
      "Past Perfect (had + V3) always refers to an action completed BEFORE another past action.",
      "Use 'Since' for a definite point of time (since 2010, since 6 AM); use 'For' for a duration (for 4 hours, for 2 years).",
      "Present Perfect (has/have + V3) links a completed past action with present relevance.",
      "Future Perfect (will have + V3) denotes an action that will be completed before a specified future deadline.",
      "In questions and negative sentences in Simple Past, use 'did + V1' (e.g., 'Did you see?', NOT 'Did you saw?').",
      "In Simple Present negative and questions, use 'do/does + V1' (e.g., 'He does not go').",
      "Consistent verb tense throughout a paragraph is essential for grammatical coherence."
    ],
    "sectionMCQ": [
      {
        "q": "Choose the correct sentence in Simple Past Tense:",
        "options": [
          "A) She did not went to school.",
          "B) She did not go to school.",
          "C) She does not went to school.",
          "D) She has not go to school."
        ],
        "ans": "B) She did not go to school.",
        "exp": "After the auxiliary 'did / did not', the main verb must strictly be in its base form (V1 'go')."
      },
      {
        "q": "'The train ______ before we reached the platform.' Choose the correct option:",
        "options": [
          "A) left",
          "B) had left",
          "C) has left",
          "D) was leaving"
        ],
        "ans": "B) had left",
        "exp": "The earlier of two past actions requires the Past Perfect Tense ('had left')."
      },
      {
        "q": "Identify the tense: 'They have been constructing this flyover for eighteen months.'",
        "options": [
          "A) Present Continuous",
          "B) Past Perfect Continuous",
          "C) Present Perfect Continuous",
          "D) Future Perfect Continuous"
        ],
        "ans": "C) Present Perfect Continuous",
        "exp": "'have been constructing' + duration 'for eighteen months' marks Present Perfect Continuous."
      },
      {
        "q": "Select the correct form: 'The sun ______ in the West.'",
        "options": [
          "A) is setting",
          "B) set",
          "C) sets",
          "D) has set"
        ],
        "ans": "C) sets",
        "exp": "Universal natural phenomena use Simple Present Tense third-person singular ('sets')."
      },
      {
        "q": "Which keyword is a typical indicator of Present Perfect Tense?",
        "options": [
          "A) yesterday",
          "B) already",
          "C) tomorrow",
          "D) last year"
        ],
        "ans": "B) already",
        "exp": "'Already', 'just', 'yet', and 'recently' are standard adverbs associated with Present Perfect Tense."
      }
    ]
  },
  {
    "id": 3,
    "title": "Articles: A, An, The & Zero Article",
    "theme": "Unit 3: Determiners & Articles",
    "unit": "Unit 3: Determiners & Articles",
    "summary": "Complete mastery of Indefinite Articles (A, An) based on phonetic vowel sounds, the Definite Article (The) for specific entities, unique nouns, superlatives, and geographical landmarks, along with rules for the Omission of Articles (Zero Article).",
    "diagram": {
      "title": "Fig 3.1: The Article Decision Tree & Phonetic Vowel Rule",
      "svg": "<svg viewBox=\"0 0 580 240\" class=\"w-full h-auto max-w-[520px] mx-auto border border-emerald-200 rounded-lg bg-gradient-to-b from-emerald-50/70 to-slate-50 p-2\">\n  <rect x=\"210\" y=\"10\" width=\"160\" height=\"30\" rx=\"6\" fill=\"#064e3b\" stroke=\"#059669\" stroke-width=\"1.5\"/>\n  <text x=\"290\" y=\"30\" font-family=\"sans-serif\" font-size=\"11\" font-weight=\"bold\" fill=\"#ffffff\" text-anchor=\"middle\">ARTICLE SELECTION</text>\n  <line x1=\"290\" y1=\"40\" x2=\"160\" y2=\"70\" stroke=\"#059669\" stroke-width=\"1.5\"/>\n  <line x1=\"290\" y1=\"40\" x2=\"420\" y2=\"70\" stroke=\"#059669\" stroke-width=\"1.5\"/>\n  <rect x=\"90\" y=\"70\" width=\"140\" height=\"32\" rx=\"5\" fill=\"#d1fae5\" stroke=\"#10b981\" stroke-width=\"1.2\"/>\n  <text x=\"160\" y=\"90\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" fill=\"#065f46\" text-anchor=\"middle\">INDEFINITE (A / An)</text>\n  <line x1=\"160\" y1=\"102\" x2=\"100\" y2=\"130\" stroke=\"#10b981\" stroke-width=\"1.2\"/>\n  <line x1=\"160\" y1=\"102\" x2=\"220\" y2=\"130\" stroke=\"#10b981\" stroke-width=\"1.2\"/>\n  <rect x=\"40\" y=\"130\" width=\"110\" height=\"42\" rx=\"4\" fill=\"#ffffff\" stroke=\"#059669\" stroke-width=\"1\"/>\n  <text x=\"95\" y=\"148\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" fill=\"#047857\" text-anchor=\"middle\">'A' + Consonant Sound</text>\n  <text x=\"95\" y=\"162\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#065f46\" text-anchor=\"middle\">a book, a university, a one-rupee</text>\n  <rect x=\"170\" y=\"130\" width=\"110\" height=\"42\" rx=\"4\" fill=\"#ffffff\" stroke=\"#059669\" stroke-width=\"1\"/>\n  <text x=\"225\" y=\"148\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" fill=\"#047857\" text-anchor=\"middle\">'An' + Vowel Sound</text>\n  <text x=\"225\" y=\"162\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#065f46\" text-anchor=\"middle\">an apple, an honest man, an hour</text>\n  <rect x=\"350\" y=\"70\" width=\"140\" height=\"32\" rx=\"5\" fill=\"#e0f2fe\" stroke=\"#0284c7\" stroke-width=\"1.2\"/>\n  <text x=\"420\" y=\"90\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" fill=\"#075985\" text-anchor=\"middle\">DEFINITE ('The')</text>\n  <rect x=\"330\" y=\"125\" width=\"180\" height=\"52\" rx=\"4\" fill=\"#ffffff\" stroke=\"#0284c7\" stroke-width=\"1\"/>\n  <text x=\"420\" y=\"143\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" fill=\"#0369a1\" text-anchor=\"middle\">Specific / Unique / Superlative</text>\n  <text x=\"420\" y=\"156\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#0284c7\" text-anchor=\"middle\">Unique: the Sun, the Earth</text>\n  <text x=\"420\" y=\"167\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#0284c7\" text-anchor=\"middle\">Rivers/Oceans: the Ganga, the Pacific</text>\n  <rect x=\"90\" y=\"195\" width=\"400\" height=\"32\" rx=\"5\" fill=\"#fef2f2\" stroke=\"#ef4444\" stroke-width=\"1\"/>\n  <text x=\"290\" y=\"215\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" fill=\"#991b1b\" text-anchor=\"middle\">ZERO ARTICLE: Omit before Proper Nouns, Meals, Uncountable concepts &amp; Languages</text>\n</svg>",
      "caption": "Figure 3.1: Decision flowchart for selecting 'A', 'An', 'The' or Omission of Article based on phonetic sound and specificity."
    },
    "diagramQuestions": [
      {
        "q": "Why do we say 'a university' instead of 'an university' according to phonetic rules?",
        "ans": "Although 'university' begins with the vowel letter 'u', it produces the consonant glide sound <strong>/juː/ ('yoo')</strong> as in 'yellow'. Therefore, it takes the indefinite article '<strong>a</strong>'."
      },
      {
        "q": "Why does 'honest' take 'an' instead of 'a'?",
        "ans": "In 'honest', the initial letter 'h' is silent, so the word begins with the short vowel sound <strong>/ɒ/ ('on-ist')</strong>, mandating the use of '<strong>an</strong>'."
      }
    ],
    "sectionA": [
      {
        "q": "Explain the Phonetic Rule for using 'A' vs 'An' with five tricky exception words.",
        "ans": "The choice between <strong>'A'</strong> and <strong>'An'</strong> is determined entirely by the <strong>initial sound</strong> (pronunciation) of the following word, NOT its written spelling.<br><br><strong>1. Use 'A' before Consonant Sounds:</strong><br>• <em>A European</em> (sounds like 'yoo-ro-pee-an', starts with consonant glide /j/).<br>• <em>A university</em> (starts with /j/ sound).<br>• <em>A one-rupee note</em> (sounds like 'wun', starts with consonant glide /w/).<br>• <em>A unique idea</em> (sounds like 'yoo-neek').<br><br><strong>2. Use 'An' before Vowel Sounds (a, e, i, o, u):</strong><br>• <em>An honest man</em> (silent 'h', begins with vowel sound /ɒ/).<br>• <em>An hour</em> (silent 'h', begins with /aʊ/).<br>• <em>An heir</em> (silent 'h', sounds like 'air').<br>• <em>An MLA / An MP / An FIR / An SDM</em> (abbreviations starting with letter names having initial vowel sound /eɪ/ or /ɛ/).<br>• <em>An umbrella</em> (short vowel sound /ʌ/)."
      },
      {
        "q": "List and explain seven distinct grammatical situations where the Definite Article 'The' is mandatory.",
        "ans": "The definite article <strong>'The'</strong> is required in the following cases:<br><strong>1. Specific entity or second mention:</strong> When referring to a particular person or item already mentioned (e.g., 'I met a boy; <em>the</em> boy was weeping').<br><strong>2. Unique objects in nature:</strong> Celestial and unique bodies (e.g., <em>the Sun, the Moon, the Equator, the Sky</em>).<br><strong>3. Superlative degrees of adjectives:</strong> (e.g., <em>the tallest boy, the most intelligent girl</em>).<br><strong>4. Holy scriptures and famous books:</strong> (e.g., <em>the Ramayana, the Quran, the Bible, the Geeta</em>).<br><strong>5. Oceans, Seas, Rivers, and Mountain Ranges:</strong> (e.g., <em>the Indian Ocean, the Arabian Sea, the Ganga, the Himalayas</em> - NOT individual peaks like Mount Everest).<br><strong>6. Plural countries and republics:</strong> (e.g., <em>the USA, the UK, the Netherlands, the United Arab Emirates</em>).<br><strong>7. Musical instruments and ordinal numbers:</strong> (e.g., 'plays <em>the</em> guitar', '<em>the</em> first chapter')."
      },
      {
        "q": "What is 'Zero Article'? Detail six conditions where articles must be strictly omitted.",
        "ans": "<strong>Zero Article</strong> refers to grammatical contexts where no article is used before a noun.<br><strong>1. Before Proper Nouns:</strong> Names of people, single cities, and single countries (e.g., '<em>Delhi</em> is in <em>India</em>', NOT 'the Delhi').<br><strong>2. Before Names of Materials and Uncountable Nouns:</strong> When used in a general sense (e.g., '<em>Gold</em> is a precious metal', '<em>Water</em> is essential').<br><strong>3. Before Abstract Nouns in general context:</strong> (e.g., '<em>Wisdom</em> is the gift of heaven', '<em>Honesty</em> is best').<br><strong>4. Before Names of Meals:</strong> (e.g., 'We have <em>breakfast</em> at 8 AM', 'invited for <em>dinner</em>').<br><strong>5. Before Languages and Academic Subjects:</strong> (e.g., 'speaks <em>English</em> and <em>Hindi</em>', 'good at <em>Mathematics</em>').<br><strong>6. Before Names of Sports and Games:</strong> (e.g., 'He plays <em>cricket</em> and <em>badminton</em>')."
      },
      {
        "q": "Explain the difference in meaning between: (a) 'A few' vs 'Few', and (b) 'A little' vs 'Little'.",
        "ans": "<strong>(a) Countable Nouns:</strong><br>• <strong>'Few':</strong> Has a negative meaning, signifying almost none / negligible (e.g., 'He has <em>few</em> friends' = almost no friends).<br>• <strong>'A few':</strong> Has a positive meaning, signifying some / a small number (e.g., 'He has <em>a few</em> friends' = some friends exist).<br><br><strong>(b) Uncountable Nouns:</strong><br>• <strong>'Little':</strong> Negative meaning, signifying hardly any / almost zero (e.g., 'There is <em>little</em> hope of recovery').<br>• <strong>'A little':</strong> Positive meaning, signifying a small amount / at least some (e.g., 'There is <em>a little</em> milk in the glass')."
      },
      {
        "q": "Correct the article errors in the following paragraph with clear justifications:<br>'The copper is an useful metal. He is a honest student of the Delhi University.'",
        "ans": "<strong>Corrected Paragraph:</strong> '<em>Copper</em> is <em>a</em> useful metal. He is <em>an</em> honest student of <em>Delhi University</em>.'<br><br><strong>Justifications:</strong><br>1. 'Copper' is a material noun used in a general sense, so 'The' is omitted (Zero Article).<br>2. 'Useful' begins with the consonant glide sound /juː/, requiring 'a' instead of 'an'.<br>3. 'Honest' begins with a vowel sound /ɒ/ (silent 'h'), requiring 'an' instead of 'a'.<br>4. 'Delhi University' is a proper name, so 'the' is omitted."
      }
    ],
    "sectionB": [
      {
        "q": "Insert the correct article: 'He returned after ______ hour.'",
        "ans": "He returned after <strong>an</strong> hour. (Silent 'h' produces an initial vowel sound)."
      },
      {
        "q": "Insert the correct article: 'Mount Everest is ______ highest mountain in the world.'",
        "ans": "Mount Everest is <strong>the</strong> highest mountain in the world. ('highest' is in the superlative degree)."
      },
      {
        "q": "Insert the correct article: 'Dr. Sharma is ______ M.B.B.S. doctor.'",
        "ans": "Dr. Sharma is <strong>an</strong> M.B.B.S. doctor. (The letter 'M' is pronounced /ɛm/, starting with a vowel sound)."
      },
      {
        "q": "Explain why 'the' is used before 'Himalayas' but NOT before 'Mount Everest'.",
        "ans": "<strong>The</strong> is used before mountain <em>ranges</em> comprising multiple peaks (<em>the Himalayas, the Alps</em>), but is omitted before <em>individual solitary peaks</em> (Mount Everest, K2, Mount Abu)."
      },
      {
        "q": "Insert the correct article: '______ Ganga is ______ sacred river.'",
        "ans": "<strong>The</strong> Ganga is <strong>a</strong> sacred river. (Rivers take 'The'; 'sacred' begins with consonant sound /s/ taking 'a')."
      }
    ],
    "trueFalse": [
      {
        "q": "The word 'European' begins with the letter 'E' and therefore takes the article 'an'.",
        "ans": "False",
        "reason": "'European' is pronounced with the consonant glide /juː/, taking 'a European'."
      },
      {
        "q": "We must not use articles before names of languages such as Hindi, English, and Sanskrit.",
        "ans": "True",
        "reason": "Languages take Zero Article unless followed by the word 'language' (e.g., 'the English language')."
      },
      {
        "q": "Names of single islands and individual mountain peaks take the definite article 'the'.",
        "ans": "False",
        "reason": "'The' is used for island groups and mountain ranges, not individual peaks or single islands."
      },
      {
        "q": "'An' is used before abbreviations whose first letter name starts with a vowel sound (e.g., an NCC cadet).",
        "ans": "True",
        "reason": "'N' is pronounced /ɛn/ with an initial vowel sound, requiring 'an'."
      },
      {
        "q": "Before breakfast, lunch, and dinner in normal daily routines, we use 'the'.",
        "ans": "False",
        "reason": "Daily meals take Zero Article unless a specific hosted banquet is referenced."
      }
    ],
    "oneWord": [
      {
        "q": "The class of words comprising 'a', 'an', and 'the' that determine noun definiteness.",
        "ans": "Articles (Determiners)"
      },
      {
        "q": "The article used before singular countable nouns spoken of for the first time with consonant sounds.",
        "ans": "Indefinite Article 'A'"
      },
      {
        "q": "The grammatical term for omitting articles before proper nouns and material nouns.",
        "ans": "Zero Article"
      },
      {
        "q": "The article required before unique natural bodies like the Sun and the Moon.",
        "ans": "Definite Article 'The'"
      },
      {
        "q": "The indefinite article used before 'one-way ticket'.",
        "ans": "A (due to consonant /w/ sound)"
      }
    ],
    "matchFollowing": [
      {
        "left": "An honest officer",
        "right": "Silent 'H' vowel sound",
        "pair": "1 -> Silent 'H' vowel sound"
      },
      {
        "left": "A university campus",
        "right": "Consonant /juː/ glide sound",
        "pair": "2 -> Consonant /juː/ glide sound"
      },
      {
        "left": "The Pacific Ocean",
        "right": "Major ocean water body",
        "pair": "3 -> Major ocean water body"
      },
      {
        "left": "The Gita",
        "right": "Sacred holy scripture",
        "pair": "4 -> Sacred holy scripture"
      },
      {
        "left": "Gold is valuable",
        "right": "Zero Article (Material Noun)",
        "pair": "5 -> Zero Article (Material Noun)"
      }
    ],
    "goldenPoints": [
      "Article selection is based strictly on SOUND (phonetics), NOT the alphabet letter spelling.",
      "Use 'A' before consonant sounds (a car, a boy, a university, a European, a one-eyed man).",
      "Use 'An' before vowel sounds (an egg, an inkpot, an honest man, an hour, an MLA).",
      "Always use 'The' before Superlatives (the best, the highest, the most important).",
      "Use 'The' before names of rivers, seas, oceans, mountain ranges, and sacred scriptures.",
      "Do NOT use 'The' before single mountain peaks (Mount Everest) or single lakes (Lake Superior).",
      "Omit articles before proper nouns (people, cities, single nations), languages, sports, and daily meals.",
      "When a common noun is repeated a second time in a narrative, it takes 'The' (first mention: 'a man', second mention: 'the man').",
      "'Few' and 'Little' mean almost none (negative); 'A few' and 'A little' mean some (positive).",
      "Uncountable nouns (water, milk, honesty, gold) take NO article when used in a general sense."
    ],
    "sectionMCQ": [
      {
        "q": "Which article correctly fills the blank: 'He is ______ honorary secretary of the club.'",
        "options": [
          "A) a",
          "B) an",
          "C) the",
          "D) no article"
        ],
        "ans": "B) an",
        "exp": "'Honorary' has a silent 'h' and begins with the vowel sound /ɒn-ər-ər-i/."
      },
      {
        "q": "Choose the correct sentence:",
        "options": [
          "A) The gold is a precious metal.",
          "B) Gold is a precious metal.",
          "C) A gold is a precious metal.",
          "D) An gold is a precious metal."
        ],
        "ans": "B) Gold is a precious metal.",
        "exp": "Material nouns used in a general context take Zero Article."
      },
      {
        "q": "Fill in the blank: 'Ravi is ______ most brilliant student in class.'",
        "options": [
          "A) a",
          "B) an",
          "C) the",
          "D) no article"
        ],
        "ans": "C) the",
        "exp": "Superlative degree ('most brilliant') obligatorily requires the definite article 'the'."
      },
      {
        "q": "Which of the following requires the article 'a'?",
        "options": [
          "A) umbrella",
          "B) uncle",
          "C) union",
          "D) umpire"
        ],
        "ans": "C) union",
        "exp": "'Union' is pronounced with the consonant glide sound /juːn-jən/ ('yoon-yun')."
      },
      {
        "q": "Select the sentence where 'The' is INCORRECTLY used:",
        "options": [
          "A) The Ganga is holy.",
          "B) The Mount Everest is high.",
          "C) The Sun is bright.",
          "D) The Ramayana is ancient."
        ],
        "ans": "B) The Mount Everest is high.",
        "exp": "Individual solitary peaks never take the definite article 'The'."
      }
    ]
  },
  {
    "id": 4,
    "title": "Possessives & Apostrophe Rules",
    "theme": "Unit 4: Possession & Ownership",
    "unit": "Unit 4: Possession & Ownership",
    "summary": "Detailed study of expressing ownership in English using the Apostrophe ('s / s'), Possessive Adjectives vs Possessive Pronouns, and rules for singular, regular plural, and irregular plural nouns.",
    "diagram": {
      "title": "Fig 4.1: The Apostrophe Possessive Matrix (Singular vs Plural)",
      "svg": "<svg viewBox=\"0 0 560 220\" class=\"w-full h-auto max-w-[500px] mx-auto border border-amber-200 rounded-lg bg-gradient-to-b from-amber-50/70 to-slate-50 p-2\">\n  <rect x=\"180\" y=\"10\" width=\"200\" height=\"28\" rx=\"5\" fill=\"#78350f\" stroke=\"#b45309\" stroke-width=\"1.5\"/>\n  <text x=\"280\" y=\"28\" font-family=\"sans-serif\" font-size=\"10.5\" font-weight=\"bold\" fill=\"#ffffff\" text-anchor=\"middle\">APOSTROPHE ('S) RULES</text>\n  <line x1=\"280\" y1=\"38\" x2=\"140\" y2=\"65\" stroke=\"#b45309\" stroke-width=\"1.5\"/>\n  <line x1=\"280\" y1=\"38\" x2=\"420\" y2=\"65\" stroke=\"#b45309\" stroke-width=\"1.5\"/>\n  <rect x=\"40\" y=\"65\" width=\"200\" height=\"60\" rx=\"5\" fill=\"#fef3c7\" stroke=\"#d97706\" stroke-width=\"1.2\"/>\n  <text x=\"140\" y=\"83\" font-family=\"sans-serif\" font-size=\"9.5\" font-weight=\"bold\" fill=\"#92400e\" text-anchor=\"middle\">1. SINGULAR NOUNS</text>\n  <text x=\"140\" y=\"98\" font-family=\"sans-serif\" font-size=\"8.5\" fill=\"#78350f\" text-anchor=\"middle\">Add 's to the word</text>\n  <text x=\"140\" y=\"112\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#451a03\" text-anchor=\"middle\">Boy -> Boy's bag | Girl -> Girl's book</text>\n  <rect x=\"320\" y=\"65\" width=\"200\" height=\"60\" rx=\"5\" fill=\"#fef3c7\" stroke=\"#d97706\" stroke-width=\"1.2\"/>\n  <text x=\"420\" y=\"83\" font-family=\"sans-serif\" font-size=\"9.5\" font-weight=\"bold\" fill=\"#92400e\" text-anchor=\"middle\">2. PLURAL NOUNS</text>\n  <text x=\"420\" y=\"98\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#78350f\" text-anchor=\"middle\">Ends in -s -> Add only ' (Boys -> Boys' hostel)</text>\n  <text x=\"420\" y=\"112\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#451a03\" text-anchor=\"middle\">No -s -> Add 's (Children -> Children's park)</text>\n  <rect x=\"30\" y=\"140\" width=\"500\" height=\"65\" rx=\"5\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n  <text x=\"280\" y=\"156\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" fill=\"#1e293b\" text-anchor=\"middle\">Possessive Adjectives vs Possessive Pronouns</text>\n  <text x=\"150\" y=\"174\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#0369a1\" text-anchor=\"middle\">Adjectives (+ Noun): my, your, his, her, our, their</text>\n  <text x=\"410\" y=\"174\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#047857\" text-anchor=\"middle\">Pronouns (Alone): mine, yours, his, hers, ours, theirs</text>\n  <text x=\"280\" y=\"192\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#64748b\" text-anchor=\"middle\">Example: \"This is my book (Adj).\" vs \"This book is mine (Pronoun).\"</text>\n</svg>",
      "caption": "Figure 4.1: Guidelines for using apostrophes with singular/plural nouns and comparing possessive determiners."
    },
    "diagramQuestions": [
      {
        "q": "Where is the apostrophe placed for a regular plural noun ending in 's'?",
        "ans": "For regular plural nouns ending in 's' (e.g., <em>girls, teachers, dogs</em>), the apostrophe is placed <strong>after the final 's' without adding another 's'</strong> (e.g., <em>girls' school, teachers' staffroom</em>)."
      },
      {
        "q": "How do irregular plural nouns that do not end in 's' form their possessive?",
        "ans": "Irregular plurals without an 's' (e.g., <em>children, men, women, mice</em>) form their possessive by adding <strong>apostrophe + s ('s)</strong> (e.g., <em>children's toys, women's college</em>)."
      }
    ],
    "sectionA": [
      {
        "q": "Explain all four rules for forming the Possessive Case of Nouns with two examples each.",
        "ans": "The <strong>Possessive Case</strong> shows ownership, origin, or association.<br><br><strong>1. Singular Nouns:</strong> Formed by adding an apostrophe and 's' (<strong>'s</strong>).<br><em>Examples:</em> 'The <em>king's</em> crown', '<em>Rohan's</em> bicycle'.<br><br><strong>2. Plural Nouns ending in 's':</strong> Formed by adding only the apostrophe (<strong>'</strong>) after the 's'.<br><em>Examples:</em> 'The <em>students'</em> union', 'A <em>birds'</em> sanctuary'.<br><br><strong>3. Irregular Plural Nouns not ending in 's':</strong> Formed by adding <strong>'s</strong>.<br><em>Examples:</em> '<em>Men's</em> wear', '<em>Children's</em> literature'.<br><br><strong>4. Non-Living Objects (Inanimate things):</strong> Do NOT use 's. Use the preposition <strong>'of'</strong>.<br><em>Examples:</em> 'The <em>legs of the table</em>' (NOT table's legs); 'The <em>roof of the house</em>' (NOT house's roof).<br><em>Exception:</em> Personified objects, time, and distance can take 's (e.g., <em>nature's law, a day's journey, a stone's throw</em>)."
      },
      {
        "q": "Compare Possessive Adjectives and Possessive Pronouns in a structured tabular format with examples.",
        "ans": "<strong>Comparative Matrix:</strong><br><br>1. <strong>First Person:</strong><br>• Possessive Adjective (+ Noun): <em>My car, Our house</em><br>• Possessive Pronoun (Standalone): <em>The car is mine, The house is ours</em><br><br>2. <strong>Second Person:</strong><br>• Possessive Adjective: <em>Your bag</em><br>• Possessive Pronoun: <em>The bag is yours</em><br><br>3. <strong>Third Person (Masc/Fem/Neuter/Plural):</strong><br>• Possessive Adjective: <em>His pen, Her dress, Its tail, Their classroom</em><br>• Possessive Pronoun: <em>The pen is his, The dress is hers, (No possessive pronoun for 'it'), The classroom is theirs</em><br><br><em>Key Rule:</em> Possessive Pronouns (yours, hers, ours, theirs, its) <strong>NEVER take an apostrophe</strong> (write <em>yours faithfully</em>, NEVER <em>your's</em>)."
      },
      {
        "q": "Distinguish between 'It's' and 'Its' with three practical sentence pairs.",
        "ans": "<strong>1. It's (with an apostrophe):</strong> A contraction meaning <strong>'It is'</strong> or <strong>'It has'</strong>.<br>• <em>Sentence:</em> '<em>It's</em> raining heavily outside.' (= It is raining).<br>• <em>Sentence:</em> '<em>It's</em> been a long time.' (= It has been).<br><br><strong>2. Its (without an apostrophe):</strong> The <strong>possessive adjective</strong> of the neuter pronoun 'It', signifying belonging to a thing or animal.<br>• <em>Sentence:</em> 'The dog wagged <em>its</em> tail.' (The tail of the dog).<br>• <em>Sentence:</em> 'The tree shed all <em>its</em> leaves in autumn.'"
      },
      {
        "q": "Explain the Joint vs Separate Possession rule when two or more nouns own something.",
        "ans": "<strong>1. Joint Possession (Shared single ownership):</strong> When two or more nouns jointly possess the same single entity, add <strong>'s only to the last noun</strong>.<br><em>Example:</em> '<em>Rohan and Sohan's</em> father is a doctor.' (They share the same father).<br><br><strong>2. Separate Possession (Individual separate ownership):</strong> When two or more nouns possess separate individual entities, add <strong>'s to each noun separately</strong>.<br><em>Example:</em> '<em>Shakespeare's and Milton's</em> poems are world-famous.' (Separate works by Shakespeare and Milton)."
      },
      {
        "q": "Correct the possessive errors in the following sentences with explanations:<br>(a) This is the table's leg.<br>(b) Yours' obediently.<br>(c) We visited the childrens' park.",
        "ans": "(a) <em>Incorrect:</em> This is the table's leg.<br><strong>Corrected:</strong> 'This is the <strong>leg of the table</strong>.' (Inanimate objects take 'of', not apostrophe 's').<br><br>(b) <em>Incorrect:</em> Yours' obediently.<br><strong>Corrected:</strong> '<strong>Yours</strong> obediently.' (Possessive pronouns never take an apostrophe).<br><br>(c) <em>Incorrect:</em> We visited the childrens' park.<br><strong>Corrected:</strong> 'We visited the <strong>children's</strong> park.' (Irregular plural 'children' takes 's, not s')."
      }
    ],
    "sectionB": [
      {
        "q": "Form the possessive form of 'the soldiers' uniforms'. Is it correct as written?",
        "ans": "Yes, 'the <strong>soldiers'</strong> uniforms' is completely correct because 'soldiers' is a regular plural ending in 's', requiring only a trailing apostrophe."
      },
      {
        "q": "Change into possessive: 'The books belonging to the boys.'",
        "ans": "The <strong>boys'</strong> books."
      },
      {
        "q": "Fill in the blank: 'This jacket belongs to me. It is ______ (my/mine).'",
        "ans": "This jacket is <strong>mine</strong>. (Used as a possessive pronoun without a following noun)."
      },
      {
        "q": "Identify whether the underlined word is a Possessive Adjective or Possessive Pronoun: 'That bicycle is <u>hers</u>.'",
        "ans": "'Hers' is a <strong>Possessive Pronoun</strong>."
      },
      {
        "q": "Provide the correct phrase for 'a journey of three weeks'.",
        "ans": "A <strong>three weeks' journey</strong>."
      }
    ],
    "trueFalse": [
      {
        "q": "The possessive pronoun 'yours' must be written with an apostrophe as 'your's'.",
        "ans": "False",
        "reason": "Possessive pronouns (yours, hers, ours, theirs, its) never take apostrophes."
      },
      {
        "q": "We can use 's with inanimate non-living objects like 'book's cover'.",
        "ans": "False",
        "reason": "Non-living items use preposition 'of' ('the cover of the book')."
      },
      {
        "q": "'It's' is the short contraction of 'It is' or 'It has'.",
        "ans": "True",
        "reason": "The apostrophe in 'it's' indicates omission of letters (is/has)."
      },
      {
        "q": "When two people share joint ownership of a house, 's is added only to the second name.",
        "ans": "True",
        "reason": "Joint ownership requires 's only on the final noun (e.g., 'Ravi and Anita's house')."
      },
      {
        "q": "The possessive form of the word 'women' is 'womens''.",
        "ans": "False",
        "reason": "The correct possessive of irregular plural 'women' is 'women's'."
      }
    ],
    "oneWord": [
      {
        "q": "The punctuation mark used to indicate possession and missing letters in contractions.",
        "ans": "Apostrophe ( ' )"
      },
      {
        "q": "The possessive pronoun for the first person singular ('I').",
        "ans": "Mine"
      },
      {
        "q": "The possessive form of 'a ladies college'.",
        "ans": "Ladies' College"
      },
      {
        "q": "The possessive adjective form of the pronoun 'he'.",
        "ans": "His"
      },
      {
        "q": "The phrase used to denote the leg of a chair correctly.",
        "ans": "The leg of the chair"
      }
    ],
    "matchFollowing": [
      {
        "left": "Girl (Singular)",
        "right": "Girl's ribbon",
        "pair": "1 -> Girl's ribbon"
      },
      {
        "left": "Girls (Plural)",
        "right": "Girls' common room",
        "pair": "2 -> Girls' common room"
      },
      {
        "left": "Children (Irregular Plural)",
        "right": "Children's playground",
        "pair": "3 -> Children's playground"
      },
      {
        "left": "Contraction",
        "right": "It's (= It is)",
        "pair": "4 -> It's (= It is)"
      },
      {
        "left": "Possessive Pronoun",
        "right": "Theirs (no apostrophe)",
        "pair": "5 -> Theirs (no apostrophe)"
      }
    ],
    "goldenPoints": [
      "Singular nouns take 's (e.g., student's desk, doctor's clinic).",
      "Regular plural nouns ending in 's' take only the trailing apostrophe (e.g., students' desks).",
      "Irregular plural nouns not ending in 's' take 's (e.g., children's books, women's club).",
      "Do NOT use 's for inanimate non-living objects; use 'of' (the blade of the fan, NOT fan's blade).",
      "Possessive pronouns (mine, yours, his, hers, its, ours, theirs) NEVER take an apostrophe.",
      "'It's' = It is / It has (Contraction); 'Its' = belonging to it (Possessive Adjective).",
      "Joint ownership: 'Rohan and Sohan's mother' (One mother shared).",
      "Separate ownership: 'Rohan's and Sohan's bags' (Two separate bags).",
      "Time, distance, and weight can take 's (a month's leave, a mile's walk).",
      "In formal letter closures, write 'Yours faithfully' or 'Yours sincerely' without any apostrophe."
    ],
    "sectionMCQ": [
      {
        "q": "Choose the grammatically correct sentence:",
        "options": [
          "A) The dog hurt it's leg.",
          "B) The dog hurt its leg.",
          "C) The dog hurt its' leg.",
          "D) The dog hurt it leg."
        ],
        "ans": "B) The dog hurt its leg.",
        "exp": "'Its' is the correct possessive adjective indicating ownership by an animal."
      },
      {
        "q": "Select the correct possessive phrase for 'a hostel for boys':",
        "options": [
          "A) boy's hostel",
          "B) boys's hostel",
          "C) boys' hostel",
          "D) boyes hostel"
        ],
        "ans": "C) boys' hostel",
        "exp": "Plural nouns ending in 's' take only an apostrophe after the 's'."
      },
      {
        "q": "Which expression is INCORRECT?",
        "options": [
          "A) The car's wheel",
          "B) The wheel of the car",
          "C) A day's work",
          "D) The sun's rays"
        ],
        "ans": "A) The car's wheel",
        "exp": "Non-living inanimate objects take 'of the car', not 'car's'."
      },
      {
        "q": "'This classroom belongs to us. It is ______.'",
        "options": [
          "A) our",
          "B) ours",
          "C) our's",
          "D) ours'"
        ],
        "ans": "B) ours",
        "exp": "'Ours' is the possessive pronoun used without an accompanying noun."
      },
      {
        "q": "Identify the correct closure for an official letter:",
        "options": [
          "A) Your's obediently",
          "B) Yours' obediently",
          "C) Yours obediently",
          "D) Your obedient"
        ],
        "ans": "C) Yours obediently",
        "exp": "Possessive pronoun 'Yours' never takes an apostrophe."
      }
    ]
  },
  {
    "id": 5,
    "title": "Verb -ing Form: Gerund and Participle",
    "theme": "Unit 5: Non-Finite Verbs",
    "unit": "Unit 5: Non-Finite Verbs",
    "summary": "Clear functional distinction between the Gerund (Verbal Noun) and the Present Participle (Verbal Adjective / Continuous Verb). Features identification tests, subject/object positions, and participle clauses.",
    "diagram": {
      "title": "Fig 5.1: The Dual Nature of the Verb -ing Form (Gerund vs Participle)",
      "svg": "<svg viewBox=\"0 0 580 230\" class=\"w-full h-auto max-w-[520px] mx-auto border border-purple-200 rounded-lg bg-gradient-to-b from-purple-50/70 to-slate-50 p-2\">\n  <rect x=\"210\" y=\"10\" width=\"160\" height=\"30\" rx=\"6\" fill=\"#4c1d95\" stroke=\"#6d28d9\" stroke-width=\"1.5\"/>\n  <text x=\"290\" y=\"30\" font-family=\"sans-serif\" font-size=\"11\" font-weight=\"bold\" fill=\"#ffffff\" text-anchor=\"middle\">VERB + -ING FORM</text>\n  <line x1=\"290\" y1=\"40\" x2=\"160\" y2=\"70\" stroke=\"#7c3aed\" stroke-width=\"1.5\"/>\n  <line x1=\"290\" y1=\"40\" x2=\"420\" y2=\"70\" stroke=\"#7c3aed\" stroke-width=\"1.5\"/>\n  <rect x=\"60\" y=\"70\" width=\"200\" height=\"75\" rx=\"6\" fill=\"#f5f3ff\" stroke=\"#8b5cf6\" stroke-width=\"1.2\"/>\n  <text x=\"160\" y=\"88\" font-family=\"sans-serif\" font-size=\"10.5\" font-weight=\"bold\" fill=\"#5b21b6\" text-anchor=\"middle\">1. GERUND (Verbal Noun)</text>\n  <text x=\"160\" y=\"103\" font-family=\"sans-serif\" font-size=\"8.5\" fill=\"#6d28d9\" text-anchor=\"middle\">Functions like a NOUN</text>\n  <text x=\"160\" y=\"117\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#4c1d95\" text-anchor=\"middle\">Subject: Swimming is good exercise.</text>\n  <text x=\"160\" y=\"130\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#4c1d95\" text-anchor=\"middle\">Object: I enjoy reading books.</text>\n  <rect x=\"320\" y=\"70\" width=\"200\" height=\"75\" rx=\"6\" fill=\"#fdf2f8\" stroke=\"#ec4899\" stroke-width=\"1.2\"/>\n  <text x=\"420\" y=\"88\" font-family=\"sans-serif\" font-size=\"10.5\" font-weight=\"bold\" fill=\"#831843\" text-anchor=\"middle\">2. PARTICIPLE (Verbal Adjective)</text>\n  <text x=\"420\" y=\"103\" font-family=\"sans-serif\" font-size=\"8.5\" fill=\"#9d174d\" text-anchor=\"middle\">Functions like an ADJECTIVE / VERB</text>\n  <text x=\"420\" y=\"117\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#500724\" text-anchor=\"middle\">Adjective: Look at the barking dog.</text>\n  <text x=\"420\" y=\"130\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#500724\" text-anchor=\"middle\">Continuous: The dog is barking.</text>\n  <rect x=\"50\" y=\"160\" width=\"480\" height=\"50\" rx=\"5\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n  <text x=\"290\" y=\"178\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" fill=\"#1e293b\" text-anchor=\"middle\">The \"What?\" Test for Identification:</text>\n  <text x=\"290\" y=\"195\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#64748b\" text-anchor=\"middle\">If replacing the -ing word with \"SOMETHING\" makes sense, it is a GERUND (e.g., \"I like reading\" -> \"I like something\").</text>\n</svg>",
      "caption": "Figure 5.1: Functional comparison between Gerund (Noun function) and Present Participle (Adjective/Verb function)."
    },
    "diagramQuestions": [
      {
        "q": "How can you differentiate whether an '-ing' word is a Gerund or a Participle in a sentence?",
        "ans": "If the '-ing' word performs the role of a <strong>Noun</strong> (acting as the subject or object answering 'What?'), it is a <strong>Gerund</strong>. If it describes a noun like an <strong>Adjective</strong> or combines with 'is/am/are/was/were' to form continuous action, it is a <strong>Present Participle</strong>."
      },
      {
        "q": "In 'Walking along the road, he found a purse', classify 'Walking'.",
        "ans": "'Walking' is a <strong>Present Participle</strong> heading a participial clause qualifying the subject pronoun 'he'."
      }
    ],
    "sectionA": [
      {
        "q": "What is a Gerund? Explain its four major syntactic positions in sentences with examples.",
        "ans": "A <strong>Gerund</strong> is a verb ending in <em>-ing</em> that performs the syntactic function of a <strong>Noun</strong> (also called a <em>Verbal Noun</em>).<br><br><strong>1. As Subject of a Verb:</strong><br>• <em>Reading</em> expands our mental horizons.<br>• <em>Swimming</em> is an excellent cardiovascular exercise.<br><br><strong>2. As Object of a Transitive Verb:</strong><br>• Children love <em>playing</em> outdoors.<br>• She stopped <em>talking</em> when the teacher entered.<br><br><strong>3. As Complement of a Linking Verb:</strong><br>• My hobby is <em>gardening</em>.<br>• Seeing is <em>believing</em>.<br><br><strong>4. As Object of a Preposition:</strong><br>• He was punished for <em>coming</em> late.<br>• She is fond of <em>singing</em> classical songs."
      },
      {
        "q": "Define Present Participles and explain their dual functions as Verbs and Adjectives.",
        "ans": "A <strong>Present Participle</strong> is a verb form ending in <em>-ing</em> that retains verb characteristics while functioning as an <strong>Adjective</strong> (also known as a <em>Verbal Adjective</em>).<br><br><strong>1. Function as an Adjective (Qualifying Nouns):</strong><br>• 'A <em>rolling</em> stone gathers no moss.' ('rolling' qualifies the noun 'stone').<br>• 'Don't get into a <em>moving</em> bus.' ('moving' describes 'bus').<br><br><strong>2. Function in Continuous Tenses (Expressing Ongoing Action):</strong><br>• 'The students <em>are writing</em> their answers.'<br>• 'The birds <em>were chirping</em> in the morning.'<br><br><strong>3. Joining Sentences (Participial Phrases):</strong><br>• '<em>Hearing</em> the loud noise, the baby woke up.' (= When the baby heard the noise...)."
      },
      {
        "q": "Compare Gerunds and Present Participles with 5 parallel illustrative sentence pairs.",
        "ans": "<strong>Parallel Contrast Pairs:</strong><br><br>1. <strong>Pair 1 (Smoking):</strong><br>• <em>Gerund (Subject):</em> '<em>Smoking</em> is injurious to health.'<br>• <em>Participle (Adjective):</em> 'Look at that <em>smoking</em> chimney.'<br><br>2. <strong>Pair 2 (Barking):</strong><br>• <em>Gerund (Object):</em> 'I dislike constant <em>barking</em>.'<br>• <em>Participle (Adjective):</em> 'A <em>barking</em> dog seldom bites.'<br><br>3. <strong>Pair 3 (Singing):</strong><br>• <em>Gerund (Complement):</em> 'Her passion is <em>singing</em>.'<br>• <em>Participle (Verb):</em> 'The girl was <em>singing</em> melodiously.'<br><br>4. <strong>Pair 4 (Walking):</strong><br>• <em>Gerund (Subject):</em> '<em>Walking</em> is good for health.'<br>• <em>Participle (Adjective):</em> 'He bought a new <em>walking</em> stick.'<br><br>5. <strong>Pair 5 (Flying):</strong><br>• <em>Gerund (Prepositional Object):</em> 'He is terrified of <em>flying</em>.'<br>• <em>Participle (Adjective):</em> 'We spotted a <em>flying</em> bird.'"
      },
      {
        "q": "Explain the rule of Possessive Case before a Gerund with examples.",
        "ans": "A noun or pronoun placed immediately before a <strong>Gerund</strong> must strictly be in the <strong>Possessive Case</strong> (<em>my, your, his, her, their, Ram's</em>), NOT in the objective case (<em>me, you, him, them, Ram</em>).<br><br>• <em>Correct:</em> 'My father did not like <strong>my</strong> <em>going</em> there alone.'<br>• <em>Incorrect:</em> 'My father did not like <s>me</s> going there alone.'<br><br>• <em>Correct:</em> 'She insisted on <strong>Rohan's</strong> <em>attending</em> the seminar.'<br>• <em>Incorrect:</em> 'She insisted on <s>Rohan</s> attending the seminar.'"
      },
      {
        "q": "Combine the following sentence pairs into one using a Participle:<br>(a) He saw a snake. He ran away in fear.<br>(b) She was tired of waiting. She sat down on the bench.",
        "ans": "<strong>(a)</strong> <strong>Seeing a snake</strong>, he ran away in fear. (Present Participle phrase replacing the earlier action clause).<br><br><strong>(b)</strong> <strong>Tired of waiting</strong> / <strong>Being tired of waiting</strong>, she sat down on the bench. (Past/Present Participle phrase expressing reason)."
      }
    ],
    "sectionB": [
      {
        "q": "Identify the -ing word: '<u>Hunting</u> wild animals is strictly banned.'",
        "ans": "'Hunting' is a <strong>Gerund</strong> acting as the subject of the finite verb 'is banned'."
      },
      {
        "q": "Identify the -ing word: 'We heard the <u>soothing</u> sound of the waterfall.'",
        "ans": "'Soothing' is a <strong>Present Participle</strong> acting as an adjective modifying the noun 'sound'."
      },
      {
        "q": "Choose the correct pronoun: 'Please excuse ______ (me / my) interrupting you.'",
        "ans": "'Please excuse <strong>my</strong> interrupting you.' (Nouns/pronouns preceding a Gerund must be in the possessive case)."
      },
      {
        "q": "Rewrite using a Gerund: 'It is easy to find fault with others.'",
        "ans": "'<strong>Finding fault</strong> with others is easy.'"
      },
      {
        "q": "What is the function of 'painting' in: 'She is fond of painting.'?",
        "ans": "'Painting' is a <strong>Gerund</strong> functioning as the object of the preposition 'of'."
      }
    ],
    "trueFalse": [
      {
        "q": "A Gerund performs the syntactic function of an adjective in a sentence.",
        "ans": "False",
        "reason": "A Gerund functions as a noun (subject, object, complement), while a Participle functions as an adjective."
      },
      {
        "q": "In the sentence 'A drowning man catches at a straw', 'drowning' is a participle.",
        "ans": "True",
        "reason": "'Drowning' is a present participle modifying the noun 'man'."
      },
      {
        "q": "We should use an objective pronoun (me, him) before a Gerund.",
        "ans": "False",
        "reason": "Standard grammar mandates a possessive determiner (my, his, their) before a Gerund."
      },
      {
        "q": "Both Gerunds and Present Participles are formed by adding '-ing' to the base form of the verb.",
        "ans": "True",
        "reason": "They share identical morphology (V + ing) but differ in syntactic function."
      },
      {
        "q": "In 'The children were dancing', 'dancing' is a Gerund.",
        "ans": "False",
        "reason": "'Dancing' is a present participle forming the Past Continuous main verb."
      }
    ],
    "oneWord": [
      {
        "q": "A non-finite verb ending in -ing that functions as a noun in a sentence.",
        "ans": "Gerund (Verbal Noun)"
      },
      {
        "q": "A non-finite verb ending in -ing that functions as an adjective modifying a noun.",
        "ans": "Present Participle"
      },
      {
        "q": "The grammatical case required for a pronoun preceding a Gerund.",
        "ans": "Possessive Case (my, his, your)"
      },
      {
        "q": "The role of 'Jogging' in 'Jogging is beneficial for cardiovascular health.'",
        "ans": "Subject of the Verb"
      },
      {
        "q": "The non-finite verb class that includes Gerunds, Participles, and Infinitives.",
        "ans": "Non-Finite Verbs"
      }
    ],
    "matchFollowing": [
      {
        "left": "Swimming is healthy",
        "right": "Gerund as Subject",
        "pair": "1 -> Gerund as Subject"
      },
      {
        "left": "Enjoys cooking",
        "right": "Gerund as Object",
        "pair": "2 -> Gerund as Object"
      },
      {
        "left": "Barking dog",
        "right": "Participle as Adjective",
        "pair": "3 -> Participle as Adjective"
      },
      {
        "left": "Fond of drawing",
        "right": "Gerund after Preposition",
        "pair": "4 -> Gerund after Preposition"
      },
      {
        "left": "He was running",
        "right": "Participle in Continuous Verb",
        "pair": "5 -> Participle in Continuous Verb"
      }
    ],
    "goldenPoints": [
      "The '-ing' form has two primary non-finite functions: Gerund (Noun) and Present Participle (Adjective/Verb).",
      "A Gerund answers the question 'What?' and can be replaced with the pronoun 'it' or 'something'.",
      "A Present Participle answers 'What kind of?' or describes an ongoing action.",
      "Always use the Possessive Case before a Gerund (e.g., 'objected to HIS going', NOT 'him going').",
      "Verbs like enjoy, mind, avoid, stop, admit, and delay are typically followed directly by a Gerund.",
      "Prepositions are always followed by a Gerund, never an Infinitive (e.g., 'interested in learning', NOT 'in to learn').",
      "Participle clauses provide concise sentence combining (e.g., 'Seeing the police, the thief ran').",
      "Avoid dangling participles: the subject of a participial clause must match the subject of the main clause.",
      "A compound noun can be formed using a Gerund (e.g., washing machine, dining room).",
      "Understanding the Gerund vs Participle distinction is vital for accurate subject-verb agreement and formal writing."
    ],
    "sectionMCQ": [
      {
        "q": "Identify the function of 'dancing' in 'She loves dancing.'",
        "options": [
          "A) Present Participle",
          "B) Gerund as Object",
          "C) Finite Verb",
          "D) Adverb"
        ],
        "ans": "B) Gerund as Object",
        "exp": "'Dancing' is a verbal noun acting as the direct object of the transitive verb 'loves'."
      },
      {
        "q": "Choose the correct sentence:",
        "options": [
          "A) She insisted on me singing.",
          "B) She insisted on my singing.",
          "C) She insisted on I singing.",
          "D) She insisted on mine singing."
        ],
        "ans": "B) She insisted on my singing.",
        "exp": "A possessive adjective ('my') is required before the Gerund ('singing')."
      },
      {
        "q": "In 'The barking dog frightened the child', 'barking' is a:",
        "options": [
          "A) Gerund",
          "B) Present Participle as Adjective",
          "C) Main Verb",
          "D) Preposition"
        ],
        "ans": "B) Present Participle as Adjective",
        "exp": "'Barking' modifies the noun 'dog', functioning as a participial adjective."
      },
      {
        "q": "Which sentence contains a Gerund as the Subject?",
        "options": [
          "A) He is walking slowly.",
          "B) Walking is a great exercise.",
          "C) I saw a walking stick.",
          "D) They started walking."
        ],
        "ans": "B) Walking is a great exercise.",
        "exp": "'Walking' is the subject noun of the linking verb 'is'."
      },
      {
        "q": "Fill in the blank: 'He was punished for ______ in class.'",
        "options": [
          "A) talk",
          "B) talked",
          "C) talking",
          "D) to talk"
        ],
        "ans": "C) talking",
        "exp": "Prepositions (here 'for') require a Gerund ('talking') as their object."
      }
    ]
  },
  {
    "id": 6,
    "title": "Sentences, Clauses & Transformations",
    "theme": "Unit 6: Sentence Syntax & Structure",
    "unit": "Unit 6: Sentence Syntax & Structure",
    "summary": "Mastery of Sentence Anatomy (Subject and Predicate), Classification by Function (Assertive, Interrogative, Imperative, Optative, Exclamatory) and Structure (Simple, Compound, Complex), along with rules for transformation and clause identification.",
    "diagram": {
      "title": "Fig 6.1: Dual Classification of Sentences (By Function and By Structure)",
      "svg": "<svg viewBox=\"0 0 600 250\" class=\"w-full h-auto max-w-[540px] mx-auto border border-blue-200 rounded-lg bg-gradient-to-b from-blue-50/70 to-slate-50 p-2\">\n  <rect x=\"220\" y=\"10\" width=\"160\" height=\"28\" rx=\"5\" fill=\"#0f172a\" stroke=\"#334155\" stroke-width=\"1.5\"/>\n  <text x=\"300\" y=\"28\" font-family=\"sans-serif\" font-size=\"10.5\" font-weight=\"bold\" fill=\"#ffffff\" text-anchor=\"middle\">SENTENCE CLASSIFICATION</text>\n  <line x1=\"300\" y1=\"38\" x2=\"150\" y2=\"65\" stroke=\"#3b82f6\" stroke-width=\"1.5\"/>\n  <line x1=\"300\" y1=\"38\" x2=\"450\" y2=\"65\" stroke=\"#3b82f6\" stroke-width=\"1.5\"/>\n  <rect x=\"30\" y=\"65\" width=\"240\" height=\"135\" rx=\"6\" fill=\"#eff6ff\" stroke=\"#3b82f6\" stroke-width=\"1.2\"/>\n  <text x=\"150\" y=\"83\" font-family=\"sans-serif\" font-size=\"9.5\" font-weight=\"bold\" fill=\"#1e3a8a\" text-anchor=\"middle\">BY MEANING / FUNCTION (5)</text>\n  <text x=\"45\" y=\"102\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#1e40af\">1. Assertive (Declarative): States facts (.)</text>\n  <text x=\"45\" y=\"120\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#1e40af\">2. Interrogative: Asks questions (?)</text>\n  <text x=\"45\" y=\"138\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#1e40af\">3. Imperative: Order / Request / Advice (.)</text>\n  <text x=\"45\" y=\"156\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#1e40af\">4. Optative: Wish / Prayer (May God...)</text>\n  <text x=\"45\" y=\"174\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#1e40af\">5. Exclamatory: Sudden emotion (!)</text>\n  <rect x=\"330\" y=\"65\" width=\"240\" height=\"135\" rx=\"6\" fill=\"#f0fdf4\" stroke=\"#16a34a\" stroke-width=\"1.2\"/>\n  <text x=\"450\" y=\"83\" font-family=\"sans-serif\" font-size=\"9.5\" font-weight=\"bold\" fill=\"#14532d\" text-anchor=\"middle\">BY STRUCTURE (3)</text>\n  <text x=\"345\" y=\"105\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#15803d\">1. Simple: 1 Independent Clause</text>\n  <text x=\"345\" y=\"135\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#15803d\">2. Compound: 2+ Independent Clauses (FANBOYS)</text>\n  <text x=\"345\" y=\"165\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#15803d\">3. Complex: 1 Main Clause + 1+ Subordinate Clauses</text>\n  <rect x=\"60\" y=\"210\" width=\"480\" height=\"28\" rx=\"4\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n  <text x=\"300\" y=\"228\" font-family=\"sans-serif\" font-size=\"8\" font-weight=\"bold\" fill=\"#0f172a\" text-anchor=\"middle\">Every sentence must have a Subject (who/what) and a Predicate (finite verb + complements).</text>\n</svg>",
      "caption": "Figure 6.1: Dual classification of English Sentences based on communicative function and structural clause complexity."
    },
    "diagramQuestions": [
      {
        "q": "What is the essential grammatical difference between a Simple sentence and a Compound sentence?",
        "ans": "A <strong>Simple sentence</strong> contains only one independent clause with a single finite verb, whereas a <strong>Compound sentence</strong> contains two or more independent clauses joined by coordinating conjunctions (FANBOYS) or a semicolon."
      },
      {
        "q": "What punctuation mark is used at the end of an Optative sentence?",
        "ans": "An <strong>Optative sentence</strong> (expressing a wish or prayer) typically ends with an <strong>exclamation mark (!)</strong> or a <strong>full stop (.)</strong> (e.g., 'May God bless you!')."
      }
    ],
    "sectionA": [
      {
        "q": "Define a Sentence. Explain Subject and Predicate with five illustrative sentence analyses.",
        "ans": "A <strong>Sentence</strong> is a group of words arranged in grammatical order that makes complete sense.<br>Every complete sentence consists of two fundamental parts:<br><strong>1. Subject:</strong> The person, animal, or thing performing the action or about whom something is stated.<br><strong>2. Predicate:</strong> The part of the sentence containing the finite verb that says something about the subject.<br><br><strong>Sentence Analyses:</strong><br>1. '<u>The honest police officer</u> (Subject) | <u>received an award for bravery</u> (Predicate).'<br>2. '<u>Raebareli</u> (Subject) | <u>is a historic city in Uttar Pradesh</u> (Predicate).'<br>3. '<u>All the students of Class 6</u> (Subject) | <u>passed with distinction</u> (Predicate).'<br>4. '<u>Barking dogs</u> (Subject) | <u>seldom bite</u> (Predicate).'<br>5. '(<u>You</u> - Understood Subject) | <u>Open the window immediately</u> (Predicate in Imperative).'"
      },
      {
        "q": "Explain the five types of sentences classified according to their meaning and communicative function.",
        "ans": "<strong>1. Assertive / Declarative Sentence:</strong> States a fact, assertion, or opinion. Can be Affirmative (positive) or Negative. Ends with a full stop (.).<br><em>Examples:</em> 'The Earth is round.' (Affirmative); 'He does not tell lies.' (Negative).<br><br><strong>2. Interrogative Sentence:</strong> Asks a question. Ends with a question mark (?). Can be Yes/No questions or Wh- questions.<br><em>Examples:</em> 'Do you play chess?' ; 'Where is the library?'<br><br><strong>3. Imperative Sentence:</strong> Expresses an order, command, request, entreaty, or advice. The subject 'You' is usually omitted. Ends with a full stop (.).<br><em>Examples:</em> 'Please help me.' (Request); 'Stand up straight!' (Command); 'Respect your elders.' (Advice).<br><br><strong>4. Optative Sentence:</strong> Expresses an earnest wish, prayer, curse, or blessing. Often begins with 'May' or 'Wish'.<br><em>Examples:</em> 'May you live long and prosper!' ; 'Long live the President!'<br><br><strong>5. Exclamatory Sentence:</strong> Expresses sudden, strong emotions of surprise, grief, joy, or wonder. Ends with an exclamation mark (!).<br><em>Examples:</em> 'What a magnificent painting!' ; 'How sweet the moonlight sleeps upon this bank!'"
      },
      {
        "q": "Distinguish between Simple, Compound, and Complex sentences with comprehensive structural rules.",
        "ans": "<strong>1. Simple Sentence:</strong> Contains exactly one independent clause with one subject and one finite verb.<br><em>Formula:</em> [Independent Clause]<br><em>Example:</em> 'The teacher explained the difficult grammar lesson clearly.'<br><br><strong>2. Compound Sentence:</strong> Contains two or more independent clauses joined by coordinating conjunctions (FANBOYS: For, And, Nor, But, Or, Yet, So) or a semicolon.<br><em>Formula:</em> [Independent Clause 1] + [Coordinating Conjunction] + [Independent Clause 2]<br><em>Example:</em> 'The sun rose, <em>and</em> the morning mist disappeared.'<br><br><strong>3. Complex Sentence:</strong> Contains one main (independent) clause and one or more subordinate (dependent) clauses joined by subordinating conjunctions (because, although, since, when, that, if, while).<br><em>Formula:</em> [Main Clause] + [Subordinating Conjunction + Subordinate Clause]<br><em>Example:</em> 'We did not go to the park <em>because</em> it was raining heavily.'"
      },
      {
        "q": "Explain the rules for transforming Affirmative sentences into Negative sentences without changing their meaning.",
        "ans": "To convert an affirmative sentence into negative without altering its core meaning:<br><br><strong>1. By using the opposite word (antonym) with 'not':</strong><br>• <em>Affirmative:</em> 'Man is mortal.' -> <em>Negative:</em> 'Man is <strong>not immortal</strong>.'<br>• <em>Affirmative:</em> 'He is wise.' -> <em>Negative:</em> 'He is <strong>not foolish</strong>.'<br><br><strong>2. By converting 'Always' into 'Never' + opposite:</strong><br>• <em>Affirmative:</em> 'Always speak the truth.' -> <em>Negative:</em> '<strong>Never</strong> tell a lie.'<br><br><strong>3. By converting 'Only / Alone' into 'None but':</strong><br>• <em>Affirmative:</em> 'Only the brave deserve the fair.' -> <em>Negative:</em> '<strong>None but</strong> the brave deserve the fair.'<br><br><strong>4. By converting 'As soon as' into 'No sooner... than':</strong><br>• <em>Affirmative:</em> 'As soon as he saw the tiger, he fled.' -> <em>Negative:</em> '<strong>No sooner did he see</strong> the tiger <strong>than</strong> he fled.'"
      },
      {
        "q": "Transform the following sentences as directed:<br>(a) What a beautiful scenery! (Into Assertive)<br>(b) Everyone loves his motherland. (Into Interrogative)<br>(c) Though he is poor, he is honest. (Into Compound)",
        "ans": "<strong>(a)</strong> <strong>Assertive:</strong> It is a <em>very beautiful scenery</em>.<br><br><strong>(b)</strong> <strong>Interrogative:</strong> <em>Who does not love his motherland?</em> / <em>Is there anyone who does not love his motherland?</em><br><br><strong>(c)</strong> <strong>Compound:</strong> He is poor, <em>but</em> he is honest."
      }
    ],
    "sectionB": [
      {
        "q": "Identify the type of sentence: 'Please lend me your English dictionary.'",
        "ans": "<strong>Imperative Sentence</strong> (expresses a polite request)."
      },
      {
        "q": "Separate the Subject and Predicate: 'Across the dark river stood an ancient fortress.'",
        "ans": "<strong>Subject:</strong> 'An ancient fortress' | <strong>Predicate:</strong> 'stood across the dark river'."
      },
      {
        "q": "Identify the sentence structure: 'I know the man who designed this software.'",
        "ans": "<strong>Complex Sentence</strong> ('I know the man' = Main Clause; 'who designed this software' = Subordinate Adjective Clause)."
      },
      {
        "q": "Change into Exclamatory: 'It is a very thrilling match.'",
        "ans": "'<strong>What a thrilling match it is!</strong>' / '<strong>How thrilling the match is!</strong>'"
      },
      {
        "q": "Convert into Negative: 'Rohan is richer than Sohan.'",
        "ans": "'Sohan is <strong>not as rich as</strong> Rohan.'"
      }
    ],
    "trueFalse": [
      {
        "q": "In an Imperative sentence, the grammatical subject 'You' is normally understood and omitted.",
        "ans": "True",
        "reason": "Commands and requests address the listener directly without explicitly stating 'You'."
      },
      {
        "q": "A simple sentence must contain at least two finite verbs.",
        "ans": "False",
        "reason": "A simple sentence contains exactly ONE independent clause with a single finite verb."
      },
      {
        "q": "An Interrogative sentence always ends with a question mark (?).",
        "ans": "True",
        "reason": "The question mark is the standard terminal punctuation for all interrogative sentences."
      },
      {
        "q": "Subordinating conjunctions like 'because', 'although', and 'if' form Compound sentences.",
        "ans": "False",
        "reason": "Subordinating conjunctions introduce dependent clauses, forming Complex sentences."
      },
      {
        "q": "'May God grant you peace!' is an example of an Optative sentence.",
        "ans": "True",
        "reason": "Sentences invoking divine blessings or earnest prayers are classified as Optative."
      }
    ],
    "oneWord": [
      {
        "q": "A group of words with a subject and finite verb that forms part of a larger sentence.",
        "ans": "Clause"
      },
      {
        "q": "A sentence that states a declaration or fact ending with a full stop.",
        "ans": "Assertive Sentence (Declarative)"
      },
      {
        "q": "A sentence composed of two independent clauses joined by coordinating conjunctions.",
        "ans": "Compound Sentence"
      },
      {
        "q": "The part of a sentence that asserts something about the grammatical subject.",
        "ans": "Predicate"
      },
      {
        "q": "The sentence type expressing sudden emotional outbursts ending with '!'.",
        "ans": "Exclamatory Sentence"
      }
    ],
    "matchFollowing": [
      {
        "left": "Assertive Sentence",
        "right": "Ends with a Full stop (.)",
        "pair": "1 -> Ends with a Full stop (.)"
      },
      {
        "left": "Interrogative Sentence",
        "right": "Ends with a Question mark (?)",
        "pair": "2 -> Ends with a Question mark (?)"
      },
      {
        "left": "Exclamatory Sentence",
        "right": "Ends with an Exclamation mark (!)",
        "pair": "3 -> Ends with an Exclamation mark (!)"
      },
      {
        "left": "Imperative Sentence",
        "right": "Expresses order / advice / request",
        "pair": "4 -> Expresses order / advice / request"
      },
      {
        "left": "Optative Sentence",
        "right": "Expresses wish / prayer / blessing",
        "pair": "5 -> Expresses wish / prayer / blessing"
      }
    ],
    "goldenPoints": [
      "Every complete sentence must possess a Subject, a Finite Verb, and express a complete thought.",
      "Five functional sentence types: Assertive (.), Interrogative (?), Imperative (.), Optative (!/.), Exclamatory (!).",
      "Three structural sentence types: Simple (1 finite verb), Compound (2 independent clauses + FANBOYS), Complex (1 main + 1+ subordinate clauses).",
      "In Imperative sentences, the subject is the understood second-person pronoun '(You)'.",
      "To change Affirmative to Negative without changing meaning, use negative + antonym (e.g., 'not unwise' for 'wise').",
      "'No sooner... than' is the negative equivalent of 'As soon as'.",
      "Subordinate clauses can be Noun Clauses, Adjective Clauses, or Adverb Clauses.",
      "A Phrase has no finite verb (e.g., 'in the garden'); a Clause contains a subject and a finite verb (e.g., 'when he arrived').",
      "Direct questions require subject-verb inversion (e.g., 'Where are you going?').",
      "Exclamatory sentences use 'What a' before nouns (What a catch!) and 'How' before adjectives/adverbs (How fast!)."
    ],
    "sectionMCQ": [
      {
        "q": "Identify the sentence type: 'Do your homework silently.'",
        "options": [
          "A) Assertive",
          "B) Imperative",
          "C) Optative",
          "D) Exclamatory"
        ],
        "ans": "B) Imperative",
        "exp": "The sentence gives a direct command with the subject '(You)' understood."
      },
      {
        "q": "Which of the following is a Complex sentence?",
        "options": [
          "A) The sun rose and the birds began to sing.",
          "B) In spite of his poverty, he is honest.",
          "C) If you work hard, you will succeed.",
          "D) She bought bread, butter, and jam."
        ],
        "ans": "C) If you work hard, you will succeed.",
        "exp": "Contains an independent clause ('you will succeed') and a subordinate conditional clause ('If you work hard')."
      },
      {
        "q": "What is the predicate in 'Down went the Royal George'?",
        "options": [
          "A) the Royal George",
          "B) went",
          "C) Down went",
          "D) Down"
        ],
        "ans": "C) Down went",
        "exp": "'The Royal George' is the inverted subject; 'Down went' is the complete predicate."
      },
      {
        "q": "Choose the correct negative transformation of 'Everyone was present.'",
        "options": [
          "A) Everyone was not present.",
          "B) No one was absent.",
          "C) No one was present.",
          "D) Someone was absent."
        ],
        "ans": "B) No one was absent.",
        "exp": "'No one was absent' preserves the exact meaning without contradiction."
      },
      {
        "q": "'May God protect our country!' belongs to which category?",
        "options": [
          "A) Assertive",
          "B) Interrogative",
          "C) Optative",
          "D) Imperative"
        ],
        "ans": "C) Optative",
        "exp": "Expresses a formal prayer and blessing for the nation."
      }
    ]
  },
  {
    "id": 7,
    "title": "Introductory 'There' and 'It'",
    "theme": "Unit 7: Dummy Pronouns & Syntax",
    "unit": "Unit 7: Dummy Pronouns & Syntax",
    "summary": "Mastery of the preparatory/dummy pronouns 'There' (indicating existence and location) and 'It' (denoting time, weather, distance, temperature, and impersonal preparatory subjects).",
    "diagram": {
      "title": "Fig 7.1: Usage Matrix of Introductory Dummy Subjects ('There' vs 'It')",
      "svg": "<svg viewBox=\"0 0 580 230\" class=\"w-full h-auto max-w-[520px] mx-auto border border-teal-200 rounded-lg bg-gradient-to-b from-teal-50/70 to-slate-50 p-2\">\n  <rect x=\"200\" y=\"10\" width=\"180\" height=\"28\" rx=\"5\" fill=\"#134e4a\" stroke=\"#0d9488\" stroke-width=\"1.5\"/>\n  <text x=\"290\" y=\"28\" font-family=\"sans-serif\" font-size=\"10.5\" font-weight=\"bold\" fill=\"#ffffff\" text-anchor=\"middle\">INTRODUCTORY SUBJECTS</text>\n  <line x1=\"290\" y1=\"38\" x2=\"150\" y2=\"65\" stroke=\"#0d9488\" stroke-width=\"1.5\"/>\n  <line x1=\"290\" y1=\"38\" x2=\"430\" y2=\"65\" stroke=\"#0d9488\" stroke-width=\"1.5\"/>\n  <rect x=\"40\" y=\"65\" width=\"220\" height=\"95\" rx=\"6\" fill=\"#f0fdfa\" stroke=\"#14b8a6\" stroke-width=\"1.2\"/>\n  <text x=\"150\" y=\"83\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" fill=\"#042f2e\" text-anchor=\"middle\">1. INTRODUCTORY 'THERE'</text>\n  <text x=\"150\" y=\"98\" font-family=\"sans-serif\" font-size=\"8.5\" fill=\"#0f766e\" text-anchor=\"middle\">States EXISTENCE / PRESENCE</text>\n  <text x=\"55\" y=\"116\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#115e59\">Verb agrees with real following noun:</text>\n  <text x=\"55\" y=\"130\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#115e59\">Singular: There is a school.</text>\n  <text x=\"55\" y=\"144\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#115e59\">Plural: There are 40 students.</text>\n  <rect x=\"320\" y=\"65\" width=\"220\" height=\"95\" rx=\"6\" fill=\"#fdf4ff\" stroke=\"#c026d3\" stroke-width=\"1.2\"/>\n  <text x=\"430\" y=\"83\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\" fill=\"#701a75\" text-anchor=\"middle\">2. INTRODUCTORY 'IT'</text>\n  <text x=\"430\" y=\"98\" font-family=\"sans-serif\" font-size=\"8.5\" fill=\"#a21caf\" text-anchor=\"middle\">Denotes TIME, WEATHER, DISTANCE</text>\n  <text x=\"335\" y=\"116\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#86198f\">Time: It is 7:30 AM.</text>\n  <text x=\"335\" y=\"130\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#86198f\">Weather: It is raining heavily.</text>\n  <text x=\"335\" y=\"144\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#86198f\">Distance: It is 10 km to Lucknow.</text>\n  <rect x=\"50\" y=\"175\" width=\"480\" height=\"42\" rx=\"5\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n  <text x=\"290\" y=\"193\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" fill=\"#1e293b\" text-anchor=\"middle\">Golden Rule: In 'There' sentences, the verb agrees with the NOUN that follows it.</text>\n  <text x=\"290\" y=\"206\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#64748b\" text-anchor=\"middle\">'It' always takes a singular verb (It is / It was / It will be), regardless of the following complements.</text>\n</svg>",
      "caption": "Figure 7.1: Semantic and grammatical usage rules for introductory dummy pronouns 'There' and 'It'."
    },
    "diagramQuestions": [
      {
        "q": "How is the number of the verb decided in a sentence starting with introductory 'There'?",
        "ans": "In sentences starting with introductory 'There', the verb is determined by the <strong>real subject noun that follows the verb</strong>. If the following noun is singular, use a singular verb ('There <em>is</em> a book'); if plural, use a plural verb ('There <em>are</em> many books')."
      },
      {
        "q": "List three distinct natural or physical conditions expressed using introductory 'It'.",
        "ans": "Introductory 'It' is used to express: <strong>1. Time</strong> ('It is 8 o'clock'), <strong>2. Weather and Seasons</strong> ('It is cold and windy', 'It is summer'), and <strong>3. Distance</strong> ('It is 5 kilometres to the bus station')."
      }
    ],
    "sectionA": [
      {
        "q": "Explain the rules and structure of Introductory 'There' with singular and plural subjects.",
        "ans": "When we wish to state the existence or presence of someone or something in a particular place without emphasizing an active action, we begin the sentence with <strong>Introductory 'There'</strong>.<br><br><strong>1. Structural Formula:</strong><br>• <em>Present:</em> There + is/are + Subject Noun + Location/Complement.<br>• <em>Past:</em> There + was/were + Subject Noun + Location/Complement.<br>• <em>Future:</em> There + will be + Subject Noun.<br><br><strong>2. Subject-Verb Agreement Rule:</strong><br>• <em>Singular:</em> 'There <em>is</em> a large playground in our school.'<br>• <em>Plural:</em> 'There <em>are</em> forty computers in the IT lab.'<br>• <em>Past Singular:</em> 'There <em>was</em> once a wise king named Solomon.'<br>• <em>Past Plural:</em> 'There <em>were</em> hundreds of spectators in the stadium.'"
      },
      {
        "q": "Detail all major grammatical applications of Introductory 'It' with standard model examples.",
        "ans": "<strong>Introductory 'It' (Impersonal Subject)</strong> is used in the following contexts:<br><br><strong>1. To tell Time, Day, Month, and Date:</strong><br>• '<em>It is</em> 9:15 AM.'<br>• '<em>It is</em> Monday today.'<br>• '<em>It was</em> 15th August 1947.'<br><br><strong>2. To describe Weather, Climate, and Seasons:</strong><br>• '<em>It is raining</em> cat and dogs.'<br>• '<em>It is</em> very cold and foggy this morning.'<br>• '<em>It is</em> spring season.'<br><br><strong>3. To state Distance:</strong><br>• '<em>It is</em> about 80 kilometres from Raebareli to Lucknow.'<br><br><strong>4. As a Preparatory Subject for an Infinitive or Clause:</strong><br>• '<em>It is easy to learn</em> English grammar.' (= To learn English grammar is easy).<br>• '<em>It is true that</em> honesty pays in the long run.'<br><br><strong>5. To emphasize a particular Noun or Pronoun:</strong><br>• '<em>It is I</em> who am responsible.' ; '<em>It was Rohan</em> who won the trophy.'"
      },
      {
        "q": "Clarify the distinction between 'There' as an Introductory Subject and 'There' as an Adverb of Place.",
        "ans": "<strong>1. Introductory 'There' (Dummy Pronoun):</strong> Has no locational meaning of its own; placed at the beginning of the sentence to introduce the existence of a noun.<br>• <em>Example:</em> '<em>There</em> are seven days in a week.' (Here, 'There' does not mean 'at that place').<br><br><strong>2. Adverb of Place 'There':</strong> Denotes a specific physical place or location away from the speaker (opposite of 'here').<br>• <em>Example:</em> 'Please put your school bag <em>there</em>.' (At that specific location)."
      },
      {
        "q": "Rewrite the following sentences by using Introductory 'It' or 'There':<br>(a) To swim in deep rivers is dangerous.<br>(b) A magnificent banyan tree stood near the village well.<br>(c) Finding his house was difficult.<br>(d) Ten questions were on the test paper.",
        "ans": "<strong>(a)</strong> <strong>It is dangerous</strong> to swim in deep rivers.<br><br><strong>(b)</strong> <strong>There stood</strong> a magnificent banyan tree near the village well.<br><br><strong>(c)</strong> <strong>It was difficult</strong> to find his house.<br><br><strong>(d)</strong> <strong>There were</strong> ten questions on the test paper."
      },
      {
        "q": "Correct the subject-verb errors in the following sentences with explanations:<br>(a) There is twenty teachers in our school.<br>(b) It are very hot today.<br>(c) There was many problems during the journey.",
        "ans": "(a) <em>Incorrect:</em> There is twenty teachers.<br><strong>Corrected:</strong> 'There <strong>are</strong> twenty teachers in our school.' ('twenty teachers' is plural, requiring 'are').<br><br>(b) <em>Incorrect:</em> It are very hot today.<br><strong>Corrected:</strong> 'It <strong>is</strong> very hot today.' ('It' always takes a singular verb).<br><br>(c) <em>Incorrect:</em> There was many problems.<br><strong>Corrected:</strong> 'There <strong>were</strong> many problems during the journey.' ('many problems' is plural, requiring 'were')."
      }
    ],
    "sectionB": [
      {
        "q": "Fill with 'is' or 'are': 'There ______ no clouds in the sky today.'",
        "ans": "There <strong>are</strong> no clouds in the sky today. ('clouds' is plural)."
      },
      {
        "q": "Fill with 'There' or 'It': '______ is 5 o'clock by my watch.'",
        "ans": "<strong>It</strong> is 5 o'clock by my watch. (Telling time uses 'It')."
      },
      {
        "q": "Fill with 'There' or 'It': '______ is a majestic palace on the hill.'",
        "ans": "<strong>There</strong> is a majestic palace on the hill. (Stating existence/presence uses 'There')."
      },
      {
        "q": "Complete the sentence: 'It is a pleasure ______ (meet) you.'",
        "ans": "It is a pleasure <strong>to meet</strong> you. ('It' acts as preparatory subject for the infinitive)."
      },
      {
        "q": "Choose the correct verb: 'There ______ (was / were) a crowd of people in the market.'",
        "ans": "There <strong>was</strong> a crowd of people in the market. ('a crowd' is a singular collective noun)."
      }
    ],
    "trueFalse": [
      {
        "q": "Introductory 'It' can take a plural verb like 'It are'.",
        "ans": "False",
        "reason": "Introductory 'It' is strictly grammatically singular and takes 'is', 'was', or 'has'."
      },
      {
        "q": "In sentences starting with 'There', the verb agrees with the subject noun that follows it.",
        "ans": "True",
        "reason": "The following noun is the real semantic subject determining number agreement."
      },
      {
        "q": "We use introductory 'There' to express meteorological weather and rain.",
        "ans": "False",
        "reason": "Weather conditions are expressed using 'It' (e.g., 'It is snowing', 'It is windy')."
      },
      {
        "q": "'It is 10 miles to the railway station' is a correct sentence expressing distance.",
        "ans": "True",
        "reason": "Distance is routinely introduced with dummy 'It'."
      },
      {
        "q": "'There is water in the bottle' is grammatically correct because 'water' is uncountable singular.",
        "ans": "True",
        "reason": "Uncountable nouns take singular verbs with 'There is'."
      }
    ],
    "oneWord": [
      {
        "q": "The introductory word used to state time, weather, and distance.",
        "ans": "Introductory 'It'"
      },
      {
        "q": "The introductory word used to assert the existence or presence of things.",
        "ans": "Introductory 'There'"
      },
      {
        "q": "The grammatical term for pronouns like 'There' and 'It' that fill subject slots without concrete reference.",
        "ans": "Dummy Pronoun (Expletive Subject)"
      },
      {
        "q": "The correct verb form in 'There (be) ______ fifty states in the USA.'",
        "ans": "Are"
      },
      {
        "q": "The structure 'It is no use ______ (cry) over spilt milk.'",
        "ans": "Crying (Gerund following 'It is no use')"
      }
    ],
    "matchFollowing": [
      {
        "left": "Time Expression",
        "right": "It is quarter to four",
        "pair": "1 -> It is quarter to four"
      },
      {
        "left": "Weather Expression",
        "right": "It is drizzling",
        "pair": "2 -> It is drizzling"
      },
      {
        "left": "Distance Expression",
        "right": "It is five miles away",
        "pair": "3 -> It is five miles away"
      },
      {
        "left": "Existence (Singular)",
        "right": "There is a hospital",
        "pair": "4 -> There is a hospital"
      },
      {
        "left": "Existence (Plural)",
        "right": "There are three parks",
        "pair": "5 -> There are three parks"
      }
    ],
    "goldenPoints": [
      "Use introductory 'There' when introducing the existence, location, or presence of someone or something.",
      "In 'There' sentences, the verb agrees in number with the following REAL subject (There is one pen; There are five pens).",
      "Use introductory 'It' for Time, Weather, Temperature, Distance, and Seasons.",
      "'It' is ALWAYS followed by a singular verb (It is, It was, It will be).",
      "'It' serves as a preparatory subject to avoid awkward sentence-initial Infinitives (e.g., 'It is easy to say' instead of 'To say is easy').",
      "In sentences emphasizing identity, use 'It is I' (formal) or 'It was they who called'.",
      "Do not confuse introductory 'There' with the adverb of place 'There' (e.g., 'Sit over there').",
      "Uncountable nouns take singular verbs with 'There' (There is milk, There was noise).",
      "Collective nouns taking a singular sense use 'There is' (There is a flock of birds).",
      "Common idioms using introductory 'It': 'It is no use crying', 'It takes time', 'It seems that'."
    ],
    "sectionMCQ": [
      {
        "q": "Choose the correct sentence:",
        "options": [
          "A) There is thirty days in April.",
          "B) There are thirty days in April.",
          "C) It is thirty days in April.",
          "D) There was thirty days in April."
        ],
        "ans": "B) There are thirty days in April.",
        "exp": "'Thirty days' is plural, requiring 'There are'."
      },
      {
        "q": "Fill in the blank: '______ is very cold tonight.'",
        "options": [
          "A) There",
          "B) It",
          "C) This",
          "D) That"
        ],
        "ans": "B) It",
        "exp": "Weather conditions are expressed using introductory 'It'."
      },
      {
        "q": "Select the grammatically correct option: 'There ______ many changes in our city.'",
        "options": [
          "A) has been",
          "B) have been",
          "C) is",
          "D) was"
        ],
        "ans": "B) have been",
        "exp": "'Many changes' is plural, requiring the plural auxiliary 'have been'."
      },
      {
        "q": "Which expression correctly tells the time?",
        "options": [
          "A) There is 10 o'clock.",
          "B) It is 10 o'clock.",
          "C) This is 10 o'clock.",
          "D) It are 10 o'clock."
        ],
        "ans": "B) It is 10 o'clock.",
        "exp": "Time is introduced with 'It is'."
      },
      {
        "q": "What is the function of 'It' in: 'It is wrong to tell lies.'?",
        "options": [
          "A) Personal pronoun",
          "B) Preparatory dummy subject",
          "C) Demonstrative pronoun",
          "D) Relative pronoun"
        ],
        "ans": "B) Preparatory dummy subject",
        "exp": "'It' anticipates the real infinitive subject 'to tell lies'."
      }
    ]
  },
  {
    "id": 8,
    "title": "Punctuation and Capitalisation",
    "theme": "Unit 8: Mechanics of Writing",
    "unit": "Unit 8: Mechanics of Writing",
    "summary": "Exhaustive mastery of standard English punctuation marks (Capital Letters, Full Stop, Comma, Semicolon, Colon, Question Mark, Exclamation Mark, Apostrophe, Quotation Marks, Hyphen, Dash) and rules for dialogue formatting and passage editing.",
    "diagram": {
      "title": "Fig 8.1: The 10 Essential Punctuation Marks & Hierarchy of Pauses",
      "svg": "<svg viewBox=\"0 0 600 240\" class=\"w-full h-auto max-w-[540px] mx-auto border border-rose-200 rounded-lg bg-gradient-to-b from-rose-50/70 to-slate-50 p-2\">\n  <rect x=\"200\" y=\"10\" width=\"200\" height=\"28\" rx=\"5\" fill=\"#881337\" stroke=\"#e11d48\" stroke-width=\"1.5\"/>\n  <text x=\"300\" y=\"28\" font-family=\"sans-serif\" font-size=\"10.5\" font-weight=\"bold\" fill=\"#ffffff\" text-anchor=\"middle\">PUNCTUATION HIERARCHY</text>\n  <rect x=\"30\" y=\"55\" width=\"165\" height=\"50\" rx=\"5\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n  <text x=\"112\" y=\"73\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" fill=\"#9f1239\" text-anchor=\"middle\">1. FULL STOP ( . )</text>\n  <text x=\"112\" y=\"87\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#475569\" text-anchor=\"middle\">Longest pause. Ends assertive/</text>\n  <text x=\"112\" y=\"98\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#475569\" text-anchor=\"middle\">imperative sentences.</text>\n  <rect x=\"215\" y=\"55\" width=\"170\" height=\"50\" rx=\"5\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n  <text x=\"300\" y=\"73\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" fill=\"#9f1239\" text-anchor=\"middle\">2. COMMA ( , )</text>\n  <text x=\"300\" y=\"87\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#475569\" text-anchor=\"middle\">Shortest pause. Separates items,</text>\n  <text x=\"300\" y=\"98\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#475569\" text-anchor=\"middle\">introductory words &amp; clauses.</text>\n  <rect x=\"405\" y=\"55\" width=\"165\" height=\"50\" rx=\"5\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n  <text x=\"487\" y=\"73\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" fill=\"#9f1239\" text-anchor=\"middle\">3. SEMICOLON ( ; )</text>\n  <text x=\"487\" y=\"87\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#475569\" text-anchor=\"middle\">Pause longer than comma,</text>\n  <text x=\"487\" y=\"98\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#475569\" text-anchor=\"middle\">shorter than full stop.</text>\n  <rect x=\"30\" y=\"115\" width=\"165\" height=\"50\" rx=\"5\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n  <text x=\"112\" y=\"133\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" fill=\"#9f1239\" text-anchor=\"middle\">4. COLON ( : )</text>\n  <text x=\"112\" y=\"147\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#475569\" text-anchor=\"middle\">Introduces lists, quotes, or</text>\n  <text x=\"112\" y=\"158\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#475569\" text-anchor=\"middle\">formal explanations.</text>\n  <rect x=\"215\" y=\"115\" width=\"170\" height=\"50\" rx=\"5\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n  <text x=\"300\" y=\"133\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" fill=\"#9f1239\" text-anchor=\"middle\">5. QUOTATION MARKS ( \" \" )</text>\n  <text x=\"300\" y=\"147\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#475569\" text-anchor=\"middle\">Encloses direct speech and</text>\n  <text x=\"300\" y=\"158\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#475569\" text-anchor=\"middle\">exact quoted words.</text>\n  <rect x=\"405\" y=\"115\" width=\"165\" height=\"50\" rx=\"5\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1\"/>\n  <text x=\"487\" y=\"133\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" fill=\"#9f1239\" text-anchor=\"middle\">6. APOSTROPHE ( ' )</text>\n  <text x=\"487\" y=\"147\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#475569\" text-anchor=\"middle\">Indicates ownership (Rohan's)</text>\n  <text x=\"487\" y=\"158\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#475569\" text-anchor=\"middle\">and contractions (don't).</text>\n  <rect x=\"30\" y=\"175\" width=\"540\" height=\"52\" rx=\"5\" fill=\"#fff1f2\" stroke=\"#fda4af\" stroke-width=\"1.2\"/>\n  <text x=\"300\" y=\"193\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" fill=\"#881337\" text-anchor=\"middle\">CAPITAL LETTERS: Mandated for 1. First word of sentence, 2. Proper Nouns, 3. Pronoun 'I' &amp; 'O',</text>\n  <text x=\"300\" y=\"206\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#be123c\" text-anchor=\"middle\">4. Days, Months &amp; Holidays, 5. First word inside direct quotation speech (\"...\"), 6. Titles of books/films.</text>\n</svg>",
      "caption": "Figure 8.1: Overview of major punctuation marks, pause durations, and capitalisation guidelines."
    },
    "diagramQuestions": [
      {
        "q": "Which punctuation mark represents the shortest pause in a spoken sentence?",
        "ans": "The <strong>Comma ( , )</strong> represents the shortest pause, used to separate series of words, phrases, or clauses."
      },
      {
        "q": "State the rule regarding the first word inside direct speech quotation marks.",
        "ans": "The first word of direct speech enclosed within quotation marks (<em>\"...\"</em>) must <strong>always begin with a Capital Letter</strong> (e.g., 'He said, <em>\"Honesty</em> is the best policy.\"')."
      }
    ],
    "sectionA": [
      {
        "q": "Detail all major rules for the use of Capital Letters with suitable examples.",
        "ans": "<strong>Capital Letters</strong> must be strictly used in the following six circumstances:<br><br><strong>1. First word of every sentence:</strong><br>• '<em>Education</em> is the backbone of a nation.'<br><br><strong>2. Proper Nouns and Proper Adjectives:</strong><br>• Names of persons, cities, rivers, mountains: <em>Rohan, Raebareli, Yamuna, Himalayas</em>.<br>• Proper adjectives: <em>Indian, British, Shakespearean</em>.<br><br><strong>3. The Pronoun 'I' and Interjection 'O':</strong><br>• Always capitalized in isolation: 'She knows that <em>I</em> am speaking the truth.'<br><br><strong>4. Names of Days, Months, Festivals, and National Holidays:</strong><br>• <em>Monday, October, Diwali, Eid, Republic Day, Christmas</em>.<br><br><strong>5. First word of a Direct Quotation:</strong><br>• Teacher said, '<em>Knowledge</em> is power.'<br><br><strong>6. Every fresh line of traditional poetry and Book Titles:</strong><br>• '<em>Discovery of India</em>', '<em>Gitanjali</em>'."
      },
      {
        "q": "Explain the four primary uses of the Comma ( , ) with clear illustrative sentences.",
        "ans": "The <strong>Comma</strong> represents the shortest pause and is used:<br><br><strong>1. To separate words in a series (List):</strong><br>• 'He bought apples, mangoes, bananas, and oranges.'<br><br><strong>2. To separate introductory words, phrases, or dependent clauses:</strong><br>• '<em>Yes,</em> I will attend the function.'<br>• '<em>When the bell rang,</em> the students entered the hall.'<br><br><strong>3. To set off Nouns of Direct Address (Vocative Case):</strong><br>• '<em>Rohan,</em> please bring me the glass of water.'<br><br><strong>4. To separate Direct Speech from the reporting verb:</strong><br>• 'The master said<em>,</em> \"Work diligently.\"'<br><br><strong>5. To separate items in a date or address:</strong><br>• 'Raebareli<em>,</em> 20th September<em>,</em> 2026.'"
      },
      {
        "q": "Distinguish between the Semicolon ( ; ) and the Colon ( : ) with examples.",
        "ans": "<strong>1. Semicolon ( ; ):</strong> Represents a pause longer than a comma but shorter than a full stop. Used to connect closely related independent clauses without a coordinating conjunction.<br>• <em>Example:</em> 'To err is human<em>;</em> to forgive, divine.'<br>• <em>Example:</em> 'The rain stopped<em>;</em> the players returned to the field.'<br><br><strong>2. Colon ( : ):</strong> Represents an introductory pause. Used to introduce a list, an explanation, an enumeration, or a formal quote.<br>• <em>Example:</em> 'The study kit contains the following items<em>:</em> a pen, a ruler, and an eraser.'<br>• <em>Example:</em> 'Bacon remarked<em>:</em> \"Reading maketh a full man.\"'<br>• <em>Example:</em> Used in expressing time ratios (<em>8:30 AM</em>)."
      },
      {
        "q": "Explain the rules for punctuating Direct Speech using Quotation Marks (\" \").",
        "ans": "Rules for Direct Speech punctuation:<br>1. Enclose the exact words spoken within <strong>Quotation Marks ( \"...\" )</strong>.<br>2. Place a <strong>comma</strong> immediately after the reporting verb (e.g., <em>He said,</em>).<br>3. Begin the quoted sentence with a <strong>Capital Letter</strong>.<br>4. Terminal punctuation (full stop, question mark, exclamation mark) must be placed <strong>INSIDE the closing quotation mark</strong>.<br><br>• <em>Statement:</em> The teacher said, \"Work hard for your examinations.\"<br>• <em>Question:</em> She asked, \"Where do you live?\"<br>• <em>Exclamation:</em> The captain shouted, \"Hurrah! We won the trophy!\""
      },
      {
        "q": "Punctuate and capitalise the following unpunctuated passage:<br>'rohan said to me why are you not coming to school on monday i replied i am going to delhi with my father dr sharma'",
        "ans": "<strong>Punctuated Passage:</strong><br><br><strong>Rohan said to me, \"Why are you not coming to school on Monday?\" I replied, \"I am going to Delhi with my father, Dr. Sharma.\"</strong><br><br><em>Corrections made:</em> Capitalized 'Rohan', 'Monday', 'I', 'Delhi', 'Dr.', 'Sharma'; inserted comma before direct speech; enclosed spoken words in quotation marks; added question mark and period."
      }
    ],
    "sectionB": [
      {
        "q": "Insert the missing punctuation: 'alas the poor man lost his only son'",
        "ans": "'<strong>Alas! The poor man lost his only son.</strong>'"
      },
      {
        "q": "Punctuate the sentence: 'dr verma is an mbbs doctor'",
        "ans": "'<strong>Dr. Verma is an M.B.B.S. doctor.</strong>'"
      },
      {
        "q": "Punctuate: 'teachers day is celebrated on 5th september'",
        "ans": "'<strong>Teachers' Day is celebrated on 5th September.</strong>'"
      },
      {
        "q": "Identify the punctuation mark used to join two compound words like 'twenty-five' or 'father-in-law'.",
        "ans": "<strong>Hyphen ( - )</strong>"
      },
      {
        "q": "Punctuate: 'she asked me what is your name'",
        "ans": "'<strong>She asked me, \"What is your name?\"</strong>'"
      }
    ],
    "trueFalse": [
      {
        "q": "The first word of a sentence after a full stop must always begin with a small letter.",
        "ans": "False",
        "reason": "Every sentence beginning after a full stop must start with a Capital Letter."
      },
      {
        "q": "The pronoun 'I' is always written in capital, whether in the beginning, middle, or end of a sentence.",
        "ans": "True",
        "reason": "The first-person singular pronoun 'I' is universally capitalised in standard English."
      },
      {
        "q": "A comma represents a pause longer than a full stop.",
        "ans": "False",
        "reason": "A comma represents the shortest grammatical pause; a full stop is the longest."
      },
      {
        "q": "Direct speech question marks are placed inside the closing quotation marks.",
        "ans": "True",
        "reason": "Terminal punctuation belongs inside the quotation marks (e.g., \"Why?\")."
      },
      {
        "q": "Names of seasons like summer and winter must always be capitalised in general sentences.",
        "ans": "False",
        "reason": "Seasons (summer, winter, spring, autumn) are common nouns and are written in lower case unless personified."
      }
    ],
    "oneWord": [
      {
        "q": "The terminal punctuation mark used after an assertive or imperative sentence.",
        "ans": "Full Stop (Period)"
      },
      {
        "q": "The punctuation mark used to separate independent clauses without a coordinating conjunction.",
        "ans": "Semicolon ( ; )"
      },
      {
        "q": "The punctuation mark used before introducing an enumerated list of items.",
        "ans": "Colon ( : )"
      },
      {
        "q": "The mark used to show omission of letters in contractions (e.g., don't).",
        "ans": "Apostrophe ( ' )"
      },
      {
        "q": "The marks used to enclose direct spoken words.",
        "ans": "Quotation Marks / Inverted Commas (\" \")"
      }
    ],
    "matchFollowing": [
      {
        "left": "Full Stop ( . )",
        "right": "Ends statement / command",
        "pair": "1 -> Ends statement / command"
      },
      {
        "left": "Comma ( , )",
        "right": "Shortest pause / list separator",
        "pair": "2 -> Shortest pause / list separator"
      },
      {
        "left": "Question Mark ( ? )",
        "right": "Ends interrogative sentence",
        "pair": "3 -> Ends interrogative sentence"
      },
      {
        "left": "Exclamation Mark ( ! )",
        "right": "Expresses sudden strong feeling",
        "pair": "4 -> Expresses sudden strong feeling"
      },
      {
        "left": "Hyphen ( - )",
        "right": "Connects compound words",
        "pair": "5 -> Connects compound words"
      }
    ],
    "goldenPoints": [
      "Capitalise the first word of every sentence, all Proper Nouns, and the standalone pronoun 'I'.",
      "Days of the week (Monday), months (July), and festivals (Diwali) always begin with a Capital Letter.",
      "A Full Stop (.) ends Assertive and Imperative sentences, and marks abbreviations (Dr., Prof., M.A.).",
      "Use Commas to separate items in a series, set off introductory clauses, and frame direct addresses.",
      "The Semicolon (;) links related independent clauses without needing coordinating conjunctions.",
      "The Colon (:) introduces lists, explanations, or formal block quotes.",
      "In Direct Speech, place a comma before opening quotes, capitalize the first quoted word, and put terminal punctuation inside quotes.",
      "Use Apostrophe (') for possession (Rohan's) and letter omission in contractions (can't, isn't).",
      "Do NOT capitalise common nouns like seasons (spring, winter) or school subjects unless they are language names (English, French).",
      "Accurate punctuation prevents semantic ambiguity (e.g., 'Let's eat, Grandpa' vs 'Let's eat Grandpa')."
    ],
    "sectionMCQ": [
      {
        "q": "Which sentence is punctuated correctly?",
        "options": [
          "A) He said, \"Where are you going.\"",
          "B) He said, \"Where are you going?\"",
          "C) He said \"where are you going?\"",
          "D) He said, where are you going?"
        ],
        "ans": "B) He said, \"Where are you going?\"",
        "exp": "Comma after reporting verb, capital 'Where', and question mark inside closing quotation marks."
      },
      {
        "q": "Select the correct punctuation: 'May God bless you______'",
        "options": [
          "A) .",
          "B) !",
          "C) ?",
          "D) ;"
        ],
        "ans": "B) !",
        "exp": "Optative blessings end with an exclamation mark (!)."
      },
      {
        "q": "Which word in 'my brother lives in london england' must NOT be capitalised?",
        "options": [
          "A) my (at sentence start)",
          "B) brother",
          "C) london",
          "D) england"
        ],
        "ans": "B) brother",
        "exp": "'Brother' is a common noun here; 'London' and 'England' are proper nouns."
      },
      {
        "q": "What mark connects compound numbers like 'thirty-five'?",
        "options": [
          "A) Dash (—)",
          "B) Hyphen (-)",
          "C) Semicolon (;)",
          "D) Slash (/)"
        ],
        "ans": "B) Hyphen (-)",
        "exp": "Hyphens join compound numbers and compound words."
      },
      {
        "q": "Which sentence demonstrates correct comma usage with a vocative direct address?",
        "options": [
          "A) Rohan come here immediately.",
          "B) Rohan, come here immediately.",
          "C) Rohan come, here immediately.",
          "D) Rohan come here, immediately."
        ],
        "ans": "B) Rohan, come here immediately.",
        "exp": "A comma must separate the addressed person's name ('Rohan,') from the imperative clause."
      }
    ]
  },
  {
    "id": 9,
    "title": "Formal Letters, Applications & Modern E-mails",
    "theme": "Unit 9: Applied Composition & Communication",
    "unit": "Unit 9: Applied Composition & Communication",
    "summary": "Step-by-step mastery of written correspondence: Formal Letters (Applications to Principal, Leave requests, Fee concession, Character certificate), Informal Letters (to parents, friends), and modern professional E-mail etiquette and formats.",
    "diagram": {
      "title": "Fig 9.1: Standard 6-Part Anatomy of an Official School Application & Formal Letter",
      "svg": "<svg viewBox=\"0 0 580 250\" class=\"w-full h-auto max-w-[520px] mx-auto border border-blue-200 rounded-lg bg-gradient-to-b from-blue-50/70 to-slate-50 p-2\">\n  <rect x=\"20\" y=\"10\" width=\"540\" height=\"225\" rx=\"6\" fill=\"#ffffff\" stroke=\"#cbd5e1\" stroke-width=\"1.5\"/>\n  <rect x=\"35\" y=\"20\" width=\"230\" height=\"36\" rx=\"4\" fill=\"#f1f5f9\" stroke=\"#94a3b8\"/>\n  <text x=\"45\" y=\"34\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" fill=\"#0f172a\">1. RECIPIENT DESIGNATION &amp; ADDRESS</text>\n  <text x=\"45\" y=\"47\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#475569\">To, The Principal, Police Modern School, Raebareli</text>\n  <rect x=\"390\" y=\"20\" width=\"155\" height=\"36\" rx=\"4\" fill=\"#f8fafc\" stroke=\"#cbd5e1\"/>\n  <text x=\"400\" y=\"34\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" fill=\"#0f172a\">2. DATE</text>\n  <text x=\"400\" y=\"47\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#0369a1\">20th September 2026</text>\n  <rect x=\"35\" y=\"62\" width=\"510\" height=\"24\" rx=\"4\" fill=\"#eff6ff\" stroke=\"#3b82f6\"/>\n  <text x=\"45\" y=\"78\" font-family=\"sans-serif\" font-size=\"8.5\" font-weight=\"bold\" fill=\"#1d4ed8\">3. SUBJECT: Application for Two Days' Sick Leave due to Viral Fever</text>\n  <text x=\"35\" y=\"102\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" fill=\"#0f172a\">4. SALUTATION: Respected Sir / Madam,</text>\n  <rect x=\"35\" y=\"110\" width=\"510\" height=\"68\" rx=\"4\" fill=\"#f8fafc\" stroke=\"#cbd5e1\"/>\n  <text x=\"45\" y=\"125\" font-family=\"sans-serif\" font-size=\"8\" font-weight=\"bold\" fill=\"#334155\">5. MAIN BODY (3 Paras):</text>\n  <text x=\"45\" y=\"139\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#475569\">Introduction: State reason clearly (\"Most respectfully, I beg to state that I am down with fever...\").</text>\n  <text x=\"45\" y=\"153\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#475569\">Details: Specify dates and doctor's advice (\"Doctor advised 2 days bed rest from 20th to 21st Sep\").</text>\n  <text x=\"45\" y=\"167\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#475569\">Conclusion: Request grant (\"Kindly grant me leave for these two days. I shall be grateful.\").</text>\n  <rect x=\"330\" y=\"184\" width=\"215\" height=\"42\" rx=\"4\" fill=\"#f1f5f9\" stroke=\"#94a3b8\"/>\n  <text x=\"340\" y=\"198\" font-family=\"sans-serif\" font-size=\"8\" font-weight=\"bold\" fill=\"#0f172a\">6. SUBSCRIPTION &amp; SIGNATURE:</text>\n  <text x=\"340\" y=\"210\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#334155\">Yours obediently, [Name], Class 6-A, Roll No. 15</text>\n</svg>",
      "caption": "Figure 9.1: Standard layout structure for formal school applications and official letters."
    },
    "diagramQuestions": [
      {
        "q": "What is the correct formal subscription closure for a student writing to their Principal?",
        "ans": "The standard subscription is <strong>'Yours obediently,'</strong> (spelled with a capital 'Y' and NO apostrophe), followed by the student's full name, class, section, and roll number."
      },
      {
        "q": "Why is a precise 'Subject' line essential in formal letters?",
        "ans": "The <strong>Subject line</strong> summarizes the core purpose of the communication in one concise line, allowing the administrative authority to immediately understand and prioritize the request."
      }
    ],
    "sectionA": [
      {
        "q": "Write a formal Application to the Principal of Police Modern School requesting 3 days' Leave of Absence due to illness.",
        "ans": "<strong>Model Formal Application:</strong><br><br>To,<br>The Principal,<br>Police Modern School,<br>25th Bn PAC, Raebareli.<br><br><strong>Date:</strong> 20th September 2026<br><br><strong>Subject:</strong> Application for three days' medical leave.<br><br>Respected Sir,<br><br>Most respectfully, I beg to state that I have been suffering from high viral fever and severe headache since yesterday evening. Our family doctor has examined me and strictly advised three days of complete bed rest along with prescribed medication from 20th September to 22nd September 2026.<br><br>Therefore, I am unable to attend regular classes during this period. I kindly request you to grant me leave of absence for these three days. I assure you that I will copy and complete all pending classwork immediately upon my return.<br><br>I shall be highly obliged to you for this act of kindness.<br><br>Thanking you,<br><br>Yours obediently,<br><strong>Aarav Sharma</strong><br>Class: 6-A | Roll No: 18"
      },
      {
        "q": "Write a formal Application to the Principal requesting the issuance of a Character / Transfer Certificate.",
        "ans": "<strong>Model Application for Transfer Certificate:</strong><br><br>To,<br>The Principal,<br>Police Modern School,<br>25th Bn PAC, Raebareli.<br><br><strong>Date:</strong> 20th September 2026<br><br><strong>Subject:</strong> Request for issuance of Transfer Certificate (TC) and Character Certificate.<br><br>Respected Madam,<br><br>I beg to submit that my father, who is currently serving as an officer in the 25th Battalion PAC, has been transferred to the PAC Headquarters at Lucknow. Consequently, our entire family is relocating to Lucknow at the end of this month, and I have to seek admission in a local school there.<br><br>I have cleared all my school dues, returned my library books, and obtained clearance from all respective subject departments. Kindly issue my School Leaving / Transfer Certificate and Character Certificate at your earliest convenience to enable me to complete my admission formalities in Lucknow.<br><br>I express my heartfelt gratitude to all my teachers for their valuable guidance during my tenure at Police Modern School.<br><br>Thanking you,<br><br>Yours obediently,<br><strong>Priya Singh</strong><br>Class: 6-B | Admission No: PMS/2022/412"
      },
      {
        "q": "Write an Informal Letter to your friend congratulating him on winning the First Prize in the Inter-School Science Quiz.",
        "ans": "<strong>Model Informal Letter:</strong><br><br>Police Modern School Campus,<br>25th Bn PAC, Raebareli (U.P.)<br><br><strong>Date:</strong> 20th September 2026<br><br>Dear Rohan,<br><br>I hope this letter finds you in high spirits and excellent health. I was thrilled and overjoyed to read the morning newspaper announcement declaring that you bagged the First Prize in the prestigious State-level Inter-School Science Quiz Competition!<br><br>Please accept my heartfelt congratulations on this remarkable achievement. I know how rigorously you prepared day and night, studying scientific concepts and current developments. Your dedication, hard work, and sharp intellect have truly paid off, making all of us, your parents, and our school immensely proud.<br><br>I wish you even greater success in all your future endeavors. Let us meet this weekend to celebrate your wonderful victory. Convey my warm regards to your parents and love to little Tina.<br><br>Your loving friend,<br><strong>Kabir</strong>"
      },
      {
        "q": "Explain the structure of a modern electronic mail (E-mail) with standard formatting fields.",
        "ans": "An <strong>E-mail (Electronic Mail)</strong> is the fastest modern digital medium for formal and informal correspondence.<br><br><strong>Standard E-mail Structure:</strong><br><strong>1. To:</strong> Recipient's primary e-mail address (e.g., <em>principal@pmsraebareli.edu.in</em>).<br><strong>2. CC (Carbon Copy):</strong> Secondary recipients who need to be kept informed.<br><strong>3. BCC (Blind Carbon Copy):</strong> Hidden recipients whose addresses remain private.<br><strong>4. Subject:</strong> Clear, concise summary of the message purpose.<br><strong>5. Salutation:</strong> Professional greeting (e.g., <em>Dear Sir / Madam, Dear Mr. Verma</em>).<br><strong>6. Body Text:</strong> Clear, concise paragraphs (Opening, Purpose, Details, Call to Action).<br><strong>7. Sign-off & Signature:</strong> Professional closing (e.g., <em>Warm regards, Aarav Sharma, Student Council Representative</em>)."
      },
      {
        "q": "Write a formal E-mail to the School Librarian requesting the renewal of two library books.",
        "ans": "<strong>Model E-mail Format:</strong><br><br><strong>To:</strong> library@pmsraebareli.edu.in<br><strong>Subject:</strong> Request for Renewal of Library Books — Aarav Sharma (Class 6-A)<br><br>Respected Librarian Sir,<br><br>I am Aarav Sharma, a student of Class 6-A (Library Card No: LIB-6018). Last week, on 13th September 2026, I borrowed the following two books for our upcoming science exhibition project:<br><br>1. <em>'Curiosity: Exploring General Science'</em> (Acc. No: 4210)<br>2. <em>'Illustrated World History'</em> (Acc. No: 3892)<br><br>As our science model exhibition is scheduled for next Monday, I require these reference books for three additional days to complete our project documentation. I kindly request you to renew these two books until 25th September 2026.<br><br>I assure you that I will maintain the books in pristine condition and return them promptly on the due date.<br><br>Thanking you,<br><br>Warm regards,<br><strong>Aarav Sharma</strong><br>Class 6-A | Roll No: 18 | Police Modern School, Raebareli"
      }
    ],
    "sectionB": [
      {
        "q": "What is the correct punctuation for the opening salutation in an official application?",
        "ans": "<strong>'Respected Sir,'</strong> or <strong>'Respected Madam,'</strong> followed by a comma."
      },
      {
        "q": "State the standard date format recommended for official English letter typing.",
        "ans": "<strong>20th September 2026</strong> (or <em>September 20, 2026</em>), avoiding ambiguous purely numeric forms."
      },
      {
        "q": "What does 'CC' stand for in an email header?",
        "ans": "<strong>Carbon Copy</strong> (sends an identical copy to secondary recipients transparently)."
      },
      {
        "q": "Where is the sender's address positioned in a standard informal letter?",
        "ans": "At the <strong>top left-hand corner</strong> of the page."
      },
      {
        "q": "Identify the incorrect closing in an official letter: (a) Yours faithfully, (b) Your's sincerely.",
        "ans": "<strong>(b) Your's sincerely</strong> is INCORRECT because possessive pronouns never take apostrophes."
      }
    ],
    "trueFalse": [
      {
        "q": "In formal letters, the subject line should be long and detailed, covering three full sentences.",
        "ans": "False",
        "reason": "The Subject line must be extremely concise, brief, and to the point (under 8-10 words)."
      },
      {
        "q": "Informal letters written to friends and family do not require a formal 'Subject' line.",
        "ans": "True",
        "reason": "Informal letters have a conversational tone and omit the 'Subject' header."
      },
      {
        "q": "'Yours obediently' must be written with a capital 'Y' and no apostrophe.",
        "ans": "True",
        "reason": "'Yours' is a possessive pronoun and never takes an apostrophe."
      },
      {
        "q": "In modern email formatting, 'BCC' stands for 'Blind Carbon Copy'.",
        "ans": "True",
        "reason": "BCC conceals the email addresses of recipients from other recipients."
      },
      {
        "q": "Formal letters can use slang, informal abbreviations, and emojis.",
        "ans": "False",
        "reason": "Formal correspondence requires polite, polished, and standardized official vocabulary."
      }
    ],
    "oneWord": [
      {
        "q": "The opening greeting in a letter or email (e.g., Dear Sir).",
        "ans": "Salutation"
      },
      {
        "q": "The concluding sign-off formula in a letter (e.g., Yours sincerely).",
        "ans": "Subscription"
      },
      {
        "q": "A concise one-line statement of the letter's purpose in formal letters.",
        "ans": "Subject Line"
      },
      {
        "q": "The digital message communication protocol sent over the Internet.",
        "ans": "Electronic Mail (E-mail)"
      },
      {
        "q": "The letter written to the Principal requesting full fee concession due to economic difficulty.",
        "ans": "Fee Concession Application"
      }
    ],
    "matchFollowing": [
      {
        "left": "Formal Application",
        "right": "Yours obediently",
        "pair": "1 -> Yours obediently"
      },
      {
        "left": "Business Letter",
        "right": "Yours faithfully",
        "pair": "2 -> Yours faithfully"
      },
      {
        "left": "Letter to Friend",
        "right": "Yours affectionately / loving friend",
        "pair": "3 -> Yours affectionately / loving friend"
      },
      {
        "left": "E-mail Header",
        "right": "To / CC / BCC / Subject",
        "pair": "4 -> To / CC / BCC / Subject"
      },
      {
        "left": "Salutation to Principal",
        "right": "Respected Sir / Madam",
        "pair": "5 -> Respected Sir / Madam"
      }
    ],
    "goldenPoints": [
      "A Formal Letter consists of 6 parts: 1. Sender/Recipient details, 2. Date, 3. Subject, 4. Salutation, 5. Body, 6. Subscription.",
      "Always write the Date in full words (e.g., '20th September 2026') for official clarity.",
      "The Subject line should be short, specific, and highlighted (underlined or bold).",
      "Structure the Body into 3 paragraphs: Introduction (purpose), Details (facts), Conclusion (request/action).",
      "Use 'Yours obediently' for school principals; use 'Yours faithfully' for unknown business officers.",
      "NEVER write an apostrophe in 'Yours' (Write 'Yours', NOT 'Your's').",
      "Informal letters to parents and friends have a warm, affectionate tone and omit the Subject line.",
      "In modern full-block style, all parts (date, address, salutation, paragraphs, sign-off) align to the LEFT margin.",
      "E-mail subject lines should be specific (e.g., 'Application for Leave - Aarav Sharma').",
      "Always proofread for correct spelling, punctuation, and polite tone before dispatching letters or emails."
    ],
    "sectionMCQ": [
      {
        "q": "Which is the most appropriate subscription for an application addressed to your school Principal?",
        "options": [
          "A) Your's faithfully",
          "B) Yours obediently",
          "C) Yours affectionately",
          "D) Your sincere student"
        ],
        "ans": "B) Yours obediently",
        "exp": "'Yours obediently' is the standard traditional English subscription for students writing to their Principal."
      },
      {
        "q": "In full-block formal letter formatting, where are all components aligned?",
        "options": [
          "A) Right margin",
          "B) Center of the page",
          "C) Left margin",
          "D) In the footer only"
        ],
        "ans": "C) Left margin",
        "exp": "Modern full-block style aligns every element strictly along the left margin."
      },
      {
        "q": "What is the primary function of the 'Subject' line in an official letter?",
        "options": [
          "A) To greet the reader",
          "B) To state the letter's purpose concisely",
          "C) To write the student's biography",
          "D) To list attachments"
        ],
        "ans": "B) To state the letter's purpose concisely",
        "exp": "The subject line encapsulates the central purpose of the correspondence in a few words."
      },
      {
        "q": "Which of the following is an informal letter?",
        "options": [
          "A) Leave application to Principal",
          "B) Complaint to municipal officer",
          "C) Letter to a friend inviting him to a birthday party",
          "D) Application for job"
        ],
        "ans": "C) Letter to a friend inviting him to a birthday party",
        "exp": "Personal letters to friends and family are classified as informal letters."
      },
      {
        "q": "Select the correct spelling and grammar:",
        "options": [
          "A) Yours truely",
          "B) Yours truly",
          "C) Your's truly",
          "D) Yours' truly"
        ],
        "ans": "B) Yours truly",
        "exp": "'Truly' has no 'e', and 'Yours' takes no apostrophe."
      }
    ]
  },
  {
    "id": 10,
    "title": "Paragraph & Guided Composition",
    "theme": "Unit 10: Creative Writing & Composition",
    "unit": "Unit 10: Creative Writing & Composition",
    "summary": "Mastery of paragraph architecture: Topic Sentence, Supporting Sentences, Transition Words, and Concluding Sentence. Includes 6 fully solved high-yield model paragraphs (My School, A Rainy Day, Tree Plantation, Our National Flag, Duties of a Student, A Visit to a Book Fair).",
    "diagram": {
      "title": "Fig 10.1: The 3-Tier Hamburger Architecture of a Cohesive Paragraph",
      "svg": "<svg viewBox=\"0 0 580 240\" class=\"w-full h-auto max-w-[520px] mx-auto border border-amber-200 rounded-lg bg-gradient-to-b from-amber-50/70 to-slate-50 p-2\">\n  <path d=\"M 60 45 Q 290 10 520 45 L 520 65 L 60 65 Z\" fill=\"#f59e0b\" stroke=\"#d97706\" stroke-width=\"1.5\"/>\n  <text x=\"290\" y=\"48\" font-family=\"sans-serif\" font-size=\"10.5\" font-weight=\"bold\" fill=\"#78350f\" text-anchor=\"middle\">1. TOPIC SENTENCE (Top Bun)</text>\n  <text x=\"290\" y=\"60\" font-family=\"sans-serif\" font-size=\"8\" fill=\"#451a03\" text-anchor=\"middle\">States the central main idea and captures the reader's attention.</text>\n  <rect x=\"70\" y=\"75\" width=\"440\" height=\"32\" rx=\"4\" fill=\"#ecfdf5\" stroke=\"#10b981\" stroke-width=\"1.2\"/>\n  <text x=\"290\" y=\"89\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" fill=\"#065f46\" text-anchor=\"middle\">2. SUPPORTING SENTENCE 1: Evidence, Examples, Reasons</text>\n  <text x=\"290\" y=\"101\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#047857\" text-anchor=\"middle\">Expands and elaborates on the main theme.</text>\n  <rect x=\"70\" y=\"112\" width=\"440\" height=\"32\" rx=\"4\" fill=\"#fef3c7\" stroke=\"#f59e0b\" stroke-width=\"1.2\"/>\n  <text x=\"290\" y=\"126\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" fill=\"#78350f\" text-anchor=\"middle\">3. SUPPORTING SENTENCE 2: Explanations &amp; Cohesive Details</text>\n  <text x=\"290\" y=\"138\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#b45309\" text-anchor=\"middle\">Uses transitional connectives (Furthermore, Moreover, In addition).</text>\n  <rect x=\"70\" y=\"149\" width=\"440\" height=\"32\" rx=\"4\" fill=\"#f0f9ff\" stroke=\"#0284c7\" stroke-width=\"1.2\"/>\n  <text x=\"290\" y=\"163\" font-family=\"sans-serif\" font-size=\"9\" font-weight=\"bold\" fill=\"#075985\" text-anchor=\"middle\">4. SUPPORTING SENTENCE 3: Impact, Personal Insight or Analysis</text>\n  <text x=\"290\" y=\"175\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#0369a1\" text-anchor=\"middle\">Deepens the reader's understanding with descriptive vocabulary.</text>\n  <path d=\"M 60 190 L 520 190 L 520 205 Q 290 230 60 205 Z\" fill=\"#f59e0b\" stroke=\"#d97706\" stroke-width=\"1.5\"/>\n  <text x=\"290\" y=\"206\" font-family=\"sans-serif\" font-size=\"9.5\" font-weight=\"bold\" fill=\"#78350f\" text-anchor=\"middle\">5. CONCLUDING SENTENCE (Bottom Bun)</text>\n  <text x=\"290\" y=\"218\" font-family=\"sans-serif\" font-size=\"7.5\" fill=\"#451a03\" text-anchor=\"middle\">Restates main idea in new words and provides a memorable takeaway.</text>\n</svg>",
      "caption": "Figure 10.1: Structural anatomy and flow of a unified, cohesive English paragraph."
    },
    "diagramQuestions": [
      {
        "q": "What is the primary role of the 'Topic Sentence' in paragraph writing?",
        "ans": "The <strong>Topic Sentence</strong> introduces the central subject or controlling idea of the entire paragraph, setting the tone and context for all subsequent supporting sentences."
      },
      {
        "q": "How does a 'Concluding Sentence' effectively close a paragraph?",
        "ans": "The <strong>Concluding Sentence</strong> summarizes the main points without introducing unrelated new ideas, restates the core theme in fresh words, and provides a satisfying final impression."
      }
    ],
    "sectionA": [
      {
        "q": "Write a comprehensive model descriptive paragraph on 'My School (Police Modern School, Raebareli)'.",
        "ans": "<strong>Paragraph: My School (Police Modern School, Raebareli)</strong><br><br>My school, <strong>Police Modern School</strong>, located in the peaceful and secure campus of the 25th Battalion PAC in Raebareli, is an exemplary temple of learning. Established with the noble objective of imparting holistic education, the school boasts an impressive multi-storey building surrounded by lush green lawns, blooming flower beds, and majestic trees. Our classrooms are spacious, well-ventilated, and equipped with modern educational charts and digital interactive boards. The school houses state-of-the-art Science and Computer laboratories, a rich library with thousands of reference books, and expansive sports grounds for athletics, football, and cricket.<br><br>What truly distinguishes our school is its highly qualified, dedicated, and affectionate teachers who impart not only academic excellence but also high moral values, discipline, and patriotism. Regular co-curricular activities, quizzes, debates, and annual sports meets nurture our creative talents and leadership qualities. The clean and disciplined environment inspires every student to strive for perfection. I feel immensely proud and privileged to be a student of Police Modern School, which is shaping us into responsible, enlightened citizens of India."
      },
      {
        "q": "Write a descriptive model paragraph on 'Tree Plantation & Environmental Protection'.",
        "ans": "<strong>Paragraph: Tree Plantation — Our Green Lifeline</strong><br><br>Trees are the most invaluable gifts of nature to humankind and all living beings on Earth. Often referred to as the 'lungs of the planet', trees absorb toxic carbon dioxide from the atmosphere during photosynthesis and release life-giving oxygen, maintaining the delicate ecological balance of our biosphere. They act as natural air purifiers, prevent soil erosion by binding topsoil with their deep root networks, recharge underground water aquifers, and regulate climate by inducing rainfall. Furthermore, trees provide us with nutritious fruits, vital medicines, timber, rubber, and cool shade, while serving as natural habitats for countless species of birds and wildlife.<br><br>Unfortunately, rampant deforestation and rapid urbanization have led to severe global warming, erratic rainfall patterns, and pollution. Therefore, extensive <strong>Tree Plantation</strong> is the most urgent need of the hour. We must actively participate in 'Van Mahotsav' drives and pledge to plant and nurture at least one tree every year. Protecting our green canopy today is the only guarantee of a healthy, prosperous, and sustainable future for tomorrow."
      },
      {
        "q": "Write a model paragraph on 'The Duties and Responsibilities of an Ideal Student'.",
        "ans": "<strong>Paragraph: Duties of an Ideal Student</strong><br><br>Students are the future architects, leaders, and pillars of a nation, and their student life is the golden period for character building and intellectual development. The foremost duty of an ideal student is to pursue knowledge with sincerity, dedication, and deep curiosity. A good student attends school punctually, listens attentively to teachers, completes academic assignments diligently, and adheres to strict classroom discipline. Beyond academic excellence, an ideal student demonstrates profound respect for parents, teachers, and elders while treating classmates with kindness, empathy, and cooperation.<br><br>Moreover, an ideal student actively takes part in sports, yoga, and social welfare activities, maintaining physical fitness and civic consciousness. Upholding moral integrity, honesty, truthfulness, and patriotism are the defining hallmarks of such a student. By cultivating discipline and staying away from harmful habits and distractions, an ideal student not only excels in life but also contributes constructively to the progress, unity, and glory of our beloved nation."
      },
      {
        "q": "Write a descriptive paragraph on 'A Visit to a Book Fair'.",
        "ans": "<strong>Paragraph: A Visit to a Book Fair</strong><br><br>Last Sunday, I had the wonderful opportunity to visit the Grand National Book Fair organized at the city auditorium. As I entered the venue, I was greeted by an enchanting world of knowledge adorned with vibrant banners, colorful stalls, and thousands of enthusiastic book lovers of all ages. Leading national and international publishers had set up beautifully arranged stalls displaying books on diverse subjects, including literature, science, history, biographies, encyclopedias, competitive exam guides, and colorful children's storybooks.<br><br>The fair was bustling with lively literary discussions, author meet-and-greet sessions, and book reading corners. I spent several delightful hours browsing through various stalls and purchased three books: a dictionary, an illustrated book on Indian freedom fighters, and a science fiction novel. The fair offered attractive student discounts, making it affordable for everyone. Visiting the book fair was an enriching and memorable experience that deepened my passion for reading and expanded my intellectual horizon."
      },
      {
        "q": "Write a patriotic paragraph on 'Our National Flag (The Tricolour / Tiranga)'.",
        "ans": "<strong>Paragraph: Our National Flag — The Pride of India</strong><br><br>The National Flag of India, lovingly known as the <strong>Tricolour (Tiranga)</strong>, is the supreme symbol of our nation's sovereignty, freedom, unity, and pride. Designed by the visionary freedom fighter Pingali Venkayya, our flag consists of three equal horizontal bands. The top band of <strong>Deep Saffron (Kesari)</strong> represents courage, bravery, and selflessness. The middle band of <strong>White</strong> signifies truth, purity, and universal peace. The bottom band of <strong>Dark Green</strong> symbolizes fertility, prosperity, and the agricultural richness of our land.<br><br>In the exact center of the white band rests the navy blue <strong>Ashoka Chakra</strong> featuring 24 equidistant spokes, representing the wheel of the eternal law of Dharma and ceaseless progress. The Tricolour was proudly hoisted on 15th August 1947 when India achieved independence. Whenever our flag flutters high in the sky during National Festivals or international sporting arenas, it fills every Indian heart with deep patriotic fervor, inspiring us to sacrifice everything for the honor, integrity, and progress of our motherland."
      }
    ],
    "sectionB": [
      {
        "q": "What are the three essential structural components of a well-organized paragraph?",
        "ans": "1. <strong>Topic Sentence</strong> (introduces main theme),<br>2. <strong>Supporting Sentences</strong> (provides facts, examples, explanations),<br>3. <strong>Concluding Sentence</strong> (summarizes and provides closure)."
      },
      {
        "q": "Mention three transition words used to connect ideas smoothly within a paragraph.",
        "ans": "<em>Furthermore, Moreover, In addition, Consequently, Therefore, On the other hand.</em>"
      },
      {
        "q": "What is the recommended word length for a standard school paragraph in Class 6?",
        "ans": "Approximately <strong>120 to 180 words</strong> (10 to 15 well-structured sentences)."
      },
      {
        "q": "Why is 'Unity of Thought' considered the golden rule in paragraph writing?",
        "ans": "Because a single paragraph must focus strictly on <strong>one central theme or topic</strong>; introducing unrelated ideas destroys coherence and confuses the reader."
      },
      {
        "q": "Give an attractive title for a paragraph describing a torrential rainy day.",
        "ans": "'<strong>A Rainy Day — Nature's Refreshing Gift</strong>' / '<strong>A Memorable Rainy Day</strong>'"
      }
    ],
    "trueFalse": [
      {
        "q": "A paragraph should discuss five completely different unrelated topics in one single block.",
        "ans": "False",
        "reason": "The cardinal rule of paragraph writing is 'Unity' — one paragraph must develop only one central idea."
      },
      {
        "q": "The Topic Sentence is usually placed at the very beginning of the paragraph.",
        "ans": "True",
        "reason": "Placing the topic sentence first immediately establishes the subject for the reader."
      },
      {
        "q": "Transition words like 'However', 'Therefore', and 'Similarly' improve paragraph coherence.",
        "ans": "True",
        "reason": "Connective words create logical bridges between sequential ideas."
      },
      {
        "q": "A paragraph does not require a title or heading in standard composition examinations.",
        "ans": "False",
        "reason": "A relevant, eye-catching title is mandatory and carries dedicated marks in examination marking schemes."
      },
      {
        "q": "The concluding sentence should contradict the main topic sentence of the paragraph.",
        "ans": "False",
        "reason": "The concluding sentence must reinforce and summarize the central thesis."
      }
    ],
    "oneWord": [
      {
        "q": "The sentence that states the central controlling idea of a paragraph.",
        "ans": "Topic Sentence"
      },
      {
        "q": "The quality of logical connection and smooth flow between sentences in a paragraph.",
        "ans": "Coherence"
      },
      {
        "q": "The final sentence that brings a paragraph to a satisfying summary conclusion.",
        "ans": "Concluding Sentence"
      },
      {
        "q": "The visual architectural metaphor used to teach paragraph parts (Bun - Meat - Bun).",
        "ans": "Hamburger Paragraph Model"
      },
      {
        "q": "Words like 'Moreover', 'Consequently', and 'In addition' used to link sentences.",
        "ans": "Transitional Connectives (Cohesive Devices)"
      }
    ],
    "matchFollowing": [
      {
        "left": "Topic Sentence",
        "right": "Introduces main theme",
        "pair": "1 -> Introduces main theme"
      },
      {
        "left": "Supporting Details",
        "right": "Expands with facts & examples",
        "pair": "2 -> Expands with facts & examples"
      },
      {
        "left": "Concluding Sentence",
        "right": "Restates & closes paragraph",
        "pair": "3 -> Restates & closes paragraph"
      },
      {
        "left": "Transitional Words",
        "right": "Builds logical coherence",
        "pair": "4 -> Builds logical coherence"
      },
      {
        "left": "Unity Rule",
        "right": "Focuses on single core idea",
        "pair": "5 -> Focuses on single core idea"
      }
    ],
    "goldenPoints": [
      "Every well-crafted paragraph consists of: 1. Topic Sentence, 2. Supporting Sentences, 3. Concluding Sentence.",
      "The 'Unity' principle requires every single sentence in the paragraph to relate directly to the central topic.",
      "The 'Coherence' principle requires ideas to flow logically and smoothly from one sentence to the next.",
      "Use transitional linkers (Furthermore, However, For instance, Therefore) to bridge ideas seamlessly.",
      "Always give an appropriate, attractive title centered above the paragraph.",
      "Maintain consistent grammatical tense and person throughout the paragraph.",
      "Use varied sentence lengths (a mix of simple, compound, and complex sentences) to keep writing engaging.",
      "Enrich your paragraph with precise adjectives and vivid descriptive vocabulary.",
      "The concluding sentence should leave a strong, memorable impression without introducing brand new topics.",
      "Always proofread your composition for spelling, subject-verb agreement, and punctuation accuracy."
    ],
    "sectionMCQ": [
      {
        "q": "What is the primary function of a Topic Sentence?",
        "options": [
          "A) To conclude the essay",
          "B) To state the main controlling idea of the paragraph",
          "C) To list random vocabulary words",
          "D) To sign off the letter"
        ],
        "ans": "B) To state the main controlling idea of the paragraph",
        "exp": "The topic sentence establishes the central subject and scope of the paragraph."
      },
      {
        "q": "Which transition word indicates contrast between two ideas?",
        "options": [
          "A) Furthermore",
          "B) However",
          "C) In addition",
          "D) Consequently"
        ],
        "ans": "B) However",
        "exp": "'However' signals a contrast, qualification, or opposing viewpoint."
      },
      {
        "q": "Which element is essential for achieving 'Coherence' in a paragraph?",
        "options": [
          "A) Writing in three different languages",
          "B) Logical sequence and transitional linking words",
          "C) Using only short one-word sentences",
          "D) Omitting all punctuation"
        ],
        "ans": "B) Logical sequence and transitional linking words",
        "exp": "Coherence depends on smooth, logical progression connected by cohesive devices."
      },
      {
        "q": "A student writing a paragraph on 'Tree Plantation' should NOT include:",
        "options": [
          "A) Oxygen production by trees",
          "B) Prevention of soil erosion",
          "C) Detailed rules of cricket batting",
          "D) Importance of Van Mahotsav"
        ],
        "ans": "C) Detailed rules of cricket batting",
        "exp": "Cricket rules violate the principle of Unity by introducing an irrelevant topic."
      },
      {
        "q": "What is the ideal position for the Concluding Sentence?",
        "options": [
          "A) In the middle of the paragraph",
          "B) At the very end of the paragraph",
          "C) Before the title",
          "D) Inside a footnote"
        ],
        "ans": "B) At the very end of the paragraph",
        "exp": "The concluding sentence provides the final summary and closing takeaway."
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.GRAMMAR_CHAPTERS_DATA = GRAMMAR_CHAPTERS_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GRAMMAR_CHAPTERS_DATA;
}
