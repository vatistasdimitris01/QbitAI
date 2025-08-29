// Vibration utility for haptic feedback
export const VibrationPatterns = {
  LIGHT: [10],
  MEDIUM: [20],
  HEAVY: [30],
  SUCCESS: [10, 50, 10],
  ERROR: [50, 100, 50],
  NOTIFICATION: [20, 50, 20],
  BUTTON_CLICK: [5],
  THEME_CHANGE: [15],
  FILE_UPLOAD: [10, 20, 10],
  MESSAGE_SENT: [8],
  SETTINGS_OPEN: [12],
  DROPDOWN_OPEN: [8],
  SIDEBAR_OPEN: [10],
  STREAMING_TYPING: [3],
} as const;

export const vibrate = (pattern: number[] | number = [...VibrationPatterns.LIGHT], enabled: boolean = true) => {
  if (!enabled) return;
  
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch (error) {
      console.warn('Vibration failed:', error);
    }
  }
};

// Convenience functions for common interactions
export const vibrateButton = (enabled: boolean = true) => vibrate([...VibrationPatterns.BUTTON_CLICK], enabled);
export const vibrateSuccess = (enabled: boolean = true) => vibrate([...VibrationPatterns.SUCCESS], enabled);
export const vibrateError = (enabled: boolean = true) => vibrate([...VibrationPatterns.ERROR], enabled);
export const vibrateThemeChange = (enabled: boolean = true) => vibrate([...VibrationPatterns.THEME_CHANGE], enabled);
export const vibrateFileUpload = (enabled: boolean = true) => vibrate([...VibrationPatterns.FILE_UPLOAD], enabled);
export const vibrateMessageSent = (enabled: boolean = true) => vibrate([...VibrationPatterns.MESSAGE_SENT], enabled);
export const vibrateSettings = (enabled: boolean = true) => vibrate([...VibrationPatterns.SETTINGS_OPEN], enabled);
export const vibrateDropdown = (enabled: boolean = true) => vibrate([...VibrationPatterns.DROPDOWN_OPEN], enabled);
export const vibrateNotification = (enabled: boolean = true) => vibrate([...VibrationPatterns.NOTIFICATION], enabled);
export const vibrateSidebarOpen = (enabled: boolean = true) => vibrate([...VibrationPatterns.SIDEBAR_OPEN], enabled);
export const vibrateStreamingTyping = (enabled: boolean = true) => vibrate([...VibrationPatterns.STREAMING_TYPING], enabled);
