'use client';
import { useState, useMemo } from 'react';
import { Search, User, FileText, Folder, X, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';

// --- Dummy Evidence Data ---
interface EvidenceItem {
  id: string;
  title: string;
  description: string;
  keywords: string;
  person: string;
  url?: string;
  type?: string;
  size?: string;
  isFolder?: boolean;
  category?: string;
  date?: string;
}

const evidenceData: EvidenceItem[] = [
  {
    id: '1',
    title: 'Schenker Article',
    description: 'Original article by Jackson',
    keywords: 'Schenker, Academic Freedom',
    person: 'Timothy Jackson',
    url: '#',
    type: 'pdf',
    size: '1MB',
    isFolder: false,
    category: 'articles',
    date: '2020-05-12',
  },
  {
    id: '2',
    title: 'Deposit Folder',
    description: 'Multiple documents',
    keywords: 'court, deposition',
    person: 'Timothy Jackson',
    url: '#',
    type: 'folder',
    size: 'Multiple Files',
    isFolder: true,
    category: 'depositions',
    date: '2021-02-10',
  },
];

// --- Dummy Stats & Categories ---
const stats = { levels: 3, evidence: 2, years: 5, people: 1 };
const categories = {
  all: { icon: '📁', title: 'All', description: 'All evidence', level: 'All', color: 'bg-gray-200' },
  people: { icon: '👤', title: 'People', description: 'Documents by person', level: 'People', color: 'bg-gray-200' },
  articles: { icon: '📄', title: 'Articles', description: 'Published articles', level: 'Article', color: 'bg-green-200' },
  depositions: { icon: '📝', title: 'Depositions', description: 'Depositions', level: 'Deposition', color: 'bg-blue-200' },
};

// --- Dummy getTypeIcon ---
const getTypeIcon = (type?: string) => {
  if (!type) return null;
  switch (type) {
    case 'pdf': return '📄';
    case 'folder': return '📁';
    default: return '📎';
  }
};

const JacksonUNTCase = () => {
  // --- State ---
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [openFolder, setOpenFolder] = useState<EvidenceItem | null>(null);

  // --- Detect if item is a folder ---
  const isFolder = (item: EvidenceItem) => {
    return item.isFolder || item.url?.endsWith('/') || item.type === 'folder' || item.size === 'Multiple Files' || item.size === '-';
  };

  // --- Filtered evidence based on search ---
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

  // --- Group by person ---
  const peopleList = useMemo(() => {
    const people: Record<string, EvidenceItem[]> = {};
    evidenceData.forEach(item => {
      if (!people[item.person]) people[item.person] = [];
      people[item.person].push(item);
    });
    return people;
  }, []);

  // --- Toggle sections ---
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // --- Modal controls ---
  const openFolderModal = (item: EvidenceItem) => setOpenFolder(item);
  const closeFolderModal = () => setOpenFolder(null);

  const jumpToCategory = (key: string) => {
    const el = document.getElementById(key);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const selectPerson = (person: string) => setSelectedPerson(person);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Jackson v. UNT System</h1>
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

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{value}</div>
              <div className="text-gray-600 font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
            </div>
          ))}
        </div>

        {/* Search */}
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
          let categoryEvidence: EvidenceItem[] = [];

          if (categoryKey === 'all') categoryEvidence = filteredEvidence;
          else if (categoryKey === 'people') categoryEvidence = selectedPerson ? filteredEvidence.filter(i => i.person === selectedPerson) : [];
          else categoryEvidence = filteredEvidence.filter(i => i.category === categoryKey);

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
                      <span className={`text-sm px-3 py-1 rounded-full ${category.color}`}>{category.level}</span>
                    </h2>
                    <p className="text-lg opacity-90">{category.description}</p>
                  </div>
                  {expandedSections[categoryKey] ? <ChevronUp className="w-8 h-8" /> : <ChevronDown className="w-8 h-8" />}
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
                        <button onClick={() => setSelectedPerson(null)} className="text-blue-600 hover:text-blue-800 font-medium">
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
                            {getTypeIcon(item.type)} {item.title}
                            {isFolder(item) && <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Folder</span>}
                          </h3>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          <span className="flex items-center gap-1"><User className="w-4 h-4" />{item.person}</span>
                          <span className="flex items-center gap-1"><FileText className="w-4 h-4" />{item.size}</span>
                          <span>{item.date}</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded font-medium">{item.type}</span>
                        </div>

                        <p className="text-gray-700 mb-4 leading-relaxed">{item.description}</p>

                        <div className="flex gap-3">
                          {isFolder(item) ? (
                            <button
                              onClick={() => openFolderModal(item)}
                              className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                            >
                              <Folder className="w-4 h-4" /> Browse Folder
                            </button>
                          ) : (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" /> View Document
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
                <h3 className="text-xl font-bold flex items-center gap-2"><Folder className="w-5 h-5" /> {openFolder.title}</h3>
                <button onClick={closeFolderModal} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">{openFolder.description}</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-yellow-800">
                    This entry is a folder containing multiple files. The complete contents are available at the source location.
                  </p>
                </div>
                <div className="flex gap-3">
                  <a href={openFolder.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    <ExternalLink className="w-4 h-4" /> Visit Folder
                  </a>
                  <button onClick={closeFolderModal} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">
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




