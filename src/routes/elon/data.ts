export interface Threat {
  id: number;
  title: string;
  description: string;
  riskScore: number;
  citations: string[];
}

export const elonThreats: Threat[] = [
  {
    id: 1,
    title: 'Misinformation Amplification',
    description:
      'Musk has removed content moderation on Twitter/X, allowing conspiracy theories and hate speech to spread unchecked across his platform of 250+ million users.',
    riskScore: 95,
    citations: ['Media Matters Report (2023)', 'EU Digital Services Act Violation (2023)', 'ADL Report (2023)']
  },
  {
    id: 6,
    title: 'Antisemitism Promotion',
    description:
      'Endorsed antisemitic conspiracy theories on his platform, claiming Jewish communities "promote hatred against whites," causing an advertiser exodus from Twitter/X.',
    riskScore: 94,
    citations: ['Platform Posts (2023)', 'ADL Condemnation', 'Media Coverage']
  },
  {
    id: 2,
    title: 'Election Interference',
    description:
      'Using his platform and wealth to promote extremist candidates and spread election misinformation, while allowing his algorithms to amplify divisive content.',
    riskScore: 93,
    citations: ['FEC Filings (2022-2023)', 'Platform Algorithm Analysis', 'Media Reports']
  },
  {
    id: 7,
    title: 'Artificial Intelligence Dangers',
    description:
      'Rushing untested AI systems to market through xAI and advocating for minimal AI regulation despite signing letters warning of extinction-level AI risks.',
    riskScore: 92,
    citations: ['xAI Product Launches', 'Regulatory Filing Objections', 'Expert Criticism']
  },
  {
    id: 16,
    title: 'Media Manipulation',
    description:
      'Using ownership of major social platform to suppress criticism, artificially boost personal content, and manipulate algorithmic reach of political voices.',
    riskScore: 91,
    citations: ['Platform Algorithm Analysis', 'Former Employee Testimonies', 'Independent Research']
  },
  {
    id: 5,
    title: 'Economic Power Abuse',
    description:
      'Using his $200+ billion fortune to acquire critical communication infrastructure and influence politics while paying minimal taxes relative to his wealth.',
    riskScore: 90,
    citations: ['Forbes Wealth Tracking', 'Tax Records Analysis', 'Acquisition History']
  },
  {
    id: 12,
    title: 'Racial Discrimination',
    description:
      'Tesla forced to pay $3.2 million in racial discrimination lawsuit where Black employees faced regular racial slurs and segregation at Fremont factory.',
    riskScore: 89,
    citations: ['California DFEH Lawsuit', 'Employee Testimonies', 'Court Rulings']
  },
  {
    id: 9,
    title: 'COVID-19 Misinformation',
    description:
      'Spread dangerous COVID falsehoods, illegally reopened Tesla factory during lockdown, and forced workers to risk exposure or lose their jobs.',
    riskScore: 88,
    citations: ['Alameda County Health Orders', 'Employee Lawsuits', 'Platform Posts']
  },
  {
    id: 19,
    title: 'Media Censorship',
    description:
      'Banned journalists who reported negatively on him from Twitter/X while claiming to be a "free speech absolutist," revealing hypocritical approach to platform rules.',
    riskScore: 87,
    citations: ['Journalist Account Suspensions', 'Platform Policy Inconsistencies', 'Press Freedom Reports']
  },
  {
    id: 3,
    title: 'Worker Exploitation',
    description:
      'History of union-busting, unsafe working conditions at Tesla factories, and mass layoffs that overburden remaining employees while destroying their work-life balance.',
    riskScore: 86,
    citations: ['NLRB Complaints', 'Worker Testimonies', 'OSHA Reports']
  },
  {
    id: 11,
    title: 'Privacy Violations',
    description:
      'Dismantled privacy protections at Twitter/X, exposed private user data through API changes, and implemented intrusive monitoring of employees via extensive surveillance.',
    riskScore: 85,
    citations: ['Platform Policy Changes', 'EU GDPR Violations', 'Employee Reports']
  },
  {
    id: 17,
    title: 'Consumer Fraud',
    description:
      'Repeatedly announced features like Full Self-Driving that took years to materialize (if ever), misleading consumers who paid thousands for non-existent functionality.',
    riskScore: 84,
    citations: ['Product Announcements vs Delivery', 'Customer Complaints', 'Regulatory Investigations']
  },
  {
    id: 10,
    title: 'Securities Fraud',
    description:
      'Settled with SEC for $40 million after "funding secured" Tesla privatization fraud but continued to violate agreement terms requiring legal review of tweets.',
    riskScore: 83,
    citations: ['SEC Settlements', 'Court Documents', 'Shareholder Lawsuits']
  },
  {
    id: 18,
    title: 'Global South Exploitation',
    description:
      'Extracting resources from developing nations while providing minimal benefits, including lithium mining that depletes water tables in drought-prone regions.',
    riskScore: 82,
    citations: ['Resource Extraction Studies', 'Local Community Impacts', 'Environmental Degradation Reports']
  },
  {
    id: 20,
    title: 'Regulatory Capture',
    description:
      'Using wealth and influence to weaken regulatory oversight of his companies through lobbying, political contributions, and revolving door hiring practices.',
    riskScore: 81,
    citations: ['Lobbying Expenditures', 'Regulatory Decision Analysis', 'Agency Staffing Records']
  },
  {
    id: 4,
    title: 'Market Manipulation',
    description:
      'Repeatedly used social media to manipulate stock and cryptocurrency prices for personal gain, harming ordinary investors while enriching himself.',
    riskScore: 80,
    citations: ['SEC Filings', 'Market Analysis Reports', 'Crypto Market Data']
  },
  {
    id: 14,
    title: 'Environmental Greenwashing',
    description:
      'Presents Tesla as environmentally friendly while mining operations for battery materials cause severe environmental damage and human rights abuses.',
    riskScore: 79,
    citations: ['Supply Chain Reports', 'Environmental Impact Studies', 'Human Rights Watch']
  },
  {
    id: 15,
    title: 'Defamation Campaigns',
    description:
      'Falsely accused innocent people of serious crimes, including calling a Thai cave rescuer a "pedo guy" and falsely labeling critics as pedophiles.',
    riskScore: 78,
    citations: ['Defamation Lawsuits', 'Platform Posts', 'Media Documentation']
  },
  {
    id: 13,
    title: 'Public Infrastructure Undermining',
    description:
      'Actively campaigns against public transit funding while promoting privatized transportation solutions that primarily benefit wealthy individuals.',
    riskScore: 77,
    citations: ['Public Statements', 'Campaign Contributions', 'Infrastructure Analysis']
  },
  {
    id: 8,
    title: 'Space Monopolization',
    description:
      'Launching thousands of Starlink satellites without adequate international consultation, creating space debris risks, and monopolizing low-Earth orbit.',
    riskScore: 76,
    citations: ['Astronomical Society Concerns', 'NASA Reports', 'International Space Regulations']
  }
];