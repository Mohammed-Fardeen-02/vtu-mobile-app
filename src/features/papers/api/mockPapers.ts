import { QuestionPaper } from '../types/paper.types';

export const MOCK_PAPERS: QuestionPaper[] = [
  {
    id: 'pyq-cn-2024-reg',
    subjectName: 'Computer Networks',
    subjectCode: '21CS52',
    scheme: '2022',
    branch: 'CSE',
    semester: 5,
    paperType: 'Regular',
    year: '2024',
    month: 'Jan/Feb',
    fileSize: '2.4 MB',
    pageCount: 4,
    viewsCount: 2450,
    downloadsCount: 1820,
    thumbnailBg: '#EEF2FF',
    modules: [
      {
        moduleNumber: 1,
        title: 'Application Layer & HTTP/DNS Protocols',
        questions: [
          {
            questionNumber: 'Q1 (a)',
            questionText: 'Draw and explain the OSI Reference Model with neat diagrams and detail the functions of each layer.',
            marks: 10,
            bloomLevel: 'L2',
          },
          {
            questionNumber: 'Q1 (b)',
            questionText: 'Distinguish between HTTP persistent and non-persistent connections with suitable timing diagrams.',
            marks: 10,
            bloomLevel: 'L3',
          },
          {
            questionNumber: 'Q2 (a)',
            questionText: 'Explain the DNS hierarchical database structure and message formats in detail.',
            marks: 10,
            bloomLevel: 'L2',
          },
          {
            questionNumber: 'Q2 (b)',
            questionText: 'Write short notes on Socket Programming using TCP in Python/Java.',
            marks: 10,
            bloomLevel: 'L3',
          },
        ],
      },
      {
        moduleNumber: 2,
        title: 'Transport Layer & TCP/UDP',
        questions: [
          {
            questionNumber: 'Q3 (a)',
            questionText: 'Describe TCP 3-way handshake mechanism for connection establishment and termination.',
            marks: 10,
            bloomLevel: 'L2',
          },
          {
            questionNumber: 'Q3 (b)',
            questionText: 'Explain TCP Congestion Control algorithms including Slow Start and Congestion Avoidance.',
            marks: 10,
            bloomLevel: 'L3',
          },
          {
            questionNumber: 'Q4 (a)',
            questionText: 'Differentiate between Go-Back-N ARQ and Selective Repeat ARQ protocols.',
            marks: 10,
            bloomLevel: 'L2',
          },
        ],
      },
      {
        moduleNumber: 3,
        title: 'Network Layer & Routing Algorithms',
        questions: [
          {
            questionNumber: 'Q5 (a)',
            questionText: 'Apply Dijkstra’s Shortest Path Algorithm for the given 6-node network graph.',
            marks: 10,
            bloomLevel: 'L3',
          },
          {
            questionNumber: 'Q5 (b)',
            questionText: 'Explain IPv4 header format and detail the fields used for fragmentation.',
            marks: 10,
            bloomLevel: 'L2',
          },
        ],
      },
      {
        moduleNumber: 4,
        title: 'Data Link Layer & Wireless Networks',
        questions: [
          {
            questionNumber: 'Q7 (a)',
            questionText: 'Explain CSMA/CD mechanism used in Ethernet networks with flow chart.',
            marks: 10,
            bloomLevel: 'L2',
          },
          {
            questionNumber: 'Q7 (b)',
            questionText: 'Compute 16-bit CRC checksum for given data block D = 1101011011 using G = 10011.',
            marks: 10,
            bloomLevel: 'L3',
          },
        ],
      },
    ],
  },
  {
    id: 'pyq-dbms-2023-reg',
    subjectName: 'Database Management Systems',
    subjectCode: '21CS53',
    scheme: '2022',
    branch: 'CSE',
    semester: 5,
    paperType: 'Regular',
    year: '2023',
    month: 'Jul/Aug',
    fileSize: '3.1 MB',
    pageCount: 4,
    viewsCount: 3120,
    downloadsCount: 2410,
    thumbnailBg: '#F0FDF4',
    modules: [
      {
        moduleNumber: 1,
        title: 'ER Modeling & Relational Algebra',
        questions: [
          {
            questionNumber: 'Q1 (a)',
            questionText: 'Design an ER diagram for a Hospital Management System clearly stating entity sets, attributes, and relationships.',
            marks: 10,
            bloomLevel: 'L3',
          },
          {
            questionNumber: 'Q1 (b)',
            questionText: 'Explain fundamental operations in Relational Algebra with examples.',
            marks: 10,
            bloomLevel: 'L2',
          },
        ],
      },
      {
        moduleNumber: 2,
        title: 'SQL & Normalization',
        questions: [
          {
            questionNumber: 'Q3 (a)',
            questionText: 'Define 1NF, 2NF, 3NF, and BCNF with suitable relational schema examples.',
            marks: 12,
            bloomLevel: 'L3',
          },
          {
            questionNumber: 'Q3 (b)',
            questionText: 'Write SQL queries using JOIN, GROUP BY, HAVING and subqueries for Company DB schema.',
            marks: 8,
            bloomLevel: 'L3',
          },
        ],
      },
    ],
  },
  {
    id: 'pyq-atc-2023-model',
    subjectName: 'Automata Theory & Computability',
    subjectCode: '21CS51',
    scheme: '2022',
    branch: 'CSE',
    semester: 5,
    paperType: 'Model',
    year: '2024',
    month: 'Model QP',
    fileSize: '1.9 MB',
    pageCount: 3,
    viewsCount: 1890,
    downloadsCount: 1450,
    thumbnailBg: '#FAF5FF',
    modules: [
      {
        moduleNumber: 1,
        title: 'Finite Automata & Regular Languages',
        questions: [
          {
            questionNumber: 'Q1 (a)',
            questionText: 'Construct a DFA that accepts binary numbers divisible by 3.',
            marks: 10,
            bloomLevel: 'L3',
          },
          {
            questionNumber: 'Q1 (b)',
            questionText: 'Convert NFA with epsilon transitions to equivalent DFA.',
            marks: 10,
            bloomLevel: 'L3',
          },
        ],
      },
    ],
  },
  {
    id: 'pyq-se-2023-makeup',
    subjectName: 'Software Engineering & Project Mgmt',
    subjectCode: '21CS54',
    scheme: '2022',
    branch: 'CSE',
    semester: 5,
    paperType: 'Makeup',
    year: '2023',
    month: 'Sep/Oct',
    fileSize: '2.1 MB',
    pageCount: 4,
    viewsCount: 1200,
    downloadsCount: 890,
    thumbnailBg: '#FFF7ED',
    modules: [
      {
        moduleNumber: 1,
        title: 'Agile Software Development & SRS',
        questions: [
          {
            questionNumber: 'Q1 (a)',
            questionText: 'Explain Scrum framework ceremonies: Sprint Planning, Daily Standup, and Retrospective.',
            marks: 10,
            bloomLevel: 'L2',
          },
        ],
      },
    ],
  },
  {
    id: 'pyq-os-2022-reg',
    subjectName: 'Operating Systems',
    subjectCode: '18CS43',
    scheme: '2018',
    branch: 'CSE',
    semester: 4,
    paperType: 'Regular',
    year: '2022',
    month: 'Jan/Feb',
    fileSize: '2.8 MB',
    pageCount: 4,
    viewsCount: 4100,
    downloadsCount: 3300,
    thumbnailBg: '#F0F9FF',
    modules: [
      {
        moduleNumber: 1,
        title: 'CPU Scheduling & Process Synchronization',
        questions: [
          {
            questionNumber: 'Q1 (a)',
            questionText: 'Solve Banker’s Algorithm for Deadlock Avoidance with given allocation and max matrices.',
            marks: 10,
            bloomLevel: 'L3',
          },
        ],
      },
    ],
  },
  {
    id: 'pyq-math3-2023-reg',
    subjectName: 'Transform Calculus & Fourier Analysis',
    subjectCode: '21MAT31',
    scheme: '2022',
    branch: 'CSE',
    semester: 3,
    paperType: 'Regular',
    year: '2023',
    month: 'Jan/Feb',
    fileSize: '3.5 MB',
    pageCount: 5,
    viewsCount: 5200,
    downloadsCount: 4100,
    thumbnailBg: '#FEF2F2',
    modules: [
      {
        moduleNumber: 1,
        title: 'Laplace Transforms & Applications',
        questions: [
          {
            questionNumber: 'Q1 (a)',
            questionText: 'Find the Laplace transform of L{e^(-3t) sin(4t) t}.',
            marks: 10,
            bloomLevel: 'L3',
          },
        ],
      },
    ],
  },
  {
    id: 'pyq-dsp-2024-reg',
    subjectName: 'Digital Signal Processing',
    subjectCode: '21EC51',
    scheme: '2022',
    branch: 'ECE',
    semester: 5,
    paperType: 'Regular',
    year: '2024',
    month: 'Jan/Feb',
    fileSize: '2.9 MB',
    pageCount: 4,
    viewsCount: 1650,
    downloadsCount: 1100,
    thumbnailBg: '#EEF2FF',
    modules: [
      {
        moduleNumber: 1,
        title: 'Discrete Fourier Transform (DFT)',
        questions: [
          {
            questionNumber: 'Q1 (a)',
            questionText: 'Compute 4-point DFT of sequence x(n) = {1, 2, 3, 4} using Radix-2 DIT FFT algorithm.',
            marks: 10,
            bloomLevel: 'L3',
          },
        ],
      },
    ],
  },
  {
    id: 'pyq-me-2023-model',
    subjectName: 'Fluid Mechanics & Machinery',
    subjectCode: '21ME42',
    scheme: '2022',
    branch: 'ME',
    semester: 4,
    paperType: 'Model',
    year: '2023',
    month: 'Model QP',
    fileSize: '2.6 MB',
    pageCount: 4,
    viewsCount: 980,
    downloadsCount: 710,
    thumbnailBg: '#FFFBEB',
    modules: [
      {
        moduleNumber: 1,
        title: 'Bernoulli’s Equation & Venturimeter',
        questions: [
          {
            questionNumber: 'Q1 (a)',
            questionText: 'Derive Bernoulli’s equation from Euler’s equation of motion stating assumptions.',
            marks: 10,
            bloomLevel: 'L2',
          },
        ],
      },
    ],
  },
];

export const SCHEMES_LIST = ['All', '2022', '2021', '2018', '2017'];
export const BRANCHES_LIST = ['All', 'CSE', 'ISE', 'ECE', 'EEE', 'ME', 'CIV'];
export const SEMESTERS_LIST = ['All', '1', '2', '3', '4', '5', '6', '7', '8'];
export const YEARS_LIST = ['All', '2024', '2023', '2022', '2021', '2020'];
export const PAPER_TYPES_LIST: ('All' | 'Regular' | 'Makeup' | 'Model')[] = ['All', 'Regular', 'Makeup', 'Model'];
