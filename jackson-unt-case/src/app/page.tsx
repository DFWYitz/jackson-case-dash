"use client";
import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, ExternalLink, FileText, Video, Mail, Gavel, User, Folder, X } from 'lucide-react';

const JacksonUNTCase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [openFolder, setOpenFolder] = useState(null);

  // Complete evidence data from Rasmusen's archive
  const evidenceData = [
    // Timothy Jackson files
    { id: 'jackson-response', title: 'Timothy Jackson, Preliminary Response to Ewell', person: 'Timothy L. Jackson', category: 'faculty', type: 'document', description: 'Jackson&apos;s academic response in the Journal of Schenkerian Studies that triggered the controversy.', url: 'https://www.rasmusen.org/special/jackson/Timothy%20Jackson,%20Preliminary%20Response%20to%20Ewell,%20Journal%20of%20Schenkerian%20Studies%20Volume%2012%20.pdf', size: '2.2MB', date: '2020', keywords: 'academic freedom, musicology, scholarly response' },
    { id: 'jackson-affidavit', title: 'Jackson Affidavit of Verification', person: 'Timothy L. Jackson', category: 'state', type: 'legal', description: 'Jackson&apos;s sworn affidavit establishing personal knowledge of institutional failures.', url: 'https://www.rasmusen.org/special/jackson/2021-03-08%20Jackson%20Affidavit%20of%20Verification.pdf', size: '318KB', date: '2021-03-08', keywords: 'sworn statement, constitutional violations' },
    { id: 'jackson-depo-1', title: 'Timothy Jackson Deposition Part 1 of 9', person: 'Timothy L. Jackson', category: 'federal', type: 'video', description: 'First part of Jackson&apos;s comprehensive deposition testimony.', url: 'https://www.rasmusen.org/special/jackson/TJ092424_1of9.mpg', size: '699MB', date: '2024-09-24', keywords: 'deposition, testimony, plaintiff' },
    { id: 'jackson-depo-2', title: 'Timothy Jackson Deposition Part 2 of 9', person: 'Timothy L. Jackson', category: 'federal', type: 'video', description: 'Second part of Jackson&apos;s deposition.', url: 'https://www.rasmusen.org/special/jackson/TJ092424_2of9.mpg', size: '680MB', date: '2024-09-24', keywords: 'deposition, testimony' },
    { id: 'jackson-depo-3', title: 'Timothy Jackson Deposition Part 3 of 9', person: 'Timothy L. Jackson', category: 'federal', type: 'video', description: 'Third part of Jackson&apos;s deposition.', url: 'https://www.rasmusen.org/special/jackson/TJ092424_3of9.mpg', size: '449MB', date: '2024-09-24', keywords: 'deposition, testimony' },
    { id: 'jackson-depo-4', title: 'Timothy Jackson Deposition Part 4 of 9', person: 'Timothy L. Jackson', category: 'federal', type: 'video', description: 'Fourth part of Jackson&apos;s deposition.', url: 'https://www.rasmusen.org/special/jackson/TJ092424_4of9.mpg', size: '356MB', date: '2024-09-24', keywords: 'deposition, testimony' },
    { id: 'jackson-depo-5', title: 'Timothy Jackson Deposition Part 5 of 9', person: 'Timothy L. Jackson', category: 'federal', type: 'video', description: 'Fifth part of Jackson&apos;s deposition.', url: 'https://www.rasmusen.org/special/jackson/TJ092424_5of9.mpg', size: '614MB', date: '2024-09-24', keywords: 'deposition, testimony' },
    { id: 'jackson-depo-7', title: 'Timothy Jackson Deposition Part 7 of 9', person: 'Timothy L. Jackson', category: 'federal', type: 'video', description: 'Seventh part of Jackson&apos;s deposition.', url: 'https://www.rasmusen.org/special/jackson/TJ092424_7of9.mpg', size: '751MB', date: '2024-09-24', keywords: 'deposition, testimony' },
    { id: 'jackson-depo-8', title: 'Timothy Jackson Deposition Part 8 of 9', person: 'Timothy L. Jackson', category: 'federal', type: 'video', description: 'Eighth part of Jackson&apos;s deposition.', url: 'https://www.rasmusen.org/special/jackson/TJ092424_8of9%20(2).mpg', size: '311MB', date: '2024-09-24', keywords: 'deposition, testimony' },
    { id: 'jackson-depo-9', title: 'Timothy Jackson Deposition Part 9 of 9', person: 'Timothy L. Jackson', category: 'federal', type: 'video', description: 'Final part of Jackson&apos;s deposition.', url: 'https://www.rasmusen.org/special/jackson/TJ092424_9of9.mpg', size: '174MB', date: '2024-09-24', keywords: 'deposition, testimony' },

    // Philip Ewell files
    { id: 'ewell-depo-1', title: 'Philip Ewell Deposition Part 1', person: 'Philip Ewell', category: 'faculty', type: 'video', description: 'First part of Ewell&apos;s deposition testimony.', url: 'https://www.rasmusen.org/special/jackson/P.Ewell091924C%20(1).mp4', size: '301MB', date: '2024-09-19', keywords: 'deposition, racial theory, musicology' },
    { id: 'ewell-depo-2', title: 'Philip Ewell Deposition Part 2', person: 'Philip Ewell', category: 'faculty', type: 'video', description: 'Second part of Ewell&apos;s deposition.', url: 'https://www.rasmusen.org/special/jackson/P.Ewell091924D%20(2).mp4', size: '120MB', date: '2024-09-19', keywords: 'deposition, testimony' },
    { id: 'ewell-depo-3', title: 'Philip Ewell Deposition Part 3', person: 'Philip Ewell', category: 'faculty', type: 'video', description: 'Third part of Ewell&apos;s deposition.', url: 'https://www.rasmusen.org/special/jackson/P.Ewell091924E%20(1).mp4', size: '572MB', date: '2024-09-19', keywords: 'deposition, testimony' },
    { id: 'ewell-depo-4', title: 'Philip Ewell Deposition Part 4', person: 'Philip Ewell', category: 'faculty', type: 'video', description: 'Fourth part of Ewell&apos;s deposition.', url: 'https://www.rasmusen.org/special/jackson/P.Ewell091924F%20(2).mp4', size: '315MB', date: '2024-09-19', keywords: 'deposition, testimony' },

    // Folder entries for organized collections
    { id: 'ewell-production', title: 'Ewell Production Documents', person: 'Philip Ewell', category: 'faculty', type: 'folder', description: 'Complete collection of documents produced by Philip Ewell during discovery.', url: 'https://www.rasmusen.org/special/jackson/Ewell_production/', size: 'Multiple Files', isFolder: true, date: '2025', keywords: 'discovery, production, documents' },
    { id: 'ewell-exhibits', title: 'Ewell Marked Exhibits', person: 'Philip Ewell', category: 'faculty', type: 'folder', description: 'Marked exhibits related to Philip Ewell&apos;s involvement in the case.', url: 'https://www.rasmusen.org/special/jackson/Ewell_marked_exhibits/', size: 'Multiple Files', isFolder: true, date: '2025', keywords: 'exhibits, marked documents' },

    // Rachel Gain files
    { id: 'gain-depo', title: 'Rachel Gain Deposition Transcript', person: 'Rachel Gain', category: 'admin', type: 'document', description: 'Full deposition transcript of graduate student Rachel Gain.', url: 'https://www.rasmusen.org/special/jackson/Gain%205-19-21%20full-size%20and%20word%20index.pdf', size: '617KB', date: '2021-05-19', keywords: 'deposition, graduate student, defendant' },
    { id: 'gain-exhibits', title: 'Rachel Gain Exhibits 35-39', person: 'Rachel Gain', category: 'admin', type: 'document', description: 'Exhibits 35-39 from Rachel Gain&apos;s deposition.', url: 'https://www.rasmusen.org/special/jackson/Gain%20Exs%2035-39,%205-19-21.pdf', size: '4.7MB', date: '2021-05-19', keywords: 'exhibits, deposition materials' },
    { id: 'gain-folder', title: 'Rachel Gain Document Collection', person: 'Rachel Gain', category: 'admin', type: 'folder', description: 'Complete collection of documents related to Rachel Gain.', url: 'https://www.rasmusen.org/special/jackson/Rachel_Gain/', size: 'Multiple Files', isFolder: true, date: '2025', keywords: 'graduate student, defendant, documents' },

    // Rebecca Dowd Geoffroy-Schwinden
    { id: 'rebecca-folder', title: 'Rebecca Dowd Geoffroy-Schwinden Documents', person: 'Rebecca Dowd Geoffroy-Schwinden', category: 'admin', type: 'folder', description: 'Document collection for defendant Rebecca Dowd Geoffroy-Schwinden.', url: 'https://www.rasmusen.org/special/jackson/Rebecca_Schwinden/', size: 'Multiple Files', isFolder: true, date: '2025', keywords: 'defendant, faculty' },
    { id: 'rebecca-depo', title: 'Rebecca Dowd Geoffroy-Schwinden Deposition', person: 'Rebecca Dowd Geoffroy-Schwinden', category: 'admin', type: 'document', description: 'Deposition materials for Rebecca Dowd Geoffroy-Schwinden.', url: 'https://www.rasmusen.org/special/jackson/092724%20Rebecca%20Dowd%20Geoffroy-Schwinden%20deposition%20transcript%20-%20full-size%20and%20word%20index.pdf', size: '469MB', date: '2024-09-27', keywords: 'deposition, defendant' },

    // Benjamin Brand (UNT Administrator)
    { id: 'brand-depo', title: 'Benjamin Brand Deposition Transcript', person: 'Benjamin Brand', category: 'admin', type: 'document', description: 'Full deposition of UNT Department Chair Benjamin Brand.', url: 'https://www.rasmusen.org/special/jackson/2024-09-23%20Brand%20deposition%20transcript%20-%20full-size%20and%20word%20index.pdf', size: '1.1MB', date: '2024-09-23', keywords: 'department chair, administrator, deposition' },
    { id: 'brand-condensed', title: 'Benjamin Brand Deposition (Condensed)', person: 'Benjamin Brand', category: 'admin', type: 'document', description: 'Condensed version of Benjamin Brand&apos;s deposition.', url: 'https://www.rasmusen.org/special/jackson/2024-09-23%20deposition%20of%20Benjamin%20Brand%20condensed.pdf', size: '1.0MB', date: '2024-09-23', keywords: 'deposition, condensed, administrator' },

    // Levi Walls
    { id: 'walls-depo', title: 'Levi Walls Deposition Full Transcript', person: 'Levi Walls', category: 'admin', type: 'document', description: 'Complete deposition transcript of Levi Walls.', url: 'https://www.rasmusen.org/special/jackson/Walls%205-18-21%20full-size%20and%20word%20index.pdf', size: '1.2MB', date: '2021-05-18', keywords: 'deposition, witness, journal editor' },
    { id: 'walls-condensed', title: 'Levi Walls Deposition (Condensed)', person: 'Levi Walls', category: 'admin', type: 'document', description: 'Condensed version of Levi Walls deposition.', url: 'https://www.rasmusen.org/special/jackson/Walls%205-18-21%20condensed.pdf', size: '839KB', date: '2021-05-18', keywords: 'deposition, condensed' },
    { id: 'walls-revised', title: 'Revised Levi Walls Deposition', person: 'Levi Walls', category: 'admin', type: 'document', description: 'Revised version of Levi Walls deposition transcript.', url: 'https://www.rasmusen.org/special/jackson/Revised%20Levi%20Walls%20deposition%20transcript%205-18-21%20full-size%20and%20word%20index.pdf', size: '907KB', date: '2021-05-18', keywords: 'deposition, revised, transcript' },
    { id: 'walls-folder', title: 'Levi Walls Document Collection', person: 'Levi Walls', category: 'admin', type: 'folder', description: 'Complete collection of Levi Walls related documents.', url: 'https://www.rasmusen.org/special/jackson/Levi_Walls/', size: 'Multiple Files', isFolder: true, date: '2025', keywords: 'witness, journal, documents' },

    // Frank Heidlberger
    { id: 'heidlberger-depo', title: 'Frank Heidlberger Deposition', person: 'Frank Heidlberger', category: 'admin', type: 'document', description: 'Deposition transcript of Frank Heidlberger.', url: 'https://www.rasmusen.org/special/jackson/Heidlberger%205-19-21%20full-size%20and%20word%20index.pdf', size: '851KB', date: '2021-05-19', keywords: 'deposition, defendant, faculty' },
    { id: 'heidlberger-exhibits', title: 'Frank Heidlberger Exhibits 24-34', person: 'Frank Heidlberger', category: 'admin', type: 'document', description: 'Exhibits 24-34 from Frank Heidlberger&apos;s deposition.', url: 'https://www.rasmusen.org/special/jackson/Heidlberger%20Exs%2024-34,%205-19-21.pdf', size: '22MB', date: '2021-05-19', keywords: 'exhibits, deposition materials' },
    { id: 'heidlberger-folder', title: 'Frank Heidlberger Documents', person: 'Frank Heidlberger', category: 'admin', type: 'folder', description: 'Document collection for Frank Heidlberger.', url: 'https://www.rasmusen.org/special/jackson/Frank_Heidlberger/', size: 'Multiple Files', isFolder: true, date: '2025', keywords: 'defendant, faculty, documents' },

    // Other defendant folders
    { id: 'andrew-chung-folder', title: 'Andrew Chung Documents', person: 'Andrew Chung', category: 'admin', type: 'folder', description: 'Document collection for defendant Andrew Chung.', url: 'https://www.rasmusen.org/special/jackson/Andrew_Chung/', size: 'Multiple Files', isFolder: true, date: '2025', keywords: 'defendant, documents' },
    { id: 'benjamin-graf-folder', title: 'Benjamin Graf Documents', person: 'Benjamin Graf', category: 'admin', type: 'folder', description: 'Document collection for defendant Benjamin Graf.', url: 'https://www.rasmusen.org/special/jackson/benjamin_graf/', size: 'Multiple Files', isFolder: true, date: '2025', keywords: 'defendant, documents' },
    { id: 'bakulina-folder', title: 'Ellen Bakulina Documents', person: 'Ellen Bakulina', category: 'admin', type: 'folder', description: 'Document collection for defendant Ellen Bakulina.', url: 'https://www.rasmusen.org/special/jackson/bakulina/', size: 'Multiple Files', isFolder: true, date: '2025', keywords: 'defendant, documents' },

    // UNT Administrator folders
    { id: 'jennifer-cowley-folder', title: 'Jennifer Cowley Documents', person: 'Jennifer Cowley', category: 'upper', type: 'folder', description: 'Documents related to former UNT Provost Jennifer Cowley.', url: 'https://www.rasmusen.org/special/jackson/Jennifer_Cowley/', size: 'Multiple Files', isFolder: true, date: '2025', keywords: 'provost, administrator, documents' },
    { id: 'john-ishiyama-folder', title: 'John Ishiyama Documents', person: 'John Ishiyama', category: 'upper', type: 'folder', description: 'Document collection related to John Ishiyama.', url: 'https://www.rasmusen.org/special/jackson/John_Ishiyama/', size: 'Multiple Files', isFolder: true, date: '2025', keywords: 'administrator, documents' },
    { id: 'stephen-slottow-folder', title: 'Stephen Slottow Documents', person: 'Stephen Slottow', category: 'upper', type: 'folder', description: 'Document collection for Stephen Slottow.', url: 'https://www.rasmusen.org/special/jackson/Stephen_Slottow/', size: 'Multiple Files', isFolder: true, date: '2025', keywords: 'administrator, documents' },

    // Legal filings
    { id: 'motion-expedited', title: 'Motion for Expedited Discovery', person: 'Legal Team', category: 'state', type: 'legal', description: 'Early motion establishing scope of institutional failures.', url: 'https://www.rasmusen.org/special/jackson/2021-03-08%20Motion%20for%20Expedited%20Discovery.pdf', size: '648KB', date: '2021-03-08', keywords: 'expedited discovery, motion' },
    { id: 'summary-judgment', title: 'Motion for Summary Judgment on Defamation', person: 'Legal Team', category: 'federal', type: 'legal', description: 'Motion establishing clear federal civil rights violations.', url: 'https://www.rasmusen.org/special/jackson/2024-12-11%20[80]%20Plaintiff\'s%20Motion%20for%20Summary%20Judgment%20on%20Defamation%20Claims.pdf', size: '315KB', date: '2024-12-11', keywords: 'summary judgment, defamation, federal' },
    { id: 'exhibit-pack', title: 'Exhibit Pack - Summary Judgment Evidence', person: 'Legal Team', category: 'federal', type: 'legal', description: 'Comprehensive exhibit package supporting summary judgment.', url: 'https://www.rasmusen.org/special/jackson/2024-12-19%20[82-1]%20Exhibit%20Pack%20Declaration%20Summary%20Judgment.pdf', size: '40MB', date: '2024-12-19', keywords: 'exhibits, summary judgment, evidence' },
    { id: 'undisputed-facts', title: 'Statement of Undisputed Facts', person: 'Legal Team', category: 'federal', type: 'legal', description: 'Statement supporting federal civil rights claims.', url: 'https://www.rasmusen.org/special/jackson/2024-12-20%20[81]%20Statement%20of%20Undisputed%20Facts%20in%20support%20of%20Summary%20Judgment%20on%20Defamation%20Claims.pdf', size: '152KB', date: '2024-12-20', keywords: 'undisputed facts, civil rights' },
    { id: 'record-appendix', title: 'Record Appendix & Index to Opposition', person: 'Legal Team', category: 'federal', type: 'legal', description: 'Comprehensive record appendix demonstrating federal violations.', url: 'https://www.rasmusen.org/special/jackson/2025-01-17%20[90]%20Record%20Appendix%20and%20Index%20to%20Pf%20Opposition%20to%20Summary%20Judgment.pdf', size: '16MB', date: '2025-01-17', keywords: 'record appendix, opposition, federal violations' },

    // Communications and correspondence
    { id: 'email-correspondence', title: 'Email Correspondence about Ewell and Symposium', person: 'Multiple Faculty', category: 'faculty', type: 'email', description: 'Extensive email correspondence revealing coordination against Jackson.', url: 'https://www.rasmusen.org/special/jackson/E%20mail%20correspondence%20about%20Ewell%20and%20the%20Symposium%202019-.pdf', size: '2.8MB', date: '2019-2021', keywords: 'email, coordination, conspiracy, faculty' },
    { id: 'unt-committee-letter', title: 'Letter to UNT Committee', person: 'Timothy L. Jackson', category: 'upper', type: 'document', description: 'Official letter revealing institutional bias and academic freedom failures.', url: 'https://www.rasmusen.org/special/jackson/Letter%20to%20UNT%20Committee%20Oct%2017%202020.pdf', size: '852KB', date: '2020-10-17', keywords: 'committee, institutional bias, academic freedom' },

    // Editorial and administrative processes
    { id: 'editorial-process', title: 'Editorial Process of JSS vol 12', person: 'UNT Administration', category: 'admin', type: 'document', description: 'Documentation of how the Journal editorial process was compromised.', url: 'https://www.rasmusen.org/special/jackson/Editorial%20Process%20of%20JSS%20vol%2012%20(condensed)%20Oct%2013%202020.pdf', size: '591KB', date: '2020-10-13', keywords: 'editorial process, journal, manipulation' },
    { id: 'including-bakulina', title: 'Including Bakulina Document', person: 'Ellen Bakulina', category: 'admin', type: 'document', description: 'Document specifically including Ellen Bakulina materials.', url: 'https://www.rasmusen.org/special/jackson/Including%20Bakulina%20-%20Defendant%20UNT\'s%20Objections%20and%20Responses%20to%20Plaintiff\'s%20Second%20Set%20of%20Requests%20for%20Production.pdf', size: '79KB', date: '2025', keywords: 'bakulina, defendant, objections' },

    // Expert testimony and witness materials
    { id: 'peter-kohanski', title: 'Peter Kohanski Materials', person: 'Peter Kohanski', category: 'admin', type: 'document', description: 'Materials related to PhD student Peter Kohanski&apos;s involvement.', url: 'https://www.rasmusen.org/special/jackson/Peter%20Kohanski-20250110_110816.pdf', size: '8.7MB', date: '2025-01-10', keywords: 'phd student, witness, petition' },
    { id: 'dr-philip-adrian', title: 'Dr. Philip Adrian Documents', person: 'Dr. Philip Adrian', category: 'admin', type: 'folder', description: 'Document collection for Dr. Philip Adrian.', url: 'https://www.rasmusen.org/special/jackson/80006_Dr_Philip_Adrian_Hill/', size: 'Multiple Files', isFolder: true, date: '2025', keywords: 'expert, witness, documents' },

    // Supporting materials and exhibits
    { id: 'heidelberger-ex1', title: 'FINAL Ex 1 - Heidelberger Materials', person: 'Frank Heidlberger', category: 'admin', type: 'document', description: 'Final Exhibit 1 related to Heidelberger materials.', url: 'https://www.rasmusen.org/special/jackson/FINAL%20Ex%201-Heidelberger%20letter%20to%20Jackson%20Feb%2013%202020.pdf', size: '656KB', date: '2020-02-13', keywords: 'exhibit, heidelberger, letter' },
    { id: 'heidelberger-ex2', title: 'FINAL Ex 2 - July 2020 Materials', person: 'Frank Heidlberger', category: 'admin', type: 'document', description: 'Final Exhibit 2 from July 2020 materials.', url: 'https://www.rasmusen.org/special/jackson/FINAL%20Ex%202-2020-07-27%20Heidlberger%20letter%20to%20Jackson.pdf', size: '812KB', date: '2020-07-27', keywords: 'exhibit, heidelberger, letter' },

    // Commentary and external materials
    { id: 'chaouat-opinions', title: 'Bruno Chaouat Opinion Piece', person: 'Bruno Chaouat', category: 'faculty', type: 'document', description: 'External commentary defending Jackson in Quillette.', url: 'https://www.rasmusen.org/special/jackson/Opinions-Chaouat.pdf', size: '73KB', date: '2020', keywords: 'external commentary, quillette, defense' },

    // Archive materials
    { id: 'documents-zip', title: 'Documents for Tim (ZIP Archive)', person: 'Archive', category: 'all', type: 'archive', description: 'Compressed archive of documents for Timothy Jackson.', url: 'https://www.rasmusen.org/special/jackson/Documents%20for%20Tim.zip', size: '4.3MB', date: '2025', keywords: 'archive, zip, documents' },
    { id: 'jackson-htm', title: 'Jackson HTML Index', person: 'Archive', category: 'all', type: 'document', description: 'HTML index page for Jackson case materials.', url: 'https://www.rasmusen.org/special/jackson/jackson.htm', size: '5.0KB', date: '2025', keywords: 'index, html, archive' }
  ];

  const categories = {
    all: {
      title: 'All Documents (Alphabetical)',
      icon: '📋',
      description: 'Complete document archive sorted alphabetically by title',
      level: 'All Documents',
      color: 'bg-gray-100 text-gray-800'
    },
    people: {
      title: 'Documents by Person',
      icon: '👥',
      description: 'Evidence organized by individual participants in the case',
      level: 'By Person',
      color: 'bg-purple-100 text-purple-800'
    },
    faculty: {
      title: 'Faculty Level Disputes',
      icon: '🎓',
      description: 'Academic disagreement that became personal attack and institutional weaponization',
      level: 'Faculty Disputes',
      color: 'bg-amber-100 text-amber-800'
    },
    admin: {
      title: 'Department Administration',
      icon: '🏛️',
      description: 'Department leadership abandoning neutrality and facilitating discrimination',
      level: 'Admin Misconduct',
      color: 'bg-red-100 text-red-800'
    },
    upper: {
      title: 'University Leadership',
      icon: '🏢',
      description: 'UNT leadership enabling discrimination and violating institutional obligations',
      level: 'Executive Failure',
      color: 'bg-teal-100 text-teal-800'
    },
    state: {
      title: 'State Oversight',
      icon: '🏛️',
      description: 'Texas Higher Education oversight failures and state constitutional violations',
      level: 'State Accountability',
      color: 'bg-blue-100 text-blue-800'
    },
    federal: {
      title: 'Federal Civil Rights',
      icon: '🇺🇸',
      description: 'Section 1983 civil rights violations and federal constitutional protections',
      level: 'Federal Claims',
      color: 'bg-green-100 text-green-800'
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'legal': return <Gavel className="w-4 h-4" />;
      case 'folder': return <Folder className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const isFolder = (item) => {
    return item.isFolder || 
           item.url.endsWith('/') || 
           item.type === 'folder' ||
           item.size === 'Multiple Files' ||
           item.size === '-';
  };

  const filteredEvidence = useMemo(() => {
    if (!searchTerm) return evidenceData;
    const term = searchTerm.toLowerCase();
    return evidenceData.filter(item => 
      item.title.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.keywords.toLowerCase().includes(term) ||
      item.person.toLowerCase().includes(term)
    );
  }, [searchTerm, evidenceData]);

  const peopleList = useMemo(() => {
    const people = {};
    evidenceData.forEach(item => {
      if (!people[item.person]) {
        people[item.person] = [];
      }
      people[item.person].push(item);
    });
    return people;
  }, [evidenceData]);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const jumpToCategory = (category) => {
    setSelectedPerson(null);
    setExpandedSections(prev => ({
      ...prev,
      [category]: true
    }));
    document.getElementById(category)?.scrollIntoView({ behavior: 'smooth' });
  };

  const selectPerson = (person) => {
    setSelectedPerson(person);
    setExpandedSections(prev => ({
      ...prev,
      people: true
    }));
  };

  const openFolderModal = (folder) => {
    setOpenFolder(folder);
  };

  const closeFolderModal = () => {
    setOpenFolder(null);
  };

  const stats = {
    levels: Object.keys(categories).length - 2, // Exclude 'all' and 'people'
    evidence: evidenceData.length,
    years: 5,
    people: Object.keys(peopleList).length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Jackson v. UNT System
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Academic Freedom, Institutional Accountability & Civil Rights Violations
            </p>
            <div className="inline-block bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full font-semibold">
              Settled 2025 • $725,000 • Editorial Role Restored
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Case Summary */}
        <div className="bg-white rounded-xl p-8 shadow-lg -mt-10 relative z-20 mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            In 2020, Timothy Jackson&apos;s defense of Schenker in the <em>Journal of Schenkerian Studies</em> sparked campus backlash, petitions, and administrative censure at UNT. He sued in 2021, alleging First Amendment retaliation and defamation, with courts allowing key claims to proceed despite immunity defenses. In 2025, UNT settled for $725,000 and restored Jackson&apos;s editorial role, underscoring enduring tensions between academic freedom and institutional politics.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.levels}</div>
            <div className="text-gray-600 font-medium">Institutional Levels</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.evidence}</div>
            <div className="text-gray-600 font-medium">Evidence Files</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.years}</div>
            <div className="text-gray-600 font-medium">Years Duration</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.people}</div>
            <div className="text-gray-600 font-medium">Key People</div>
          </div>
        </div>

        {/* Search Controls */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Search evidence, people, depositions..."
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => jumpToCategory(key)}
                className="px-4 py-2 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-full font-medium transition-all duration-200"
              >
                {category.icon} {category.level}
              </button>
            ))}
          </div>
        </div>

        {/* Evidence Sections */}
        {Object.entries(categories).map(([categoryKey, category]) => {
          let categoryEvidence;
          
          if (categoryKey === 'all') {
            categoryEvidence = filteredEvidence.sort((a, b) => a.title.localeCompare(b.title));
          } else if (categoryKey === 'people') {
            if (selectedPerson) {
              categoryEvidence = filteredEvidence.filter(item => item.person === selectedPerson);
            } else {
              categoryEvidence = [];
            }
          } else {
            categoryEvidence = filteredEvidence.filter(item => item.category === categoryKey);
          }

          if (categoryEvidence.length === 0 && searchTerm && categoryKey !== 'people') return null;

          return (
            <div key={categoryKey} id={categoryKey} className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-8 cursor-pointer hover:from-indigo-700 hover:to-purple-800 transition-all duration-200"
                onClick={() => toggleSection(categoryKey)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 flex items-center gap-4">
                      <span className="text-3xl">{category.icon}</span>
                      {category.title}
                      <span className={`text-sm px-3 py-1 rounded-full ${category.color}`}>
                        {category.level}
                      </span>
                    </h2>
                    <p className="text-lg opacity-90">{category.description}</p>
                  </div>
                  {expandedSections[categoryKey] ? 
                    <ChevronUp className="w-8 h-8 flex-shrink-0" /> : 
                    <ChevronDown className="w-8 h-8 flex-shrink-0" />
                  }
                </div>
              </div>

              {expandedSections[categoryKey] && (
                <div className="p-8">
                  {categoryKey === 'people' && !selectedPerson && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                      {Object.keys(peopleList).sort().map((person) => (
                        <button
                          key={person}
                          onClick={() => selectPerson(person)}
                          className="p-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg text-left transition-all duration-200"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4" />
                            <span className="font-semibold text-sm">{person}</span>
                          </div>
                          <div className="text-xs text-gray-600">
                            {peopleList[person].length} document{peopleList[person].length !== 1 ? 's' : ''}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {categoryKey === 'people' && selectedPerson && (
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <button
                          onClick={() => setSelectedPerson(null)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          ← Back to People List
                        </button>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Documents by {selectedPerson}</h3>
                    </div>
                  )}

                  <div className="grid gap-6">
                    {categoryEvidence.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                            {getTypeIcon(item.type)}
                            {item.title}
                            {isFolder(item) && (
                              <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                Folder
                              </span>
                            )}
                          </h3>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {item.person}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {item.size}
                          </span>
                          <span>{item.date}</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded font-medium">
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </span>
                        </div>

                        <p className="text-gray-700 mb-4 leading-relaxed">{item.description}</p>

                        <div className="flex gap-3">
                          {isFolder(item) ? (
                            <button
                              onClick={() => openFolderModal(item)}
                              className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                            >
                              <Folder className="w-4 h-4" />
                              Browse Folder
                            </button>
                          ) : (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              View Document
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Folder Modal */}
        {openFolder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-96 overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Folder className="w-5 h-5" />
                  {openFolder.title}
                </h3>
                <button
                  onClick={closeFolderModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">{openFolder.description}</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-yellow-800">
                    This entry is a folder containing multiple files. The complete contents are available at the source location.
                  </p>
                </div>
                <div className="flex gap-3">
                  <a
                    href={openFolder.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Folder
                  </a>
                  <button
                    onClick={closeFolderModal}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {searchTerm && filteredEvidence.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center shadow-lg">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Results Found</h3>
            <p className="text-gray-500">Try adjusting your search terms or browse by category above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JacksonUNTCase;