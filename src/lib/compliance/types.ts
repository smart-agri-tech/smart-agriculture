export type Region = 'catalonia' | 'other';

export type FarmType = 'arable' | 'fruit' | 'olive' | 'vineyard' | 'horticulture' | 'livestock' | 'other';

export type AreaBand = 'lt1' | '1to5' | '5to10' | '10to50' | '50to200' | 'gt200';

export type FertiliserUse = 'none' | 'mineral' | 'organic' | 'both';

export type ManureUse = 'none' | 'own' | 'receive' | 'both';

export type PlantProtectionUse = 'none' | 'self' | 'contractor';

export type Irrigation = 'rainfed' | 'irrigated' | 'fertigation';

export type Scheme = 'cap_submitted' | 'cap_pending' | 'eco' | 'organic' | 'integrated' | 'none';

export type RecordMethod = 'paper' | 'excel' | 'whatsapp' | 'digital' | 'none';

export type Preparer = 'self' | 'cooperative' | 'advisor' | 'nobody';

export type TimeSpent = 'lt5' | '5to10' | '10to20' | 'gt20';

export interface Answers {
  region: Region;
  farmTypes: FarmType[];
  /** Free text for the "Other" farm type. */
  farmTypesOther?: string;
  area: AreaBand;
  privateConsumptionOnly: boolean;
  fertiliser: FertiliserUse;
  manure: ManureUse;
  plantProtection: PlantProtectionUse;
  irrigation: Irrigation;
  schemes: Scheme[];
  recordMethods: RecordMethod[];
  preparer: Preparer;
  timeSpent: TimeSpent;
}

export type RequirementId = 'dun' | 'cap' | 'dan' | 'qie' | 'fertilisation';

export type RequirementStatus = 'required' | 'completed' | 'likely' | 'check' | 'on_track';

export interface Requirement {
  id: RequirementId;
  name: string;
  status: RequirementStatus;
  need: string;
  /** Text shown in the deadline column. */
  deadlineLabel: string;
  /** Legal source shown next to the deadline. Every deadline must carry one. */
  source: string;
  /** Official page where the dates can be checked. */
  sourceUrl?: string;
}

export interface Notice {
  kind: 'warning' | 'ok';
  text: string;
}

export type BurdenLevel = 'low' | 'medium' | 'high' | 'veryHigh';

export interface Result {
  requirements: Requirement[];
  notices: Notice[];
  risks: number;
  complianceScore: number;
  dataScore: number;
  dataSummary: string;
  /** `level` is the translated label. */
  burden: { level: string; percent: number; summary: string };
}
