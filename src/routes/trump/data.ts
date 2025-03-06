export interface Threat {
  id: number;
  title: string;
  description: string;
  riskScore: number;
  citations: string[];
}

export const trumpThreats: Threat[] = [
  {
    id: 1,
    title: 'Election Lies',
    description:
      'Trump spread false claims that the 2020 election was stolen, directly leading to the January 6th Capitol attack and undermining faith in our democratic process.',
    riskScore: 98,
    citations: ['Congressional Records (2022)', 'Court Filings (2021)', 'DOJ Reports (2022)']
  },
  {
    id: 15,
    title: 'Election Interference Attempts',
    description:
      'Pressured Georgia Secretary of State to "find 11,780 votes," attempted to use DOJ to overturn election results, and tried to manipulate state officials to submit false electors.',
    riskScore: 97,
    citations: ['GA Phone Call Recording', 'Jan 6 Committee Evidence', 'DOJ Documents']
  },
  {
    id: 20,
    title: 'Retaliatory Investigations',
    description:
      'Explicitly promised to use Justice Department to investigate political opponents if re-elected, undermining rule of law and transforming DOJ into personal vengeance tool.',
    riskScore: 96,
    citations: ['Campaign Rally Statements', 'Fox News Interviews', 'Legal Expert Analysis']
  },
  {
    id: 2,
    title: 'Violence Incitement',
    description:
      "Repeatedly encouraged supporters to use violence against political opponents, journalists, and protesters at his rallies with phrases like \"knock the crap out of them\" and \"I'll pay your legal fees.\"",
    riskScore: 95,
    citations: ['Rally Transcripts (2016-2021)', 'Criminal Charges (2023)', 'Media Documentation']
  },
  {
    id: 9,
    title: 'Pandemic Mismanagement',
    description:
      'Downplayed COVID-19 severity, promoted unproven treatments like hydroxychloroquine and injecting disinfectant, and undermined his own health experts, contributing to hundreds of thousands of preventable deaths.',
    riskScore: 94,
    citations: ['CDC Records', 'White House Briefing Transcripts', 'Public Health Studies']
  },
  {
    id: 6,
    title: 'White Supremacist Support',
    description:
      'Regularly amplified white nationalist content, refused to unequivocally condemn neo-Nazis after Charlottesville, and described white supremacist groups like the Proud Boys as "standing by" during presidential debates.',
    riskScore: 93,
    citations: ['Presidential Debate Transcripts', 'Social Media Analysis', 'ADL Reports']
  },
  {
    id: 3,
    title: 'Judicial Interference',
    description:
      'Attacked judges who ruled against him, pressured DOJ officials to interfere in investigations, and pardoned allies who committed crimes to protect him.',
    riskScore: 92,
    citations: ['DOJ Inspector General Report', 'Witness Testimony', 'Court Records']
  },
  {
    id: 18,
    title: 'Nuclear Proliferation',
    description:
      'Withdrew from Iran nuclear deal, threatened nuclear war with North Korea ("fire and fury"), and discussed using nuclear weapons against hurricanes, increasing global nuclear risks.',
    riskScore: 91,
    citations: ['National Security Briefings', 'UN Monitoring Reports', 'Foreign Policy Analysis']
  },
  {
    id: 5,
    title: 'Constitutional Violations',
    description:
      'Ignored separation of powers, claimed "absolute immunity" from prosecution, and openly stated he would use military against domestic opponents.',
    riskScore: 90,
    citations: ['Supreme Court Rulings', 'Legal Scholars Analysis', 'Public Statements']
  },
  {
    id: 7,
    title: 'Authoritarianism Endorsement',
    description:
      'Repeatedly praised dictators like Putin, Xi, and Kim Jong Un while criticizing democratic allies and NATO, demonstrating his preference for authoritarian governance over democracy.',
    riskScore: 89,
    citations: ['Foreign Policy Statements', 'UN Meeting Records', 'NATO Summit Records']
  },
  {
    id: 13,
    title: 'Immigration Cruelty',
    description:
      'Implemented family separation policy, built inhumane detention centers, and banned travelers from predominantly Muslim countries, violating basic human rights.',
    riskScore: 88,
    citations: ['DHS Inspector General Reports', 'ACLU Lawsuits', 'UN Human Rights Condemnations']
  },
  {
    id: 11,
    title: 'Financial Fraud',
    description:
      'Engaged in tax fraud, bank fraud, insurance fraud, and charity fraud as documented in numerous legal proceedings, including using a charity for personal gain.',
    riskScore: 87,
    citations: ['NY AG Investigation', 'Tax Court Documents', 'Trump Foundation Settlement']
  },
  {
    id: 12,
    title: 'Business Corruption',
    description:
      'Used the presidency to enrich himself by directing government spending to his properties, violating the emoluments clause, and accepting foreign payments.',
    riskScore: 86,
    citations: ['GSA Records', 'Congressional Oversight Documents', 'Emoluments Case Filings']
  },
  {
    id: 8,
    title: 'Environmental Destruction',
    description:
      'Withdrew from Paris Climate Agreement, rolled back over 100 environmental protections, and opened protected lands to drilling and mining, accelerating climate change.',
    riskScore: 85,
    citations: ['EPA Records', 'Federal Register', 'Executive Order Analysis']
  },
  {
    id: 4,
    title: 'Free Press Attacks',
    description:
      'Labeled journalists as "enemies of the people," attempted to revoke press credentials of critical reporters, and threatened media companies with legal action.',
    riskScore: 84,
    citations: ['Press Freedom Index', 'White House Briefing Records', 'Lawsuit Documents']
  },
  {
    id: 19,
    title: 'Scientific Suppression',
    description:
      'Censored climate scientists, removed scientific data from government websites, and cut research funding for critical public health and environmental studies.',
    riskScore: 83,
    citations: ['Scientific Agency Records', 'Whistleblower Testimonies', 'Budget Documents']
  },
  {
    id: 14,
    title: 'Sexual Misconduct',
    description:
      'Faced credible accusations from over 25 women of sexual assault and harassment, bragged about grabbing women, and paid hush money to cover up affairs.',
    riskScore: 82,
    citations: ['Court Filings', 'Access Hollywood Tape', 'Witness Testimonies']
  },
  {
    id: 10,
    title: 'Military Disrespect',
    description:
      'Called fallen soldiers "losers" and "suckers," attacked Gold Star families, and pardoned war criminals against military leadership recommendations.',
    riskScore: 81,
    citations: ['Military Official Testimonies', 'Atlantic Magazine Investigation', 'Pentagon Documents']
  },
  {
    id: 16,
    title: 'Healthcare Sabotage',
    description:
      'Attempted to repeal Affordable Care Act without replacement, cut critical health programs, and undermined protections for pre-existing conditions affecting millions of Americans.',
    riskScore: 80,
    citations: ['CBO Analysis', 'HHS Records', 'Congressional Healthcare Hearings']
  },
  {
    id: 17,
    title: 'Educational Harm',
    description:
      'Appointed Betsy DeVos who weakened civil rights protections for students, reversed sexual assault guidelines, and attempted to divert public education funds to private schools.',
    riskScore: 79,
    citations: ['Dept of Education Policy Documents', 'Title IX Changes', 'Budget Proposals']
  }
];