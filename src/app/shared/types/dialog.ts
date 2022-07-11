export interface Dialog {
  heading: string;
  subHeading?: string;
  type: DialogType;
  basicButtonText?: string;
  successButtonText?: string;
  dangerButtonText?: string;
}

export type DialogType = 'success' | 'error' | 'info';

