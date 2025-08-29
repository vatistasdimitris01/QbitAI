export interface MediaFile {
  id: string;
  name: string;
  type: string;
  data: string | ArrayBuffer;
  mediaType: string;
  content?: string;
}

export const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const extractFileContent = async (file: File): Promise<MediaFile> => {
  const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const mediaType = file.type;
  
  // Handle different file types
  if (mediaType.startsWith('image/') || mediaType.startsWith('video/')) {
    const dataURL = await readFileAsDataURL(file);
    return {
      id,
      name: file.name,
      type: file.type,
      data: dataURL,
      mediaType,
    };
  }
  
  if (mediaType.includes('text') || mediaType.includes('markdown') || mediaType.includes('code') || mediaType.includes('pdf')) {
    try {
      const content = await readFileAsText(file);
      return {
        id,
        name: file.name,
        type: file.type,
        data: content,
        mediaType,
        content,
      };
    } catch (error) {
      // Fallback to ArrayBuffer for binary files
      const data = await readFileAsArrayBuffer(file);
      return {
        id,
        name: file.name,
        type: file.type,
        data,
        mediaType,
      };
    }
  }
  
  // Default: read as ArrayBuffer
  const data = await readFileAsArrayBuffer(file);
  return {
    id,
    name: file.name,
    type: file.type,
    data,
    mediaType,
  };
};

// YouTube URL validation
export const isYouTubeUrl = (url: string): boolean => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)[a-zA-Z0-9_-]{11}/;
  return youtubeRegex.test(url);
};

// Extract YouTube video ID
export const extractYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
};

export const isSupportedFileType = (file: File): boolean => {
  const supportedTypes = [
    // Images
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'image/bmp',
    'image/tiff',
    // Videos
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/quicktime',
    'video/avi',
    'video/mov',
    'video/mkv',
    'video/wmv',
    'video/flv',
    // Audio
    'audio/mpeg',
    'audio/wav',
    'audio/flac',
    'audio/ogg',
    'audio/mp3',
    'audio/aac',
    // Documents
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    // Text files
    'text/plain',
    'text/markdown',
    'text/csv',
    'text/html',
    'text/css',
    'text/javascript',
    'text/xml',
    'application/json',
    'application/xml',
    // Archives
    'application/zip',
    'application/x-rar-compressed',
    'application/x-7z-compressed',
    'application/x-tar',
    'application/gzip',
    // Code files
    'application/x-python',
    'text/x-python',
    'text/x-java-source',
    'text/x-c++src',
    'text/x-c',
    'text/x-csharp',
    'text/x-php',
    'text/x-ruby',
    'text/x-go',
    'text/x-rust',
    'text/x-swift',
    'text/x-kotlin',
    'text/x-scala',
    'text/x-typescript',
    'text/x-javascript',
    'text/x-jsx',
    'text/x-tsx',
    // Additional code types
    'text/x-sh',
    'text/x-bash',
    'text/x-shellscript',
    'text/x-yaml',
    'text/x-toml',
    'text/x-ini',
    'text/x-config',
  ];
  
  return supportedTypes.includes(file.type) || file.type === '';
};

export const getFileIcon = (mediaType: string) => {
  if (mediaType.startsWith('image/')) return '🖼️';
  if (mediaType.startsWith('video/')) return '🎥';
  if (mediaType === 'video/youtube') return '📺';
  if (mediaType.startsWith('audio/')) return '🎵';
  if (mediaType.includes('pdf')) return '📄';
  if (mediaType.includes('word') || mediaType.includes('document')) return '📝';
  if (mediaType.includes('excel') || mediaType.includes('spreadsheet')) return '📊';
  if (mediaType.includes('powerpoint') || mediaType.includes('presentation')) return '📈';
  if (mediaType.includes('zip') || mediaType.includes('rar') || mediaType.includes('7z') || mediaType.includes('tar') || mediaType.includes('gz')) return '📦';
  if (mediaType.includes('text') || mediaType.includes('markdown') || mediaType.includes('code') || mediaType.includes('json') || mediaType.includes('xml') || mediaType.includes('csv')) return '📄';
  return '📁';
};
