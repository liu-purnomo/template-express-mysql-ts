type LengthRange = [min: number, max: number];

export interface ModelValidateProps {
  name: string;
  notNull: boolean;
  isUnique: boolean;
  min: number;
  max: number;
  len: LengthRange;
  isEmail: boolean;
}
