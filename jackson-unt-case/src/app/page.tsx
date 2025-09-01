"use client";
import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, ExternalLink, FileText, Video, Mail, Gavel, User } from 'lucide-react';

const JacksonUNTCase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedPerson, setSelectedPerson] = useState(null);

  // Evidence data structured from Rasmusen's page
  const evidenceData = [
    {
      id: 'jackson-response-ewell',
      title: 'Jackson\'s Scholarly Response to Ewell',
      person: 'Timothy Jackson',
      category: 'faculty',
      type: 'document',
      description: 'Jackson\'s academic response in the Journal of Schenkerian Studies - the scholarly work that triggered institutional retaliation.',
      url: 'https://www.rasmusen.org/special/jackson/Timothy%20Jackson,%20Preliminary%20Response%20to%20Ewell,%20Journal%20of%20Schenkerian%20Studies%20Volume%2012%20.pdf',
      size: '2.2MB PDF',
      date: 'Journal Publication',
      keywords: 'academic freedom, musicology, scholarly response, retaliation trigger'
    },
    {
      id: 'ewell-deposition',
      title: 'Philip Ewell Video Deposition',
      person: 'Philip Ewell',
      category: 'faculty',
      type: 'video',
      description: 'Deposition of Philip Ewell, author of controversial racial theories in musicology whose work Jackson critiqued.',
      url: 'https://www.rasmusen.org/special/jackson/P.Ewell091924C%20(1).mp4',
      size: 'Video Deposition',
      date: 'Sept 2024',
      keywords: 'deposition, testimony, racial theory, musicology controversy'
    },
    {
      id: 'faculty-email-correspondence',
      title: 'Faculty Email Correspondence',
      person: 'Multiple Faculty',
      category: 'faculty',
      type: 'email',
      description: 'Extensive email correspondence about the Ewell controversy and subsequent symposium, revealing coordination against Jackson.',
      url: 'https://www.rasmusen.org/special/jackson/E%20mail%20correspondence%20about%20Ewell%20and%20the%20Symposium%202019-.pdf',
      size: '2.8MB Email Archive',
      date: '2019-2021',
      keywords: 'email, coordination, conspiracy, faculty communications, smoking gun'
    },
    {
      id: 'brand-deposition',
      title: 'Brand Administrative Deposition',
      person: 'Eugene Brand',
      category: 'admin',
      type: 'document',
      description: 'Department administrator\'s testimony revealing internal processes and bias in handling the academic freedom case.',
      url: 'https://www.rasmusen.org/special/jackson/2024-09-23%20Brand%20deposition%20transcript%20-%20full-size%20and%20word%20index.pdf',
      size: '1.1MB Transcript',
      date: 'Sept 2024',
      keywords: 'deposition, administrative bias, internal processes, under oath'
    },
    {
      id: 'walls-testimony',
      title: 'Walls Administrative Testimony',
      person: 'John Walls',
      category: 'admin',
      type: 'document',
      description: 'Comprehensive deposition revealing administrative handling of the controversy and decision-making processes.',
      url: 'https://www.rasmusen.org/special/jackson/Walls%205-18-21%20full-size%20and%20word%20index.pdf',
      size: '1.2MB Transcript',
      date: 'May 2021',
      keywords: 'administrative procedures, decision-making, institutional response'
    },
    {
      id: 'editorial-process',
      title: 'Journal Editorial Process Documentation',
      person: 'UNT Administration',
      category: 'admin',
      type: 'document',
      description: 'Detailed documentation of how the Journal of Schenkerian Studies editorial process was compromised and manipulated.',
      url: 'https://www.rasmusen.org/special/jackson/Editorial%20Process%20of%20JSS%20vol%2012%20(condensed)%20Oct%2013%202020.pdf',
      size: '591KB Process Doc',
      date: 'October 2020',
      keywords: 'editorial process, manipulation, journal compromise, internal procedures'
    },
    {
      id: 'unt-committee-letter',
      title: 'UNT Committee Correspondence',
      person: 'Timothy Jackson',
      category: 'upper',
      type: 'document',
      description: 'Official letter to UNT committee revealing institutional bias and failure to protect academic freedom.',
      url: 'https://www.rasmusen.org/special/jackson/Letter%20to%20UNT%20Committee%20Oct%2017%202020.pdf',
      size: '852KB Letter',
      date: 'October 2020',
      keywords: 'official response, institutional bias, academic freedom violation'
    },
    {
      id: 'exhibit-pack-summary',
      title: 'Exhibit Pack - Summary Judgment Evidence',
      person: 'Legal Team',
      category: 'upper',
      type: 'legal',
      description: 'Comprehensive exhibit package supporting summary judgment motion, demonstrating clear institutional liability.',
      url: 'https://www.rasmusen.org/special/jackson/2024-12-19%20%5b82-1%5d%20Exhibit%20Pack%20Declaration%20Summary%20Judgment.pdf',
      size: '40MB Evidence Pack',
      date: 'December 2024',
      keywords: 'summary judgment, institutional liability, court filing, evidence package'
    },
    {
      id: 'expedited-discovery-motion',
      title: 'Motion for Expedited Discovery',
      person: 'Legal Team',
      category: 'state',
      type: 'legal',
      description: 'Early motion establishing the scope of state institutional failures requiring immediate judicial intervention.',
      url: 'https://www.rasmusen.org/special/jackson/2021-03-08%20Motion%20for%20Expedited%20Discovery.pdf',
      size: '648KB Motion',
      date: 'March 2021',
      keywords: 'expedited discovery, state failures, judicial intervention, court motion'
    },
    {
      id: 'jackson-affidavit',
      title: 'Jackson Affidavit of Verification',
      person: 'Timothy Jackson',
      category: 'state',
      type: 'legal',
      description: 'Jackson\'s sworn affidavit establishing personal knowledge of state institutional failures and constitutional violations.',
      url: 'https://www.rasmusen.org/special/jackson/2021-03-08%20Jackson%20Affidavit%20of%20Verification.pdf',
      size: '318KB Affidavit',
      date: 'March 2021',
      keywords: 'sworn statement, constitutional violations, personal knowledge, state failures'
    },
    {
      id: 'summary-judgment-defamation',
      title: 'Motion for Summary Judgment on Defamation Claims',
      person: 'Legal Team',
      category: 'federal',
      type: 'legal',
      description: 'Comprehensive motion establishing clear federal civil rights violations warranting summary judgment against all defendants.',
      url: 'https://www.rasmusen.org/special/jackson/2024-12-11%20%5b80%5d%20Plaintiff\'s%20Motion%20for%20Summary%20Judgment%20on%20Defamation%20Claims.pdf',
      size: '315KB Motion',
      date: 'December 2024',
      keywords: 'summary judgment, defamation, federal civil rights, constitutional violations'
    },
    {
      id: 'undisputed-facts',
      title: 'Statement of Undisputed Facts',
      person: 'Legal Team',
      category: 'federal',
      type: 'legal',
      description: 'Comprehensive statement of undisputed facts supporting federal civil rights claims and institutional liability.',
      url: 'https://www.rasmusen.org/special/jackson/2024-12-20%20%5b81%5d%20Statement%20of%20Undisputed%20Facts%20in%20support%20of%20Summary%20Judgment%20on%20Defamation%20Claims.pdf',
      size: '152KB Statement',
      date: 'December 2024',
      keywords: 'undisputed facts, civil rights claims, institutional liability, legal statement'
    },
    {
      id: 'record-appendix',
      title: 'Record Appendix & Index to Opposition',
      person: 'Legal Team',
      category: 'federal',
      type: 'legal',
      description: 'Comprehensive record appendix and index supporting opposition to summary judgment, demonstrating the full scope of federal violations.',
      url: 'https://www.rasmusen.org/special/jackson/2025-01-17%20%5b90%5d%20Record%20Appendix%20and%20Index%20to%20Pf%20Opposition%20to%20Summary%20Judgment.pdf',
      size: '16MB Appendix',
      date: 'January 2025',
      keywords: 'record appendix, opposition, federal violations, complete record'
    }
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
      default: return <FileText className="w-4 h-4" />;
    }
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
  }, [searchTerm]);

  const peopleList = useMemo(() => {
    const people = {};
    evidenceData.forEach(item => {
      if (!people[item.person]) {
        people[item.person] = [];
      }
      people[item.person].push(item);
    });
    return people;
  }, []);

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
            In 2020, Timothy Jackson's defense of Schenker in the <em>Journal of Schenkerian Studies</em> sparked campus backlash, petitions, and administrative censure at UNT. He sued in 2021, alleging First Amendment retaliation and defamation, with courts allowing key claims to proceed despite immunity defenses. In 2025, UNT settled for $725,000 and restored Jackson's editorial role, underscoring enduring tensions between academic freedom and institutional politics.
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
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Document
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

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