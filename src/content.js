// All site copy lives here so club members can edit text without touching layout.
// Items marked TODO need real values before launch.

export const site = {
  name: 'Boiler Autonomy',
  school: 'Purdue University',
  location: 'West Lafayette, Indiana',
  // TODO: replace with the club's shared inbox.
  email: 'CHANGE-ME@purdue.edu',
  // Purdue marks need approval from Purdue Brand Studio / Trademarks & Licensing.
  // After approval, put the file in public/media/ and set e.g. 'purdue-cobrand.svg'.
  universityLogo: '',
  // TODO: replace with an interest form (Google Form, BoilerLink, etc.) or leave '' to use email.
  joinFormUrl: '',
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
  { label: 'Roadmap', href: '#roadmap' },
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

// TODO: confirm each spec against the real car.
export const specs = [
  { value: '1/10', label: 'Scale race platform' },
  { value: 'LiDAR', label: '2D laser scanner for perception' },
  { value: 'Jetson', label: 'NVIDIA onboard compute' },
  { value: 'ROS 2', label: 'Software framework' },
]

// Hotspots are placed in percent of the top-down photo (x from left, y from top).
export const hotspots = [
  { x: 71, y: 47, title: '2D LiDAR', body: 'Scans the track many times per second to map walls and opponents.' },
  { x: 51, y: 46, title: 'Onboard compute', body: 'Runs perception, planning and control on the car itself.' },
  { x: 47, y: 25, title: 'LiPo power', body: 'Battery packs for the drive system and the electronics.' },
  { x: 32, y: 48, title: 'Power & motor electronics', body: 'Takes software commands and turns them into throttle and steering.' },
]

// TODO: update to match the algorithms the team actually runs.
export const stack = [
  { n: '01', title: 'Perceive', body: 'Turn raw LiDAR scans into a live model of walls, free space and other cars.' },
  { n: '02', title: 'Localize', body: 'Know where the car is on the map, every scan, using probabilistic state estimation.' },
  { n: '03', title: 'Plan', body: 'Compute a fast racing line and re-plan in real time around obstacles.' },
  { n: '04', title: 'Control', body: 'Track the plan at speed with steering and throttle control on the edge of grip.' },
]

export const roadmap = [
  { phase: '01', status: 'Done', title: 'Solo build', body: 'One car built and tuned. Autonomous laps on a test track.' },
  { phase: '02', status: 'Now', title: 'Club launch', body: 'Recruit members, set up sub-teams and a shared code base.' },
  { phase: '03', status: 'Next', title: 'Compete', body: 'Enter F1TENTH races with a team-built car and stack.' },
  { phase: '04', status: 'Future', title: 'Scale up', body: 'Multi-car racing, simulation-to-real research and larger platforms.' },
]

export const teams = [
  { title: 'Perception', body: 'LiDAR processing, mapping, opponent detection.' },
  { title: 'Planning & Controls', body: 'Racing lines, motion planning, MPC and pursuit control.' },
  { title: 'Hardware & Embedded', body: 'Chassis, wiring, power, sensors and compute.' },
  { title: 'Simulation & Infra', body: 'Simulators, CI, data logging and tooling.' },
  { title: 'Operations & Outreach', body: 'Sponsors, events, media and this website.' },
]
