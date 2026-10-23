// All site copy lives here so club members can edit text without touching layout.
// Items marked TODO need real values before launch.

export const site = {
  name: 'Boiler Autonomy',
  school: 'Purdue University',
  location: 'West Lafayette, Indiana',
  // Join / contact emails go to every address here.
  emails: ['jfasate@purdue.edu', 'bkolanu@purdue.edu'],
  // "Become a sponsor" emails go to the PI, with the students on CC.
  sponsorEmail: {
    to: ['lingxili@purdue.edu'],
    cc: ['jfasate@purdue.edu', 'bkolanu@purdue.edu'],
  },
  // Purdue marks need approval from Purdue Brand Studio / Trademarks & Licensing.
  // After approval, put the file in public/media/ and set e.g. 'purdue-cobrand.svg'.
  universityLogo: 'purdue-logo.png',
  // Web3Forms access key: get one free at https://web3forms.com by entering the email
  // that should receive applications. Until it is set, the form opens the visitor's email app.
  formAccessKey: '4721bfca-ccd8-4369-838d-693687670616',
  // TODO: add or remove links. Empty strings are hidden.
  social: {
    github: '',
    instagram: '',
    linkedin: '',
    youtube: '',
  },
}

export const nav = [
  { label: 'Mission', href: '#mission' },
  { label: 'Platform', href: '#platform' },
  { label: 'Autonomy', href: '#autonomy' },
  { label: 'Racing', href: '#racing' },
  { label: 'Progress', href: '#progress' },
  { label: 'Team', href: '#team' },
]

// Edit roles as the club grows; add new members to this list. email and linkedin are optional.
export const people = [
  {
    name: 'Prof. Lingxi Li',
    role: 'Principal Investigator',
    email: 'lingxili@purdue.edu',
    linkedin: 'https://www.linkedin.com/in/lingxi-li-08b4b0b/',
  },
  {
    name: 'Prof. Samuel Labi',
    role: 'Principal Investigator',
    email: 'labi@purdue.edu',
    linkedin: 'https://www.linkedin.com/in/sam-labi-794ab115/',
  },
  {
    name: 'Jayesh Fasate',
    role: 'Founding team',
    email: 'jfasate@purdue.edu',
    linkedin: 'https://www.linkedin.com/in/jayesh-fasate-ba31021a6/',
  },
  {
    name: 'Bala Kolanu',
    role: 'Founding team',
    email: 'bkolanu@purdue.edu',
    linkedin: 'https://www.linkedin.com/in/balamallareddykolanu/',
  },
]

export const hero = {
  eyebrow: 'Purdue University · F1TENTH',
  title: ['Autonomy', 'at the limit.'],
  body: 'Boiler Autonomy is a student team building 1/10-scale self-driving race cars. No driver, no remote. Just sensors, software and speed.',
}

export const mission = {
  label: 'Mission',
  statement:
    'We build autonomous systems that see, decide and act in milliseconds, at small scale, so we can learn at full speed.',
  story: [
    'Boiler Autonomy started as one person and one car: a 1/10-scale chassis, a LiDAR and an onboard computer, taught to drive itself around a track of orange tubes.',
    'Now we are opening it up. We are building a club where Purdue students design, code and race real autonomous vehicles together, and take that work to F1TENTH competitions.',
  ],
}

export const specs = [
  { value: '1/10', label: 'Scale race platform' },
  { value: '270°', label: 'Hokuyo UTM-30LX LiDAR, 30 m range' },
  { value: 'D435', label: 'Intel RealSense depth camera' },
  { value: 'Orin', label: 'NVIDIA Jetson Orin Nano onboard compute' },
]

