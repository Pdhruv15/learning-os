import type { Course, LearningPath } from './types'

const yt = (query: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`

export const courses: Course[] = [
  {
    "id": "ai-assisted-programming-8020",
    "title": "AI-Assisted Programming — Pareto 80/20 (21 Days)",
    "category": "Programming",
    "level": "Beginner",
    "accent": "#16876b",
    "icon": "⚙",
    "featured": true,
    "description": "45–60 minutes daily. Learn the highest-value TypeScript, Electron, Git, debugging and local AI tool-calling skills for LV Design Suite. Tamil-first resources, daily exercises, weekly capstones; defer deep fine-tuning and advanced theory.",
    "modules": [
      {
        "id": "pareto-m1",
        "title": "Week 1 · Practical TypeScript",
        "description": "Master only the programming patterns repeatedly used in LV Design Suite.",
        "lessons": [
          {
            "id": "pareto-01",
            "title": "Day 1: TypeScript values and types",
            "minutes": 60,
            "summary": "Read and change a typed electrical-load object. Practice 10 minutes learning, 20 minutes reading an example, 25 minutes building with AI, 5 minutes reviewing.",
            "objectives": [
              "Identify string, number, boolean and typed fields",
              "Read and change a typed electrical-load object",
              "Explain the change in your own words and record one takeaway"
            ],
            "resources": [
              {
                "title": "Tamil-first video search",
                "url": "https://www.youtube.com/results?search_query=TypeScript%20types%20variables%20Tamil",
                "kind": "Video",
                "language": "Tamil"
              },
              {
                "title": "Official reference (English)",
                "url": "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
                "kind": "Guide",
                "language": "English"
              }
            ]
          },
          {
            "id": "pareto-02",
            "title": "Day 2: Objects, arrays and JSON",
            "minutes": 60,
            "summary": "Represent an MDB with three DBs as JSON. Practice 10 minutes learning, 20 minutes reading an example, 25 minutes building with AI, 5 minutes reviewing.",
            "objectives": [
              "Inspect properties, arrays and nested SLD design data",
              "Represent an MDB with three DBs as JSON",
              "Explain the change in your own words and record one takeaway"
            ],
            "resources": [
              {
                "title": "Tamil-first video search",
                "url": "https://www.youtube.com/results?search_query=JavaScript%20objects%20arrays%20JSON%20Tamil",
                "kind": "Video",
                "language": "Tamil"
              },
              {
                "title": "Official reference (English)",
                "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Object_basics",
                "kind": "Guide",
                "language": "English"
              }
            ]
          },
          {
            "id": "pareto-03",
            "title": "Day 3: Functions and parameters",
            "minutes": 60,
            "summary": "Create a typed three-phase current helper. Practice 10 minutes learning, 20 minutes reading an example, 25 minutes building with AI, 5 minutes reviewing.",
            "objectives": [
              "Explain inputs, outputs, units and assumptions",
              "Create a typed three-phase current helper",
              "Explain the change in your own words and record one takeaway"
            ],
            "resources": [
              {
                "title": "Tamil-first video search",
                "url": "https://www.youtube.com/results?search_query=TypeScript%20functions%20tutorial%20Tamil",
                "kind": "Video",
                "language": "Tamil"
              },
              {
                "title": "Official reference (English)",
                "url": "https://www.typescriptlang.org/docs/handbook/2/functions.html",
                "kind": "Guide",
                "language": "English"
              }
            ]
          },
          {
            "id": "pareto-04",
            "title": "Day 4: Conditions and loops",
            "minutes": 60,
            "summary": "Flag missing feeder inputs before calculations. Practice 10 minutes learning, 20 minutes reading an example, 25 minutes building with AI, 5 minutes reviewing.",
            "objectives": [
              "Use if statements and array iteration for validation",
              "Flag missing feeder inputs before calculations",
              "Explain the change in your own words and record one takeaway"
            ],
            "resources": [
              {
                "title": "Tamil-first video search",
                "url": "https://www.youtube.com/results?search_query=JavaScript%20if%20loops%20Tamil",
                "kind": "Video",
                "language": "Tamil"
              },
              {
                "title": "Official reference (English)",
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling",
                "kind": "Guide",
                "language": "English"
              }
            ]
          },
          {
            "id": "pareto-05",
            "title": "Day 5: Async/await and APIs",
            "minutes": 60,
            "summary": "Call a local mock API and handle loading/error states. Practice 10 minutes learning, 20 minutes reading an example, 25 minutes building with AI, 5 minutes reviewing.",
            "objectives": [
              "Understand promises and await in UI code",
              "Call a local mock API and handle loading/error states",
              "Explain the change in your own words and record one takeaway"
            ],
            "resources": [
              {
                "title": "Tamil-first video search",
                "url": "https://www.youtube.com/results?search_query=JavaScript%20async%20await%20fetch%20Tamil",
                "kind": "Video",
                "language": "Tamil"
              },
              {
                "title": "Official reference (English)",
                "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Promises",
                "kind": "Guide",
                "language": "English"
              }
            ]
          },
          {
            "id": "pareto-06",
            "title": "Day 6: Git and GitHub essentials",
            "minutes": 60,
            "summary": "Create a branch, inspect diff and safely commit. Practice 10 minutes learning, 20 minutes reading an example, 25 minutes building with AI, 5 minutes reviewing.",
            "objectives": [
              "Run status, diff, add, commit and switch",
              "Create a branch, inspect diff and safely commit",
              "Explain the change in your own words and record one takeaway"
            ],
            "resources": [
              {
                "title": "Tamil-first video search",
                "url": "https://www.youtube.com/results?search_query=Git%20GitHub%20beginners%20Tamil",
                "kind": "Video",
                "language": "Tamil"
              },
              {
                "title": "Official reference (English)",
                "url": "https://git-scm.com/book/en/v2",
                "kind": "Guide",
                "language": "English"
              }
            ]
          },
          {
            "id": "pareto-07",
            "title": "Day 7: Week 1 capstone: calculation utility",
            "minutes": 60,
            "summary": "Build a typed input-to-result helper with a simple test. Practice 10 minutes learning, 20 minutes reading an example, 25 minutes building with AI, 5 minutes reviewing.",
            "objectives": [
              "Combine types, validation and functions",
              "Build a typed input-to-result helper with a simple test",
              "Explain the change in your own words and record one takeaway"
            ],
            "resources": [
              {
                "title": "Tamil-first video search",
                "url": "https://www.youtube.com/results?search_query=TypeScript%20mini%20project%20Tamil",
                "kind": "Video",
                "language": "Tamil"
              },
              {
                "title": "Official reference (English)",
                "url": "https://www.typescriptlang.org/docs/",
                "kind": "Guide",
                "language": "English"
              }
            ],
            "quiz": [
              {
                "id": "pareto-q7",
                "prompt": "What is the best evidence that this milestone is complete?",
                "options": [
                  "AI generated code without checking",
                  "A working example with verified output and a short explanation",
                  "Watching a long video",
                  "Memorizing framework internals"
                ],
                "answer": 1,
                "explanation": "The Pareto plan prioritizes practical verified skills, not time spent or unreviewed AI output."
              }
            ]
          }
        ]
      },
      {
        "id": "pareto-m2",
        "title": "Week 2 · Electron, debugging & tests",
        "description": "Understand app boundaries and verify AI-assisted changes.",
        "lessons": [
          {
            "id": "pareto-08",
            "title": "Day 8: Electron process model",
            "minutes": 60,
            "summary": "Identify main, preload and renderer files in LV Design Suite. Practice 10 minutes learning, 20 minutes reading an example, 25 minutes building with AI, 5 minutes reviewing.",
            "objectives": [
              "Understand which process owns each responsibility",
              "Identify main, preload and renderer files in LV Design Suite",
              "Explain the change in your own words and record one takeaway"
            ],
            "resources": [
              {
                "title": "Tamil-first video search",
                "url": "https://www.youtube.com/results?search_query=Electron%20JS%20tutorial%20Tamil",
                "kind": "Video",
                "language": "Tamil"
              },
              {
                "title": "Official reference (English)",
                "url": "https://www.electronjs.org/docs/latest/tutorial/process-model",
                "kind": "Guide",
                "language": "English"
              }
            ]
          },
          {
            "id": "pareto-09",
            "title": "Day 9: React component essentials",
            "minutes": 60,
            "summary": "Inspect and edit one existing design-panel component. Practice 10 minutes learning, 20 minutes reading an example, 25 minutes building with AI, 5 minutes reviewing.",
            "objectives": [
              "Read props, state and event handlers without mastering React internals",
              "Inspect and edit one existing design-panel component",
              "Explain the change in your own words and record one takeaway"
            ],
            "resources": [
              {
                "title": "Tamil-first video search",
                "url": "https://www.youtube.com/results?search_query=React%20components%20useState%20Tamil",
                "kind": "Video",
                "language": "Tamil"
              },
              {
                "title": "Official reference (English)",
                "url": "https://react.dev/learn",
                "kind": "Guide",
                "language": "English"
              }
            ]
          },
          {
            "id": "pareto-10",
            "title": "Day 10: Electron IPC and contextBridge",
            "minutes": 60,
            "summary": "Create a narrow typed UI-to-main test command. Practice 10 minutes learning, 20 minutes reading an example, 25 minutes building with AI, 5 minutes reviewing.",
            "objectives": [
              "Avoid unrestricted Node access from renderer",
              "Create a narrow typed UI-to-main test command",
              "Explain the change in your own words and record one takeaway"
            ],
            "resources": [
              {
                "title": "Tamil-first video search",
                "url": "https://www.youtube.com/results?search_query=Electron%20IPC%20contextBridge%20Tamil",
                "kind": "Video",
                "language": "Tamil"
              },
              {
                "title": "Official reference (English)",
                "url": "https://www.electronjs.org/docs/latest/tutorial/ipc",
                "kind": "Guide",
                "language": "English"
              }
            ]
          },
          {
            "id": "pareto-11",
            "title": "Day 11: Validation and errors",
            "minutes": 60,
            "summary": "Reject missing or invalid electrical design inputs. Practice 10 minutes learning, 20 minutes reading an example, 25 minutes building with AI, 5 minutes reviewing.",
            "objectives": [
              "Handle errors visibly and validate unknown data",
              "Reject missing or invalid electrical design inputs",
              "Explain the change in your own words and record one takeaway"
            ],
            "resources": [
              {
                "title": "Tamil-first video search",
                "url": "https://www.youtube.com/results?search_query=Zod%20TypeScript%20validation%20tutorial",
                "kind": "Video",
                "language": "Tamil"
              },
              {
                "title": "Official reference (English)",
                "url": "https://zod.dev/",
                "kind": "Guide",
                "language": "English"
              }
            ]
          },
          {
            "id": "pareto-12",
            "title": "Day 12: Debugging real application code",
            "minutes": 60,
            "summary": "Reproduce an error and trace its source. Practice 10 minutes learning, 20 minutes reading an example, 25 minutes building with AI, 5 minutes reviewing.",
            "objectives": [
              "Use console, breakpoints and stack traces",
              "Reproduce an error and trace its source",
              "Explain the change in your own words and record one takeaway"
            ],
            "resources": [
              {
                "title": "Tamil-first video search",
                "url": "https://www.youtube.com/results?search_query=JavaScript%20debugging%20Tamil%20tutorial",
                "kind": "Video",
                "language": "Tamil"
              },
              {
                "title": "Official reference (English)",
                "url": "https://developer.chrome.com/docs/devtools/javascript",
                "kind": "Guide",
                "language": "English"
              }
            ]
          },
          {
            "id": "pareto-13",
            "title": "Day 13: Unit tests for calculations",
            "minutes": 60,
            "summary": "Check a verified three-phase-current example and edge cases. Practice 10 minutes learning, 20 minutes reading an example, 25 minutes building with AI, 5 minutes reviewing.",
            "objectives": [
              "Run tests and identify regression failures",
              "Check a verified three-phase-current example and edge cases",
              "Explain the change in your own words and record one takeaway"
            ],
            "resources": [
              {
                "title": "Tamil-first video search",
                "url": "https://www.youtube.com/results?search_query=TypeScript%20unit%20testing%20Vitest%20Tamil",
                "kind": "Video",
                "language": "Tamil"
              },
              {
                "title": "Official reference (English)",
                "url": "https://vitest.dev/guide/",
                "kind": "Guide",
                "language": "English"
              }
            ]
          },
          {
            "id": "pareto-14",
            "title": "Day 14: Week 2 capstone: calculation panel",
            "minutes": 60,
            "summary": "Propose a simple safe calculation-panel change. Practice 10 minutes learning, 20 minutes reading an example, 25 minutes building with AI, 5 minutes reviewing.",
            "objectives": [
              "Connect UI, typed values, validation and tests",
              "Propose a simple safe calculation-panel change",
              "Explain the change in your own words and record one takeaway"
            ],
            "resources": [
              {
                "title": "Tamil-first video search",
                "url": "https://www.youtube.com/results?search_query=Electron%20React%20TypeScript%20project%20Tamil",
                "kind": "Video",
                "language": "Tamil"
              },
              {
                "title": "Official reference (English)",
                "url": "https://www.electronjs.org/docs/latest/tutorial/quick-start",
                "kind": "Guide",
                "language": "English"
              }
            ],
            "quiz": [
              {
                "id": "pareto-q14",
                "prompt": "What is the best evidence that this milestone is complete?",
                "options": [
                  "AI generated code without checking",
                  "A working example with verified output and a short explanation",
                  "Watching a long video",
                  "Memorizing framework internals"
                ],
                "answer": 1,
                "explanation": "The Pareto plan prioritizes practical verified skills, not time spent or unreviewed AI output."
              }
            ]
          }
        ]
      },
      {
        "id": "pareto-m3",
        "title": "Week 3 · Local AI & LV design tools",
        "description": "Prototype a safe built-in assistant without training from scratch.",
        "lessons": [
          {
            "id": "pareto-15",
            "title": "Day 15: Local LLM fundamentals and Ollama",
            "minutes": 60,
            "summary": "Run a small compatible local model on the Mac. Practice 10 minutes learning, 20 minutes reading an example, 25 minutes building with AI, 5 minutes reviewing.",
            "objectives": [
              "Understand model selection, context and local inference",
              "Run a small compatible local model on the Mac",
              "Explain the change in your own words and record one takeaway"
            ],
            "resources": [
              {
                "title": "Tamil-first video search",
                "url": "https://www.youtube.com/results?search_query=Ollama%20local%20LLM%20Tamil%20tutorial",
                "kind": "Video",
                "language": "Tamil"
              },
              {
                "title": "Official reference (English)",
                "url": "https://docs.ollama.com/",
                "kind": "Guide",
                "language": "English"
              }
            ]
          },
          {
            "id": "pareto-16",
            "title": "Day 16: Prompt context for LV design",
            "minutes": 60,
            "summary": "Write a precise MDB and outgoing DB design request. Practice 10 minutes learning, 20 minutes reading an example, 25 minutes building with AI, 5 minutes reviewing.",
            "objectives": [
              "Separate known inputs, assumptions and acceptance checks",
              "Write a precise MDB and outgoing DB design request",
              "Explain the change in your own words and record one takeaway"
            ],
            "resources": [
              {
                "title": "Tamil-first video search",
                "url": "https://www.youtube.com/results?search_query=AI%20prompt%20engineering%20Tamil%20tutorial",
                "kind": "Video",
                "language": "Tamil"
              },
              {
                "title": "Official reference (English)",
                "url": "https://docs.ollama.com/",
                "kind": "Guide",
                "language": "English"
              }
            ]
          },
          {
            "id": "pareto-17",
            "title": "Day 17: Structured JSON AI responses",
            "minutes": 60,
            "summary": "Request an SLD command with a strict schema. Practice 10 minutes learning, 20 minutes reading an example, 25 minutes building with AI, 5 minutes reviewing.",
            "objectives": [
              "Parse and validate model output before using it",
              "Request an SLD command with a strict schema",
              "Explain the change in your own words and record one takeaway"
            ],
            "resources": [
              {
                "title": "Tamil-first video search",
                "url": "https://www.youtube.com/results?search_query=LLM%20structured%20outputs%20JSON%20Tamil",
                "kind": "Video",
                "language": "Tamil"
              },
              {
                "title": "Official reference (English)",
                "url": "https://docs.ollama.com/capabilities/structured-outputs",
                "kind": "Guide",
                "language": "English"
              }
            ]
          },
          {
            "id": "pareto-18",
            "title": "Day 18: AI tool calling to calculations",
            "minutes": 60,
            "summary": "Wire a mock AI tool to a deterministic calculation. Practice 10 minutes learning, 20 minutes reading an example, 25 minutes building with AI, 5 minutes reviewing.",
            "objectives": [
              "Keep calculation execution under application control",
              "Wire a mock AI tool to a deterministic calculation",
              "Explain the change in your own words and record one takeaway"
            ],
            "resources": [
              {
                "title": "Tamil-first video search",
                "url": "https://www.youtube.com/results?search_query=Ollama%20tool%20calling%20TypeScript%20Tamil",
                "kind": "Video",
                "language": "Tamil"
              },
              {
                "title": "Official reference (English)",
                "url": "https://docs.ollama.com/capabilities/tool-calling",
                "kind": "Guide",
                "language": "English"
              }
            ]
          },
          {
            "id": "pareto-19",
            "title": "Day 19: Preview, approval and rollback",
            "minutes": 60,
            "summary": "Preview proposed SLD edits and reject unsafe commands. Practice 10 minutes learning, 20 minutes reading an example, 25 minutes building with AI, 5 minutes reviewing.",
            "objectives": [
              "Enforce review, approval and undo before write operations",
              "Preview proposed SLD edits and reject unsafe commands",
              "Explain the change in your own words and record one takeaway"
            ],
            "resources": [
              {
                "title": "Tamil-first video search",
                "url": "https://www.youtube.com/results?search_query=AI%20tool%20calling%20safety%20validation",
                "kind": "Video",
                "language": "Tamil"
              },
              {
                "title": "Official reference (English)",
                "url": "https://www.electronjs.org/docs/latest/tutorial/security",
                "kind": "Guide",
                "language": "English"
              }
            ]
          },
          {
            "id": "pareto-20",
            "title": "Day 20: RAG fundamentals and references",
            "minutes": 60,
            "summary": "Retrieve a relevant LV design reference and show its source. Practice 10 minutes learning, 20 minutes reading an example, 25 minutes building with AI, 5 minutes reviewing.",
            "objectives": [
              "Understand embedding, retrieval and standards-version limits",
              "Retrieve a relevant LV design reference and show its source",
              "Explain the change in your own words and record one takeaway"
            ],
            "resources": [
              {
                "title": "Tamil-first video search",
                "url": "https://www.youtube.com/results?search_query=RAG%20embeddings%20tutorial%20Tamil",
                "kind": "Video",
                "language": "Tamil"
              },
              {
                "title": "Official reference (English)",
                "url": "https://python.langchain.com/docs/tutorials/rag/",
                "kind": "Guide",
                "language": "English"
              }
            ]
          },
          {
            "id": "pareto-21",
            "title": "Day 21: Final capstone: AI-assisted SLD draft",
            "minutes": 60,
            "summary": "Have AI propose MDB and three outgoing DBs using validated JSON. Practice 10 minutes learning, 20 minutes reading an example, 25 minutes building with AI, 5 minutes reviewing.",
            "objectives": [
              "Demo prompt → validated command → preview → approval; defer real electrical sizing until verified",
              "Have AI propose MDB and three outgoing DBs using validated JSON",
              "Explain the change in your own words and record one takeaway"
            ],
            "resources": [
              {
                "title": "Tamil-first video search",
                "url": "https://www.youtube.com/results?search_query=Ollama%20Electron%20AI%20agent%20tutorial",
                "kind": "Video",
                "language": "Tamil"
              },
              {
                "title": "Official reference (English)",
                "url": "https://docs.ollama.com/capabilities/tool-calling",
                "kind": "Guide",
                "language": "English"
              }
            ],
            "quiz": [
              {
                "id": "pareto-q21",
                "prompt": "What is the best evidence that this milestone is complete?",
                "options": [
                  "AI generated code without checking",
                  "A working example with verified output and a short explanation",
                  "Watching a long video",
                  "Memorizing framework internals"
                ],
                "answer": 1,
                "explanation": "The Pareto plan prioritizes practical verified skills, not time spent or unreviewed AI output."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'lv-design', title: 'Advanced LV Electrical Design', category: 'Electrical', level: 'Advanced', accent: '#e85d3f', icon: '⚡', featured: true,
    description: 'Design safe, coordinated and buildable low-voltage systems from load schedule to final documentation.',
    modules: [
      { id: 'lv-m1', title: 'Design foundations', description: 'Standards, architecture and design inputs.', lessons: [
        { id: 'lv-01', title: 'LV design workflow & deliverables', minutes: 35, summary: 'Translate a client brief into a traceable design basis, calculation package and drawing register.', objectives: ['Define design inputs and boundaries', 'Build a design deliverables register', 'Separate assumptions from verified data'], resources: [
          { title: 'Electrical design basics — Tamil search', url: yt('electrical design basics Tamil LV'), kind: 'Video', language: 'Tamil' },
          { title: 'Schneider Electrical Installation Guide', url: 'https://www.se.com/ww/en/work/products/product-launch/electrical-installation-guide/', kind: 'Guide', language: 'English' }
        ], quiz: [{ id: 'q1', prompt: 'Which document should capture unverified project inputs?', options: ['Cable schedule', 'Assumptions register', 'Panel legend', 'Test certificate'], answer: 1, explanation: 'An assumptions register makes uncertainty visible and traceable.' }] },
        { id: 'lv-02', title: 'Codes, diversity & demand factors', minutes: 45, summary: 'Use applicable codes and evidence-based diversity without hiding engineering assumptions.', objectives: ['Distinguish connected and maximum demand', 'Document diversity by load class', 'Build a code hierarchy'], resources: [
          { title: 'Maximum demand — Tamil search', url: yt('maximum demand diversity factor electrical Tamil'), kind: 'Video', language: 'Tamil' },
          { title: 'IEC 60364 overview', url: 'https://www.iec.ch/standards', kind: 'Guide', language: 'English' }
        ] }
      ]},
      { id: 'lv-m2', title: 'Load assessment & distribution', description: 'Schedules, transformers and network arrangement.', lessons: [
        { id: 'lv-03', title: 'Load schedules that stay auditable', minutes: 55, summary: 'Structure load data from final circuits through DBs, MDBs and source capacity.', objectives: ['Create a hierarchical load schedule', 'Apply coincident demand', 'Track spare and future capacity'], resources: [{ title: 'Load schedule — Tamil search', url: yt('electrical load schedule calculation Tamil'), kind: 'Video', language: 'Tamil' }, { title: 'Electrical calculations — OpenElectrical', url: 'https://openelectrical.org/index.php?title=Main_Page', kind: 'Guide', language: 'English' }] },
        { id: 'lv-04', title: 'Transformer & generator sizing', minutes: 50, summary: 'Size sources for demand, motor starting, harmonics, ambient conditions and future growth.', objectives: ['Calculate transformer kVA', 'Check generator transient loading', 'Account for nonlinear loads'], resources: [{ title: 'Transformer sizing — Tamil search', url: yt('transformer sizing calculation Tamil'), kind: 'Video', language: 'Tamil' }, { title: 'Generator sizing fundamentals', url: yt('generator sizing motor starting harmonics'), kind: 'Video', language: 'English' }] }
      ]},
      { id: 'lv-m3', title: 'Cable & protection engineering', description: 'Rating, voltage drop, fault level and discrimination.', lessons: [
        { id: 'lv-05', title: 'Cable sizing: ampacity to derating', minutes: 65, summary: 'Select conductors through current capacity, installation method, grouping, ambient temperature and protective-device checks.', objectives: ['Apply correction factors', 'Check neutral loading', 'Record installation assumptions'], resources: [{ title: 'Cable sizing — Tamil search', url: yt('cable sizing calculation Tamil electrical'), kind: 'Video', language: 'Tamil' }, { title: 'Cable sizing guide', url: 'https://www.electrical-installation.org/enwiki/Sizing_and_protection_of_conductors', kind: 'Guide', language: 'English' }] },
        { id: 'lv-06', title: 'Voltage drop & motor starting', minutes: 55, summary: 'Verify steady-state and starting voltage performance at the point of use.', objectives: ['Calculate three-phase voltage drop', 'Model starting current', 'Choose mitigation options'], resources: [{ title: 'Voltage drop — Tamil search', url: yt('voltage drop calculation Tamil three phase'), kind: 'Video', language: 'Tamil' }, { title: 'Voltage drop reference', url: 'https://www.electrical-installation.org/enwiki/Voltage_drop', kind: 'Guide', language: 'English' }] },
        { id: 'lv-07', title: 'Short-circuit levels & device duty', minutes: 70, summary: 'Estimate prospective fault current and verify equipment breaking and withstand ratings.', objectives: ['Calculate source impedance', 'Estimate fault current by network level', 'Check Icu, Ics and withstand'], resources: [{ title: 'Short circuit calculation — Tamil search', url: yt('short circuit calculation electrical Tamil'), kind: 'Video', language: 'Tamil' }, { title: 'Short-circuit current', url: 'https://www.electrical-installation.org/enwiki/Calculation_of_short-circuit_currents', kind: 'Guide', language: 'English' }] },
        { id: 'lv-08', title: 'Protection coordination & selectivity', minutes: 75, summary: 'Coordinate protective devices so faults clear safely with minimum disruption.', objectives: ['Read time-current curves', 'Distinguish selectivity and cascading', 'Document coordination limits'], resources: [{ title: 'Protection coordination — Tamil search', url: yt('electrical protection coordination Tamil'), kind: 'Video', language: 'Tamil' }, { title: 'Selectivity principles', url: 'https://www.electrical-installation.org/enwiki/Coordination_between_circuit-breakers', kind: 'Guide', language: 'English' }] }
      ]},
      { id: 'lv-m4', title: 'Safety, quality & documentation', description: 'Earthing, power quality, drawings and verification.', lessons: [
        { id: 'lv-09', title: 'Earthing, bonding & shock protection', minutes: 60, summary: 'Choose an earthing arrangement and verify automatic disconnection and touch-voltage protection.', objectives: ['Compare TN, TT and IT systems', 'Size protective conductors', 'Verify disconnection conditions'], resources: [{ title: 'Earthing system — Tamil search', url: yt('earthing system TN TT IT Tamil'), kind: 'Video', language: 'Tamil' }, { title: 'Earthing schemes', url: 'https://www.electrical-installation.org/enwiki/Connection_to_the_LV_utility_distribution_network', kind: 'Guide', language: 'English' }] },
        { id: 'lv-10', title: 'Power factor, harmonics & capacitor banks', minutes: 55, summary: 'Improve network efficiency without creating resonance or overcorrection risks.', objectives: ['Size power-factor correction', 'Interpret THD', 'Choose detuned equipment'], resources: [{ title: 'Power factor correction — Tamil search', url: yt('power factor correction capacitor bank Tamil'), kind: 'Video', language: 'Tamil' }, { title: 'Power factor improvement', url: 'https://www.electrical-installation.org/enwiki/Power_factor_improvement', kind: 'Guide', language: 'English' }] },
        { id: 'lv-11', title: 'SLD, schedules & design review', minutes: 50, summary: 'Turn calculations into consistent issue-ready drawings, schedules and review evidence.', objectives: ['Build an information-complete SLD', 'Cross-check calculation outputs', 'Run a structured design review'], resources: [{ title: 'Single line diagram — Tamil search', url: yt('single line diagram electrical Tamil'), kind: 'Video', language: 'Tamil' }, { title: 'QElectroTech open-source drafting', url: 'https://qelectrotech.org/', kind: 'Tool', language: 'English' }] },
        { id: 'lv-12', title: 'Capstone: commercial building design', minutes: 120, summary: 'Complete a concept-to-IFC design pack for a small commercial building.', objectives: ['Produce a design basis', 'Complete key calculations', 'Issue an SLD and schedules'], resources: [{ title: 'Electrical design project — Tamil search', url: yt('commercial building electrical design project Tamil'), kind: 'Practice', language: 'Tamil' }, { title: 'OpenElectrical calculation references', url: 'https://openelectrical.org/index.php?title=Main_Page', kind: 'Guide', language: 'English' }] }
      ]}
    ]
  },
  {
    id: 'ai-app-builder', title: 'AI App Builder: Idea to Production', category: 'AI', level: 'Intermediate', accent: '#397a72', icon: '✺', featured: true,
    description: 'Build useful AI applications with prompts, structured outputs, tools, agents, safety checks and production evaluation.',
    modules: [
      { id: 'ai-m1', title: 'Foundations & first app', description: 'Turn a problem into a small, testable AI product.', lessons: [
        { id: 'ai-01', title: 'How an AI application works', minutes: 35, summary: 'Map the user experience, model request, server boundary, data flow and feedback loop before writing code.', objectives: ['Define one narrow user outcome', 'Separate browser, server and model responsibilities', 'Sketch a safe request flow'], resources: [{ title: 'AI app development — Tamil search', url: yt('AI app development tutorial Tamil API'), kind: 'Video', language: 'Tamil' }, { title: 'OpenAI API overview', url: 'https://developers.openai.com/api/reference/overview', kind: 'Guide', language: 'English' }] },
        { id: 'ai-02', title: 'Your first Responses API feature', minutes: 50, summary: 'Build a server-side text feature, send a request and render the result in a simple interface.', objectives: ['Make a first API request', 'Keep the API key on the server', 'Handle loading and error states'], resources: [{ title: 'OpenAI API tutorial — Tamil search', url: yt('OpenAI API tutorial Tamil JavaScript'), kind: 'Video', language: 'Tamil' }, { title: 'Official developer quickstart', url: 'https://developers.openai.com/api/docs/quickstart', kind: 'Guide', language: 'English' }] },
        { id: 'ai-03', title: 'Prompt design for a real feature', minutes: 45, summary: 'Write clear instructions, examples and output requirements, then test difficult inputs.', objectives: ['Separate role and task instructions', 'Add useful examples', 'Create a small prompt test set'], resources: [{ title: 'Prompt engineering — Tamil search', url: yt('prompt engineering Tamil tutorial'), kind: 'Video', language: 'Tamil' }, { title: 'Official prompt engineering guide', url: 'https://developers.openai.com/api/docs/guides/prompt-engineering', kind: 'Guide', language: 'English' }] }
      ]},
      { id: 'ai-m2', title: 'Reliable application patterns', description: 'Move beyond free-form chat into dependable product behaviour.', lessons: [
        { id: 'ai-04', title: 'Structured outputs for dependable UI', minutes: 55, summary: 'Return schema-constrained data that your interface can validate and render safely.', objectives: ['Design a JSON schema', 'Handle refusal and incomplete output', 'Keep application types aligned with schemas'], resources: [{ title: 'Structured output — Tamil search', url: yt('OpenAI structured outputs JSON schema Tamil'), kind: 'Video', language: 'Tamil' }, { title: 'Official Structured Outputs guide', url: 'https://developers.openai.com/api/docs/guides/structured-outputs', kind: 'Guide', language: 'English' }] },
        { id: 'ai-05', title: 'Tools and function calling', minutes: 60, summary: 'Let the model request typed functions while your application stays in control of execution.', objectives: ['Define strict tool schemas', 'Validate tool arguments', 'Return tool results to the model'], resources: [{ title: 'Function calling — Tamil search', url: yt('OpenAI function calling tools Tamil'), kind: 'Video', language: 'Tamil' }, { title: 'Official function calling guide', url: 'https://developers.openai.com/api/docs/guides/function-calling', kind: 'Guide', language: 'English' }] },
        { id: 'ai-06', title: 'Knowledge with file search', minutes: 55, summary: 'Ground answers in your own documents and show the source material behind the response.', objectives: ['Prepare useful source documents', 'Retrieve relevant passages', 'Design visible citations and fallbacks'], resources: [{ title: 'RAG and file search — Tamil search', url: yt('RAG file search AI app Tamil'), kind: 'Video', language: 'Tamil' }, { title: 'Official file search guide', url: 'https://developers.openai.com/api/docs/guides/tools-file-search', kind: 'Guide', language: 'English' }] }
      ]},
      { id: 'ai-m3', title: 'Agents & production quality', description: 'Add controlled autonomy, evaluate behaviour and deploy safely.', lessons: [
        { id: 'ai-07', title: 'Build a focused agent', minutes: 65, summary: 'Create one specialist agent with clear instructions, selected tools and traceable results.', objectives: ['Define a narrow agent contract', 'Run an agent with tools', 'Inspect traces before adding complexity'], resources: [{ title: 'AI agents — Tamil search', url: yt('AI agents tutorial Tamil OpenAI'), kind: 'Video', language: 'Tamil' }, { title: 'Official Agents SDK guide', url: 'https://developers.openai.com/api/docs/guides/agents/sdk', kind: 'Guide', language: 'English' }] },
        { id: 'ai-08', title: 'Guardrails, approvals & prompt injection', minutes: 60, summary: 'Treat external content as untrusted and require human approval before consequential actions.', objectives: ['Recognize prompt-injection paths', 'Constrain data passed between steps', 'Add approval gates for risky actions'], resources: [{ title: 'AI safety — Tamil search', url: yt('AI application safety prompt injection Tamil'), kind: 'Video', language: 'Tamil' }, { title: 'Official agent safety guide', url: 'https://developers.openai.com/api/docs/guides/agent-builder-safety', kind: 'Guide', language: 'English' }, { title: 'OpenAI safety best practices', url: 'https://developers.openai.com/api/docs/guides/safety-best-practices', kind: 'Guide', language: 'English' }] },
        { id: 'ai-09', title: 'Evaluation before deployment', minutes: 55, summary: 'Create representative test cases, graders and regression checks for the behaviour users depend on.', objectives: ['Define measurable success criteria', 'Build a small evaluation dataset', 'Compare changes before release'], resources: [{ title: 'LLM evaluation — Tamil search', url: yt('LLM evaluation AI app Tamil'), kind: 'Video', language: 'Tamil' }, { title: 'Official agent evaluation guide', url: 'https://developers.openai.com/api/docs/guides/agent-evals', kind: 'Guide', language: 'English' }] },
        { id: 'ai-10', title: 'Capstone: learning copilot', minutes: 150, summary: 'Ship a small learning assistant that creates a study plan, uses trusted resources and records user feedback.', objectives: ['Build the end-to-end workflow', 'Keep secrets server-side', 'Test safety and quality before sharing'], resources: [{ title: 'AI full-stack project — Tamil search', url: yt('AI full stack app project Tamil'), kind: 'Practice', language: 'Tamil' }, { title: 'OpenAI agents learning hub', url: 'https://developers.openai.com/learn/agents', kind: 'Guide', language: 'English' }, { title: 'Cloudflare Workers documentation', url: 'https://developers.cloudflare.com/workers/', kind: 'Guide', language: 'English' }] }
      ]}
    ]
  },
  {
    id: 'python-foundations', title: 'Python: Foundations to Useful Scripts', category: 'Programming', level: 'Beginner', accent: '#4f8f72', icon: '⌘', featured: true,
    description: 'Learn core Python through small, practical programs—including engineering calculations.',
    modules: [
      { id: 'py-m1', title: 'Core language', description: 'Values, decisions and reusable logic.', lessons: [
        { id: 'py-01', title: 'Variables, types & a first calculator', minutes: 35, summary: 'Write a small demand-load calculator while learning Python values and expressions.', objectives: ['Use numeric and string types', 'Read user input safely', 'Format engineering output'], resources: [{ title: 'Python Tamil tutorial search', url: yt('Python tutorial Tamil variables'), kind: 'Video', language: 'Tamil' }, { title: 'Official Python tutorial', url: 'https://docs.python.org/3/tutorial/', kind: 'Guide', language: 'English' }] },
        { id: 'py-02', title: 'Conditions & loops', minutes: 40, summary: 'Automate repetitive checks with clear branching and iteration.', objectives: ['Write if/elif logic', 'Use for and while loops', 'Validate ranges'], resources: [{ title: 'Python loops — Tamil search', url: yt('Python loops Tamil'), kind: 'Video', language: 'Tamil' }, { title: 'Control flow', url: 'https://docs.python.org/3/tutorial/controlflow.html', kind: 'Guide', language: 'English' }] },
        { id: 'py-03', title: 'Functions & testing your thinking', minutes: 45, summary: 'Turn calculations into small functions with predictable inputs and outputs.', objectives: ['Define functions', 'Use type hints', 'Test edge cases'], resources: [{ title: 'Python functions — Tamil search', url: yt('Python functions Tamil'), kind: 'Video', language: 'Tamil' }, { title: 'Python functions', url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions', kind: 'Guide', language: 'English' }] }
      ]},
      { id: 'py-m2', title: 'Practical automation', description: 'Files, data and a useful capstone.', lessons: [
        { id: 'py-04', title: 'Lists, dictionaries & structured data', minutes: 45, summary: 'Model panels, circuits and course records with Python collections.', objectives: ['Choose lists vs dictionaries', 'Transform collections', 'Handle missing values'], resources: [{ title: 'Python data structures — Tamil search', url: yt('Python list dictionary Tamil'), kind: 'Video', language: 'Tamil' }, { title: 'Data structures', url: 'https://docs.python.org/3/tutorial/datastructures.html', kind: 'Guide', language: 'English' }] },
        { id: 'py-05', title: 'CSV files & error handling', minutes: 50, summary: 'Read a load schedule, validate rows and create a clean summary.', objectives: ['Read and write CSV', 'Use exceptions carefully', 'Report validation errors'], resources: [{ title: 'Python CSV — Tamil search', url: yt('Python CSV file Tamil'), kind: 'Video', language: 'Tamil' }, { title: 'CSV module', url: 'https://docs.python.org/3/library/csv.html', kind: 'Guide', language: 'English' }] },
        { id: 'py-06', title: 'Capstone: cable schedule checker', minutes: 90, summary: 'Build a script that flags overloaded rows and exports an exceptions report.', objectives: ['Combine functions and files', 'Create validation rules', 'Produce a useful report'], resources: [{ title: 'Python automation projects — Tamil search', url: yt('Python automation project Tamil'), kind: 'Video', language: 'Tamil' }, { title: 'Automate the Boring Stuff', url: 'https://automatetheboringstuff.com/', kind: 'Guide', language: 'English' }] }
      ]}
    ]
  },
  {
    id: 'electron-typescript-14-day', title: 'Electron + TypeScript in 14 Days', category: 'Programming', level: 'Beginner', accent: '#5b8def', icon: '◈', featured: true,
    description: 'Build, debug, secure and package a desktop app in 14 practical days, with Tamil-first videos and hands-on terminal exercises.',
    modules: [
      { id: 'et-m1', title: 'Days 1–2 · Terminal & project navigation', description: 'Build confidence moving around a project and understanding what commands change.', lessons: [
        { id: 'et-01', title: 'Day 1: Terminal foundations', minutes: 50, summary: 'Navigate safely, inspect files and learn where a command will run before changing anything.', objectives: ['Practise pwd, ls, cd and clear', 'Create a sandbox with mkdir and touch', 'Inspect text with cat, head and tail'], resources: [
          { title: 'Terminal commands for beginners — Tamil', url: yt('terminal commands beginners Tamil pwd ls cd mkdir'), kind: 'Video', language: 'Tamil' },
          { title: 'Practice: map your app folder in Terminal', url: yt('Mac terminal file navigation practice'), kind: 'Practice', language: 'English' },
          { title: 'Command-line interface basics', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line', kind: 'Guide', language: 'English' }
        ] },
        { id: 'et-02', title: 'Day 2: Files, search & safe command habits', minutes: 55, summary: 'Find code quickly, read command help and avoid destructive file operations.', objectives: ['Practise cp, mv, rm and mkdir -p in a sandbox', 'Search files with find and text with grep', 'Use command --help, history and Ctrl+C'], resources: [
          { title: 'Linux and Mac commands — Tamil', url: yt('Linux commands Tamil grep find cp mv rm'), kind: 'Video', language: 'Tamil' },
          { title: 'Practice: terminal scavenger hunt', url: yt('command line scavenger hunt beginners'), kind: 'Practice', language: 'English' },
          { title: 'GNU grep manual', url: 'https://www.gnu.org/software/grep/manual/grep.html', kind: 'Guide', language: 'English' }
        ] }
      ]},
      { id: 'et-m2', title: 'Days 3–4 · Git, GitHub & npm', description: 'Protect your work with version control and understand the Node package workflow.', lessons: [
        { id: 'et-03', title: 'Day 3: Git without fear', minutes: 65, summary: 'Create small, reviewable commits and recover context when something changes.', objectives: ['Practise git status, diff and log --oneline', 'Stage intentionally with git add', 'Create a clear commit with git commit'], resources: [
          { title: 'Git & GitHub complete tutorial — Tamil', url: 'https://www.youtube.com/watch?v=WzO6VynQ7UM', kind: 'Video', language: 'Tamil' },
          { title: 'Practice: branch, edit, diff and commit', url: yt('Git branching exercise beginners'), kind: 'Practice', language: 'English' },
          { title: 'Pro Git book', url: 'https://git-scm.com/book/en/v2', kind: 'Guide', language: 'English' }
        ], quiz: [{ id: 'et-q03', prompt: 'Which command shows unstaged changes before you commit?', options: ['git diff', 'git clone', 'git push', 'git init'], answer: 0, explanation: 'git diff lets you inspect working-tree changes before staging or committing them.' }] },
        { id: 'et-04', title: 'Day 4: Node.js, npm & project scripts', minutes: 60, summary: 'Understand dependencies, lockfiles and the scripts that run, test and build an application.', objectives: ['Check node --version and npm --version', 'Use npm install and npm run safely', 'Read package.json and explain package-lock.json'], resources: [
          { title: 'Node.js and npm tutorial — Tamil', url: yt('Node.js npm tutorial Tamil package json'), kind: 'Video', language: 'Tamil' },
          { title: 'Practice: inspect npm scripts and dependency tree', url: yt('npm scripts tutorial practice'), kind: 'Practice', language: 'English' },
          { title: 'npm CLI documentation', url: 'https://docs.npmjs.com/cli/', kind: 'Guide', language: 'English' }
        ] }
      ]},
      { id: 'et-m3', title: 'Days 5–6 · TypeScript essentials', description: 'Read and change typed application code with confidence.', lessons: [
        { id: 'et-05', title: 'Day 5: Types, functions & interfaces', minutes: 105, summary: 'Use TypeScript to make application inputs, outputs and shared data structures explicit.', objectives: ['Annotate values and function returns', 'Model objects with interfaces and type aliases', 'Run npx tsc --noEmit to check code'], resources: [
          { title: 'Learn TypeScript in 97.3 minutes — Tamil', url: 'https://www.youtube.com/watch?v=70KEMxrG8e4', kind: 'Video', language: 'Tamil' },
          { title: 'Practice: type a settings object', url: yt('TypeScript interface exercise beginners'), kind: 'Practice', language: 'English' },
          { title: 'TypeScript handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', kind: 'Guide', language: 'English' }
        ] },
        { id: 'et-06', title: 'Day 6: Narrowing, async code & modules', minutes: 70, summary: 'Follow real application control flow across imports, promises and error paths.', objectives: ['Narrow unions before using values', 'Use async/await with try/catch', 'Trace imports and exports across modules'], resources: [
          { title: 'TypeScript async await — Tamil', url: yt('TypeScript async await modules Tamil'), kind: 'Video', language: 'Tamil' },
          { title: 'Practice: type an async file-loading result', url: yt('TypeScript async await exercise'), kind: 'Practice', language: 'English' },
          { title: 'TypeScript narrowing', url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html', kind: 'Guide', language: 'English' }
        ] }
      ]},
      { id: 'et-m4', title: 'Days 7–8 · Electron architecture', description: 'Understand the desktop runtime and build a secure bridge between processes.', lessons: [
        { id: 'et-07', title: 'Day 7: Main, renderer & preload', minutes: 70, summary: 'Map Electron’s process model and identify where windows, UI and privileged APIs belong.', objectives: ['Explain the main and renderer processes', 'Create and inspect a BrowserWindow', 'Use DevTools and terminal logs together'], resources: [
          { title: 'Electron JS explained in 10 minutes — Tamil', url: 'https://www.youtube.com/watch?v=RhuTgUd6n1A', kind: 'Video', language: 'Tamil' },
          { title: 'Practice: label your app process boundaries', url: yt('Electron main renderer preload exercise'), kind: 'Practice', language: 'English' },
          { title: 'Electron process model', url: 'https://www.electronjs.org/docs/latest/tutorial/process-model', kind: 'Guide', language: 'English' }
        ], quiz: [{ id: 'et-q07', prompt: 'Where should BrowserWindow instances normally be created?', options: ['Renderer process', 'Main process', 'CSS file', 'package-lock.json'], answer: 1, explanation: 'BrowserWindow is a privileged Electron API managed in the main process.' }] },
        { id: 'et-08', title: 'Day 8: IPC & contextBridge', minutes: 80, summary: 'Expose narrow typed capabilities to the UI without giving it unrestricted Node.js access.', objectives: ['Implement ipcMain.handle and ipcRenderer.invoke', 'Expose a minimal preload API with contextBridge', 'Validate messages at the trust boundary'], resources: [
          { title: 'Electron IPC contextBridge — Tamil', url: yt('Electron IPC contextBridge Tamil'), kind: 'Video', language: 'Tamil' },
          { title: 'Practice: add a typed app-version bridge', url: yt('Electron IPC tutorial exercise'), kind: 'Practice', language: 'English' },
          { title: 'Electron IPC tutorial', url: 'https://www.electronjs.org/docs/latest/tutorial/ipc', kind: 'Guide', language: 'English' }
        ] }
      ]},
      { id: 'et-m5', title: 'Days 9–10 · Debugging, tests & security', description: 'Diagnose failures systematically and protect the Electron attack surface.', lessons: [
        { id: 'et-09', title: 'Day 9: Debugging & automated tests', minutes: 75, summary: 'Turn a vague failure into a reproducible case, inspect both processes and prevent regressions.', objectives: ['Use breakpoints, stack traces and source maps', 'Run npm test and target one test file', 'Write a focused regression test'], resources: [
          { title: 'JavaScript debugging and testing — Tamil', url: yt('JavaScript debugging unit testing Tamil'), kind: 'Video', language: 'Tamil' },
          { title: 'Practice: reproduce, isolate, test, fix', url: yt('debugging workflow coding exercise'), kind: 'Practice', language: 'English' },
          { title: 'Electron debugging', url: 'https://www.electronjs.org/docs/latest/tutorial/debugging-main-process', kind: 'Guide', language: 'English' }
        ] },
        { id: 'et-10', title: 'Day 10: Electron security checklist', minutes: 70, summary: 'Apply secure defaults for remote content, navigation, permissions and inter-process APIs.', objectives: ['Keep contextIsolation enabled and nodeIntegration disabled', 'Restrict navigation and new windows', 'Review dependencies with npm audit'], resources: [
          { title: 'Electron security best practices — Tamil', url: yt('Electron security contextIsolation nodeIntegration Tamil'), kind: 'Video', language: 'Tamil' },
          { title: 'Practice: audit an Electron BrowserWindow config', url: yt('Electron security checklist tutorial'), kind: 'Practice', language: 'English' },
          { title: 'Electron security checklist', url: 'https://www.electronjs.org/docs/latest/tutorial/security', kind: 'Guide', language: 'English' }
        ] }
      ]},
      { id: 'et-m6', title: 'Days 11–12 · Build, package & automate', description: 'Create distributable applications and repeatable checks.', lessons: [
        { id: 'et-11', title: 'Day 11: Build & package installers', minutes: 85, summary: 'Separate development from production builds and create a distributable package for testing.', objectives: ['Run npm run build and inspect output', 'Package with Electron Forge', 'Understand signing and platform-specific builds'], resources: [
          { title: 'Electron build and package — Tamil', url: yt('Electron app build package installer Tamil'), kind: 'Video', language: 'Tamil' },
          { title: 'Practice: create a local distributable', url: yt('Electron Forge package make tutorial'), kind: 'Practice', language: 'English' },
          { title: 'Electron packaging tutorial', url: 'https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging', kind: 'Guide', language: 'English' }
        ] },
        { id: 'et-12', title: 'Day 12: GitHub Actions CI', minutes: 75, summary: 'Run install, type-check, test and build automatically on every proposed change.', objectives: ['Create a pull-request workflow', 'Use npm ci for repeatable installs', 'Read logs and download build artifacts'], resources: [
          { title: 'GitHub Actions tutorial — Tamil', url: yt('GitHub Actions CI CD Tamil tutorial Node.js'), kind: 'Video', language: 'Tamil' },
          { title: 'Practice: add a Node CI workflow', url: yt('GitHub Actions Node CI hands on'), kind: 'Practice', language: 'English' },
          { title: 'GitHub Actions for Node.js', url: 'https://docs.github.com/en/actions/use-cases-and-examples/building-and-testing/building-and-testing-nodejs', kind: 'Guide', language: 'English' }
        ] }
      ]},
      { id: 'et-m7', title: 'Days 13–14 · Release workflow & capstone', description: 'Bring the habits together in a shippable feature and a documented release.', lessons: [
        { id: 'et-13', title: 'Day 13: Releases, updates & troubleshooting', minutes: 70, summary: 'Prepare a release deliberately and use logs, versions and clean installs to diagnose user reports.', objectives: ['Choose semantic version numbers', 'Write a useful changelog entry', 'Practise npm ci, npm run build and a clean launch'], resources: [
          { title: 'Semantic versioning and releases — Tamil', url: yt('semantic versioning software release Tamil'), kind: 'Video', language: 'Tamil' },
          { title: 'Practice: diagnose a failed production build', url: yt('npm build troubleshooting exercise'), kind: 'Practice', language: 'English' },
          { title: 'Electron application updates', url: 'https://www.electronjs.org/docs/latest/tutorial/updates', kind: 'Guide', language: 'English' }
        ] },
        { id: 'et-14', title: 'Day 14: Capstone — ship one LV Design Suite feature', minutes: 150, summary: 'Plan, implement, test and package one small desktop feature using the full 14-day workflow.', objectives: ['Create a feature branch and acceptance checklist', 'Build a typed IPC feature with safe validation', 'Test, package and document the release'], resources: [
          { title: 'Electron TypeScript project — Tamil', url: yt('Electron TypeScript full project Tamil'), kind: 'Video', language: 'Tamil' },
          { title: 'Practice: feature branch to packaged app', url: yt('Electron TypeScript capstone project'), kind: 'Practice', language: 'English' },
          { title: 'Electron first-app tutorial', url: 'https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app', kind: 'Guide', language: 'English' }
        ], quiz: [{ id: 'et-q14', prompt: 'What is the strongest evidence that a change is ready to release?', options: ['It works once on the developer machine', 'The code is short', 'Acceptance checks, tests and a packaged build pass', 'The branch has many commits'], answer: 2, explanation: 'Release confidence comes from explicit acceptance criteria, automated checks and testing the distributable artifact.' }] }
      ]}
    ]
  },
  { id: 'technical-writing', title: 'Technical Writing Essentials', category: 'Personal', level: 'Intermediate', accent: '#7868b5', icon: '✦', description: 'Write clear engineering notes, reports and decision records.', modules: [{ id: 'tw-m1', title: 'Clarity at work', description: 'Make technical communication easier to act on.', lessons: [{ id: 'tw-01', title: 'Write for decisions', minutes: 30, summary: 'Structure a technical note around context, evidence and a clear recommendation.', objectives: ['Identify the reader decision', 'Separate facts from assumptions', 'End with ownership'], resources: [{ title: 'Google technical writing course', url: 'https://developers.google.com/tech-writing', kind: 'Guide', language: 'English' }] }, { id: 'tw-02', title: 'Diagrams and calculation narratives', minutes: 35, summary: 'Explain calculation inputs and results without burying the conclusion.', objectives: ['Build a calculation narrative', 'Label diagrams purposefully', 'State limits'], resources: [{ title: 'Technical writing resources', url: 'https://developers.google.com/tech-writing/resources', kind: 'Guide', language: 'English' }] }] }] },
  { id: 'math-refresh', title: 'Applied Mathematics Refresh', category: 'Science', level: 'Intermediate', accent: '#c2912f', icon: '∑', description: 'Refresh algebra, trigonometry and units through engineering examples.', modules: [{ id: 'ma-m1', title: 'Engineering maths', description: 'Confident calculation habits.', lessons: [{ id: 'ma-01', title: 'Units, ratios & scientific notation', minutes: 35, summary: 'Use dimensional checks to catch calculation errors.', objectives: ['Convert SI prefixes', 'Check dimensional consistency', 'Estimate order of magnitude'], resources: [{ title: 'Khan Academy algebra', url: 'https://www.khanacademy.org/math/algebra', kind: 'Guide', language: 'English' }] }, { id: 'ma-02', title: 'Trigonometry for three-phase systems', minutes: 45, summary: 'Connect triangles, phase angles and power-factor calculations.', objectives: ['Use sine and cosine', 'Interpret phase angle', 'Apply the power triangle'], resources: [{ title: 'Trigonometry — Tamil search', url: yt('trigonometry basics Tamil'), kind: 'Video', language: 'Tamil' }] }] }] }
]

export const learningPaths: LearningPath[] = [
  { id: 'lv-ai-pareto-builder', title: 'LV Design AI — 80/20 Builder', description: 'A 21-day practical path to understand and control AI-generated TypeScript/Electron code and safely connect local AI to LV Design Suite.', courseIds: ['ai-assisted-programming-8020'], icon: '⚙' },
  { id: 'electron-desktop-developer', title: 'Electron Desktop Developer', description: 'Start with core programming habits, build and package a secure Electron app, then document technical decisions clearly.', courseIds: ['python-foundations', 'electron-typescript-14-day', 'technical-writing'], icon: '◈' },
  { id: 'electrical-designer', title: 'LV Design Professional', description: 'From applied maths through a complete low-voltage design capstone.', courseIds: ['math-refresh', 'lv-design', 'technical-writing'], icon: '⚡' },
  { id: 'engineering-automation', title: 'Engineering Automation', description: 'Pair practical Python with electrical engineering workflows.', courseIds: ['python-foundations', 'lv-design'], icon: '⌘' },
  { id: 'ai-product-builder', title: 'AI Product Builder', description: 'Learn Python foundations, build reliable AI features and communicate technical decisions clearly.', courseIds: ['python-foundations', 'ai-app-builder', 'technical-writing'], icon: '✺' }
]

export const allLessons = courses.flatMap(course => course.modules.flatMap(module => module.lessons.map(lesson => ({ ...lesson, courseId: course.id, courseTitle: course.title, moduleTitle: module.title }))))
