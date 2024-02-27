export interface IQalendarEvent {
  id: string;
  isEditable?: boolean;
  title: string;
  time: IQalendarTime;
  colorScheme?: string;
  description: string;
  totalConcurrentEvents?: number;
}

export interface IQalendarEventClicked {
  clickedEvent: {
    id: string;
    isEditable?: boolean;
    title: string;
    time: IQalendarTime;
    colorScheme?: string;
    description: string;
    totalConcurrentEvents?: number;
  };
}

export interface IQalendarUpdatedPeriod {
  start: Date;
  end: Date;
}

export interface IQalendarTime {
  start: string;
  end: string;
}