// Hotspots are placed in percent of the top-down photo (x from left, y from top).
// Each one opens a detail card: a short tagline, up to four specs, and a longer description.
export const hotspots = [
  {
    x: 71,
    y: 47,
    title: 'Hokuyo UTM-30LX LiDAR',
    tagline: 'The eyes of the car.',
    specs: [
      ['Field of view', '270°'],
      ['Range', '0.1 – 30 m'],
      ['Scan rate', '40 Hz'],
      ['Resolution', '0.25°'],
    ],
    body: 'A 2D laser scanner mounted at the nose. Every 25 ms it returns 1,080 distance readings across a 270° arc. That is enough to see the track walls, find gaps and spot opponents, even at full speed.',
  },
  {
    x: 51,
    y: 46,
    title: 'NVIDIA Jetson Orin Nano',
    tagline: 'The brain, on board.',
    specs: [
      ['CPU', '6-core Arm Cortex-A78AE'],
      ['GPU', 'NVIDIA Ampere'],
      ['Runs', 'Full autonomy stack'],
    ],
    body: 'Every decision is made on the car itself, with no laptop in the loop. The Orin Nano fuses LiDAR scans and RealSense D435 depth, works out where the car is, plans a racing line and sends steering and throttle commands, many times per second.',
  },
  {
    x: 47,
    y: 25,
    title: 'LiPo power',
    tagline: 'Energy for speed and compute.',
    // TODO: confirm pack count and capacity.
    specs: [
      ['Chemistry', 'Lithium polymer'],
      ['Cells', '3S'],
      ['Capacity', '5000 mAh'],
    ],
    body: 'Lithium polymer packs ride low along the sides of the chassis. They keep the center of mass low and power both the drive motor and the onboard electronics.',
  },
  {
    x: 32,
    y: 48,
    title: 'Power & motor electronics',
    tagline: 'Where code becomes motion.',
    // TODO: add the motor controller model (e.g. VESC) and specs.
    specs: [
      ['Input', 'Speed & steering commands'],
      ['Output', 'Motor current & servo angle'],
    ],
    body: 'This board takes the speed and steering commands from the computer and turns them into motor current and servo angle. It closes the loop between software and the tires.',
  },
]

// TODO: update to match the algorithms the team actually runs.
export const stack = [
  { n: '01', title: 'Perceive', body: 'Fuse Hokuyo LiDAR scans and RealSense depth into a live model of walls, free space and other cars.' },
  { n: '02', title: 'Localize', body: 'Know where the car is on the map, every scan, using probabilistic state estimation.' },
  { n: '03', title: 'Plan', body: 'Compute a fast racing line and re-plan in real time around obstacles.' },
  { n: '04', title: 'Control', body: 'Track the plan at speed with steering and throttle control on the edge of grip.' },
]

export const progress = {
  title: 'Pushing to the limit.',
  lede: 'The hardware is built. Now we are pushing our perception and control stack to run the car at the edge of its speed limit.',
  items: [
    { status: 'Done', title: 'Hardware', body: 'Car built and running with a Hokuyo LiDAR, RealSense D435 and Jetson Orin Nano on board.' },
    { status: 'Now', title: 'Perception', body: 'Faster, more reliable sensing of walls, free space and opponents at speed.' },
    { status: 'Now', title: 'Control', body: 'Controllers that hold the racing line right at the limit of grip.' },
    { status: 'Goal', title: 'Edge of speed', body: 'Run the car at the edge of its speed limit, lap after lap.' },
  ],
}

export const joinForm = {
  intro: 'Tell us a bit about yourself. It takes about two minutes, and we will email you back.',
  years: ['Freshman', 'Sophomore', 'Junior', 'Senior', "Master's", 'PhD'],
}

export const teams = [
  { title: 'Perception', body: 'LiDAR processing, mapping, opponent detection.' },
  { title: 'Planning & Controls', body: 'Racing lines, motion planning, MPC and pursuit control.' },
  { title: 'Hardware & Embedded', body: 'Chassis, wiring, power, sensors and compute.' },
  { title: 'Simulation & Infra', body: 'Simulators, CI, data logging and tooling.' },
  { title: 'Operations & Outreach', body: 'Sponsors, events, media and this website.' },
]
