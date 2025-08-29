'use client';

interface SearchResult {
  title: string;
  url: string;
  domain: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isVisible: boolean;
  onClose: () => void;
}

export function SearchResults({ results, isVisible, onClose }: SearchResultsProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div 
        className="absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm rounded-t-lg max-h-[60vh] overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-8 h-1 bg-muted-foreground rounded-full"></div>
        </div>
        
        {/* Header */}
        <div className="px-4 py-3">
          <h3 className="text-card-foreground font-semibold text-lg">Search Results</h3>
        </div>
        
        {/* Results */}
        <div className="overflow-y-auto max-h-[50vh]">
          {results.map((result, index) => (
            <div key={index} className="px-4 py-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">b</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-muted-foreground text-xs mb-1">{result.domain}</div>
                  <div className="text-card-foreground text-sm font-medium leading-tight">
                    {result.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
