'use client';

export function LoadingAnimation() {
  return (
    <div className="flex justify-start">
      <div className="chat-bubble ai-message">
        <div className="flex items-center gap-3">
          <div 
            className="w-3 h-3 bg-black dark:bg-white rounded-full"
            style={{
              animation: 'breathing 2s ease-in-out infinite',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
